/**
 * Kiểm tra danh sách gallery với metadata gốc trên Commons, không tải ảnh.
 * Chạy: pnpm --filter @chem/data exec tsx scripts/check-gallery.ts
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { z } from 'zod';

import { PRIORITY } from '../curated/compounds.ts';
import { FLAME } from '../curated/flame.ts';
import { GALLERY } from '../curated/gallery.ts';
import { IMAGE_OVERRIDES } from '../curated/image-overrides.ts';
import { Gallery } from '../src/gallery.ts';

const ROOT = join(import.meta.dirname, '..');
const UA = 'NguyenTo-periodic-table/0.1 (static educational site; image build script)';
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// Commons có thể giới hạn cả IP dùng chung; mặc định chậm hơn mức tối thiểu 1 giây.
const configuredDelay = Number(process.env.COMMONS_DELAY_MS);
let delay =
  Number.isFinite(configuredDelay) && configuredDelay > 0 ? Math.max(1100, configuredDelay) : 6000;

interface BowElement {
  symbol: string;
  image?: { title: string; url: string };
}
interface CommonsPage {
  title: string;
  missing?: string;
  imageinfo?: Array<{
    width: number;
    height: number;
    extmetadata?: Record<string, { value: string }>;
  }>;
}
interface CommonsResponse {
  error?: { info: string };
  query?: { pages: Record<string, CommonsPage> };
}

class CommonsRateLimitError extends Error {}

const normalizeFile = (file: string) => file.replaceAll('_', ' ').normalize('NFC').trim();
const fileFromUrl = (url: string) => {
  const parsed = new URL(url);
  if (parsed.hostname === 'upload.wikimedia.org')
    return `File:${decodeURIComponent(parsed.pathname.split('/').at(-1)!)}`;
  if (parsed.hostname === 'commons.wikimedia.org' && parsed.pathname.startsWith('/wiki/File:'))
    return decodeURIComponent(parsed.pathname.slice('/wiki/'.length));
  return null;
};

/** Khoảng cách áp dụng cho cả lần thử lại; 429 chờ ít nhất 60 giây. */
async function metadata(file: string): Promise<CommonsPage> {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.search = new URLSearchParams({
    action: 'query',
    titles: file,
    prop: 'imageinfo',
    iiprop: 'size|extmetadata',
    redirects: '1',
    format: 'json',
    maxlag: '5',
  }).toString();
  for (let attempt = 0; attempt < 4; attempt++) {
    await sleep(delay);
    const response = await fetch(url, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(45_000),
    });
    if (response.status === 429 || response.status === 503) {
      delay = Math.max(10_000, delay * 2);
      if (attempt === 3)
        throw new CommonsRateLimitError(`HTTP ${response.status}, dừng sau 4 lần thử`);
      const retry = response.headers.get('retry-after');
      const retryMs = retry
        ? /^\d+$/.test(retry)
          ? Number(retry) * 1000
          : Date.parse(retry) - Date.now()
        : 0;
      const wait = Math.max(60_000 * (attempt + 1), retryMs || 0);
      console.warn(`Commons HTTP ${response.status}: chờ ${Math.ceil(wait / 1000)} giây`);
      await sleep(wait);
      continue;
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = (await response.json()) as CommonsResponse;
    if (result.error) throw new Error(result.error.info);
    const page = Object.values(result.query?.pages ?? {})[0];
    if (!page || 'missing' in page || !page.imageinfo?.length)
      throw new Error('File không tồn tại hoặc không có imageinfo');
    return page;
  }
  throw new Error('Không lấy được metadata');
}

const parsed = Gallery.safeParse(GALLERY);
if (!parsed.success) {
  console.error(z.prettifyError(parsed.error));
  process.exit(1);
}
const gallery = parsed.data;
const errors: string[] = [];
const fail = (context: string, message: string) => errors.push(`${context}: ${message}`);
for (const symbol of PRIORITY) if (!gallery[symbol]) fail(symbol, 'Thiếu nguyên tố ưu tiên');
for (const symbol of Object.keys(gallery))
  if (!PRIORITY.includes(symbol)) fail(symbol, 'Không thuộc PRIORITY');

const bow = JSON.parse(await readFile(join(ROOT, 'raw', 'bowserinator.json'), 'utf8')) as {
  elements: BowElement[];
};
const primaryFiles = new Set<string>();
for (const element of bow.elements) {
  const override = IMAGE_OVERRIDES[element.symbol];
  // Kiểm tra cả ảnh gốc lẫn ảnh override để không chọn lại ảnh chính cũ.
  for (const url of [element.image?.url, override?.url, override?.sourceUrl]) {
    if (!url) continue;
    const file = fileFromUrl(url);
    if (file) primaryFiles.add(normalizeFile(file));
  }
  if (element.image?.title.startsWith('File:'))
    primaryFiles.add(normalizeFile(element.image.title));
}

const seen = new Map<string, string>();
const seenCanonical = new Map<string, string>();
let count = 0;
checking: for (const [symbol, images] of Object.entries(gallery)) {
  if (new Set(images.map((image) => image.kind)).size < 2)
    fail(symbol, 'Phải có ít nhất hai loại ảnh');
  for (const image of images) {
    const context = `${symbol} / ${image.file}`;
    const key = normalizeFile(image.file);
    if (primaryFiles.has(key)) fail(context, 'Trùng ảnh chính');
    if (seen.has(key)) fail(context, `Trùng file đã dùng ở ${seen.get(key)}`);
    seen.set(key, symbol);
    if (image.kind === 'flame' && !FLAME[symbol]) fail(context, 'Không có trong curated/flame.ts');
    if (image.kind === 'history' && image.license !== 'Public domain')
      fail(context, 'Ảnh lịch sử phải thuộc phạm vi công cộng');
    try {
      const page = await metadata(image.file);
      const canonical = normalizeFile(page.title);
      if (seenCanonical.has(canonical))
        fail(context, `Trùng file đích sau chuyển hướng ở ${seenCanonical.get(canonical)}`);
      seenCanonical.set(canonical, symbol);
      if (primaryFiles.has(canonical)) fail(context, 'File đích trùng ảnh chính');
      const info = page.imageinfo![0]!;
      const license = info.extmetadata?.LicenseShortName?.value ?? '';
      if (license !== image.license)
        fail(context, `Giấy phép Commons "${license}" khác "${image.license}"`);
      if (Math.max(info.width, info.height) < 800) fail(context, 'Ảnh gốc nhỏ hơn 800 px');
      if (info.width !== image.width || info.height !== image.height)
        fail(context, `Kích thước Commons ${info.width}×${info.height} khác dữ liệu`);
      count++;
      console.log(`· ${count}: ${context}`);
    } catch (error) {
      fail(context, error instanceof Error ? error.message : String(error));
      // Không tiếp tục gọi các file khác khi Commons vẫn đang chặn yêu cầu.
      if (error instanceof CommonsRateLimitError) break checking;
    }
  }
}

if (errors.length) {
  for (const error of errors) console.error(`✗ ${error}`);
  console.error(`Có ${errors.length} lỗi.`);
  process.exitCode = 1;
} else {
  console.log(
    `✓ ${Object.keys(gallery).length} nguyên tố, ${count} ảnh; Commons và schema hợp lệ.`
  );
}

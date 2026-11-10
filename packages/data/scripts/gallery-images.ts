/**
 * Tải ảnh thư viện (curated/gallery.ts) từ Wikimedia Commons, nén WebP 2 cỡ.
 * Kết quả (images/gallery/*.webp + manifest.json) được commit, nên chỉ chạy lại khi đổi danh sách:
 *   pnpm --filter @chem/data exec tsx scripts/gallery-images.ts          # chỉ ảnh còn thiếu
 *   pnpm --filter @chem/data exec tsx scripts/gallery-images.ts --force  # tải lại tất cả
 * Cần mạng. Commons giới hạn tốc độ: giữ khoảng cách giữa các yêu cầu.
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import sharp from 'sharp';

import { GALLERY } from '../curated/gallery.ts';
import { GALLERY_WIDTHS, galleryFile, type GalleryManifest } from '../src/gallery.ts';

const ROOT = join(import.meta.dirname, '..');
const OUT = join(ROOT, 'images', 'gallery');
const FORCE = process.argv.includes('--force');
const UA = 'NguyenTo-periodic-table/0.1 (static educational site; image build script)';
const DELAY = Math.max(1500, Number(process.env.COMMONS_DELAY_MS) || 2500);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface Page {
  title: string;
  imageinfo?: Array<{ thumburl?: string; url: string; width: number; height: number }>;
}
interface Resp {
  query?: {
    normalized?: Array<{ from: string; to: string }>;
    redirects?: Array<{ from: string; to: string }>;
    pages: Record<string, Page>;
  };
}

async function get(url: string | URL, json: boolean): Promise<Response> {
  for (let attempt = 0; attempt < 5; attempt++) {
    await sleep(DELAY);
    const res = await fetch(url, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(60_000),
    });
    if (res.ok) return res;
    if (res.status === 429 || res.status === 503) {
      const wait = 60_000 * (attempt + 1);
      console.warn(`HTTP ${res.status}: chờ ${wait / 1000} giây`);
      await sleep(wait);
      continue;
    }
    throw new Error(`HTTP ${res.status} ${json ? 'API' : String(url)}`);
  }
  throw new Error('Commons giới hạn tốc độ, dừng sau 5 lần thử');
}

/** URL thu nhỏ do Commons cấp (cạnh rộng GALLERY_WIDTHS.large). */
async function thumbUrls(files: string[]): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  for (let i = 0; i < files.length; i += 20) {
    const batch = files.slice(i, i + 20);
    const url = new URL('https://commons.wikimedia.org/w/api.php');
    url.search = new URLSearchParams({
      action: 'query',
      titles: batch.join('|'),
      prop: 'imageinfo',
      iiprop: 'url|size',
      iiurlwidth: String(GALLERY_WIDTHS.large),
      redirects: '1',
      format: 'json',
    }).toString();
    const data = (await (await get(url, true)).json()) as Resp;
    const map = new Map<string, string>(); // tên gốc → tên cuối sau chuẩn hoá/chuyển hướng
    for (const f of batch) map.set(f, f);
    for (const n of data.query?.normalized ?? [])
      for (const [k, v] of map) if (v === n.from) map.set(k, n.to);
    for (const r of data.query?.redirects ?? [])
      for (const [k, v] of map) if (v === r.from) map.set(k, r.to);
    const byTitle = new Map(Object.values(data.query?.pages ?? {}).map((p) => [p.title, p]));
    for (const [file, final] of map) {
      const info = byTitle.get(final)?.imageinfo?.[0];
      if (!info) throw new Error(`Không có imageinfo: ${file}`);
      result.set(file, info.thumburl ?? info.url);
    }
  }
  return result;
}

await mkdir(OUT, { recursive: true });
const manifestPath = join(OUT, 'manifest.json');
const manifest: GalleryManifest = existsSync(manifestPath)
  ? JSON.parse(await readFile(manifestPath, 'utf8'))
  : {};
const save = () => writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const todo = Object.entries(GALLERY)
  .flatMap(([symbol, images]) =>
    images.map((image, i) => ({ symbol, i, image, slug: symbol.toLowerCase() }))
  )
  .filter(
    ({ symbol, i, image, slug }) =>
      FORCE ||
      manifest[symbol]?.[i]?.file !== image.file ||
      !existsSync(join(OUT, galleryFile(slug, i, 'large'))) ||
      !existsSync(join(OUT, galleryFile(slug, i, 'thumb')))
  );
console.log(`Cần tải ${todo.length} ảnh`);

const urls = await thumbUrls(todo.map((t) => t.image.file));
const errors: string[] = [];
for (const { symbol, i, image, slug } of todo) {
  process.stdout.write(`↓ ${symbol}[${i}] ${image.file.slice(0, 50)} … `);
  try {
    const buf = Buffer.from(await (await get(urls.get(image.file)!, false)).arrayBuffer());
    const base = sharp(buf, { failOn: 'none' }).rotate();
    const large = await base
      .clone()
      .resize({
        width: GALLERY_WIDTHS.large,
        height: GALLERY_WIDTHS.large,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .flatten({ background: '#ffffff' })
      .webp({ quality: 72, effort: 6 })
      .toFile(join(OUT, galleryFile(slug, i, 'large')));
    await base
      .clone()
      .resize({
        width: GALLERY_WIDTHS.thumb,
        height: GALLERY_WIDTHS.thumb,
        fit: 'cover',
        position: 'attention',
      })
      .flatten({ background: '#ffffff' })
      .webp({ quality: 70, effort: 6 })
      .toFile(join(OUT, galleryFile(slug, i, 'thumb')));
    (manifest[symbol] ??= [])[i] = { file: image.file, w: large.width, h: large.height };
    console.log(`${large.width}×${large.height}, ${(large.size / 1024).toFixed(0)} KB`);
    await save();
  } catch (e) {
    console.log('lỗi');
    errors.push(`${symbol}[${i}] ${image.file}: ${(e as Error).message}`);
  }
}
// Bỏ mục của nguyên tố/ảnh không còn trong danh sách
for (const symbol of Object.keys(manifest)) {
  if (!GALLERY[symbol]) delete manifest[symbol];
  else manifest[symbol] = manifest[symbol]!.slice(0, GALLERY[symbol].length);
}
await save();
console.log(`✓ ${Object.values(manifest).flat().length} ảnh trong thư viện`);
if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}

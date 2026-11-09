/**
 * Tải ảnh nguyên tố (URL + ghi công từ raw/bowserinator.json), lọc giấy phép, nén WebP 2 cỡ.
 * Kết quả (images/*.webp + images/manifest.json) được commit vào git, nên chỉ chạy lại khi cần:
 *   pnpm --filter @chem/data images            # chỉ tải ảnh còn thiếu
 *   pnpm --filter @chem/data images --force    # tải lại tất cả
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import sharp from 'sharp';

import { IMAGE_OVERRIDES, PLACEHOLDER_IMAGE } from '../curated/image-overrides.ts';
import {
  parseAttribution,
  PHOTO_LICENSES,
  PHOTO_WIDTHS,
  photoFile,
  type PhotoManifest,
  sourcePageFor,
} from '../src/photo.ts';

const ROOT = join(import.meta.dirname, '..');
const OUT = join(ROOT, 'images');
const FORCE = process.argv.includes('--force');
const UA = 'NguyenTo-periodic-table/0.1 (static educational site; image build script)';

interface Bow {
  number: number;
  symbol: string;
  image?: { title: string; url: string; attribution: string };
}
const bow: Bow[] = JSON.parse(
  await readFile(join(ROOT, 'raw', 'bowserinator.json'), 'utf8')
).elements;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Ảnh trên Commons: xin bản thu nhỏ 960px (nhẹ hơn nhiều so với ảnh gốc); không có thì lấy gốc. */
async function download(url: string): Promise<Buffer> {
  const candidates: string[] = [];
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/(.+\/)([^/]+)$/);
  if (m) candidates.push(`${m[1]}/thumb/${m[2]}${m[3]}/960px-${m[3]}`);
  candidates.push(url);
  let last = '';
  for (const c of candidates) {
    const res = await fetch(c, { headers: { 'User-Agent': UA } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    last = `${res.status} ${c}`;
    await sleep(300);
  }
  throw new Error(`Tải ảnh thất bại: ${last}`);
}

await mkdir(OUT, { recursive: true });
const manifestPath = join(OUT, 'manifest.json');
const manifest: PhotoManifest = existsSync(manifestPath)
  ? JSON.parse(await readFile(manifestPath, 'utf8'))
  : {};

/** Lưu sau mỗi ảnh: lỗi giữa chừng thì lần chạy sau không phải tải lại từ đầu. */
async function saveManifest() {
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))
  );
  await writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
}

const skipped: string[] = [];
const errors: string[] = [];

for (const b of bow.filter((e) => e.number <= 118)) {
  const slug = b.symbol.toLowerCase();
  const img = b.image;
  const override = IMAGE_OVERRIDES[b.symbol];

  if (!img || PLACEHOLDER_IMAGE.test(img.url) || override === null) {
    delete manifest[slug];
    skipped.push(b.symbol);
    continue;
  }

  const url = override?.url ?? img.url;
  const parsed = override ?? parseAttribution(img.attribution);
  if (!parsed) {
    errors.push(`${b.symbol}: không nhận ra giấy phép trong "${img.attribution}"`);
    continue;
  }

  const large = join(OUT, photoFile(slug, 'large'));
  const thumb = join(OUT, photoFile(slug, 'thumb'));
  const mini = join(OUT, photoFile(slug, 'mini'));
  const fresh =
    !FORCE && manifest[slug]?.original === url && existsSync(large) && existsSync(thumb);

  if (!fresh) {
    process.stdout.write(`↓ ${b.symbol} … `);
    let buf: Buffer;
    try {
      buf = await download(url);
    } catch (e) {
      console.log('lỗi');
      errors.push(`${b.symbol}: ${(e as Error).message}`);
      continue;
    }
    const base = sharp(buf, { failOn: 'none' }).rotate();
    // Ảnh lớn: giữ tỉ lệ, cạnh dài tối đa 640px. Ảnh nhỏ: cắt vuông 240px quanh vùng nổi bật.
    const info = await base
      .clone()
      .resize({
        width: PHOTO_WIDTHS.large,
        height: PHOTO_WIDTHS.large,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .flatten({ background: '#ffffff' })
      .webp({ quality: 74, effort: 6 })
      .toFile(large);
    await base
      .clone()
      .resize({
        width: PHOTO_WIDTHS.thumb,
        height: PHOTO_WIDTHS.thumb,
        fit: 'cover',
        position: 'attention',
      })
      .flatten({ background: '#ffffff' })
      .webp({ quality: 72, effort: 6 })
      .toFile(thumb);
    console.log(`${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
    await rm(mini, { force: true });
    manifest[slug] = { w: info.width, h: info.height, original: url, credit: undefined! };
    await sleep(300);
  }

  // Ảnh mini cắt từ ảnh thumb đã có (không cần tải lại)
  if (!existsSync(mini)) {
    await sharp(thumb)
      .resize({ width: PHOTO_WIDTHS.mini, height: PHOTO_WIDTHS.mini })
      .webp({ quality: 70, effort: 6 })
      .toFile(mini);
  }

  manifest[slug] = {
    ...manifest[slug]!,
    credit: {
      title: img.title,
      author: parsed.author,
      license: parsed.license,
      licenseUrl: PHOTO_LICENSES[parsed.license],
      sourceUrl: override?.sourceUrl ?? sourcePageFor(url, img.attribution),
    },
  };
  await saveManifest();
}

await saveManifest();
console.log(`✓ ${Object.keys(manifest).length} ảnh; không có ảnh: ${skipped.join(', ')}`);
if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}

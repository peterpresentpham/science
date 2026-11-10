// Chép dữ liệu từ @chem/data sang public/ để phục vụ tĩnh:
// - dist/elements/*.json → public/data/elements (panel tải bằng fetch)
// - images/*.webp        → public/images/elements (ảnh nguyên tố, đã nén sẵn và commit trong @chem/data)
// - compounds/sdf/*.sdf  → public/data/compounds (cấu trúc hợp chất từ PubChem, trình xem 3D tải khi cần)
// - dist/nuclides.json   → public/data/nuclides.json (bản đồ hạt nhân, tải khi cuộn tới)
// - @rdkit/rdkit/dist    → public/rdkit (RDKit.js + WASM ≈ 7,5 MB, chỉ tải ở trang Dựng phân tử)
import { copyFile, cp, mkdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const data = join(here, '..', '..', '..', 'packages', 'data');
const pub = join(here, '..', 'public');

async function sync(src, dest, filter) {
  await rm(dest, { recursive: true, force: true });
  await mkdir(dest, { recursive: true });
  await cp(src, dest, { recursive: true, filter });
}

await sync(join(data, 'dist', 'elements'), join(pub, 'data', 'elements'));
await sync(join(data, 'images'), join(pub, 'images', 'elements'), (f) => !f.endsWith('.json'));
await sync(join(data, 'compounds', 'sdf'), join(pub, 'data', 'compounds'));
await copyFile(join(data, 'dist', 'nuclides.json'), join(pub, 'data', 'nuclides.json'));
// RDKit: tìm gói qua Node resolution (pnpm đặt trong node_modules/.pnpm), chỉ chép .js và .wasm
const rdkitDist = dirname(createRequire(import.meta.url).resolve('@rdkit/rdkit'));
await sync(rdkitDist, join(pub, 'rdkit'), (f) => !f.endsWith('.d.ts'));
console.log(
  '✓ synced element data → public/data/elements, photos → public/images/elements, SDF → public/data/compounds, RDKit → public/rdkit'
);

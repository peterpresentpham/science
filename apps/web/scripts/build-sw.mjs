// Chạy sau `next build` (script `postbuild`): đọc thư mục out/ rồi sinh
//   out/sw.js                : service worker (precache vỏ ứng dụng, cache khi duyệt, mở offline)
//   out/offline-manifest.json: danh sách file theo "gói offline" để trang /offline cho người dùng tải
// Không dùng thư viện: site tĩnh nên chỉ cần liệt kê file trong out/.
import { createHash } from 'node:crypto';
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const OUT = join(import.meta.dirname, '..', 'out');
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
const LOCALES = ['vi', 'en'];

async function walk(dir) {
  const files = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push({ path: p, bytes: (await stat(p)).size });
  }
  return files;
}

const files = (await walk(OUT)).map((f) => {
  const rel = relative(OUT, f.path).split(sep).join('/');
  // "vi/element/c/index.html" → "/vi/element/c/"
  const url =
    BASE +
    '/' +
    (rel.endsWith('/index.html') || rel === 'index.html' ? rel.replace(/index\.html$/, '') : rel);
  return { rel, url, bytes: f.bytes };
});

const sum = (list) => list.reduce((n, f) => n + f.bytes, 0);
const pack = (id, locale, list) => ({
  id,
  locale,
  bytes: sum(list),
  urls: list.map((f) => f.url).sort(),
});

// --- Vỏ ứng dụng: tải sẵn khi cài service worker ---
const SHELL_FILES = new Set([
  'manifest.webmanifest',
  'icon.svg',
  'favicon.ico',
  'apple-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  '404.html',
  'index.html',
  ...LOCALES.flatMap((l) => [`${l}/index.html`, `${l}/offline/index.html`]),
]);
const shell = files.filter((f) => f.rel.startsWith('_next/static/') || SHELL_FILES.has(f.rel));
const shellSet = new Set(shell.map((f) => f.url));

// --- Gói offline ---
const isPage = (f) => f.rel.endsWith('/index.html') && !shellSet.has(f.url);
const packs = [];
for (const l of LOCALES) {
  const pages = files.filter((f) => f.rel.startsWith(`${l}/`) && isPage(f));
  const elements = pages.filter((f) => f.rel.startsWith(`${l}/element/`));
  const compounds = pages.filter(
    (f) =>
      f.rel.startsWith(`${l}/compound/`) &&
      !/^[a-z]{2}\/compound\/(view\/)?index\.html$/.test(f.rel)
  );
  const rest = pages.filter((f) => !elements.includes(f) && !compounds.includes(f));
  packs.push(pack(`pages-${l}`, l, rest));
  packs.push(pack(`elements-${l}`, l, elements));
  packs.push(pack(`compounds-${l}`, l, compounds));
}
// Dữ liệu dùng chung: JSON nguyên tố, cấu trúc 3D (SDF), bản đồ hạt nhân, ảnh
packs.push(
  pack(
    'data',
    null,
    files.filter(
      (f) =>
        f.rel.startsWith('data/') ||
        (f.rel.startsWith('images/') && !f.rel.startsWith('images/elements/gallery/'))
    )
  )
);
// Ảnh thư viện trên trang nguyên tố (≈ 7 MB): gói riêng, tải khi người dùng muốn
packs.push(
  pack(
    'gallery',
    null,
    files.filter((f) => f.rel.startsWith('images/elements/gallery/'))
  )
);
// RDKit.js + WASM (≈ 7,5 MB) cho trang Dựng phân tử: gói riêng vì nặng
packs.push(
  pack(
    'rdkit',
    null,
    files.filter((f) => f.rel.startsWith('rdkit/'))
  )
);

const version = createHash('sha1')
  .update(
    shell
      .map((f) => f.url)
      .sort()
      .join('\n')
  )
  .update(String(sum(files.filter((f) => /^(vi|en)\/index\.html$/.test(f.rel)))))
  .digest('hex')
  .slice(0, 10);

await writeFile(join(OUT, 'offline-manifest.json'), JSON.stringify({ version, base: BASE, packs }));

const sw = `/* Sinh tự động bởi scripts/build-sw.mjs, không sửa tay. */
const VERSION = ${JSON.stringify(version)};
const BASE = ${JSON.stringify(BASE)};
const SHELL = 'shell-' + VERSION;
const RUNTIME = 'runtime-v1'; // chỉ chứa trang đã duyệt (được cắt bớt)
const ASSETS = 'assets-v1'; // JS/dữ liệu/ảnh/WASM: không cắt
const MAX_RUNTIME_PAGES = 120;
const PRECACHE = ${JSON.stringify(shell.map((f) => f.url).sort())};

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL);
      await Promise.allSettled(
        PRECACHE.map(async (u) => {
          const res = await fetch(u, { cache: 'reload' });
          if (res.ok) await cache.put(u, res);
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Chỉ xoá vỏ ứng dụng của phiên bản cũ; gói offline và trang đã duyệt được giữ lại
      for (const k of await caches.keys()) if (k.startsWith('shell-') && k !== SHELL) await caches.delete(k);
      await self.clients.claim();
    })()
  );
});

async function matchPage(href) {
  const url = new URL(href);
  url.hash = '';
  const opts = { ignoreSearch: true };
  const hit = await caches.match(url.href, opts);
  if (hit) return hit;
  if (!url.pathname.endsWith('/')) return caches.match(url.origin + url.pathname + '/', opts);
  return undefined;
}

async function trim(cache) {
  const keys = await cache.keys();
  for (const k of keys.slice(0, Math.max(0, keys.length - MAX_RUNTIME_PAGES))) await cache.delete(k);
}

async function navigate(req) {
  try {
    const res = await fetch(req);
    if (res.ok && res.type === 'basic') {
      const cache = await caches.open(RUNTIME);
      const clean = new URL(req.url);
      clean.search = '';
      clean.hash = '';
      await cache.put(clean.href, res.clone());
      await trim(cache);
    }
    return res;
  } catch {
    const hit = await matchPage(req.url);
    if (hit) return hit;
    // Trang chưa được lưu: về trang "Dùng offline" của ngôn ngữ đang xem để người dùng biết cần tải gói
    const seg = new URL(req.url).pathname.slice(BASE.length).split('/')[1];
    const locale = seg === 'en' ? 'en' : 'vi';
    return (
      (await matchPage(location.origin + BASE + '/' + locale + '/offline/')) ||
      new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
    );
  }
}

async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) (await caches.open(ASSETS)).put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req) {
  const hit = await caches.match(req);
  const fresh = fetch(req)
    .then(async (res) => {
      if (res.ok) (await caches.open(ASSETS)).put(req, res.clone());
      return res;
    })
    .catch(() => undefined);
  if (hit) {
    fresh.catch(() => undefined);
    return hit;
  }
  return (await fresh) || new Response('', { status: 504 });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // PubChem… luôn đi thẳng ra mạng
  const path = url.pathname;
  if (!path.startsWith(BASE + '/') || path === BASE + '/sw.js') return;
  if (req.mode === 'navigate') event.respondWith(navigate(req));
  else if (path.startsWith(BASE + '/_next/static/') || path.startsWith(BASE + '/rdkit/'))
    event.respondWith(cacheFirst(req)); // file có băm tên hoặc rất nặng (WASM), không cần hỏi lại mạng
  else if (path.endsWith('.txt')) return; // dữ liệu RSC: Next tự quay về tải trang đầy đủ khi lỗi
  else if (path.startsWith(BASE + '/data/') || path.startsWith(BASE + '/images/'))
    event.respondWith(staleWhileRevalidate(req));
});
`;
await writeFile(join(OUT, 'sw.js'), sw);

const mb = (b) => (b / 1048576).toFixed(1);
console.log(
  `✓ sw.js (precache ${shell.length} file, ${mb(sum(shell))} MB), offline-manifest.json: ` +
    packs.map((p) => `${p.id} ${p.urls.length} file/${mb(p.bytes)} MB`).join(' · ')
);

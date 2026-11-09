// Đóng gói worker lấy mẫu orbital thành một file JS tĩnh (public/workers/orbital.js).
// Turbopack (Next 16.4) chưa biên dịch `new Worker(new URL('./x.ts', import.meta.url))`: nó chép nguyên file .ts.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';

const here = dirname(fileURLToPath(import.meta.url));
await build({
  entryPoints: [join(here, '..', 'src', 'workers', 'orbital.worker.ts')],
  outfile: join(here, '..', 'public', 'workers', 'orbital.js'),
  bundle: true,
  format: 'iife',
  minify: true,
  target: 'es2022',
  legalComments: 'none',
  logLevel: 'warning',
});
console.log('✓ built worker → public/workers/orbital.js');

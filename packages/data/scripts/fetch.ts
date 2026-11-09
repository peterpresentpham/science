/**
 * Tải dữ liệu nguồn về raw/. Snapshot được commit để build không phụ thuộc mạng.
 * Chạy: pnpm --filter @chem/data fetch
 */
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const RAW = join(import.meta.dirname, '..', 'raw');

const SOURCES = [
  {
    file: 'pubchem-periodic.json',
    url: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON',
  },
  {
    file: 'bowserinator.json',
    url: 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json',
  },
];

for (const { file, url } of SOURCES) {
  const res = await fetch(url, { headers: { 'user-agent': 'chem-data-pipeline' } });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const json = await res.json();
  await writeFile(join(RAW, file), `${JSON.stringify(json, null, 1)}\n`);
  console.log(`✓ ${file}`);
}

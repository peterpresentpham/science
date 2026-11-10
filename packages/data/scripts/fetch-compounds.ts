/**
 * Tải hợp chất đã tuyển (curated/compounds.ts) và phân tử đơn chất (curated/structures.ts) từ PubChem:
 * thuộc tính + file SDF (3D nếu PubChem có cấu trúc 3D, không thì 2D).
 * Kết quả compounds/index.json + compounds/sdf/<cid>.sdf được commit, chỉ chạy lại khi cần (cần mạng):
 *   pnpm --filter @chem/data fetch:compounds            # chỉ tải chất còn thiếu
 *   pnpm --filter @chem/data fetch:compounds --force    # tải lại tất cả
 * Dữ liệu PubChem (NCBI) thuộc phạm vi công cộng.
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { parseFormula } from '@chem/core';

import { COMPOUNDS } from '../curated/compounds.ts';
import { STRUCTURES } from '../curated/structures.ts';
import type { Compound } from '../src/compound.ts';

const ROOT = join(import.meta.dirname, '..');
const OUT = join(ROOT, 'compounds');
const SDF = join(OUT, 'sdf');
const FORCE = process.argv.includes('--force');
const API = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';
const UA = { 'User-Agent': 'NguyenTo-periodic-table/0.1 (static educational site; build script)' };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
/** PubChem cho phép tối đa 5 yêu cầu/giây */
async function get(url: string): Promise<Response> {
  await sleep(250);
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers: UA });
    if (res.status !== 503) return res;
    await sleep(2000);
  }
  throw new Error(`PubChem bận: ${url}`);
}

const composition = (f: string): Record<string, number> => {
  const r = parseFormula(f.replace(/[+-]+$/, ''));
  if (!r.ok) throw new Error(`Công thức không đọc được: ${f} (${r.error.code})`);
  return Object.fromEntries([...r.value.composition].sort(([a], [b]) => a.localeCompare(b)));
};
const same = (a: Record<string, number>, b: Record<string, number>) =>
  JSON.stringify(a) === JSON.stringify(b);

await mkdir(SDF, { recursive: true });
const indexPath = join(OUT, 'index.json');
type Fetched = Omit<Compound, 'crystal'>;
const old: Fetched[] = existsSync(indexPath) ? JSON.parse(await readFile(indexPath, 'utf8')) : [];
const byCid = new Map(old.map((c) => [c.cid, c]));
const byQuery = new Map(old.filter((c) => c.query).map((c) => [c.query!, c]));

interface Job {
  cid?: number;
  q?: string;
  f?: string;
  vi: string | null;
  elemental: boolean;
}
const jobs: Job[] = [
  ...COMPOUNDS.map((c) => ({ cid: c.cid, q: c.q, f: c.f, vi: c.vi, elemental: false })),
  ...Object.values(STRUCTURES)
    .flat()
    .flatMap((s) =>
      s.kind === 'molecule' ? [{ cid: s.cid, vi: s.label?.vi ?? null, elemental: true }] : []
    ),
];

const result: Fetched[] = [];
const errors: string[] = [];

for (const job of jobs) {
  const key = job.q ?? `cid:${job.cid}`;
  try {
    const cached = job.cid ? byCid.get(job.cid) : byQuery.get(key);
    if (cached && !FORCE && existsSync(join(SDF, `${cached.cid}.sdf`))) {
      result.push({ ...cached, vi: job.vi ?? cached.vi, elemental: job.elemental });
      continue;
    }
    let cid = job.cid;
    if (!cid) {
      const r = await get(`${API}/compound/name/${encodeURIComponent(job.q!)}/cids/JSON`);
      if (!r.ok) throw new Error(`không tìm thấy (HTTP ${r.status})`);
      cid = ((await r.json()) as { IdentifierList: { CID: number[] } }).IdentifierList.CID[0];
      if (!cid) throw new Error('PubChem không trả CID');
    }
    const props = [
      'Title',
      'MolecularFormula',
      'MolecularWeight',
      'IUPACName',
      'SMILES',
      'Charge',
    ].join(',');
    const pr = await get(`${API}/compound/cid/${cid}/property/${props}/JSON`);
    if (!pr.ok) throw new Error(`thuộc tính HTTP ${pr.status}`);
    const p = (
      (await pr.json()) as {
        PropertyTable: {
          Properties: Array<{
            Title: string;
            MolecularFormula: string;
            MolecularWeight: string;
            IUPACName?: string;
            SMILES?: string;
            Charge?: number;
          }>;
        };
      }
    ).PropertyTable.Properties[0]!;
    if (job.f && !same(composition(job.f), composition(p.MolecularFormula))) {
      throw new Error(`CID ${cid} có công thức ${p.MolecularFormula}, mong đợi ${job.f}`);
    }
    let dim: 2 | 3 = 3;
    let sdf = await get(`${API}/compound/cid/${cid}/record/SDF?record_type=3d`);
    if (!sdf.ok) {
      dim = 2;
      sdf = await get(`${API}/compound/cid/${cid}/record/SDF?record_type=2d`);
      if (!sdf.ok) throw new Error(`SDF HTTP ${sdf.status}`);
    }
    await writeFile(join(SDF, `${cid}.sdf`), await sdf.text());
    const formula = job.f ?? p.MolecularFormula;
    result.push({
      cid,
      query: job.q ?? null,
      vi: job.vi,
      en: p.Title,
      formula,
      pubchemFormula: p.MolecularFormula,
      iupac: p.IUPACName ?? null,
      mw: Number(p.MolecularWeight),
      smiles: p.SMILES ?? null,
      charge: p.Charge ?? 0,
      elements: Object.keys(composition(formula)),
      dim,
      elemental: job.elemental,
    });
    console.log(`✓ ${key} → CID ${cid} (${dim}D)`);
  } catch (e) {
    errors.push(`${key}: ${(e as Error).message}`);
    console.log(`✗ ${key}: ${(e as Error).message}`);
  }
}

// Bỏ trùng (một CID có thể vừa là hợp chất vừa là đơn chất)
const unique = [...new Map(result.map((c) => [c.cid, c])).values()].sort((a, b) => a.cid - b.cid);
await writeFile(indexPath, `${JSON.stringify(unique, null, 1)}\n`);
console.log(`→ compounds/index.json: ${unique.length} chất, ${errors.length} lỗi`);
for (const e of errors) console.log(`  ✗ ${e}`);
if (errors.length) process.exitCode = 1;

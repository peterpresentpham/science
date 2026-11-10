/*
 * Kiểm tra dữ liệu phản ứng của phòng thí nghiệm ảo (curated/reactions.ts).
 * Chạy: pnpm --filter @chem/data exec tsx scripts/check-reactions.ts
 * Báo lỗi (thoát mã 1) khi: sai schema, trùng id, phương trình không cân bằng được hoặc hệ số ghi
 * khác kết quả balance(), chất ở reactants/products không khớp phương trình, công thức không đọc được,
 * cid không có trong danh sách hợp chất, kết tủa/khí không nằm trong products (hoặc sai trạng thái).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { balance, parseEquation, parseFormula } from '@chem/core';

import { REACTIONS } from '../curated/reactions';
import { Reaction, REACTION_CATEGORIES } from '../src/reaction';

const errors: string[] = [];
const fail = (id: string, msg: string) => errors.push(`[${id}] ${msg}`);

/** Chuẩn hoá công thức để so sánh; null nếu không đọc được. */
const norm = (f: string) => {
  const r = parseFormula(f);
  return r.ok ? r.value.normalized : null;
};

/** Khoá thành phần đã rút gọn (P2O5 ≡ P4O10) để so với hợp chất đã tuyển. */
function reducedKey(f: string): string | null {
  const r = parseFormula(f);
  if (!r.ok) return null;
  const counts = [...r.value.composition.values()];
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const g = counts.reduce(gcd, 0) || 1;
  return `${[...r.value.composition]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([el, n]) => `${el}${n / g}`)
    .join('')}|${r.value.charge}`;
}

// Hợp chất đã tuyển (sinh bởi `pnpm data:build`)
let compounds: Array<{ cid: number; formula: string }> = [];
try {
  compounds = JSON.parse(
    readFileSync(join(import.meta.dirname, '..', 'dist', 'compounds.json'), 'utf8')
  );
} catch {
  console.error('Thiếu dist/compounds.json: chạy `pnpm data:build` trước.');
  process.exit(1);
}
const byCid = new Map(compounds.map((c) => [c.cid, c]));

const seen = new Set<string>();
const parsed: Reaction[] = [];
for (const [i, raw] of REACTIONS.entries()) {
  const id = (raw as { id?: string }).id ?? `#${i}`;
  const res = Reaction.safeParse(raw);
  if (!res.success) {
    for (const issue of res.error.issues)
      fail(id, `schema: ${issue.path.join('.')}: ${issue.message}`);
    continue;
  }
  const r = res.data;
  parsed.push(r);
  if (seen.has(r.id)) fail(r.id, 'id bị trùng');
  seen.add(r.id);

  // Công thức đọc được
  const all = [...r.reactants, ...r.products];
  for (const s of all)
    if (norm(s.formula) === null) fail(r.id, `không đọc được công thức "${s.formula}"`);

  // Phương trình
  const eq = parseEquation(r.equation);
  if (!eq.ok) {
    fail(r.id, `phương trình không đọc được: ${eq.error.code}`);
    continue;
  }
  const bal = balance(r.equation);
  if (!bal.ok && bal.error.code === 'multiple') {
    // Phản ứng oxi hoá khử mà một chất vừa khử vừa oxi hoá được (ví dụ H₂O₂) có nhiều nghiệm đại số:
    // balance() không chọn được. Khi đó kiểm hệ số đã ghi có bảo toàn nguyên tố và điện tích hay không.
    const sums = new Map<string, number>();
    for (const sp of eq.value.species) {
      const sign = sp.side === 'reactant' ? 1 : -1;
      const c = sp.given ?? 1;
      for (const [el, n] of sp.formula.composition)
        sums.set(el, (sums.get(el) ?? 0) + sign * c * n);
      sums.set('charge', (sums.get('charge') ?? 0) + sign * c * sp.formula.charge);
    }
    for (const [el, d] of sums)
      if (d !== 0) fail(r.id, `hệ số đã ghi không bảo toàn ${el} (lệch ${d})`);
  } else if (!bal.ok) {
    fail(r.id, `balance() lỗi: ${bal.error.code}`);
  } else {
    bal.value.coefficients.forEach((c, k) => {
      const given = eq.value.species[k]!.given ?? 1;
      if (BigInt(given) !== c)
        fail(r.id, `hệ số của ${eq.value.species[k]!.text}: ghi ${given}, balance() cho ${c}`);
    });
  }

  // Chất trong phương trình = chất khai báo, theo từng vế
  const side = (s: 'reactant' | 'product') =>
    eq.value.species
      .filter((x) => x.side === s)
      .map((x) => x.formula.normalized)
      .sort();
  const declared = (list: typeof r.reactants) =>
    list.map((s) => norm(s.formula) ?? s.formula).sort();
  // H₂O, O₂… có thể được khai báo thêm làm chất tham gia mà không nằm trong phương trình? Không: phải khớp.
  const lr = side('reactant');
  const dr = declared(r.reactants);
  if (lr.join('|') !== dr.join('|'))
    fail(r.id, `chất tham gia không khớp phương trình: phương trình [${lr}] ≠ khai báo [${dr}]`);
  const lp = side('product');
  const dp = declared(r.products);
  if (lp.join('|') !== dp.join('|'))
    fail(r.id, `sản phẩm không khớp phương trình: phương trình [${lp}] ≠ khai báo [${dp}]`);

  // cid phải có trong danh sách và cùng công thức
  for (const s of all) {
    if (s.cid === undefined) continue;
    const c = byCid.get(s.cid);
    if (!c) fail(r.id, `cid ${s.cid} (${s.formula}) không có trong curated/compounds.ts`);
    else if (reducedKey(c.formula) !== reducedKey(s.formula))
      fail(r.id, `cid ${s.cid} là ${c.formula}, không khớp ${s.formula}`);
  }

  // Kết tủa và khí phải là sản phẩm có đúng trạng thái
  const { precipitate, gas } = r.observations;
  if (precipitate) {
    const p = r.products.find((s) => norm(s.formula) === norm(precipitate.formula));
    if (!p) fail(r.id, `kết tủa ${precipitate.formula} không nằm trong products`);
    else if (p.state !== 's') fail(r.id, `kết tủa ${precipitate.formula} phải có state "s"`);
  }
  if (gas) {
    const g = r.products.find((s) => norm(s.formula) === norm(gas.formula));
    if (!g) fail(r.id, `khí ${gas.formula} không nằm trong products`);
    else if (g.state !== 'g') fail(r.id, `khí ${gas.formula} phải có state "g"`);
  }
  // Nhất quán nhẹ giữa nhiệt phản ứng và nhóm
  if (r.category.includes('exothermic') && r.observations.heat !== 'exo')
    fail(r.id, 'category có "exothermic" nhưng observations.heat không phải "exo"');
  if (r.category.includes('endothermic') && r.observations.heat !== 'endo')
    fail(r.id, 'category có "endothermic" nhưng observations.heat không phải "endo"');
  if (r.category.includes('combustion') && !r.observations.light)
    fail(r.id, 'phản ứng cháy cần observations.light');
}

// --- Báo cáo ---
console.log(`\n${parsed.length}/${REACTIONS.length} phản ứng qua schema`);
const byCat = new Map<string, number>(REACTION_CATEGORIES.map((c) => [c, 0]));
for (const r of parsed) for (const c of r.category) byCat.set(c, (byCat.get(c) ?? 0) + 1);
console.log('Theo nhóm:', [...byCat].map(([c, n]) => `${c} ${n}`).join(' · '));
console.log(
  'Theo lớp:',
  [10, 11, 12].map((g) => `lớp ${g}: ${parsed.filter((r) => r.grade === g).length}`).join(' · ')
);
const species = new Set(
  parsed.flatMap((r) => [...r.reactants, ...r.products].map((s) => s.formula))
);
const withCid = new Set(
  parsed.flatMap((r) => [...r.reactants, ...r.products].filter((s) => s.cid).map((s) => s.formula))
);
console.log(`Chất: ${species.size} loại, ${withCid.size} có liên kết sang trang hợp chất`);
console.log(
  'Chưa có trong compounds.ts:',
  [...species]
    .filter((f) => !withCid.has(f))
    .sort()
    .join(', ')
);

if (REACTIONS.length !== 50) errors.push(`cần đúng 50 phản ứng, hiện có ${REACTIONS.length}`);

if (errors.length) {
  console.error(`\n✗ ${errors.length} lỗi:\n${errors.map((e) => `  ${e}`).join('\n')}`);
  process.exit(1);
}
console.log('\n✓ Dữ liệu phản ứng hợp lệ');

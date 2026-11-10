import { parseFormula } from '@chem/core';
import type { Compound } from '@chem/data';
import compoundsJson from '@chem/data/compounds.json';

import { BASE_PATH, BY_SLUG } from './elements';

export const COMPOUNDS = compoundsJson as Compound[];
export const BY_CID: ReadonlyMap<number, Compound> = new Map(COMPOUNDS.map((c) => [c.cid, c]));

export const sdfUrl = (cid: number) => `${BASE_PATH}/data/compounds/${cid}.sdf`;
export const pubchemUrl = (cid: number) => `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`;

/** Tên hiển thị: tiếng Việt nếu có; phân tử đơn chất không có tên riêng thì lấy tên nguyên tố. */
export function compoundName(c: Compound, locale: string): string {
  if (locale === 'vi' && c.vi) return c.vi;
  if (locale === 'vi' && c.elemental && c.elements.length === 1) {
    const el = BY_SLUG.get(c.elements[0]!.toLowerCase());
    if (el) return `${el.name.vi} (${c.formula})`;
  }
  return c.en;
}

/** Khoá so sánh công thức: thành phần nguyên tố đã sắp xếp + điện tích */
function formulaKey(f: string): string | null {
  const r = parseFormula(f);
  if (!r.ok) return null;
  const parts = [...r.value.composition].sort(([a], [b]) => a.localeCompare(b));
  return `${parts.map(([e, n]) => `${e}${n}`).join('')}|${r.value.charge}`;
}

const BY_FORMULA = new Map<string, Compound>();
for (const c of COMPOUNDS) {
  const k = formulaKey(c.formula);
  // Ưu tiên chất đã tuyển cho hợp chất (không phải phân tử đơn chất trùng công thức)
  if (k && !BY_FORMULA.has(k)) BY_FORMULA.set(k, c);
}

/** Tìm hợp chất đã tuyển có cùng công thức (dùng khi bấm vào một chất trong phương trình). */
export function compoundByFormula(f: string): Compound | null {
  const k = formulaKey(f);
  return k ? (BY_FORMULA.get(k) ?? null) : null;
}

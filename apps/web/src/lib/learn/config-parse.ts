import { electronConfiguration, L_LETTER } from '@chem/core';

/** Lõi khí hiếm có thể viết tắt ở đầu: [Ar] 3d6 4s2 */
const CORE: Record<string, number> = { He: 2, Ne: 10, Ar: 18, Kr: 36, Xe: 54, Rn: 86 };

const SUP: Record<string, string> = Object.fromEntries(
  '⁰¹²³⁴⁵⁶⁷⁸⁹'.split('').map((c, i) => [c, String(i)])
);

const mapOf = (z: number) =>
  new Map(electronConfiguration(z).map((s) => [`${s.n}${L_LETTER[s.l]}`, s.electrons]));

/**
 * Đọc cấu hình electron người dùng gõ: "1s2 2s2 2p4", "1s²2s²2p⁴", "[He] 2s2 2p4", "[Ar]3d6 4s2"…
 * Không phân biệt thứ tự phân lớp. Trả về null nếu có phần không hiểu được.
 */
export function parseConfig(input: string): Map<string, number> | null {
  let text = [...input].map((c) => SUP[c] ?? c).join('');
  text = text.replace(/[\^{}_]/g, '').replace(/<\/?sup>/gi, '');
  const out = new Map<string, number>();
  const core = /\[\s*([A-Z][a-z]?)\s*\]/.exec(text);
  if (core) {
    const z = CORE[core[1]!];
    if (!z) return null;
    for (const [k, v] of mapOf(z)) out.set(k, v);
    text = text.replace(core[0], ' ');
  }
  const re = /(\d)\s*([spdf])\s*(\d{1,2})/gi;
  let rest = text;
  for (const m of text.matchAll(re)) {
    const key = `${m[1]}${m[2]!.toLowerCase()}`;
    if (out.has(key)) return null; // cùng một phân lớp viết hai lần
    out.set(key, Number(m[3]));
    rest = rest.replace(m[0], ' ');
  }
  if (out.size === 0 || /[A-Za-z0-9]/.test(rest)) return null;
  return out;
}

/** Cấu hình đúng của nguyên tố Z (không phụ thuộc thứ tự, kể cả ngoại lệ Cr, Cu). */
export function isCorrectConfig(z: number, input: string): boolean {
  const got = parseConfig(input);
  if (!got) return false;
  const want = mapOf(z);
  return got.size === want.size && [...want].every(([k, v]) => got.get(k) === v);
}

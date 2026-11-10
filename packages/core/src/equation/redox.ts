import type { ParsedFormula, TopGroup } from '../formula';
import { gcd, lcm, Q } from '../rational';
import type { BalanceResult } from './balance';

/*
 * Số oxi hoá và giải thích theo phương pháp thăng bằng electron (SGK).
 * Quy tắc gán (theo thứ tự ưu tiên): đơn chất = 0; ion đơn nguyên tử = điện tích; F = −1;
 * kim loại kiềm = +1; kiềm thổ = +2; Al = +3; H = +1; O = −2; nhận diện ion đa nguyên tử quen thuộc
 * (SO4, NO3, NH4…); nguyên tố còn lại giải từ tổng = điện tích. Nếu mâu thuẫn thì nới O (peroxit, OF2)
 * rồi H (hiđrua kim loại). Hợp chất hữu cơ: số oxi hoá trung bình của C (có thể là phân số, vd. Fe3O4 → +8/3).
 */

export interface OxEntry {
  element: string;
  ox: Q;
  atoms: number;
}

const ALKALI = new Set(['Li', 'Na', 'K', 'Rb', 'Cs', 'Fr']);
const ALKALINE_EARTH = new Set(['Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Ra']);

/** Ion đa nguyên tử quen thuộc trong chương trình phổ thông. */
const IONS: Array<{ comp: Record<string, number>; charge: number }> = [
  { comp: { N: 1, O: 3 }, charge: -1 },
  { comp: { N: 1, O: 2 }, charge: -1 },
  { comp: { S: 1, O: 4 }, charge: -2 },
  { comp: { S: 1, O: 3 }, charge: -2 },
  { comp: { H: 1, S: 1, O: 4 }, charge: -1 },
  { comp: { C: 1, O: 3 }, charge: -2 },
  { comp: { H: 1, C: 1, O: 3 }, charge: -1 },
  { comp: { P: 1, O: 4 }, charge: -3 },
  { comp: { H: 1, P: 1, O: 4 }, charge: -2 },
  { comp: { H: 2, P: 1, O: 4 }, charge: -1 },
  { comp: { O: 1, H: 1 }, charge: -1 },
  { comp: { N: 1, H: 4 }, charge: 1 },
  { comp: { Cl: 1, O: 1 }, charge: -1 },
  { comp: { Cl: 1, O: 3 }, charge: -1 },
  { comp: { Cl: 1, O: 4 }, charge: -1 },
  { comp: { Mn: 1, O: 4 }, charge: -1 },
  { comp: { Cr: 1, O: 4 }, charge: -2 },
  { comp: { Cr: 2, O: 7 }, charge: -2 },
  { comp: { Si: 1, O: 3 }, charge: -2 },
  { comp: { C: 2, H: 3, O: 2 }, charge: -1 },
  { comp: { C: 1, N: 1 }, charge: -1 },
];

/** Số oxi hoá âm quen thuộc của phi kim + độ âm điện (Pauling) để chọn nguyên tố mang số âm. */
const NONMETAL: Record<string, { ox: number; en: number }> = {
  Cl: { ox: -1, en: 3.16 },
  Br: { ox: -1, en: 2.96 },
  I: { ox: -1, en: 2.66 },
  S: { ox: -2, en: 2.58 },
  Se: { ox: -2, en: 2.55 },
  N: { ox: -3, en: 3.04 },
  P: { ox: -3, en: 2.19 },
  C: { ox: -4, en: 2.55 },
};

const sameComp = (a: Map<string, number>, b: Record<string, number>) =>
  a.size === Object.keys(b).length && [...a].every(([k, v]) => b[k] === v);

const fixedOx = (el: string, onlyMetalsWithH: boolean): number | null => {
  if (el === 'F') return -1;
  if (ALKALI.has(el)) return 1;
  if (ALKALINE_EARTH.has(el)) return 2;
  if (el === 'Al') return 3;
  if (el === 'H') return onlyMetalsWithH ? -1 : 1;
  if (el === 'O') return -2;
  return null;
};

/** Giải một khối (không tách ion): gán cố định, nguyên tố còn lại (nhiều nhất 1) giải từ tổng. */
function solveBlock(comp: Map<string, number>, charge: number): OxEntry[] | null {
  const els = [...comp.keys()];
  // Pirit FeS2 chứa ion S2²⁻ (S = −1), không theo quy tắc hợp chất hai nguyên tố
  if (charge === 0 && sameComp(comp, { Fe: 1, S: 2 })) {
    return [
      { element: 'Fe', ox: Q.of(2), atoms: 1 },
      { element: 'S', ox: Q.of(-1), atoms: 2 },
    ];
  }
  if (els.length === 1) {
    const el = els[0]!;
    return [{ element: el, ox: Q.of(charge, comp.get(el)!), atoms: comp.get(el)! }];
  }
  // Hiđrua kim loại: chỉ gồm H và kim loại kiềm/kiềm thổ/Al
  const hydride =
    comp.has('H') &&
    els.every((e) => e === 'H' || ALKALI.has(e) || ALKALINE_EARTH.has(e) || e === 'Al');
  // Thử lần lượt: đủ quy tắc → nới O → nới H
  for (const release of [[], ['O'], ['O', 'H']] as string[][]) {
    const fixed = new Map<string, Q>();
    for (const el of els) {
      if (release.includes(el)) continue;
      const v = fixedOx(el, hydride);
      if (v !== null) fixed.set(el, Q.of(v));
    }
    const unknown = els.filter((e) => !fixed.has(e));
    let sum = Q.ZERO;
    for (const [el, v] of fixed) sum = sum.add(v.mul(Q.of(comp.get(el)!)));
    const rest = Q.of(charge).sub(sum);
    if (unknown.length === 0) {
      if (rest.isZero())
        return els.map((el) => ({ element: el, ox: fixed.get(el)!, atoms: comp.get(el)! }));
      continue;
    }
    if (unknown.length === 2 && els.length === 2) {
      // Hợp chất hai nguyên tố: phi kim âm điện hơn nhận số oxi hoá âm quen thuộc (FeCl3, CuS, PCl5, CS2)
      const [x, y] = unknown as [string, string];
      const nx = NONMETAL[x];
      const ny = NONMETAL[y];
      const neg = nx && (!ny || nx.en >= ny.en) ? x : ny ? y : null;
      if (neg) {
        const pos = neg === x ? y : x;
        const negOx = Q.of(NONMETAL[neg]!.ox);
        const posOx = Q.of(charge)
          .sub(negOx.mul(Q.of(comp.get(neg)!)))
          .div(Q.of(comp.get(pos)!));
        return [
          { element: pos, ox: posOx, atoms: comp.get(pos)! },
          { element: neg, ox: negOx, atoms: comp.get(neg)! },
        ];
      }
      return null;
    }
    if (unknown.length === 1) {
      const u = unknown[0]!;
      const ox = rest.div(Q.of(comp.get(u)!));
      // Kim loại cố định không được nới; nguyên tố được nới phải ra giá trị hợp lý (|ox| ≤ 8)
      if (Math.abs(ox.toNumber()) > 8) continue;
      return els.map((el) => ({
        element: el,
        ox: el === u ? ox : fixed.get(el)!,
        atoms: comp.get(el)!,
      }));
    }
    return null; // ≥ 2 nguyên tố chưa biết: để bước nhận diện ion xử lý
  }
  return null;
}

const merge = (groups: TopGroup[]) => {
  const m = new Map<string, number>();
  for (const g of groups) for (const [el, k] of g.composition) m.set(el, (m.get(el) ?? 0) + k);
  return m;
};

/** Gộp các mục cùng nguyên tố và cùng số oxi hoá (vd. H của C2H5 và H của OH trong C2H5OH). */
function mergeEntries(entries: OxEntry[]): OxEntry[] {
  const out: OxEntry[] = [];
  for (const e of entries) {
    const same = out.find((o) => o.element === e.element && o.ox.toString() === e.ox.toString());
    if (same) same.atoms += e.atoms;
    else out.push({ ...e });
  }
  return out;
}

/** Thử tách một ion đa nguyên tử quen thuộc ở đầu hoặc cuối dãy nhóm (vd. FeSO4, NH4Cl, NH4NO3). */
function solveWithIons(groups: TopGroup[], charge: number): OxEntry[] | null {
  // Thử tách ion quen thuộc trước (NH4NO3 → N −3 và +5 như SGK, thay vì trung bình +1), rồi mới giải cả khối
  const n = groups.length;
  const candidates: Array<{ from: number; to: number }> = [];
  for (let len = 1; len < n; len++) {
    candidates.push({ from: n - len, to: n }); // hậu tố
    candidates.push({ from: 0, to: len }); // tiền tố
  }
  for (const { from, to } of candidates) {
    const seg = groups.slice(from, to);
    const segComp = merge(seg);
    // Nhóm trong ngoặc có chỉ số, vd. (SO4)3: so sánh với một đơn vị ion
    const unit = seg.length === 1 && seg[0]!.paren ? seg[0]!.count : 1;
    const unitComp = new Map([...segComp].map(([k, v]) => [k, v / unit]));
    const ion = IONS.find((i) => sameComp(unitComp, i.comp));
    if (!ion) continue;
    const ionEntries = solveBlock(new Map(Object.entries(ion.comp)), ion.charge);
    if (!ionEntries) continue;
    const rest = [...groups.slice(0, from), ...groups.slice(to)];
    const restCharge = charge - ion.charge * unit;
    const restEntries = rest.length
      ? solveWithIons(rest, restCharge)
      : restCharge === 0
        ? []
        : null;
    if (!restEntries) continue;
    return mergeEntries([
      ...restEntries,
      ...ionEntries.map((e) => ({ ...e, atoms: e.atoms * unit })),
    ]);
  }
  return solveBlock(merge(groups), charge);
}

/** Số oxi hoá các nguyên tố trong một chất; null nếu không gán được chắc chắn. */
export function oxidationStates(f: ParsedFormula): OxEntry[] | null {
  if (f.electron) return [];
  if (f.parts.length === 1) return solveWithIons(f.parts[0]!.groups, f.charge);
  // Hydrat: phần đầu mang điện tích, các phần sau (nước…) trung hoà
  const out: OxEntry[] = [];
  for (const [i, p] of f.parts.entries()) {
    const e = solveWithIons(p.groups, i === 0 ? f.charge : 0);
    if (!e) return null;
    out.push(...e.map((x) => ({ ...x, atoms: x.atoms * p.coef })));
  }
  return out;
}

export interface HalfReaction {
  element: string;
  from: Q;
  to: Q;
  /** Số nguyên tử trong một quá trình (vd. 2 cho 2Cl⁻ → Cl₂) */
  atoms: number;
  /** Số electron nhường (oxidation) hoặc nhận (reduction) trong một quá trình */
  electrons: bigint;
  kind: 'oxidation' | 'reduction';
  /** Hệ số nhân để số electron nhường = nhận */
  multiplier: bigint;
}

export interface RedoxExplanation {
  /** Chỉ số các chất (vế trái) chứa nguyên tố bị oxi hoá */
  reducing: number[];
  /** Chỉ số các chất (vế trái) chứa nguyên tố bị khử */
  oxidizing: number[];
  lines: HalfReaction[];
  /** Tổng số electron trao đổi theo phương trình đã cân bằng */
  electrons: bigint;
  /** Số oxi hoá của từng chất (theo thứ tự chất) */
  states: OxEntry[][];
}

const key = (q: Q) => q.toString();

/**
 * Giải thích phương trình đã cân bằng theo thăng bằng electron.
 * Trả về null nếu không phải phản ứng oxi hoá – khử, không gán được số oxi hoá, hoặc quá phức tạp
 * để trình bày theo cách SGK (khi đó giao diện chỉ hiện phương pháp ma trận).
 */
export function explainRedox(r: BalanceResult): RedoxExplanation | null {
  const sp = r.equation.species;
  const states: OxEntry[][] = [];
  for (const s of sp) {
    const st = oxidationStates(s.formula);
    if (!st) return null;
    states.push(st);
  }
  const rc = r.equation.reactantCount;
  const elements = new Set(states.flat().map((e) => e.element));
  const lines: Omit<HalfReaction, 'multiplier'>[] = [];
  const reducing = new Set<number>();
  const oxidizing = new Set<number>();
  const changed: Array<{ line: Omit<HalfReaction, 'multiplier'>; total: bigint }> = [];

  for (const el of elements) {
    // Số nguyên tử theo từng mức oxi hoá ở mỗi vế (đã nhân hệ số)
    const side = (from: number, to: number) => {
      const m = new Map<string, { ox: Q; atoms: bigint; species: number[] }>();
      for (let i = from; i < to; i++) {
        for (const e of states[i]!) {
          if (e.element !== el) continue;
          const k = key(e.ox);
          const cur = m.get(k) ?? { ox: e.ox, atoms: 0n, species: [] };
          cur.atoms += BigInt(e.atoms) * r.coefficients[i]!;
          cur.species.push(i);
          m.set(k, cur);
        }
      }
      return m;
    };
    const R = side(0, rc);
    const P = side(rc, sp.length);
    // Bỏ phần không đổi số oxi hoá
    for (const [k, v] of R) {
      const p = P.get(k);
      if (!p) continue;
      const same = v.atoms < p.atoms ? v.atoms : p.atoms;
      v.atoms -= same;
      p.atoms -= same;
    }
    const Rc = [...R.values()].filter((v) => v.atoms > 0n);
    const Pc = [...P.values()].filter((v) => v.atoms > 0n);
    if (Rc.length === 0 && Pc.length === 0) continue;
    let pairs: Array<{ a: (typeof Rc)[number]; b: (typeof Pc)[number]; atoms: bigint }>;
    if (Rc.length === 1) pairs = Pc.map((b) => ({ a: Rc[0]!, b, atoms: b.atoms }));
    else if (Pc.length === 1) pairs = Rc.map((a) => ({ a, b: Pc[0]!, atoms: a.atoms }));
    else return null;

    for (const { a, b, atoms } of pairs) {
      const delta = b.ox.sub(a.ox);
      if (delta.isZero()) continue;
      // Số nguyên tử trong một quá trình: theo chỉ số của nguyên tố trong chất đầu và chất cuối
      const perSpecies = (i: number) =>
        BigInt(states[i]!.filter((e) => e.element === el).reduce((s, e) => s + e.atoms, 0));
      let k = lcm(
        perSpecies(a.species[0]!),
        b.species.length === 1 ? perSpecies(b.species[0]!) : 1n
      );
      // k·Δ phải nguyên và k phải chia hết số nguyên tử thực sự đổi số oxi hoá; không được thì lùi về
      // mẫu số của Δ, cuối cùng là toàn bộ số nguyên tử
      const den = delta.d;
      if ((k * delta.n) % den !== 0n) k = lcm(k, den);
      if (atoms % k !== 0n) k = atoms % den === 0n ? den : atoms;
      const e = (k * (delta.n < 0n ? -delta.n : delta.n)) / den;
      const line = {
        element: el,
        from: a.ox,
        to: b.ox,
        atoms: Number(k),
        electrons: e,
        kind: (delta.sign() > 0 ? 'oxidation' : 'reduction') as HalfReaction['kind'],
      };
      changed.push({ line, total: (atoms / k) * e });
      for (const i of a.species) (line.kind === 'oxidation' ? reducing : oxidizing).add(i);
    }
  }
  if (changed.length === 0) return null;

  const lost = changed.filter((c) => c.line.kind === 'oxidation').reduce((s, c) => s + c.total, 0n);
  const gained = changed
    .filter((c) => c.line.kind === 'reduction')
    .reduce((s, c) => s + c.total, 0n);
  if (lost !== gained || lost === 0n) return null;

  // Hệ số nhân của từng quá trình = số lần quá trình xảy ra theo phương trình đã cân bằng,
  // chia cho ƯCLN chung để ra dạng gọn như SGK
  const times = changed.map((c) => c.total / c.line.electrons);
  let g = 0n;
  for (const t of times) g = gcd(g, t);
  lines.push(...changed.map((c) => c.line));
  return {
    reducing: [...reducing].filter((i) => i < rc).sort((x, y) => x - y),
    oxidizing: [...oxidizing].filter((i) => i < rc).sort((x, y) => x - y),
    lines: lines.map((l, i) => ({ ...l, multiplier: times[i]! / (g || 1n) })),
    electrons: lost,
    states,
  };
}

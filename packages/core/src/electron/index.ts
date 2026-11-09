/**
 * Cấu hình electron ở trạng thái cơ bản.
 *
 * - Điền theo quy tắc Madelung (n + l tăng dần, cùng n + l thì n nhỏ trước).
 * - Các ngoại lệ lấy theo cấu hình cơ bản của NIST (Atomic Spectra Database).
 * - Nguyên tố siêu nặng (Z > 103) chưa có dữ liệu đo: dùng Madelung (dự đoán).
 */

export type L = 0 | 1 | 2 | 3;

export interface Subshell {
  n: number;
  l: L;
  electrons: number;
}

export const L_LETTER = ['s', 'p', 'd', 'f'] as const;

export const capacity = (l: L) => 2 * (2 * l + 1);

export const subshellLabel = (n: number, l: L) => `${n}${L_LETTER[l]}`;

/** Thứ tự điền theo Madelung, đủ cho Z ≤ 118. */
export const MADELUNG: ReadonlyArray<readonly [n: number, l: L]> = (() => {
  const order: Array<[number, L]> = [];
  for (let sum = 1; order.length < 19; sum++) {
    // cùng n + l thì n nhỏ trước, tức l lớn trước
    for (let l = Math.min(3, sum - 1) as number; l >= 0; l--) {
      const n = sum - l;
      if (n > l && n <= 7) order.push([n, l as L]);
      if (order.length === 19) break;
    }
  }
  return order;
})();

type Override = Record<string, number>;

/**
 * Ngoại lệ so với Madelung, viết dưới dạng ghi đè số electron của các phân lớp.
 * Ví dụ Cr: Madelung cho 3d4 4s2, thực tế 3d5 4s1.
 */
export const EXCEPTIONS: Readonly<Record<number, Override>> = {
  24: { '3d': 5, '4s': 1 }, // Cr
  29: { '3d': 10, '4s': 1 }, // Cu
  41: { '4d': 4, '5s': 1 }, // Nb
  42: { '4d': 5, '5s': 1 }, // Mo
  44: { '4d': 7, '5s': 1 }, // Ru
  45: { '4d': 8, '5s': 1 }, // Rh
  46: { '4d': 10, '5s': 0 }, // Pd
  47: { '4d': 10, '5s': 1 }, // Ag
  57: { '4f': 0, '5d': 1 }, // La
  58: { '4f': 1, '5d': 1 }, // Ce
  64: { '4f': 7, '5d': 1 }, // Gd
  78: { '5d': 9, '6s': 1 }, // Pt
  79: { '5d': 10, '6s': 1 }, // Au
  89: { '5f': 0, '6d': 1 }, // Ac
  90: { '5f': 0, '6d': 2 }, // Th
  91: { '5f': 2, '6d': 1 }, // Pa
  92: { '5f': 3, '6d': 1 }, // U
  93: { '5f': 4, '6d': 1 }, // Np
  96: { '5f': 7, '6d': 1 }, // Cm
  103: { '6d': 0, '7p': 1 }, // Lr
};

export const NOBLE_GASES = [2, 10, 18, 36, 54, 86, 118] as const;
export const NOBLE_GAS_SYMBOL: Readonly<Record<number, string>> = {
  2: 'He',
  10: 'Ne',
  18: 'Ar',
  36: 'Kr',
  54: 'Xe',
  86: 'Rn',
  118: 'Og',
};

const assertZ = (z: number) => {
  if (!Number.isInteger(z) || z < 0 || z > 118) throw new RangeError(`Z không hợp lệ: ${z}`);
};

/** Cấu hình theo Madelung thuần, không áp dụng ngoại lệ (dùng cho hoạt hoạ "dự đoán"). */
export function madelungConfiguration(electrons: number): Subshell[] {
  const result: Subshell[] = [];
  let left = electrons;
  for (const [n, l] of MADELUNG) {
    if (left <= 0) break;
    const e = Math.min(left, capacity(l));
    result.push({ n, l, electrons: e });
    left -= e;
  }
  if (left > 0) throw new RangeError('Vượt quá số electron hỗ trợ');
  return result;
}

/** Sắp theo n rồi l: cách viết dùng trong SGK (1s2 2s2 2p6 3s2 3p6 3d6 4s2). */
export const sortByShell = (cfg: Subshell[]) => [...cfg].sort((a, b) => a.n - b.n || a.l - b.l);

/** Cấu hình electron cơ bản của nguyên tử trung hoà, sắp theo lớp (n, l). Bỏ phân lớp có 0 e. */
export function electronConfiguration(z: number): Subshell[] {
  assertZ(z);
  const base = madelungConfiguration(z);
  const override = EXCEPTIONS[z];
  if (!override) return sortByShell(base);

  const map = new Map(base.map((s) => [subshellLabel(s.n, s.l), s]));
  for (const [label, e] of Object.entries(override)) {
    const existing = map.get(label);
    if (existing) existing.electrons = e;
    else {
      const n = Number(label.slice(0, -1));
      const l = L_LETTER.indexOf(label.slice(-1) as (typeof L_LETTER)[number]) as L;
      map.set(label, { n, l, electrons: e });
    }
  }
  return sortByShell([...map.values()].filter((s) => s.electrons > 0));
}

export const isException = (z: number) => z in EXCEPTIONS;

/** Z ≥ 104: chưa đo được thực nghiệm, cấu hình chỉ là dự đoán. */
export const isPredicted = (z: number) => z >= 104;

export const totalElectrons = (cfg: Subshell[]) => cfg.reduce((sum, s) => sum + s.electrons, 0);

/** Số electron trên từng lớp K, L, M, N... */
export function shells(cfg: Subshell[]): number[] {
  const out: number[] = [];
  for (const s of cfg) out[s.n - 1] = (out[s.n - 1] ?? 0) + s.electrons;
  return Array.from(out, (v) => v ?? 0);
}

export interface NotationOptions {
  /** Viết gọn theo lõi khí hiếm: [Ar] 3d6 4s2 */
  nobleGasCore?: boolean;
  /** Dùng chữ số trên Unicode (3d⁶) thay cho chữ số thường (3d6) */
  superscript?: boolean;
}

const SUP: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
};
const toSup = (n: number) => String(n).replace(/\d/g, (d) => SUP[d] ?? d);

function coreOf(cfg: Subshell[]): number {
  const z = totalElectrons(cfg);
  let core = 0;
  for (const g of NOBLE_GASES) if (g < z) core = g;
  return core;
}

export function toNotation(cfg: Subshell[], opts: NotationOptions = {}): string {
  const fmt = (s: Subshell) =>
    `${subshellLabel(s.n, s.l)}${opts.superscript ? toSup(s.electrons) : s.electrons}`;
  const sorted = sortByShell(cfg);
  if (!opts.nobleGasCore) return sorted.map(fmt).join(' ');

  const core = coreOf(sorted);
  if (core === 0) return sorted.map(fmt).join(' ');
  const coreSet = new Map(
    electronConfiguration(core).map((s) => [subshellLabel(s.n, s.l), s.electrons])
  );
  const rest = sorted.filter((s) => coreSet.get(subshellLabel(s.n, s.l)) !== s.electrons);
  return [`[${NOBLE_GAS_SYMBOL[core]}]`, ...rest.map(fmt)].join(' ');
}

/** Các phân lớp có electron hoá trị: lớp ngoài cùng và các phân lớp d/f chưa bão hoà. */
export function valenceSubshells(cfg: Subshell[]): Subshell[] {
  const maxN = Math.max(...cfg.map((s) => s.n));
  return sortByShell(
    cfg.filter((s) => s.n === maxN || (s.l >= 2 && s.electrons < capacity(s.l) && s.electrons > 0))
  );
}

export interface OrbitalBox {
  up: boolean;
  down: boolean;
}

export interface SubshellBoxes {
  n: number;
  l: L;
  label: string;
  boxes: OrbitalBox[];
}

/** Sơ đồ ô lượng tử theo quy tắc Hund: điền ↑ vào mọi ô trước, rồi mới ghép ↓. */
export function orbitalBoxes(cfg: Subshell[]): SubshellBoxes[] {
  return sortByShell(cfg).map((s) => {
    const k = 2 * s.l + 1;
    const boxes = Array.from({ length: k }, (_, i) => ({
      up: i < s.electrons,
      down: i < s.electrons - k,
    }));
    return { n: s.n, l: s.l, label: subshellLabel(s.n, s.l), boxes };
  });
}

export const unpairedElectrons = (cfg: Subshell[]) =>
  orbitalBoxes(cfg).reduce((sum, s) => sum + s.boxes.filter((b) => b.up !== b.down).length, 0);

/**
 * Cấu hình của ion.
 * - Cation: bớt electron ở lớp n lớn nhất trước, trong cùng lớp thì l lớn nhất trước (Fe → Fe²⁺: mất 4s trước 3d).
 * - Anion: thêm electron theo thứ tự Madelung vào phân lớp chưa đầy đầu tiên.
 */
export function ionConfiguration(z: number, charge: number): Subshell[] {
  assertZ(z);
  if (!Number.isInteger(charge)) throw new RangeError('Điện tích phải là số nguyên');
  if (charge > z) throw new RangeError('Không thể bớt nhiều electron hơn số đang có');
  const cfg = electronConfiguration(z).map((s) => ({ ...s }));

  if (charge > 0) {
    let remove = charge;
    while (remove > 0) {
      const target = cfg.filter((s) => s.electrons > 0).sort((a, b) => b.n - a.n || b.l - a.l)[0];
      if (!target) break;
      const take = Math.min(remove, target.electrons);
      target.electrons -= take;
      remove -= take;
    }
  } else if (charge < 0) {
    let add = -charge;
    for (const [n, l] of MADELUNG) {
      if (add <= 0) break;
      let s = cfg.find((x) => x.n === n && x.l === l);
      if (!s) {
        s = { n, l, electrons: 0 };
        cfg.push(s);
      }
      const put = Math.min(add, capacity(l) - s.electrons);
      s.electrons += put;
      add -= put;
    }
  }
  return sortByShell(cfg.filter((s) => s.electrons > 0));
}

export type FillRule = 'aufbau' | 'hund' | 'pauli' | 'exception';

export interface FillStep {
  /** Số thứ tự electron (1-based); 0 cho bước sắp xếp lại do ngoại lệ */
  index: number;
  n: number;
  l: L;
  /** Chỉ số ô trong phân lớp (0..2l) */
  orbital: number;
  spin: 'up' | 'down';
  rule: FillRule;
  /** Cấu hình sau bước này */
  configuration: Subshell[];
}

/**
 * Các bước điền electron để làm hoạt hoạ.
 * Điền lần lượt theo Madelung; nếu nguyên tố là ngoại lệ, thêm một bước cuối "exception"
 * với cấu hình thực tế.
 */
export function fillingSteps(z: number): FillStep[] {
  assertZ(z);
  const steps: FillStep[] = [];
  const current: Subshell[] = [];
  let index = 0;
  for (const [n, l] of MADELUNG) {
    const k = 2 * l + 1;
    for (let e = 0; e < capacity(l) && index < z; e++) {
      index++;
      let s = current.find((x) => x.n === n && x.l === l);
      if (!s) {
        s = { n, l, electrons: 0 };
        current.push(s);
      }
      s.electrons++;
      const rule: FillRule = e === 0 ? 'aufbau' : e < k ? 'hund' : 'pauli';
      steps.push({
        index,
        n,
        l,
        orbital: e < k ? e : e - k,
        spin: e < k ? 'up' : 'down',
        rule,
        configuration: sortByShell(current.map((x) => ({ ...x }))),
      });
    }
    if (index >= z) break;
  }
  if (isException(z)) {
    const last = steps.at(-1);
    steps.push({
      index: 0,
      n: last?.n ?? 1,
      l: last?.l ?? 0,
      orbital: 0,
      spin: 'up',
      rule: 'exception',
      configuration: electronConfiguration(z),
    });
  }
  return steps;
}

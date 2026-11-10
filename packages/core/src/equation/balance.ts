import { gcd, lcm, Q } from '../rational';
import { err, ok, type Result } from '../result';
import { type EquationError, type ParsedEquation, parseEquation } from './parse';

export type BalanceStep =
  | { kind: 'matrix'; rows: string[]; matrix: Q[][] }
  | { kind: 'rref'; rows: string[]; matrix: Q[][]; rank: number }
  | { kind: 'nullspace'; vector: Q[] }
  | { kind: 'integers'; coefficients: bigint[]; multiplier: bigint };

export interface BalanceResult {
  equation: ParsedEquation;
  coefficients: bigint[];
  steps: BalanceStep[];
  method: 'matrix';
  /** Hệ số người dùng tự ghi khớp hoàn toàn với kết quả */
  givenCorrect: boolean | null;
}

export type BalanceErrorCode =
  EquationError['code'] | 'impossible' | 'multiple' | 'wrongSide' | 'notParticipating';

export interface BalanceError {
  code: BalanceErrorCode;
  index: number;
  length: number;
  parse?: EquationError;
  /** Chỉ số các chất có vấn đề (wrongSide, notParticipating) */
  species?: number[];
  /** Số tổ hợp độc lập (multiple) */
  nullity?: number;
}

/** Dạng bậc thang rút gọn theo hàng (RREF), trả về các cột trụ. */
export function rref(input: Q[][]): { matrix: Q[][]; pivots: number[] } {
  const m = input.map((r) => [...r]);
  const rows = m.length;
  const cols = m[0]?.length ?? 0;
  const pivots: number[] = [];
  let r = 0;
  for (let c = 0; c < cols && r < rows; c++) {
    let p = r;
    while (p < rows && m[p]![c]!.isZero()) p++;
    if (p === rows) continue;
    [m[r], m[p]] = [m[p]!, m[r]!];
    const pv = m[r]![c]!;
    m[r] = m[r]!.map((x) => x.div(pv));
    for (let i = 0; i < rows; i++) {
      if (i === r || m[i]![c]!.isZero()) continue;
      const f = m[i]![c]!;
      m[i] = m[i]!.map((x, j) => x.sub(f.mul(m[r]![j]!)));
    }
    pivots.push(c);
    r++;
  }
  return { matrix: m, pivots };
}

/** Ma trận bảo toàn: mỗi hàng là một nguyên tố (và điện tích), chất tham gia mang dấu +, sản phẩm dấu −. */
export function conservationMatrix(eq: ParsedEquation): { rows: string[]; matrix: Q[][] } {
  const rows: string[] = [];
  for (const s of eq.species)
    for (const el of s.formula.composition.keys()) if (!rows.includes(el)) rows.push(el);
  const charged = eq.species.some((s) => s.formula.charge !== 0);
  const matrix = rows.map((el) =>
    eq.species.map((s, j) => {
      const v = Q.of(s.formula.composition.get(el) ?? 0);
      return j < eq.reactantCount ? v : v.neg();
    })
  );
  if (charged) {
    rows.push('charge');
    matrix.push(
      eq.species.map((s, j) => {
        const v = Q.of(s.formula.charge);
        return j < eq.reactantCount ? v : v.neg();
      })
    );
  }
  return { rows, matrix };
}

const spanOf = (eq: ParsedEquation, idx: number[]) => {
  const first = eq.species[idx[0]!]!;
  return { index: first.index, length: first.text.length };
};

export function balanceParsed(eq: ParsedEquation): Result<BalanceResult, BalanceError> {
  const { rows, matrix } = conservationMatrix(eq);
  const n = eq.species.length;
  const steps: BalanceStep[] = [{ kind: 'matrix', rows, matrix }];
  const { matrix: R, pivots } = rref(matrix);
  steps.push({ kind: 'rref', rows, matrix: R, rank: pivots.length });
  const free = [...Array(n).keys()].filter((c) => !pivots.includes(c));

  if (free.length === 0) return err({ code: 'impossible', index: 0, length: 0 });
  if (free.length > 1) return err({ code: 'multiple', index: 0, length: 0, nullity: free.length });

  // Biến tự do = 1, biến trụ = −(hệ số của biến tự do trong hàng trụ)
  const f = free[0]!;
  const v: Q[] = Array.from({ length: n }, () => Q.ZERO);
  v[f] = Q.ONE;
  pivots.forEach((c, r) => {
    v[c] = R[r]![f]!.neg();
  });
  steps.push({ kind: 'nullspace', vector: v });

  let mult = 1n;
  for (const x of v) mult = lcm(mult, x.d);
  let ints = v.map((x) => (x.n * mult) / x.d);
  let g = 0n;
  for (const x of ints) g = gcd(g, x);
  if (g > 1n) {
    ints = ints.map((x) => x / g);
  }
  if (ints.filter((x) => x < 0n).length > ints.filter((x) => x > 0n).length)
    ints = ints.map((x) => -x);

  const zero = ints.flatMap((x, i) => (x === 0n ? [i] : []));
  if (zero.length) return err({ code: 'notParticipating', ...spanOf(eq, zero), species: zero });
  const neg = ints.flatMap((x, i) => (x < 0n ? [i] : []));
  if (neg.length) return err({ code: 'wrongSide', ...spanOf(eq, neg), species: neg });

  steps.push({ kind: 'integers', coefficients: ints, multiplier: mult / (g || 1n) });
  const anyGiven = eq.species.some((s) => s.given !== null);
  const givenCorrect = anyGiven
    ? eq.species.every((s, i) => BigInt(s.given ?? 1) === ints[i])
    : null;
  return ok({ equation: eq, coefficients: ints, steps, method: 'matrix', givenCorrect });
}

/** Cân bằng phương trình bằng không gian null của ma trận bảo toàn (số hữu tỉ chính xác). */
export function balance(equation: string): Result<BalanceResult, BalanceError> {
  const eq = parseEquation(equation);
  if (!eq.ok)
    return err({
      code: eq.error.code,
      index: eq.error.index,
      length: eq.error.length,
      parse: eq.error,
    });
  return balanceParsed(eq.value);
}

/** Viết lại phương trình đã cân bằng: "2H2 + O2 → 2H2O" */
export function formatBalanced(r: BalanceResult, arrow = '→'): string {
  const fmt = (i: number) => {
    const c = r.coefficients[i]!;
    return `${c === 1n ? '' : c}${r.equation.species[i]!.formula.normalized}`;
  };
  const idx = [...r.equation.species.keys()];
  const left = idx.slice(0, r.equation.reactantCount).map(fmt).join(' + ');
  const right = idx.slice(r.equation.reactantCount).map(fmt).join(' + ');
  return `${left} ${arrow} ${right}`;
}

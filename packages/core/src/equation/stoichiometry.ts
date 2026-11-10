/*
 * Tính theo phương trình: cho lượng (mol) của một số chất tham gia, tìm chất hết, chất dư và lượng sản phẩm.
 * Mức phản ứng ξ = min(n_i / ν_i) trên các chất tham gia đã biết lượng.
 */
export interface StoichResult {
  /** Mức phản ứng (mol "lần phản ứng") */
  extent: number;
  /** Chỉ số chất hết (có thể nhiều chất nếu vừa đủ) */
  limiting: number[];
  /** Mol mỗi chất phản ứng/tạo thành theo phương trình (dương) */
  reacted: number[];
  /** Mol còn dư của chất tham gia đã biết lượng (null nếu không nhập) */
  remaining: Array<number | null>;
}

const EPS = 1e-12;

export function stoichiometry(
  coefficients: readonly bigint[],
  reactantCount: number,
  givenMol: ReadonlyArray<number | null>
): StoichResult | null {
  let extent = Number.POSITIVE_INFINITY;
  for (let i = 0; i < reactantCount; i++) {
    const n = givenMol[i];
    if (n == null || !Number.isFinite(n) || n < 0) continue;
    extent = Math.min(extent, n / Number(coefficients[i]!));
  }
  if (!Number.isFinite(extent)) return null;
  const reacted = coefficients.map((c) => Number(c) * extent);
  const limiting: number[] = [];
  const remaining = coefficients.map((_, i) => {
    if (i >= reactantCount) return null;
    const n = givenMol[i];
    if (n == null) return null;
    const left = n - reacted[i]!;
    const r = Math.abs(left) <= EPS * Math.max(1, n) ? 0 : left;
    if (r === 0) limiting.push(i);
    return r;
  });
  return { extent, limiting, reacted, remaining };
}

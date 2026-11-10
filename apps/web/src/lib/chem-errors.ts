import type { BalanceError, FormulaError } from '@chem/core';

type T = (key: string, values?: Record<string, string | number>) => string;

/** Thông báo lỗi công thức dễ hiểu (khoá dịch trong `tools.formulaError`). */
export function formulaErrorMessage(e: FormulaError, t: T): string {
  return t(`tools.formulaError.${e.code}`, { detail: e.detail ?? '' });
}

export function balanceErrorMessage(e: BalanceError, t: T, names: string[]): string {
  if (e.code === 'formula' && e.parse?.formula) return formulaErrorMessage(e.parse.formula, t);
  return t(`tools.balanceError.${e.code}`, {
    nullity: e.nullity ?? 0,
    species: (e.species ?? []).map((i) => names[i] ?? '').join(', '),
  });
}

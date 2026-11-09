import { type L, sortByShell, type Subshell, subshellLabel } from '@chem/core';

/** Trạng thái một mũi tên trong ô lượng tử khi so hai cấu hình (trước → sau). */
export type ArrowState = 'none' | 'on' | 'added' | 'removed';

export interface BoxRow {
  n: number;
  l: L;
  label: string;
  boxes: Array<{ up: ArrowState; down: ArrowState }>;
}

const count = (cfg: readonly Subshell[], n: number, l: number) =>
  cfg.find((s) => s.n === n && s.l === l)?.electrons ?? 0;

const state = (before: boolean, after: boolean): ArrowState =>
  before && after ? 'on' : after ? 'added' : before ? 'removed' : 'none';

/**
 * Hàng ô lượng tử theo quy tắc Hund cho `after`, đánh dấu khác biệt so với `before`.
 * `layout`: các phân lớp luôn hiện (kể cả đang trống) để bố cục không nhảy khi chạy từng bước.
 */
export function boxRows(
  after: readonly Subshell[],
  before: readonly Subshell[] = after,
  layout: ReadonlyArray<{ n: number; l: L }> = after
): BoxRow[] {
  const seen = new Set<string>();
  const all = sortByShell(
    [...layout, ...after, ...before]
      .filter((s) => {
        const key = `${s.n}${s.l}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((s) => ({ n: s.n, l: s.l, electrons: 0 }))
  );
  return all.map(({ n, l }) => {
    const k = 2 * l + 1;
    const a = count(after, n, l);
    const b = count(before, n, l);
    return {
      n,
      l,
      label: subshellLabel(n, l),
      boxes: Array.from({ length: k }, (_, i) => ({
        up: state(i < b, i < a),
        down: state(i < b - k, i < a - k),
      })),
    };
  });
}

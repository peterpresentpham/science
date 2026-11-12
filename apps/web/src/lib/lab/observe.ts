import type { Reaction } from '@chem/data/reaction';

import { colorsDiffer } from './color';

export const SIGNS = ['precipitate', 'gas', 'color', 'heat', 'light'] as const;
export type Sign = (typeof SIGNS)[number];

/** Những hiện tượng thật sự xảy ra, suy ra từ dữ liệu (dùng để chấm phần dự đoán). */
export function actualSigns(r: Reaction): Set<Sign> {
  const o = r.observations;
  const s = new Set<Sign>();
  if (o.precipitate) s.add('precipitate');
  if (o.gas) s.add('gas');
  if (colorsDiffer(o.solutionBefore, o.solutionAfter)) s.add('color');
  if (o.heat !== 'none') s.add('heat');
  if (o.light) s.add('light');
  return s;
}

/** Số mục đoán đúng trên tổng số mục (mỗi hiện tượng là một mục có/không). */
export function scorePrediction(guess: ReadonlySet<Sign>, actual: ReadonlySet<Sign>) {
  let right = 0;
  for (const s of SIGNS) if (guess.has(s) === actual.has(s)) right++;
  return { right, total: SIGNS.length };
}

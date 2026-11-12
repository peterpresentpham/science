import type { Reaction, Species } from '@chem/data/reaction';

/** Một hoá chất trên kệ (gộp theo công thức; lấy dạng của lần xuất hiện đầu tiên). */
export interface Reagent {
  formula: string;
  species: Species;
  /** Số phản ứng dùng chất này */
  uses: number;
}

export const GROUP_ORDER = ['solution', 'solid', 'liquid', 'gas'] as const;
export type ReagentGroup = (typeof GROUP_ORDER)[number];

export const groupOf = (s: Species): ReagentGroup =>
  s.state === 'aq' ? 'solution' : s.state === 's' ? 'solid' : s.state === 'l' ? 'liquid' : 'gas';

export function buildShelf(reactions: readonly Reaction[]): Reagent[] {
  const map = new Map<string, Reagent>();
  for (const r of reactions)
    for (const s of r.reactants) {
      const cur = map.get(s.formula);
      if (cur) cur.uses++;
      else map.set(s.formula, { formula: s.formula, species: s, uses: 1 });
    }
  return [...map.values()];
}

export const reactionKey = (formulas: readonly string[]) => [...formulas].sort().join('+');

export type MatchResult =
  | { kind: 'match'; reaction: Reaction }
  | { kind: 'needsHeat'; reaction: Reaction }
  | { kind: 'needsCatalyst'; reaction: Reaction; catalyst: string }
  | { kind: 'none' };

/** Phản ứng cần xúc tác để xảy ra rõ rệt (không cần đun nóng thì xúc tác mới là điều kiện quyết định). */
export const needsCatalyst = (r: Reaction): string | null =>
  r.conditions.catalyst && !r.conditions.heat ? r.conditions.catalyst : null;

/** Tìm phản ứng ứng với bộ hoá chất, rồi kiểm tra điều kiện đun nóng và xúc tác. */
export function findReaction(
  reactions: readonly Reaction[],
  formulas: readonly string[],
  opts: { heat: boolean; catalyst: string | null }
): MatchResult {
  if (formulas.length === 0) return { kind: 'none' };
  const key = reactionKey(formulas);
  const reaction = reactions.find((r) => reactionKey(r.reactants.map((s) => s.formula)) === key);
  if (!reaction) return { kind: 'none' };
  if (reaction.conditions.heat && !opts.heat) return { kind: 'needsHeat', reaction };
  const cat = needsCatalyst(reaction);
  if (cat && opts.catalyst !== cat) return { kind: 'needsCatalyst', reaction, catalyst: cat };
  return { kind: 'match', reaction };
}

/** Xúc tác xuất hiện trong dữ liệu (để người dùng chọn trong chế độ tự chọn). */
export const catalystsOf = (reactions: readonly Reaction[]): string[] => [
  ...new Set(reactions.flatMap((r) => (r.conditions.catalyst ? [r.conditions.catalyst] : []))),
];

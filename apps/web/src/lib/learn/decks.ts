import type { ElementLite } from '@chem/data';

import { ELEMENTS } from '@/lib/elements';

/**
 * Các bộ thẻ tự sinh từ dữ liệu nguyên tố (không cần viết tay):
 * - name2symbol: tên → ký hiệu · symbol2name: ký hiệu → tên
 * - number: số hiệu nguyên tử → nguyên tố
 * - category: nguyên tố → loại (kim loại kiềm, halogen…)
 * - group / period: nguyên tố → nhóm (1–18) / chu kỳ (1–7); họ Lanthan, Actini không có nhóm nên bị bỏ
 * - valence: nguyên tố nhóm A → số electron lớp ngoài cùng
 */
export const DECKS = [
  'name2symbol',
  'symbol2name',
  'number',
  'category',
  'group',
  'period',
  'valence',
] as const;
export type Deck = (typeof DECKS)[number];

export interface DeckCard {
  id: string;
  deck: Deck;
  z: number;
}

export const isDeck = (s: string): s is Deck => (DECKS as readonly string[]).includes(s);

/** Số electron lớp ngoài cùng của nguyên tố nhóm A (khối s, p); null với khối d, f. */
export const valenceElectrons = (e: Pick<ElementLite, 'z' | 'block' | 'group'>): number | null => {
  if (e.z === 2) return 2;
  if (e.group == null) return null;
  if (e.block === 's') return e.group;
  if (e.block === 'p') return e.group - 10;
  return null;
};

const inDeck = (deck: Deck, e: ElementLite) =>
  deck === 'group' ? e.group != null : deck === 'valence' ? valenceElectrons(e) !== null : true;

export const deckCards = (deck: Deck): DeckCard[] =>
  ELEMENTS.filter((e) => inDeck(deck, e)).map((e) => ({ id: `${deck}:${e.z}`, deck, z: e.z }));

/** Số thẻ mới tối đa mỗi lần học (đủ vừa sức, ôn lại sẽ nhiều dần theo FSRS). */
export const NEW_PER_SESSION = 10;
/** Số thẻ đến hạn tối đa mỗi lần học */
export const MAX_DUE_PER_SESSION = 40;

import { type Card, createEmptyCard, fsrs, type Grade, Rating, State } from 'ts-fsrs';

import type { CardRow } from '@/lib/storage';

/*
 * Lặp lại ngắt quãng bằng FSRS (ts-fsrs). Tắt "fuzz" (xáo trộn ngẫu nhiên khoảng cách) để số ngày
 * hiện trên nút bấm đúng bằng lịch thật sau khi bấm.
 */
const scheduler = fsrs({ enable_fuzz: false });

export { Rating, State };
export type { Grade };

export const GRADES: Grade[] = [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy];

const toRow = (id: string, deck: string, c: Card): CardRow => ({
  id,
  deck,
  due: c.due.getTime(),
  stability: c.stability,
  difficulty: c.difficulty,
  scheduled_days: c.scheduled_days,
  learning_steps: c.learning_steps,
  reps: c.reps,
  lapses: c.lapses,
  state: c.state,
  last_review: c.last_review ? c.last_review.getTime() : null,
});

const fromRow = (r: CardRow): Card => ({
  due: new Date(r.due),
  stability: r.stability,
  difficulty: r.difficulty,
  scheduled_days: r.scheduled_days,
  learning_steps: r.learning_steps,
  reps: r.reps,
  lapses: r.lapses,
  state: r.state as State,
  last_review: r.last_review == null ? undefined : new Date(r.last_review),
});

/** Thẻ chưa từng ôn: đúng trạng thái "mới" của FSRS. */
export const newRow = (id: string, deck: string, now = Date.now()): CardRow =>
  toRow(id, deck, createEmptyCard(new Date(now)));

/** Chấm một lần ôn, trả về hàng thẻ mới (chưa ghi vào kho). */
export const review = (row: CardRow, grade: Grade, now = Date.now()): CardRow =>
  toRow(row.id, row.deck, scheduler.next(fromRow(row), new Date(now), grade).card);

/** Lần ôn kế tiếp (mili giây) nếu bấm từng nút, để hiện "10 phút", "3 ngày"… trên nút. */
export function preview(row: CardRow, now = Date.now()): Record<Grade, number> {
  const rec = scheduler.repeat(fromRow(row), new Date(now));
  return Object.fromEntries(GRADES.map((g) => [g, rec[g].card.due.getTime()])) as Record<
    Grade,
    number
  >;
}

/** Thẻ đã thuộc ở mức ôn tập dài hạn (không còn đang học hay học lại). */
export const isLearned = (r: CardRow) => r.state === State.Review;

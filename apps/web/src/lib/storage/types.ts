import { z } from 'zod';

/** Một thẻ ôn tập (trạng thái FSRS của ts-fsrs, ngày giờ lưu dạng mili giây). */
export const CardRow = z.object({
  id: z.string().min(1).max(60),
  deck: z.string().min(1).max(40),
  due: z.number(),
  stability: z.number(),
  difficulty: z.number(),
  scheduled_days: z.number(),
  learning_steps: z.number(),
  reps: z.number().int().nonnegative(),
  lapses: z.number().int().nonnegative(),
  /** 0 mới · 1 đang học · 2 ôn tập · 3 học lại */
  state: z.number().int().min(0).max(3),
  last_review: z.number().nullable(),
});
export type CardRow = z.infer<typeof CardRow>;

/** Một lượt làm quiz. */
export const AttemptRow = z.object({
  id: z.number().int().optional(),
  mode: z.string().min(1).max(40),
  score: z.number().int().nonnegative(),
  total: z.number().int().positive(),
  /** Thời gian làm (mili giây) */
  ms: z.number().nonnegative(),
  at: z.number(),
});
export type AttemptRow = z.infer<typeof AttemptRow>;

/** File xuất tiến độ: có phiên bản để sau này đổi cấu trúc vẫn nhập được file cũ. */
export const Snapshot = z.object({
  app: z.literal('nguyento'),
  version: z.literal(1),
  exportedAt: z.number(),
  cards: z.array(CardRow).max(20000),
  attempts: z.array(AttemptRow.omit({ id: true })).max(20000),
  kv: z.record(z.string().max(80), z.unknown()),
});
export type Snapshot = z.infer<typeof Snapshot>;

export interface LearnStore {
  /** false: IndexedDB bị chặn (chế độ riêng tư…), dữ liệu chỉ còn trong lần mở trang này */
  persistent: boolean;
  allCards(): Promise<CardRow[]>;
  putCards(rows: CardRow[]): Promise<void>;
  allAttempts(): Promise<AttemptRow[]>;
  addAttempt(a: Omit<AttemptRow, 'id'>): Promise<void>;
  getKV<T>(key: string): Promise<T | undefined>;
  setKV(key: string, value: unknown): Promise<void>;
  exportAll(): Promise<Snapshot>;
  /** Thay toàn bộ dữ liệu hiện có bằng nội dung file */
  importAll(s: Snapshot): Promise<void>;
  clear(): Promise<void>;
}

import { z } from 'zod';

import { learningText as text } from './learning.ts';

export const History = z.object({
  discovery: z.object({
    year: z.number().int().nullable(),
    by: text(120),
    place: text(60).optional(),
    note: text(240).optional(),
    source: z.url(),
  }),
  naming: z.object({ text: text(240), source: z.url() }),
  /** Mỗi đoạn có nguồn riêng để không phải đoán nguồn nào hỗ trợ chi tiết nào. */
  story: z
    .array(text(500).extend({ source: z.url() }))
    .min(2)
    .max(4),
  milestones: z
    .array(z.object({ year: z.number().int(), text: text(160), source: z.url() }))
    .min(2)
    .max(6),
  sources: z.array(z.url()).min(1),
});
export type History = z.infer<typeof History>;
export const defineHistory = (history: z.input<typeof History>) => history;

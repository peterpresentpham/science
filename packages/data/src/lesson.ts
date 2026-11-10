import { z } from 'zod';

import { ElementSymbol, LearningId, learningText as text } from './learning.ts';

export const WIDGETS = [
  'atom-model',
  'electron-config',
  'table-highlight',
  'trend',
  'structure-3d',
  'balance',
  'molar-mass',
] as const;
const caption = { caption: text(160).optional(), source: z.url() };
/** Props có schema theo widget để bắt cả lỗi đánh máy trong dữ liệu. */
export const Widget = z.discriminatedUnion('widget', [
  z.object({
    widget: z.literal('atom-model'),
    props: z.object({ element: ElementSymbol }).strict(),
    ...caption,
  }),
  z.object({
    widget: z.literal('electron-config'),
    props: z.object({ element: ElementSymbol }).strict(),
    ...caption,
  }),
  z.object({
    widget: z.literal('table-highlight'),
    props: z.union([
      z.object({ elements: z.array(ElementSymbol).min(1) }).strict(),
      z.object({ group: z.number().int().min(1).max(18) }).strict(),
      z.object({ period: z.number().int().min(1).max(7) }).strict(),
    ]),
    ...caption,
  }),
  z.object({
    widget: z.literal('trend'),
    props: z
      .object({ property: z.enum(['electronegativity', 'atomicRadius', 'ionizationEnergy']) })
      .strict(),
    ...caption,
  }),
  z.object({
    widget: z.literal('structure-3d'),
    props: z.union([
      z.object({ cid: z.number().int().positive() }).strict(),
      z.object({ element: ElementSymbol }).strict(),
    ]),
    ...caption,
  }),
  z.object({
    widget: z.literal('balance'),
    props: z.object({ equation: z.string().min(1).max(200) }).strict(),
    ...caption,
  }),
  z.object({
    widget: z.literal('molar-mass'),
    props: z.object({ formula: z.string().min(1).max(80) }).strict(),
    ...caption,
  }),
]);
export const Block = z.union([
  z.object({ type: z.literal('text'), md: text(1500), source: z.url() }),
  Widget.and(z.object({ type: z.literal('widget') })),
  z.object({ type: z.literal('quiz'), ids: z.array(LearningId).min(1).max(5) }),
  z.object({ type: z.literal('tip'), md: text(400), source: z.url() }),
]);
export const Lesson = z.object({
  id: LearningId,
  grade: z.literal(10),
  order: z.number().int().positive(),
  textbook: text(200),
  textbookSource: z.url(),
  textbookLessons: z.array(text(160)).min(1).max(8),
  title: text(80),
  goals: z.array(text(160)).min(2).max(5),
  readingMinutes: z.number().int().min(5).max(10),
  blocks: z.array(Block).min(6),
  sources: z.array(z.url()).min(1),
});
export type Lesson = z.infer<typeof Lesson>;
export const defineLesson = (lesson: z.input<typeof Lesson>) => lesson;

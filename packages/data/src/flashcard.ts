import { z } from 'zod';

import { ElementSymbol, Grade, LearningId, learningText as text } from './learning.ts';

export const Card = z.object({
  id: LearningId,
  front: text(120),
  back: text(240),
  formula: z.string().min(1).max(80).optional(),
  cid: z.number().int().positive().optional(),
  elements: z.array(ElementSymbol).default([]),
  source: z.url(),
});
export type Card = z.infer<typeof Card>;
export const Deck = z.object({
  id: LearningId,
  title: text(60),
  description: text(200),
  grade: z.array(Grade).min(1),
  cards: z.array(Card).min(15),
});
export type Deck = z.infer<typeof Deck>;
export const defineDeck = (deck: z.input<typeof Deck>) => deck;

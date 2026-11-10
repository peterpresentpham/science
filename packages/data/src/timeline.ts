import { z } from 'zod';

import { ElementSymbol, LearningId, learningText as text } from './learning.ts';

export const TimelineEvent = z.object({
  id: LearningId,
  year: z.number().int(),
  title: text(80),
  text: text(300),
  elements: z.array(ElementSymbol).default([]),
  kind: z.enum(['theory', 'discovery-method', 'table', 'atom-model', 'industry', 'naming']),
  source: z.url(),
});
export type TimelineEvent = z.infer<typeof TimelineEvent>;
export const Timeline = z.array(TimelineEvent).min(40).max(60);
export const defineTimeline = (events: z.input<typeof Timeline>) => events;

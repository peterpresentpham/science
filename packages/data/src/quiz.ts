import { z } from 'zod';

import { ElementSymbol, Grade, LearningId, learningText as text } from './learning.ts';

export const QUIZ_TOPICS = [
  'atom-structure',
  'periodic-table',
  'chemical-bond',
  'redox',
  'halogens',
  'nitrogen-sulfur',
  'metals',
  'everyday',
  'energy',
  'reaction-rate',
] as const;

/** Dữ kiện độc lập để script tính lại đáp án bằng @chem/core. */
export const NumberCalculation = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('atom-count'), formula: z.string().min(1), element: ElementSymbol }),
  z.object({
    kind: z.literal('nucleon-count'),
    z: z.number().int().min(1).max(118),
    field: z.enum(['protons', 'neutrons', 'electrons', 'massNumber']),
  }),
  z.object({
    kind: z.literal('electron-count'),
    z: z.number().int().min(1).max(118),
    charge: z.number().int().min(-3).max(3),
  }),
  z.object({
    kind: z.literal('molar-mass'),
    formula: z.string().min(1),
    masses: z.partialRecord(ElementSymbol, z.number().positive()),
  }),
  z.object({
    kind: z.literal('coefficient'),
    equation: z.string().min(1),
    species: z.number().int().nonnegative(),
  }),
  z.object({
    kind: z.literal('stoichiometry'),
    equation: z.string().min(1),
    givenMol: z.array(z.number().nonnegative().nullable()).min(1),
    species: z.number().int().nonnegative(),
  }),
  z.object({
    kind: z.literal('reaction-heat'),
    equation: z.string().min(1),
    givenMol: z.array(z.number().nonnegative().nullable()).min(1),
    /** kJ cho phương trình đã cân bằng với hệ số nguyên tối giản. */
    deltaH: z.number(),
  }),
  z.object({
    kind: z.literal('reaction-rate'),
    equation: z.string().min(1),
    consumedMol: z.array(z.number().nonnegative().nullable()).min(1),
    timeS: z.number().positive(),
    volumeL: z.number().positive(),
  }),
]);
const base = {
  id: LearningId,
  grade: Grade,
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  q: text(300),
  explain: text(500),
  elements: z.array(ElementSymbol).default([]),
  source: z.url(),
  /** Mọi phương trình trong đề/giải thích phải khai báo ở đây để kiểm tra được. */
  equations: z.array(z.string().min(1)).default([]),
};
export const Question = z.discriminatedUnion('type', [
  z.object({
    ...base,
    type: z.literal('single'),
    options: z.array(text(120)).length(4),
    answer: z.number().int().min(0).max(3),
  }),
  z.object({
    ...base,
    type: z.literal('multi'),
    options: z.array(text(120)).min(4).max(6),
    answer: z.array(z.number().int().nonnegative()).min(2),
  }),
  z.object({
    ...base,
    type: z.literal('number'),
    answer: z.number(),
    tolerance: z.number().nonnegative(),
    unit: z.string().min(1).max(30).optional(),
    calculation: NumberCalculation,
  }),
  z.object({ ...base, type: z.literal('element'), answer: ElementSymbol }),
]);
export type Question = z.infer<typeof Question>;
export const Quiz = z.object({
  id: z.enum(QUIZ_TOPICS),
  title: text(80),
  questions: z.array(Question).min(20).max(40),
});
export type Quiz = z.infer<typeof Quiz>;
export const defineQuiz = (quiz: z.input<typeof Quiz>) => quiz;

import { SYMBOLS } from '@chem/core';
import { z } from 'zod';

/** Giới hạn áp dụng riêng cho từng bản dịch, không cộng độ dài hai bản. */
export const learningText = (max: number) =>
  z.object({ vi: z.string().trim().min(1).max(max), en: z.string().trim().min(1).max(max) });
export const ElementSymbol = z.enum(SYMBOLS);
export const LearningId = z.string().regex(/^[a-z0-9-]+$/);
export const Grade = z.union([z.literal(10), z.literal(11), z.literal(12)]);

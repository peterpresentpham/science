import { z } from 'zod';

import { CATEGORIES } from './constants';
import { LENS_IDS, PHONE_RISKS } from './lenses';
import { PhotoCredit, PhotoSize } from './photo';
import { Story } from './story';

export { CATEGORIES };

export const Category = z.enum(CATEGORIES);
export type Category = z.infer<typeof Category>;

export const Phase = z.enum(['solid', 'liquid', 'gas', 'unknown']);
export type Phase = z.infer<typeof Phase>;

export const Block = z.enum(['s', 'p', 'd', 'f']);
export type Block = z.infer<typeof Block>;

const nullableNumber = z.number().nullable();

/** Trường cần cho bảng tuần hoàn (nạp ở trang chủ, giữ nhỏ). */
export const ElementLite = z.object({
  z: z.number().int().min(1).max(118),
  symbol: z.string().regex(/^[A-Z][a-z]{0,2}$/),
  slug: z.string().regex(/^[a-z]{1,3}$/),
  name: z.object({ vi: z.string().min(1), en: z.string().min(1) }),
  atomicMass: z.number().positive(),
  category: Category,
  block: Block,
  group: z.number().int().min(1).max(18).nullable(),
  period: z.number().int().min(1).max(7),
  /** Vị trí trong bố cục 18 cột (x 1..18, y 1..10; hàng 9–10 là Lanthan/Actini) */
  grid: z.object({ x: z.number().int().min(1).max(18), y: z.number().int().min(1).max(10) }),
  /** Vị trí trong bố cục 32 cột */
  grid32: z.object({ x: z.number().int().min(1).max(32), y: z.number().int().min(1).max(7) }),
  phaseAtSTP: Phase,
  phasePredicted: z.boolean(),
  electronegativity: nullableNumber,
  /** Bán kính van der Waals (pm) theo PubChem */
  atomicRadiusPm: nullableNumber,
  /** Năng lượng ion hoá thứ nhất (eV) */
  ionizationEnergyEv: nullableNumber,
  /** Ái lực electron (eV) */
  electronAffinityEv: nullableNumber,
  meltingPointK: nullableNumber,
  boilingPointK: nullableNumber,
  /** g/cm³ */
  densityGcm3: nullableNumber,
  /** Năm phát hiện; null = biết từ thời cổ đại */
  discoveryYear: nullableNumber,
  cpkHex: z
    .string()
    .regex(/^[0-9a-f]{6}$/)
    .nullable(),
  /** Ảnh thật (kích thước ảnh lớn); null nếu chưa có ảnh dùng được. File: photoFile(slug, …) */
  photo: PhotoSize.nullable(),
  /** Lăng kính chứa nguyên tố này (trang chủ) */
  lenses: z.array(z.enum(LENS_IDS)),
  /** Có trong cơ thể người: % khối lượng (nguyên tố chính) hoặc số gam trong người 70 kg (vi lượng) */
  body: z
    .union([
      z.object({ percent: z.number().positive() }),
      z.object({ grams: z.number().positive() }),
    ])
    .nullable(),
  /** Mức khan hiếm nếu có trong điện thoại (EuChemS) */
  phoneRisk: z.enum(PHONE_RISKS).nullable(),
  /** Câu móc câu (từ stories/); null nếu nguyên tố chưa có câu chuyện */
  hook: Story.shape.hook.nullable(),
  /** Từ khoá tìm kiếm từ công dụng (vi + en, đã bỏ dấu); rỗng nếu chưa có câu chuyện */
  keywords: z.string(),
});
export type ElementLite = z.infer<typeof ElementLite>;

export const ElementFull = ElementLite.extend({
  electronConfiguration: z.string(),
  configurationPredicted: z.boolean(),
  shells: z.array(z.number().int().nonnegative()),
  oxidationStates: z.array(z.number().int()),
  /** Các năng lượng ion hoá liên tiếp (kJ/mol) */
  ionizationEnergiesKjMol: z.array(z.number()),
  discoveredBy: z.string().nullable(),
  namedBy: z.string().nullable(),
  appearance: z.string().nullable(),
  summary: z.object({ en: z.string(), vi: z.string().nullable() }),
  wikipedia: z.string().url().nullable(),
  photoCredit: PhotoCredit.nullable(),
  sources: z.array(z.string()),
  /** Câu chuyện tự biên soạn (stories/<slug>.ts); null nếu chưa có */
  story: Story.nullable(),
});
export type ElementFull = z.infer<typeof ElementFull>;

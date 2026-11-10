import { z } from 'zod';

/*
 * Phản ứng cho phòng thí nghiệm ảo. Mọi hiện tượng (màu, kết tủa, khí, nhiệt, ánh sáng) nằm trong
 * dữ liệu để code mô phỏng chỉ việc đọc, không tự suy diễn hoá học.
 */

const text = (max: number) =>
  z.object({ vi: z.string().min(1).max(max), en: z.string().min(1).max(max) });
const hex = z.string().regex(/^#[0-9a-f]{6}$/i);

/** Màu nhìn thấy (không phải màu "quy ước"); opacity 0 = trong suốt, 1 = đục hoàn toàn. */
export const Color = z.object({
  hex,
  name: text(40),
  opacity: z.number().min(0).max(1),
});
export type Color = z.infer<typeof Color>;

export const STATES = ['s', 'l', 'g', 'aq'] as const;
export const FORMS = [
  'solution',
  'powder',
  'granule',
  'strip',
  'wire',
  'piece',
  'liquid',
  'gas',
] as const;

export const Species = z.object({
  /** Dạng `parseFormula` của @chem/core đọc được: 'CuSO4', 'Cu(OH)2', 'Ba(OH)2*8H2O', 'H3O^+' */
  formula: z.string(),
  state: z.enum(STATES),
  /** Màu ở trạng thái này (dung dịch, chất rắn, khí). Không ghi = không màu */
  color: Color.optional(),
  /** Chất này được cho vào ống nghiệm như thế nào */
  form: z.enum(FORMS).optional(),
  /** Ví dụ '0,1 M', 'đặc' */
  concentration: z.string().optional(),
  /** CID PubChem, chỉ ghi khi chất có trong `curated/compounds.ts` (để liên kết sang trang hợp chất) */
  cid: z.number().int().optional(),
});
export type Species = z.infer<typeof Species>;

export const REACTION_CATEGORIES = [
  'precipitate',
  'gas',
  'color-change',
  'displacement',
  'redox',
  'neutralization',
  'exothermic',
  'endothermic',
  'combustion',
  'decomposition',
  'indicator',
] as const;

export const Reaction = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: text(80),
  /** Phương trình phân tử có hệ số, cân bằng được bằng `balance()`: 'CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4' */
  equation: z.string(),
  /** Phương trình ion rút gọn (nếu có), chỉ để hiển thị */
  ionic: z.string().optional(),
  category: z.enum(REACTION_CATEGORIES).array().min(1),
  grade: z.union([z.literal(10), z.literal(11), z.literal(12)]),
  reactants: z.array(Species).min(1),
  products: z.array(Species).min(1),
  conditions: z.object({
    heat: z.boolean().default(false),
    catalyst: z.string().optional(),
    light: z.boolean().default(false),
    note: text(160).optional(),
  }),
  /** Hiện tượng, để code dựng hoạt cảnh */
  observations: z.object({
    /** Màu dung dịch trong ống trước và sau phản ứng */
    solutionBefore: Color.optional(),
    solutionAfter: Color.optional(),
    precipitate: z
      .object({
        formula: z.string(),
        color: Color,
        texture: z.enum(['gelatinous', 'fine', 'crystalline', 'curdy']),
        /** true: lắng xuống đáy; false: lơ lửng làm đục dung dịch */
        settles: z.boolean(),
      })
      .optional(),
    gas: z
      .object({
        formula: z.string(),
        color: Color.optional(),
        smell: text(60).optional(),
        rate: z.enum(['slow', 'moderate', 'vigorous']),
      })
      .optional(),
    /** Chất rắn ban đầu tan dần, đổi màu hay bám lớp mới (ví dụ đồng bám trên đinh sắt) */
    solid: text(160).optional(),
    heat: z.enum(['exo', 'endo', 'none']),
    light: z.object({ color: Color, intensity: z.enum(['glow', 'bright', 'blinding']) }).optional(),
    /** Thời gian thấy rõ hiện tượng (giây), để chỉnh tốc độ mô phỏng */
    durationSec: z.number().positive(),
    summary: text(300),
  }),
  /** Giải thích vì sao có hiện tượng đó */
  explain: text(500),
  safety: z.object({ level: z.enum(['safe', 'care', 'danger']), note: text(240) }),
  source: z.url(),
});
export type Reaction = z.infer<typeof Reaction>;
export type ReactionInput = z.input<typeof Reaction>;

export const defineReactions = (r: ReactionInput[]) => r;

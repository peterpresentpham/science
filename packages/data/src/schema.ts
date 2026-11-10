import { z } from 'zod';

import { CATEGORIES } from './constants';
import { GalleryItem } from './gallery';
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

export const LATTICES = [
  'bcc',
  'fcc',
  'hcp',
  'diamond',
  'graphite',
  'rhombohedral',
  'rocksalt',
  'cscl',
  'zincblende',
  'fluorite',
  'icosahedron',
] as const;
const Label = z.object({ vi: z.string(), en: z.string() });

/** Cấu trúc đơn chất: mạng tinh thể (dựng bằng @chem/core/crystal) hoặc phân tử PubChem */
export const ElementStructure = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('crystal'),
    lattice: z.enum(LATTICES),
    a: z.number().positive(),
    c: z.number().positive().optional(),
    alpha: z.number().positive().optional(),
    label: Label.optional(),
  }),
  z.object({
    kind: z.literal('molecule'),
    cid: z.number().int().positive(),
    label: Label.optional(),
  }),
]);
export type ElementStructure = z.infer<typeof ElementStructure>;

export const CompoundCrystal = z.object({
  lattice: z.enum(LATTICES),
  a: z.number().positive(),
  c: z.number().positive().optional(),
  /** Ký hiệu nguyên tố ở vị trí 0 (nút fcc) và vị trí 1 */
  sites: z.tuple([z.string(), z.string()]),
});
export type CompoundCrystal = z.infer<typeof CompoundCrystal>;

/** Đồng vị (hạt nhân ở trạng thái cơ bản) theo IAEA LiveChart. */
export const HALF_LIFE_UNITS = ['as', 'ps', 'ns', 'us', 'ms', 's', 'm', 'h', 'd', 'Y'] as const;
export const Isotope = z.object({
  /** Số nơtron; số khối A = Z + N */
  n: z.number().int().nonnegative(),
  /** Độ phổ biến tự nhiên (% số nguyên tử), null nếu không có trong tự nhiên */
  abundance: z.number().nullable(),
  stable: z.boolean(),
  halfLife: z
    .object({
      /** Giá trị như nguồn ghi (giữ nguyên số chữ số có nghĩa) */
      text: z.string(),
      unit: z.enum(HALF_LIFE_UNITS),
      /** '' chính xác, GT lớn hơn, LT nhỏ hơn, GE ≥, AP ≈ */
      op: z.enum(['', 'GT', 'LT', 'GE', 'AP']),
      seconds: z.number().positive(),
    })
    .nullable(),
  /** Các kiểu phân rã, mã IAEA (B-, EC+B+, A, SF, P, N…) kèm phần trăm */
  decays: z.array(z.object({ mode: z.string(), pct: z.number().nullable() })),
  /** Spin và độ chẵn lẻ, vd. "1/2+" */
  jp: z.string().nullable(),
  /** Năm phát hiện */
  discovery: z.number().int().nullable(),
});
export type Isotope = z.infer<typeof Isotope>;

export const Flame = z.object({
  hex: z.string().regex(/^#[0-9a-f]{6}$/),
  name: Label,
  lines: z.array(z.number()).optional(),
  note: Label.optional(),
});

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
  /** Ảnh thư viện (curated/gallery.ts), chỉ gồm ảnh đã tải; chỉ số = thứ tự, khớp tên file images/gallery */
  gallery: z.array(GalleryItem),
  sources: z.array(z.string()),
  /** Câu chuyện tự biên soạn (stories/<slug>.ts); null nếu chưa có */
  story: Story.nullable(),
  /** Vạch phổ phát xạ vùng nhìn thấy của nguyên tử trung hoà: [bước sóng nm, cường độ tương đối 0..1] */
  spectrum: z.array(z.tuple([z.number(), z.number()])).nullable(),
  /** Màu ngọn lửa (thí nghiệm thử màu ngọn lửa) */
  flame: Flame.nullable(),
  /** Đồng vị đã biết, xếp theo số nơtron tăng dần */
  isotopes: z.array(Isotope),
  /** Cấu trúc đơn chất để xem 3D */
  structures: z.array(ElementStructure),
  /** Hợp chất đã tuyển có chứa nguyên tố này (không gồm phân tử đơn chất), dạng rút gọn */
  compounds: z.array(
    z.object({
      cid: z.number().int(),
      formula: z.string(),
      vi: z.string().nullable(),
      en: z.string(),
    })
  ),
});
export type ElementFull = z.infer<typeof ElementFull>;

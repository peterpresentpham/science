import { z } from 'zod';

import { CompoundCrystal } from './schema';

/** Hợp chất đã tuyển, tải sẵn từ PubChem (compounds/index.json). */
export const Compound = z.object({
  cid: z.number().int().positive(),
  /** Tên dùng để tra PubChem (null nếu chỉ định bằng CID) */
  query: z.string().nullable(),
  /** Tên tiếng Việt (null: dùng tên nguyên tố cho phân tử đơn chất) */
  vi: z.string().nullable(),
  /** Tên tiếng Anh (Title của PubChem) */
  en: z.string(),
  /** Công thức theo cách viết của SGK, vd. Ca(OH)2 (đọc được bằng parseFormula) */
  formula: z.string(),
  /** Công thức theo thứ tự Hill của PubChem, vd. CaH2O2 */
  pubchemFormula: z.string(),
  iupac: z.string().nullable(),
  mw: z.number().positive(),
  smiles: z.string().nullable(),
  charge: z.number().int(),
  elements: z.array(z.string()),
  /** 3: có cấu trúc 3D; 2: chỉ có toạ độ 2D (thường là hợp chất ion, muối) */
  dim: z.union([z.literal(2), z.literal(3)]),
  /** Phân tử của đơn chất (H2, O2, P4, S8…) */
  elemental: z.boolean(),
  /** Mạng tinh thể (chỉ một số hợp chất ion kinh điển) */
  crystal: CompoundCrystal.nullable(),
});
export type Compound = z.infer<typeof Compound>;

export const sdfPath = (cid: number) => `data/compounds/${cid}.sdf`;

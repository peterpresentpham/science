import type { Color, ReactionInput, Species } from '../../src/reaction';

type SpeciesInput = Omit<Species, 'cid'> & { cid?: number };

/** CID các chất đã có trong `curated/compounds.ts` (kiểm bằng scripts/check-reactions.ts). */
const CID: Record<string, number> = {
  CuCl2: 24014,
  MnSO4: 24580,
  'Fe(OH)2': 10129897,
  'Fe(OH)3': 73964,
  'Fe2(SO4)3': 24826,
  'Fe(SCN)3': 165185,
  KSCN: 516872,
  K2SO4: 24507,
  K2MnO4: 160931,
  NaAlO2: 14766,
  H2CO3: 767,
  'Ba(OH)2*8H2O': 17749109,
  AgNO3: 24470,
  AgCl: 24561,
  AgBr: 66199,
  AgI: 24563,
  NaCl: 5234,
  NaBr: 253881,
  KI: 4875,
  KBr: 253877,
  NaNO3: 24268,
  KNO3: 24434,
  BaCl2: 25204,
  Na2SO4: 24436,
  BaSO4: 24414,
  CuSO4: 24462,
  NaOH: 14798,
  'Cu(OH)2': 164826,
  FeCl3: 24380,
  FeCl2: 24458,
  FeSO4: 24393,
  'Pb(NO3)2': 24924,
  PbI2: 24931,
  AlCl3: 24012,
  'Al(OH)3': 10176082,
  ZnSO4: 24424,
  'Zn(OH)2': 9812759,
  'Ca(OH)2': 6093208,
  CaCO3: 10112,
  CaCl2: 5284359,
  Na2CO3: 10340,
  ZnCl2: 5727,
  MgCl2: 5360315,
  HCl: 313,
  H2SO4: 1118,
  H2: 783,
  CO2: 280,
  H2O: 962,
  H2O2: 784,
  MnO2: 14801,
  O2: 977,
  NH4Cl: 25517,
  NH3: 222,
  NH4NO3: 22985,
  HNO3: 944,
  'Cu(NO3)2': 18616,
  CuO: 164827,
  SO2: 1119,
  KClO3: 6426889,
  KCl: 4873,
  KMnO4: 516875,
  Cl2: 24526,
  Br2: 24408,
  I2: 807,
  Fe2O3: 518696,
  Fe3O4: 16211978,
  CaO: 14778,
  MgO: 14792,
  P4: 123286,
  P4O10: 14812,
  CH4: 297,
  C2H6O: 702,
  'Ba(OH)2': 6093286,
  HF: 14917,
  S8: 66348,
  NO: 145068,
  NO2: 3032552,
  'Mg(OH)2': 73981,
};

const name = (vi: string, en: string) => ({ vi, en });
export const color = (hex: string, vi: string, en: string, opacity: number): Color => ({
  hex,
  name: name(vi, en),
  opacity,
});

export const COLORLESS = color('#eef4f8', 'Không màu', 'Colorless', 0.06);
export const WHITE = color('#f6f6f2', 'Trắng', 'White', 0.95);

/** Tạo chất tham gia, tự điền `cid` nếu chất có trong danh sách hợp chất đã tuyển. */
export const sp = (formula: string, state: Species['state'], extra: Partial<SpeciesInput> = {}) =>
  ({
    formula,
    state,
    ...(CID[formula] ? { cid: CID[formula] } : {}),
    ...extra,
  }) as ReactionInput['reactants'][number];

/** Màu dùng chung (mã hex là màu nhìn thấy trong ống nghiệm). */
export const C = {
  cuSolution: color('#4aa3df', 'Xanh lam', 'Blue', 0.55),
  cuNitrate: color('#2fa3b8', 'Xanh lam lục', 'Teal blue', 0.6),
  cuHydroxide: color('#3f86d0', 'Xanh lam', 'Blue', 0.9),
  copper: color('#b87333', 'Đỏ (màu đồng)', 'Copper red', 1),
  blackSolid: color('#1c1c1c', 'Đen', 'Black', 1),
  feIII: color('#c9a227', 'Vàng nâu', 'Yellow-brown', 0.6),
  feII: color('#bfdcb4', 'Lục nhạt', 'Pale green', 0.3),
  feOH3: color('#8b3a1a', 'Nâu đỏ', 'Red-brown', 0.95),
  feOH2: color('#d6e8d2', 'Trắng xanh', 'White-green', 0.85),
  white: WHITE,
  agBr: color('#efe6a4', 'Vàng nhạt', 'Pale yellow', 0.9),
  agI: color('#e3d044', 'Vàng', 'Yellow', 0.92),
  pbI2: color('#f2c500', 'Vàng tươi', 'Bright yellow', 0.95),
  purple: color('#7b1fa2', 'Tím', 'Purple', 0.8),
  mnII: color(
    '#f6e9ef',
    'Gần như không màu (hồng rất nhạt)',
    'Almost colourless (faint pink)',
    0.1
  ),
  brOrange: color('#e07b00', 'Nâu cam', 'Orange-brown', 0.6),
  iBrown: color('#8a4b08', 'Nâu', 'Brown', 0.7),
  starchBlue: color('#1b1f5e', 'Xanh tím đen', 'Blue-black', 0.9),
  chlorineWater: color('#dfe88a', 'Vàng lục nhạt', 'Pale yellow-green', 0.25),
  chlorineGas: color('#b5cc3a', 'Vàng lục', 'Yellow-green', 0.5),
  pink: color('#e0338a', 'Hồng tím', 'Magenta pink', 0.55),
  no2: color('#a0522d', 'Nâu đỏ', 'Red-brown', 0.6),
  milky: color('#f4f4f0', 'Trắng đục', 'Milky white', 0.5),
} as const;

export const aq = (formula: string, extra: Partial<Species> = {}) =>
  sp(formula, 'aq', { form: 'solution', ...extra });

/** Màu kim loại (bề mặt sạch). */
export const METAL = {
  zn: color('#b4b8bd', 'Xám bạc', 'Silvery grey', 1),
  mg: color('#c9cdd1', 'Trắng bạc', 'Silvery white', 1),
  na: color('#d9dde0', 'Trắng bạc', 'Silvery white', 1),
  al: color('#c4c9ce', 'Trắng bạc', 'Silvery white', 1),
  fe: color('#7b7f85', 'Xám', 'Grey', 1),
  cu: C.copper,
  ag: color('#d8d8dc', 'Trắng bạc', 'Silvery white', 1),
} as const;

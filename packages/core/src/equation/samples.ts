/*
 * Phương trình mẫu theo chương trình hoá phổ thông (lớp 8–12), kèm hệ số đúng.
 * Dùng cho test cân bằng (DoD M5) và cho các ví dụ bấm nhanh trên trang Cân bằng.
 * Hệ số đã kiểm bằng tay (bảo toàn nguyên tố, điện tích và electron), không lấy từ chính bộ cân bằng.
 * Bản nháp: cần đối chiếu với danh sách phương trình trong SGK đang dùng.
 */

export type SampleTopic =
  'combination' | 'combustion' | 'decomposition' | 'acidBase' | 'exchange' | 'redox' | 'ionic';

export interface SampleEquation {
  equation: string;
  expected: number[];
  topic: SampleTopic;
}

export const SAMPLE_EQUATIONS: SampleEquation[] = [
  // Hoá hợp, cháy
  { equation: 'H2 + O2 -> H2O', expected: [2, 1, 2], topic: 'combination' },
  { equation: 'Fe + O2 -> Fe3O4', expected: [3, 2, 1], topic: 'combination' },
  { equation: 'Al + O2 -> Al2O3', expected: [4, 3, 2], topic: 'combination' },
  { equation: 'P + O2 -> P2O5', expected: [4, 5, 2], topic: 'combination' },
  { equation: 'Cu + O2 -> CuO', expected: [2, 1, 2], topic: 'combination' },
  { equation: 'Fe + Cl2 -> FeCl3', expected: [2, 3, 2], topic: 'combination' },
  { equation: 'N2 + H2 -> NH3', expected: [1, 3, 2], topic: 'combination' },
  { equation: 'SO2 + O2 -> SO3', expected: [2, 1, 2], topic: 'combination' },
  { equation: 'CaO + H2O -> Ca(OH)2', expected: [1, 1, 1], topic: 'combination' },
  { equation: 'C2H4 + Br2 -> C2H4Br2', expected: [1, 1, 1], topic: 'combination' },
  { equation: 'CH4 + O2 -> CO2 + H2O', expected: [1, 2, 1, 2], topic: 'combustion' },
  { equation: 'C2H5OH + O2 -> CO2 + H2O', expected: [1, 3, 2, 3], topic: 'combustion' },
  { equation: 'C2H2 + O2 -> CO2 + H2O', expected: [2, 5, 4, 2], topic: 'combustion' },
  { equation: 'C3H8 + O2 -> CO2 + H2O', expected: [1, 5, 3, 4], topic: 'combustion' },
  { equation: 'C6H12O6 + O2 -> CO2 + H2O', expected: [1, 6, 6, 6], topic: 'combustion' },
  { equation: 'H2S + O2 -> SO2 + H2O', expected: [2, 3, 2, 2], topic: 'combustion' },
  { equation: 'NH3 + O2 -> NO + H2O', expected: [4, 5, 4, 6], topic: 'combustion' },
  { equation: 'FeS2 + O2 -> Fe2O3 + SO2', expected: [4, 11, 2, 8], topic: 'combustion' },

  // Phân huỷ
  { equation: 'CaCO3 -> CaO + CO2', expected: [1, 1, 1], topic: 'decomposition' },
  { equation: 'KClO3 -> KCl + O2', expected: [2, 2, 3], topic: 'decomposition' },
  { equation: 'KMnO4 -> K2MnO4 + MnO2 + O2', expected: [2, 1, 1, 1], topic: 'decomposition' },
  { equation: 'NaHCO3 -> Na2CO3 + CO2 + H2O', expected: [2, 1, 1, 1], topic: 'decomposition' },
  { equation: 'Ca(HCO3)2 -> CaCO3 + CO2 + H2O', expected: [1, 1, 1, 1], topic: 'decomposition' },
  { equation: 'Fe(OH)3 -> Fe2O3 + H2O', expected: [2, 1, 3], topic: 'decomposition' },
  { equation: 'NH4Cl -> NH3 + HCl', expected: [1, 1, 1], topic: 'decomposition' },
  { equation: 'CuSO4·5H2O -> CuSO4 + H2O', expected: [1, 1, 5], topic: 'decomposition' },
  { equation: 'NaCl + H2O -> NaOH + H2 + Cl2', expected: [2, 2, 2, 1, 1], topic: 'decomposition' },

  // Axit – bazơ, trao đổi
  { equation: 'NaOH + HCl -> NaCl + H2O', expected: [1, 1, 1, 1], topic: 'acidBase' },
  { equation: 'Ba(OH)2 + H2SO4 -> BaSO4 + H2O', expected: [1, 1, 1, 2], topic: 'acidBase' },
  { equation: 'CH3COOH + NaOH -> CH3COONa + H2O', expected: [1, 1, 1, 1], topic: 'acidBase' },
  { equation: 'Al2O3 + NaOH -> NaAlO2 + H2O', expected: [1, 2, 2, 1], topic: 'acidBase' },
  { equation: 'CO2 + Ca(OH)2 -> CaCO3 + H2O', expected: [1, 1, 1, 1], topic: 'acidBase' },
  {
    equation: 'Fe3O4 + H2SO4 -> FeSO4 + Fe2(SO4)3 + H2O',
    expected: [1, 4, 1, 1, 4],
    topic: 'acidBase',
  },
  { equation: 'CuSO4 + NaOH -> Cu(OH)2 + Na2SO4', expected: [1, 2, 1, 1], topic: 'exchange' },
  { equation: 'BaCl2 + Na2SO4 -> BaSO4 + NaCl', expected: [1, 1, 1, 2], topic: 'exchange' },
  { equation: 'AgNO3 + NaCl -> AgCl + NaNO3', expected: [1, 1, 1, 1], topic: 'exchange' },
  { equation: 'CaCO3 + HCl -> CaCl2 + CO2 + H2O', expected: [1, 2, 1, 1, 1], topic: 'exchange' },
  { equation: 'Na2CO3 + HCl -> NaCl + CO2 + H2O', expected: [1, 2, 2, 1, 1], topic: 'exchange' },

  // Oxi hoá – khử
  { equation: 'Na + H2O -> NaOH + H2', expected: [2, 2, 2, 1], topic: 'redox' },
  { equation: 'Fe + HCl -> FeCl2 + H2', expected: [1, 2, 1, 1], topic: 'redox' },
  { equation: 'Al + HCl -> AlCl3 + H2', expected: [2, 6, 2, 3], topic: 'redox' },
  { equation: 'Zn + H2SO4 -> ZnSO4 + H2', expected: [1, 1, 1, 1], topic: 'redox' },
  { equation: 'Al + H2SO4 -> Al2(SO4)3 + H2', expected: [2, 3, 1, 3], topic: 'redox' },
  { equation: 'Fe2O3 + CO -> Fe + CO2', expected: [1, 3, 2, 3], topic: 'redox' },
  { equation: 'CuO + H2 -> Cu + H2O', expected: [1, 1, 1, 1], topic: 'redox' },
  { equation: 'Fe2O3 + Al -> Al2O3 + Fe', expected: [1, 2, 1, 2], topic: 'redox' },
  { equation: 'Fe + CuSO4 -> FeSO4 + Cu', expected: [1, 1, 1, 1], topic: 'redox' },
  { equation: 'Cu + AgNO3 -> Cu(NO3)2 + Ag', expected: [1, 2, 1, 2], topic: 'redox' },
  { equation: 'Cl2 + NaOH -> NaCl + NaClO + H2O', expected: [1, 2, 1, 1, 1], topic: 'redox' },
  { equation: 'Cl2 + KOH -> KCl + KClO3 + H2O', expected: [3, 6, 5, 1, 3], topic: 'redox' },
  { equation: 'MnO2 + HCl -> MnCl2 + Cl2 + H2O', expected: [1, 4, 1, 1, 2], topic: 'redox' },
  {
    equation: 'KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O',
    expected: [2, 16, 2, 2, 5, 8],
    topic: 'redox',
  },
  {
    equation: 'K2Cr2O7 + HCl -> KCl + CrCl3 + Cl2 + H2O',
    expected: [1, 14, 2, 2, 3, 7],
    topic: 'redox',
  },
  { equation: 'Cu + HNO3 -> Cu(NO3)2 + NO + H2O', expected: [3, 8, 3, 2, 4], topic: 'redox' },
  { equation: 'Cu + HNO3 -> Cu(NO3)2 + NO2 + H2O', expected: [1, 4, 1, 2, 2], topic: 'redox' },
  { equation: 'Fe + HNO3 -> Fe(NO3)3 + NO + H2O', expected: [1, 4, 1, 1, 2], topic: 'redox' },
  { equation: 'Al + HNO3 -> Al(NO3)3 + N2O + H2O', expected: [8, 30, 8, 3, 15], topic: 'redox' },
  { equation: 'Mg + HNO3 -> Mg(NO3)2 + NH4NO3 + H2O', expected: [4, 10, 4, 1, 3], topic: 'redox' },
  { equation: 'Zn + HNO3 -> Zn(NO3)2 + N2 + H2O', expected: [5, 12, 5, 1, 6], topic: 'redox' },
  { equation: 'FeO + HNO3 -> Fe(NO3)3 + NO + H2O', expected: [3, 10, 3, 1, 5], topic: 'redox' },
  { equation: 'Fe3O4 + HNO3 -> Fe(NO3)3 + NO + H2O', expected: [3, 28, 9, 1, 14], topic: 'redox' },
  { equation: 'Cu + H2SO4 -> CuSO4 + SO2 + H2O', expected: [1, 2, 1, 1, 2], topic: 'redox' },
  { equation: 'Fe + H2SO4 -> Fe2(SO4)3 + SO2 + H2O', expected: [2, 6, 1, 3, 6], topic: 'redox' },
  { equation: 'C + H2SO4 -> CO2 + SO2 + H2O', expected: [1, 2, 1, 2, 2], topic: 'redox' },
  { equation: 'P + HNO3 -> H3PO4 + NO2 + H2O', expected: [1, 5, 1, 5, 1], topic: 'redox' },
  { equation: 'H2S + SO2 -> S + H2O', expected: [2, 1, 3, 2], topic: 'redox' },
  { equation: 'Al + NaOH + H2O -> NaAlO2 + H2', expected: [2, 2, 2, 2, 3], topic: 'redox' },
  {
    equation: 'FeSO4 + KMnO4 + H2SO4 -> Fe2(SO4)3 + K2SO4 + MnSO4 + H2O',
    expected: [10, 2, 8, 5, 1, 2, 8],
    topic: 'redox',
  },

  // Phương trình ion
  { equation: 'Cu + NO3- + H+ -> Cu2+ + NO + H2O', expected: [3, 2, 8, 3, 2, 4], topic: 'ionic' },
  {
    equation: 'MnO4- + Fe2+ + H+ -> Mn2+ + Fe3+ + H2O',
    expected: [1, 5, 8, 1, 5, 4],
    topic: 'ionic',
  },
  { equation: 'Ba2+ + SO4^2- -> BaSO4', expected: [1, 1, 1], topic: 'ionic' },
  { equation: 'Fe3+ + e- -> Fe2+', expected: [1, 1, 1], topic: 'ionic' },
];

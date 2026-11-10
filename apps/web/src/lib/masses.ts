import { ELEMENTS } from './elements';

/** Nguyên tử khối theo ký hiệu (g/mol), lấy từ dữ liệu PubChem của site. */
export const MASSES: Readonly<Record<string, number>> = Object.fromEntries(
  ELEMENTS.map((e) => [e.symbol, e.atomicMass])
);

export const AVOGADRO = 6.02214076e23;
/** Thể tích mol khí: đktc (0 °C, 1 atm) và đkc (25 °C, 1 bar) theo SGK mới */
export const MOLAR_VOLUME = { stp: 22.4, standard: 24.79 } as const;
export type GasCondition = keyof typeof MOLAR_VOLUME;

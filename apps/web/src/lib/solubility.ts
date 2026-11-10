/*
 * Bảng tính tan trong nước (ở nhiệt độ phòng) theo dạng bảng trong SGK Hoá học phổ thông.
 * t: tan · i: ít tan · k: không tan · x: không tồn tại hoặc bị nước phân huỷ
 * Axit (cột H): tb = tan, dễ bay hơi; tk = tan, khó bay hơi (H2SO4, H3PO4); kk = không tan (H2SiO3).
 * BẢN NHÁP, biên soạn theo tính chất hoá học phổ biến: cần đối chiếu từng ô với bảng in trong SGK đang dùng.
 */
export type Solubility = 't' | 'i' | 'k' | 'x' | 'tb' | 'tk' | 'kk';

export const CATIONS = [
  { id: 'H', label: 'H', charge: 'I' },
  { id: 'K', label: 'K', charge: 'I' },
  { id: 'Na', label: 'Na', charge: 'I' },
  { id: 'Ag', label: 'Ag', charge: 'I' },
  { id: 'Mg', label: 'Mg', charge: 'II' },
  { id: 'Ca', label: 'Ca', charge: 'II' },
  { id: 'Ba', label: 'Ba', charge: 'II' },
  { id: 'Zn', label: 'Zn', charge: 'II' },
  { id: 'Hg', label: 'Hg', charge: 'II' },
  { id: 'Pb', label: 'Pb', charge: 'II' },
  { id: 'Cu', label: 'Cu', charge: 'II' },
  { id: 'Fe2', label: 'Fe', charge: 'II' },
  { id: 'Fe3', label: 'Fe', charge: 'III' },
  { id: 'Al', label: 'Al', charge: 'III' },
] as const;

export const ANIONS = [
  { id: 'OH', label: 'OH', charge: 'I' },
  { id: 'Cl', label: 'Cl', charge: 'I' },
  { id: 'NO3', label: 'NO₃', charge: 'I' },
  { id: 'S', label: 'S', charge: 'II' },
  { id: 'SO3', label: 'SO₃', charge: 'II' },
  { id: 'SO4', label: 'SO₄', charge: 'II' },
  { id: 'CO3', label: 'CO₃', charge: 'II' },
  { id: 'SiO3', label: 'SiO₃', charge: 'II' },
  { id: 'PO4', label: 'PO₄', charge: 'III' },
] as const;

//            H     K    Na   Ag   Mg   Ca   Ba   Zn   Hg   Pb   Cu   Fe2  Fe3  Al
export const SOLUBILITY: Record<(typeof ANIONS)[number]['id'], Solubility[]> = {
  OH: ['x', 't', 't', 'x', 'k', 'i', 't', 'k', 'x', 'k', 'k', 'k', 'k', 'k'],
  Cl: ['tb', 't', 't', 'k', 't', 't', 't', 't', 't', 'i', 't', 't', 't', 't'],
  NO3: ['tb', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't'],
  S: ['tb', 't', 't', 'k', 'x', 't', 't', 'k', 'k', 'k', 'k', 'k', 'x', 'x'],
  SO3: ['tb', 't', 't', 'k', 'k', 'k', 'k', 'k', 'x', 'k', 'x', 'k', 'x', 'x'],
  SO4: ['tk', 't', 't', 'i', 't', 'i', 'k', 't', 't', 'k', 't', 't', 't', 't'],
  CO3: ['tb', 't', 't', 'k', 'k', 'k', 'k', 'k', 'x', 'k', 'x', 'k', 'x', 'x'],
  SiO3: ['kk', 't', 't', 'x', 'k', 'k', 'k', 'k', 'x', 'k', 'x', 'k', 'k', 'k'],
  PO4: ['tk', 't', 't', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k'],
};

/** Dãy hoạt động hoá học của kim loại (SGK), mạnh → yếu; H chen giữa Pb và Cu. */
export const ACTIVITY_SERIES = [
  'K',
  'Na',
  'Ba',
  'Ca',
  'Mg',
  'Al',
  'Zn',
  'Fe',
  'Ni',
  'Sn',
  'Pb',
  'H',
  'Cu',
  'Hg',
  'Ag',
  'Pt',
  'Au',
] as const;
export type ActivityMetal = (typeof ACTIVITY_SERIES)[number];

/** Kim loại tác dụng với nước ở nhiệt độ thường (tạo bazơ tan + H2). */
export const REACTS_WITH_WATER = new Set<string>(['K', 'Na', 'Ba', 'Ca']);

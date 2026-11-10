import type { Isotope } from '@chem/data';

import { BASE_PATH } from './elements';
import { formatNumber } from './format';

export const nuclidesUrl = `${BASE_PATH}/data/nuclides.json`;

type HalfLife = NonNullable<Isotope['halfLife']>;
type UnitName = (key: string) => string;

const OP: Record<HalfLife['op'], string> = { '': '', GT: '> ', LT: '< ', GE: '≥ ', AP: '≈ ' };

const YEAR = 365.25 * 86400;

/** Giá trị + đơn vị, năm lớn thì đổi sang triệu/tỷ năm: "4,468 tỷ năm", "5.700 năm", "12,32 năm". */
function withUnit(value: number, unit: string, locale: string, unitName: UnitName): string {
  const fmt = (v: number) => formatNumber(v, locale, 4);
  if (unit === 'Y') {
    if (value >= 1e9) return `${fmt(value / 1e9)} ${unitName('yBil')}`;
    if (value >= 1e6) return `${fmt(value / 1e6)} ${unitName('yMil')}`;
    return `${fmt(value)} ${unitName('y')}`;
  }
  return `${fmt(value)} ${unitName(unit)}`;
}

/** Chu kỳ bán rã theo đúng cách nguồn ghi (giữ toán tử >, <, ≈). */
export function formatHalfLife(h: HalfLife, locale: string, unitName: UnitName): string {
  return OP[h.op] + withUnit(Number(h.text), h.unit, locale, unitName);
}

/** Khoảng thời gian bất kỳ (giây) với đơn vị phù hợp nhất, dùng cho nhãn thời gian của mô phỏng. */
export function formatSeconds(sec: number, locale: string, unitName: UnitName): string {
  if (sec === 0) return `0 ${unitName('s')}`;
  const steps: Array<[number, string]> = [
    [YEAR, 'Y'],
    [86400, 'd'],
    [3600, 'h'],
    [60, 'm'],
    [1, 's'],
    [1e-3, 'ms'],
    [1e-6, 'us'],
    [1e-9, 'ns'],
    [1e-12, 'ps'],
    [1e-18, 'as'],
  ];
  const [size, unit] = steps.find(([s]) => sec >= s) ?? steps[steps.length - 1]!;
  return withUnit(sec / size, unit, locale, unitName);
}

/** Hạt nhân tính theo log10 chu kỳ bán rã (giây) để sắp xếp "bền nhất → kém bền nhất". */
export const lifetime = (i: Isotope) => (i.stable ? Infinity : (i.halfLife?.seconds ?? 0));

/** Có đủ dữ liệu để mô phỏng phân rã không (không bền, biết chu kỳ bán rã và kiểu phân rã). */
export const canSimulate = (i: Isotope) => !i.stable && !!i.halfLife && i.decays.length > 0;

const MODE_SYMBOL: Record<string, string> = {
  'B-': 'β⁻',
  '2B-': '2β⁻',
  'B-N': 'β⁻n',
  'B-2N': 'β⁻2n',
  'B-A': 'β⁻α',
  'EC+B+': 'EC + β⁺',
  EC: 'EC',
  'B+': 'β⁺',
  '2EC': '2EC',
  '2B+': '2β⁺',
  ECP: 'EC p',
  'B+P': 'β⁺p',
  'B+A': 'β⁺α',
  A: 'α',
  SF: 'SF',
  ECSF: 'EC SF',
  P: 'p',
  '2P': '2p',
  N: 'n',
  '2N': '2n',
  IT: 'IT',
};

/** Ký hiệu hiển thị của kiểu phân rã IAEA: "B-" → "β⁻", "EC+B+" → "EC + β⁺". */
export const modeSymbol = (mode: string) => MODE_SYMBOL[mode] ?? mode;

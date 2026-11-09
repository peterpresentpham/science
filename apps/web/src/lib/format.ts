export function formatNumber(value: number, locale: string, maxFractionDigits = 3): string {
  return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
}

/** "1 811 K (1 538 °C)" */
export function formatTemperature(k: number, locale: string): string {
  return `${formatNumber(k, locale, 2)} K (${formatNumber(k - 273.15, locale, 1)} °C)`;
}

export function formatOxidationStates(states: number[]): string {
  return states.map((s) => (s > 0 ? `+${s}` : String(s))).join(', ');
}

export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

const BIG_UNITS: Record<'vi' | 'en', Array<[number, string]>> = {
  vi: [
    [1e24, 'triệu tỉ tỉ'],
    [1e21, 'nghìn tỉ tỉ'],
    [1e18, 'tỉ tỉ'],
    [1e15, 'triệu tỉ'],
    [1e12, 'nghìn tỉ'],
    [1e9, 'tỉ'],
    [1e6, 'triệu'],
    [1e3, 'nghìn'],
  ],
  en: [
    [1e24, 'septillion'],
    [1e21, 'sextillion'],
    [1e18, 'quintillion'],
    [1e15, 'quadrillion'],
    [1e12, 'trillion'],
    [1e9, 'billion'],
    [1e6, 'million'],
    [1e3, 'thousand'],
  ],
};

/** Đọc số lớn bằng chữ cho người không quen 10ⁿ: 1,08 × 10²² → "10,8 nghìn tỉ tỉ" / "10.8 sextillion". */
export function formatBig(n: number, locale: string): string {
  const units = BIG_UNITS[locale === 'vi' ? 'vi' : 'en'];
  const fmt = (v: number) =>
    new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
      maximumSignificantDigits: 3,
    }).format(v);
  const unit = units.find(([size]) => n >= size);
  return unit ? `${fmt(n / unit[0])} ${unit[1]}` : fmt(n);
}

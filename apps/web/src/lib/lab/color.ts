import type { Color } from '@chem/data/reaction';

/** Màu mặc định của chất lỏng "không màu": vẫn cần thấy được mực nước trong ống. */
const WATER = { hex: '#cfe8f5', opacity: 0.35 };
const MIN_OPACITY = 0.18;

const channels = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

const ease = (t: number) => t * t * (3 - 2 * t);
export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Màu ở giữa hai màu (không ghi = không màu); t = 0..1 đã làm mượt. Trả về chuỗi CSS rgba(). */
export function mixColor(a: Color | undefined, b: Color | undefined, t: number): string {
  const from = a ?? WATER;
  const to = b ?? WATER;
  const k = ease(clamp01(t));
  const [r1, g1, b1] = channels(from.hex);
  const [r2, g2, b2] = channels(to.hex);
  const alpha = Math.max(MIN_OPACITY, from.opacity + (to.opacity - from.opacity) * k);
  const mix = (x: number, y: number) => Math.round(x + (y - x) * k);
  return `rgba(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)}, ${alpha.toFixed(3)})`;
}

/** Màu một chất (chất rắn, khí): không ghi màu thì dùng xám trung tính. */
export function solidColor(c: Color | undefined, fallback = '#a8adb3'): string {
  if (!c) return fallback;
  const [r, g, b] = channels(c.hex);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0.5, c.opacity)})`;
}

export const rgba = (c: Color, scale = 1): string => {
  const [r, g, b] = channels(c.hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp01(c.opacity * scale).toFixed(3)})`;
};

/** Hai màu có khác nhau đủ để người xem thấy "đổi màu" không. */
export function colorsDiffer(a: Color | undefined, b: Color | undefined): boolean {
  const x = a ?? { hex: '#ffffff', opacity: 0 };
  const y = b ?? { hex: '#ffffff', opacity: 0 };
  const [r1, g1, b1] = channels(x.hex);
  const [r2, g2, b2] = channels(y.hex);
  const dist = Math.hypot(r1 - r2, g1 - g2, b1 - b2);
  return (
    Math.abs(x.opacity - y.opacity) > 0.25 || (dist > 45 && Math.max(x.opacity, y.opacity) > 0.2)
  );
}

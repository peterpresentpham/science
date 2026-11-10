import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Category } from '@chem/data';

import { ELEMENTS } from './elements';

/*
 * Ảnh Open Graph 1200×630, render lúc build bằng next/og (satori).
 * satori không hiểu oklch / biến CSS nên màu ở đây là hex, đổi từ token sáng trong globals.css.
 * Font: Be Vietnam Pro (OFL) dạng TTF trong src/assets/fonts, vì satori không đọc được woff2.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export const CAT_HEX: Record<Category, string> = {
  'alkali-metal': '#e24a3f',
  'alkaline-earth-metal': '#df8623',
  'transition-metal': '#3a7bcb',
  'post-transition-metal': '#318ea2',
  metalloid: '#239d6a',
  nonmetal: '#7da127',
  halogen: '#009c96',
  'noble-gas': '#8654cc',
  lanthanide: '#c34e97',
  actinide: '#c94363',
};
export const OG = { bg: '#f9f6f2', fg: '#13161d', muted: '#5d6170', accent: '#4b3fc4' };

let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 700 }[]> | null = null;
export function ogFonts() {
  const dir = join(process.cwd(), 'src/assets/fonts');
  fonts ??= Promise.all([
    readFile(join(dir, 'BeVietnamPro-Regular.ttf')).then((data) => ({
      name: 'BeVietnamPro',
      data,
      weight: 400 as const,
    })),
    readFile(join(dir, 'BeVietnamPro-Bold.ttf')).then((data) => ({
      name: 'BeVietnamPro',
      data,
      weight: 700 as const,
    })),
  ]);
  return fonts;
}

/** Bảng tuần hoàn thu nhỏ (mỗi ô một màu theo loại), dùng làm hình trang trí. `hl`: Z được làm nổi. */
export function MiniTable({ cell, hl }: { cell: number; hl?: number }) {
  const gap = Math.max(2, Math.round(cell / 8));
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: 18 * (cell + gap),
        height: 10 * (cell + gap),
      }}
    >
      {ELEMENTS.map((e) => (
        <div
          key={e.z}
          style={{
            position: 'absolute',
            left: (e.grid.x - 1) * (cell + gap),
            top: (e.grid.y - 1) * (cell + gap) + (e.grid.y > 7 ? gap * 3 : 0),
            width: cell,
            height: cell,
            borderRadius: Math.round(cell / 5),
            background: CAT_HEX[e.category],
            opacity: hl === undefined || hl === e.z ? 1 : 0.22,
          }}
        />
      ))}
    </div>
  );
}

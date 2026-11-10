'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { formatNumber } from '@/lib/format';

const LOW = 380;
const HIGH = 750;

/**
 * Bước sóng (nm) → màu sRGB gần đúng (thuật toán của Dan Bruton), giảm sáng ở hai đầu
 * vùng nhìn thấy vì mắt kém nhạy ở đó.
 */
export function wavelengthToRgb(nm: number): string {
  const [r, g, b] =
    nm < 440
      ? [(440 - nm) / (440 - 380), 0, 1]
      : nm < 490
        ? [0, (nm - 440) / (490 - 440), 1]
        : nm < 510
          ? [0, 1, (510 - nm) / (510 - 490)]
          : nm < 580
            ? [(nm - 510) / (580 - 510), 1, 0]
            : nm < 645
              ? [1, (645 - nm) / (645 - 580), 0]
              : [1, 0, 0];
  const edge =
    nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (750 - nm)) / 50 : 1;
  const c = (v: number) => Math.round(255 * Math.pow(Math.max(0, v * edge), 0.8));
  return `rgb(${c(r)}, ${c(g)}, ${c(b)})`;
}

const W = 740;
const H = 64;
const x = (nm: number) => ((nm - LOW) / (HIGH - LOW)) * W;

/**
 * Phổ vạch phát xạ: nền tối, mỗi vạch là một đường màu đúng bước sóng, độ đậm theo cường độ tương đối
 * (căn bậc hai để vạch yếu vẫn thấy). Có dải phổ liên tục phía trên để so sánh.
 * Trỏ vào (hoặc chạm) gần một vạch để xem bước sóng.
 */
export function SpectrumBar({
  lines,
  label,
  highlight = [],
}: {
  lines: Array<[number, number]>;
  label: string;
  /** Bước sóng cần đánh dấu (vd. vạch tạo màu ngọn lửa) */
  highlight?: number[];
}) {
  const t = useTranslations('structure.spectrum');
  const locale = useLocale();
  const [hover, setHover] = useState<[number, number] | null>(null);
  const strongest = [...lines].sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <figure className="space-y-2">
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H + 40}`}
          className="w-full touch-none"
          role="img"
          aria-label={label}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const nm = LOW + ((e.clientX - r.left) / r.width) * (HIGH - LOW);
            let best: [number, number] | null = null;
            for (const l of lines)
              if (
                Math.abs(l[0] - nm) < 4 &&
                (!best || Math.abs(l[0] - nm) < Math.abs(best[0] - nm))
              )
                best = l;
            setHover(best);
          }}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="spectrum-continuous">
              {Array.from({ length: 38 }, (_, i) => {
                const nm = LOW + (i * (HIGH - LOW)) / 37;
                return (
                  <stop key={i} offset={`${(i / 37) * 100}%`} stopColor={wavelengthToRgb(nm)} />
                );
              })}
            </linearGradient>
          </defs>
          {/* Phổ liên tục (ánh sáng trắng) để so sánh */}
          <rect x={0} y={0} width={W} height={10} rx={3} fill="url(#spectrum-continuous)" />
          <rect x={0} y={16} width={W} height={H - 16} rx={6} fill="#07080c" />
          {lines.map(([nm, i]) => (
            <line
              key={nm}
              x1={x(nm)}
              x2={x(nm)}
              y1={18}
              y2={H - 2}
              stroke={wavelengthToRgb(nm)}
              strokeWidth={hover?.[0] === nm ? 3 : 1.6}
              strokeOpacity={0.25 + 0.75 * Math.sqrt(i)}
            />
          ))}
          {highlight
            .filter((nm) => nm >= LOW && nm <= HIGH)
            .map((nm) => (
              <path
                key={nm}
                d={`M${x(nm) - 5},${H + 9} L${x(nm) + 5},${H + 9} L${x(nm)},${H + 2} Z`}
                fill="currentColor"
              />
            ))}
          {[400, 450, 500, 550, 600, 650, 700].map((nm) => (
            <g key={nm} className="fill-muted text-[11px]">
              <line
                x1={x(nm)}
                x2={x(nm)}
                y1={H}
                y2={H + 4}
                stroke="currentColor"
                strokeOpacity={0.4}
              />
              <text x={x(nm)} y={H + 22} textAnchor="middle">
                {nm}
              </text>
            </g>
          ))}
          <text x={W} y={H + 38} textAnchor="end" className="fill-muted text-[11px]">
            nm
          </text>
        </svg>
        {hover && (
          <div
            role="status"
            className="pointer-events-none absolute top-0 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-surface px-2 py-1 font-mono text-xs whitespace-nowrap shadow-card"
            style={{ left: `${(x(hover[0]) / W) * 100}%` }}
          >
            {formatNumber(hover[0], locale, 2)} nm ·{' '}
            {t('relative', { value: Math.round(hover[1] * 100) })}
          </div>
        )}
      </div>
      <figcaption className="text-xs text-muted">
        {t('strongest', {
          list: strongest.map(([nm]) => `${formatNumber(nm, locale, 1)} nm`).join(', '),
          count: lines.length,
        })}
      </figcaption>
    </figure>
  );
}

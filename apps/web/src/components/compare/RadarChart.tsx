'use client';

import { useState } from 'react';

/*
 * Biểu đồ radar so sánh tối đa 3 nguyên tố trên các thuộc tính đã chuẩn hoá về 0..1
 * (min–max trên cả 118 nguyên tố, mỗi trục một thang riêng). Theo nguyên tắc dataviz:
 * đường 2px, điểm ≥ 8px có viền màu nền, lưới mờ, có chú thích + nhãn trực tiếp,
 * tooltip theo từng điểm, và luôn có bảng số liệu đi kèm (bảng nằm ở trang so sánh).
 */

export interface RadarSeries {
  id: string;
  label: string;
  color: string;
  /** Giá trị đã chuẩn hoá 0..1 theo từng trục; null = không có dữ liệu */
  values: Array<number | null>;
  /** Giá trị gốc để hiện trong tooltip */
  display: string[];
}

interface Props {
  axes: string[];
  series: RadarSeries[];
  noData: string;
  title: string;
}

const SIZE = 420;
const C = SIZE / 2;
const R = 140;
const RINGS = [0.25, 0.5, 0.75, 1];

const point = (i: number, n: number, v: number) => {
  const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
  return { x: C + Math.cos(a) * R * v, y: C + Math.sin(a) * R * v, a };
};

export function RadarChart({ axes, series, noData, title }: Props) {
  const [hover, setHover] = useState<{ s: number; i: number } | null>(null);
  const n = axes.length;
  const tip = hover ? { s: series[hover.s], i: hover.i } : null;
  const tipPos = tip ? point(tip.i, n, tip.s?.values[tip.i] ?? 0) : null;

  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={title}
        className="w-full overflow-visible"
        onMouseLeave={() => setHover(null)}
      >
        {/* Lưới: các vòng đa giác + trục, màu nhạt */}
        {RINGS.map((r) => (
          <polygon
            key={r}
            points={axes.map((_, i) => `${point(i, n, r).x},${point(i, n, r).y}`).join(' ')}
            fill="none"
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}
        {axes.map((label, i) => {
          const end = point(i, n, 1);
          const lp = point(i, n, 1.16);
          const cos = Math.cos(lp.a);
          return (
            <g key={label}>
              <line x1={C} y1={C} x2={end.x} y2={end.y} stroke="var(--border)" strokeWidth={1} />
              <text
                x={lp.x}
                y={lp.y}
                textAnchor={Math.abs(cos) < 0.2 ? 'middle' : cos > 0 ? 'start' : 'end'}
                dominantBaseline="middle"
                className="fill-muted text-[12px]"
              >
                {label}
              </text>
            </g>
          );
        })}

        {series.map((s, si) => {
          const pts = s.values.map((v, i) => point(i, n, v ?? 0));
          const dimmed = hover !== null && hover.s !== si;
          // Nhãn trực tiếp: ký hiệu đặt ở điểm xa tâm nhất của chuỗi
          let best = 0;
          s.values.forEach((v, i) => {
            if ((v ?? -1) > (s.values[best] ?? -1)) best = i;
          });
          const lab = point(best, n, (s.values[best] ?? 0) + 0.08 + si * 0.02);
          return (
            <g key={s.id} style={{ opacity: dimmed ? 0.25 : 1, transition: 'opacity 150ms' }}>
              <polygon
                points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
                fill={s.color}
                fillOpacity={0.1}
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
              />
              {pts.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={s.values[i] == null ? 3.5 : 4.5}
                    fill={s.values[i] == null ? 'var(--surface)' : s.color}
                    stroke={s.values[i] == null ? s.color : 'var(--surface)'}
                    strokeWidth={2}
                  />
                  {/* Vùng bắt chuột lớn hơn điểm vẽ */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={13}
                    fill="transparent"
                    onMouseEnter={() => setHover({ s: si, i })}
                  />
                </g>
              ))}
              <text
                x={lab.x}
                y={lab.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-fg text-[13px] font-semibold"
                style={{ paintOrder: 'stroke', stroke: 'var(--surface)', strokeWidth: 4 }}
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
      {tip?.s && tipPos && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs whitespace-nowrap shadow-card"
          style={{ left: `${(tipPos.x / SIZE) * 100}%`, top: `${(tipPos.y / SIZE) * 100}%` }}
        >
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="size-2 rounded-full" style={{ background: tip.s.color }} />
            {tip.s.label} · {axes[tip.i]}
          </span>
          <span className="tabular font-mono text-muted">
            {tip.s.values[tip.i] == null ? noData : tip.s.display[tip.i]}
          </span>
        </div>
      )}
    </figure>
  );
}

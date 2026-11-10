'use client';

import type { Block, ElementLite } from '@chem/data';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { BLOCK_COLOR, PROPERTIES, PROPERTY_KEYS, type PropertyKey } from '@/lib/color-mode';
import { ELEMENTS } from '@/lib/elements';
import { cn, formatNumber } from '@/lib/format';

/*
 * Đồ thị xu hướng (dataviz):
 * - Đường theo Z: một chuỗi (không cần chú thích), đường 2px, đứt đoạn ở chỗ thiếu dữ liệu,
 *   vạch dọc mờ ở các khí hiếm để thấy chu kỳ; đường dọc bám con trỏ + tooltip theo Z gần nhất.
 * - Tán xạ 2 thuộc tính: màu theo khối s/p/d/f (bộ 4 màu đã kiểm định "mọi cặp") kèm hình dạng điểm
 *   khác nhau làm mã hoá phụ; tooltip theo điểm gần con trỏ nhất.
 * - Luôn có nút xem dạng bảng.
 */

const W = 760;
const H = 340;
const PAD = { l: 56, r: 16, t: 16, b: 36 };
const NOBLE = [2, 10, 18, 36, 54, 86, 118];

const value = (e: ElementLite, k: PropertyKey) => {
  const v = PROPERTIES[k].get(e);
  return v == null || (PROPERTIES[k].log && v <= 0) ? null : PROPERTIES[k].display(v);
};

interface Axis {
  min: number;
  max: number;
  log: boolean;
  /** dữ liệu → toạ độ 0..1 */
  at: (v: number) => number;
  ticks: number[];
}

function axisFor(values: number[], log: boolean): Axis {
  if (log) {
    const lo = Math.floor(Math.log10(Math.min(...values)));
    const hi = Math.ceil(Math.log10(Math.max(...values)));
    const ticks = Array.from({ length: hi - lo + 1 }, (_, i) => 10 ** (lo + i));
    return {
      min: 10 ** lo,
      max: 10 ** hi,
      log,
      at: (v) => (Math.log10(v) - lo) / (hi - lo),
      ticks,
    };
  }
  const min0 = Math.min(0, ...values);
  const max0 = Math.max(...values);
  const span = max0 - min0 || 1;
  const step0 = 10 ** Math.floor(Math.log10(span / 5));
  const step = [1, 2, 5, 10].map((m) => m * step0).find((s) => span / s <= 6) ?? step0 * 10;
  const min = Math.floor(min0 / step) * step;
  const max = Math.ceil(max0 / step) * step;
  const ticks: number[] = [];
  for (let v = min; v <= max + step / 2; v += step) ticks.push(Number(v.toPrecision(12)));
  return { min, max, log, at: (v) => (v - min) / (max - min), ticks };
}

const px = (t: number) => PAD.l + t * (W - PAD.l - PAD.r);
const py = (t: number) => H - PAD.b - t * (H - PAD.t - PAD.b);

/** Hình dạng điểm theo khối: tròn, vuông, tam giác, thoi (mã hoá phụ ngoài màu). */
function Marker({ block, x, y, r = 4.5 }: { block: Block; x: number; y: number; r?: number }) {
  const common = { fill: BLOCK_COLOR[block], stroke: 'var(--surface)', strokeWidth: 1.5 };
  if (block === 's') return <circle cx={x} cy={y} r={r} {...common} />;
  if (block === 'p')
    return <rect x={x - r} y={y - r} width={2 * r} height={2 * r} rx={1} {...common} />;
  if (block === 'd')
    return (
      <path
        d={`M${x},${y - r * 1.2} L${x + r * 1.1},${y + r * 0.8} L${x - r * 1.1},${y + r * 0.8} Z`}
        {...common}
      />
    );
  return (
    <path
      d={`M${x},${y - r * 1.25} L${x + r},${y} L${x},${y + r * 1.25} L${x - r},${y} Z`}
      {...common}
    />
  );
}

export function TrendsTool() {
  const t = useTranslations();
  const [prop, setProp] = useState<PropertyKey>('ie');
  const [xProp, setX] = useState<PropertyKey>('en');
  const [yProp, setY] = useState<PropertyKey>('radius');
  const select = (v: PropertyKey, on: (k: PropertyKey) => void, label: string) => (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-muted">{label}</span>
      <select
        value={v}
        onChange={(e) => on(e.target.value as PropertyKey)}
        className="rounded-full border border-border bg-surface px-3 py-1"
      >
        {PROPERTY_KEYS.map((k) => (
          <option key={k} value={k}>
            {t(`colorMode.property.${k}`)}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <div className="space-y-8">
      <section className="space-y-3 rounded-3xl border border-border bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">{t('tools.trends.lineTitle')}</h2>
          {select(prop, setProp, t('tools.trends.property'))}
        </div>
        <LineByZ k={prop} />
      </section>
      <section className="space-y-3 rounded-3xl border border-border bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">{t('tools.trends.scatterTitle')}</h2>
          <div className="flex flex-wrap gap-3">
            {select(xProp, setX, t('tools.trends.xAxis'))}
            {select(yProp, setY, t('tools.trends.yAxis'))}
          </div>
        </div>
        <Scatter xk={xProp} yk={yProp} />
      </section>
    </div>
  );
}

function unitLabel(k: PropertyKey, t: ReturnType<typeof useTranslations>) {
  const u = PROPERTIES[k].unit;
  return `${t(`colorMode.property.${k}`)}${u ? ` (${u})` : ''}`;
}

function YAxis({ axis, label }: { axis: Axis; label: string }) {
  const locale = useLocale();
  return (
    <g className="text-[11px]">
      {axis.ticks.map((v) => (
        <g key={v}>
          <line
            x1={PAD.l}
            x2={W - PAD.r}
            y1={py(axis.at(v))}
            y2={py(axis.at(v))}
            stroke="var(--border)"
            strokeWidth={1}
          />
          <text
            x={PAD.l - 6}
            y={py(axis.at(v))}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-muted"
          >
            {formatNumber(v, locale, axis.log ? 4 : 2)}
          </text>
        </g>
      ))}
      <text
        x={12}
        y={PAD.t + (H - PAD.t - PAD.b) / 2}
        transform={`rotate(-90 12 ${PAD.t + (H - PAD.t - PAD.b) / 2})`}
        textAnchor="middle"
        className="fill-muted"
      >
        {label}
      </text>
    </g>
  );
}

function TableToggle({ children }: { children: React.ReactNode }) {
  const t = useTranslations('tools.trends');
  return (
    <details className="text-sm">
      <summary className="cursor-pointer text-muted hover:text-fg">{t('showTable')}</summary>
      <div className="mt-2 max-h-80 overflow-auto rounded-xl border border-border">{children}</div>
    </details>
  );
}

function LineByZ({ k }: { k: PropertyKey }) {
  const t = useTranslations();
  const locale = useLocale();
  const [hover, setHover] = useState<number | null>(null);
  const pts = useMemo(() => ELEMENTS.map((e) => ({ e, v: value(e, k) })), [k]);
  const axis = useMemo(
    () =>
      axisFor(
        pts.flatMap((p) => (p.v == null ? [] : [p.v])),
        !!PROPERTIES[k].log
      ),
    [pts, k]
  );
  const xAt = (z: number) => px((z - 1) / 117);
  // Đường đứt ở chỗ thiếu dữ liệu
  const paths: string[] = [];
  let cur = '';
  for (const p of pts) {
    if (p.v == null) {
      if (cur) paths.push(cur);
      cur = '';
      continue;
    }
    cur += `${cur ? 'L' : 'M'}${xAt(p.e.z).toFixed(1)},${py(axis.at(p.v)).toFixed(1)}`;
  }
  if (cur) paths.push(cur);
  const hp = hover ? pts[hover - 1] : null;
  const name = (e: ElementLite) => (locale === 'vi' ? e.name.vi : e.name.en);
  const fmt = (v: number) =>
    `${formatNumber(v, locale, PROPERTIES[k].log ? 5 : PROPERTIES[k].digits + 1)}${PROPERTIES[k].unit ? ` ${PROPERTIES[k].unit}` : ''}`;

  return (
    <div className="space-y-2">
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-none"
          role="img"
          aria-label={t('tools.trends.lineLabel', { property: t(`colorMode.property.${k}`) })}
          onPointerMove={(ev) => {
            const r = ev.currentTarget.getBoundingClientRect();
            const x = ((ev.clientX - r.left) / r.width) * W;
            const z = Math.round(((x - PAD.l) / (W - PAD.l - PAD.r)) * 117) + 1;
            setHover(Math.min(118, Math.max(1, z)));
          }}
          onPointerLeave={() => setHover(null)}
        >
          <YAxis axis={axis} label={unitLabel(k, t)} />
          {NOBLE.map((z) => (
            <g key={z}>
              <line
                x1={xAt(z)}
                x2={xAt(z)}
                y1={PAD.t}
                y2={H - PAD.b}
                stroke="var(--fg)"
                strokeOpacity={0.12}
                strokeDasharray="3 3"
              />
              <text
                x={xAt(z)}
                y={H - PAD.b + 14}
                textAnchor="middle"
                className="fill-muted text-[10px]"
              >
                {z}
              </text>
            </g>
          ))}
          <text x={W - PAD.r} y={H - 4} textAnchor="end" className="fill-muted text-[11px]">
            {t('tools.trends.zAxis')}
          </text>
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="var(--series-1)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
          ))}
          {hp && (
            <g>
              <line
                x1={xAt(hp.e.z)}
                x2={xAt(hp.e.z)}
                y1={PAD.t}
                y2={H - PAD.b}
                stroke="var(--fg)"
                strokeOpacity={0.5}
              />
              {hp.v != null && (
                <circle
                  cx={xAt(hp.e.z)}
                  cy={py(axis.at(hp.v))}
                  r={4.5}
                  fill="var(--series-1)"
                  stroke="var(--surface)"
                  strokeWidth={2}
                />
              )}
            </g>
          )}
        </svg>
        {hp && (
          <div
            role="status"
            className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs whitespace-nowrap shadow-card"
            style={{ left: `${(xAt(hp.e.z) / W) * 100}%` }}
          >
            <span className="font-semibold">
              {hp.e.z} · {hp.e.symbol} {name(hp.e)}
            </span>
            <span className="tabular block font-mono text-muted">
              {hp.v == null ? t('colorMode.noData') : fmt(hp.v)}
            </span>
          </div>
        )}
      </div>
      <p className="text-xs text-muted">{t('tools.trends.nobleHint')}</p>
      <TableToggle>
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-surface">
            <tr className="text-left text-xs text-muted">
              <th className="px-3 py-1.5">Z</th>
              <th className="px-3 py-1.5">{t('tools.molar.element')}</th>
              <th className="px-3 py-1.5 text-right">{unitLabel(k, t)}</th>
            </tr>
          </thead>
          <tbody>
            {pts.map((p) => (
              <tr key={p.e.z} className="border-t border-border">
                <td className="tabular px-3 py-1 font-mono">{p.e.z}</td>
                <td className="px-3 py-1">
                  {p.e.symbol} <span className="text-muted">{name(p.e)}</span>
                </td>
                <td className="tabular px-3 py-1 text-right font-mono">
                  {p.v == null ? '—' : fmt(p.v)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableToggle>
    </div>
  );
}

function Scatter({ xk, yk }: { xk: PropertyKey; yk: PropertyKey }) {
  const t = useTranslations();
  const locale = useLocale();
  const [hover, setHover] = useState<number | null>(null);
  const pts = useMemo(
    () =>
      ELEMENTS.flatMap((e) => {
        const x = value(e, xk);
        const y = value(e, yk);
        return x == null || y == null ? [] : [{ e, x, y }];
      }),
    [xk, yk]
  );
  const ax = useMemo(
    () =>
      axisFor(
        pts.map((p) => p.x),
        !!PROPERTIES[xk].log
      ),
    [pts, xk]
  );
  const ay = useMemo(
    () =>
      axisFor(
        pts.map((p) => p.y),
        !!PROPERTIES[yk].log
      ),
    [pts, yk]
  );
  const hp = pts.find((p) => p.e.z === hover);
  const name = (e: ElementLite) => (locale === 'vi' ? e.name.vi : e.name.en);
  const fmt = (k: PropertyKey, v: number) =>
    `${formatNumber(v, locale, PROPERTIES[k].log ? 5 : PROPERTIES[k].digits + 1)}${PROPERTIES[k].unit ? ` ${PROPERTIES[k].unit}` : ''}`;

  return (
    <div className="space-y-2">
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {(['s', 'p', 'd', 'f'] as const).map((b) => (
          <li key={b} className="flex items-center gap-1.5">
            <svg width={12} height={12} viewBox="-6 -6 12 12" aria-hidden>
              <Marker block={b} x={0} y={0} r={4} />
            </svg>
            {t('colorMode.block', { block: b })}
          </li>
        ))}
        <li className="text-muted">{t('tools.trends.points', { count: pts.length })}</li>
      </ul>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-none"
          role="img"
          aria-label={t('tools.trends.scatterLabel', {
            x: t(`colorMode.property.${xk}`),
            y: t(`colorMode.property.${yk}`),
          })}
          onPointerMove={(ev) => {
            const r = ev.currentTarget.getBoundingClientRect();
            const mx = ((ev.clientX - r.left) / r.width) * W;
            const my = ((ev.clientY - r.top) / r.height) * H;
            let best: number | null = null;
            let bd = 24 * 24; // bán kính bắt điểm (đơn vị viewBox)
            for (const p of pts) {
              const d = (px(ax.at(p.x)) - mx) ** 2 + (py(ay.at(p.y)) - my) ** 2;
              if (d < bd) {
                bd = d;
                best = p.e.z;
              }
            }
            setHover(best);
          }}
          onPointerLeave={() => setHover(null)}
        >
          <YAxis axis={ay} label={unitLabel(yk, t)} />
          {ax.ticks.map((v) => (
            <text
              key={v}
              x={px(ax.at(v))}
              y={H - PAD.b + 14}
              textAnchor="middle"
              className="fill-muted text-[11px]"
            >
              {formatNumber(v, locale, ax.log ? 4 : 2)}
            </text>
          ))}
          <text x={W - PAD.r} y={H - 4} textAnchor="end" className="fill-muted text-[11px]">
            {unitLabel(xk, t)}
          </text>
          {pts.map((p) => (
            <g key={p.e.z} opacity={hover && hover !== p.e.z ? 0.45 : 1}>
              <Marker
                block={p.e.block}
                x={px(ax.at(p.x))}
                y={py(ay.at(p.y))}
                r={hover === p.e.z ? 6.5 : 4.5}
              />
            </g>
          ))}
        </svg>
        {hp && (
          <div
            role="status"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs whitespace-nowrap shadow-card"
            style={{
              left: `${(px(ax.at(hp.x)) / W) * 100}%`,
              top: `${(py(ay.at(hp.y)) / H) * 100}%`,
            }}
          >
            <span className="font-semibold">
              {hp.e.symbol} {name(hp.e)} · {t('colorMode.blockShort', { block: hp.e.block })}
            </span>
            <span className="tabular block font-mono text-muted">
              {t(`colorMode.property.${xk}`)}: {fmt(xk, hp.x)}
            </span>
            <span className="tabular block font-mono text-muted">
              {t(`colorMode.property.${yk}`)}: {fmt(yk, hp.y)}
            </span>
          </div>
        )}
      </div>
      <TableToggle>
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-surface">
            <tr className="text-left text-xs text-muted">
              <th className="px-3 py-1.5">{t('tools.molar.element')}</th>
              <th className="px-3 py-1.5">{t('colorMode.mode.block')}</th>
              <th className="px-3 py-1.5 text-right">{unitLabel(xk, t)}</th>
              <th className="px-3 py-1.5 text-right">{unitLabel(yk, t)}</th>
            </tr>
          </thead>
          <tbody>
            {pts.map((p) => (
              <tr key={p.e.z} className={cn('border-t border-border')}>
                <td className="px-3 py-1">
                  {p.e.symbol} <span className="text-muted">{name(p.e)}</span>
                </td>
                <td className="px-3 py-1">{p.e.block}</td>
                <td className="tabular px-3 py-1 text-right font-mono">{fmt(xk, p.x)}</td>
                <td className="tabular px-3 py-1 text-right font-mono">{fmt(yk, p.y)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableToggle>
    </div>
  );
}

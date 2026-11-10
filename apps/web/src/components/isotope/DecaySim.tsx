'use client';

import { decayDaughter } from '@chem/core';
import type { ElementFull } from '@chem/data';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { BY_Z } from '@/lib/elements';
import { formatNumber } from '@/lib/format';
import { canSimulate, formatHalfLife, formatSeconds, lifetime, modeSymbol } from '@/lib/isotopes';

import { Nuclide } from './Nuclide';

const COLS = 20;
const TOTAL = COLS * COLS;
/** Số chu kỳ bán rã tối đa trên trục thời gian */
const T_MAX = 6;
/** Tốc độ khi phát: chu kỳ bán rã mỗi giây */
const RATE = 0.7;

/** Bộ sinh số ngẫu nhiên có hạt giống: cùng hạt giống → cùng một lần "gieo". */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hạt nhân có ghi chú riêng (khóa `Z-A`), nội dung ở `isotope.notes.*`. */
const NOTES = new Set(['6-14', '92-238', '19-40', '53-131', '27-60', '55-137']);

/**
 * Mô phỏng phân rã phóng xạ: 400 hạt nhân, mỗi hạt có thời điểm phân rã ngẫu nhiên theo phân bố mũ.
 * Thanh trượt đặt thời gian theo đơn vị chu kỳ bán rã; đồ thị so lần chạy thật với đường lý thuyết.
 */
export function DecaySim({ el }: { el: ElementFull }) {
  const t = useTranslations('isotope');
  const locale = useLocale();
  const unitName = (k: string) => t(`unit.${k}`);
  const sliderId = useId();

  const options = useMemo(() => el.isotopes.filter(canSimulate), [el.isotopes]);
  const best = useMemo(
    () => options.reduce((b, i) => (lifetime(i) > lifetime(b) ? i : b), options[0]!),
    [options]
  );
  const [n, setN] = useState(best?.n ?? 0);
  const [run, setRun] = useState(1);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const iso = options.find((i) => i.n === n) ?? best;
  const a = iso ? el.z + iso.n : 0;

  // Thời điểm phân rã của từng hạt nhân (đơn vị chu kỳ bán rã): P(sống tới t) = 2^(−t)
  const times = useMemo(() => {
    const rnd = mulberry32(el.z * 100003 + n * 131 + run * 7919);
    return Array.from({ length: TOTAL }, () => -Math.log2(1 - rnd()));
  }, [el.z, n, run]);
  const sorted = useMemo(() => [...times].sort((x, y) => x - y), [times]);

  // Phát: tăng thời gian đều theo đồng hồ, tự dừng ở cuối trục
  const raf = useRef(0);
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      let done = false;
      setTime((v) => {
        const next = v + dt * RATE;
        if (next >= T_MAX) {
          done = true;
          return T_MAX;
        }
        return next;
      });
      if (done) setPlaying(false);
      else raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  if (!iso || !iso.halfLife) return null;
  const hl = iso.halfLife;
  const primary = iso.decays[0]!;
  const daughterNuc = decayDaughter(el.z, iso.n, primary.mode);
  const daughterEl = daughterNuc ? BY_Z.get(daughterNuc.z) : undefined;
  const daughterA = daughterNuc ? daughterNuc.z + daughterNuc.n : 0;

  const decayed = sorted.filter((x) => x <= time).length;
  const left = TOTAL - decayed;
  const pct = (left / TOTAL) * 100;
  const real = formatSeconds(time * hl.seconds, locale, unitName);
  const note = NOTES.has(`${el.z}-${a}`) ? t(`notes.n${el.z}_${a}`) : null;
  const pctText = `${formatNumber(pct, locale, 1)} %`;

  // --- Đồ thị ---
  const W = 320;
  const H = 150;
  const m = { l: 34, r: 8, t: 8, b: 26 };
  const x = (v: number) => m.l + (v / T_MAX) * (W - m.l - m.r);
  const y = (f: number) => m.t + (1 - f) * (H - m.t - m.b);
  const theory = Array.from({ length: 61 }, (_, k) => {
    const v = (k / 60) * T_MAX;
    return `${k === 0 ? 'M' : 'L'}${x(v).toFixed(1)},${y(2 ** -v).toFixed(1)}`;
  }).join('');
  const steps = sorted
    .filter((v) => v <= T_MAX)
    .map((v, k) => `H${x(v).toFixed(1)}V${y((TOTAL - k - 1) / TOTAL).toFixed(1)}`)
    .join('');
  const sim = `M${x(0)},${y(1)}${steps}H${x(T_MAX)}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <label className="space-y-1 text-sm">
          <span className="block text-xs text-muted">{t('sim.choose')}</span>
          <select
            value={iso.n}
            onChange={(e) => {
              setN(Number(e.target.value));
              setTime(0);
              setPlaying(false);
            }}
            className="rounded-xl border border-border bg-surface px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {options.map((o) => (
              <option key={o.n} value={o.n}>
                {`${el.z + o.n}${el.symbol} · ${formatHalfLife(o.halfLife!, locale, unitName)}`}
              </option>
            ))}
          </select>
        </label>
        <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div>
            <dt className="text-xs text-muted">{t('sim.halfLife')}</dt>
            <dd className="tabular font-medium">{formatHalfLife(hl, locale, unitName)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t('sim.mode')}</dt>
            <dd className="font-mono">
              {modeSymbol(primary.mode)}
              {daughterEl && (
                <>
                  {' → '}
                  <Nuclide a={daughterA} symbol={daughterEl.symbol} />
                </>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <svg
          viewBox={`0 0 ${COLS * 12} ${COLS * 12}`}
          className="mx-auto w-full max-w-[17rem]"
          role="img"
          aria-label={t('sim.gridLabel', { left, total: TOTAL })}
        >
          {times.map((tt, k) => (
            <rect
              key={k}
              x={(k % COLS) * 12 + 1}
              y={Math.floor(k / COLS) * 12 + 1}
              width={10}
              height={10}
              rx={2.5}
              fill={tt <= time ? 'var(--series-1)' : 'var(--series-2)'}
              opacity={tt <= time ? 0.55 : 1}
            />
          ))}
        </svg>

        <div className="space-y-3">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            role="img"
            aria-label={t('sim.chartLabel')}
          >
            {[1, 0.5, 0.25, 0.125].map((f) => (
              <g key={f}>
                <line
                  x1={m.l}
                  x2={W - m.r}
                  y1={y(f)}
                  y2={y(f)}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                />
                <text x={m.l - 5} y={y(f) + 3.5} textAnchor="end" className="fill-muted text-[9px]">
                  {formatNumber(f * 100, locale, 1)}%
                </text>
              </g>
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((k) => (
              <text
                key={k}
                x={x(k)}
                y={H - 12}
                textAnchor="middle"
                className="fill-muted text-[9px]"
              >
                {k}
              </text>
            ))}
            <text x={W - m.r} y={H - 1} textAnchor="end" className="fill-muted text-[9px]">
              {t('sim.axisX')}
            </text>
            <path
              d={theory}
              fill="none"
              stroke="var(--fg)"
              strokeWidth={1.4}
              strokeDasharray="4 3"
            />
            <path d={sim} fill="none" stroke="var(--series-2)" strokeWidth={1.8} />
            <line
              x1={x(time)}
              x2={x(time)}
              y1={m.t}
              y2={H - m.b}
              stroke="var(--fg)"
              strokeOpacity={0.35}
            />
            <circle
              cx={x(time)}
              cy={y(left / TOTAL)}
              r={4}
              fill="var(--series-2)"
              stroke="var(--surface)"
              strokeWidth={2}
            />
          </svg>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <li className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-[var(--series-2)]" aria-hidden />
              <Nuclide a={a} symbol={el.symbol} /> {t('sim.legendLeft')}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-[var(--series-1)] opacity-55" aria-hidden />
              {daughterEl ? (
                <>
                  <Nuclide a={daughterA} symbol={daughterEl.symbol} />
                </>
              ) : (
                t('sim.legendDecayed')
              )}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-4 border-t-2 border-dashed border-fg" aria-hidden />
              {t('sim.legendTheory')}
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (time >= T_MAX) setTime(0);
              setPlaying((p) => !p);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm font-medium outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
          >
            {playing ? (
              <Pause className="size-4" aria-hidden />
            ) : (
              <Play className="size-4" aria-hidden />
            )}
            {playing ? t('sim.pause') : t('sim.play')}
          </button>
          <button
            type="button"
            onClick={() => {
              setRun((r) => r + 1);
              setTime(0);
              setPlaying(false);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="size-4" aria-hidden />
            {t('sim.again')}
          </button>
          <p className="tabular text-sm" aria-live="off">
            <span className="font-medium">{t('sim.after', { time: real })}</span>
            {' · '}
            {t('sim.remaining', { left, total: TOTAL, pct: pctText })}
          </p>
        </div>
        <label htmlFor={sliderId} className="sr-only">
          {t('sim.slider')}
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={T_MAX}
          step={0.01}
          value={time}
          onChange={(e) => {
            setPlaying(false);
            setTime(Number(e.target.value));
          }}
          aria-valuetext={t('sim.valueText', {
            halfLives: formatNumber(time, locale, 2),
            time: real,
            pct: pctText,
          })}
          className="w-full accent-[var(--series-2)]"
        />
        <p className="text-xs text-muted">{t('sim.hint')}</p>
      </div>

      {note && <p className="rounded-2xl bg-surface-2 p-4 text-sm leading-relaxed">{note}</p>}
    </div>
  );
}

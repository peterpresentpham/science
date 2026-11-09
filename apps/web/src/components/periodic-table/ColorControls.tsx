'use client';

import type { Category } from '@chem/data';
import { RotateCcw } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import {
  BLOCK_COLOR,
  type ColorMode,
  DISCOVERY_RANGE,
  isPropertyMode,
  knownBy,
  PHASE_COLOR,
  PROPERTIES,
  PROPERTY_KEYS,
  type PropertyKey,
  propertyScale,
  ROOM_TEMP_K,
  TEMP_RANGE_K,
} from '@/lib/color-mode';
import { ELEMENTS } from '@/lib/elements';
import { cn, formatNumber } from '@/lib/format';

import { CategoryLegend } from './CategoryLegend';

interface Props {
  mode: ColorMode;
  onMode: (m: ColorMode) => void;
  tempK: number;
  onTemp: (k: number) => void;
  year: number;
  onYear: (y: number) => void;
  activeCategory: Category | null;
  onCategory: (c: Category | null) => void;
}

const GROUP_MODES = ['category', 'block', 'phase', 'discovery'] as const;

/** "Tô màu theo": chọn chế độ + chú thích (và slider) của chế độ đang chọn. */
export function ColorControls(p: Props) {
  const t = useTranslations('colorMode');
  const property = isPropertyMode(p.mode);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="mr-1 font-medium text-muted">{t('label')}</span>
        {GROUP_MODES.map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={p.mode === m}
            onClick={() => p.onMode(m)}
            className={chip(p.mode === m)}
          >
            {t(`mode.${m}`)}
          </button>
        ))}
        <label className="relative">
          <span className="sr-only">{t('mode.property')}</span>
          <select
            value={property ? p.mode : ''}
            onChange={(e) => e.target.value && p.onMode(e.target.value as PropertyKey)}
            className={cn(chip(property), 'appearance-none pr-6')}
          >
            <option value="" disabled>
              {t('mode.property')} ▾
            </option>
            {PROPERTY_KEYS.map((k) => (
              <option key={k} value={k}>
                {t(`property.${k}`)}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
            aria-hidden
          >
            ▾
          </span>
        </label>
      </div>
      <Legend {...p} />
    </div>
  );
}

const chip = (on: boolean) =>
  cn(
    'rounded-full border px-2.5 py-1 font-medium whitespace-nowrap shadow-card outline-none focus-visible:ring-2 focus-visible:ring-ring',
    on ? 'border-fg bg-fg text-bg' : 'border-border bg-surface/80 hover:border-fg/40'
  );

function Swatch({ color, missing }: { color?: string; missing?: boolean }) {
  return (
    <span
      className={cn(
        'size-3 shrink-0 rounded-[3px] border border-border',
        missing && 'swatch-missing'
      )}
      style={color ? { background: color } : undefined}
      aria-hidden
    />
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return <li className="flex items-center gap-1.5 whitespace-nowrap">{children}</li>;
}

function Legend(p: Props) {
  const t = useTranslations('colorMode');
  const locale = useLocale();
  const n = (v: number, d = 0) => formatNumber(v, locale, d);

  if (p.mode === 'category') {
    return <CategoryLegend active={p.activeCategory} onActive={p.onCategory} />;
  }
  if (p.mode === 'block') {
    return (
      <div className="space-y-1.5 text-xs">
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
          {(['s', 'p', 'd', 'f'] as const).map((b) => (
            <Item key={b}>
              <Swatch color={BLOCK_COLOR[b]} />
              {t('block', { block: b })}
            </Item>
          ))}
        </ul>
        <p className="text-muted">{t('blockHint')}</p>
      </div>
    );
  }
  if (p.mode === 'phase') {
    const c = p.tempK - 273.15;
    return (
      <div className="space-y-2 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex min-w-0 flex-1 items-center gap-3">
            <span className="shrink-0 font-medium">{t('temperature')}</span>
            <input
              type="range"
              min={TEMP_RANGE_K.min}
              max={TEMP_RANGE_K.max}
              step={1}
              value={p.tempK}
              onChange={(e) => p.onTemp(Number(e.target.value))}
              className="w-full max-w-md accent-[var(--fg)]"
              aria-valuetext={`${n(p.tempK)} K, ${n(c)} °C`}
            />
          </label>
          <span className="tabular font-mono">
            {n(p.tempK)} K · {n(c)} °C
          </span>
          {p.tempK !== ROOM_TEMP_K && (
            <button
              type="button"
              onClick={() => p.onTemp(ROOM_TEMP_K)}
              className="flex items-center gap-1 text-muted hover:text-fg"
            >
              <RotateCcw className="size-3" aria-hidden />
              {t('roomTemp')}
            </button>
          )}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
          {(['solid', 'liquid', 'gas'] as const).map((ph) => (
            <Item key={ph}>
              <Swatch color={PHASE_COLOR[ph]} />
              {t(`phase.${ph}`)}
            </Item>
          ))}
          <Item>
            <Swatch missing />
            {t('noData')}
          </Item>
        </ul>
      </div>
    );
  }
  if (p.mode === 'discovery') {
    const known = ELEMENTS.filter((e) => knownBy(e, p.year)).length;
    return (
      <div className="space-y-2 text-xs">
        <label className="flex flex-wrap items-center gap-3">
          <span className="shrink-0 font-medium">{t('year')}</span>
          <input
            type="range"
            min={DISCOVERY_RANGE.min - 1}
            max={DISCOVERY_RANGE.max}
            step={1}
            value={p.year}
            onChange={(e) => p.onYear(Number(e.target.value))}
            className="w-full max-w-md flex-1 accent-[var(--fg)]"
          />
          <span className="tabular font-mono">{p.year}</span>
        </label>
        <p>
          {t('known', { year: p.year, count: known })}{' '}
          <span className="inline-flex items-center gap-1.5 align-middle text-muted">
            <Swatch missing />
            {t('notYet')}
          </span>
        </p>
      </div>
    );
  }

  // Thuộc tính số: thang một sắc + ô sọc cho "không có dữ liệu"
  const key = p.mode;
  const def = PROPERTIES[key];
  const scale = propertyScale(key);
  const lo = def.display(scale.min);
  const hi = def.display(scale.max);
  const unit = def.unit ? ` ${def.unit}` : '';
  const fmt = (v: number) => (def.log ? formatNumber(v, locale, 5) : n(v, def.digits));
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
      <span className="font-medium">{t(`property.${key}`)}</span>
      <span className="flex items-center gap-2">
        <span className="tabular font-mono text-muted">
          {fmt(lo)}
          {unit}
        </span>
        <span
          className="h-2.5 w-40 rounded-full border border-border"
          style={{
            background:
              'linear-gradient(to right, var(--surface), color-mix(in oklch, var(--seq) 80%, var(--surface)))',
          }}
          aria-hidden
        />
        <span className="tabular font-mono text-muted">
          {fmt(hi)}
          {unit}
        </span>
      </span>
      {def.log && <span className="text-muted">{t('logScale')}</span>}
      <span className="flex items-center gap-1.5 text-muted">
        <Swatch missing />
        {t('noData')}
      </span>
    </div>
  );
}

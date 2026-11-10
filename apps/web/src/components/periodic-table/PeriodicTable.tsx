'use client';

import type { Category, ElementLite } from '@chem/data';
import type { LensId, PhoneRisk } from '@chem/data/lenses';
import { Pause, Play } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ElementPanel, useElementPanel } from '@/components/element/ElementPanel';
import {
  type ColorMode,
  DISCOVERY_RANGE,
  isPropertyMode,
  knownBy,
  paintCell,
  parseColorMode,
  PROPERTIES,
  PROPERTY_KEYS,
  type PropertyKey,
  propertyScale,
  ROOM_TEMP_K,
  TEMP_RANGE_K,
} from '@/lib/color-mode';
import { toggleCompare, useCompareList } from '@/lib/compare';
import { BASE_PATH, BY_Z } from '@/lib/elements';
import { cn, formatNumber } from '@/lib/format';
import { KEY_TO_DIRECTION, nextCell } from '@/lib/grid-nav';
import { flushUrlParams, setUrlParams, useUrlParam } from '@/lib/url-state';
import { useLens } from '@/lib/use-lens';
import { useMediaQuery } from '@/lib/use-media-query';

import { ColorControls } from './ColorControls';
import { CompareTray } from './CompareTray';
import { DidYouKnow } from './DidYouKnow';
import { ElementCell } from './ElementCell';
import { ElementList } from './ElementList';
import { ElementPreview } from './ElementPreview';
import { SeriesConnector, SeriesPlaceholder } from './SeriesPlaceholder';
import { type View, ViewSwitch } from './ViewSwitch';

// three.js chỉ tải khi bật chế độ 3D
/** Thời gian chạy hết trục năm khi bấm "Phát" (mili giây) */
const PLAY_MS = 14_000;
const frameClock = () => performance.now();

const CityTable = dynamic(() => import('./CityTable'), { ssr: false });

export function PeriodicTable({ elements }: { elements: ElementLite[] }) {
  const t = useTranslations('table');
  const locale = useLocale();
  const [hovered, setHovered] = useState<number | null>(null);
  const [focusedZ, setFocusedZ] = useState(1);
  // Chỉ hiện xem nhanh theo focus khi người dùng đang điều hướng bằng bàn phím trong bảng
  const [focusInside, setFocusInside] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const panel = useElementPanel();
  const openPanel = panel.open;
  const [lens, setLens] = useLens();
  const tc = useTranslations('colorMode');

  // Chế độ tô màu + slider + bố cục, đều lưu trên URL để chia sẻ link đúng trạng thái
  const [colorRaw] = useUrlParam('color');
  const [tempRaw, setTempRaw] = useUrlParam('t');
  const [yearRaw, setYearRaw] = useUrlParam('y');
  const [layoutRaw, setLayoutRaw] = useUrlParam('layout');
  const [cityRaw, setCityRaw] = useUrlParam('d');
  const mode = parseColorMode(colorRaw);
  const tempK = clampInt(tempRaw, TEMP_RANGE_K.min, TEMP_RANGE_K.max, ROOM_TEMP_K);
  const urlYear = clampInt(
    yearRaw,
    DISCOVERY_RANGE.min - 1,
    DISCOVERY_RANGE.max,
    DISCOVERY_RANGE.max
  );
  // Phát tự động thanh năm: giữ năm đang chạy ở state cục bộ, ghi vào URL một lần khi dừng
  const [playYear, setPlayYear] = useState<number | null>(null);
  const playRef = useRef<{ raf: number; year: number } | null>(null);
  const year = playYear ?? urlYear;
  const wide = layoutRaw === '32';
  const city = cityRaw === '3';
  const tcity = useTranslations('city');
  // Chiều cao toà nhà: mặc định theo thuộc tính đang tô màu (chế độ khác như loại, khối thì dùng độ âm điện),
  // hoặc người dùng chọn thuộc tính khác / số hiệu nguyên tử / bằng nhau (?h=)
  const [hRaw, setHRaw] = useUrlParam('h');
  const heightMode: 'auto' | 'flat' | 'z' | PropertyKey =
    hRaw === 'flat' || hRaw === 'z'
      ? hRaw
      : hRaw && hRaw in PROPERTIES
        ? (hRaw as PropertyKey)
        : 'auto';
  const heightKey: PropertyKey | null =
    heightMode === 'auto'
      ? isPropertyMode(mode)
        ? mode
        : 'en'
      : heightMode in PROPERTIES
        ? (heightMode as PropertyKey)
        : null;
  const heightLabel =
    heightKey !== null
      ? tc(`property.${heightKey}`)
      : heightMode === 'z'
        ? tc('prop.atomicNumber')
        : tcity('flat');
  const heightFrac = useMemo(() => {
    if (heightKey === null) return heightMode === 'z' ? (e: ElementLite) => e.z / 118 : () => 0.35;
    const scale = propertyScale(heightKey);
    const def = PROPERTIES[heightKey];
    return (e: ElementLite) => {
      const v = def.get(e);
      return v == null ? null : scale.at(v);
    };
  }, [heightKey, heightMode]);
  const heightValueText = useCallback(
    (e: ElementLite) => {
      if (heightKey === null) return heightMode === 'z' ? String(e.z) : null;
      const def = PROPERTIES[heightKey];
      const v = def.get(e);
      return v == null ? '—' : `${formatNumber(def.display(v), locale, def.digits)} ${def.unit}`;
    },
    [heightKey, heightMode, locale]
  );
  // Đổi chế độ thì bỏ tham số slider của chế độ cũ cho URL gọn
  const setMode = useCallback(
    (m: ColorMode) => setUrlParams({ color: m === 'category' ? null : m, t: null, y: null }),
    []
  );
  const setTemp = useCallback(
    (k: number) => setTempRaw(k === ROOM_TEMP_K ? null : String(k)),
    [setTempRaw]
  );
  const setYear = useCallback(
    (y: number) => setYearRaw(y === DISCOVERY_RANGE.max ? null : String(y)),
    [setYearRaw]
  );
  const stopPlay = () => {
    const run = playRef.current;
    if (!run) return;
    cancelAnimationFrame(run.raf);
    playRef.current = null;
    setPlayYear(null);
    setYear(run.year);
  };
  const startPlay = () => {
    const from = DISCOVERY_RANGE.min - 1;
    const span = DISCOVERY_RANGE.max - from;
    const t0 = frameClock();
    const run = { raf: 0, year: from };
    playRef.current = run;
    const tick = (now: number) => {
      const f = Math.min(1, (now - t0) / PLAY_MS);
      run.year = Math.round(from + span * f);
      setPlayYear(run.year);
      if (f < 1) run.raf = requestAnimationFrame(tick);
      else stopPlay();
    };
    run.raf = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(playRef.current?.raf ?? 0), []);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  // Chế độ "Năm phát hiện": nguyên tố chưa được biết ở năm đang chọn thì phẳng xuống, kéo thanh năm để xem bảng "mọc" dần
  const flatZ = useMemo(
    () =>
      mode === 'discovery'
        ? new Set(elements.filter((e) => !knownBy(e, year)).map((e) => e.z))
        : null,
    [mode, year, elements]
  );
  const compared = useCompareList();

  const paints = useMemo(() => {
    if (mode === 'category') return null;
    const opts = {
      tempK,
      year,
      format: (v: number, d: number) => formatNumber(v, locale, d),
      blockLabel: (b: string) => tc('blockShort', { block: b }),
    };
    return new Map(elements.map((e) => [e.z, paintCell(e, mode, opts)]));
  }, [mode, tempK, year, elements, locale, tc]);

  // null = tự chọn theo màn hình bằng CSS (không nháy khi tải trang): < md là danh sách, còn lại là bảng
  const [view, setView] = useState<View | null>(null);
  const isSmall = useMediaQuery('(max-width: 767px)');
  const currentView: View = view ?? (isSmall ? 'list' : 'table');
  const tableClass = view === null ? 'hidden md:block' : view === 'table' ? 'block' : 'hidden';
  const listClass = view === null ? 'md:hidden' : view === 'list' ? 'block' : 'hidden';
  const viewSwitch = <ViewSwitch current={currentView} onChange={setView} />;

  const hrefFor = useCallback(
    (slug: string) => `${BASE_PATH}/${locale}/element/${slug}/`,
    [locale]
  );

  const onActivate = useCallback(
    (el: ElementLite, e: React.MouseEvent<HTMLAnchorElement>) => {
      // Shift + click: thêm/bỏ khỏi khay so sánh
      if (e.shiftKey && e.button === 0 && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        toggleCompare(el.z);
        return;
      }
      // Giữ hành vi mặc định khi mở tab mới (Ctrl/⌘/chuột giữa)
      if (e.metaKey || e.ctrlKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      flushUrlParams();
      openPanel(el.slug);
    },
    [openPanel]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const dir = KEY_TO_DIRECTION[e.key];
    if (!dir) return;
    e.preventDefault();
    const z = nextCell(elements, focusedZ, dir);
    setFocusedZ(z);
    e.currentTarget.querySelector<HTMLAnchorElement>(`[data-z="${z}"]`)?.focus();
  };

  const onFocusCell = useCallback((z: number) => {
    setFocusedZ(z);
    setFocusInside(true);
  }, []);

  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusInside(false);
  };

  const previewEl = useMemo(
    () => BY_Z.get(hovered ?? (focusInside ? focusedZ : -1)) ?? null,
    [hovered, focusInside, focusedZ]
  );

  return (
    <section aria-label={t('label')}>
      <div className={cn('space-y-5', tableClass)}>
        {city && (
          <div className="space-y-2">
            <CityTable
              elements={elements}
              heightFrac={heightFrac}
              valueText={heightValueText}
              propertyLabel={heightLabel}
              paints={paints}
              flatZ={flatZ}
              locale={locale}
              label={tcity('label', { property: heightLabel })}
              onSelect={(slug) => {
                flushUrlParams();
                openPanel(slug);
              }}
            />
            <label className="flex items-center gap-2 text-xs text-muted">
              {tcity('heightSelect')}
              <select
                value={heightMode}
                onChange={(e) => setHRaw(e.target.value === 'auto' ? null : e.target.value)}
                className="rounded-lg border border-border bg-surface px-2 py-1 text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="auto">{tcity('heightAuto')}</option>
                {PROPERTY_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {tc(`property.${k}`)}
                  </option>
                ))}
                <option value="z">{tc('prop.atomicNumber')}</option>
                <option value="flat">{tcity('flat')}</option>
              </select>
            </label>
            <p className="text-xs text-muted">
              {tcity('heightBy', { property: heightLabel })}
              {heightKey !== null && PROPERTIES[heightKey].log ? ` ${tc('logScale')}` : ''} ·{' '}
              {tcity('hint')}
              {mode === 'discovery' && ` · ${tcity('timelineHint')}`}
            </p>
          </div>
        )}
        <div className={cn('overflow-x-auto pb-2', city && 'hidden')}>
          <div
            role="group"
            aria-label={t('label')}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            className={cn('grid gap-1', wide ? 'min-w-[88rem]' : 'min-w-[58rem]')}
            style={{
              gridTemplateColumns: `repeat(${wide ? 32 : 18}, minmax(0, 1fr))`,
              gridTemplateRows: wide ? 'repeat(7, auto)' : 'repeat(7, auto) 0.9rem repeat(2, auto)',
            }}
          >
            <ElementPreview
              el={previewEl}
              lens={lens}
              onLens={setLens}
              wide={wide}
              didYouKnow={
                <DidYouKnow
                  elements={elements}
                  hrefFor={hrefFor}
                  onActivate={onActivate}
                  className="max-w-2xl"
                  fallback={<p className="max-w-md text-sm text-muted">{t('hint')}</p>}
                />
              }
            />

            {/* Ô giữ chỗ cho họ Lanthan / Actini + đường nối xuống hai hàng dưới (chỉ bảng 18 cột) */}
            {!wide &&
              (['lanthanide', 'actinide'] as const).map((series) => (
                <SeriesPlaceholder
                  key={series}
                  series={series}
                  active={activeCategory === series}
                  onActive={setActiveCategory}
                />
              ))}
            {!wide && (
              <SeriesConnector
                active={
                  activeCategory === 'lanthanide' || activeCategory === 'actinide'
                    ? activeCategory
                    : null
                }
              />
            )}

            {elements.map((el) => (
              <ElementCell
                key={el.z}
                el={el}
                href={hrefFor(el.slug)}
                name={locale === 'vi' ? el.name.vi : el.name.en}
                dimmed={
                  activeCategory !== null
                    ? mode === 'category' && el.category !== activeCategory
                    : lens !== null && !el.lenses.includes(lens)
                }
                paint={paints?.get(el.z)}
                wide={wide}
                compared={compared.includes(el.z)}
                badge={lensBadge(el, lens, locale)}
                dot={lens === 'phone' && el.phoneRisk ? PHONE_RISK_COLOR[el.phoneRisk] : undefined}
                focused={el.z === focusedZ}
                onActivate={onActivate}
                onHover={setHovered}
                onFocusCell={onFocusCell}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <ColorControls
            mode={mode}
            onMode={setMode}
            tempK={tempK}
            onTemp={setTemp}
            year={year}
            onYear={(y) => {
              stopPlay();
              setYear(y);
            }}
            activeCategory={activeCategory}
            onCategory={setActiveCategory}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-pressed={wide}
              onClick={() => setLayoutRaw(wide ? null : '32')}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs shadow-card hover:border-fg/40 aria-pressed:border-fg"
              title={tc('wideHint')}
            >
              {tc('wide')}
            </button>
            {mode === 'discovery' && !reduceMotion && (
              <button
                type="button"
                aria-pressed={playYear !== null}
                onClick={() => (playYear === null ? startPlay() : stopPlay())}
                className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs shadow-card hover:border-fg/40 aria-pressed:border-fg"
                title={tcity('playHint')}
              >
                {playYear === null ? (
                  <Play className="size-3" aria-hidden />
                ) : (
                  <Pause className="size-3" aria-hidden />
                )}
                {playYear === null ? tcity('play') : tcity('pause')}
              </button>
            )}
            <button
              type="button"
              aria-pressed={city}
              onClick={() => setCityRaw(city ? null : '3')}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs shadow-card hover:border-fg/40 aria-pressed:border-fg"
              title={tcity('toggleHint')}
            >
              {tcity('toggle')}
            </button>
            {viewSwitch}
          </div>
        </div>
        <p className="text-xs text-muted">{tc('compareHint')}</p>
      </div>

      <div className={listClass}>
        <ElementList
          elements={elements}
          hrefFor={hrefFor}
          onActivate={onActivate}
          activeCategory={activeCategory}
          onCategory={setActiveCategory}
          lens={lens}
          onLens={setLens}
          toolbar={viewSwitch}
        />
      </div>

      <CompareTray />
      <ElementPanel state={panel} />
    </section>
  );
}

/** Màu chấm mức khan hiếm (theo bảng EuChemS: đỏ / cam / vàng). */
export const PHONE_RISK_COLOR: Record<PhoneRisk, string> = {
  serious: 'oklch(0.6 0.21 28)',
  rising: 'oklch(0.72 0.17 60)',
  limited: 'oklch(0.85 0.16 95)',
};

function lensBadge(el: ElementLite, lens: LensId | null, locale: string): string | undefined {
  if (lens !== 'body' || !el.body) return undefined;
  if ('percent' in el.body) return `${formatNumber(el.body.percent, locale, 1)}%`;
  // Vi lượng: số gam trong người 70 kg, viết gọn cho vừa ô nhỏ ("4,2g", "0,072g")
  const g = new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    maximumSignificantDigits: 2,
  }).format(el.body.grams);
  return `${g}g`;
}

function clampInt(raw: string | null, min: number, max: number, fallback: number): number {
  const n = raw === null ? Number.NaN : Number.parseInt(raw, 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

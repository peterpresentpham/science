'use client';

import type { Category, ElementLite } from '@chem/data';
import type { LensId, PhoneRisk } from '@chem/data/lenses';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { ElementPanel, useElementPanel } from '@/components/element/ElementPanel';
import {
  type ColorMode,
  DISCOVERY_RANGE,
  paintCell,
  parseColorMode,
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
  const mode = parseColorMode(colorRaw);
  const tempK = clampInt(tempRaw, TEMP_RANGE_K.min, TEMP_RANGE_K.max, ROOM_TEMP_K);
  const year = clampInt(yearRaw, DISCOVERY_RANGE.min - 1, DISCOVERY_RANGE.max, DISCOVERY_RANGE.max);
  const wide = layoutRaw === '32';
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
        <div className="overflow-x-auto pb-2">
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
            onYear={setYear}
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

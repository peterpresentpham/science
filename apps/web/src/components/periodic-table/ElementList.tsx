'use client';

import type { Category, ElementLite } from '@chem/data';
import { LENS_IDS, type LensId } from '@chem/data/lenses';
import { Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useDeferredValue, useMemo, useState } from 'react';

import { ElementPhoto } from '@/components/ui/ElementPhoto';
import { categoryColor, categoryInk, categoryTint } from '@/lib/elements';
import { formatNumber } from '@/lib/format';
import { searchElements } from '@/lib/search';
import { useHydrated } from '@/lib/use-hydrated';

import { CategoryLegend } from './CategoryLegend';
import { DidYouKnow } from './DidYouKnow';
import { LensBar } from './LensBar';

interface Props {
  elements: ElementLite[];
  hrefFor: (slug: string) => string;
  onActivate: (el: ElementLite, e: React.MouseEvent<HTMLAnchorElement>) => void;
  activeCategory: Category | null;
  onCategory: (c: Category | null) => void;
  lens: LensId | null;
  onLens: (lens: LensId | null) => void;
  toolbar: React.ReactNode;
}

/** Chế độ danh sách: hợp với màn hình nhỏ, có tìm kiếm (không dấu) và lọc theo loại. */
export function ElementList({
  elements,
  hrefFor,
  onActivate,
  activeCategory,
  onCategory,
  lens,
  onLens,
  toolbar,
}: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const hydrated = useHydrated();
  const lensNames = useMemo(
    () => Object.fromEntries(LENS_IDS.map((id) => [id, t(`lens.${id}.name`)])),
    [t]
  );

  const results = useMemo(
    () =>
      searchElements(elements, deferred, lensNames).filter(
        (e) =>
          (activeCategory === null || e.category === activeCategory) &&
          (lens === null || e.lenses.includes(lens))
      ),
    [elements, deferred, lensNames, activeCategory, lens]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-1.5 pt-2">
        <p className="font-mono text-[0.65rem] tracking-widest text-muted uppercase">
          {t('hero.eyebrow')}
        </p>
        <h1 className="font-display text-3xl leading-tight font-semibold tracking-tight">
          {t('hero.title')}
        </h1>
        <DidYouKnow
          elements={elements}
          hrefFor={hrefFor}
          onActivate={onActivate}
          className="pt-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="relative flex-1">
          <span className="sr-only">{t('search.label')}</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full rounded-full border border-border bg-surface py-2 pr-9 pl-9 text-sm shadow-card outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t('search.clear')}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-fg"
            >
              <X className="size-4" />
            </button>
          )}
        </label>
        {toolbar}
      </div>

      <LensBar active={lens} onChange={onLens} />

      <CategoryLegend
        active={activeCategory}
        onActive={onCategory}
        mode="toggle"
        className="-mx-4 [scrollbar-width:none] overflow-x-auto px-4 pb-1"
      />

      <p className="text-xs text-muted" aria-live="polite">
        {t('search.count', { count: results.length })}
      </p>

      {results.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">{t('search.empty')}</p>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((el) => {
            const color = categoryColor(el.category);
            return (
              <li key={el.z}>
                <a
                  href={hrefFor(el.slug)}
                  data-row-z={el.z}
                  onClick={(e) => onActivate(el, e)}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-2 pr-4 shadow-card transition outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    className="flex size-12 shrink-0 flex-col rounded-xl border px-1 pt-0.5"
                    style={{ background: categoryTint(el.category, 14), borderColor: color }}
                  >
                    <span className="tabular font-mono text-[0.55rem] text-muted">{el.z}</span>
                    <span
                      className="text-center font-display text-lg leading-tight font-semibold"
                      style={{ color: categoryInk(el.category) }}
                    >
                      {el.symbol}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">
                      {locale === 'vi' ? el.name.vi : el.name.en}
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {el.hook
                        ? locale === 'vi'
                          ? el.hook.vi
                          : el.hook.en
                        : `${locale === 'vi' ? el.name.en : el.name.vi} · ${t(`category.${el.category}`)}`}
                    </span>
                  </span>
                  {el.photo ? (
                    // Ảnh nhỏ chỉ để trang trí: chờ hydrate xong mới tải, để không giành băng thông
                    // với font và nội dung chính lúc mở trang (giữ sẵn ô cùng kích thước, không xô layout)
                    hydrated ? (
                      <ElementPhoto
                        el={el}
                        alt=""
                        sizes="3rem"
                        square="mini"
                        className="size-12 shrink-0 rounded-xl border border-border"
                      />
                    ) : (
                      <span className="size-12 shrink-0 rounded-xl border border-border bg-surface-2" />
                    )
                  ) : (
                    <span className="tabular font-mono text-xs text-muted">
                      {formatNumber(el.atomicMass, locale)}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

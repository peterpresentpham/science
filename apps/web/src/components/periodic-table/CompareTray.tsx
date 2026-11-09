'use client';

import { X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import {
  clearCompare,
  COMPARE_MAX,
  compareHref,
  removeCompare,
  useCompareList,
} from '@/lib/compare';
import { BASE_PATH, BY_Z, categoryColor } from '@/lib/elements';

/** Khay so sánh nổi ở đáy màn hình, chỉ hiện khi đã chọn ít nhất 1 nguyên tố. */
export function CompareTray() {
  const t = useTranslations('compare');
  const locale = useLocale();
  const list = useCompareList();
  if (list.length === 0) return null;
  return (
    <div
      role="region"
      aria-label={t('tray')}
      className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-xl flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface/95 p-2 pl-3 shadow-float backdrop-blur-md"
    >
      <span className="text-xs text-muted">
        {t('count', { count: list.length, max: COMPARE_MAX })}
      </span>
      <ul className="flex flex-1 flex-wrap gap-1.5">
        {list.map((z) => {
          const el = BY_Z.get(z);
          if (!el) return null;
          const name = locale === 'vi' ? el.name.vi : el.name.en;
          return (
            <li
              key={z}
              className="flex items-center gap-1.5 rounded-full border border-border bg-bg py-0.5 pr-0.5 pl-2 text-sm"
            >
              <span
                className="size-2 rounded-full"
                style={{ background: categoryColor(el.category) }}
              />
              <span className="font-semibold">{el.symbol}</span>
              <button
                type="button"
                onClick={() => removeCompare(z)}
                aria-label={t('remove', { name })}
                className="rounded-full p-0.5 text-muted hover:bg-surface-2 hover:text-fg"
              >
                <X className="size-3.5" />
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={clearCompare}
        className="px-2 text-xs text-muted hover:text-fg"
      >
        {t('clear')}
      </button>
      <a
        href={`${BASE_PATH}/${locale}${compareHref(list)}`}
        aria-disabled={list.length < 2}
        onClick={(e) => list.length < 2 && e.preventDefault()}
        className="rounded-full bg-fg px-4 py-1.5 text-sm font-medium text-bg aria-disabled:opacity-40"
      >
        {t('go')}
      </a>
    </div>
  );
}

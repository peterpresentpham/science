'use client';

import { zOf } from '@chem/core';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { BASE_PATH, BY_Z } from '@/lib/elements';
import { cn } from '@/lib/format';
import { ACTIVITY_SERIES, REACTS_WITH_WATER } from '@/lib/solubility';

/** Dãy hoạt động hoá học: bấm một kim loại để xem nó phản ứng được với gì. */
export function ActivitySeries() {
  const t = useTranslations('tools.activity');
  const locale = useLocale();
  const [sel, setSel] = useState<string>('Fe');
  const idx = ACTIVITY_SERIES.indexOf(sel as (typeof ACTIVITY_SERIES)[number]);
  const hIdx = ACTIVITY_SERIES.indexOf('H');
  const after = ACTIVITY_SERIES.slice(idx + 1).filter((m) => m !== 'H');
  const water = REACTS_WITH_WATER.has(sel);
  const acid = idx < hIdx;
  const name = (s: string) => {
    const e = BY_Z.get(zOf(s));
    return e ? (locale === 'vi' ? e.name.vi : e.name.en) : s;
  };

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto pb-1">
        <ol className="flex min-w-max items-end gap-1" aria-label={t('label')}>
          {ACTIVITY_SERIES.map((m) => (
            <li key={m}>
              {m === 'H' ? (
                <span className="flex h-14 w-10 flex-col items-center justify-center rounded-xl border border-dashed border-border font-semibold text-muted">
                  (H)
                </span>
              ) : (
                <button
                  type="button"
                  aria-pressed={sel === m}
                  onClick={() => setSel(m)}
                  className={cn(
                    'flex h-14 w-12 flex-col items-center justify-center rounded-xl border font-semibold',
                    sel === m
                      ? 'border-fg bg-fg text-bg'
                      : 'border-border bg-surface hover:border-fg/40'
                  )}
                >
                  {m}
                </button>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-1 flex justify-between text-xs text-muted">
          <span>← {t('stronger')}</span>
          <span>{t('weaker')} →</span>
        </p>
      </div>

      <div className="space-y-3 rounded-3xl border border-border bg-surface p-5 shadow-card">
        <h2 className="font-display text-xl font-semibold">
          <a
            href={`${BASE_PATH}/${locale}/element/${BY_Z.get(zOf(sel))?.slug}/`}
            className="hover:underline"
          >
            {sel} · {name(sel)}
          </a>
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="font-medium">{t('water')}: </span>
            {water ? t('waterYes') : t('waterNo')}
          </li>
          <li>
            <span className="font-medium">{t('acid')}: </span>
            {acid ? t('acidYes') : t('acidNo')}
          </li>
          <li>
            <span className="font-medium">{t('salt')}: </span>
            {water
              ? t('saltWater')
              : after.length
                ? t('saltYes', { metals: after.join(', ') })
                : t('saltNone')}
          </li>
        </ul>
      </div>
      <p className="text-xs text-muted">{t('note')}</p>
    </div>
  );
}

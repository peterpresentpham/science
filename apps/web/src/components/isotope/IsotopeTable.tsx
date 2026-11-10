'use client';

import { decayKind } from '@chem/core';
import type { ElementFull, Isotope } from '@chem/data';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { formatNumber } from '@/lib/format';
import { formatHalfLife, modeSymbol } from '@/lib/isotopes';

import { Nuclide } from './Nuclide';

/** Đồng vị nổi bật: bền, có trong tự nhiên, hoặc sống ít nhất một ngày. */
const notable = (i: Isotope) =>
  i.stable || i.abundance != null || (i.halfLife?.seconds ?? 0) >= 86400;

/** Bảng đồng vị: mặc định chỉ các đồng vị đáng chú ý, bấm để xem hết. */
export function IsotopeTable({ el }: { el: ElementFull }) {
  const t = useTranslations('isotope');
  const locale = useLocale();
  const [all, setAll] = useState(false);

  const total = el.isotopes.length;
  let shown = el.isotopes.filter(notable);
  // Nguyên tố siêu nặng không có đồng vị nào sống tới một ngày: lấy vài đồng vị sống lâu nhất
  if (shown.length < 3)
    shown = [...el.isotopes]
      .sort((a, b) => (b.halfLife?.seconds ?? 0) - (a.halfLife?.seconds ?? 0))
      .slice(0, 6)
      .sort((a, b) => a.n - b.n);
  const rows = all ? el.isotopes : shown;
  const unitName = (k: string) => t(`unit.${k}`);

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <caption className="sr-only">
            {t('tableCaption', { name: locale === 'vi' ? el.name.vi : el.name.en })}
          </caption>
          <thead className="bg-surface-2 text-xs text-muted">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium">
                {t('col.isotope')}
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                {t('col.neutrons')}
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                {t('col.abundance')}
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                {t('col.halfLife')}
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                {t('col.decay')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((i) => (
              <tr key={i.n}>
                <th scope="row" className="px-3 py-2 font-display font-semibold">
                  <Nuclide a={el.z + i.n} symbol={el.symbol} />
                </th>
                <td className="tabular px-3 py-2 font-mono">{i.n}</td>
                <td className="tabular px-3 py-2">
                  {i.abundance != null ? `${formatNumber(i.abundance, locale, 4)} %` : '—'}
                </td>
                <td className="px-3 py-2">
                  {i.stable ? (
                    <span className="font-medium">{t('stable')}</span>
                  ) : i.halfLife ? (
                    <span className="tabular">{formatHalfLife(i.halfLife, locale, unitName)}</span>
                  ) : (
                    <span className="text-muted">{t('unknownHalfLife')}</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {i.decays.length > 0 ? (
                    <ul className="flex flex-wrap gap-x-3 gap-y-0.5">
                      {i.decays.map((d) => (
                        <li key={d.mode} title={t(`kind.${decayKind(d.mode)}`)}>
                          <span className="font-mono">{modeSymbol(d.mode)}</span>
                          {d.pct != null && d.pct < 100 && (
                            <span className="tabular ml-1 text-xs text-muted">
                              {formatNumber(d.pct, locale, 3)} %
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        <span>{t('count', { shown: rows.length, total })}</span>
        {total > shown.length && (
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            className="text-accent underline-offset-2 hover:underline"
          >
            {all ? t('showNotable') : t('showAll', { total })}
          </button>
        )}
      </div>
    </div>
  );
}

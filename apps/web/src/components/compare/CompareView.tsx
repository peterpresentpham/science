'use client';

import { LENS_IDS } from '@chem/data/lenses';
import { Plus, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { PROPERTIES, PROPERTY_KEYS, propertyScale } from '@/lib/color-mode';
import { COMPARE_MAX, parseZList, useCompareList } from '@/lib/compare';
import { BASE_PATH, BY_Z, categoryColor, ELEMENTS } from '@/lib/elements';
import { formatNumber } from '@/lib/format';
import { searchElements } from '@/lib/search';
import { useUrlParam } from '@/lib/url-state';

import { RadarChart, type RadarSeries } from './RadarChart';

/** Màu theo vị trí trong danh sách so sánh: 3 màu phân loại đầu, thứ tự cố định. */
const SERIES_COLOR = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)'] as const;

/** Trang /compare?z=11,19,37: chọn nguyên tố, radar + bảng số liệu. Danh sách nằm trên URL. */
export function CompareView() {
  const t = useTranslations();
  const locale = useLocale();
  const [raw, setRaw] = useUrlParam('z');
  const tray = useCompareList();
  const zs = parseZList(raw);

  // Mở trang không có ?z= : lấy từ khay so sánh (nếu có)
  useEffect(() => {
    if (raw === null && tray.length > 0 && !new URLSearchParams(window.location.search).has('z')) {
      setRaw(tray.join(','));
    }
  }, [raw, tray, setRaw]);

  const setZs = (next: number[]) => setRaw(next.length ? next.join(',') : null);
  const name = (z: number) => {
    const el = BY_Z.get(z)!;
    return locale === 'vi' ? el.name.vi : el.name.en;
  };

  const rows = PROPERTY_KEYS.map((key) => {
    const def = PROPERTIES[key];
    const unit = def.unit ? ` ${def.unit}` : '';
    return {
      key,
      label: t(`colorMode.property.${key}`),
      cells: zs.map((z) => {
        const v = def.get(BY_Z.get(z)!);
        return v == null
          ? { norm: null, text: '—' }
          : {
              norm: propertyScale(key).at(v),
              text: `${formatNumber(def.display(v), locale, def.log ? 5 : Math.max(def.digits, 1))}${unit}`,
            };
      }),
    };
  });

  const series: RadarSeries[] = zs.map((z, si) => ({
    id: String(z),
    label: BY_Z.get(z)!.symbol,
    color: SERIES_COLOR[si]!,
    values: rows.map((r) => r.cells[si]!.norm),
    display: rows.map((r) => r.cells[si]!.text),
  }));

  return (
    <div className="space-y-6">
      <ul className="flex flex-wrap items-center gap-2" aria-label={t('compare.selected')}>
        {zs.map((z, si) => (
          <li
            key={z}
            className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-1 pl-3 shadow-card"
          >
            <span className="size-2.5 rounded-full" style={{ background: SERIES_COLOR[si] }} />
            <a
              href={`${BASE_PATH}/${locale}/element/${BY_Z.get(z)!.slug}/`}
              className="font-medium hover:underline"
            >
              {BY_Z.get(z)!.symbol} · {name(z)}
            </a>
            <button
              type="button"
              onClick={() => setZs(zs.filter((x) => x !== z))}
              aria-label={t('compare.remove', { name: name(z) })}
              className="rounded-full p-1 text-muted hover:bg-surface-2 hover:text-fg"
            >
              <X className="size-3.5" />
            </button>
          </li>
        ))}
        {zs.length < COMPARE_MAX && <Picker exclude={zs} onPick={(z) => setZs([...zs, z])} />}
      </ul>

      {zs.length === 0 ? (
        <p className="py-10 text-center text-muted">{t('compare.empty')}</p>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,30rem)_1fr]">
          <div className="rounded-3xl border border-border bg-surface p-4 shadow-card">
            <RadarChart
              axes={rows.map((r) => r.label)}
              series={series}
              noData={t('colorMode.noData')}
              title={t('compare.chartTitle', { names: zs.map(name).join(', ') })}
            />
            <p className="mt-2 text-xs text-muted">{t('compare.scaleNote')}</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border bg-surface shadow-card">
            <table className="w-full text-sm">
              <caption className="sr-only">{t('compare.tableCaption')}</caption>
              <thead>
                <tr className="border-b border-border text-left">
                  <th scope="col" className="px-4 py-3 font-medium text-muted">
                    {t('compare.property')}
                  </th>
                  {zs.map((z, si) => (
                    <th key={z} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="size-2.5 rounded-full"
                          style={{ background: SERIES_COLOR[si] }}
                        />
                        {BY_Z.get(z)!.symbol}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key} className="border-b border-border last:border-0">
                    <th scope="row" className="px-4 py-2.5 text-left font-normal text-muted">
                      {r.label}
                    </th>
                    {r.cells.map((c, i) => (
                      <td key={zs[i]} className="tabular px-4 py-2.5 font-mono whitespace-nowrap">
                        {c.text}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/** Ô thêm nguyên tố: gõ tên/ký hiệu (không dấu), chọn từ gợi ý. */
function Picker({ exclude, onPick }: { exclude: number[]; onPick: (z: number) => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const lensNames = useMemo(
    () => Object.fromEntries(LENS_IDS.map((id) => [id, t(`lens.${id}.name`)])),
    [t]
  );
  const results = useMemo(
    () =>
      (q ? searchElements(ELEMENTS, q, lensNames) : ELEMENTS)
        .filter((e) => !exclude.includes(e.z))
        .slice(0, 8),
    [q, exclude, lensNames]
  );
  const pick = (z: number) => {
    onPick(z);
    setQ('');
    setOpen(false);
  };
  return (
    <li className="relative">
      <label className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1 text-sm focus-within:ring-2 focus-within:ring-ring">
        <Plus className="size-3.5 text-muted" aria-hidden />
        <span className="sr-only">{t('compare.addLabel')}</span>
        <input
          type="search"
          value={q}
          placeholder={t('compare.addPlaceholder')}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results[0]) pick(results[0].z);
            if (e.key === 'Escape') setOpen(false);
          }}
          className="w-44 bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden"
        />
      </label>
      {open && results.length > 0 && (
        <ul className="absolute top-full left-0 z-20 mt-1 w-64 overflow-hidden rounded-2xl border border-border bg-surface py-1 shadow-float">
          {results.map((e) => (
            <li key={e.z}>
              <button
                type="button"
                onMouseDown={(ev) => ev.preventDefault()}
                onClick={() => pick(e.z)}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-surface-2"
              >
                <span
                  className="size-2 rounded-full"
                  style={{ background: categoryColor(e.category) }}
                />
                <span className="w-7 font-semibold">{e.symbol}</span>
                <span className="truncate">{locale === 'vi' ? e.name.vi : e.name.en}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

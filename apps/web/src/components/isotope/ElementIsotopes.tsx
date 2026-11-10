import type { ElementFull } from '@chem/data';
import { useLocale, useTranslations } from 'next-intl';

import { canSimulate } from '@/lib/isotopes';

import { IsotopeTable } from './IsotopeTable';
import { LazyDecaySim } from './LazyDecaySim';
import { NuclideMap } from './NuclideMap';

/** Thẻ "Đồng vị": bảng đồng vị, mô phỏng phân rã, vị trí trên bản đồ hạt nhân. */
export function ElementIsotopes({ el }: { el: ElementFull }) {
  const t = useTranslations('isotope');
  const locale = useLocale();
  const name = locale === 'vi' ? el.name.vi : el.name.en;
  if (el.isotopes.length === 0) return <p className="text-sm text-muted">{t('none')}</p>;
  const stableCount = el.isotopes.filter((i) => i.stable).length;
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm leading-relaxed">
          {stableCount > 0
            ? t('summary', { name, total: el.isotopes.length, stable: stableCount })
            : t('summaryNoStable', { name, total: el.isotopes.length })}
        </p>
        <IsotopeTable el={el} />
      </div>
      {el.isotopes.some(canSimulate) && (
        <div className="space-y-3">
          <h3 className="font-display text-lg font-semibold">{t('sim.title')}</h3>
          <LazyDecaySim el={el} />
        </div>
      )}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-semibold">{t('map.title')}</h3>
        <NuclideMap z={el.z} symbol={el.symbol} />
      </div>
      <p className="text-xs text-muted">{t('source')}</p>
    </div>
  );
}

import type { ElementFull } from '@chem/data';
import { useLocale, useTranslations } from 'next-intl';

import { FlameTest } from './FlameTest';
import { SpectrumBar } from './SpectrumBar';

/** Thẻ "Ánh sáng": phổ vạch phát xạ (NIST) + màu ngọn lửa nếu có. */
export function ElementLight({ el }: { el: ElementFull }) {
  const t = useTranslations('structure');
  const locale = useLocale();
  const name = locale === 'vi' ? el.name.vi : el.name.en;
  const lang = locale === 'vi' ? 'vi' : 'en';
  return (
    <div className="space-y-6">
      {el.flame && (
        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold">{t('flame.title')}</h3>
          <FlameTest
            hex={el.flame.hex}
            name={el.flame.name[lang]}
            symbol={el.symbol}
            note={el.flame.note?.[lang]}
          />
        </div>
      )}
      {el.spectrum && el.spectrum.length > 0 ? (
        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold">{t('spectrum.title')}</h3>
          <p className="text-sm text-muted">{t('spectrum.intro', { name })}</p>
          <SpectrumBar
            lines={el.spectrum}
            label={t('spectrum.label', { name, count: el.spectrum.length })}
            highlight={el.flame?.lines}
          />
          {el.flame?.lines && <p className="text-xs text-muted">{t('spectrum.flameLines')}</p>}
          <p className="text-xs text-muted">{t('spectrum.source')}</p>
        </div>
      ) : (
        <p className="text-sm text-muted">{t('spectrum.none')}</p>
      )}
    </div>
  );
}

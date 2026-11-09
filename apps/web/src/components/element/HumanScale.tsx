import { type HumanFact, humanScale } from '@chem/core';
import type { ElementLite } from '@chem/data';
import {
  Atom,
  Hand,
  type LucideIcon,
  Radiation,
  Ruler,
  Scale,
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { categoryInk, categoryTint } from '@/lib/elements';
import { formatBig, formatNumber } from '@/lib/format';

/**
 * "Nói cho dễ hình dung": số liệu khô đổi thành phép so sánh với thứ quen thuộc.
 * Tính hoàn toàn từ dữ liệu có sẵn (logic ở @chem/core/human-scale), nên nguyên tố nào cũng có.
 */
export function HumanScale({ el }: { el: ElementLite }) {
  const t = useTranslations('humanScale');
  const locale = useLocale();
  const facts = humanScale({ ...el, phase: el.phaseAtSTP });
  const name = locale === 'vi' ? el.name.vi : el.name.en;
  const n = (v: number, d = 1) => formatNumber(v, locale, d);
  // Dấu trừ thật (−) cho khớp với các mốc; từ 100 °C trở lên làm tròn số nguyên (1538 °C, không 1537,9)
  const c = (celsius: number) =>
    `${n(celsius, Math.abs(celsius) >= 100 ? 0 : 1).replace('-', '−')} °C`;

  const render = (f: HumanFact): { icon: LucideIcon; head: string; sub: string } => {
    switch (f.kind) {
      case 'radioactive':
        return {
          icon: Radiation,
          head: t('radioactive.head', { name }),
          sub: t('radioactive.sub'),
        };
      case 'meltsInHand':
        return {
          icon: Hand,
          head: t('meltsInHand.head'),
          sub: t('meltsInHand.sub', { c: c(f.celsius) }),
        };
      case 'density': {
        const gas = f.relation.endsWith('Air');
        return {
          icon: Scale,
          head: t(`density.${f.relation}`, { ratio: n(f.ratio) }),
          sub: gas
            ? t('density.perLitreGas', { g: n(f.gcm3 * 1000, 2) })
            : t('density.perLitre', { kg: n(f.gcm3, 2) }),
        };
      }
      case 'melting':
      case 'boiling':
        return {
          icon:
            f.relation === 'near'
              ? Thermometer
              : f.relation === 'above'
                ? ThermometerSun
                : ThermometerSnowflake,
          head: t(`${f.kind}.${f.relation}`, { landmark: t(`landmark.${f.landmark}`) }),
          sub: t(`${f.kind}.exact`, { c: c(f.celsius) }),
        };
      case 'atomsPerMm':
        return {
          icon: Ruler,
          head: t('atomsPerMm.head', { count: formatBig(f.count, locale) }),
          sub: t('atomsPerMm.sub', { r: n(f.radiusPm, 0) }),
        };
      case 'atomsPerGram':
        return {
          icon: Atom,
          head: t(f.hypothetical ? 'atomsPerGram.headHypothetical' : 'atomsPerGram.head', {
            count: formatBig(f.count, locale),
          }),
          sub: f.hypothetical
            ? t('atomsPerGram.subHypothetical')
            : t('atomsPerGram.sub', { m: n(f.atomicMass, 3) }),
        };
    }
  };

  return (
    <section aria-labelledby="human-scale" className="space-y-3">
      <h2 id="human-scale" className="px-1 font-display text-xl font-semibold tracking-tight">
        {t('title')}
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {facts.map((f) => {
          const { icon: Icon, head, sub } = render(f);
          return (
            <li
              key={f.kind}
              className="flex gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card"
            >
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: categoryTint(el.category, 18),
                  color: categoryInk(el.category),
                }}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block leading-snug font-medium">{head}</span>
                <span className="mt-0.5 block text-sm text-muted">{sub}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import { electronConfiguration, isException, unpairedElectrons } from '@chem/core';
import type { ElementFull, ElementLite } from '@chem/data';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useId } from 'react';

import { AtomStructure } from '@/components/atom/AtomStructure';
import { IonExplorer } from '@/components/atom/IonExplorer';
import { ElementIsotopes } from '@/components/isotope/ElementIsotopes';
import { ElementLight } from '@/components/structure/ElementLight';
import { ElementStructure } from '@/components/structure/ElementStructure';
import { ConfigText } from '@/components/ui/ConfigText';
import { Link } from '@/i18n/navigation';
import { BY_Z, categoryColor, categoryInk } from '@/lib/elements';
import { cn, formatNumber, formatOxidationStates } from '@/lib/format';

import { AcademicSection } from './AcademicSection';
import { ElementGallery } from './ElementGallery';
import { ElementHero } from './ElementHero';
import { HumanScale } from './HumanScale';
import { MiniTable } from './MiniTable';
import { FactsSection, SafetyNote, UsesSection } from './StorySections';

interface Props {
  element: ElementFull;
  /** Có thì prev/next đổi nguyên tố tại chỗ (panel); không có thì là link sang trang. */
  onSelect?: (slug: string) => void;
  compact?: boolean;
  /** false: bỏ phần hero + prev/next (panel tự hiển thị chúng từ dữ liệu lite) */
  withHeader?: boolean;
}

interface Stat {
  wide?: boolean;
  label: string;
  value: React.ReactNode;
  unit?: string;
  sub?: string;
}

export function ElementDetail({ element: el, onSelect, compact, withHeader = true }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const color = categoryColor(el.category);
  const cfg = electronConfiguration(el.z);
  const n = (v: number, d = 3) => formatNumber(v, locale, d);
  const kToC = (k: number) => `${n(k - 273.15, 1)} °C`;
  const num = (v: number | null, unit?: string, d = 3): Pick<Stat, 'value' | 'unit'> =>
    v == null ? { value: '—' } : { value: n(v, d), unit };

  const stats: Stat[] = [
    { label: t('prop.atomicMass'), ...num(el.atomicMass, 'u', 4) },
    { label: t('prop.electronegativity'), ...num(el.electronegativity) },
    { label: t('prop.atomicRadius'), ...num(el.atomicRadiusPm, 'pm') },
    { label: t('prop.ionizationEnergy'), ...num(el.ionizationEnergyEv, 'eV') },
    { label: t('prop.electronAffinity'), ...num(el.electronAffinityEv, 'eV') },
    {
      label: t('prop.oxidationStates'),
      value: el.oxidationStates.length ? formatOxidationStates(el.oxidationStates) : '—',
    },
    {
      label: t('prop.meltingPoint'),
      ...num(el.meltingPointK, 'K', 2),
      sub: el.meltingPointK != null ? kToC(el.meltingPointK) : undefined,
    },
    {
      label: t('prop.boilingPoint'),
      ...num(el.boilingPointK, 'K', 2),
      sub: el.boilingPointK != null ? kToC(el.boilingPointK) : undefined,
    },
    { label: t('prop.density'), ...num(el.densityGcm3, 'g/cm³', 5) },
    {
      wide: true,
      label: t('prop.discovery'),
      value: el.discoveryYear ?? t('prop.ancient'),
      sub: el.discoveredBy ?? undefined,
    },
  ];

  return (
    <article className="space-y-4">
      {withHeader && (
        <>
          <ElementHero el={el} compact={compact} credit={el.photoCredit} priority={!compact} />
          <PrevNext z={el.z} onSelect={onSelect} />
        </>
      )}

      <UsesSection el={el} />
      <FactsSection el={el} />
      <ElementGallery slug={el.slug} gallery={el.gallery} />
      <HumanScale el={el} />
      <SafetyNote el={el} />

      {/* Phần học thuật: giữ nguyên vẹn nội dung M1, chỉ thu gọn mặc định */}
      <AcademicSection>
        {/* Cấu tạo nguyên tử */}
        <Card index="01" title={t('element.atomicStructure')}>
          <AtomStructure
            key={el.z}
            z={el.z}
            symbol={el.symbol}
            name={locale === 'vi' ? el.name.vi : el.name.en}
            shells={el.shells}
            color={color}
          >
            <div className="space-y-4">
              <dl>
                <dt className="text-xs text-muted">{t('prop.electronConfiguration')}</dt>
                <dd className="mt-1 text-lg">
                  <ConfigText config={el.electronConfiguration} />
                </dd>
                {el.configurationPredicted && (
                  <dd className="mt-1 text-xs text-muted">{t('element.predicted')}</dd>
                )}
                {isException(el.z) && (
                  <dd
                    className="mt-1 text-xs font-medium"
                    style={{ color: categoryInk(el.category) }}
                  >
                    {t('element.exception')}
                  </dd>
                )}
              </dl>
              <dl className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <dt className="text-xs text-muted">{t('prop.unpaired')}</dt>
                  <dd className="tabular mt-1 font-mono text-lg whitespace-nowrap">
                    {unpairedElectrons(cfg)}
                  </dd>
                </div>
              </dl>
            </div>
          </AtomStructure>
        </Card>

        <Card index="02" title={t('atom.ion.title')}>
          <IonExplorer
            key={el.z}
            z={el.z}
            symbol={el.symbol}
            color={color}
            oxidationStates={el.oxidationStates}
          />
        </Card>

        <Card index="03" title={t('isotope.cardTitle')}>
          <ElementIsotopes el={el} />
        </Card>

        <Card index="04" title={t('structure.cardTitle')}>
          <ElementStructure key={el.z} el={el} />
        </Card>

        <Card index="05" title={t('structure.lightTitle')}>
          <ElementLight el={el} />
        </Card>

        {/* Tính chất */}
        <Card index="06" title={t('element.properties')}>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className={cn(
                  'rounded-xl border border-border bg-bg/60 p-3',
                  s.wide && 'sm:col-span-3'
                )}
              >
                <dt className="text-[0.7rem] leading-tight text-muted">{s.label}</dt>
                <dd className="tabular mt-1.5 font-display text-lg leading-tight font-medium">
                  {s.value}
                  {s.unit && <span className="ml-1 text-xs font-normal text-muted">{s.unit}</span>}
                </dd>
                {s.sub && <dd className="mt-0.5 truncate text-[0.7rem] text-muted">{s.sub}</dd>}
              </div>
            ))}
          </dl>
        </Card>

        {/* Vị trí */}
        <Card index="07" title={t('element.position')}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <MiniTable z={el.z} />
            <p className="text-sm leading-relaxed">
              {t('element.positionText', { period: el.period, block: el.block })}{' '}
              {el.group != null && t('element.positionGroup', { group: el.group })}
            </p>
          </div>
        </Card>

        {el.summary.en && (
          <Card index="08" title={t('element.summaryEn')}>
            <p className="text-sm leading-relaxed">{el.summary.vi ?? el.summary.en}</p>
            {el.wikipedia && (
              <a
                href={el.wikipedia}
                className="mt-2 inline-block text-sm text-accent underline underline-offset-2"
                rel="noopener"
                target="_blank"
              >
                Wikipedia ↗
              </a>
            )}
          </Card>
        )}
      </AcademicSection>

      <p className="px-1 text-xs text-muted">
        {t('element.sources')}: {el.sources.join(' · ')}
      </p>
    </article>
  );
}

function Card({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <section
      aria-labelledby={id}
      className="rounded-3xl border border-border bg-surface p-5 shadow-card sm:p-6"
    >
      <h2 className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs text-muted" aria-hidden>
          {index}
        </span>
        <span id={id} className="font-display text-xl font-semibold tracking-tight">
          {title}
        </span>
      </h2>
      {children}
    </section>
  );
}

export function PrevNext({ z, onSelect }: { z: number; onSelect?: (slug: string) => void }) {
  const locale = useLocale();
  const prev = BY_Z.get(z - 1);
  const next = BY_Z.get(z + 1);
  const cls =
    'flex min-w-0 items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-2 text-sm shadow-card transition hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring';

  const item = (e: ElementLite | undefined, dir: 'prev' | 'next') => {
    if (!e) return <span />;
    const name = locale === 'vi' ? e.name.vi : e.name.en;
    const content = (
      <>
        {dir === 'prev' && <ArrowLeft className="size-4 text-muted" />}
        <span className="tabular font-mono text-xs text-muted">{e.z}</span>{' '}
        <span className="font-display font-semibold" style={{ color: categoryInk(e.category) }}>
          {e.symbol}
        </span>{' '}
        <span className="truncate">{name}</span>
        {dir === 'next' && <ArrowRight className="size-4 text-muted" />}
      </>
    );
    return onSelect ? (
      <button type="button" className={cls} onClick={() => onSelect(e.slug)}>
        {content}
      </button>
    ) : (
      <Link href={`/element/${e.slug}`} className={cls}>
        {content}
      </Link>
    );
  };

  return (
    <nav className="flex justify-between gap-2">
      {item(prev, 'prev')}
      {item(next, 'next')}
    </nav>
  );
}

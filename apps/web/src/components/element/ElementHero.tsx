import { isRadioactive } from '@chem/core';
import type { ElementLite, PhotoCredit } from '@chem/data';
import { Radiation } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Chip } from '@/components/ui/Chip';
import { ElementPhoto } from '@/components/ui/ElementPhoto';
import { categoryColor, categoryInk, categoryTint } from '@/lib/elements';
import { cn, formatNumber } from '@/lib/format';

interface Props {
  el: ElementLite;
  compact?: boolean;
  /** Tên View Transition cho ô ký hiệu (panel: ô trong bảng "bay" vào đây) */
  tileTransitionName?: string;
  /** Ghi công ảnh; chỉ có trong dữ liệu đầy đủ, nên panel truyền vào sau khi tải xong */
  credit?: PhotoCredit | null;
  /** Ảnh hero là phần tử LCP trên trang tĩnh: tải ngay, ưu tiên cao */
  priority?: boolean;
}

/**
 * Phần đầu trang nguyên tố. Chỉ cần dữ liệu lite (có sẵn trên trang), nên panel hiển thị được ngay
 * trong lúc chờ tải dữ liệu đầy đủ.
 * - Có ảnh: ảnh thật lớn, ô ký hiệu đặt chồng ở góc ảnh.
 * - Không có ảnh: ô ký hiệu lớn như bản M1.
 */
export function ElementHero({ el, compact, tileTransitionName, credit, priority }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const color = categoryColor(el.category);
  const primary = locale === 'vi' ? el.name.vi : el.name.en;
  const secondary = locale === 'vi' ? el.name.en : el.name.vi;

  const tile = (
    <div
      className={cn(
        'flex aspect-square shrink-0 flex-col rounded-2xl border bg-surface shadow-card',
        el.photo ? 'w-20 p-2' : 'w-24 p-2.5'
      )}
      style={{ borderColor: color, viewTransitionName: tileTransitionName }}
    >
      <span className="tabular font-mono text-xs text-muted">{el.z}</span>
      <span
        className={cn(
          'mt-auto text-center font-display leading-none font-semibold',
          el.photo ? 'text-3xl' : 'text-4xl'
        )}
        style={{ color: categoryInk(el.category) }}
      >
        {el.symbol}
      </span>
      <span className="tabular mt-1 text-center font-mono text-[0.65rem] text-muted">
        {formatNumber(el.atomicMass, locale)}
      </span>
    </div>
  );

  const names = (
    <div className="min-w-0 flex-1 space-y-2">
      <h1
        className={cn(
          'font-display leading-none font-semibold tracking-tight',
          compact ? 'text-4xl' : 'text-5xl'
        )}
      >
        {primary}
      </h1>
      <p className="text-muted">{secondary}</p>
      {el.hook && (
        <p className="max-w-prose text-[0.95rem] leading-snug">
          {locale === 'vi' ? el.hook.vi : el.hook.en}
        </p>
      )}
      {/* Nhãn đời thường; chu kỳ / nhóm / khối nằm trong "Góc học hoá" (mục Vị trí) */}
      <div className="flex flex-wrap gap-1.5">
        <Chip color={color}>{t(`category.${el.category}`)}</Chip>
        {el.phaseAtSTP !== 'unknown' && (
          <Chip>
            {t('friendly.roomTemp', { phase: t(`phase.${el.phaseAtSTP}`) })}
            {el.phasePredicted && ` (${t('phase.predicted')})`}
          </Chip>
        )}
        {isRadioactive(el.z) && (
          <Chip>
            <Radiation className="size-3.5 text-[var(--cat-alkali-metal)]" aria-hidden />
            {t('friendly.radioactive')}
          </Chip>
        )}
        <Chip>
          {el.discoveryYear != null
            ? t('friendly.discovered', { year: el.discoveryYear })
            : t('friendly.ancient')}
        </Chip>
      </div>
      {!el.photo && el.z >= 104 && <p className="text-sm text-muted">{t('photo.none')}</p>}
    </div>
  );

  return (
    <header
      className="relative overflow-hidden rounded-3xl border border-border p-4 shadow-card sm:p-6"
      style={{
        background: `linear-gradient(135deg, ${categoryTint(el.category, 22)}, var(--surface) 75%)`,
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 -right-2 font-display text-[12rem] leading-none font-bold opacity-[0.07] select-none"
      >
        {el.symbol}
      </span>

      {el.photo ? (
        <div className="relative grid grid-cols-1 items-end gap-x-6 gap-y-4 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
          <figure className="min-w-0 space-y-1">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-2">
              <ElementPhoto
                el={el}
                alt={locale === 'en' && credit ? credit.title : t('photo.alt', { name: primary })}
                sizes="(min-width: 640px) 16rem, 100vw"
                priority={priority}
                className="aspect-[4/3] w-full"
              />
              <div className="absolute bottom-2 left-2">{tile}</div>
            </div>
            {credit && <PhotoCaption credit={credit} />}
          </figure>
          {names}
        </div>
      ) : (
        <div className="relative flex flex-wrap items-end gap-x-6 gap-y-4">
          {tile}
          {names}
        </div>
      )}
    </header>
  );
}

function PhotoCaption({ credit }: { credit: PhotoCredit }) {
  const t = useTranslations('photo');
  return (
    <figcaption className="text-[0.7rem] leading-snug [overflow-wrap:anywhere] text-muted">
      {t('credit')}{' '}
      <a href={credit.sourceUrl} target="_blank" rel="noreferrer" className="hover:underline">
        {credit.author}
      </a>
      {' · '}
      {credit.licenseUrl ? (
        <a href={credit.licenseUrl} target="_blank" rel="noreferrer" className="hover:underline">
          {credit.license}
        </a>
      ) : (
        credit.license
      )}
    </figcaption>
  );
}

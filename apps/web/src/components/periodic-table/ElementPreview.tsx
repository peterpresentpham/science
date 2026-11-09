'use client';

import { electronConfiguration, shells, toNotation } from '@chem/core';
import type { ElementLite } from '@chem/data';
import type { LensId } from '@chem/data/lenses';
import { useLocale, useTranslations } from 'next-intl';

import { BohrModel } from '@/components/atom/BohrModel';
import { ConfigText } from '@/components/ui/ConfigText';
import { ElementPhoto } from '@/components/ui/ElementPhoto';
import { categoryColor, categoryInk, categoryTint } from '@/lib/elements';
import { cn, formatNumber } from '@/lib/format';

import { LensBar, LensDescription } from './LensBar';

interface Props {
  /** Bảng 32 cột */
  wide?: boolean;
  el: ElementLite | null;
  lens: LensId | null;
  onLens: (lens: LensId | null) => void;
  /** Thẻ "Bạn có biết?" (hiện thay câu gợi ý khi chưa chọn lăng kính) */
  didYouKnow?: React.ReactNode;
}

/**
 * Vùng khoảng trống phía trên khối d (cột 3–12, hàng 1–3):
 * - phần trên, chưa hover: mở đầu (tiêu đề + gợi ý, hoặc giải thích lăng kính đang chọn)
 * - phần trên, đang hover/focus: "thẻ mẫu vật" với mô hình nguyên tử chuyển động
 * - phần dưới, luôn hiện: hàng chip lăng kính (đặt ở đây để không đẩy bảng xuống)
 */
export function ElementPreview({ el, lens, onLens, didYouKnow, wide }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div
      className="flex flex-col gap-3 self-stretch px-1 pb-2"
      // Bảng 32 cột: khoảng trống phía trên rộng hơn (cột 3–26), đặt vào giữa
      style={{ gridColumn: wide ? '6 / span 18' : '3 / span 10', gridRow: '1 / span 3' }}
    >
      <div className="flex min-h-0 flex-1 items-stretch" aria-live="polite">
        {el ? (
          <Specimen el={el} t={t} locale={locale} />
        ) : (
          <Hero t={t} lens={lens} onClear={() => onLens(null)} didYouKnow={didYouKnow} />
        )}
      </div>
      <LensBar active={lens} onChange={onLens} compact className="pl-2" />
    </div>
  );
}

type T = ReturnType<typeof useTranslations>;

function Hero({
  t,
  lens,
  onClear,
  didYouKnow,
}: {
  t: T;
  lens: LensId | null;
  onClear: () => void;
  didYouKnow?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-end gap-2 pl-2">
      {!lens && (
        <p className="font-mono text-xs tracking-widest text-muted uppercase max-[1400px]:hidden">
          {t('hero.eyebrow')}
        </p>
      )}
      <h1
        className={cn(
          'font-display text-4xl leading-[1.05] font-semibold tracking-tight min-[1400px]:text-5xl',
          // Đang chọn lăng kính trên màn hẹp: nhường chỗ cho phần giải thích
          lens && 'max-[1400px]:sr-only'
        )}
      >
        {t('hero.title')}
      </h1>
      {lens ? (
        <LensDescription lens={lens} onClear={onClear} className="max-w-2xl" />
      ) : (
        (didYouKnow ?? <p className="max-w-md text-sm text-muted">{t('table.hint')}</p>)
      )}
    </div>
  );
}

function Specimen({ el, t, locale }: { el: ElementLite; t: T; locale: string }) {
  const color = categoryColor(el.category);
  const cfg = electronConfiguration(el.z);
  const primary = locale === 'vi' ? el.name.vi : el.name.en;
  const secondary = locale === 'vi' ? el.name.en : el.name.vi;

  return (
    <div
      className="pointer-events-none relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border border-border px-5 shadow-card"
      style={{
        background: `linear-gradient(120deg, ${categoryTint(el.category, 16)}, var(--surface) 70%)`,
      }}
    >
      <span
        aria-hidden
        className="absolute -right-4 -bottom-10 font-display text-[11rem] leading-none font-bold opacity-[0.06]"
      >
        {el.symbol}
      </span>
      {el.photo ? (
        // Có ảnh thật: ưu tiên ảnh; mô hình Bohr vẫn còn trong trang chi tiết
        <div className="my-3 aspect-square h-[calc(100%-1.5rem)] max-h-40 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-2 shadow-card">
          <ElementPhoto el={el} alt="" sizes="10rem" className="size-full" />
        </div>
      ) : (
        <BohrModel
          z={el.z}
          shells={shells(cfg)}
          symbol={el.symbol}
          color={color}
          label=""
          className="h-full max-h-40 w-auto shrink-0 py-2"
        />
      )}
      <div className="min-w-0 space-y-1.5">
        <p className="flex items-baseline gap-2">
          <span className="tabular font-mono text-sm text-muted">{el.z}</span>
          <span className="font-display text-3xl font-semibold tracking-tight">{primary}</span>
          <span className="text-sm text-muted">{secondary}</span>
        </p>
        <p
          className="flex items-center gap-1.5 text-sm font-medium"
          style={{ color: categoryInk(el.category) }}
        >
          <span className="size-2 rounded-full" style={{ background: color }} />
          {t(`category.${el.category}`)}
        </p>
        {/* Có câu chuyện: câu móc câu thay cho cấu hình electron (vẫn còn trong Góc học hoá) */}
        {el.hook ? (
          <p className="line-clamp-2 max-w-md text-sm leading-snug">
            {locale === 'vi' ? el.hook.vi : el.hook.en}
          </p>
        ) : (
          <ConfigText config={toNotation(cfg, { nobleGasCore: true })} className="text-sm" />
        )}
      </div>
      <dl className="relative ml-auto hidden shrink-0 grid-cols-2 gap-x-6 gap-y-2 pr-2 xl:grid">
        {(
          [
            [t('prop.atomicMass'), `${formatNumber(el.atomicMass, locale)} u`],
            [t('prop.phase'), t(`phase.${el.phaseAtSTP}`)],
            [
              t('prop.electronegativity'),
              el.electronegativity != null ? formatNumber(el.electronegativity, locale) : '—',
            ],
            [t('prop.discovery'), el.discoveryYear ?? t('prop.ancient')],
          ] as const
        ).map(([k, v]) => (
          <div key={k}>
            <dt className="text-[0.65rem] text-muted">{k}</dt>
            <dd className="tabular font-display text-base font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

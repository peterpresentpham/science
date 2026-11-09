'use client';

import { LENS_IDS, LENS_SOURCES, type LensId } from '@chem/data/lenses';
import {
  CookingPot,
  Droplet,
  FlaskConical,
  Gem,
  type LucideIcon,
  PersonStanding,
  Radiation,
  Smartphone,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/format';

const ICONS: Record<LensId, LucideIcon> = {
  body: PersonStanding,
  phone: Smartphone,
  kitchen: CookingPot,
  precious: Gem,
  radioactive: Radiation,
  liquid: Droplet,
  synthetic: FlaskConical,
};

interface Props {
  active: LensId | null;
  onChange: (lens: LensId | null) => void;
  /** Dạng gọn đặt trong lòng bảng: chip nhỏ, xuống dòng thay vì cuộn ngang, không kèm giải thích */
  compact?: boolean;
  className?: string;
}

/** Hàng chip "lăng kính" (+ dòng giải thích và nguồn của lăng kính đang chọn, trừ dạng gọn). */
export function LensBar({ active, onChange, compact, className }: Props) {
  const t = useTranslations('lens');
  return (
    <div className={cn('space-y-2', className)}>
      <div className={cn('flex gap-2', compact ? 'items-start' : 'items-center')}>
        <span className={cn('shrink-0 text-xs font-medium text-muted', compact && 'pt-1.5')}>
          {t('label')}
        </span>
        <ul
          className={cn(
            'flex gap-1.5',
            compact
              ? // Màn hẹp: một dòng cuộn ngang để không kéo giãn hàng của bảng; màn rộng: xuống dòng
                '-mx-1 min-w-0 [scrollbar-width:none] overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] px-1 py-0.5 min-[1400px]:flex-wrap min-[1400px]:[mask-image:none]'
              : '-mx-1 [scrollbar-width:none] overflow-x-auto px-1 pb-1'
          )}
        >
          {LENS_IDS.map((id) => {
            const Icon = ICONS[id];
            const on = active === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onChange(on ? null : id)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border whitespace-nowrap shadow-card transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    compact ? 'px-2.5 py-1 text-[0.8rem]' : 'px-3 py-1.5 text-sm',
                    on
                      ? 'border-fg bg-fg text-bg'
                      : 'border-border bg-surface text-fg hover:border-fg/40'
                  )}
                >
                  <Icon className={compact ? 'size-3.5' : 'size-4'} aria-hidden />
                  {t(`${id}.name`)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {active && !compact && <LensDescription lens={active} onClear={() => onChange(null)} />}
    </div>
  );
}

/** Giải thích + nguồn của lăng kính đang chọn, kèm nút bỏ chọn. */
export function LensDescription({
  lens,
  onClear,
  className,
}: {
  lens: LensId;
  onClear: () => void;
  className?: string;
}) {
  const t = useTranslations('lens');
  const source = LENS_SOURCES[lens];
  return (
    <p className={cn('flex items-start gap-2 text-sm text-muted', className)} aria-live="polite">
      <span className="min-w-0 flex-1">
        {t(`${lens}.desc`)}
        {source && (
          <>
            {' '}
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap underline underline-offset-2 hover:text-fg"
            >
              {t('source')}: {source.label}
            </a>
          </>
        )}
      </span>
      <button
        type="button"
        onClick={onClear}
        aria-label={t('clear')}
        className="shrink-0 rounded-full p-1 hover:bg-surface-2 hover:text-fg"
      >
        <X className="size-4" />
      </button>
    </p>
  );
}

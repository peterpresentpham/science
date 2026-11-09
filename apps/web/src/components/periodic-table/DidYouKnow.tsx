'use client';

import type { ElementLite } from '@chem/data';
import { ArrowRight, Shuffle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useSyncExternalStore } from 'react';

import { categoryInk } from '@/lib/elements';
import { cn } from '@/lib/format';

/*
 * Lựa chọn ngẫu nhiên dùng chung cho cả trang (bảng và danh sách hiện cùng một câu).
 * Đọc qua useSyncExternalStore: server/HTML tĩnh nhận null (hiện `fallback`), trình duyệt mới chọn,
 * nên không lệch hydration và không cần setState trong effect.
 */
let pick: number | null = null;
const listeners = new Set<() => void>();
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

function next(count: number) {
  if (count < 2) return;
  // Luôn đổi sang một câu khác câu đang hiện
  pick = ((pick ?? 0) + 1 + Math.floor(Math.random() * (count - 1))) % count;
  for (const l of listeners) l();
}

interface Props {
  elements: readonly ElementLite[];
  hrefFor: (slug: string) => string;
  onActivate: (el: ElementLite, e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Hiện khi chưa chọn được (HTML tĩnh, trước khi hydrate) */
  fallback?: React.ReactNode;
  className?: string;
}

/** "Bạn có biết?": một câu móc câu ngẫu nhiên, link tới nguyên tố, nút đổi câu khác. */
export function DidYouKnow({ elements, hrefFor, onActivate, fallback = null, className }: Props) {
  const t = useTranslations('didYouKnow');
  const locale = useLocale();
  const pool = useMemo(() => elements.filter((e) => e.hook), [elements]);
  const index = useSyncExternalStore(
    subscribe,
    () => (pool.length ? (pick ??= Math.floor(Math.random() * pool.length)) : null),
    () => null
  );
  const el = index == null ? undefined : pool[index % pool.length];
  if (!el?.hook) return <>{fallback}</>;

  const name = locale === 'vi' ? el.name.vi : el.name.en;
  return (
    <p className={cn('text-sm leading-relaxed', className)} aria-live="polite">
      <span className="font-semibold">{t('title')}</span>{' '}
      {locale === 'vi' ? el.hook.vi : el.hook.en}{' '}
      <span className="inline-flex items-center gap-1 whitespace-nowrap">
        <a
          href={hrefFor(el.slug)}
          onClick={(e) => onActivate(el, e)}
          className="inline-flex items-center gap-0.5 font-medium underline-offset-2 hover:underline"
          style={{ color: categoryInk(el.category) }}
        >
          {name}
          <ArrowRight className="size-3.5" aria-hidden />
        </a>
        <button
          type="button"
          onClick={() => next(pool.length)}
          aria-label={t('another')}
          title={t('another')}
          className="ml-1 rounded-full p-1 text-muted hover:bg-surface-2 hover:text-fg"
        >
          <Shuffle className="size-3.5" aria-hidden />
        </button>
      </span>
    </p>
  );
}

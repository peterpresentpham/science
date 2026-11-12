'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/format';

export const TIMELINE_KINDS = [
  'element',
  'theory',
  'discovery-method',
  'table',
  'atom-model',
  'industry',
  'naming',
] as const;
export type TimelineKind = (typeof TIMELINE_KINDS)[number];

export interface TimelineItem {
  id: string;
  year: number;
  kind: TimelineKind;
  title: string;
  text?: string;
  /** Có thì tiêu đề là link sang trang nguyên tố */
  slug?: string;
  symbol?: string;
  source?: string;
  /** Năm đã định dạng sẵn ở server (ví dụ "1811") */
  yearLabel: string;
}

const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

/** Dòng thời gian có lọc theo loại; nhóm theo thế kỷ. */
export function TimelineView({ items }: { items: TimelineItem[] }) {
  const t = useTranslations('timeline');
  const [kind, setKind] = useState<TimelineKind | 'all'>('all');
  const shown = items.filter((i) => kind === 'all' || i.kind === kind);

  const groups = new Map<number, TimelineItem[]>();
  for (const i of shown) {
    const century = Math.floor(i.year / 100) + 1;
    groups.set(century, [...(groups.get(century) ?? []), i]);
  }

  return (
    <div className="space-y-6">
      <div role="group" aria-label={t('filter')} className="flex flex-wrap gap-2">
        {(['all', ...TIMELINE_KINDS] as const).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className={cn(
              'rounded-full border px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring',
              kind === k ? 'border-fg bg-fg text-bg' : 'border-border text-muted hover:text-fg'
            )}
          >
            {t(`kind.${k}`)}
          </button>
        ))}
      </div>
      <p className="tabular text-xs text-muted" aria-live="polite">
        {t('count', { count: shown.length })}
      </p>

      {[...groups].map(([century, list]) => (
        <section key={century} aria-label={t('century', { n: century })} className="space-y-3">
          <h2 className="font-display text-lg font-semibold">{t('century', { n: century })}</h2>
          <ol className="space-y-4 border-l-2 border-border pl-5">
            {list.map((i) => (
              <li key={i.id} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-1.5 -left-[1.7rem] size-3 rounded-full border-2 border-bg',
                    i.kind === 'element' ? 'bg-[var(--series-1)]' : 'bg-fg'
                  )}
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="tabular font-mono text-sm text-muted">{i.yearLabel}</span>
                  <h3 className="font-medium">
                    {i.slug ? (
                      <Link
                        href={`/element/${i.slug}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {i.title}
                      </Link>
                    ) : (
                      i.title
                    )}
                  </h3>
                  <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[0.65rem] text-muted">
                    {t(`kind.${i.kind}`)}
                  </span>
                </div>
                {i.text && <p className="mt-1 max-w-prose text-sm leading-relaxed">{i.text}</p>}
                {i.source && (
                  <a
                    href={i.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted underline underline-offset-2 hover:text-fg"
                  >
                    {t('source')}: {host(i.source)}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

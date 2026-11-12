import type { ElementFull } from '@chem/data';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { formatYear } from '@/lib/format';

const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

function Source({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-muted underline underline-offset-2 hover:text-fg"
    >
      {label}: {host(url)}
    </a>
  );
}

/** Lịch sử phát hiện, đặt tên và các mốc chính (curated/history, 30 nguyên tố ưu tiên). */
export function HistorySection({ el }: { el: Pick<ElementFull, 'slug' | 'history'> }) {
  const t = useTranslations('history');
  const locale = useLocale() as 'vi' | 'en';
  const h = el.history;
  if (!h) return null;
  const { discovery } = h;

  return (
    <section aria-labelledby={`history-${el.slug}`} className="space-y-3">
      <h2
        id={`history-${el.slug}`}
        className="px-1 font-display text-xl font-semibold tracking-tight"
      >
        {t('title')}
      </h2>

      <div className="space-y-4 rounded-2xl border border-border bg-surface p-4 shadow-card">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted">{t('discoveredIn')}</dt>
            <dd className="tabular mt-0.5 font-medium">
              {discovery.year == null ? t('ancient') : formatYear(discovery.year, locale)}
              {discovery.place && (
                <span className="font-normal text-muted"> · {discovery.place[locale]}</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t('discoveredBy')}</dt>
            <dd className="mt-0.5 font-medium">{discovery.by[locale]}</dd>
          </div>
        </dl>
        {discovery.note && (
          <p className="rounded-xl bg-surface-2 p-3 text-xs leading-relaxed">
            {discovery.note[locale]}
          </p>
        )}
        <Source url={discovery.source} label={t('source')} />

        <div className="space-y-1 border-t border-border pt-3 text-sm">
          <h3 className="text-xs font-medium text-muted">{t('naming')}</h3>
          <p className="leading-relaxed">{h.naming.text[locale]}</p>
          <Source url={h.naming.source} label={t('source')} />
        </div>

        <div className="space-y-3 border-t border-border pt-3 text-sm leading-relaxed">
          {h.story.map((p) => (
            <div key={p.vi} className="space-y-1">
              <p>{p[locale]}</p>
              <Source url={p.source} label={t('source')} />
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-3">
          <h3 className="text-xs font-medium text-muted">{t('milestones')}</h3>
          <ol className="mt-2 space-y-3 border-l-2 border-border pl-4">
            {h.milestones.map((m) => (
              <li key={`${m.year}-${m.text.vi}`} className="relative text-sm">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[1.4rem] size-2.5 rounded-full border-2 border-bg bg-fg"
                />
                <span className="tabular font-mono text-xs text-muted">
                  {formatYear(m.year, locale)}
                </span>
                <p className="leading-snug">{m.text[locale]}</p>
                <Source url={m.source} label={t('source')} />
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/timeline"
          className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-2"
        >
          {t('toTimeline')}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

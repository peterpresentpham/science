import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { TimelineEvent } from '@chem/data';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { type TimelineItem, TimelineView } from '@/components/timeline/TimelineView';
import { ELEMENTS } from '@/lib/elements';
import { formatYear } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/timeline'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'timeline' });
  const m = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    path: '/timeline/',
    title: t('title'),
    description: m('timelineDescription'),
  });
}

/** Mốc lý thuyết/ phương pháp/ bảng tuần hoàn (GPT biên soạn) cộng năm phát hiện của từng nguyên tố. */
export default async function TimelinePage({ params }: PageProps<'/[locale]/timeline'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale === 'vi' ? 'vi' : 'en';
  const t = await getTranslations('timeline');
  const { timeline } = await getMessages();

  const file = join(process.cwd(), 'public', 'data', 'learning', 'timeline.json');
  const events = JSON.parse(await readFile(file, 'utf8')) as TimelineEvent[];

  const items: TimelineItem[] = [
    ...events.map((e) => ({
      id: e.id,
      year: e.year,
      kind: e.kind,
      title: e.title[l],
      text: e.text[l],
      source: e.source,
      yearLabel: formatYear(e.year, l),
    })),
    ...ELEMENTS.filter((e) => e.discoveryYear != null).map((e) => ({
      id: `element-${e.slug}`,
      year: e.discoveryYear!,
      kind: 'element' as const,
      title: `${e.name[l]} (${e.symbol})`,
      slug: e.slug,
      symbol: e.symbol,
      yearLabel: formatYear(e.discoveryYear!, l),
    })),
  ].sort((a, b) => a.year - b.year || a.id.localeCompare(b.id));

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="text-muted">{t('intro')}</p>
      </header>
      <NextIntlClientProvider messages={{ timeline }}>
        <TimelineView items={items} />
      </NextIntlClientProvider>
    </article>
  );
}

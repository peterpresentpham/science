import { Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { readLessons } from '@/lib/learning.server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/lessons'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lesson' });
  const m = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    path: '/lessons/',
    title: t('title'),
    description: m('lessonsDescription'),
  });
}

export default async function LessonsPage({ params }: PageProps<'/[locale]/lessons'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale === 'vi' ? 'vi' : 'en';
  const t = await getTranslations('lesson');
  const lessons = await readLessons();

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="text-muted">{t('intro')}</p>
      </header>
      <ol className="space-y-3">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/lessons/${lesson.id}`}
              className="block space-y-2 rounded-2xl border border-border bg-surface p-4 shadow-card outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="tabular font-mono text-sm text-muted">{lesson.order}</span>
                <h2 className="font-display text-xl font-semibold">{lesson.title[l]}</h2>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Clock className="size-3.5" aria-hidden />
                  {t('minutes', { n: lesson.readingMinutes })} · {t('grade', { n: lesson.grade })}
                </span>
              </div>
              <ul className="list-inside list-disc text-sm text-muted">
                {lesson.goals.map((g) => (
                  <li key={g.vi}>{g[l]}</li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ol>
    </article>
  );
}

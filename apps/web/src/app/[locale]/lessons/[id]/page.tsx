import type { Metadata } from 'next';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { LessonBlocks } from '@/components/lesson/LessonBlocks';
import { Link } from '@/i18n/navigation';
import { readLessons, readQuizzes } from '@/lib/learning.server';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await readLessons()).map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/lessons/[id]'>): Promise<Metadata> {
  const { locale, id } = await params;
  const lesson = (await readLessons()).find((l) => l.id === id)!;
  const l = locale === 'vi' ? 'vi' : 'en';
  return pageMetadata({
    locale,
    path: `/lessons/${id}/`,
    title: lesson.title[l],
    description: lesson.goals.map((g) => g[l]).join(' '),
    type: 'article',
  });
}

export default async function LessonPage({ params }: PageProps<'/[locale]/lessons/[id]'>) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const l = locale === 'vi' ? 'vi' : 'en';
  const t = await getTranslations('lesson');
  const lessons = await readLessons();
  const index = lessons.findIndex((x) => x.id === id);
  const lesson = lessons[index]!;
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const questions = new Map(
    (await readQuizzes()).flatMap((q) => q.questions.map((x) => [x.id, x] as const))
  );
  const { learn } = (await getMessages()) as { learn: { quiz: Record<string, unknown> } };

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <nav aria-label={t('breadcrumb')} className="text-sm text-muted">
        <Link href="/lessons" className="underline underline-offset-2 hover:text-fg">
          {t('title')}
        </Link>
      </nav>
      <header className="space-y-3">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{lesson.title[l]}</h1>
        <p className="text-sm text-muted">
          {t('minutes', { n: lesson.readingMinutes })} · {t('grade', { n: lesson.grade })}
        </p>
        <div className="rounded-2xl border border-border bg-surface p-4 text-sm shadow-card">
          <h2 className="font-medium">{t('goals')}</h2>
          <ul className="mt-1 list-inside list-disc">
            {lesson.goals.map((g) => (
              <li key={g.vi}>{g[l]}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            {lesson.textbook[l]}{' '}
            <a
              href={lesson.textbookSource}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-fg"
            >
              {t('source')}
            </a>
          </p>
        </div>
      </header>

      <LessonBlocks blocks={lesson.blocks} questions={questions} learnQuiz={learn.quiz} />

      <footer className="space-y-4 border-t border-border pt-4 text-sm">
        <div>
          <h2 className="font-medium">{t('sources')}</h2>
          <ul className="mt-1 space-y-1 text-xs text-muted">
            {lesson.sources.map((s) => (
              <li key={s}>
                <a
                  href={s}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all underline underline-offset-2 hover:text-fg"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between gap-4">
          {prev ? (
            <Link href={`/lessons/${prev.id}`} className="underline underline-offset-2">
              ← {prev.title[l]}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/lessons/${next.id}`} className="text-right underline underline-offset-2">
              {next.title[l]} →
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}

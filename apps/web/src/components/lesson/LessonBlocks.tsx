import type { Lesson } from '@chem/data/lesson';
import type { Question } from '@chem/data/quiz';
import { Lightbulb } from 'lucide-react';
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl';

import { TopicQuiz } from '@/components/learn/TopicQuiz';

import { LessonWidget } from './LessonWidgets';

/** Markdown tối giản đúng với dữ liệu: dòng "## " là tiêu đề, dòng khác là đoạn; **đậm** trong đoạn. */
function Rich({ md }: { md: string }) {
  return md.split('\n').map((line, i) => {
    if (!line.trim()) return null;
    if (line.startsWith('## '))
      return (
        <h2 key={i} className="pt-2 font-display text-xl font-semibold tracking-tight">
          {line.slice(3)}
        </h2>
      );
    return (
      <p key={i} className="leading-relaxed">
        {line
          .split(/(\*\*[^*]+\*\*)/)
          .map((part, j) =>
            part.startsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part
          )}
      </p>
    );
  });
}

export function LessonBlocks({
  blocks,
  questions,
  learnQuiz,
}: {
  blocks: Lesson['blocks'];
  /** Câu hỏi theo id (đã tra từ ngân hàng) */
  questions: Map<string, Question>;
  /** Thông điệp `learn.quiz` cho khối câu hỏi (nhà cung cấp riêng, chỉ phần cần dùng) */
  learnQuiz: Record<string, unknown>;
}) {
  const t = useTranslations('lesson');
  const locale = useLocale() as 'vi' | 'en';
  let quizN = 0;
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.type === 'text')
          return (
            <div key={i} className="max-w-prose space-y-3">
              <Rich md={b.md[locale]} />
            </div>
          );
        if (b.type === 'tip')
          return (
            <aside
              key={i}
              className="flex max-w-prose gap-3 rounded-2xl border border-border bg-surface-2 p-4 text-sm"
            >
              <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden />
              <div className="space-y-2">
                <p className="font-medium">{t('tip')}</p>
                <Rich md={b.md[locale]} />
              </div>
            </aside>
          );
        if (b.type === 'widget') return <LessonWidget key={i} block={b} />;
        // b.type === 'quiz'
        const qs = b.ids.map((id) => questions.get(id)).filter((q): q is Question => !!q);
        const n = ++quizN;
        return (
          <section
            key={i}
            aria-label={t('practice')}
            className="space-y-3 rounded-2xl border border-border bg-surface p-4 shadow-card"
          >
            <h2 className="font-display text-lg font-semibold">{t('practice')}</h2>
            <NextIntlClientProvider messages={{ learn: { quiz: learnQuiz } }}>
              <TopicQuiz
                quiz={{ id: `lesson-${n}-${i}`, title: { vi: '', en: '' }, questions: qs }}
                ordered
              />
            </NextIntlClientProvider>
          </section>
        );
      })}
    </div>
  );
}

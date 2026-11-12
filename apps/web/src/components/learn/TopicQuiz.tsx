'use client';

import type { Question, Quiz } from '@chem/data/quiz';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';

import { BY_SLUG, ELEMENTS } from '@/lib/elements';
import { recordActivity } from '@/lib/learn/stats';
import type { LearnStore } from '@/lib/storage';

const ROUND = 10;
const clock = () => Date.now();

const shuffle = <T,>(arr: readonly T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
};

/** Người dùng gõ ký hiệu hoặc tên (vi/en, không phân biệt hoa thường và dấu) đều được. */
const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replaceAll('đ', 'd')
    .toLowerCase()
    .trim();

function isElementAnswer(given: string, symbol: string): boolean {
  const g = fold(given);
  if (!g) return false;
  if (g === fold(symbol)) return true;
  const el = ELEMENTS.find((e) => e.symbol === symbol);
  return !!el && [el.name.vi, el.name.en].some((n) => fold(n) === g);
}

type Given = number | number[] | string;

function isCorrect(q: Question, given: Given): boolean {
  switch (q.type) {
    case 'single':
      return given === q.answer;
    case 'multi': {
      const a = Array.isArray(given) ? [...given].sort() : [];
      const b = [...q.answer].sort();
      return a.length === b.length && a.every((v, i) => v === b[i]);
    }
    case 'number': {
      const n = Number(String(given).trim().replace(',', '.'));
      return Number.isFinite(n) && Math.abs(n - q.answer) <= q.tolerance;
    }
    case 'element':
      return typeof given === 'string' && isElementAnswer(given, q.answer);
  }
}

/** Quiz theo chủ đề (ngân hàng câu hỏi biên soạn theo chương trình lớp 10–12), mỗi lượt 10 câu. */
export function TopicQuiz({
  quiz,
  store,
  onExit,
  onChange,
  ordered,
}: {
  quiz: Pick<Quiz, 'title' | 'questions'> & { id: string };
  /** Không có thì không lưu lượt làm (dùng trong bài học) */
  store?: LearnStore;
  onExit?: () => void;
  onChange?: () => void;
  /** Giữ nguyên thứ tự và số câu của `quiz.questions` (câu hỏi cuối bài học) */
  ordered?: boolean;
}) {
  const t = useTranslations('learn');
  const locale = useLocale() as 'vi' | 'en';
  const questions = useMemo(
    () => (ordered ? quiz.questions : shuffle(quiz.questions).slice(0, ROUND)),
    [quiz, ordered]
  );
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [given, setGiven] = useState<Given | null>(null);
  const [typed, setTyped] = useState('');
  const [multi, setMulti] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const started = useRef(clock());

  const q = questions[i];
  const answered = given !== null;
  const ok = q && answered ? isCorrect(q, given) : false;

  const submit = (value: Given) => {
    if (!q || answered) return;
    setGiven(value);
    if (isCorrect(q, value)) setScore((s) => s + 1);
  };

  const next = async () => {
    if (i + 1 < questions.length) {
      setI(i + 1);
      setGiven(null);
      setTyped('');
      setMulti([]);
      return;
    }
    if (store) {
      await store.addAttempt({
        mode: `topic:${quiz.id}`,
        score,
        total: questions.length,
        ms: clock() - started.current,
        at: clock(),
      });
      await recordActivity(store, 0);
    }
    setFinished(true);
    onChange?.();
  };

  if (finished) {
    return (
      <div className="space-y-4">
        <p className="rounded-2xl bg-surface-2 p-4 font-medium" role="status">
          {t('quiz.result', { score, total: questions.length })}
        </p>
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t('quiz.backToModes')}
          </button>
        )}
      </div>
    );
  }
  if (!q) return null;

  const optionClass = (isAnswer: boolean, isWrong: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      isAnswer
        ? 'border-fg bg-surface-2 font-semibold'
        : isWrong
          ? 'border-[var(--danger)] line-through'
          : 'border-border hover:border-fg/40'
    }`;

  const answerText =
    q.type === 'single'
      ? q.options[q.answer]![locale]
      : q.type === 'multi'
        ? q.answer.map((a) => q.options[a]![locale]).join('; ')
        : q.type === 'number'
          ? `${q.answer}${q.unit ? ` ${q.unit}` : ''}`
          : (BY_SLUG.get(q.answer.toLowerCase())?.name[locale] ?? q.answer);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted">
        <span className="tabular">
          {quiz.title[locale]} · {t('quiz.progress', { i: i + 1, total: questions.length })}
        </span>
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="rounded-lg px-2 py-1 outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t('quiz.quit')}
          </button>
        )}
      </div>
      <h2 className="font-display text-xl leading-snug font-semibold">{q.q[locale]}</h2>

      {q.type === 'single' && (
        <ul className="grid gap-2 sm:grid-cols-2">
          {q.options.map((o, idx) => (
            <li key={idx}>
              <button
                type="button"
                disabled={answered}
                onClick={() => submit(idx)}
                className={optionClass(
                  answered && idx === q.answer,
                  answered && idx === given && idx !== q.answer
                )}
              >
                {o[locale]}
                {answered && idx === q.answer && (
                  <span className="sr-only"> ({t('quiz.correctMark')})</span>
                )}
                {answered && idx === given && idx !== q.answer && (
                  <span className="sr-only"> ({t('quiz.wrongMark')})</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {q.type === 'multi' && (
        <div className="space-y-3">
          <p className="text-xs text-muted">{t('quiz.multiHint')}</p>
          <ul className="grid gap-2">
            {q.options.map((o, idx) => {
              const chosen = multi.includes(idx);
              const right = q.answer.includes(idx);
              return (
                <li key={idx}>
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 ${
                      answered
                        ? right
                          ? 'border-fg bg-surface-2 font-semibold'
                          : chosen
                            ? 'border-[var(--danger)] line-through'
                            : 'border-border'
                        : 'border-border hover:border-fg/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={chosen}
                      disabled={answered}
                      onChange={() =>
                        setMulti((m) =>
                          m.includes(idx) ? m.filter((x) => x !== idx) : [...m, idx]
                        )
                      }
                      className="mt-1 size-4"
                    />
                    <span>
                      {o[locale]}
                      {answered && right && (
                        <span className="sr-only"> ({t('quiz.correctMark')})</span>
                      )}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          {!answered && (
            <button
              type="button"
              disabled={multi.length === 0}
              onClick={() => submit(multi)}
              className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg disabled:opacity-40"
            >
              {t('quiz.check')}
            </button>
          )}
        </div>
      )}

      {(q.type === 'number' || q.type === 'element') && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(typed);
          }}
          className="space-y-2"
        >
          <label className="block text-xs text-muted" htmlFor={`answer-${quiz.id}`}>
            {q.type === 'number'
              ? t('quiz.numberHint', { unit: q.unit ?? '' })
              : t('quiz.elementHint')}
          </label>
          <div className="flex gap-2">
            <input
              id={`answer-${quiz.id}`}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={answered}
              inputMode={q.type === 'number' ? 'decimal' : 'text'}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 py-2 font-mono outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={answered || !typed.trim()}
              className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg disabled:opacity-40"
            >
              {t('quiz.check')}
            </button>
          </div>
        </form>
      )}

      {answered && (
        <div className="space-y-3" role="status">
          <p className="text-sm font-medium">
            {ok ? t('quiz.correct') : t('quiz.wrong', { answer: answerText })}
          </p>
          <p className="rounded-xl bg-surface-2 p-3 text-sm leading-relaxed">{q.explain[locale]}</p>
          <button
            type="button"
            onClick={() => void next()}
            className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {i + 1 < questions.length ? t('quiz.next') : t('quiz.finish')}
          </button>
        </div>
      )}
    </div>
  );
}

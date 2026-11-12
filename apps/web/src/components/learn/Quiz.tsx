'use client';

import { electronConfiguration, toNotation } from '@chem/core';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { BY_CID, compoundName, COMPOUNDS } from '@/lib/compounds';
import { BY_Z, ELEMENTS } from '@/lib/elements';
import { isCorrectConfig } from '@/lib/learn/config-parse';
import { useLearning } from '@/lib/learn/content';
import { QUIZ_MODES, type QuizMode, recordActivity, records } from '@/lib/learn/stats';
import type { AttemptRow, LearnStore } from '@/lib/storage';

import { BalanceRound } from './BalanceRound';
import { SortRound } from './SortRound';
import { TopicQuiz } from './TopicQuiz';

const ROUND = 10;
const clock = () => Date.now();
const CATEGORIES = [
  'alkali-metal',
  'alkaline-earth-metal',
  'transition-metal',
  'post-transition-metal',
  'metalloid',
  'nonmetal',
  'halogen',
  'noble-gas',
  'lanthanide',
  'actinide',
] as const;

interface Question {
  z: number;
  /** Chế độ hợp chất: công thức dùng làm đề */
  formula?: string;
  options?: string[];
  answer: string;
}

const pick = <T,>(arr: readonly T[], n: number): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a.slice(0, n);
};

function makeRound(mode: QuizMode, locale: string): Question[] {
  if (mode === 'compound') {
    const pool = COMPOUNDS.filter((c) => !c.elemental);
    return pick(pool, ROUND).map((c) => {
      const wrong = pick(
        pool.filter((x) => x.cid !== c.cid && compoundName(x, locale) !== compoundName(c, locale)),
        3
      );
      return {
        z: 0,
        formula: c.formula,
        answer: String(c.cid),
        options: pick([c, ...wrong], 4).map((x) => String(x.cid)),
      };
    });
  }
  const pool =
    mode === 'config'
      ? ELEMENTS.filter((e) => e.z <= 54)
      : mode === 'group'
        ? ELEMENTS.filter((e) => e.group != null)
        : ELEMENTS;
  return pick(pool, ROUND).map((e) => {
    if (mode === 'symbol') {
      const wrong = pick(
        ELEMENTS.filter((x) => x.z !== e.z),
        3
      ).map((x) => x.symbol);
      return { z: e.z, answer: e.symbol, options: pick([e.symbol, ...wrong], 4) };
    }
    if (mode === 'number') {
      const wrong = pick(
        ELEMENTS.filter((x) => Math.abs(x.z - e.z) <= 6 && x.z !== e.z),
        3
      ).map((x) => String(x.z));
      return { z: e.z, answer: String(e.z), options: pick([String(e.z), ...wrong], 4) };
    }
    if (mode === 'category') {
      const wrong = pick(
        CATEGORIES.filter((c) => c !== e.category),
        3
      );
      return { z: e.z, answer: e.category, options: pick([e.category, ...wrong], 4) };
    }
    if (mode === 'group') {
      const g = e.group!;
      const wrong = pick(
        Array.from({ length: 18 }, (_, i) => i + 1).filter((n) => n !== g),
        3
      ).map(String);
      return { z: e.z, answer: String(g), options: pick([String(g), ...wrong], 4) };
    }
    return { z: e.z, answer: toNotation(electronConfiguration(e.z)) };
  });
}

/** Quiz 10 câu, tự sinh từ dữ liệu; kỷ lục cá nhân lưu cục bộ. */
export function Quiz({
  store,
  attempts,
  onChange,
}: {
  store: LearnStore;
  attempts: AttemptRow[];
  onChange: () => void;
}) {
  const t = useTranslations('learn');
  const tc = useTranslations();
  const locale = useLocale();
  const name = (z: number) => {
    const e = BY_Z.get(z);
    return e ? (locale === 'vi' ? e.name.vi : e.name.en) : '';
  };
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [qs, setQs] = useState<Question[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [finished, setFinished] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const quizzes = useLearning('quizzes');
  const [total, setTotal] = useState(ROUND);
  const started = useRef(0);
  const recs = records(attempts);

  const start = (m: QuizMode) => {
    setMode(m);
    setQs(m === 'balance' || m === 'sort' ? [] : makeRound(m, locale));
    setI(0);
    setScore(0);
    setPicked(null);
    setTyped('');
    setFinished(false);
    started.current = clock();
  };

  const q = qs[i];
  const answered = picked !== null;
  const show = (m: QuizMode, a: string) => {
    if (m === 'category') return tc(`category.${a}`);
    if (m === 'compound') {
      const c = BY_CID.get(Number(a));
      return c ? compoundName(c, locale) : a;
    }
    return a;
  };

  const submit = (given: string) => {
    if (!q || !mode || answered) return;
    const ok = mode === 'config' ? isCorrectConfig(q.z, given) : given === q.answer;
    setPicked(given || '—');
    if (ok) setScore((s) => s + 1);
  };

  const next = async () => {
    if (!mode) return;
    if (i + 1 < qs.length) {
      setI(i + 1);
      setPicked(null);
      setTyped('');
      return;
    }
    await store.addAttempt({
      mode,
      score,
      total: qs.length,
      ms: clock() - started.current,
      at: clock(),
    });
    await recordActivity(store, 0);
    setTotal(qs.length);
    setFinished(true);
    onChange();
  };

  const finishRound = async (sc: number, tot: number, ms: number) => {
    if (!mode) return;
    await store.addAttempt({ mode, score: sc, total: tot, ms, at: clock() });
    await recordActivity(store, 0);
    setScore(sc);
    setTotal(tot);
    setFinished(true);
    onChange();
  };

  const topicQuiz = Array.isArray(quizzes) ? quizzes.find((x) => x.id === topic) : undefined;
  if (topicQuiz) {
    return (
      <TopicQuiz
        key={topicQuiz.id}
        quiz={topicQuiz}
        store={store}
        onExit={() => setTopic(null)}
        onChange={onChange}
      />
    );
  }

  if (!mode || finished) {
    return (
      <div className="space-y-4">
        {finished && (
          <p className="rounded-2xl bg-surface-2 p-4 font-medium" role="status">
            {t('quiz.result', { score, total })}
          </p>
        )}
        <p className="text-sm text-muted">{t('quiz.intro', { n: ROUND })}</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {QUIZ_MODES.map((m) => (
            <li key={m}>
              <button
                type="button"
                onClick={() => start(m)}
                className="w-full rounded-2xl border border-border bg-surface p-4 text-left shadow-card outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="block font-display font-semibold">{t(`quiz.modes.${m}`)}</span>
                <span className="tabular text-xs text-muted">
                  {recs[m].best
                    ? t('quiz.best', { score: recs[m].best.score, total: recs[m].best.total })
                    : t('quiz.noBest')}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {Array.isArray(quizzes) && quizzes.length > 0 && (
          <div className="space-y-2 pt-2">
            <h3 className="font-display text-lg font-semibold">{t('quiz.topics')}</h3>
            <p className="text-sm text-muted">{t('quiz.topicsIntro')}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {quizzes.map((x) => (
                <li key={x.id}>
                  <button
                    type="button"
                    onClick={() => setTopic(x.id)}
                    className="w-full rounded-2xl border border-border bg-surface p-4 text-left shadow-card outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="block font-display font-semibold">
                      {x.title[locale === 'vi' ? 'vi' : 'en']}
                    </span>
                    <span className="tabular text-xs text-muted">
                      {t('quiz.topicCount', { count: x.questions.length })}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (mode === 'balance' || mode === 'sort') {
    const Round = mode === 'balance' ? BalanceRound : SortRound;
    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setMode(null)}
          className="rounded-lg px-2 py-1 text-sm text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t('quiz.quit')}
        </button>
        <Round onDone={(a, b, c) => void finishRound(a, b, c)} />
      </div>
    );
  }
  if (!q) return null;
  const correct = mode === 'config' ? isCorrectConfig(q.z, picked ?? '') : picked === q.answer;
  const el = BY_Z.get(q.z) ?? BY_Z.get(1)!;
  const prompt = {
    symbol: t('quiz.q.symbol', { name: name(q.z) }),
    number: t('quiz.q.number', { name: name(q.z), symbol: el.symbol }),
    category: t('quiz.q.category', { name: name(q.z), symbol: el.symbol }),
    config: t('quiz.q.config', { name: name(q.z), z: q.z }),
    group: t('quiz.q.group', { name: name(q.z), symbol: el.symbol }),
    compound: t('quiz.q.compound', { formula: q.formula ?? '' }),
    balance: '',
    sort: '',
  }[mode];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted">
        <span className="tabular">{t('quiz.progress', { i: i + 1, total: qs.length })}</span>
        <button
          type="button"
          onClick={() => setMode(null)}
          className="rounded-lg px-2 py-1 outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t('quiz.quit')}
        </button>
      </div>
      <h2 className="font-display text-2xl font-semibold">{prompt}</h2>

      {q.options ? (
        <ul className="grid gap-2 sm:grid-cols-2">
          {q.options.map((o) => {
            const isAnswer = answered && o === q.answer;
            const isWrong = answered && o === picked && o !== q.answer;
            return (
              <li key={o}>
                <button
                  type="button"
                  disabled={answered}
                  onClick={() => submit(o)}
                  className={`w-full rounded-xl border px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isAnswer
                      ? 'border-fg bg-surface-2 font-semibold'
                      : isWrong
                        ? 'border-[var(--danger)] line-through'
                        : 'border-border hover:border-fg/40'
                  }`}
                >
                  {show(mode, o)}
                  {isAnswer && <span className="sr-only"> ({t('quiz.correctMark')})</span>}
                  {isWrong && <span className="sr-only"> ({t('quiz.wrongMark')})</span>}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(typed);
          }}
          className="space-y-2"
        >
          <label className="block text-xs text-muted" htmlFor="cfg">
            {t('quiz.configHint')}
          </label>
          <div className="flex gap-2">
            <input
              id="cfg"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={answered}
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
          <p className="text-sm">
            {correct ? t('quiz.correct') : t('quiz.wrong', { answer: show(mode, q.answer) })}
          </p>
          <button
            type="button"
            onClick={() => void next()}
            className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {i + 1 < qs.length ? t('quiz.next') : t('quiz.finish')}
          </button>
        </div>
      )}
    </div>
  );
}

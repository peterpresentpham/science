'use client';

import { balance, parseEquation } from '@chem/core';
import { SAMPLE_EQUATIONS } from '@chem/core/equation/samples';
import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';

import { FormulaText } from '@/components/tools/FormulaText';

const ROUND = 5;
const clock = () => Date.now();

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
};

/** Chỉ lấy phương trình không có ion (đề bài chỉ cần hệ số nguyên tử). */
const POOL = SAMPLE_EQUATIONS.filter((s) => !/\^|[⁺⁻]|e-/.test(s.equation));

/**
 * Cân bằng phương trình: tăng/giảm hệ số từng chất, bảng đếm nguyên tử hai vế cập nhật theo.
 * Đúng khi bằng hệ số tối giản của đề (cùng bộ hệ số dùng cho công cụ Cân bằng).
 */
export function BalanceRound({
  onDone,
}: {
  onDone: (score: number, total: number, ms: number) => void;
}) {
  const t = useTranslations('learn');
  const equations = useMemo(() => shuffle(POOL).slice(0, ROUND), []);
  const [i, setI] = useState(0);
  const [coefs, setCoefs] = useState<number[] | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const started = useRef(clock());

  const sample = equations[i]!;
  const parsed = useMemo(() => {
    const r = parseEquation(sample.equation);
    return r.ok ? r.value : null;
  }, [sample]);
  if (!parsed) return null;

  const cur = coefs ?? parsed.species.map(() => 1);
  const solved = balance(sample.equation);
  const expected = solved.ok ? solved.value.coefficients.map(Number) : sample.expected;
  const correct = cur.every((c, k) => c === expected[k]);

  // Tổng nguyên tử mỗi nguyên tố ở từng vế
  const elements = [...new Set(parsed.species.flatMap((s) => [...s.formula.composition.keys()]))];
  const count = (el: string, side: 'reactant' | 'product') =>
    parsed.species.reduce(
      (n, s, k) => (s.side === side ? n + (s.formula.composition.get(el) ?? 0) * cur[k]! : n),
      0
    );

  const set = (k: number, v: number) => {
    if (checked) return;
    const next = [...cur];
    next[k] = Math.min(20, Math.max(1, v));
    setCoefs(next);
  };

  const submit = () => {
    setChecked(true);
    if (correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 < equations.length) {
      setI(i + 1);
      setCoefs(null);
      setChecked(false);
    } else onDone(score, equations.length, clock() - started.current);
  };

  return (
    <div className="space-y-4">
      <p className="tabular text-sm text-muted">
        {t('quiz.progress', { i: i + 1, total: equations.length })}
      </p>
      <h2 className="font-display text-2xl font-semibold">{t('quiz.q.balance')}</h2>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-lg">
        {parsed.species.map((s, k) => (
          <span key={k} className="flex items-center gap-2">
            {k === parsed.reactantCount && <span aria-hidden>→</span>}
            {k > 0 && k !== parsed.reactantCount && <span aria-hidden>+</span>}
            <span className="inline-flex items-center rounded-xl border border-border bg-surface">
              <button
                type="button"
                aria-label={t('quiz.decrease', { formula: s.formula.normalized })}
                disabled={checked || cur[k]! <= 1}
                onClick={() => set(k, cur[k]! - 1)}
                className="rounded-l-xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
              >
                <Minus className="size-3.5" aria-hidden />
              </button>
              <span className="tabular min-w-6 text-center font-semibold" aria-live="polite">
                {cur[k]}
              </span>
              <button
                type="button"
                aria-label={t('quiz.increase', { formula: s.formula.normalized })}
                disabled={checked || cur[k]! >= 20}
                onClick={() => set(k, cur[k]! + 1)}
                className="p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
              >
                <Plus className="size-3.5" aria-hidden />
              </button>
            </span>
            <FormulaText tokens={s.formula.display} />
          </span>
        ))}
      </div>

      <table className="tabular w-full max-w-sm text-sm">
        <caption className="pb-1 text-left text-xs text-muted">{t('quiz.atomCount')}</caption>
        <thead>
          <tr className="text-left text-xs text-muted">
            <th className="font-normal">{t('quiz.element')}</th>
            <th className="font-normal">{t('quiz.left')}</th>
            <th className="font-normal">{t('quiz.right')}</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((el) => {
            const l = count(el, 'reactant');
            const r = count(el, 'product');
            return (
              <tr key={el} className="border-t border-border">
                <th className="py-1 text-left font-medium">{el}</th>
                <td>{l}</td>
                <td className={l === r ? '' : 'font-semibold'}>
                  {r}
                  <span className="sr-only">
                    {' '}
                    ({l === r ? t('quiz.equal') : t('quiz.unequal')})
                  </span>
                  <span aria-hidden> {l === r ? '=' : '≠'}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {checked ? (
        <div className="space-y-3" role="status">
          <p className="text-sm">
            {correct ? t('quiz.right') : t('quiz.wrong', { answer: expected.join(', ') })}
          </p>
          <button
            type="button"
            onClick={next}
            className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {i + 1 < equations.length ? t('quiz.next') : t('quiz.finish')}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={submit}
          className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t('quiz.check')}
        </button>
      )}
    </div>
  );
}

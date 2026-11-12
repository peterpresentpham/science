'use client';

import { parseFormula } from '@chem/core';
import type { Reaction } from '@chem/data/reaction';
import { REACTION_CATEGORIES } from '@chem/data/reaction';
import {
  Flame,
  FlaskConical,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Skull,
  TriangleAlert,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';

import { FormulaText } from '@/components/tools/FormulaText';
import { Link } from '@/i18n/navigation';
import { BY_SLUG } from '@/lib/elements';
import { cn } from '@/lib/format';
import { solidColor } from '@/lib/lab/color';
import {
  buildShelf,
  catalystsOf,
  findReaction,
  GROUP_ORDER,
  groupOf,
  needsCatalyst,
  type Reagent,
} from '@/lib/lab/match';
import { actualSigns, scorePrediction, type Sign, SIGNS } from '@/lib/lab/observe';
import { useLearning } from '@/lib/learn/content';
import { useUrlParam } from '@/lib/url-state';
import { useMediaQuery } from '@/lib/use-media-query';

import { EquationText } from './EquationText';
import { TestTube } from './TestTube';

const frameClock = () => performance.now();
const MIN_MS = 3000;
const MAX_MS = 12000;

type Mode = 'guided' | 'free';
type Phase = 'idle' | 'running' | 'done';

const SAFETY = {
  safe: { icon: ShieldCheck, color: 'var(--cat-nonmetal)' },
  care: { icon: TriangleAlert, color: 'var(--cat-alkaline-earth-metal)' },
  danger: { icon: Skull, color: 'var(--danger)' },
} as const;

function Formula({ formula }: { formula: string }) {
  const r = parseFormula(formula);
  return r.ok ? <FormulaText tokens={r.value.display} /> : <>{formula}</>;
}

/** Phòng thí nghiệm ảo: chọn thí nghiệm có sẵn hoặc tự chọn hoá chất, dự đoán rồi trộn. */
export function LabApp() {
  const t = useTranslations('lab');
  const locale = useLocale() as 'vi' | 'en';
  const data = useLearning('reactions');
  const reactions = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');

  const [mode, setMode] = useState<Mode>('guided');
  const [rid, setRid] = useUrlParam('r');
  const [active, setActive] = useState<Reaction | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [heat, setHeat] = useState(false);
  const [catalyst, setCatalyst] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [guess, setGuess] = useState<Set<Sign>>(new Set());
  const [message, setMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<{ category: string; grade: number; q: string }>({
    category: 'all',
    grade: 0,
    q: '',
  });
  const startedAt = useRef(0);
  const bench = useRef<HTMLDivElement>(null);

  const guidedReaction = reactions.find((r) => r.id === rid) ?? null;
  const shown = mode === 'guided' ? guidedReaction : active;

  const reset = () => {
    setPhase('idle');
    setProgress(0);
    setMessage(null);
    setGuess(new Set());
  };

  // Hoạt cảnh: tiến độ theo thời gian thật, dài bằng thời gian thấy hiện tượng trong dữ liệu
  useEffect(() => {
    if (phase !== 'running' || !shown) return;
    const ms = Math.min(Math.max(shown.observations.durationSec * 1000, MIN_MS), MAX_MS);
    let raf = 0;
    const tick = () => {
      const p = (frameClock() - startedAt.current) / ms;
      if (p >= 1) {
        setProgress(1);
        setPhase('done');
        return;
      }
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, shown]);

  const run = (r: Reaction) => {
    setActive(r);
    setMessage(null);
    if (reduce) {
      setProgress(1);
      setPhase('done');
      return;
    }
    setProgress(0);
    startedAt.current = frameClock();
    setPhase('running');
  };

  const chooseGuided = (id: string) => {
    // Màn hình hẹp: danh sách nằm trên bàn thí nghiệm, nên cuộn xuống bàn sau khi chọn
    if (!window.matchMedia('(min-width: 1024px)').matches)
      bench.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setRid(id);
    reset();
    setHeat(false);
    setCatalyst(null);
  };

  const mixGuided = () => {
    if (!guidedReaction) return;
    if (guidedReaction.conditions.heat && !heat) return setMessage(t('needsHeat'));
    const cat = needsCatalyst(guidedReaction);
    if (cat && catalyst !== cat) return setMessage(t('needsCatalyst', { name: cat }));
    run(guidedReaction);
  };

  const mixFree = () => {
    if (picked.length === 0) return setMessage(t('pickSomething'));
    const result = findReaction(reactions, picked, { heat, catalyst });
    if (result.kind === 'match') return run(result.reaction);
    setActive(null);
    setPhase('idle');
    setProgress(0);
    setMessage(
      result.kind === 'needsHeat'
        ? t('needsHeatFree')
        : result.kind === 'needsCatalyst'
          ? t('needsCatalystFree')
          : t('noMatch')
    );
  };

  const shelf = useMemo(() => buildShelf(reactions), [reactions]);
  const catalysts = useMemo(() => catalystsOf(reactions), [reactions]);

  const list = reactions.filter(
    (r) =>
      (filter.category === 'all' || r.category.includes(filter.category as never)) &&
      (filter.grade === 0 || r.grade === filter.grade) &&
      (!filter.q.trim() ||
        r.title[locale].toLowerCase().includes(filter.q.trim().toLowerCase()) ||
        r.equation.toLowerCase().includes(filter.q.trim().toLowerCase()))
  );

  const toggleSign = (s: Sign) =>
    setGuess((g) => {
      const next = new Set(g);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });

  if (data === 'error') return <p className="text-sm text-muted">{t('loadError')}</p>;
  if (!data) return <p className="text-sm text-muted">{t('loading')}</p>;

  const needHeat = mode === 'guided' && !!guidedReaction?.conditions.heat;
  const needCat = mode === 'guided' && guidedReaction ? needsCatalyst(guidedReaction) : null;
  const canPredict = phase === 'idle' && !!shown;
  const result = shown && phase === 'done' ? scorePrediction(guess, actualSigns(shown)) : null;
  const SafetyIcon = shown ? SAFETY[shown.safety.level].icon : ShieldAlert;

  const btn =
    'rounded-xl bg-fg px-4 py-2.5 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40';
  const ghost =
    'rounded-xl border border-border px-3 py-2 text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      {/* Cột chọn */}
      <div className="space-y-4">
        <div
          role="tablist"
          aria-label={t('modeLabel')}
          className="flex gap-1 border-b border-border"
        >
          {(['guided', 'free'] as const).map((m) => (
            <button
              key={m}
              role="tab"
              type="button"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                reset();
                setActive(null);
              }}
              className="-mb-px border-b-2 border-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-fg aria-selected:font-semibold"
            >
              {t(`mode.${m}`)}
            </button>
          ))}
        </div>

        {mode === 'guided' ? (
          <div className="space-y-3">
            <input
              type="search"
              value={filter.q}
              onChange={(e) => setFilter((f) => ({ ...f, q: e.target.value }))}
              placeholder={t('search')}
              aria-label={t('search')}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('grade')}>
              {[0, 10, 11, 12].map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={filter.grade === g}
                  onClick={() => setFilter((f) => ({ ...f, grade: g }))}
                  className="rounded-full border border-border px-3 py-1 text-xs aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
                >
                  {g === 0 ? t('allGrades') : t('gradeN', { n: g })}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('categoryLabel')}>
              {(['all', ...REACTION_CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={filter.category === c}
                  onClick={() => setFilter((f) => ({ ...f, category: c }))}
                  className="rounded-full border border-border px-3 py-1 text-xs aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
                >
                  {t(`category.${c}`)}
                </button>
              ))}
            </div>
            <p className="tabular text-xs text-muted" aria-live="polite">
              {t('count', { count: list.length })}
            </p>
            <ul className="max-h-72 space-y-1.5 overflow-y-auto pr-1 lg:max-h-[28rem]">
              {list.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    aria-pressed={rid === r.id}
                    onClick={() => chooseGuided(r.id)}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-left text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-fg aria-pressed:bg-surface-2"
                  >
                    <span className="block font-medium">{r.title[locale]}</span>
                    <span className="text-xs text-muted">
                      <EquationText text={r.equation} /> · {t('gradeN', { n: r.grade })}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted">{t('freeIntro')}</p>
            {GROUP_ORDER.map((g) => {
              const items = shelf.filter((x) => groupOf(x.species) === g);
              if (!items.length) return null;
              return (
                <section key={g} className="space-y-1.5">
                  <h3 className="text-xs font-medium text-muted">{t(`group.${g}`)}</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {items.map((x: Reagent) => {
                      const on = picked.includes(x.formula);
                      return (
                        <li key={x.formula}>
                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() => {
                              reset();
                              setActive(null);
                              setPicked((p) =>
                                on
                                  ? p.filter((f) => f !== x.formula)
                                  : p.length < 3
                                    ? [...p, x.formula]
                                    : p
                              );
                            }}
                            className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
                          >
                            <span
                              aria-hidden
                              className="size-3 rounded-full border border-border"
                              style={{ background: solidColor(x.species.color, 'transparent') }}
                            />
                            <Formula formula={x.formula} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-3 text-sm">
              <label className="flex min-h-9 items-center gap-2">
                <input
                  type="checkbox"
                  className="size-5"
                  checked={heat}
                  onChange={(e) => setHeat(e.target.checked)}
                />
                {t('heat')}
              </label>
              <label className="flex items-center gap-2">
                {t('catalyst')}
                <select
                  value={catalyst ?? ''}
                  onChange={(e) => setCatalyst(e.target.value || null)}
                  className="rounded-lg border border-border bg-surface px-2 py-1"
                >
                  <option value="">{t('none')}</option>
                  {catalysts.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Cột bàn thí nghiệm */}
      <div ref={bench} className="scroll-mt-20 space-y-4">
        {mode === 'guided' && !guidedReaction ? (
          <p className="rounded-2xl bg-surface-2 p-4 text-sm">{t('chooseOne')}</p>
        ) : (
          <>
            {shown && (
              <header className="space-y-1">
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {shown.title[locale]}
                </h2>
                <p className="text-lg">
                  <EquationText text={shown.equation} />
                </p>
              </header>
            )}

            {shown && (
              <div
                role="note"
                className="flex gap-3 rounded-2xl border-2 p-3 text-sm"
                style={{ borderColor: SAFETY[shown.safety.level].color }}
              >
                <SafetyIcon
                  className="mt-0.5 size-5 shrink-0"
                  style={{ color: SAFETY[shown.safety.level].color }}
                  aria-hidden
                />
                <div>
                  <p className="font-medium">{t(`safety.${shown.safety.level}`)}</p>
                  <p className="text-muted">{shown.safety.note[locale]}</p>
                </div>
              </div>
            )}

            <div className="grid items-start gap-4 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
              <div className="rounded-2xl border border-border bg-surface p-3 shadow-card">
                {shown ? (
                  <TestTube reaction={shown} progress={progress} heated={heat} animate={!reduce} />
                ) : (
                  <div className="flex h-64 items-center justify-center text-sm text-muted">
                    <FlaskConical className="mr-2 size-5" aria-hidden />
                    {mode === 'free' ? t('emptyTube') : ''}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {shown && (
                  <ul className="space-y-1.5 text-sm" aria-label={t('reagents')}>
                    {shown.reactants.map((s) => (
                      <li key={s.formula} className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="size-3 shrink-0 rounded-full border border-border"
                          style={{ background: solidColor(s.color, 'transparent') }}
                        />
                        <span className="font-medium">
                          <Formula formula={s.formula} />
                        </span>
                        <span className="text-xs text-muted">
                          {t(`state.${s.state}`)}
                          {s.concentration ? ` · ${s.concentration}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {needHeat && (
                  <label className="flex min-h-9 items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="size-5"
                      checked={heat}
                      onChange={(e) => setHeat(e.target.checked)}
                    />
                    <Flame className="size-4" aria-hidden />
                    {t('heat')}
                  </label>
                )}
                {needCat && (
                  <label className="flex min-h-9 items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="size-5"
                      checked={catalyst === needCat}
                      onChange={(e) => setCatalyst(e.target.checked ? needCat : null)}
                    />
                    {t('addCatalyst', { name: needCat })}
                  </label>
                )}

                {canPredict && (
                  <fieldset className="space-y-1.5">
                    <legend className="text-xs font-medium text-muted">{t('predict')}</legend>
                    <div className="flex flex-wrap gap-1.5">
                      {SIGNS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={guess.has(s)}
                          onClick={() => toggleSign(s)}
                          className="rounded-full border border-border px-3 py-1 text-xs aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
                        >
                          {t(`sign.${s}`)}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={btn}
                    disabled={phase === 'running'}
                    onClick={() => (mode === 'guided' ? mixGuided() : mixFree())}
                  >
                    {phase === 'done' ? t('again') : t('mix')}
                  </button>
                  {phase !== 'idle' && (
                    <button type="button" className={ghost} onClick={reset}>
                      <RotateCcw className="mr-1 inline size-4" aria-hidden />
                      {t('reset')}
                    </button>
                  )}
                </div>
                {message && (
                  <p role="status" className="rounded-xl bg-surface-2 p-3 text-sm">
                    {message}
                  </p>
                )}
              </div>
            </div>

            {shown && phase === 'done' && (
              <section
                aria-live="polite"
                className="space-y-3 rounded-2xl border border-border bg-surface p-4 shadow-card"
              >
                <h3 className="font-display text-lg font-semibold">{t('observed')}</h3>
                <p>{shown.observations.summary[locale]}</p>
                {shown.observations.solid && (
                  <p className="text-sm">{shown.observations.solid[locale]}</p>
                )}
                {shown.ionic && (
                  <p className="text-sm">
                    <span className="text-muted">{t('ionic')}: </span>
                    <EquationText text={shown.ionic} />
                  </p>
                )}
                {shown.conditions.note && (
                  <p className="text-sm text-muted">{shown.conditions.note[locale]}</p>
                )}
                <div>
                  <h4 className="text-xs font-medium text-muted">{t('why')}</h4>
                  <p className="text-sm leading-relaxed">{shown.explain[locale]}</p>
                </div>
                {result && (
                  <p className="rounded-xl bg-surface-2 p-3 text-sm">
                    {t('predictResult', { right: result.right, total: result.total })}
                  </p>
                )}
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                  {[...shown.reactants, ...shown.products].flatMap((s) => {
                    const element = s.cid ? null : BY_SLUG.get(s.formula.toLowerCase());
                    const href = s.cid
                      ? `/compound/${s.cid}`
                      : element
                        ? `/element/${element.slug}`
                        : null;
                    return href
                      ? [
                          <li key={`${s.formula}-${s.state}`}>
                            <Link
                              href={href}
                              className="underline underline-offset-2 hover:text-fg"
                            >
                              <Formula formula={s.formula} />
                            </Link>
                          </li>,
                        ]
                      : [];
                  })}
                </ul>
                <a
                  href={shown.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('text-xs text-muted underline underline-offset-2 hover:text-fg')}
                >
                  {t('source')}
                </a>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

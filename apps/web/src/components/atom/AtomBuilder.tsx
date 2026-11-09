'use client';

import { electronConfiguration, fillingSteps, shells, type Subshell, toNotation } from '@chem/core';
import { Pause, Play, SkipBack, SkipForward, StepBack, StepForward } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/format';
import { boxRows } from '@/lib/orbital-boxes';

import { BohrModel } from './BohrModel';
import { MadelungDiagram } from './MadelungDiagram';
import { OrbitalBoxDiagram } from './OrbitalBoxDiagram';

const SPEEDS = [
  { label: '1×', ms: 700 },
  { label: '2×', ms: 350 },
  { label: '4×', ms: 140 },
] as const;

/** Ngoại lệ giải thích được bằng "phân lớp d nửa bão hoà / bão hoà bền hơn" (Cr, Cu, Mo, Ag, Au). */
const HALF_FULL_D = new Set([24, 29, 42, 47, 79]);
const EMPTY: Subshell[] = [];

interface Props {
  z: number;
  symbol: string;
  name: string;
  color: string;
  /** Nhãn Bohr cho trình đọc màn hình (số electron từng lớp) */
  bohrLabel: string;
  children?: React.ReactNode;
}

/**
 * "Dựng nguyên tử": điền lần lượt từng electron (Bohr + ô lượng tử + sơ đồ Madelung đồng bộ),
 * mỗi bước ghi rõ quy tắc đang áp dụng. Mặc định hiện cấu hình cuối, nên HTML tĩnh giống bản M1.
 */
export function AtomBuilder({ z, symbol, name, color, bohrLabel, children }: Props) {
  const t = useTranslations('atom');
  const steps = useMemo(() => fillingSteps(z), [z]);
  const finalCfg = useMemo(() => electronConfiguration(z), [z]);
  // Bố cục cố định: mọi phân lớp từng xuất hiện trong quá trình điền
  const layout = useMemo(
    () => [...steps.flatMap((s) => s.configuration), ...finalCfg],
    [steps, finalCfg]
  );
  const [step, setStep] = useState(steps.length);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(0);
  const last = steps.length;

  // Mỗi bước một setTimeout; bước cuối thì dừng (setState trong callback, không trong thân effect)
  useEffect(() => {
    if (!playing || step >= last) return;
    const id = window.setTimeout(() => {
      setStep(step + 1);
      if (step + 1 >= last) setPlaying(false);
    }, SPEEDS[speed]!.ms);
    return () => window.clearTimeout(id);
  }, [playing, step, speed, last]);

  const cur = step === 0 ? EMPTY : steps[step - 1]!.configuration;
  const prev = step <= 1 ? EMPTY : steps[step - 2]!.configuration;
  const info = step === 0 ? null : steps[step - 1]!;
  const atEnd = step === last;
  // Ở cấu hình cuối (chưa bấm chạy) không đánh dấu gì, giống sơ đồ tĩnh
  const rows = boxRows(cur, atEnd && !playing ? cur : prev, layout);

  const togglePlay = () => {
    if (playing) return setPlaying(false);
    if (atEnd) setStep(0);
    setPlaying(true);
  };
  const go = (s: number) => {
    setPlaying(false);
    setStep(Math.max(0, Math.min(last, s)));
  };

  let caption: string;
  if (!info) caption = t('start', { count: z, name });
  else if (info.rule === 'exception')
    caption =
      t('rule.exception', {
        symbol,
        config: toNotation(finalCfg, { nobleGasCore: true, superscript: true }),
      }) + (HALF_FULL_D.has(z) ? ` ${t('rule.halfFull')}` : '');
  else
    caption = t(`rule.${info.rule}`, {
      index: info.index,
      sub: `${info.n}${'spdf'[info.l]}`,
    });

  const btn =
    'rounded-full p-2 text-muted outline-none hover:bg-surface-2 hover:text-fg focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30';

  return (
    <div className="space-y-5">
      <div className="grid items-center gap-6 sm:grid-cols-[16rem_1fr]">
        <BohrModel
          z={z}
          shells={shells(cur)}
          symbol={symbol}
          color={color}
          label={bohrLabel}
          className="mx-auto h-auto w-full max-w-[16rem]"
        />
        {children}
      </div>

      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-xs text-muted">{t('builder')}</h3>
          <div className="flex items-center" role="group" aria-label={t('controls')}>
            <button type="button" className={btn} onClick={() => go(0)} aria-label={t('first')}>
              <SkipBack className="size-4" />
            </button>
            <button
              type="button"
              className={btn}
              onClick={() => go(step - 1)}
              disabled={step === 0}
              aria-label={t('prev')}
            >
              <StepBack className="size-4" />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? t('pause') : t('play')}
              className="mx-1 rounded-full bg-fg p-2 text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button
              type="button"
              className={btn}
              onClick={() => go(step + 1)}
              disabled={atEnd}
              aria-label={t('next')}
            >
              <StepForward className="size-4" />
            </button>
            <button type="button" className={btn} onClick={() => go(last)} aria-label={t('last')}>
              <SkipForward className="size-4" />
            </button>
          </div>
          <div className="flex gap-0.5 text-xs" role="group" aria-label={t('speed')}>
            {SPEEDS.map((s, i) => (
              <button
                key={s.label}
                type="button"
                aria-pressed={speed === i}
                onClick={() => setSpeed(i)}
                className={cn(
                  'rounded-full px-2 py-1 font-mono',
                  speed === i ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg'
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={last}
            value={step}
            onChange={(e) => go(Number(e.target.value))}
            aria-label={t('stepLabel')}
            aria-valuetext={t('stepValue', { step, total: last })}
            className="min-w-32 flex-1 accent-[var(--fg)]"
          />
        </div>
        <p
          aria-live="polite"
          className={cn(
            'min-h-10 rounded-xl px-3 py-2 text-sm',
            info?.rule === 'exception' ? 'bg-fg/10 font-medium' : 'bg-surface-2/60'
          )}
        >
          {caption}
        </p>
        <div className="grid items-start gap-5 md:grid-cols-[1fr_13rem]">
          <div>
            <h4 className="mb-3 text-xs text-muted">{t('boxes')}</h4>
            <OrbitalBoxDiagram
              rows={rows}
              color={color}
              labels={{ added: t('added'), removed: t('removed') }}
            />
          </div>
          <div>
            <h4 className="mb-2 text-xs text-muted">{t('madelung')}</h4>
            <MadelungDiagram
              cfg={cur}
              current={info && info.rule !== 'exception' ? info : null}
              color={color}
              label={t('madelungLabel')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

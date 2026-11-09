'use client';

import {
  electronConfiguration,
  MADELUNG,
  nodeCounts,
  type OrbitalL,
  orbitalName,
  subshellLabel,
  valenceSubshells,
} from '@chem/core';
import { Box } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/format';

// three.js (~150 KB nén) chỉ được tải khi người xem bấm "Xem 3D"
const OrbitalCloud = dynamic(() => import('./OrbitalCloud'), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full max-w-[28rem] rounded-2xl border border-border bg-bg" />
  ),
});

const MS = (l: number) => Array.from({ length: 2 * l + 1 }, (_, i) => i - l);
const MAX_N = 7;

/** Phân lớp ngoài cùng được điền theo Madelung (vd. Fe → 3d), làm orbital mặc định. */
function lastFilled(z: number): { n: number; l: OrbitalL } {
  const cfg = electronConfiguration(z);
  let best: { n: number; l: OrbitalL } = { n: 1, l: 0 };
  for (const [n, l] of MADELUNG)
    if (cfg.some((s) => s.n === n && s.l === l && s.electrons > 0)) best = { n, l };
  return best;
}

/**
 * Chọn orbital (n, l, m) + đám mây 3D. Có nút chọn nhanh các phân lớp hoá trị của nguyên tố.
 * Chỉ tải phần 3D khi người xem yêu cầu.
 */
export function OrbitalSection({ z, symbol }: { z: number; symbol: string }) {
  const t = useTranslations('atom.orbital');
  const start = useMemo(() => lastFilled(z), [z]);
  const [n, setN] = useState(start.n);
  const [l, setL] = useState<OrbitalL>(start.l);
  const [m, setM] = useState(0);
  const [show, setShow] = useState(false);
  const valence = useMemo(() => valenceSubshells(electronConfiguration(z)), [z]);

  const pick = (nn: number, ll: OrbitalL, mm = 0) => {
    setN(nn);
    setL(ll);
    setM(mm);
  };
  const name = orbitalName(n, l, m);
  const nodes = nodeCounts(n, l);
  const chip = (on: boolean) =>
    cn(
      'rounded-full border px-2.5 py-1 font-mono text-xs',
      on ? 'border-fg bg-fg text-bg' : 'border-border hover:border-fg/40'
    );

  return (
    <div className="grid items-start gap-6 md:grid-cols-[minmax(0,28rem)_1fr]">
      <div>
        {show ? (
          <OrbitalCloud n={n} l={l} m={m} label={t('cloudLabel', { name })} />
        ) : (
          <button
            type="button"
            onClick={() => setShow(true)}
            className="flex aspect-square w-full max-w-[28rem] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-bg text-sm text-muted hover:text-fg"
          >
            <Box className="size-8" aria-hidden />
            <span className="font-medium">{t('show', { name })}</span>
            <span className="text-xs">{t('showHint')}</span>
          </button>
        )}
      </div>

      <div className="space-y-4 text-sm">
        <div className="space-y-1.5">
          <p className="text-xs text-muted">{t('valence', { symbol })}</p>
          <div className="flex flex-wrap gap-1.5">
            {valence.map((s) => (
              <button
                key={`${s.n}${s.l}`}
                type="button"
                aria-pressed={n === s.n && l === s.l}
                onClick={() => pick(s.n, s.l)}
                className={chip(n === s.n && l === s.l)}
              >
                {subshellLabel(s.n, s.l)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-muted">{t('pickN')}</p>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: MAX_N }, (_, i) => i + 1).map((nn) => (
              <button
                key={nn}
                type="button"
                aria-pressed={n === nn}
                onClick={() => pick(nn, Math.min(l, nn - 1, 3) as OrbitalL, 0)}
                className={chip(n === nn)}
              >
                n = {nn}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-muted">{t('pickL')}</p>
          <div className="flex flex-wrap gap-1.5">
            {([0, 1, 2, 3] as const).map((ll) => (
              <button
                key={ll}
                type="button"
                disabled={ll >= n}
                aria-pressed={l === ll}
                onClick={() => pick(n, ll, 0)}
                className={cn(chip(l === ll), 'disabled:opacity-30')}
              >
                {subshellLabel(n, ll)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-muted">{t('pickM')}</p>
          <div className="flex flex-wrap gap-1.5">
            {MS(l).map((mm) => (
              <button
                key={mm}
                type="button"
                aria-pressed={m === mm}
                onClick={() => setM(mm)}
                className={chip(m === mm)}
              >
                {orbitalName(n, l, mm)}
              </button>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-surface-2/60 p-3">
          <div>
            <dt className="text-xs text-muted">{t('radialNodes')}</dt>
            <dd className="tabular font-mono text-lg">{nodes.radial}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t('angularNodes')}</dt>
            <dd className="tabular font-mono text-lg">{nodes.angular}</dd>
          </div>
        </dl>
        <p className="text-xs text-muted">{t('note')}</p>
      </div>
    </div>
  );
}

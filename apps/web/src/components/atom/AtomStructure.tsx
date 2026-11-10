'use client';

import { isRadioactive, nucleonCounts } from '@chem/core';
import { Atom, Orbit, Pause, Play } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useState, useSyncExternalStore } from 'react';

import { cn } from '@/lib/format';
import { useNearScreen } from '@/lib/use-near-screen';

import type { AtomFocus } from './AtomModel3D';
import { BohrModel } from './BohrModel';

const SHELL_LETTER = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

// three.js chỉ tải khi khung hình sắp lọt vào màn hình
const AtomModel3D = dynamic(() => import('./AtomModel3D'), { ssr: false });

const subscribeNoop = () => () => {};
function useWebGL(): boolean | null {
  return useSyncExternalStore(
    subscribeNoop,
    () => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') ?? c.getContext('webgl'));
      } catch {
        return false;
      }
    },
    () => null
  );
}

interface Props {
  z: number;
  symbol: string;
  name: string;
  shells: number[];
  color: string;
  children?: React.ReactNode;
}

/** Cấu tạo nguyên tử: mô hình 3D (hạt nhân p + n, các lớp electron) + số hạt + ký hiệu nguyên tử. */
export function AtomStructure({ z, symbol, name, shells, color, children }: Props) {
  const t = useTranslations('atom.model');
  const { protons, neutrons, electrons, massNumber } = nucleonCounts(z);
  const webgl = useWebGL();
  const [ref, near] = useNearScreen<HTMLDivElement>();
  const [autoRotate, setAutoRotate] = useState(true);
  const [focus, setFocus] = useState<AtomFocus>('atom');
  const [highlight, setHighlight] = useState<number | null>(null);
  const label = t('label', {
    name,
    protons,
    neutrons,
    electrons,
    shells: shells.length,
    list: shells.join(', '),
  });
  const show3d = webgl && near;

  const particles = [
    { key: 'proton', sign: 'p⁺', count: protons, token: '--particle-proton' },
    { key: 'neutron', sign: 'n⁰', count: neutrons, token: '--particle-neutron' },
    { key: 'electron', sign: 'e⁻', count: electrons, token: '--particle-electron' },
  ] as const;

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
      <div className="space-y-2">
        <div
          ref={ref}
          className="relative mx-auto aspect-square w-full max-w-[30rem] overflow-hidden rounded-2xl border border-border bg-bg"
        >
          {show3d ? (
            <AtomModel3D
              z={z}
              neutrons={neutrons}
              shells={shells}
              label={label}
              autoRotate={autoRotate}
              focus={focus}
              highlight={highlight}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <BohrModel
                z={z}
                shells={shells}
                symbol={symbol}
                color={color}
                label={label}
                className="h-full w-full"
              />
            </div>
          )}
          <p className="pointer-events-none absolute bottom-2 left-3 text-[0.65rem] text-muted">
            {t('notToScale')}
          </p>
        </div>
        {show3d && (
          <div
            className="flex flex-wrap items-center justify-center gap-1.5 text-xs"
            role="group"
            aria-label={t('view')}
          >
            {(['atom', 'nucleus'] as const).map((f) => {
              const Icon = f === 'atom' ? Orbit : Atom;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={focus === f}
                  onClick={() => setFocus(f)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2.5 py-1',
                    focus === f ? 'border-fg bg-fg text-bg' : 'border-border hover:border-fg/40'
                  )}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {t(`focus.${f}`)}
                </button>
              );
            })}
            <button
              type="button"
              aria-pressed={autoRotate}
              onClick={() => setAutoRotate((v) => !v)}
              className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 hover:border-fg/40"
            >
              {autoRotate ? (
                <Pause className="size-3.5" aria-hidden />
              ) : (
                <Play className="size-3.5" aria-hidden />
              )}
              {t('autoRotate')}
            </button>
          </div>
        )}
        {webgl === false && <p className="text-center text-xs text-muted">{t('noWebgl')}</p>}
        {show3d && <p className="text-center text-xs text-muted">{t('dragHint')}</p>}
      </div>

      <div className="space-y-5">
        {/* Ký hiệu nguyên tử ᴬ_Z X */}
        <div className="flex items-center gap-4">
          <span
            className="inline-grid grid-cols-[auto_auto] items-center font-display leading-none"
            aria-hidden
          >
            <span className="tabular row-start-1 text-right font-mono text-lg">{massNumber}</span>
            <span className="tabular row-start-2 text-right font-mono text-lg">{z}</span>
            <span className="row-span-2 row-start-1 pl-1 text-6xl font-semibold">{symbol}</span>
          </span>
          <p className="text-sm text-muted">
            <span className="sr-only">{t('notationSr', { symbol, a: massNumber, z })}</span>
            {t('notation')}
          </p>
        </div>

        <ul className="space-y-2">
          {particles.map((p) => (
            <li
              key={p.key}
              className="flex items-center gap-3 rounded-2xl border border-border px-3 py-2"
            >
              <span
                className="size-4 shrink-0 rounded-full ring-2 ring-[var(--surface)]"
                style={{ background: `var(${p.token})` }}
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="font-medium">
                  {t(`${p.key}.name`)} <span className="font-mono text-muted">{p.sign}</span>
                </span>
                <span className="block text-xs text-muted">{t(`${p.key}.where`)}</span>
              </span>
              <span className="tabular font-mono text-2xl font-semibold">{p.count}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-1 text-sm">
          <p className="tabular font-mono">
            A = Z + N = {protons} + {neutrons} = <span className="font-semibold">{massNumber}</span>
          </p>
          <p className="text-xs text-muted">
            {isRadioactive(z)
              ? t('isotopeRadioactive', { name, a: massNumber })
              : t('isotopeStable', { name, a: massNumber, symbol })}
          </p>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-muted">{t('shellsTitle')}</p>
          <ul className="flex flex-wrap gap-1.5" onMouseLeave={() => setHighlight(null)}>
            {shells.map((n, i) => (
              <li key={i}>
                <button
                  type="button"
                  onMouseEnter={() => setHighlight(i)}
                  onFocus={() => setHighlight(i)}
                  onBlur={() => setHighlight(null)}
                  className={cn(
                    'rounded-xl border px-2.5 py-1 text-left text-xs',
                    highlight === i ? 'border-fg' : 'border-border'
                  )}
                  aria-label={t('shellItem', { n: i + 1, letter: SHELL_LETTER[i] ?? '', count: n })}
                >
                  <span className="text-muted">
                    {i + 1} · {SHELL_LETTER[i]}
                  </span>{' '}
                  <span className="tabular font-mono font-semibold">{n}e</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {children}
      </div>
    </div>
  );
}

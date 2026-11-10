'use client';

import { massPercent, molarMass, parseFormula } from '@chem/core';
import { zOf } from '@chem/core';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { formulaErrorMessage } from '@/lib/chem-errors';
import { BASE_PATH, BY_Z } from '@/lib/elements';
import { cn, formatNumber } from '@/lib/format';
import { AVOGADRO, type GasCondition, MASSES, MOLAR_VOLUME } from '@/lib/masses';
import { useUrlParam } from '@/lib/url-state';

import { ErrorHighlight } from './ErrorHighlight';
import { FormulaText } from './FormulaText';

const EXAMPLES = [
  'H2O',
  'NaCl',
  'H2SO4',
  'CuSO4·5H2O',
  'C6H12O6',
  'Ca(OH)2',
  'Al2(SO4)3',
  'NH4NO3',
];

type Field = 'mass' | 'mol' | 'particles' | 'volume';

/** Đọc số kiểu Việt ("1,5") lẫn kiểu Anh ("1.5"); rỗng hoặc sai → null. */
const parseNum = (s: string): number | null => {
  const t = s.trim().replace(/\s/g, '').replace(',', '.');
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

/** Tính khối lượng mol + thành phần phần trăm + đổi g ↔ mol ↔ hạt ↔ thể tích khí. Công thức nằm trên URL (?f=). */
export function MolarMassTool() {
  const t = useTranslations();
  const locale = useLocale();
  const [raw, setRaw] = useUrlParam('f');
  const input = raw ?? '';
  const parsed = useMemo(() => (input.trim() ? parseFormula(input) : null), [input]);
  const formula = parsed?.ok ? parsed.value : null;
  const M = formula && !formula.electron ? molarMass(formula, MASSES) : null;
  const n = (v: number, d = 3) => formatNumber(v, locale, d);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">{t('tools.molar.inputLabel')}</span>
          <input
            value={input}
            onChange={(e) => setRaw(e.target.value || null)}
            placeholder="CuSO4·5H2O"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-invalid={parsed?.ok === false}
            aria-describedby="molar-help"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 font-mono text-lg shadow-card outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-[var(--danger)]"
          />
        </label>
        <p id="molar-help" className="text-xs text-muted">
          {t('tools.molar.help')}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setRaw(ex)}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-xs hover:border-fg/40"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {parsed && !parsed.ok && (
        <ErrorHighlight
          input={input}
          index={parsed.error.index}
          length={parsed.error.length}
          message={formulaErrorMessage(parsed.error, t)}
        />
      )}

      {formula && M !== null && (
        <>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-3xl border border-border bg-surface p-5 shadow-card">
            <FormulaText tokens={formula.display} className="font-display text-3xl font-semibold" />
            <p className="text-sm text-muted">{t('tools.molar.result')}</p>
            <p className="tabular font-mono text-4xl font-semibold">
              {n(M, 3)} <span className="text-lg font-normal text-muted">g/mol</span>
            </p>
            {formula.charge !== 0 && (
              <p className="w-full text-xs text-muted">{t('tools.molar.ionNote')}</p>
            )}
          </div>
          <Composition formula={formula} />
          <Converter M={M} />
        </>
      )}
    </div>
  );
}

function Composition({
  formula,
}: {
  formula: NonNullable<ReturnType<typeof parseFormula> & { ok: true }>['value'];
}) {
  const t = useTranslations('tools.molar');
  const locale = useLocale();
  const pct = massPercent(formula, MASSES);
  // Thanh ngang xếp theo phần trăm giảm dần, một màu (dataviz: phần–tổng thể đọc kèm số liệu)
  const rows = [...formula.composition].sort((a, b) => pct[b[0]]! - pct[a[0]]!);
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-surface shadow-card">
      <table className="w-full text-sm">
        <caption className="px-4 pt-4 text-left font-display text-lg font-semibold">
          {t('composition')}
        </caption>
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted">
            <th scope="col" className="px-4 py-2 font-medium">
              {t('element')}
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              {t('atoms')}
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              {t('atomicMass')}
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              {t('massShare')}
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              %
            </th>
            <th scope="col" className="w-1/4 px-4 py-2">
              <span className="sr-only">{t('bar')}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([el, k]) => {
            const e = BY_Z.get(zOf(el));
            return (
              <tr key={el} className="border-b border-border last:border-0">
                <th scope="row" className="px-4 py-2 text-left font-normal">
                  <a
                    href={e ? `${BASE_PATH}/${locale}/element/${e.slug}/` : undefined}
                    className="hover:underline"
                  >
                    <span className="font-semibold">{el}</span>{' '}
                    <span className="text-muted">
                      {e ? (locale === 'vi' ? e.name.vi : e.name.en) : ''}
                    </span>
                  </a>
                </th>
                <td className="tabular px-4 py-2 text-right font-mono">{k}</td>
                <td className="tabular px-4 py-2 text-right font-mono">
                  {formatNumber(MASSES[el]!, locale, 3)}
                </td>
                <td className="tabular px-4 py-2 text-right font-mono">
                  {formatNumber(MASSES[el]! * k, locale, 3)}
                </td>
                <td className="tabular px-4 py-2 text-right font-mono font-semibold">
                  {formatNumber(pct[el]!, locale, 2)}
                </td>
                <td className="px-4 py-2" aria-hidden>
                  <span className="block h-2 rounded-full bg-surface-2">
                    <span
                      className="block h-2 rounded-full"
                      style={{ width: `${pct[el]}%`, background: 'var(--series-1)' }}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Converter({ M }: { M: number }) {
  const t = useTranslations('tools.molar');
  const locale = useLocale();
  const [edit, setEdit] = useState<{ field: Field; text: string }>({ field: 'mol', text: '1' });
  const [cond, setCond] = useState<GasCondition>('standard');
  const Vm = MOLAR_VOLUME[cond];
  const v = parseNum(edit.text);
  const mol =
    v === null
      ? null
      : edit.field === 'mol'
        ? v
        : edit.field === 'mass'
          ? v / M
          : edit.field === 'particles'
            ? v / AVOGADRO
            : v / Vm;
  const show = (f: Field): string => {
    if (f === edit.field) return edit.text;
    if (mol === null) return '';
    const x =
      f === 'mol' ? mol : f === 'mass' ? mol * M : f === 'particles' ? mol * AVOGADRO : mol * Vm;
    if (f === 'particles')
      return x === 0 ? '0' : x.toExponential(4).replace('.', locale === 'vi' ? ',' : '.');
    return formatNumber(x, locale, 4).replace(/\s/g, '');
  };
  const field = (f: Field, unit: string) => (
    <label className="block space-y-1">
      <span className="text-xs text-muted">{t(`field.${f}`)}</span>
      <span className="flex items-center gap-2 rounded-xl border border-border bg-bg px-3 focus-within:ring-2 focus-within:ring-ring">
        <input
          value={show(f)}
          onChange={(e) => setEdit({ field: f, text: e.target.value })}
          inputMode="decimal"
          className="tabular w-full min-w-0 bg-transparent py-2 font-mono outline-none"
        />
        <span className="shrink-0 font-mono text-xs text-muted">{unit}</span>
      </span>
    </label>
  );
  return (
    <section className="space-y-4 rounded-3xl border border-border bg-surface p-5 shadow-card">
      <h2 className="font-display text-lg font-semibold">{t('converter')}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {field('mass', 'g')}
        {field('mol', 'mol')}
        {field('particles', t('particlesUnit'))}
        {field('volume', 'L')}
      </div>
      <div
        className="flex flex-wrap items-center gap-2 text-xs"
        role="group"
        aria-label={t('condition')}
      >
        <span className="text-muted">{t('condition')}</span>
        {(['standard', 'stp'] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cond === c}
            onClick={() => setCond(c)}
            className={cn(
              'rounded-full border px-2.5 py-1',
              cond === c ? 'border-fg bg-fg text-bg' : 'border-border'
            )}
          >
            {t(`cond.${c}`)}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted">
        {t('converterNote', { vm: formatNumber(Vm, locale, 2) })}
      </p>
    </section>
  );
}

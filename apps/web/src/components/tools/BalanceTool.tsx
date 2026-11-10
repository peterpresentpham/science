'use client';

import {
  balance,
  type BalanceResult,
  explainRedox,
  molarMass,
  parseEquation,
  type Q,
  type RedoxExplanation,
  stoichiometry,
} from '@chem/core';
import { SAMPLE_EQUATIONS } from '@chem/core/equation/samples';
import { Check, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { balanceErrorMessage } from '@/lib/chem-errors';
import { compoundByFormula } from '@/lib/compounds';
import { BASE_PATH } from '@/lib/elements';
import { cn, formatNumber } from '@/lib/format';
import { MASSES } from '@/lib/masses';
import { useUrlParam } from '@/lib/url-state';

import { ErrorHighlight } from './ErrorHighlight';
import { FormulaText } from './FormulaText';

/** Ví dụ bấm nhanh: mỗi nhóm lấy vài phương trình tiêu biểu */
const EXAMPLES = [
  'CH4 + O2 -> CO2 + H2O',
  'Al + HCl -> AlCl3 + H2',
  'Fe + HNO3 -> Fe(NO3)3 + NO + H2O',
  'KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O',
  'Fe3O4 + HNO3 -> Fe(NO3)3 + NO + H2O',
  'Cu + NO3- + H+ -> Cu2+ + NO + H2O',
];

const SUP: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '+': '⁺',
  '-': '⁻',
  '/': 'ᐟ',
};
/** Số oxi hoá dạng chỉ số trên: ⁺², ⁻¹, ⁰, ⁺⁸ᐟ³ */
const oxSup = (q: Q) => {
  const s = q.isZero()
    ? '0'
    : `${q.sign() > 0 ? '+' : '-'}${q.n < 0n ? -q.n : q.n}${q.d === 1n ? '' : `/${q.d}`}`;
  return [...s].map((c) => SUP[c] ?? c).join('');
};

export function BalanceTool() {
  const t = useTranslations();
  const [raw, setRaw] = useUrlParam('eq');
  const input = raw ?? '';
  const result = useMemo(() => (input.trim() ? balance(input) : null), [input]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">{t('tools.balance.inputLabel')}</span>
          <input
            value={input}
            onChange={(e) => setRaw(e.target.value || null)}
            placeholder="Cu + HNO3 -> Cu(NO3)2 + NO + H2O"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-invalid={result?.ok === false}
            aria-describedby="balance-help"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 font-mono text-base shadow-card outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-[var(--danger)] sm:text-lg"
          />
        </label>
        <p id="balance-help" className="text-xs text-muted">
          {t('tools.balance.help')}
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
        <p className="text-xs text-muted">
          {t('tools.balance.sampleCount', { count: SAMPLE_EQUATIONS.length })}
        </p>
      </div>

      {result && !result.ok && (
        <ErrorHighlight
          input={input}
          index={result.error.index}
          length={result.error.length}
          message={balanceErrorMessage(result.error, t, inputNames(input))}
        />
      )}

      {result?.ok && <Balanced r={result.value} />}
    </div>
  );
}

/** Tên các chất như người dùng gõ, để báo lỗi kiểu "chất N2 không tham gia phản ứng" */
function inputNames(input: string): string[] {
  const r = parseEquation(input);
  return r.ok ? r.value.species.map((s) => s.text.trim()) : [];
}

function Balanced({ r }: { r: BalanceResult }) {
  const t = useTranslations('tools.balance');
  const locale = useLocale();
  const redox = useMemo(() => explainRedox(r), [r]);
  const [tab, setTab] = useState<'electron' | 'matrix'>('electron');
  const current = redox ? tab : 'matrix';
  const sp = r.equation.species;
  const rc = r.equation.reactantCount;

  const term = (i: number) => {
    const c = r.coefficients[i]!;
    const compound = compoundByFormula(sp[i]!.formula.normalized);
    return (
      <a
        key={i}
        href={
          compound
            ? `${BASE_PATH}/${locale}/compound/${compound.cid}/`
            : `${BASE_PATH}/${locale}/tools/molar-mass/?f=${encodeURIComponent(sp[i]!.formula.normalized)}`
        }
        className="rounded-md px-0.5 hover:bg-surface-2"
        title={compound ? t('openCompound') : t('openMolar')}
      >
        {c !== 1n && <span className="mr-0.5 font-bold text-accent">{String(c)}</span>}
        <FormulaText tokens={sp[i]!.formula.display} />
      </a>
    );
  };
  const join = (from: number, to: number) =>
    [...Array(to - from).keys()].flatMap((k, j) =>
      j ? [<span key={`p${k}`}> + </span>, term(from + k)] : [term(from + k)]
    );

  return (
    <div className="space-y-6">
      <div className="space-y-2 rounded-3xl border border-border bg-surface p-5 shadow-card">
        <p className="text-sm text-muted">{t('result')}</p>
        <p
          className="font-display text-2xl leading-relaxed font-semibold sm:text-3xl"
          aria-live="polite"
        >
          {join(0, rc)} <span className="text-muted">→</span> {join(rc, sp.length)}
        </p>
        {r.givenCorrect !== null && (
          <p
            className={cn('flex items-center gap-1.5 text-sm', r.givenCorrect ? '' : 'font-medium')}
          >
            {r.givenCorrect ? (
              <Check className="size-4" aria-hidden />
            ) : (
              <X className="size-4" aria-hidden />
            )}
            {r.givenCorrect ? t('givenCorrect') : t('givenWrong')}
          </p>
        )}
      </div>

      <section className="space-y-4 rounded-3xl border border-border bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="mr-2 font-display text-lg font-semibold">{t('steps')}</h2>
          <div role="tablist" className="flex gap-1 text-sm">
            {(['electron', 'matrix'] as const).map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={current === k}
                disabled={k === 'electron' && !redox}
                onClick={() => setTab(k)}
                className={cn(
                  'rounded-full border px-3 py-1 disabled:opacity-40',
                  current === k ? 'border-fg bg-fg text-bg' : 'border-border'
                )}
              >
                {t(`method.${k}`)}
              </button>
            ))}
          </div>
        </div>
        {!redox && <p className="text-sm text-muted">{t('noElectron')}</p>}
        {current === 'electron' && redox ? <Electron r={r} ex={redox} /> : <Matrix r={r} />}
      </section>

      <Stoich r={r} />
    </div>
  );
}

function Electron({ r, ex }: { r: BalanceResult; ex: RedoxExplanation }) {
  const t = useTranslations('tools.balance');
  const sp = r.equation.species;
  const list = (idx: number[]) =>
    idx.map((i, k) => (
      <span key={i}>
        {k ? ', ' : ''}
        <FormulaText tokens={sp[i]!.formula.display} />
      </span>
    ));
  return (
    <div className="space-y-4 text-sm">
      <dl className="grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted">{t('reducing')}</dt>
          <dd className="font-medium">{list(ex.reducing)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{t('oxidizing')}</dt>
          <dd className="font-medium">{list(ex.oxidizing)}</dd>
        </div>
      </dl>
      <table className="w-full max-w-xl font-mono">
        <tbody>
          {ex.lines.map((l, i) => {
            const k = l.atoms === 1 ? '' : String(l.atoms);
            const from = `${k}${l.element}${oxSup(l.from)}`;
            const to = `${k}${l.element}${oxSup(l.to)}`;
            const e = `${l.electrons}e`;
            return (
              <tr key={i} className="border-b border-border last:border-0">
                <th
                  scope="row"
                  className="py-2 pr-4 text-left font-sans text-xs font-normal text-muted"
                >
                  {t(l.kind)}
                </th>
                <td className="py-2 pr-4 whitespace-nowrap">
                  {l.kind === 'oxidation' ? `${from} → ${to} + ${e}` : `${from} + ${e} → ${to}`}
                </td>
                <td className="py-2 font-semibold whitespace-nowrap">×{String(l.multiplier)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-muted">{t('electronTotal', { count: String(ex.electrons) })}</p>
      <p className="text-xs text-muted">{t('electronNote')}</p>
    </div>
  );
}

function Matrix({ r }: { r: BalanceResult }) {
  const t = useTranslations('tools.balance');
  const sp = r.equation.species;
  const step = <K extends BalanceResult['steps'][number]['kind']>(k: K) =>
    r.steps.find((s) => s.kind === k) as Extract<BalanceResult['steps'][number], { kind: K }>;
  const m0 = step('matrix');
  const rr = step('rref');
  const ns = step('nullspace');
  const ints = step('integers');
  const head = (
    <thead>
      <tr className="text-xs text-muted">
        <th />
        {sp.map((s, i) => (
          <th key={i} scope="col" className="px-2 py-1 font-normal">
            <FormulaText tokens={s.formula.display} />
          </th>
        ))}
      </tr>
    </thead>
  );
  const grid = (rows: string[], m: Q[][]) => (
    <div className="overflow-x-auto">
      <table className="tabular font-mono text-sm">
        {head}
        <tbody>
          {m.map((row, i) => (
            <tr key={i}>
              <th scope="row" className="pr-3 text-left text-xs font-normal text-muted">
                {rows[i] === 'charge' ? t('chargeRow') : rows[i]}
              </th>
              {row.map((q, j) => (
                <td key={j} className="px-2 py-0.5 text-right">
                  {q.toString().replace('-', '−')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <ol className="space-y-5 text-sm">
      <li className="space-y-2">
        <p>{t('matrix.step1')}</p>
        {grid(m0.rows, m0.matrix)}
      </li>
      <li className="space-y-2">
        <p>{t('matrix.step2', { rank: rr.rank })}</p>
        {grid(rr.rows, rr.matrix)}
      </li>
      <li className="space-y-1">
        <p>{t('matrix.step3')}</p>
        <p className="font-mono">({ns.vector.map((q) => q.toString()).join('; ')})</p>
      </li>
      <li className="space-y-1">
        <p>{t('matrix.step4', { k: String(ints.multiplier) })}</p>
        <p className="font-mono font-semibold">({ints.coefficients.map(String).join('; ')})</p>
      </li>
    </ol>
  );
}

type Unit = 'g' | 'mol';

function Stoich({ r }: { r: BalanceResult }) {
  const t = useTranslations('tools.balance');
  const locale = useLocale();
  const sp = r.equation.species;
  const rc = r.equation.reactantCount;
  const [amounts, setAmounts] = useState<Record<number, { text: string; unit: Unit }>>({});
  const M = sp.map((s) => (s.formula.electron ? null : molarMass(s.formula, MASSES)));
  const given = sp.map((_, i) => {
    const a = amounts[i];
    if (!a || i >= rc) return null;
    const v = Number(a.text.trim().replace(',', '.'));
    if (!a.text.trim() || !Number.isFinite(v) || v < 0) return null;
    return a.unit === 'mol' ? v : M[i] ? v / M[i]! : null;
  });
  const res = stoichiometry(r.coefficients, rc, given);
  const n = (v: number) => formatNumber(v, locale, 4);

  return (
    <section className="space-y-4 rounded-3xl border border-border bg-surface p-5 shadow-card">
      <div>
        <h2 className="font-display text-lg font-semibold">{t('stoich.title')}</h2>
        <p className="text-sm text-muted">{t('stoich.hint')}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th scope="col" className="py-2 pr-3 font-medium">
                {t('stoich.species')}
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                {t('stoich.given')}
              </th>
              <th scope="col" className="py-2 pr-3 text-right font-medium">
                {t('stoich.reacted')}
              </th>
              <th scope="col" className="py-2 pr-3 text-right font-medium">
                {t('stoich.mass')}
              </th>
              <th scope="col" className="py-2 text-right font-medium">
                {t('stoich.left')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sp.map((s, i) => {
              const isR = i < rc;
              const a = amounts[i] ?? { text: '', unit: 'g' as Unit };
              const mol = res?.reacted[i];
              const left = res?.remaining[i];
              const limiting = res?.limiting.includes(i);
              return (
                <tr key={i} className="border-b border-border last:border-0">
                  <th scope="row" className="py-2 pr-3 text-left font-normal whitespace-nowrap">
                    <FormulaText tokens={s.formula.display} className="font-semibold" />{' '}
                    <span className="text-xs text-muted">
                      {isR ? t('stoich.reactant') : t('stoich.product')}
                    </span>
                  </th>
                  <td className="py-2 pr-3">
                    {isR && (
                      <span className="flex items-center gap-1">
                        <input
                          value={a.text}
                          inputMode="decimal"
                          aria-label={t('stoich.amountFor', { name: s.formula.normalized })}
                          onChange={(e) =>
                            setAmounts({ ...amounts, [i]: { ...a, text: e.target.value } })
                          }
                          className="tabular w-24 rounded-lg border border-border bg-bg px-2 py-1 font-mono outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <select
                          value={a.unit}
                          aria-label={t('stoich.unit')}
                          onChange={(e) =>
                            setAmounts({ ...amounts, [i]: { ...a, unit: e.target.value as Unit } })
                          }
                          className="rounded-lg border border-border bg-bg px-1 py-1 text-xs"
                        >
                          <option value="g">g</option>
                          <option value="mol">mol</option>
                        </select>
                      </span>
                    )}
                  </td>
                  <td className="tabular py-2 pr-3 text-right font-mono">
                    {mol === undefined ? '' : `${n(mol)} mol`}
                  </td>
                  <td className="tabular py-2 pr-3 text-right font-mono">
                    {mol === undefined || M[i] == null ? '' : `${n(mol * M[i]!)} g`}
                  </td>
                  <td className="tabular py-2 text-right font-mono">
                    {left == null ? (
                      ''
                    ) : limiting ? (
                      <span className="font-sans font-semibold">{t('stoich.used')}</span>
                    ) : (
                      `${n(left)} mol${M[i] ? ` · ${n(left * M[i]!)} g` : ''}`
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {res && res.limiting.length > 0 && (
        <p className="text-sm">
          {t('stoich.summary', {
            names: res.limiting.map((i) => sp[i]!.formula.normalized).join(', '),
            extent: n(res.extent),
          })}
        </p>
      )}
    </section>
  );
}

'use client';

import {
  balance,
  electronConfiguration,
  molarMass,
  parseFormula,
  shells,
  toNotation,
} from '@chem/core';
import type { ElementFull } from '@chem/data';
import type { Lesson } from '@chem/data/lesson';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { AtomStructure } from '@/components/atom/AtomStructure';
import { ElementStructure } from '@/components/structure/ElementStructure';
import { StructureViewer } from '@/components/structure/StructureViewer';
import { FormulaText } from '@/components/tools/FormulaText';
import { ConfigText } from '@/components/ui/ConfigText';
import { Link } from '@/i18n/navigation';
import { PROPERTIES, type PropertyKey } from '@/lib/color-mode';
import { BY_CID, compoundName, sdfUrl } from '@/lib/compounds';
import { BY_SLUG, categoryColor, elementDataUrl, ELEMENTS } from '@/lib/elements';
import { cn, formatNumber } from '@/lib/format';

export type WidgetBlock = Extract<Lesson['blocks'][number], { type: 'widget' }>;

const bySymbol = (symbol: string) => ELEMENTS.find((e) => e.symbol === symbol)!;

function AtomModel({ symbol }: { symbol: string }) {
  const locale = useLocale();
  const el = bySymbol(symbol);
  return (
    <AtomStructure
      z={el.z}
      symbol={el.symbol}
      name={locale === 'vi' ? el.name.vi : el.name.en}
      shells={shells(electronConfiguration(el.z))}
      color={categoryColor(el.category)}
    />
  );
}

function ElectronConfig({ symbol }: { symbol: string }) {
  const t = useTranslations('lesson');
  const locale = useLocale();
  const el = bySymbol(symbol);
  const cfg = electronConfiguration(el.z);
  const layers = shells(cfg);
  return (
    <div className="space-y-2 rounded-2xl border border-border bg-surface p-4 shadow-card">
      <p className="font-display text-lg font-semibold">
        {locale === 'vi' ? el.name.vi : el.name.en} ({el.symbol}, Z = {el.z})
      </p>
      <p className="text-lg">
        <ConfigText config={toNotation(cfg)} />
      </p>
      <p className="tabular text-sm text-muted">
        {t('shellsLine', { list: layers.join(', '), count: layers.length })}
      </p>
    </div>
  );
}

/** Bảng tuần hoàn thu nhỏ tô sáng các nguyên tố / một nhóm / một chu kỳ. */
function TableHighlight({
  props,
}: {
  props: { elements: string[] } | { group: number } | { period: number };
}) {
  const t = useTranslations('lesson');
  const lit = (e: (typeof ELEMENTS)[number]) =>
    'elements' in props
      ? props.elements.includes(e.symbol)
      : 'group' in props
        ? e.group === props.group
        : e.period === props.period && e.block !== 'f';
  const label =
    'elements' in props
      ? t('tableElements', { list: props.elements.join(', ') })
      : 'group' in props
        ? t('tableGroup', { n: props.group })
        : t('tablePeriod', { n: props.period });
  return (
    <div className="space-y-2">
      <div
        role="img"
        aria-label={label}
        className="grid w-full max-w-md gap-[2px]"
        style={{
          gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(7, auto) 4px repeat(2, auto)',
        }}
      >
        {ELEMENTS.map((e) => (
          <span
            key={e.z}
            className="flex aspect-square items-center justify-center rounded-[2px] text-[0.45rem] leading-none sm:text-[0.55rem]"
            style={{
              gridColumn: e.grid.x,
              gridRow: e.grid.y,
              background: lit(e) ? categoryColor(e.category) : undefined,
              opacity: lit(e) ? 1 : 0.2,
              outline: lit(e) ? '1px solid var(--fg)' : undefined,
            }}
          >
            {lit(e) ? e.symbol : ''}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

const TREND_KEY: Record<string, PropertyKey> = {
  electronegativity: 'en',
  atomicRadius: 'radius',
  ionizationEnergy: 'ie',
};
const NOBLE = [2, 10, 18, 36, 54, 86];

/** Đường xu hướng theo số hiệu nguyên tử (Z = 1–86), vạch mờ ở các khí hiếm. */
function Trend({ property }: { property: string }) {
  const t = useTranslations('lesson');
  const key = TREND_KEY[property]!;
  const def = PROPERTIES[key];
  const pts = ELEMENTS.filter((e) => e.z <= 86)
    .map((e) => ({ z: e.z, v: def.get(e) }))
    .filter((p): p is { z: number; v: number } => p.v != null);
  const W = 560;
  const H = 220;
  const pad = { l: 8, r: 8, t: 12, b: 24 };
  const max = Math.max(...pts.map((p) => p.v));
  const x = (z: number) => pad.l + ((z - 1) / 85) * (W - pad.l - pad.r);
  const y = (v: number) => H - pad.b - (v / max) * (H - pad.t - pad.b);
  // Đứt đoạn ở chỗ thiếu dữ liệu
  const segments: string[] = [];
  let cur = '';
  for (let z = 1; z <= 86; z++) {
    const p = pts.find((q) => q.z === z);
    if (!p) {
      if (cur) segments.push(cur);
      cur = '';
      continue;
    }
    cur += `${cur ? 'L' : 'M'}${x(z).toFixed(1)},${y(p.v).toFixed(1)}`;
  }
  if (cur) segments.push(cur);
  const unit = def.unit ? ` (${def.unit})` : '';
  return (
    <figure className="space-y-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t(`trend.${property}`) + unit}
        className="w-full max-w-xl"
      >
        {NOBLE.map((z) => (
          <line
            key={z}
            x1={x(z)}
            x2={x(z)}
            y1={pad.t}
            y2={H - pad.b}
            stroke="var(--border)"
            strokeDasharray="3 3"
          />
        ))}
        {segments.map((d) => (
          <path key={d} d={d} fill="none" stroke="var(--series-1)" strokeWidth={2} />
        ))}
        <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} stroke="var(--border)" />
        <text x={pad.l} y={H - 6} fontSize="11" fill="var(--muted)">
          Z = 1
        </text>
        <text x={W - pad.r} y={H - 6} fontSize="11" textAnchor="end" fill="var(--muted)">
          Z = 86
        </text>
      </svg>
      <figcaption className="text-xs text-muted">
        {t(`trend.${property}`)}
        {unit} · {t('trendNote')} ·{' '}
        <Link href="/tools/trends" className="underline underline-offset-2 hover:text-fg">
          {t('trendTool')}
        </Link>
      </figcaption>
    </figure>
  );
}

/** Mô hình 3D chỉ tải khi người học bấm, vì three.js và dữ liệu cấu trúc khá nặng. */
function Structure3D({ props }: { props: { cid: number } | { element: string } }) {
  const t = useTranslations('lesson');
  const locale = useLocale();
  const [on, setOn] = useState(false);
  const [full, setFull] = useState<ElementFull | null>(null);
  const symbol = 'element' in props ? props.element : null;

  useEffect(() => {
    if (!on || !symbol) return;
    let cancelled = false;
    void fetch(elementDataUrl(symbol.toLowerCase()))
      .then((r) => r.json() as Promise<ElementFull>)
      .then((e) => !cancelled && setFull(e));
    return () => {
      cancelled = true;
    };
  }, [on, symbol]);

  const compound = 'cid' in props ? BY_CID.get(props.cid) : undefined;
  const title = compound
    ? compoundName(compound, locale)
    : (BY_SLUG.get((symbol ?? '').toLowerCase())?.name[locale === 'vi' ? 'vi' : 'en'] ?? '');

  if (!on)
    return (
      <button
        type="button"
        onClick={() => setOn(true)}
        className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium shadow-card outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
      >
        {t('show3d', { name: title })}
      </button>
    );
  if (compound)
    return <StructureViewer source={{ kind: 'sdf', url: sdfUrl(compound.cid) }} label={title} />;
  if (full) return <ElementStructure el={full} />;
  return <p className="text-sm text-muted">{t('loading')}</p>;
}

/** Phương trình: ẩn hệ số, bấm hiện kết quả cân bằng (cùng thuật toán công cụ Cân bằng). */
function BalanceWidget({ equation }: { equation: string }) {
  const t = useTranslations('lesson');
  const [shown, setShown] = useState(false);
  const r = balance(equation);
  if (!r.ok) return <code className="text-sm">{equation}</code>;
  const { species, reactantCount } = r.value.equation;
  const co = r.value.coefficients;
  const side = (from: number, to: number) =>
    species.slice(from, to).map((s, i) => (
      <span key={from + i} className="whitespace-nowrap">
        {i > 0 && ' + '}
        {shown && co[from + i] !== 1n && <b>{String(co[from + i])} </b>}
        <FormulaText tokens={s.formula.display} />
      </span>
    ));
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-surface p-4 shadow-card">
      <p className="text-lg leading-relaxed">
        {side(0, reactantCount)} <span aria-label={t('yields')}>→</span>{' '}
        {side(reactantCount, species.length)}
      </p>
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-pressed={shown}
        className="rounded-xl bg-fg px-3 py-1.5 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {shown ? t('hideCoefficients') : t('showCoefficients')}
      </button>
    </div>
  );
}

function MolarMassWidget({ formula }: { formula: string }) {
  const t = useTranslations('lesson');
  const locale = useLocale();
  const parsed = parseFormula(formula);
  if (!parsed.ok) return <code className="text-sm">{formula}</code>;
  const masses = Object.fromEntries(ELEMENTS.map((e) => [e.symbol, e.atomicMass]));
  const rows = [...parsed.value.composition].map(([sym, count]) => ({
    sym,
    count,
    mass: masses[sym]!,
  }));
  return (
    <div className="space-y-2 rounded-2xl border border-border bg-surface p-4 shadow-card">
      <p className="text-lg">
        <FormulaText tokens={parsed.value.display} />
      </p>
      <table className="tabular w-full text-sm">
        <thead className="text-left text-xs text-muted">
          <tr>
            <th className="py-1 font-normal">{t('molarElement')}</th>
            <th className="py-1 text-right font-normal">{t('molarCount')}</th>
            <th className="py-1 text-right font-normal">{t('molarAtomic')}</th>
            <th className="py-1 text-right font-normal">{t('molarSubtotal')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.sym} className={cn('border-t border-border')}>
              <td className="py-1">{r.sym}</td>
              <td className="py-1 text-right">{r.count}</td>
              <td className="py-1 text-right">{formatNumber(r.mass, locale, 3)}</td>
              <td className="py-1 text-right">{formatNumber(r.mass * r.count, locale, 3)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-border font-semibold">
            <td className="py-1" colSpan={3}>
              M
            </td>
            <td className="py-1 text-right">
              {formatNumber(molarMass(parsed.value, masses), locale, 3)} g/mol
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/** Một widget tương tác trong bài học, kèm chú thích và nguồn. */
export function LessonWidget({ block }: { block: WidgetBlock }) {
  const t = useTranslations('lesson');
  const locale = useLocale() as 'vi' | 'en';
  let body: React.ReactNode;
  switch (block.widget) {
    case 'atom-model':
      body = <AtomModel symbol={block.props.element} />;
      break;
    case 'electron-config':
      body = <ElectronConfig symbol={block.props.element} />;
      break;
    case 'table-highlight':
      body = <TableHighlight props={block.props} />;
      break;
    case 'trend':
      body = <Trend property={block.props.property} />;
      break;
    case 'structure-3d':
      body = <Structure3D props={block.props} />;
      break;
    case 'balance':
      body = <BalanceWidget equation={block.props.equation} />;
      break;
    case 'molar-mass':
      body = <MolarMassWidget formula={block.props.formula} />;
      break;
  }
  return (
    <figure className="space-y-2">
      {body}
      {block.caption && (
        <figcaption className="text-sm text-muted">
          {block.caption[locale]} ·{' '}
          <a
            href={block.source}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-fg"
          >
            {t('source')}
          </a>
        </figcaption>
      )}
    </figure>
  );
}

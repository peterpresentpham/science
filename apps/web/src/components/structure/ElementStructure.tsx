'use client';

import { parseFormula } from '@chem/core';
import type { ElementFull } from '@chem/data';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { FormulaText } from '@/components/tools/FormulaText';
import { Link } from '@/i18n/navigation';
import { BASE_PATH } from '@/lib/elements';
import { cn } from '@/lib/format';
import { useNearScreen } from '@/lib/use-near-screen';

import { type StructureSource, StructureViewer } from './StructureViewer';

const sdf = (cid: number) => `${BASE_PATH}/data/compounds/${cid}.sdf`;

/** Thẻ "Cấu trúc": đơn chất 3D (mạng tinh thể hoặc phân tử) + danh sách hợp chất tiêu biểu. */
export function ElementStructure({ el }: { el: ElementFull }) {
  const t = useTranslations('structure');
  const locale = useLocale();
  const [idx, setIdx] = useState(0);
  const [ref, near] = useNearScreen<HTMLDivElement>();
  const name = locale === 'vi' ? el.name.vi : el.name.en;
  const st = el.structures[Math.min(idx, el.structures.length - 1)];
  const stLabel = (s: ElementFull['structures'][number]) =>
    s.label
      ? locale === 'vi'
        ? s.label.vi
        : s.label.en
      : s.kind === 'crystal'
        ? t(`lattice.${s.lattice}`)
        : name;
  const source: StructureSource | null = !st
    ? null
    : st.kind === 'molecule'
      ? { kind: 'sdf', url: sdf(st.cid) }
      : {
          kind: 'crystal',
          spec: { lattice: st.lattice, a: st.a, c: st.c, alpha: st.alpha },
          symbols: [el.symbol],
        };

  return (
    <div className="space-y-6">
      <div ref={ref} className="space-y-3">
        <h3 className="font-display text-lg font-semibold">{t('elementTitle', { name })}</h3>
        {el.structures.length > 1 && (
          <div className="flex flex-wrap gap-1.5" role="tablist">
            {el.structures.map((s, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === idx}
                onClick={() => setIdx(i)}
                className={cn(
                  'rounded-full border px-3 py-1 text-sm',
                  i === idx ? 'border-fg bg-fg text-bg' : 'border-border hover:border-fg/40'
                )}
              >
                {stLabel(s)}
              </button>
            ))}
          </div>
        )}
        {st && el.structures.length === 1 && <p className="text-sm text-muted">{stLabel(st)}</p>}
        {source ? (
          near ? (
            <StructureViewer
              key={`${el.z}-${idx}`}
              source={source}
              label={t('viewerLabel', { name: stLabel(st!) })}
            />
          ) : (
            <div className="aspect-[4/3] w-full rounded-2xl border border-border bg-bg" />
          )
        ) : (
          <p className="text-sm text-muted">{t('noStructure')}</p>
        )}
      </div>

      {el.compounds.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold">{t('compoundsTitle')}</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {el.compounds.map((c) => {
              const f = parseFormula(c.formula);
              return (
                <li key={c.cid}>
                  <Link
                    href={`/compound/${c.cid}`}
                    className="flex items-baseline gap-2 rounded-xl border border-border px-3 py-2 hover:border-fg/40"
                  >
                    <span className="min-w-20 font-mono font-semibold">
                      {f.ok ? <FormulaText tokens={f.value.display} /> : c.formula}
                    </span>
                    <span className="truncate text-sm text-muted">
                      {locale === 'vi' && c.vi ? c.vi : c.en}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

'use client';

import { electronConfiguration, ionConfiguration, toNotation } from '@chem/core';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/format';
import { boxRows } from '@/lib/orbital-boxes';

import { OrbitalBoxDiagram } from './OrbitalBoxDiagram';

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
};

/** "Fe²⁺", "Cl⁻", "O²⁻" */
export function ionSymbol(symbol: string, charge: number): string {
  if (charge === 0) return symbol;
  const mag = Math.abs(charge) === 1 ? '' : String(Math.abs(charge)).replace(/\d/g, (d) => SUP[d]!);
  return `${symbol}${mag}${charge > 0 ? '⁺' : '⁻'}`;
}

/**
 * Chọn số oxi hoá → cấu hình của ion, so với nguyên tử trung hoà: electron bị lấy đi hiện mờ,
 * electron nhận thêm được làm nổi bật. Chỉ hiện các số oxi hoá có trong dữ liệu.
 */
export function IonExplorer({
  z,
  symbol,
  color,
  oxidationStates,
}: {
  z: number;
  symbol: string;
  color: string;
  oxidationStates: number[];
}) {
  const t = useTranslations('atom');
  const charges = useMemo(
    () =>
      [...new Set(oxidationStates)]
        .filter((c) => c !== 0 && c <= z && c >= -4)
        .sort((a, b) => a - b),
    [oxidationStates, z]
  );
  const [charge, setCharge] = useState<number>(() => charges.find((c) => c > 0) ?? charges[0] ?? 0);
  const neutral = useMemo(() => electronConfiguration(z), [z]);
  const ion = useMemo(() => ionConfiguration(z, charge), [z, charge]);

  if (charges.length === 0) return <p className="text-sm text-muted">{t('ion.none')}</p>;

  const rows = boxRows(ion, neutral);
  const notation = (cfg: typeof ion) =>
    cfg.length ? toNotation(cfg, { nobleGasCore: true, superscript: true }) : t('ion.bare');

  return (
    <div className="space-y-4">
      <div
        className="flex flex-wrap items-center gap-1.5 text-sm"
        role="group"
        aria-label={t('ion.pick')}
      >
        <span className="mr-1 text-xs text-muted">{t('ion.pick')}</span>
        {charges.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={charge === c}
            onClick={() => setCharge(c)}
            className={cn(
              'rounded-full border px-3 py-1 font-semibold',
              charge === c ? 'border-fg bg-fg text-bg' : 'border-border hover:border-fg/40'
            )}
          >
            {ionSymbol(symbol, c)}
          </button>
        ))}
      </div>
      <dl className="grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted">{t('ion.atom', { symbol })}</dt>
          <dd className="mt-1 font-mono">{notation(neutral)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{t('ion.ion', { ion: ionSymbol(symbol, charge) })}</dt>
          <dd className="mt-1 font-mono font-semibold">{notation(ion)}</dd>
        </div>
      </dl>
      <p className="text-sm text-muted">
        {charge > 0
          ? t('ion.cationRule', { count: charge })
          : t('ion.anionRule', { count: -charge })}
      </p>
      <OrbitalBoxDiagram
        rows={rows}
        color={color}
        labels={{ added: t('added'), removed: t('removed') }}
      />
    </div>
  );
}

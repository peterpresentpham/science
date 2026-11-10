'use client';

import { parseFormula } from '@chem/core';
import { normalizeSearch } from '@chem/data/lenses';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { FormulaText } from '@/components/tools/FormulaText';
import { Link, useRouter } from '@/i18n/navigation';

export interface IndexItem {
  cid: number;
  formula: string;
  name: string;
  other: string;
  elements: string[];
}

/** Danh sách hợp chất đã tuyển, lọc tại chỗ; không thấy thì tra PubChem. */
export function CompoundIndex({ items }: { items: IndexItem[] }) {
  const t = useTranslations('compound');
  const router = useRouter();
  const [q, setQ] = useState('');
  const norm = normalizeSearch(q);
  const list = useMemo(() => {
    if (!norm) return items;
    return items.filter(
      (c) =>
        normalizeSearch(`${c.name} ${c.other} ${c.formula}`).includes(norm) ||
        c.elements.some((e) => e.toLowerCase() === norm)
    );
  }, [items, norm]);

  return (
    <div className="space-y-4">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim() && list.length === 0)
            router.push(`/compound/view?q=${encodeURIComponent(q.trim())}`);
        }}
        className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 shadow-card focus-within:ring-2 focus-within:ring-ring"
      >
        <Search className="size-4 text-muted" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchLabel')}
          className="w-full bg-transparent py-3 outline-none"
        />
      </form>
      <p className="text-xs text-muted" aria-live="polite">
        {t('count', { count: list.length })}{' '}
        {q.trim() && (
          <Link
            href={`/compound/view?q=${encodeURIComponent(q.trim())}`}
            className="text-accent hover:underline"
          >
            {t('searchPubchem', { q: q.trim() })}
          </Link>
        )}
      </p>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => {
          const f = parseFormula(c.formula);
          return (
            <li key={c.cid}>
              <Link
                href={`/compound/${c.cid}`}
                className="flex h-full items-baseline gap-2 rounded-xl border border-border bg-surface px-3 py-2 hover:border-fg/40"
              >
                <span className="min-w-20 font-mono font-semibold">
                  {f.ok ? <FormulaText tokens={f.value.display} /> : c.formula}
                </span>
                <span className="text-sm text-muted">{c.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

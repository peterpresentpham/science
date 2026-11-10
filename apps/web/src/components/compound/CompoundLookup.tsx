'use client';

import { parseFormula } from '@chem/core';
import { ExternalLink, Search } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { StructureViewer } from '@/components/structure/StructureViewer';
import { FormulaText } from '@/components/tools/FormulaText';
import { Link } from '@/i18n/navigation';
import { BY_CID, pubchemUrl } from '@/lib/compounds';
import { formatNumber } from '@/lib/format';
import { findCid, getCompound, getSdf, type PubChemCompound } from '@/lib/pubchem';
import { setUrlParams, useUrlParam } from '@/lib/url-state';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'notFound'; q: string }
  | { status: 'error' }
  | { status: 'ok'; c: PubChemCompound; sdf: { text: string; dim: 2 | 3 } };

/** Xem một chất bất kỳ trên PubChem: tìm theo tên tiếng Anh hoặc CID (?q= / ?cid= trên URL). */
export function CompoundLookup() {
  const t = useTranslations('compound');
  const locale = useLocale();
  const [cidParam] = useUrlParam('cid');
  const [qParam] = useUrlParam('q');
  const query = cidParam ?? qParam ?? '';
  const [text, setText] = useState<string | null>(null);
  const [state, setState] = useState<State>({ status: 'idle' });

  useEffect(() => {
    if (!query) return;
    let alive = true;
    // Bắt đầu tải: đặt trạng thái qua microtask để không gọi setState đồng bộ trong effect
    void Promise.resolve().then(() => alive && setState({ status: 'loading' }));
    (async () => {
      try {
        const cid = await findCid(query);
        if (!alive) return;
        if (!cid) return setState({ status: 'notFound', q: query });
        const [c, sdf] = await Promise.all([getCompound(cid), getSdf(cid)]);
        if (alive) setState({ status: 'ok', c, sdf });
      } catch {
        if (alive) setState({ status: 'error' });
      }
    })();
    return () => {
      alive = false;
    };
  }, [query]);

  const value = text ?? query;
  const curated = state.status === 'ok' ? BY_CID.get(state.c.cid) : undefined;
  const f = state.status === 'ok' ? parseFormula(state.c.formula) : null;

  return (
    <div className="space-y-5">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const v = value.trim();
          if (!v) return;
          setUrlParams(/^\d+$/.test(v) ? { cid: v, q: null } : { q: v, cid: null });
        }}
        className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 shadow-card focus-within:ring-2 focus-within:ring-ring"
      >
        <Search className="size-4 text-muted" aria-hidden />
        <input
          value={value}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('lookupPlaceholder')}
          aria-label={t('lookupLabel')}
          className="w-full bg-transparent py-3 outline-none"
        />
        <button type="submit" className="rounded-full bg-fg px-3 py-1 text-sm text-bg">
          {t('lookupButton')}
        </button>
      </form>
      <p className="text-xs text-muted">{t('lookupHint')}</p>

      {state.status === 'loading' && <p className="text-sm text-muted">{t('loading')}</p>}
      {state.status === 'notFound' && (
        <p role="alert" className="text-sm">
          {t('notFound', { q: state.q })}
        </p>
      )}
      {state.status === 'error' && (
        <p role="alert" className="text-sm">
          {t('networkError')}
        </p>
      )}
      {state.status === 'ok' && (
        <div className="space-y-4">
          <header className="space-y-1">
            <p className="font-mono text-3xl font-semibold">
              {f?.ok ? <FormulaText tokens={f.value.display} /> : state.c.formula}
            </p>
            <h2 className="font-display text-2xl font-semibold">{state.c.title}</h2>
            {curated && (
              <Link
                href={`/compound/${curated.cid}`}
                className="text-sm text-accent hover:underline"
              >
                {t('curatedLink')}
              </Link>
            )}
          </header>
          <section className="rounded-3xl border border-border bg-surface p-5 shadow-card">
            <StructureViewer
              key={state.c.cid}
              source={{ kind: 'sdfText', text: state.sdf.text }}
              label={t('viewerLabel', { name: state.c.title })}
            />
          </section>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">{t('molarMass')}</dt>
              <dd className="tabular font-mono">{formatNumber(state.c.mw, locale, 3)} g/mol</dd>
            </div>
            {state.c.iupac && (
              <div>
                <dt className="text-xs text-muted">{t('iupac')}</dt>
                <dd className="break-words">{state.c.iupac}</dd>
              </div>
            )}
            {state.c.smiles && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted">SMILES</dt>
                <dd className="font-mono break-all">{state.c.smiles}</dd>
              </div>
            )}
          </dl>
          <p className="text-xs text-muted">
            {t('source')}{' '}
            <a
              href={pubchemUrl(state.c.cid)}
              className="inline-flex items-center gap-0.5 underline"
              rel="noopener"
            >
              PubChem CID {state.c.cid} <ExternalLink className="size-3" aria-hidden />
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

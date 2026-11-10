import { molarMass, parseFormula } from '@chem/core';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CompoundStructure } from '@/components/compound/CompoundStructure';
import { breadcrumbLd, JsonLd } from '@/components/seo/JsonLd';
import { FormulaText } from '@/components/tools/FormulaText';
import { Link } from '@/i18n/navigation';
import { BY_CID, compoundName, COMPOUNDS, pubchemUrl, sdfUrl } from '@/lib/compounds';
import { BY_SLUG, categoryColor } from '@/lib/elements';
import { formatNumber } from '@/lib/format';
import { MASSES } from '@/lib/masses';
import { abs, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPOUNDS.map((c) => ({ cid: String(c.cid) }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/compound/[cid]'>): Promise<Metadata> {
  const { locale, cid } = await params;
  const c = BY_CID.get(Number(cid));
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: 'compound' });
  const name = compoundName(c, locale);
  return pageMetadata({
    locale,
    path: `/compound/${c.cid}/`,
    title: t('metaTitle', { name, formula: c.formula }),
    description: t('metaDescription', {
      name,
      formula: c.formula,
      mw: formatNumber(c.mw, locale, 2),
      elements: c.elements.join(', '),
    }),
    type: 'article',
  });
}

export default async function CompoundPage({ params }: PageProps<'/[locale]/compound/[cid]'>) {
  const { locale, cid } = await params;
  setRequestLocale(locale);
  const c = BY_CID.get(Number(cid));
  if (!c) notFound();
  const t = await getTranslations('compound');
  const tm = await getTranslations('meta');
  const name = compoundName(c, locale);
  const other = locale === 'vi' ? c.en : c.vi;
  const parsed = parseFormula(c.formula);
  const M = parsed.ok ? molarMass(parsed.value, MASSES) : c.mw;
  const related = COMPOUNDS.filter(
    (x) => x.cid !== c.cid && !x.elemental && x.elements.some((e) => c.elements.includes(e))
  )
    .sort(
      (a, b) =>
        b.elements.filter((e) => c.elements.includes(e)).length -
        a.elements.filter((e) => c.elements.includes(e)).length
    )
    .slice(0, 8);

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <JsonLd
        data={[
          breadcrumbLd(locale, [
            [tm('home'), '/'],
            [t('indexTitle'), '/compound/'],
            [name, `/compound/${c.cid}/`],
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ChemicalSubstance',
            name,
            alternateName: [c.en, c.iupac].filter(Boolean),
            molecularFormula: c.formula,
            url: abs(`/${locale}/compound/${c.cid}/`),
            sameAs: pubchemUrl(c.cid),
          },
        ]}
      />
      <Link
        href="/compound"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> {t('indexTitle')}
      </Link>

      <header className="space-y-2">
        <p className="font-mono text-4xl font-semibold">
          {parsed.ok ? <FormulaText tokens={parsed.value.display} /> : c.formula}
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">{name}</h1>
        {other && other !== name && <p className="text-muted">{other}</p>}
      </header>

      <section className="rounded-3xl border border-border bg-surface p-5 shadow-card">
        <CompoundStructure sdfUrl={sdfUrl(c.cid)} dim={c.dim} crystal={c.crystal} name={name} />
      </section>

      <section className="rounded-3xl border border-border bg-surface p-5 shadow-card">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted">{t('molarMass')}</dt>
            <dd className="tabular font-mono text-lg">
              {formatNumber(M, locale, 3)} g/mol{' '}
              <Link
                href={`/tools/molar-mass?f=${encodeURIComponent(c.formula)}`}
                className="ml-1 font-sans text-sm text-accent hover:underline"
              >
                {t('openMolar')}
              </Link>
            </dd>
          </div>
          {c.iupac && (
            <div>
              <dt className="text-xs text-muted">{t('iupac')}</dt>
              <dd className="break-words">{c.iupac}</dd>
            </div>
          )}
          {c.smiles && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted">SMILES</dt>
              <dd className="font-mono text-sm break-all">{c.smiles}</dd>
            </div>
          )}
          <div className="sm:col-span-2">
            <dt className="text-xs text-muted">{t('elements')}</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {c.elements.map((sym) => {
                const e = BY_SLUG.get(sym.toLowerCase());
                if (!e) return null;
                return (
                  <Link
                    key={sym}
                    href={`/element/${e.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-sm hover:border-fg/40"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ background: categoryColor(e.category) }}
                    />
                    <span className="font-semibold">{e.symbol}</span>
                    <span className="text-muted">{locale === 'vi' ? e.name.vi : e.name.en}</span>
                  </Link>
                );
              })}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-muted">
          {t('source')}{' '}
          <a
            href={pubchemUrl(c.cid)}
            className="inline-flex items-center gap-0.5 underline"
            rel="noopener"
          >
            PubChem CID {c.cid} <ExternalLink className="size-3" aria-hidden />
          </a>
        </p>
      </section>

      {related.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold">{t('related')}</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {related.map((r) => {
              const f = parseFormula(r.formula);
              return (
                <li key={r.cid}>
                  <Link
                    href={`/compound/${r.cid}`}
                    className="flex items-baseline gap-2 rounded-xl border border-border px-3 py-2 hover:border-fg/40"
                  >
                    <span className="min-w-20 font-mono font-semibold">
                      {f.ok ? <FormulaText tokens={f.value.display} /> : r.formula}
                    </span>
                    <span className="truncate text-sm text-muted">{compoundName(r, locale)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </article>
  );
}

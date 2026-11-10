import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CompoundIndex } from '@/components/compound/CompoundIndex';
import { breadcrumbLd, JsonLd } from '@/components/seo/JsonLd';
import { compoundName, COMPOUNDS } from '@/lib/compounds';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/compound'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'compound' });
  return pageMetadata({
    locale,
    path: '/compound/',
    title: t('indexTitle'),
    description: t('indexDescription', { count: COMPOUNDS.length }),
  });
}

export default async function CompoundIndexPage({ params }: PageProps<'/[locale]/compound'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('compound');
  const tm = await getTranslations('meta');
  const items = COMPOUNDS.map((c) => ({
    cid: c.cid,
    formula: c.formula,
    name: compoundName(c, locale),
    other: locale === 'vi' ? c.en : (c.vi ?? ''),
    elements: c.elements,
  })).sort((a, b) => a.name.localeCompare(b.name, locale));
  return (
    <article className="mx-auto max-w-5xl space-y-6">
      <JsonLd
        data={breadcrumbLd(locale, [
          [tm('home'), '/'],
          [t('indexTitle'), '/compound/'],
        ])}
      />
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('indexTitle')}</h1>
        <p className="text-muted">{t('indexIntro', { count: COMPOUNDS.length })}</p>
      </header>
      <CompoundIndex items={items} />
    </article>
  );
}

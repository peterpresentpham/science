import { nucleonCounts } from '@chem/core';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ElementDetail } from '@/components/element/ElementDetail';
import { breadcrumbLd, JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/i18n/navigation';
import { readElement } from '@/lib/element-data.server';
import { ELEMENTS } from '@/lib/elements';
import { formatNumber } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return ELEMENTS.map((e) => ({ symbol: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/element/[symbol]'>): Promise<Metadata> {
  const { locale, symbol } = await params;
  const el = await readElement(symbol);
  const t = await getTranslations({ locale, namespace: 'meta' });
  const tc = await getTranslations({ locale, namespace: 'category' });
  const { protons, neutrons } = nucleonCounts(el.z);
  const values = {
    name: locale === 'vi' ? el.name.vi : el.name.en,
    symbol: el.symbol,
    z: el.z,
    category: tc(el.category).toLowerCase(),
    mass: formatNumber(el.atomicMass, locale, 4),
    config: el.electronConfiguration,
    protons,
    neutrons,
  };
  return pageMetadata({
    locale,
    path: `/element/${el.slug}/`,
    title: t('elementTitle', values),
    description: t('elementDescription', values),
    type: 'article',
    image: el.slug,
  });
}

export default async function ElementPage({ params }: PageProps<'/[locale]/element/[symbol]'>) {
  const { locale, symbol } = await params;
  setRequestLocale(locale);
  const el = await readElement(symbol);
  const t = await getTranslations({ locale, namespace: 'element' });
  const tm = await getTranslations({ locale, namespace: 'meta' });
  const name = locale === 'vi' ? el.name.vi : el.name.en;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm text-muted hover:bg-surface-2 hover:text-fg"
      >
        <ArrowLeft className="size-4" /> {t('back')}
      </Link>
      <JsonLd
        data={breadcrumbLd(locale, [
          [tm('home'), '/'],
          [`${name} (${el.symbol})`, `/element/${el.slug}/`],
        ])}
      />
      <ElementDetail element={el} />
    </div>
  );
}

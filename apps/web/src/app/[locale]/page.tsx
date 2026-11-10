import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PeriodicTable } from '@/components/periodic-table/PeriodicTable';
import { JsonLd, websiteLd } from '@/components/seo/JsonLd';
import { ELEMENTS } from '@/lib/elements';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    path: '/',
    title: t('title'),
    description: t('description'),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'meta' });
  return (
    <>
      <JsonLd data={websiteLd(locale, t('description'))} />
      <PeriodicTable elements={ELEMENTS} />
    </>
  );
}

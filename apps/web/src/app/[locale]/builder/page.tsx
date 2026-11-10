import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { MoleculeBuilder } from '@/components/builder/MoleculeBuilder';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/builder'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'builder' });
  return pageMetadata({ locale, path: '/builder/', title: t('title'), description: t('intro') });
}

export default async function BuilderPage({ params }: PageProps<'/[locale]/builder'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('builder');
  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="text-muted">{t('intro')}</p>
      </header>
      <MoleculeBuilder />
    </article>
  );
}

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { LabApp } from '@/components/lab/LabApp';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/lab'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lab' });
  const m = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    path: '/lab/',
    title: t('title'),
    description: m('labDescription'),
  });
}

export default async function LabPage({ params }: PageProps<'/[locale]/lab'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('lab');
  const { lab } = await getMessages();

  return (
    <article className="mx-auto max-w-6xl space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="max-w-prose text-muted">{t('intro')}</p>
      </header>
      <NextIntlClientProvider messages={{ lab }}>
        <LabApp />
      </NextIntlClientProvider>
    </article>
  );
}

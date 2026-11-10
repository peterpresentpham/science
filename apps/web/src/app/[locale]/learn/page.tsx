import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { LearnApp } from '@/components/learn/LearnApp';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/learn'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'learn' });
  return pageMetadata({ locale, path: '/learn/', title: t('title'), description: t('intro') });
}

export default async function LearnPage({ params }: PageProps<'/[locale]/learn'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('learn');
  const { learn, category } = await getMessages();
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="text-muted">{t('intro')}</p>
      </header>
      {/* Các thành phần học chỉ cần `learn` và tên loại nguyên tố (`category`) */}
      <NextIntlClientProvider messages={{ learn, category }}>
        <LearnApp />
      </NextIntlClientProvider>
    </article>
  );
}

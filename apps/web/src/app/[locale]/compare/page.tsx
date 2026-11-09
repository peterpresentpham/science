import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CompareView } from '@/components/compare/CompareView';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/compare'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'compare' });
  return { title: t('title'), alternates: { canonical: `/${locale}/compare/` } };
}

/** Trang tĩnh; danh sách nguyên tố nằm trên query string (?z=11,19,37) và được đọc ở client. */
export default async function ComparePage({ params }: PageProps<'/[locale]/compare'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('compare');
  return (
    <article className="mx-auto max-w-6xl space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="text-muted">{t('intro')}</p>
      </header>
      <CompareView />
    </article>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CompoundLookup } from '@/components/compound/CompoundLookup';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/compound/view'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'compound' });
  return {
    ...pageMetadata({
      locale,
      path: '/compound/view/',
      title: t('lookupTitle'),
      description: t('lookupIntro'),
    }),
    // Nội dung tải phía client theo ?cid=, không có gì để lập chỉ mục
    robots: { index: false, follow: true },
  };
}

/** Trang tĩnh; chất cần xem nằm trên URL (?cid= hoặc ?q=) và được tải từ PubChem phía client. */
export default async function CompoundViewPage({ params }: PageProps<'/[locale]/compound/view'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('compound');
  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('lookupTitle')}</h1>
        <p className="text-muted">{t('lookupIntro')}</p>
      </header>
      <CompoundLookup />
    </article>
  );
}

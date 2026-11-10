import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { OfflinePacks } from '@/components/offline/OfflinePacks';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/offline'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offline' });
  return {
    ...pageMetadata({
      locale,
      path: '/offline/',
      title: t('title'),
      description: t('intro'),
    }),
    // Trang quản lý cục bộ, không có nội dung để lập chỉ mục
    robots: { index: false, follow: true },
  };
}

/** Trang "Dùng offline": giải thích và cho tải gói dữ liệu để dùng khi mất mạng (lớp học, trên đường). */
export default async function OfflinePage({ params }: PageProps<'/[locale]/offline'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('offline');
  const { offline } = await getMessages();
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="text-muted">{t('intro')}</p>
      </header>

      <section aria-labelledby="offline-fallback" className="rounded-2xl bg-surface-2 p-4 text-sm">
        <h2 id="offline-fallback" className="font-display font-semibold">
          {t('fallbackTitle')}
        </h2>
        <p className="mt-1 leading-relaxed">{t('fallbackText')}</p>
      </section>

      <section aria-labelledby="offline-packs" className="space-y-3">
        <h2 id="offline-packs" className="font-display text-xl font-semibold">
          {t('packsTitle')}
        </h2>
        <p className="text-sm text-muted">{t('packsIntro')}</p>
        <NextIntlClientProvider messages={{ offline }}>
          <OfflinePacks />
        </NextIntlClientProvider>
      </section>

      <section aria-labelledby="offline-how" className="space-y-2 text-sm leading-relaxed">
        <h2 id="offline-how" className="font-display text-xl font-semibold">
          {t('howTitle')}
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-muted">
          <li>{t('how1')}</li>
          <li>{t('how2')}</li>
          <li>{t('how3')}</li>
        </ul>
      </section>
    </article>
  );
}

import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { ServiceWorker } from '@/components/layout/ServiceWorker';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/elements';
import { type Locale, SITE_NAME } from '@/lib/seo';

const sans = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  variable: '--font-be-vietnam',
  display: 'swap',
  // Không preload: 6 file font chữ thân sẽ tranh băng thông với CSS và làm chậm LCP trên mạng yếu.
  // Font fallback đã được next/font chỉnh số đo nên lúc đổi font gần như không xê dịch layout.
  preload: false,
});
const display = Bricolage_Grotesque({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-bricolage',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const name = SITE_NAME[locale as Locale];
  return {
    // metadataBase giúp mọi link trong metadata (hreflang, canonical, ảnh OG) thành URL tuyệt đối
    metadataBase: new URL(`${SITE_URL}/`),
    // Trang con chỉ đặt phần đầu; tên site được nối vào sau
    title: { default: t('title'), template: `%s · ${name}` },
    description: t('description'),
    applicationName: name,
    appleWebApp: { title: name, capable: true, statusBarStyle: 'default' },
    formatDetection: { telephone: false, address: false, email: false },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    category: 'education',
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#101219' },
  ],
  colorScheme: 'light dark',
};

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'footer' });
  const tc = await getTranslations({ locale, namespace: 'credits' });
  // Không nhúng vào mọi trang những thông điệp chỉ dùng ở một nơi: `meta` chỉ dùng phía máy chủ,
  // `learn` và `offline` được trang của chúng tự cấp (xem LearnPage, OfflinePage)
  const { meta: _meta, learn: _learn, offline: _offline, ...messages } = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh">
        <ThemeProvider attribute="data-theme" defaultTheme="light" disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <ServiceWorker />
            <SiteHeader />
            <main className="mx-auto max-w-[92rem] px-4 py-6">{children}</main>
            <footer className="mx-auto flex max-w-[92rem] flex-wrap justify-between gap-2 px-4 py-8 font-mono text-[0.7rem] text-muted">
              <span>{t('data')}</span>
              <span className="flex gap-4">
                <Link href="/offline" className="underline-offset-2 hover:text-fg hover:underline">
                  {t('offline')}
                </Link>
                <Link href="/credits" className="underline-offset-2 hover:text-fg hover:underline">
                  {tc('link')}
                </Link>
              </span>
            </footer>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

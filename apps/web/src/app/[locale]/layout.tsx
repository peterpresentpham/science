import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { SiteHeader } from '@/components/layout/SiteHeader';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/elements';

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
  return {
    // metadataBase giúp mọi link trong metadata (hreflang, canonical) thành URL tuyệt đối
    metadataBase: new URL(`${SITE_URL}/`),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/`,
      languages: { vi: '/vi/', en: '/en/', 'x-default': '/vi/' },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'footer' });
  const tc = await getTranslations({ locale, namespace: 'credits' });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh">
        <ThemeProvider attribute="data-theme" defaultTheme="light" disableTransitionOnChange>
          <NextIntlClientProvider>
            <SiteHeader />
            <main className="mx-auto max-w-[92rem] px-4 py-6">{children}</main>
            <footer className="mx-auto flex max-w-[92rem] flex-wrap justify-between gap-2 px-4 py-8 font-mono text-[0.7rem] text-muted">
              <span>{t('data')}</span>
              <Link href="/credits" className="underline-offset-2 hover:text-fg hover:underline">
                {tc('link')}
              </Link>
            </footer>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

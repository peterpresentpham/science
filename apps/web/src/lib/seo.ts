import type { Metadata } from 'next';

import { routing } from '@/i18n/routing';

import { BASE_PATH, SITE_URL } from './elements';

export type Locale = (typeof routing.locales)[number];

/** Tên hiển thị của site. Đổi tên thì sửa ở đây (và trong manifest.ts). */
export const SITE_NAME: Record<Locale, string> = { vi: 'Nguyên tố', en: 'Nguyên tố' };
export const THEME_COLOR = '#4b3fc4';
const OG_LOCALE: Record<Locale, string> = { vi: 'vi_VN', en: 'en_US' };

/** URL tuyệt đối (đã có basePath) của một đường dẫn trong site, vd. abs('/vi/tools/') */
export const abs = (path: string) => `${SITE_URL}${path}`;

/**
 * Metadata chuẩn cho một trang: title, description, canonical, hreflang (vi/en/x-default),
 * Open Graph và Twitter. `path` là phần sau mã ngôn ngữ, có "/" ở đầu và cuối (trang chủ: "/").
 * Ảnh OG là file PNG tĩnh do route `app/og/[locale]/[file]` sinh lúc build.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle,
  type = 'website',
  image = 'site',
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  /** true: không nối thêm "· tên site" vào title (trang chủ) */
  absoluteTitle?: boolean;
  type?: 'website' | 'article';
  /** Tên ảnh OG trong /og/<locale>/: "site" (mặc định) hoặc slug nguyên tố */
  image?: string;
}): Metadata {
  const loc = locale as Locale;
  const url = `/${loc}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME[loc]}`;
  const ogImage = { url: `/og/${loc}/${image}.png`, width: 1200, height: 630, alt: fullTitle };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
        'x-default': `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME[loc],
      title: fullTitle,
      description,
      locale: OG_LOCALE[loc],
      alternateLocale: routing.locales.filter((l) => l !== loc).map((l) => OG_LOCALE[l]),
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [ogImage.url] },
  };
}

/** Các đường dẫn tĩnh (ngoài trang nguyên tố) để đưa vào sitemap. */
export const STATIC_PATHS = [
  { path: '/', priority: 1 },
  { path: '/tools/', priority: 0.8 },
  { path: '/timeline/', priority: 0.6 },
  { path: '/lessons/', priority: 0.7 },
  { path: '/lab/', priority: 0.8 },
  { path: '/tools/molar-mass/', priority: 0.8 },
  { path: '/tools/balance/', priority: 0.8 },
  { path: '/tools/solubility/', priority: 0.7 },
  { path: '/tools/activity/', priority: 0.7 },
  { path: '/tools/trends/', priority: 0.6 },
  { path: '/compound/', priority: 0.7 },
  { path: '/compare/', priority: 0.5 },
  { path: '/learn/', priority: 0.6 },
  { path: '/builder/', priority: 0.6 },
  { path: '/credits/', priority: 0.2 },
] as const;

export const iconUrl = (file: string) => `${BASE_PATH}/${file}`;

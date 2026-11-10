import { abs, type Locale, SITE_NAME } from '@/lib/seo';

/** Dữ liệu có cấu trúc schema.org. Escape "<" để chuỗi không thể đóng thẻ script. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/** Breadcrumb: [[tên, path sau mã ngôn ngữ], ...], bắt đầu từ trang chủ. */
export function breadcrumbLd(locale: string, items: Array<[string, string]>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: abs(`/${locale}${path}`),
    })),
  };
}

export function websiteLd(locale: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME[locale as Locale],
    url: abs(`/${locale}/`),
    inLanguage: locale,
    description,
  };
}

/** Công cụ tính toán chạy trên trình duyệt, miễn phí */
export function webAppLd(locale: string, path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: abs(`/${locale}${path}`),
    inLanguage: locale,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND' },
  };
}

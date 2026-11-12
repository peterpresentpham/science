import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { COMPOUNDS } from '@/lib/compounds';
import { ELEMENTS } from '@/lib/elements';
import { readLessons } from '@/lib/learning.server';
import { abs, STATIC_PATHS } from '@/lib/seo';

export const dynamic = 'force-static';

/** sitemap.xml: mọi trang ở cả hai ngôn ngữ, kèm liên kết hreflang giữa các bản dịch. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const paths = [
    ...STATIC_PATHS,
    ...ELEMENTS.map((e) => ({ path: `/element/${e.slug}/`, priority: 0.9 })),
    ...COMPOUNDS.map((c) => ({ path: `/compound/${c.cid}/`, priority: 0.6 })),
    ...(await readLessons()).map((l) => ({ path: `/lessons/${l.id}/`, priority: 0.7 })),
  ];
  return paths.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: abs(`/${locale}${path}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(routing.locales.map((l) => [l, abs(`/${l}${path}`)])),
          'x-default': abs(`/${routing.defaultLocale}${path}`),
        },
      },
    }))
  );
}

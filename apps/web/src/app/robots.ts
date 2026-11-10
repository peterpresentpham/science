import type { MetadataRoute } from 'next';

import { abs } from '@/lib/seo';

export const dynamic = 'force-static';

/*
 * Lưu ý: crawler chỉ đọc robots.txt ở gốc tên miền. Nếu site nằm dưới đường dẫn con
 * (GitHub Pages: user.github.io/science/) thì file này không có tác dụng; khi đó hãy khai báo
 * sitemap trực tiếp trong Google Search Console.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: abs('/sitemap.xml'),
  };
}

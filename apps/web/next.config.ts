import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Host dưới đường dẫn con (ví dụ example.com/app): NEXT_PUBLIC_BASE_PATH=/app
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

// canonical, hreflang, sitemap, og:image đều cần URL tuyệt đối thật; thiếu thì sẽ trỏ về localhost
if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    '\n⚠ NEXT_PUBLIC_SITE_URL chưa được đặt: link SEO (canonical, sitemap, og:image) sẽ trỏ về http://localhost:3000.\n' +
      '  Ví dụ: NEXT_PUBLIC_SITE_URL=https://example.com pnpm build\n'
  );
}

const config: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ['@chem/core', '@chem/data'],
  reactStrictMode: true,
};

export default withNextIntl(config);

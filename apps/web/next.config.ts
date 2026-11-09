import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Host dưới đường dẫn con (ví dụ GitHub Pages): NEXT_PUBLIC_BASE_PATH=/chemistry
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const config: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ['@chem/core', '@chem/data'],
  reactStrictMode: true,
};

export default withNextIntl(config);

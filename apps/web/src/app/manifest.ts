import type { MetadataRoute } from 'next';

import { BASE_PATH } from '@/lib/elements';
import { iconUrl, SITE_NAME, THEME_COLOR } from '@/lib/seo';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME.vi}: Bảng tuần hoàn tương tác`,
    short_name: SITE_NAME.vi,
    description:
      'Bảng tuần hoàn hoá học tương tác: 118 nguyên tố, mô hình nguyên tử 3D, công cụ tính toán.',
    start_url: `${BASE_PATH}/vi/`,
    scope: `${BASE_PATH}/`,
    display: 'standalone',
    background_color: '#f9f6f2',
    theme_color: THEME_COLOR,
    lang: 'vi',
    categories: ['education', 'science'],
    icons: [
      { src: iconUrl('icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: iconUrl('icon-512.png'), sizes: '512x512', type: 'image/png' },
      {
        src: iconUrl('icon-maskable-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

import { routing } from '@/i18n/routing';
import { ELEMENTS } from '@/lib/elements';
import { elementImage, siteImage } from '@/lib/og-images';

/*
 * Ảnh Open Graph xuất thành file .png thật (/og/vi/fe.png, /og/vi/site.png).
 * Không dùng file `opengraph-image.tsx`: khi export tĩnh, Next ghi ra file không có đuôi,
 * host tĩnh (GitHub Pages) trả về kiểu application/octet-stream và mạng xã hội có thể bỏ qua ảnh.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    { locale, file: 'site.png' },
    ...ELEMENTS.map((e) => ({ locale, file: `${e.slug}.png` })),
  ]);
}

export async function GET(_req: Request, { params }: RouteContext<'/og/[locale]/[file]'>) {
  const { locale, file } = await params;
  const slug = file.replace(/\.png$/, '');
  return slug === 'site' ? siteImage(locale) : elementImage(locale, slug);
}

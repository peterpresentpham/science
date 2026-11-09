import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ElementDetail } from '@/components/element/ElementDetail';
import { Link } from '@/i18n/navigation';
import { readElement } from '@/lib/element-data.server';
import { ELEMENTS } from '@/lib/elements';
import { formatNumber } from '@/lib/format';

export const dynamicParams = false;

export function generateStaticParams() {
  return ELEMENTS.map((e) => ({ symbol: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/element/[symbol]'>): Promise<Metadata> {
  const { locale, symbol } = await params;
  const el = await readElement(symbol);
  const t = await getTranslations({ locale, namespace: 'meta' });
  const values = {
    name: el.name.vi,
    nameEn: el.name.en,
    symbol: el.symbol,
    z: el.z,
    mass: formatNumber(el.atomicMass, locale, 4),
    config: el.electronConfiguration,
  };
  return {
    title: t('elementTitle', values),
    description: t('elementDescription', values),
    alternates: {
      canonical: `/${locale}/element/${el.slug}/`,
      languages: {
        vi: `/vi/element/${el.slug}/`,
        en: `/en/element/${el.slug}/`,
        'x-default': `/vi/element/${el.slug}/`,
      },
    },
  };
}

export default async function ElementPage({ params }: PageProps<'/[locale]/element/[symbol]'>) {
  const { locale, symbol } = await params;
  setRequestLocale(locale);
  const el = await readElement(symbol);
  const t = await getTranslations({ locale, namespace: 'element' });

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm text-muted hover:bg-surface-2 hover:text-fg"
      >
        <ArrowLeft className="size-4" /> {t('back')}
      </Link>
      <ElementDetail element={el} />
    </div>
  );
}

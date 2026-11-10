import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { MolarMassTool } from '@/components/tools/MolarMassTool';
import { ToolPage } from '@/components/tools/ToolPage';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/tools/molar-mass'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.tool.molar' });
  return pageMetadata({
    locale,
    path: '/tools/molar-mass/',
    title: t('title'),
    description: t('description'),
  });
}

export default async function Page({ params }: PageProps<'/[locale]/tools/molar-mass'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ToolPage id="molar" path="/tools/molar-mass/">
      <MolarMassTool />
    </ToolPage>
  );
}

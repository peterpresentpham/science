import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SolubilityTable } from '@/components/tools/SolubilityTable';
import { ToolPage } from '@/components/tools/ToolPage';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/tools/solubility'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.tool.solubility' });
  return pageMetadata({
    locale,
    path: '/tools/solubility/',
    title: t('title'),
    description: t('description'),
  });
}

export default async function Page({ params }: PageProps<'/[locale]/tools/solubility'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ToolPage id="solubility" path="/tools/solubility/" wide>
      <SolubilityTable />
    </ToolPage>
  );
}

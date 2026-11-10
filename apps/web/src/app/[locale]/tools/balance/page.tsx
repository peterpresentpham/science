import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { BalanceTool } from '@/components/tools/BalanceTool';
import { ToolPage } from '@/components/tools/ToolPage';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/tools/balance'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.tool.balance' });
  return pageMetadata({
    locale,
    path: '/tools/balance/',
    title: t('title'),
    description: t('description'),
  });
}

export default async function Page({ params }: PageProps<'/[locale]/tools/balance'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ToolPage id="balance" path="/tools/balance/">
      <BalanceTool />
    </ToolPage>
  );
}

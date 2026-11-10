import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ToolPage } from '@/components/tools/ToolPage';
import { TrendsTool } from '@/components/tools/TrendsTool';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/tools/trends'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.tool.trends' });
  return pageMetadata({
    locale,
    path: '/tools/trends/',
    title: t('title'),
    description: t('description'),
  });
}

export default async function Page({ params }: PageProps<'/[locale]/tools/trends'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ToolPage id="trends" path="/tools/trends/" wide>
      <TrendsTool />
    </ToolPage>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ActivitySeries } from '@/components/tools/ActivitySeries';
import { ToolPage } from '@/components/tools/ToolPage';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/tools/activity'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.tool.activity' });
  return pageMetadata({
    locale,
    path: '/tools/activity/',
    title: t('title'),
    description: t('description'),
  });
}

export default async function Page({ params }: PageProps<'/[locale]/tools/activity'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ToolPage id="activity" path="/tools/activity/">
      <ActivitySeries />
    </ToolPage>
  );
}

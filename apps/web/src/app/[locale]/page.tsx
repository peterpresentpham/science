import { setRequestLocale } from 'next-intl/server';

import { PeriodicTable } from '@/components/periodic-table/PeriodicTable';
import { ELEMENTS } from '@/lib/elements';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PeriodicTable elements={ELEMENTS} />;
}

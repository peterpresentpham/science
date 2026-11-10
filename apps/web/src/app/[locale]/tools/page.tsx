import { ArrowRight, Atom, ChartLine, Droplets, FlaskConical, Scale } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { breadcrumbLd, JsonLd } from '@/components/seo/JsonLd';
import { TOOL_IDS, TOOL_PATH } from '@/components/tools/ToolPage';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/seo';

const ICON = {
  molar: Scale,
  balance: FlaskConical,
  trends: ChartLine,
  solubility: Droplets,
  activity: Atom,
};

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/tools'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    path: '/tools/',
    title: t('toolsTitle'),
    description: t('toolsDescription'),
  });
}

export default async function ToolsPage({ params }: PageProps<'/[locale]/tools'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('tools');
  const m = await getTranslations('meta');
  return (
    <article className="mx-auto max-w-5xl space-y-6">
      <JsonLd
        data={breadcrumbLd(locale, [
          [m('home'), '/'],
          [t('hub.title'), '/tools/'],
        ])}
      />
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('hub.title')}</h1>
        <p className="text-muted">{t('hub.intro')}</p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {TOOL_IDS.map((id) => {
          const Icon = ICON[id];
          return (
            <li key={id}>
              <Link
                href={TOOL_PATH[id]}
                className="group flex h-full gap-4 rounded-3xl border border-border bg-surface p-5 shadow-card transition hover:-translate-y-0.5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-surface-2">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 space-y-1">
                  <span className="flex items-center gap-1.5 font-display text-lg font-semibold">
                    {t(`${id}.title`)}
                    <ArrowRight
                      className="size-4 opacity-0 transition group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="block text-sm text-muted">{t(`${id}.intro`)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

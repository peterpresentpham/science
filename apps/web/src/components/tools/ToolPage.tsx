import { ArrowLeft } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { breadcrumbLd, JsonLd, webAppLd } from '@/components/seo/JsonLd';
import { Link } from '@/i18n/navigation';

/** Khung chung của các trang công cụ: link về trang Công cụ, tiêu đề, mô tả. */
export async function ToolPage({
  id,
  path,
  children,
  wide,
}: {
  id: string;
  /** Đường dẫn sau mã ngôn ngữ, vd. "/tools/balance/" (cho dữ liệu có cấu trúc) */
  path: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const t = await getTranslations('tools');
  const m = await getTranslations('meta');
  const locale = await getLocale();
  return (
    <article className={wide ? 'mx-auto max-w-6xl space-y-6' : 'mx-auto max-w-4xl space-y-6'}>
      <JsonLd
        data={[
          breadcrumbLd(locale, [
            [m('home'), '/'],
            [t('hub.title'), '/tools/'],
            [t(`${id}.title`), path],
          ]),
          webAppLd(locale, path, m(`tool.${id}.title`), m(`tool.${id}.description`)),
        ]}
      />
      <header className="space-y-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
        >
          <ArrowLeft className="size-3.5" aria-hidden /> {t('hub.title')}
        </Link>
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t(`${id}.title`)}</h1>
        <p className="text-muted">{t(`${id}.intro`)}</p>
      </header>
      {children}
    </article>
  );
}

export const TOOL_IDS = ['molar', 'balance', 'trends', 'solubility', 'activity'] as const;
export const TOOL_PATH: Record<(typeof TOOL_IDS)[number], string> = {
  molar: '/tools/molar-mass',
  balance: '/tools/balance',
  trends: '/tools/trends',
  solubility: '/tools/solubility',
  activity: '/tools/activity',
};

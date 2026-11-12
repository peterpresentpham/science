'use client';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/format';
import { LOCALE_STORAGE_KEY } from '@/lib/locale-storage';

/** Đổi ngôn ngữ, giữ nguyên phần đường dẫn sau locale (/vi/element/fe/ → /en/element/fe/). */
export function LocaleSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t('language')}
      className="flex rounded-full border border-border p-0.5 font-mono text-xs"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={l === locale}
          onClick={() => {
            if (l === locale) return;
            try {
              localStorage.setItem(LOCALE_STORAGE_KEY, l);
            } catch {
              // chế độ riêng tư / chặn lưu trữ: chỉ mất việc nhớ lựa chọn
            }
            router.replace(pathname, { locale: l });
          }}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase',
            l === locale ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

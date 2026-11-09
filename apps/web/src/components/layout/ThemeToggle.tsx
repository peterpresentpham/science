'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const t = useTranslations('nav');
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 text-muted hover:bg-surface-2 hover:text-fg"
      aria-label={t('theme')}
      title={t('theme')}
    >
      <Sun className="hidden size-5 dark:block" />
      <Moon className="size-5 dark:hidden" />
    </button>
  );
}

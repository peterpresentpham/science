'use client';

import { Check, GitCompareArrows } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { COMPARE_MAX, toggleCompare, useCompareList } from '@/lib/compare';
import { cn } from '@/lib/format';

/** Thêm/bỏ một nguyên tố khỏi khay so sánh (thay cho Shift + click trên màn hình cảm ứng). */
export function CompareButton({ z, className }: { z: number; className?: string }) {
  const t = useTranslations('compare');
  const list = useCompareList();
  const on = list.includes(z);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => toggleCompare(z)}
      title={on ? undefined : t('addHint', { max: COMPARE_MAX })}
      className={cn(
        'flex items-center gap-1 rounded-full px-3 py-1 text-sm hover:bg-surface-2',
        on ? 'text-fg' : 'text-muted',
        className
      )}
    >
      {on ? <Check className="size-3.5" /> : <GitCompareArrows className="size-3.5" />}
      {on ? t('added') : t('add')}
    </button>
  );
}

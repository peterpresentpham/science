'use client';

import type { Category } from '@chem/data';
import { CATEGORIES } from '@chem/data/constants';
import { useTranslations } from 'next-intl';

import { categoryColor } from '@/lib/elements';
import { cn } from '@/lib/format';

interface Props {
  active: Category | null;
  onActive: (c: Category | null) => void;
  /**
   * hover: rê chuột để làm nổi bật (bảng trên desktop).
   * toggle: bấm để lọc, bấm lại để bỏ (danh sách, màn hình cảm ứng).
   */
  mode?: 'hover' | 'toggle';
  className?: string;
}

export function CategoryLegend({ active, onActive, mode = 'hover', className }: Props) {
  const t = useTranslations('category');
  const hover = mode === 'hover';
  return (
    <ul
      className={cn('flex gap-1.5 text-xs', className ?? 'flex-wrap')}
      onMouseLeave={hover ? () => onActive(null) : undefined}
    >
      {CATEGORIES.map((c) => (
        <li key={c}>
          <button
            type="button"
            aria-pressed={active === c}
            onMouseEnter={hover ? () => onActive(c) : undefined}
            onFocus={hover ? () => onActive(c) : undefined}
            onBlur={hover ? () => onActive(null) : undefined}
            onClick={hover ? undefined : () => onActive(active === c ? null : c)}
            className={cn(
              'flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-2.5 py-1 font-medium whitespace-nowrap shadow-card backdrop-blur transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-ring',
              active && active !== c && 'opacity-40',
              !hover && active === c && 'border-fg'
            )}
          >
            <span className="size-2 rounded-full" style={{ background: categoryColor(c) }} />
            {t(c)}
          </button>
        </li>
      ))}
    </ul>
  );
}

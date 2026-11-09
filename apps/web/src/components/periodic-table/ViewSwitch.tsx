'use client';

import { LayoutGrid, List } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/format';

export type View = 'table' | 'list';

/** Nút chuyển Bảng / Danh sách. `current` là kiểu đang thấy thực tế (đã tính theo màn hình). */
export function ViewSwitch({ current, onChange }: { current: View; onChange: (v: View) => void }) {
  const t = useTranslations('view');
  const items = [
    { v: 'table' as const, icon: LayoutGrid },
    { v: 'list' as const, icon: List },
  ];
  return (
    <div
      role="group"
      aria-label={t('label')}
      className="inline-flex shrink-0 rounded-full border border-border bg-surface p-0.5 text-xs shadow-card"
    >
      {items.map(({ v, icon: Icon }) => (
        <button
          key={v}
          type="button"
          aria-pressed={current === v}
          onClick={() => onChange(v)}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-2.5 py-1.5 sm:px-3',
            current === v ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
          )}
        >
          <Icon className="size-3.5" />
          {/* Màn hình nhỏ chỉ hiện icon; tên vẫn còn cho trình đọc màn hình */}
          <span className="max-sm:sr-only">{t(v)}</span>
        </button>
      ))}
    </div>
  );
}

'use client';

import type { Category } from '@chem/data';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { categoryInk, categoryTint } from '@/lib/elements';
import { cn } from '@/lib/format';

type Series = 'lanthanide' | 'actinide';

const SERIES: Record<Series, { row: number; first: number; last: number }> = {
  lanthanide: { row: 6, first: 57, last: 71 },
  actinide: { row: 7, first: 89, last: 103 },
};

interface Props {
  series: Series;
  active: boolean;
  onActive: (c: Category | null) => void;
}

/**
 * Ô giữ chỗ ở nhóm 3 cho họ Lanthan / Actini (hai họ này được tách xuống hai hàng dưới cho bảng gọn).
 * Rê chuột / focus: làm nổi 15 nguyên tố của họ. Bấm: cuộn tới hàng đó và focus nguyên tố đầu tiên.
 */
export function SeriesPlaceholder({ series, active, onActive }: Props) {
  const t = useTranslations();
  const { row, first, last } = SERIES[series];
  const name = t(`category.${series}`);
  const range = `${first}–${last}`;

  const jump = (e: React.MouseEvent<HTMLButtonElement>) => {
    const grid = e.currentTarget.closest('[role="group"]');
    const target = grid?.querySelector<HTMLAnchorElement>(`a[data-z="${first}"]`);
    if (!target) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    target.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onMouseEnter={() => onActive(series)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(series)}
      onBlur={() => onActive(null)}
      onClick={jump}
      aria-label={t('table.seriesLabel', { name, range })}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 rounded-[10px] border border-dashed px-1 text-center leading-tight transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active && 'border-solid'
      )}
      style={{
        gridColumn: 3,
        gridRow: row,
        borderColor: `var(--cat-${series})`,
        background: categoryTint(series, active ? 26 : 8),
        color: categoryInk(series),
      }}
    >
      <span className="text-[0.62rem] font-semibold">{name}</span>
      <span className="flex items-center gap-0.5 font-mono text-[0.6rem]">
        {range}
        <ArrowDown className="size-2.5" aria-hidden />
      </span>
    </button>
  );
}

/**
 * Đường nối nhạt từ cột nhóm 3 xuống hai hàng f bên dưới (nằm ở hàng đệm giữa bảng chính và khối f),
 * để mắt thấy hai hàng dưới "thuộc về" ô giữ chỗ. Đổi màu khi đang làm nổi một họ.
 */
export function SeriesConnector({ active }: { active: Series | null }) {
  const color = active
    ? `var(--cat-${active})`
    : 'color-mix(in oklch, var(--muted) 45%, transparent)';
  // Cột 3 → 17 là 15 cột; tâm cột đầu/cuối cách mép 1/30 chiều rộng
  return (
    <div aria-hidden className="relative" style={{ gridColumn: '3 / 18', gridRow: 8 }}>
      <span
        className="absolute top-0 h-1/2 border-l-2 border-dashed transition-colors"
        style={{ left: 'calc(100% / 30)', borderColor: color }}
      />
      <span
        className="absolute top-1/2 border-t-2 border-dashed transition-colors"
        style={{ left: 'calc(100% / 30)', right: 'calc(100% / 30)', borderColor: color }}
      />
      <span
        className="absolute top-1/2 h-1/2 border-l-2 border-dashed transition-colors"
        style={{ right: 'calc(100% / 30)', borderColor: color }}
      />
    </div>
  );
}

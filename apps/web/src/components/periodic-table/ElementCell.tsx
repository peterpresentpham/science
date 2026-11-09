'use client';

import type { ElementLite } from '@chem/data';
import { memo } from 'react';

import type { CellPaint } from '@/lib/color-mode';
import { categoryColor } from '@/lib/elements';

/** Thang liên tục: phần trăm màu --seq pha vào nền, và ngưỡng đổi màu chữ cho đủ tương phản. */
const SEQ_MAX_PERCENT = 80;
const SEQ_STRONG_PERCENT = 62;

interface Props {
  el: ElementLite;
  href: string;
  name: string;
  dimmed: boolean;
  focused: boolean;
  onActivate: (el: ElementLite, e: React.MouseEvent<HTMLAnchorElement>) => void;
  onHover: (z: number | null) => void;
  onFocusCell: (z: number) => void;
  /** Chữ nhỏ góc trên phải theo lăng kính (vd. "65%" trong cơ thể) */
  badge?: string;
  /** Chấm màu góc trên phải theo lăng kính (vd. mức khan hiếm trong điện thoại) */
  dot?: string;
  /** Tô màu theo chế độ đang chọn (M2); bỏ trống = màu loại nguyên tố */
  paint?: CellPaint;
  /** Bố cục 32 cột (họ Lantan/Actini nằm trong hàng) */
  wide?: boolean;
  /** Đang nằm trong khay so sánh */
  compared?: boolean;
}

export const ElementCell = memo(function ElementCell({
  el,
  href,
  name,
  dimmed,
  focused,
  onActivate,
  onHover,
  onFocusCell,
  badge,
  dot,
  paint,
  wide,
  compared,
}: Props) {
  const pos = wide ? el.grid32 : el.grid;
  const seq = paint?.scale == null ? null : Math.round(paint.scale * SEQ_MAX_PERCENT);
  return (
    <a
      href={href}
      data-z={el.z}
      data-dimmed={dimmed}
      data-missing={paint?.missing || undefined}
      data-group={paint?.color ? true : undefined}
      data-scale={seq == null ? undefined : true}
      data-strong={seq != null && seq >= SEQ_STRONG_PERCENT ? true : undefined}
      data-compared={compared || undefined}
      tabIndex={focused ? 0 : -1}
      aria-label={`${el.z} ${el.symbol} ${name}${paint?.caption ? `: ${paint.caption}` : ''}`}
      onClick={(e) => onActivate(el, e)}
      onMouseEnter={() => onHover(el.z)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onFocusCell(el.z)}
      style={
        {
          gridColumn: pos.x,
          gridRow: pos.y,
          '--c': paint?.color ?? categoryColor(el.category),
          '--seq-p': seq == null ? undefined : `${seq}%`,
        } as React.CSSProperties
      }
      className="tile relative flex aspect-[1/1.12] min-w-0 flex-col rounded-[10px] px-1.5 pt-1 pb-2 leading-none outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="tile-muted tabular text-[0.58rem] font-medium text-muted">{el.z}</span>
      {badge && (
        <span className="tabular absolute top-1 right-1 rounded bg-fg px-1 py-px font-mono text-[0.55rem] leading-none font-semibold text-bg">
          {badge}
        </span>
      )}
      {dot && (
        <span
          className="absolute top-1.5 right-1.5 size-2 rounded-full ring-2 ring-surface"
          style={{ background: dot }}
          aria-hidden
        />
      )}
      <span className="tile-symbol mt-auto text-center font-display text-[1.15rem] font-semibold tracking-tight">
        {el.symbol}
      </span>
      <span
        className={
          paint?.caption
            ? 'tile-muted tabular mt-0.5 truncate text-center font-mono text-[0.55rem] font-medium'
            : 'tile-muted mt-0.5 truncate text-center text-[0.5rem] text-muted'
        }
      >
        {paint?.caption ?? name}
      </span>
      <span
        className="tile-bar absolute bottom-[4px] left-[5px] h-[2px] w-3 rounded-full"
        aria-hidden
      />
    </a>
  );
});

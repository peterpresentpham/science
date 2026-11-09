import { cn } from '@/lib/format';
import type { ArrowState, BoxRow } from '@/lib/orbital-boxes';

/**
 * Sơ đồ ô lượng tử. Mũi tên "added" (vừa thêm) được làm nổi bật, "removed" (vừa bị lấy đi) hiện mờ
 * và gạch ngang. Ký hiệu mũi tên đi kèm (không chỉ dựa vào màu), và mỗi ô có nhãn cho trình đọc màn hình.
 */
export function OrbitalBoxDiagram({
  rows,
  color,
  labels,
}: {
  rows: BoxRow[];
  color: string;
  labels: { added: string; removed: string };
}) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-3">
      {rows.map((s) => (
        <figure key={s.label} className="flex flex-col items-center gap-1">
          <div className="flex">
            {s.boxes.map((b, i) => (
              <span
                key={i}
                className={cn(
                  '-ml-px flex h-7 w-6 items-center justify-center border border-fg/40 font-mono text-sm leading-none transition-colors first:ml-0',
                  (b.up === 'added' || b.down === 'added') && 'bg-fg/10'
                )}
                style={{ color }}
              >
                <Arrow s={b.up} glyph="↑" labels={labels} />
                <Arrow s={b.down} glyph="↓" labels={labels} />
              </span>
            ))}
          </div>
          <figcaption className="font-mono text-xs text-muted">{s.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Arrow({
  s,
  glyph,
  labels,
}: {
  s: ArrowState;
  glyph: string;
  labels: { added: string; removed: string };
}) {
  if (s === 'none') return null;
  if (s === 'removed')
    return (
      <span className="text-muted line-through opacity-50" title={labels.removed}>
        {glyph}
        <span className="sr-only"> ({labels.removed})</span>
      </span>
    );
  if (s === 'added')
    return (
      <span className="atom-pop font-bold" title={labels.added}>
        {glyph}
        <span className="sr-only"> ({labels.added})</span>
      </span>
    );
  return <span>{glyph}</span>;
}

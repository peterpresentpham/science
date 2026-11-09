import { categoryColor, ELEMENTS } from '@/lib/elements';

/** Bảng tuần hoàn thu nhỏ, đánh dấu vị trí của nguyên tố. */
export function MiniTable({ z }: { z: number }) {
  return (
    <div
      aria-hidden
      className="grid w-full max-w-xs gap-[2px]"
      style={{
        gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(7, auto) 4px repeat(2, auto)',
      }}
    >
      {ELEMENTS.map((e) => (
        <span
          key={e.z}
          className="aspect-square rounded-[2px]"
          style={{
            gridColumn: e.grid.x,
            gridRow: e.grid.y,
            background: categoryColor(e.category),
            opacity: e.z === z ? 1 : 0.18,
            outline: e.z === z ? '2px solid var(--fg)' : undefined,
            outlineOffset: 1,
          }}
        />
      ))}
    </div>
  );
}

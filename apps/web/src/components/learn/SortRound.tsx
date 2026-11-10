'use client';

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';

import { categoryColor, ELEMENTS } from '@/lib/elements';

const clock = () => Date.now();
const GROUPS = [
  'alkali-metal',
  'alkaline-earth-metal',
  'halogen',
  'noble-gas',
  'metalloid',
  'transition-metal',
] as const;
const PER_GROUP = 2;

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
};

function Chip({
  z,
  symbol,
  name,
  selected,
  onPick,
}: {
  z: number;
  symbol: string;
  name: string;
  selected: boolean;
  onPick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: z });
  return (
    <button
      ref={setNodeRef}
      type="button"
      {...attributes}
      {...listeners}
      onClick={onPick}
      aria-pressed={selected}
      aria-label={`${name} (${symbol})`}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        touchAction: 'none',
      }}
      className={`flex size-16 flex-col items-center justify-center rounded-xl border bg-surface shadow-card outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        selected ? 'border-fg' : 'border-border'
      } ${isDragging ? 'z-10 opacity-80' : ''}`}
    >
      <span className="font-display text-xl font-bold">{symbol}</span>
      <span className="max-w-full truncate px-1 text-[0.6rem] text-muted">{name}</span>
    </button>
  );
}

function Bucket({
  id,
  title,
  color,
  onPlace,
  children,
}: {
  id: string;
  title: string;
  color: string;
  onPlace: () => void;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <section
      ref={setNodeRef}
      aria-label={title}
      onClick={onPlace}
      className={`min-h-28 space-y-2 rounded-2xl border-2 border-dashed p-3 ${isOver ? 'bg-surface-2' : ''}`}
      style={{ borderColor: color }}
    >
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </section>
  );
}

/**
 * Phân loại bằng kéo-thả: kéo (hoặc bàn phím: Space rồi phím mũi tên, hoặc bấm chọn chip rồi bấm ô)
 * từng nguyên tố vào đúng nhóm. Điểm = số nguyên tố ở đúng nhóm khi bấm "Kiểm tra".
 */
export function SortRound({
  onDone,
}: {
  onDone: (score: number, total: number, ms: number) => void;
}) {
  const t = useTranslations('learn');
  const tc = useTranslations();
  const locale = useLocale();
  const started = useRef(clock());

  const { groups, chips } = useMemo(() => {
    const groups = shuffle([...GROUPS]).slice(0, 3);
    const chips = shuffle(
      groups.flatMap((g) => shuffle(ELEMENTS.filter((e) => e.category === g)).slice(0, PER_GROUP))
    );
    return { groups, chips };
  }, []);
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const name = (e: (typeof chips)[number]) => (locale === 'vi' ? e.name.vi : e.name.en);
  const place = (z: number, g: string | null) =>
    setPlaced((p) => {
      const n = { ...p };
      if (g) n[z] = g;
      else delete n[z];
      return n;
    });

  const onDragEnd = (e: DragEndEvent) => {
    if (checked) return;
    place(Number(e.active.id), e.over ? String(e.over.id) : null);
    setSelected(null);
  };

  const score = chips.filter((c) => placed[c.z] === c.category).length;
  const allPlaced = chips.every((c) => placed[c.z]);
  const loose = chips.filter((c) => !placed[c.z]);

  const chipFor = (c: (typeof chips)[number]) => (
    <span key={c.z} className="relative">
      <Chip
        z={c.z}
        symbol={c.symbol}
        name={name(c)}
        selected={selected === c.z}
        onPick={() => !checked && setSelected(selected === c.z ? null : c.z)}
      />
      {checked && (
        <span className="sr-only">
          {placed[c.z] === c.category ? t('quiz.correctMark') : t('quiz.wrongMark')}
        </span>
      )}
    </span>
  );

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">{t('quiz.q.sort')}</h2>
      <p className="text-sm text-muted">{t('quiz.sortHint')}</p>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="flex min-h-20 flex-wrap gap-2 rounded-2xl bg-surface-2 p-3">
          {loose.length ? (
            loose.map(chipFor)
          ) : (
            <span className="text-sm text-muted">{t('quiz.allPlaced')}</span>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {groups.map((g) => (
            <Bucket
              key={g}
              id={g}
              title={tc(`category.${g}`)}
              color={categoryColor(g)}
              onPlace={() => {
                if (selected !== null && !checked) {
                  place(selected, g);
                  setSelected(null);
                }
              }}
            >
              {chips.filter((c) => placed[c.z] === g).map(chipFor)}
            </Bucket>
          ))}
        </div>
      </DndContext>

      {checked ? (
        <div className="space-y-3" role="status">
          <p className="text-sm">{t('quiz.sortResult', { score, total: chips.length })}</p>
          <ul className="text-sm text-muted">
            {chips
              .filter((c) => placed[c.z] !== c.category)
              .map((c) => (
                <li key={c.z}>
                  {c.symbol} ({name(c)}): {tc(`category.${c.category}`)}
                </li>
              ))}
          </ul>
          <button
            type="button"
            onClick={() => onDone(score, chips.length, clock() - started.current)}
            className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t('quiz.finish')}
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={!allPlaced}
          onClick={() => setChecked(true)}
          className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
        >
          {t('quiz.check')}
        </button>
      )}
    </div>
  );
}

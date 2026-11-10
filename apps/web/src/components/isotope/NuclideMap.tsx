'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';

import { BY_Z } from '@/lib/elements';
import { nuclidesUrl } from '@/lib/isotopes';
import { useNearScreen } from '@/lib/use-near-screen';

/** [Z, N, mã]: S bền · B β⁻ · E bắt electron/β⁺ · A α · O khác (phân hạch tự phát, p, n…) */
type Row = [number, number, string];
type Code = 'S' | 'B' | 'E' | 'A' | 'O';

/** Mỗi loại một màu cố định theo thứ tự; bền dùng màu chữ (trung tính) để nổi bật "thung lũng bền". */
const COLOR: Record<Code, string> = {
  S: '--fg',
  B: '--block-s',
  E: '--block-d',
  A: '--block-p',
  O: '--block-f',
};
const CODES: Code[] = ['S', 'B', 'E', 'A', 'O'];
const KIND_KEY: Record<Code, string> = {
  S: 'stable',
  B: 'beta-minus',
  E: 'electron-capture',
  A: 'alpha',
  O: 'other',
};
const CELL = 6;
const MAGIC = [2, 8, 20, 28, 50, 82, 126];

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#888';

/**
 * Bản đồ hạt nhân (bảng Segrè): trục ngang là số nơtron N, trục dọc là số proton Z.
 * Mỗi ô là một hạt nhân đã biết, tô theo kiểu phân rã chính. Hàng của nguyên tố đang xem được viền nổi bật.
 * Dữ liệu (41 KB) chỉ tải khi khung lọt vào màn hình.
 */
export function NuclideMap({ z, symbol }: { z: number; symbol: string }) {
  const t = useTranslations('isotope');
  const locale = useLocale();
  const [wrap, near] = useNearScreen<HTMLDivElement>('300px');
  const canvas = useRef<HTMLCanvasElement>(null);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [theme, setTheme] = useState(0);
  const [hover, setHover] = useState<Row | null>(null);

  useEffect(() => {
    if (!near || rows) return;
    let cancelled = false;
    fetch(nuclidesUrl)
      .then((r) =>
        r.ok ? (r.json() as Promise<Row[]>) : Promise.reject(new Error(String(r.status)))
      )
      .then((d) => !cancelled && setRows(d))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [near, rows]);

  // Vẽ lại khi đổi giao diện sáng/tối (màu canvas lấy từ biến CSS)
  useEffect(() => {
    const bump = () => setTheme((v) => v + 1);
    const mo = new MutationObserver(bump);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', bump);
    return () => {
      mo.disconnect();
      mq.removeEventListener('change', bump);
    };
  }, []);

  const byKey = useMemo(() => new Map((rows ?? []).map((r) => [r[0] * 1000 + r[1], r])), [rows]);
  const maxN = useMemo(() => Math.max(0, ...(rows ?? []).map((r) => r[1])), [rows]);
  const width = (maxN + 2) * CELL;
  const height = 120 * CELL;

  useEffect(() => {
    const c = canvas.current;
    if (!c || !rows) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = width * dpr;
    c.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const ink = cssVar('--fg');
    const grid = cssVar('--border');
    const px = (n: number) => n * CELL;
    const py = (zz: number) => height - (zz + 1) * CELL; // Z tăng lên trên

    // Đường số magic (2, 8, 20, 28, 50, 82, 126), nhạt
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    for (const m of MAGIC) {
      ctx.beginPath();
      ctx.moveTo(px(m) + CELL / 2, 0);
      ctx.lineTo(px(m) + CELL / 2, height);
      ctx.stroke();
      if (m <= 82) {
        ctx.beginPath();
        ctx.moveTo(0, py(m) + CELL / 2);
        ctx.lineTo(width, py(m) + CELL / 2);
        ctx.stroke();
      }
    }

    // Hàng của nguyên tố đang xem
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0, py(z), width, CELL);
    ctx.globalAlpha = 1;

    const colors = Object.fromEntries(CODES.map((k) => [k, cssVar(COLOR[k])])) as Record<
      Code,
      string
    >;
    for (const [zz, n, code] of rows) {
      ctx.fillStyle = colors[code as Code] ?? colors.O;
      ctx.globalAlpha = zz === z ? 1 : 0.8;
      ctx.fillRect(px(n) + 0.5, py(zz) + 0.5, CELL - 1, CELL - 1);
    }
    ctx.globalAlpha = 1;
    // Viền các đồng vị của nguyên tố đang xem
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1.5;
    for (const [zz, n] of rows) if (zz === z) ctx.strokeRect(px(n), py(zz), CELL, CELL);
    // Nhãn trục
    ctx.fillStyle = cssVar('--muted');
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'left';
    for (const m of [20, 50, 82, 126]) ctx.fillText(String(m), px(m) - 5, height - 1);
    ctx.textAlign = 'right';
    for (const m of [20, 50, 82]) ctx.fillText(String(m), width - 2, py(m) - 1);
  }, [rows, z, width, height, theme]);

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const n = Math.floor(((e.clientX - r.left) / r.width) * (maxN + 2));
    const zz = 119 - Math.floor(((e.clientY - r.top) / r.height) * 120);
    setHover(byKey.get(zz * 1000 + n) ?? null);
  };

  const name = (zz: number) => {
    const e = BY_Z.get(zz);
    return e ? (locale === 'vi' ? e.name.vi : e.name.en) : '';
  };
  const kindOf = (r: Row) => t(`kind.${KIND_KEY[r[2] as Code] ?? 'other'}`);

  return (
    <div ref={wrap} className="space-y-3">
      <p className="text-sm text-muted">{t('map.intro', { symbol })}</p>
      <div className="overflow-x-auto rounded-2xl border border-border bg-bg/60 p-2">
        {rows ? (
          <canvas
            ref={canvas}
            style={{ width: '100%', aspectRatio: `${width} / ${height}`, minWidth: 420 }}
            className="block touch-manipulation"
            role="img"
            aria-label={t('map.label', { count: rows.length, symbol })}
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
            onPointerDown={onMove}
          />
        ) : (
          <div
            className="flex items-center justify-center text-sm text-muted"
            style={{ aspectRatio: '1.6' }}
          >
            {failed ? t('map.error') : t('map.loading')}
          </div>
        )}
      </div>
      <p className="min-h-5 text-sm" aria-live="polite">
        {hover ? (
          <span>
            <sup className="text-[0.7em]">{hover[0] + hover[1]}</sup>
            {BY_Z.get(hover[0])?.symbol} · {name(hover[0])} ·{' '}
            {t('map.zn', { z: hover[0], n: hover[1] })} · {kindOf(hover)}
          </span>
        ) : (
          <span className="text-muted">{t('map.hoverHint')}</span>
        )}
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {CODES.map((k) => (
          <li key={k} className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-sm"
              style={{ background: `var(${COLOR[k]})` }}
              aria-hidden
            />
            {t(`kind.${KIND_KEY[k]}`)}
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted">{t('map.axes')}</p>
    </div>
  );
}

import { capacity, type L, L_LETTER, MADELUNG, type Subshell, subshellLabel } from '@chem/core';

const CW = 40;
const CH = 22;
const GX = 50;
const GY = 28;
const X0 = 26;
const Y0 = 18;
const cx = (l: number) => X0 + l * GX;
const cy = (n: number) => Y0 + (n - 1) * GY;

/** Nhóm các phân lớp cùng n + l (một mũi tên chéo), theo đúng thứ tự Madelung. */
const DIAGONALS = (() => {
  const groups = new Map<number, Array<readonly [number, L]>>();
  for (const s of MADELUNG) {
    const k = s[0] + s[1];
    groups.set(k, [...(groups.get(k) ?? []), s]);
  }
  return [...groups.values()];
})();

/**
 * Sơ đồ mũi tên chéo (quy tắc Madelung / Klechkowski): thứ tự điền theo n + l tăng dần,
 * cùng n + l thì n nhỏ trước. Ô được tô theo mức đầy hiện tại; phân lớp đang điền có viền đậm.
 */
export function MadelungDiagram({
  cfg,
  current,
  color,
  label,
}: {
  cfg: readonly Subshell[];
  current?: { n: number; l: L } | null;
  color: string;
  label: string;
}) {
  const fill = (n: number, l: L) =>
    (cfg.find((s) => s.n === n && s.l === l)?.electrons ?? 0) / capacity(l);
  const W = X0 + 3 * GX + CW / 2 + 8;
  const H = Y0 + 6 * GY + CH / 2 + 6;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      className="h-auto w-full max-w-[13rem]"
    >
      <defs>
        <marker
          id="madelung-head"
          viewBox="0 0 6 6"
          refX="5"
          refY="3"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 z" fill="currentColor" fillOpacity={0.45} />
        </marker>
      </defs>
      {DIAGONALS.map((g) => {
        const first = g[0]!;
        const last = g.at(-1)!;
        const x1 = cx(first[1]) + CW / 2 + 4;
        const y1 = cy(first[0]) - CH / 2 - 2;
        const x2 = cx(last[1]) - CW / 2 + 2;
        const y2 = cy(last[0]) + CH / 2 - 2;
        return (
          <line
            key={`${first[0]}${first[1]}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeOpacity={0.3}
            strokeWidth={1.2}
            markerEnd="url(#madelung-head)"
          />
        );
      })}
      {MADELUNG.map(([n, l]) => {
        const f = fill(n, l);
        const isCur = current?.n === n && current?.l === l;
        return (
          <g key={`${n}${l}`}>
            <rect
              x={cx(l) - CW / 2}
              y={cy(n) - CH / 2}
              width={CW}
              height={CH}
              rx={5}
              fill={color}
              fillOpacity={0.06 + 0.5 * f}
              stroke={isCur ? 'currentColor' : color}
              strokeOpacity={isCur ? 1 : 0.35}
              strokeWidth={isCur ? 2 : 1}
            />
            <text
              x={cx(l)}
              y={cy(n)}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fontFamily="var(--font-mono)"
              fill="currentColor"
              fontWeight={isCur ? 700 : 400}
            >
              {subshellLabel(n, l)}
            </text>
          </g>
        );
      })}
      {L_LETTER.map((letter, l) => (
        <text
          key={letter}
          x={cx(l)}
          y={4}
          textAnchor="middle"
          fontSize={8}
          fill="currentColor"
          opacity={0.5}
        >
          {letter}
        </text>
      ))}
    </svg>
  );
}

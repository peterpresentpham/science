/**
 * Mô hình Bohr: hạt nhân + các lớp electron quay quanh tâm (0,0) của viewBox.
 * Animation bằng CSS (.bohr-shell trong globals.css), tự tắt khi prefers-reduced-motion.
 * Lớp trong quay nhanh hơn lớp ngoài; các lớp xen kẽ chiều quay.
 */
export function BohrModel({
  z,
  shells,
  symbol,
  color,
  label,
  showLabel = true,
  className,
}: {
  z: number;
  shells: number[];
  symbol: string;
  color: string;
  label: string;
  showLabel?: boolean;
  className?: string;
}) {
  const n = shells.length;
  const inner = 26;
  const outer = 90;
  const step = n > 1 ? (outer - inner) / (n - 1) : 0;
  const dot = n > 5 ? 2.6 : 3.4;

  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className ?? 'h-auto w-full max-w-[18rem]'}
      role="img"
      aria-label={label}
      overflow="visible"
    >
      <defs>
        <radialGradient id={`nuc-${z}`}>
          <stop offset="0%" stopColor={color} stopOpacity={0.55} />
          <stop offset="100%" stopColor={color} stopOpacity={0.12} />
        </radialGradient>
      </defs>

      {shells.map((count, i) => {
        const r = n === 1 ? 52 : inner + i * step;
        return (
          <g key={`shell-${r}`}>
            <circle
              r={r}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.14}
              strokeWidth={0.7}
            />
            <g
              className="bohr-shell"
              style={
                {
                  '--orbit-duration': `${5 + i * 3.5}s`,
                  animationDirection: i % 2 ? 'reverse' : 'normal',
                } as React.CSSProperties
              }
            >
              {Array.from({ length: count }, (_, k) => {
                const a = (2 * Math.PI * k) / count - Math.PI / 2;
                const cx = (r * Math.cos(a)).toFixed(2);
                const cy = (r * Math.sin(a)).toFixed(2);
                return (
                  <g key={k}>
                    <circle cx={cx} cy={cy} r={dot * 2} fill={color} opacity={0.15} />
                    <circle cx={cx} cy={cy} r={dot} fill={color} />
                  </g>
                );
              })}
            </g>
          </g>
        );
      })}

      <g className="bohr-nucleus">
        <circle r={16} fill={`url(#nuc-${z})`} stroke={color} strokeWidth={1} />
      </g>
      {showLabel && (
        <>
          <text
            textAnchor="middle"
            dy="0.12em"
            fontSize={11}
            fontWeight={700}
            fill="currentColor"
            fontFamily="var(--font-display)"
          >
            {symbol}
          </text>
          <text textAnchor="middle" dy="1.45em" fontSize={5.5} fill="currentColor" opacity={0.65}>
            {z}p⁺
          </text>
        </>
      )}
    </svg>
  );
}

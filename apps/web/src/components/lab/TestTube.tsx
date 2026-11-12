import type { Reaction, Species } from '@chem/data/reaction';
import { useId } from 'react';

import { clamp01, mixColor, rgba, solidColor } from '@/lib/lab/color';

/*
 * Ống nghiệm SVG. Mọi hiện tượng đọc từ dữ liệu phản ứng; `progress` (0..1) là tiến độ hoạt cảnh.
 * Toạ độ: ống rộng 80 (x 60..140), miệng y = 20, đáy bo tròn tới y = 270, mực chất lỏng y = 100.
 */
const TUBE = 'M60 20 V230 A40 40 0 0 0 140 230 V20';
const TUBE_FILL = `${TUBE} Z`;
const LEVEL = 100;
const BOTTOM = 270;

/** Số ngẫu nhiên giả (xác định theo chỉ số) để mỗi lần vẽ giống nhau. */
const seeded = (i: number, salt = 0) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const ease = (t: number) => t * t * (3 - 2 * t);
const BUBBLES = { slow: 6, moderate: 14, vigorous: 26 } as const;
const GLOW = { glow: 0.35, bright: 0.6, blinding: 0.9 } as const;
const SOLID_FORMS = ['strip', 'wire', 'granule', 'piece', 'powder'] as const;

/** Chất rắn cho vào ống: vẽ theo dạng (thanh, dây, hạt, miếng, bột). */
function SolidShape({ s, i }: { s: Species; i: number }) {
  const fill = solidColor(s.color);
  const x0 = 80 + i * 18;
  switch (s.form) {
    case 'strip':
      return <rect x={x0} y={LEVEL - 22} width="10" height="150" rx="2" fill={fill} />;
    case 'wire': {
      const pts = Array.from(
        { length: 9 },
        (_, k) => `${x0 + (k % 2 ? 14 : 0)},${LEVEL + 10 + k * 16}`
      );
      return (
        <polyline
          points={pts.join(' ')}
          fill="none"
          stroke={fill}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      );
    }
    case 'granule':
      return (
        <g fill={fill}>
          {[0, 1, 2, 3].map((k) => (
            <circle
              key={k}
              cx={x0 + (k % 2) * 16}
              cy={BOTTOM - 14 - Math.floor(k / 2) * 14}
              r="7"
            />
          ))}
        </g>
      );
    case 'piece':
      return <path d={`M${x0} ${BOTTOM - 8} l6 -18 l16 -4 l8 14 l-8 12 z`} fill={fill} />;
    case 'powder':
      return (
        <g fill={fill}>
          {Array.from({ length: 22 }, (_, k) => (
            <circle
              key={k}
              cx={72 + seeded(k, i + 1) * 56}
              cy={BOTTOM - 4 - seeded(k, i + 7) * 14}
              r={1.6 + seeded(k, 3) * 1.4}
            />
          ))}
        </g>
      );
    default:
      return null;
  }
}

export function TestTube({
  reaction,
  progress,
  heated,
  animate,
}: {
  reaction: Reaction;
  progress: number;
  /** Đã bật đèn cồn (hiển thị ngọn lửa dưới ống) */
  heated: boolean;
  /** false: người dùng giảm chuyển động, không có bọt/nhấp nháy */
  animate: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  const o = reaction.observations;
  const p = clamp01(progress);
  const running = p > 0 && p < 1;
  const liquid = mixColor(
    o.solutionBefore ?? reaction.reactants.find((s) => s.state === 'aq')?.color,
    o.solutionAfter,
    (p - 0.1) / 0.6
  );
  const solids = reaction.reactants.filter(
    (s) => s.state === 's' && (SOLID_FORMS as readonly string[]).includes(s.form ?? '')
  );
  const gasReactant = reaction.reactants.find((s) => s.state === 'g' && s.color);
  const precipitate = o.precipitate;
  const layer = precipitate?.settles ? 34 * ease(clamp01((p - 0.2) / 0.7)) : 0;
  const cloud = precipitate && !precipitate.settles ? ease(clamp01((p - 0.1) / 0.6)) : 0;
  const bubbleCount = o.gas ? BUBBLES[o.gas.rate] : 0;
  const glow = o.light ? GLOW[o.light.intensity] * Math.sin(Math.PI * clamp01(p)) : 0;
  const heat = o.heat === 'none' ? 0 : ease(clamp01(p));

  return (
    <svg viewBox="0 0 200 300" className="mx-auto h-auto w-full max-w-[16rem]" aria-hidden>
      <defs>
        <clipPath id={`tube-${uid}`}>
          <path d={TUBE_FILL} />
        </clipPath>
        <radialGradient id={`glow-${uid}`}>
          <stop
            offset="0"
            stopColor={o.light ? rgba(o.light.color, 1) : '#fff'}
            stopOpacity="0.95"
          />
          <stop offset="1" stopColor={o.light ? rgba(o.light.color, 1) : '#fff'} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`warm-${uid}`}>
          <stop offset="0" stopColor="#ff9d3c" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ff9d3c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {o.light && glow > 0 && (
        <circle cx="100" cy="64" r="96" fill={`url(#glow-${uid})`} opacity={glow} />
      )}
      {o.heat === 'exo' && (
        <ellipse
          cx="100"
          cy="250"
          rx="88"
          ry="52"
          fill={`url(#warm-${uid})`}
          opacity={heat * 0.7}
        />
      )}

      <g clipPath={`url(#tube-${uid})`}>
        {gasReactant && (
          <rect
            x="60"
            y="20"
            width="80"
            height={LEVEL - 20}
            fill={solidColor(gasReactant.color)}
            opacity="0.35"
          />
        )}
        <rect x="60" y={LEVEL} width="80" height={BOTTOM - LEVEL} fill={liquid} />
        {cloud > 0 && precipitate && (
          <rect
            x="60"
            y={LEVEL}
            width="80"
            height={BOTTOM - LEVEL}
            fill={rgba(precipitate.color, 0.85 * cloud)}
          />
        )}
        {solids.map((s, i) => (
          <SolidShape key={s.formula} s={s} i={i} />
        ))}
        {/* Hạt kết tủa đang rơi, rồi lắng thành lớp ở đáy */}
        {precipitate?.settles && running && (
          <g fill={rgba(precipitate.color, 1)}>
            {Array.from({ length: 26 }, (_, k) => {
              const fall = clamp01((p - 0.05 - seeded(k, 2) * 0.3) / 0.5);
              return (
                <circle
                  key={k}
                  cx={68 + seeded(k, 1) * 64}
                  cy={LEVEL + 6 + fall * (BOTTOM - LEVEL - 6 - layer)}
                  r={1.6 + seeded(k, 4) * 2.4}
                  opacity={fall > 0 ? 0.9 : 0}
                />
              );
            })}
          </g>
        )}
        {layer > 0 && precipitate && (
          <path
            d={
              precipitate.texture === 'crystalline'
                ? `M60 ${BOTTOM + 10} V${BOTTOM - layer + 6} l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 V${BOTTOM + 10} Z`
                : precipitate.texture === 'gelatinous'
                  ? `M60 ${BOTTOM + 10} V${BOTTOM - layer} q10 -8 20 0 t20 0 t20 0 t20 0 V${BOTTOM + 10} Z`
                  : `M60 ${BOTTOM + 10} V${BOTTOM - layer} H140 V${BOTTOM + 10} Z`
            }
            fill={rgba(precipitate.color, 1)}
          />
        )}
        {o.gas &&
          running &&
          animate &&
          Array.from({ length: bubbleCount }, (_, k) => {
            const x = 70 + seeded(k, 5) * 60;
            const dur = (1.6 + seeded(k, 6) * 1.8).toFixed(2);
            const begin = (seeded(k, 7) * 2).toFixed(2);
            return (
              <circle
                key={k}
                cx={x}
                r={1.8 + seeded(k, 8) * 3}
                fill="none"
                stroke={o.gas!.color ? rgba(o.gas!.color, 1) : '#ffffff'}
                strokeWidth="1.2"
                opacity="0.85"
              >
                <animate
                  attributeName="cy"
                  from={BOTTOM - 8}
                  to={LEVEL - 4}
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        {o.gas && !animate && running && (
          <g fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.8">
            {Array.from({ length: Math.min(bubbleCount, 10) }, (_, k) => (
              <circle
                key={k}
                cx={72 + seeded(k, 5) * 56}
                cy={LEVEL + 10 + seeded(k, 9) * 140}
                r={2 + seeded(k, 8) * 3}
              />
            ))}
          </g>
        )}
        {/* Khí màu (Cl₂, NO₂…) tích tụ ở khoảng trống phía trên khi phản ứng xong */}
        {o.gas?.color && p > 0.5 && (
          <rect
            x="60"
            y="20"
            width="80"
            height={LEVEL - 20}
            fill={rgba(o.gas.color, 0.5 * ease((p - 0.5) / 0.5))}
          />
        )}
        <rect x="60" y={LEVEL} width="80" height="3" fill="#ffffff" opacity="0.35" />
      </g>

      {/* Thành ống */}
      <path
        d={TUBE}
        fill="none"
        stroke="var(--fg)"
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M68 30 V225"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {o.heat === 'endo' && (
        <path
          d={TUBE}
          fill="none"
          stroke="#bfe6ff"
          strokeWidth="6"
          strokeOpacity={heat * 0.7}
          strokeLinecap="round"
        />
      )}

      {/* Đèn cồn */}
      {heated && (
        <g>
          <rect x="82" y="284" width="36" height="14" rx="3" fill="var(--fg)" opacity="0.7" />
          <path d="M100 282 q-12 -16 0 -34 q12 18 0 34 z" fill="#ff9d3c" opacity="0.95">
            {animate && (
              <animate
                attributeName="opacity"
                values="0.95;0.6;0.95"
                dur="0.6s"
                repeatCount="indefinite"
              />
            )}
          </path>
        </g>
      )}
    </svg>
  );
}

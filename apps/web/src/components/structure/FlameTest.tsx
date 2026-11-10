import { useTranslations } from 'next-intl';

/**
 * Ngọn lửa nhuộm màu bằng SVG + CSS (không cần video): lõi xanh nhạt của đèn khí,
 * thân lửa mang màu của nguyên tố, lay động nhẹ (tắt khi giảm chuyển động).
 */
export function FlameTest({
  hex,
  name,
  symbol,
  note,
}: {
  hex: string;
  name: string;
  symbol: string;
  note?: string;
}) {
  const t = useTranslations('structure.flame');
  return (
    <div className="flex items-center gap-5">
      <svg
        viewBox="0 0 100 160"
        className="h-40 w-24 shrink-0"
        role="img"
        aria-label={t('label', { symbol, color: name })}
      >
        <defs>
          <radialGradient id={`flame-${symbol}`} cx="50%" cy="78%" r="70%">
            <stop offset="0%" stopColor="#fff8e8" stopOpacity={0.95} />
            <stop offset="25%" stopColor={hex} stopOpacity={0.95} />
            <stop offset="70%" stopColor={hex} stopOpacity={0.55} />
            <stop offset="100%" stopColor={hex} stopOpacity={0} />
          </radialGradient>
          <filter id={`flame-blur-${symbol}`}>
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        <g className="flame-flicker" filter={`url(#flame-blur-${symbol})`}>
          <path
            d="M50 8 C62 40 82 58 80 98 C78 128 64 146 50 146 C36 146 22 128 20 98 C18 66 40 48 50 8 Z"
            fill={`url(#flame-${symbol})`}
          />
          <path
            d="M50 70 C56 88 64 98 62 118 C60 132 56 140 50 140 C44 140 40 132 38 118 C36 100 44 88 50 70 Z"
            fill="#9fd8ff"
            opacity={0.55}
          />
        </g>
        {/* Đầu đèn khí */}
        <rect x={40} y={146} width={20} height={14} rx={2} fill="currentColor" opacity={0.35} />
      </svg>
      <div className="space-y-1.5 text-sm">
        <p>
          <span className="text-muted">{t('color')}: </span>
          <span className="font-semibold">{name}</span>
        </p>
        {note && <p className="text-muted">{note}</p>}
        <p className="text-xs text-muted">{t('why')}</p>
      </div>
    </div>
  );
}

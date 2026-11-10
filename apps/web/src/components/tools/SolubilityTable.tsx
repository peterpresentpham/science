import { useTranslations } from 'next-intl';

import { cn } from '@/lib/format';
import { ANIONS, CATIONS, SOLUBILITY, type Solubility } from '@/lib/solubility';

/** Nền theo thứ bậc (một sắc, nhạt → đậm: tan → ít tan → không tan); ô "không tồn tại" là sọc chéo. Chữ luôn hiện. */
const TINT: Record<Solubility, string | null> = {
  t: '8%',
  tb: '8%',
  tk: '8%',
  i: '30%',
  k: '60%',
  kk: '60%',
  x: null,
};
const LETTER: Record<Solubility, string> = {
  t: 't',
  tb: 't/b',
  tk: 't/kb',
  i: 'i',
  k: 'k',
  kk: 'k/kb',
  x: '—',
};

export function SolubilityTable() {
  const t = useTranslations('tools.solubility');
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-3xl border border-border bg-surface p-3 shadow-card">
        <table className="w-full min-w-[44rem] border-separate border-spacing-0.5 text-center text-sm">
          <caption className="sr-only">{t('caption')}</caption>
          <thead>
            <tr>
              <th scope="col" className="p-1 text-left text-xs font-normal text-muted">
                {t('corner')}
              </th>
              {CATIONS.map((c) => (
                <th key={c.id} scope="col" className="p-1 font-semibold">
                  {c.label}
                  <span className="block text-[0.6rem] font-normal text-muted">{c.charge}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ANIONS.map((a) => (
              <tr key={a.id}>
                <th scope="row" className="p-1 text-left font-semibold whitespace-nowrap">
                  {a.label} <span className="text-[0.6rem] font-normal text-muted">{a.charge}</span>
                </th>
                {SOLUBILITY[a.id].map((s, i) => {
                  const c = CATIONS[i]!;
                  const tint = TINT[s];
                  const strong = s === 'k' || s === 'kk';
                  return (
                    <td
                      key={c.id}
                      title={`${c.label}${c.charge === 'I' ? '' : `(${c.charge})`} – ${a.label}: ${t(`value.${s}`)}`}
                      className={cn(
                        'rounded-md p-1.5 font-mono text-xs',
                        !tint && 'swatch-missing text-muted',
                        strong && 'text-[var(--surface)]'
                      )}
                      style={
                        tint
                          ? {
                              background: `color-mix(in oklch, var(--seq) ${tint}, var(--surface))`,
                            }
                          : undefined
                      }
                    >
                      {LETTER[s]}
                      <span className="sr-only">: {t(`value.${s}`)}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
        {(['t', 'i', 'k', 'x', 'tb', 'tk'] as const).map((s) => (
          <li key={s} className="flex items-center gap-1.5">
            <span
              className={cn(
                'inline-block min-w-8 rounded px-1 text-center font-mono',
                !TINT[s] && 'swatch-missing',
                (s as string) === 'k' && 'text-[var(--surface)]'
              )}
              style={
                TINT[s]
                  ? { background: `color-mix(in oklch, var(--seq) ${TINT[s]}, var(--surface))` }
                  : undefined
              }
            >
              {LETTER[s]}
            </span>
            {t(`value.${s}`)}
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted">{t('draft')}</p>
    </div>
  );
}

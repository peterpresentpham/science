import type { DisplayToken } from '@chem/core';

/** Công thức có chỉ số dưới / điện tích trên: H₂SO₄, SO₄²⁻ */
export function FormulaText({ tokens, className }: { tokens: DisplayToken[]; className?: string }) {
  return (
    <span className={className}>
      {tokens.map((t, i) =>
        t.kind === 'sub' ? (
          <sub key={i} className="text-[0.7em]">
            {t.text}
          </sub>
        ) : t.kind === 'sup' ? (
          <sup key={i} className="text-[0.7em]">
            {t.text}
          </sup>
        ) : (
          <span key={i}>{t.text}</span>
        )
      )}
    </span>
  );
}

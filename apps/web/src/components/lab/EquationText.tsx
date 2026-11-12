import { parseEquation } from '@chem/core';

import { FormulaText } from '@/components/tools/FormulaText';

/** Phương trình (có hệ số người viết) với chỉ số dưới/điện tích trên. Không đọc được thì hiện chuỗi gốc. */
export function EquationText({ text, className }: { text: string; className?: string }) {
  const parsed = parseEquation(text);
  if (!parsed.ok) return <span className={className}>{text}</span>;
  const { species, reactantCount } = parsed.value;
  const side = (from: number, to: number) =>
    species.slice(from, to).map((s, i) => (
      <span key={from + i} className="whitespace-nowrap">
        {i > 0 && ' + '}
        {s.given != null && s.given !== 1 && `${s.given} `}
        <FormulaText tokens={s.formula.display} />
      </span>
    ));
  return (
    <span className={className}>
      {side(0, reactantCount)} <span aria-label="→">→</span> {side(reactantCount, species.length)}
    </span>
  );
}

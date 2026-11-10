import { type FormulaError, type ParsedFormula, parseFormula } from '../formula';
import { err, ok, type Result } from '../result';

export interface Species {
  formula: ParsedFormula;
  /** Chuỗi chất như người dùng gõ (không kèm hệ số) */
  text: string;
  /** Vị trí bắt đầu của chất trong phương trình gốc */
  index: number;
  /** Hệ số người dùng tự ghi (nếu có), để so với kết quả */
  given: number | null;
  side: 'reactant' | 'product';
}

export interface ParsedEquation {
  species: Species[];
  reactantCount: number;
}

export type EquationErrorCode = 'noArrow' | 'manyArrows' | 'emptySide' | 'emptySpecies' | 'formula';

export interface EquationError {
  code: EquationErrorCode;
  index: number;
  length: number;
  /** Lỗi chi tiết của công thức (code = 'formula'), vị trí đã tính theo phương trình gốc */
  formula?: FormulaError;
}

const ARROW = /<=>|<->|⇌|⟶|→|->|=>|=/g;
const SPECIES_START = /[A-Z([\d₀-₉e]/;

/** Tách các chất trong một vế theo dấu "+" nối (không phải "+" của điện tích). */
function splitSide(side: string, offset: number): Array<{ text: string; index: number }> {
  const out: Array<{ text: string; index: number }> = [];
  let start = 0;
  for (let i = 0; i < side.length; i++) {
    if (side[i] !== '+') continue;
    let j = i + 1;
    while (side[j] === ' ') j++;
    const next = side[j];
    const before = side.slice(start, i).trim();
    // "+" sau khoảng trắng luôn là dấu nối (điện tích viết liền chất: "Fe3+"), nên "H2 + + O2" có chất rỗng ở giữa
    const spaced = next === '+' && side[i - 1] === ' ';
    const spacedStart = side[i - 1] === ' ' && next !== undefined && SPECIES_START.test(next);
    if (
      spaced ||
      spacedStart ||
      (next !== undefined && next !== '+' && SPECIES_START.test(next) && before)
    ) {
      out.push({ text: side.slice(start, i), index: offset + start });
      start = i + 1;
    }
  }
  out.push({ text: side.slice(start), index: offset + start });
  return out;
}

export function parseEquation(input: string): Result<ParsedEquation, EquationError> {
  const arrows = [...input.matchAll(ARROW)];
  if (arrows.length === 0) return err({ code: 'noArrow', index: input.length, length: 0 });
  if (arrows.length > 1) {
    const a = arrows[1]!;
    return err({ code: 'manyArrows', index: a.index, length: a[0].length });
  }
  const a = arrows[0]!;
  const sides: Array<[string, number, Species['side']]> = [
    [input.slice(0, a.index), 0, 'reactant'],
    [input.slice(a.index + a[0].length), a.index + a[0].length, 'product'],
  ];
  const species: Species[] = [];
  let reactantCount = 0;
  for (const [text, offset, side] of sides) {
    if (!text.trim())
      return err({ code: 'emptySide', index: side === 'reactant' ? 0 : offset, length: 0 });
    for (const part of splitSide(text, offset)) {
      const lead = part.text.length - part.text.trimStart().length;
      const raw = part.text.trim();
      const at = part.index + lead;
      if (!raw) return err({ code: 'emptySpecies', index: at, length: 1 });
      // Hệ số đứng đầu ("2H2O"), có thể cách một khoảng trắng ("2 H2O")
      const m = /^(\d+)\s*(?=[A-Z([e])/.exec(raw);
      const given = m ? Number(m[1]) : null;
      const body = m ? raw.slice(m[0].length) : raw;
      const bodyAt = at + (m ? m[0].length : 0);
      const f = parseFormula(body);
      if (!f.ok) {
        const fe = { ...f.error, index: f.error.index + bodyAt };
        return err({ code: 'formula', index: fe.index, length: fe.length, formula: fe });
      }
      species.push({ formula: f.value, text: body, index: bodyAt, given, side });
      if (side === 'reactant') reactantCount++;
    }
  }
  return ok({ species, reactantCount });
}

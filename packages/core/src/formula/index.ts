import { err, ok, type Result } from '../result';
import { SYMBOL_SET } from './elements';

export * from './elements';

/*
 * Phân tích công thức hoá học (tokenizer + đệ quy xuống, viết tay để báo lỗi kèm vị trí).
 *   formula := part (HYDRATE coef? part)* charge?
 *   part    := group+
 *   group   := (ELEMENT | "(" group+ ")" | "[" group+ "]") count?
 * Điện tích:
 * - "^": SO4^2-, Fe^3+, Hg2^2+ (rõ ràng nhất)
 * - chữ số trên Unicode: SO₄²⁻, Fe³⁺
 * - cách một khoảng trắng: "SO4 2-"
 * - viết liền: ion một nguyên tử thì chữ số là điện tích (Fe3+, O2-); ion nhiều nguyên tử thì một
 *   chữ số cuối là chỉ số và điện tích ±1 (NH4+, NO3-); "SO42-" nhập nhằng nên báo lỗi.
 * Chỉ số dưới Unicode (H₂O) được chấp nhận. "e-" là electron (dùng trong bán phản ứng).
 */

export type FormulaErrorCode =
  | 'empty'
  | 'unexpectedChar'
  | 'unknownElement'
  | 'lowercaseElement'
  | 'unclosedGroup'
  | 'unexpectedClose'
  | 'emptyGroup'
  | 'zeroCount'
  | 'leadingNumber'
  | 'ambiguousCharge'
  | 'missingPart';

export interface FormulaError {
  code: FormulaErrorCode;
  /** Vị trí ký tự lỗi trong chuỗi gốc */
  index: number;
  /** Số ký tự cần gạch chân */
  length: number;
  /** Ký hiệu gây lỗi (unknownElement, lowercaseElement) hoặc gợi ý viết lại (ambiguousCharge) */
  detail?: string;
}

export type DisplayToken = { text: string; kind: 'text' | 'sub' | 'sup' };

/** Một nhóm cấp cao nhất của một phần công thức: "K", "Mn", "O4" hay "(SO4)3" */
export interface TopGroup {
  composition: Map<string, number>;
  /** Ký hiệu/nhóm viết liền không kèm chỉ số, vd. "SO4" của "(SO4)3" */
  inner: string;
  count: number;
  paren: boolean;
}

export interface ParsedFormula {
  /** Số nguyên tử mỗi nguyên tố, theo thứ tự xuất hiện */
  composition: Map<string, number>;
  charge: number;
  /** Dạng chuẩn ASCII: "CuSO4·5H2O", "SO4^2-" */
  normalized: string;
  display: DisplayToken[];
  /** Các phần (ngăn bởi dấu chấm hydrat), mỗi phần gồm hệ số và các nhóm cấp cao nhất */
  parts: Array<{ coef: number; groups: TopGroup[] }>;
  electron: boolean;
}

const SUB_DIGITS = '₀₁₂₃₄₅₆₇₈₉';
const SUP_DIGITS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const HYDRATE = new Set(['·', '.', '*', '•', '∙']);

const digitOf = (c: string | undefined): number | null => {
  if (c === undefined) return null;
  if (c >= '0' && c <= '9') return c.charCodeAt(0) - 48;
  const i = SUB_DIGITS.indexOf(c);
  return i >= 0 ? i : null;
};

const formatCharge = (q: number) =>
  q === 0 ? '' : `${Math.abs(q) === 1 ? '' : Math.abs(q)}${q > 0 ? '+' : '−'}`;

interface ChargeSplit {
  body: string;
  charge: number;
}

/** Tách phần điện tích ở cuối chuỗi. */
function splitCharge(s: string, offset: number): Result<ChargeSplit, FormulaError> {
  // Chữ số trên: "²⁻", "⁺"
  let m = /([⁰¹²³⁴⁵⁶⁷⁸⁹]*)([⁺⁻])$/.exec(s);
  if (m) {
    const mag = m[1] ? Number([...m[1]].map((c) => SUP_DIGITS.indexOf(c)).join('')) : 1;
    return ok({ body: s.slice(0, m.index), charge: (m[2] === '⁺' ? 1 : -1) * mag });
  }
  // "^2-", "^+"
  m = /\^(\d*)([+\-−–])$/.exec(s);
  if (m) {
    const mag = m[1] ? Number(m[1]) : 1;
    return ok({ body: s.slice(0, m.index), charge: (m[2] === '+' ? 1 : -1) * mag });
  }
  // "SO4 2-"
  m = /\s+(\d*)([+\-−–])$/.exec(s);
  if (m) {
    const mag = m[1] ? Number(m[1]) : 1;
    return ok({ body: s.slice(0, m.index), charge: (m[2] === '+' ? 1 : -1) * mag });
  }
  // Viết liền: "Fe3+", "NH4+", "Cl-"
  m = /(\d*)([+\-−–])$/.exec(s);
  if (m) {
    const sign = m[2] === '+' ? 1 : -1;
    const digits = m[1] ?? '';
    const before = s.slice(0, m.index);
    if (!digits) return ok({ body: before, charge: sign });
    if (/^[A-Z][a-z]?$/.test(before)) return ok({ body: before, charge: sign * Number(digits) });
    if (digits.length === 1) return ok({ body: before + digits, charge: sign });
    const head = digits.slice(0, -1);
    return err({
      code: 'ambiguousCharge',
      index: offset + m.index,
      length: digits.length + 1,
      detail: `${before}${head}^${digits.at(-1)}${m[2] === '+' ? '+' : '-'}`,
    });
  }
  return ok({ body: s, charge: 0 });
}

class Parser {
  i = 0;
  display: DisplayToken[] = [];
  constructor(
    readonly s: string,
    readonly offset: number
  ) {}

  error(
    code: FormulaErrorCode,
    index = this.i,
    length = 1,
    detail?: string
  ): Result<never, FormulaError> {
    return err({ code, index: this.offset + index, length, detail });
  }

  readCount(): Result<number | null, FormulaError> {
    const start = this.i;
    let n = 0;
    let any = false;
    for (;;) {
      const d = digitOf(this.s[this.i]);
      if (d === null) break;
      n = n * 10 + d;
      any = true;
      this.i++;
    }
    if (!any) return ok(null);
    if (n === 0) return this.error('zeroCount', start, this.i - start);
    return ok(n);
  }

  /** Đọc các nhóm đến khi gặp ký tự đóng nhóm, dấu hydrat hoặc hết chuỗi. */
  groups(close: string | null): Result<TopGroup[], FormulaError> {
    const out: TopGroup[] = [];
    while (this.i < this.s.length) {
      const c = this.s[this.i]!;
      if (c === ')' || c === ']') {
        if (close === c) break;
        return this.error('unexpectedClose');
      }
      if (HYDRATE.has(c) && close === null) break;
      const g = this.group();
      if (!g.ok) return g;
      out.push(g.value);
    }
    return ok(out);
  }

  group(): Result<TopGroup, FormulaError> {
    const c = this.s[this.i]!;
    const start = this.i;
    let comp: Map<string, number>;
    let inner: string;
    let paren = false;
    if (c === '(' || c === '[') {
      const close = c === '(' ? ')' : ']';
      this.display.push({ text: c, kind: 'text' });
      this.i++;
      const innerStart = this.i;
      const gs = this.groups(close);
      if (!gs.ok) return gs;
      if (this.s[this.i] !== close) return this.error('unclosedGroup', start, 1);
      if (gs.value.length === 0) return this.error('emptyGroup', start, this.i - start + 1);
      inner = this.s.slice(innerStart, this.i);
      this.display.push({ text: close, kind: 'text' });
      this.i++;
      comp = new Map();
      for (const g of gs.value)
        for (const [el, k] of g.composition) comp.set(el, (comp.get(el) ?? 0) + k);
      paren = true;
    } else if (c >= 'A' && c <= 'Z') {
      const two = this.s.slice(this.i, this.i + 2);
      const lower = /^[A-Z][a-z]$/.test(two);
      let sym: string;
      if (lower && SYMBOL_SET.has(two)) sym = two;
      else if (lower) return this.error('unknownElement', this.i, 2, two);
      else if (SYMBOL_SET.has(c)) sym = c;
      else return this.error('unknownElement', this.i, 1, c);
      this.i += sym.length;
      this.display.push({ text: sym, kind: 'text' });
      comp = new Map([[sym, 1]]);
      inner = sym;
    } else if (c >= 'a' && c <= 'z') {
      // "co", "fe": gợi ý viết hoa chữ đầu
      const two = this.s.slice(this.i, this.i + 2);
      const guess =
        two.length === 2 && /[a-z]/.test(two[1]!)
          ? two[0]!.toUpperCase() + two[1]
          : c.toUpperCase();
      return this.error('lowercaseElement', this.i, guess.length, guess);
    } else if (digitOf(c) !== null) {
      return this.error('leadingNumber', this.i, 1);
    } else {
      return this.error('unexpectedChar', this.i, 1, c);
    }
    const count = this.readCount();
    if (!count.ok) return count;
    const k = count.value ?? 1;
    if (count.value !== null) this.display.push({ text: String(k), kind: 'sub' });
    if (k !== 1) for (const [el, v] of comp) comp.set(el, v * k);
    return ok({ composition: comp, inner, count: k, paren });
  }
}

export function parseFormula(input: string): Result<ParsedFormula, FormulaError> {
  const lead = input.length - input.trimStart().length;
  const s = input.trim();
  if (!s) return err({ code: 'empty', index: 0, length: 0 });

  if (/^e\s*[-−–⁻]?$/.test(s)) {
    return ok({
      composition: new Map(),
      charge: -1,
      normalized: 'e-',
      display: [
        { text: 'e', kind: 'text' },
        { text: '−', kind: 'sup' },
      ],
      parts: [],
      electron: true,
    });
  }

  const split = splitCharge(s, lead);
  if (!split.ok) return split;
  const { body, charge } = split.value;
  const p = new Parser(body, lead);
  const parts: ParsedFormula['parts'] = [];
  const composition = new Map<string, number>();
  let normalized = '';

  for (let first = true; ; first = false) {
    let coef = 1;
    if (!first) {
      const c = p.readCount();
      if (!c.ok) return c;
      coef = c.value ?? 1;
      if (c.value !== null) p.display.push({ text: String(coef), kind: 'text' });
    } else if (digitOf(body[0]) !== null) {
      return p.error('leadingNumber', 0, 1);
    }
    if (p.i >= body.length || HYDRATE.has(body[p.i]!))
      return p.error('missingPart', Math.max(0, p.i - 1), 1);
    const start = p.i;
    const gs = p.groups(null);
    if (!gs.ok) return gs;
    parts.push({ coef, groups: gs.value });
    for (const g of gs.value) {
      for (const [el, k] of g.composition)
        composition.set(el, (composition.get(el) ?? 0) + k * coef);
    }
    normalized +=
      (first ? '' : `·${coef === 1 ? '' : coef}`) +
      body.slice(start, p.i).replace(/[₀-₉]/g, (d) => String(SUB_DIGITS.indexOf(d)));
    if (p.i >= body.length) break;
    // dấu hydrat
    p.display.push({ text: '·', kind: 'text' });
    p.i++;
  }

  if (charge !== 0) {
    p.display.push({ text: formatCharge(charge), kind: 'sup' });
    normalized += `^${Math.abs(charge) === 1 ? '' : Math.abs(charge)}${charge > 0 ? '+' : '-'}`;
  }
  return ok({ composition, charge, normalized, display: p.display, parts, electron: false });
}

/** Khối lượng mol (g/mol). `masses`: nguyên tử khối theo ký hiệu. */
export function molarMass(
  f: Pick<ParsedFormula, 'composition'>,
  masses: Readonly<Record<string, number>>
): number {
  let m = 0;
  for (const [el, k] of f.composition) {
    const a = masses[el];
    if (a === undefined) throw new RangeError(`Thiếu nguyên tử khối của ${el}`);
    m += a * k;
  }
  return m;
}

/** Phần trăm khối lượng mỗi nguyên tố (tổng = 100). */
export function massPercent(
  f: Pick<ParsedFormula, 'composition'>,
  masses: Readonly<Record<string, number>>
): Record<string, number> {
  const total = molarMass(f, masses);
  const out: Record<string, number> = {};
  for (const [el, k] of f.composition)
    out[el] = total === 0 ? 0 : ((masses[el]! * k) / total) * 100;
  return out;
}

import { describe, expect, it } from 'vitest';

import { massPercent, molarMass, parseFormula } from '../src/formula';
import { Q } from '../src/rational';

const comp = (s: string) => {
  const r = parseFormula(s);
  if (!r.ok) throw new Error(`${s}: ${r.error.code}`);
  return Object.fromEntries(r.value.composition);
};
const charge = (s: string) => {
  const r = parseFormula(s);
  if (!r.ok) throw new Error(`${s}: ${r.error.code}`);
  return r.value.charge;
};
const error = (s: string) => {
  const r = parseFormula(s);
  if (r.ok) throw new Error(`${s} should fail`);
  return r.error;
};

describe('Q', () => {
  it('reduces and keeps the sign on the numerator', () => {
    expect(Q.of(6, -4).toString()).toBe('-3/2');
    expect(Q.of(8, 3).add(Q.of(1, 3)).toString()).toBe('3');
    expect(() => Q.of(1, 0)).toThrow(RangeError);
  });
});

describe('parseFormula: composition', () => {
  it.each<[string, Record<string, number>]>([
    ['H2O', { H: 2, O: 1 }],
    ['NaCl', { Na: 1, Cl: 1 }],
    ['Ca(OH)2', { Ca: 1, O: 2, H: 2 }],
    ['Al2(SO4)3', { Al: 2, S: 3, O: 12 }],
    ['K4[Fe(CN)6]', { K: 4, Fe: 1, C: 6, N: 6 }],
    ['CuSO4·5H2O', { Cu: 1, S: 1, O: 9, H: 10 }],
    ['CuSO4.5H2O', { Cu: 1, S: 1, O: 9, H: 10 }],
    ['Na2CO3*10H2O', { Na: 2, C: 1, O: 13, H: 20 }],
    ['CH3COOH', { C: 2, H: 4, O: 2 }],
    ['C6H12O6', { C: 6, H: 12, O: 6 }],
    ['H₂SO₄', { H: 2, S: 1, O: 4 }],
    ['Co', { Co: 1 }],
    ['CO', { C: 1, O: 1 }],
    ['  Og  ', { Og: 1 }],
  ])('%s', (s, c) => expect(comp(s)).toEqual(c));
});

describe('parseFormula: charge', () => {
  it.each<[string, number, Record<string, number>]>([
    ['Fe3+', 3, { Fe: 1 }],
    ['Fe^3+', 3, { Fe: 1 }],
    ['Fe³⁺', 3, { Fe: 1 }],
    ['O2-', -2, { O: 1 }],
    ['Cl-', -1, { Cl: 1 }],
    ['H+', 1, { H: 1 }],
    ['NH4+', 1, { N: 1, H: 4 }],
    ['NO3-', -1, { N: 1, O: 3 }],
    ['OH−', -1, { O: 1, H: 1 }],
    ['SO4^2-', -2, { S: 1, O: 4 }],
    ['SO4 2-', -2, { S: 1, O: 4 }],
    ['SO₄²⁻', -2, { S: 1, O: 4 }],
    ['Hg2^2+', 2, { Hg: 2 }],
    ['MnO4-', -1, { Mn: 1, O: 4 }],
    ['CH3COO-', -1, { C: 2, H: 3, O: 2 }],
  ])('%s', (s, q, c) => {
    expect(charge(s)).toBe(q);
    expect(comp(s)).toEqual(c);
  });

  it('flags ambiguous trailing digits instead of guessing', () => {
    const e = error('SO42-');
    expect(e.code).toBe('ambiguousCharge');
    expect(e.detail).toBe('SO4^2-');
    expect(e.index).toBe(2);
  });

  it('reads e- as an electron', () => {
    const r = parseFormula('e-');
    expect(r.ok && r.value.electron && r.value.charge).toBe(-1);
  });

  it('normalises charge with a caret', () => {
    const r = parseFormula('SO₄²⁻');
    expect(r.ok && r.value.normalized).toBe('SO4^2-');
  });
});

describe('parseFormula: errors point at the problem', () => {
  it.each<[string, string, number, string?]>([
    ['', 'empty', 0],
    ['Xx2', 'unknownElement', 0, 'Xx'],
    ['H2Q', 'unknownElement', 2, 'Q'],
    ['co2', 'lowercaseElement', 0, 'Co'],
    ['Ca(OH2', 'unclosedGroup', 2],
    ['CaOH)2', 'unexpectedClose', 4],
    ['Ca()2', 'emptyGroup', 2],
    ['H0', 'zeroCount', 1],
    ['2H2O', 'leadingNumber', 0],
    ['H2O#', 'unexpectedChar', 3, '#'],
    ['CuSO4·', 'missingPart', 5],
  ])('%s → %s at %i', (s, code, index, detail) => {
    const e = error(s);
    expect(e.code).toBe(code);
    expect(e.index).toBe(index);
    if (detail) expect(e.detail).toBe(detail);
  });
});

describe('display tokens', () => {
  it('marks counts as subscripts and charge as superscript', () => {
    const r = parseFormula('SO4^2-');
    expect(r.ok && r.value.display).toEqual([
      { text: 'S', kind: 'text' },
      { text: 'O', kind: 'text' },
      { text: '4', kind: 'sub' },
      { text: '2−', kind: 'sup' },
    ]);
  });
});

describe('molarMass / massPercent', () => {
  const masses = { H: 1.008, O: 15.999, C: 12.011, Na: 22.99, Cl: 35.45, Cu: 63.546, S: 32.06 };
  it('water ≈ 18.015 g/mol', () => {
    const r = parseFormula('H2O');
    expect(r.ok && molarMass(r.value, masses)).toBeCloseTo(18.015, 3);
  });
  it('blue vitriol ≈ 249.68 g/mol and percents add to 100', () => {
    const r = parseFormula('CuSO4·5H2O');
    if (!r.ok) throw new Error();
    expect(molarMass(r.value, masses)).toBeCloseTo(249.68, 1);
    const p = massPercent(r.value, masses);
    expect(Object.values(p).reduce((a, b) => a + b, 0)).toBeCloseTo(100, 10);
    expect(p.Cu).toBeCloseTo(25.45, 1);
  });
  it('throws on a missing mass', () => {
    const r = parseFormula('Og');
    expect(() => r.ok && molarMass(r.value, masses)).toThrow(RangeError);
  });
});

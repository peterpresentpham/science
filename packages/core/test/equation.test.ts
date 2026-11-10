import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import {
  balance,
  type BalanceResult,
  explainRedox,
  formatBalanced,
  oxidationStates,
  parseEquation,
  stoichiometry,
} from '../src/equation';
import { SAMPLE_EQUATIONS } from '../src/equation/samples';
import { parseFormula } from '../src/formula';
import { gcd } from '../src/rational';

const ok = (eq: string): BalanceResult => {
  const r = balance(eq);
  if (!r.ok) throw new Error(`${eq}: ${r.error.code}`);
  return r.value;
};
const fail = (eq: string) => {
  const r = balance(eq);
  if (r.ok) throw new Error(`${eq} should fail`);
  return r.error;
};
const nums = (r: BalanceResult) => r.coefficients.map(Number);

describe('sample equations (curriculum)', () => {
  it('has at least 60 equations', () => expect(SAMPLE_EQUATIONS.length).toBeGreaterThanOrEqual(60));

  it.each(SAMPLE_EQUATIONS.map((s) => [s.equation, s.expected] as const))('%s', (eq, expected) => {
    expect(nums(ok(eq))).toEqual(expected);
  });
});

describe('parseEquation', () => {
  it('tells charge "+" from the separator "+"', () => {
    const r = parseEquation('NH4+ + OH- -> NH3 + H2O');
    expect(r.ok && r.value.species.map((s) => s.formula.normalized)).toEqual([
      'NH4^+',
      'OH^-',
      'NH3',
      'H2O',
    ]);
  });

  it('accepts several arrow styles and user coefficients', () => {
    for (const arrow of ['->', '→', '=', '=>', '⇌'])
      expect(balance(`H2 + O2 ${arrow} H2O`).ok).toBe(true);
    const r = ok('2H2 + O2 = 2 H2O');
    expect(r.givenCorrect).toBe(true);
    expect(ok('H2 + O2 = 3H2O').givenCorrect).toBe(false);
  });

  it('reports formula errors at their position in the equation', () => {
    const e = fail('H2 + Oo2 -> H2O');
    expect(e.code).toBe('formula');
    expect(e.parse?.formula).toMatchObject({ code: 'unknownElement', index: 5 });
  });

  it.each([
    ['H2 + O2 H2O', 'noArrow'],
    ['H2 -> O2 -> H2O', 'manyArrows'],
    [' -> H2O', 'emptySide'],
    ['H2 + + O2 -> H2O', 'emptySpecies'],
  ])('%s → %s', (eq, code) => expect(fail(eq).code).toBe(code));
});

describe('balance errors', () => {
  it('impossible: an element on one side only', () =>
    expect(fail('H2 + O2 -> CO2').code).toBe('impossible'));

  it('multiple independent reactions', () => {
    const e = fail('Al + HNO3 -> Al(NO3)3 + NO + N2O + H2O');
    expect(e.code).toBe('multiple');
    expect(e.nullity).toBe(2);
  });

  it('a species that cannot take part', () => {
    const e = fail('H2 + O2 + N2 -> H2O');
    expect(e.code).toBe('notParticipating');
    expect(e.species).toEqual([2]);
  });

  it('a species on the wrong side', () => {
    const e = fail('H2O + H2 -> O2');
    expect(e.code).toBe('wrongSide');
  });
});

describe('formatBalanced', () => {
  it('writes the balanced equation', () => {
    expect(formatBalanced(ok('Cu + HNO3 -> Cu(NO3)2 + NO + H2O'))).toBe(
      '3Cu + 8HNO3 → 3Cu(NO3)2 + 2NO + 4H2O'
    );
  });
});

describe('oxidationStates', () => {
  const ox = (s: string) => {
    const r = parseFormula(s);
    if (!r.ok) throw new Error(s);
    const st = oxidationStates(r.value);
    return st?.map((e) => `${e.element}${e.ox.toString()}`).sort();
  };
  it.each<[string, string[]]>([
    ['O2', ['O0']],
    ['H2O', ['H1', 'O-2']],
    ['H2O2', ['H1', 'O-1']],
    ['OF2', ['F-1', 'O2']],
    ['NaH', ['H-1', 'Na1']],
    ['KMnO4', ['K1', 'Mn7', 'O-2']],
    ['K2Cr2O7', ['Cr6', 'K1', 'O-2']],
    ['Fe3O4', ['Fe8/3', 'O-2']],
    ['FeCl3', ['Cl-1', 'Fe3']],
    ['CuS', ['Cu2', 'S-2']],
    ['FeS2', ['Fe2', 'S-1']],
    ['Fe2(SO4)3', ['Fe3', 'O-2', 'S6']],
    ['FeSO4', ['Fe2', 'O-2', 'S6']],
    ['NH4NO3', ['H1', 'N-3', 'N5', 'O-2']],
    ['C2H5OH', ['C-2', 'H1', 'O-2']],
    ['CuSO4·5H2O', ['Cu2', 'H1', 'O-2', 'O-2', 'S6']],
    ['MnO4-', ['Mn7', 'O-2']],
    ['Fe3+', ['Fe3']],
    ['Hg2^2+', ['Hg1']],
  ])('%s', (s, expected) => expect(ox(s)).toEqual(expected));
});

describe('explainRedox (electron balance)', () => {
  const lines = (eq: string) =>
    explainRedox(ok(eq))?.lines.map(
      (l) => `${l.kind} ${l.atoms}${l.element} ${l.from}→${l.to} ${l.electrons}e ×${l.multiplier}`
    );

  it('Cu + HNO3 (dilute)', () => {
    expect(lines('Cu + HNO3 -> Cu(NO3)2 + NO + H2O')).toEqual([
      'oxidation 1Cu 0→2 2e ×3',
      'reduction 1N 5→2 3e ×2',
    ]);
  });

  it('KMnO4 + HCl: 2Cl⁻ → Cl₂', () => {
    expect(lines('KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O')).toEqual([
      'reduction 1Mn 7→2 5e ×2',
      'oxidation 2Cl -1→0 2e ×5',
    ]);
  });

  it('Fe3O4 with a fractional oxidation number', () => {
    expect(lines('Fe3O4 + HNO3 -> Fe(NO3)3 + NO + H2O')).toEqual([
      'oxidation 3Fe 8/3→3 1e ×3',
      'reduction 1N 5→2 3e ×1',
    ]);
  });

  it('disproportionation of chlorine', () => {
    expect(lines('Cl2 + KOH -> KCl + KClO3 + H2O')).toEqual([
      'reduction 1Cl 0→-1 1e ×5',
      'oxidation 1Cl 0→5 5e ×1',
    ]);
  });

  it('names the reducing and oxidizing agents', () => {
    const r = explainRedox(ok('Fe2O3 + CO -> Fe + CO2'))!;
    expect(r.reducing).toEqual([1]);
    expect(r.oxidizing).toEqual([0]);
    expect(r.electrons).toBe(6n);
  });

  it('is null for a non-redox reaction', () => {
    expect(explainRedox(ok('NaOH + HCl -> NaCl + H2O'))).toBeNull();
  });

  it('always agrees with the matrix solution when it gives an answer', () => {
    for (const s of SAMPLE_EQUATIONS) {
      const r = ok(s.equation);
      const ex = explainRedox(r);
      if (!ex) continue;
      const lost = ex.lines
        .filter((l) => l.kind === 'oxidation')
        .reduce((a, l) => a + l.electrons * l.multiplier, 0n);
      const gained = ex.lines
        .filter((l) => l.kind === 'reduction')
        .reduce((a, l) => a + l.electrons * l.multiplier, 0n);
      expect(lost, s.equation).toBe(gained);
    }
  });
});

describe('stoichiometry', () => {
  it('finds the limiting reagent: 2H2 + O2 → 2H2O with 3 mol H2 and 1 mol O2', () => {
    const r = stoichiometry([2n, 1n, 2n], 2, [3, 1, null])!;
    expect(r.limiting).toEqual([1]);
    expect(r.extent).toBe(1);
    expect(r.remaining[0]).toBeCloseTo(1, 12);
    expect(r.reacted[2]).toBe(2);
  });
  it('marks both as limiting when amounts are exact', () => {
    expect(stoichiometry([2n, 1n, 2n], 2, [2, 1, null])!.limiting).toEqual([0, 1]);
  });
  it('returns null without any amount', () =>
    expect(stoichiometry([1n, 1n], 1, [null, null])).toBeNull());
});

describe('property: shuffled equations stay balanced', () => {
  const samples = SAMPLE_EQUATIONS.filter((s) => s.topic !== 'ionic');
  it('conserves every element, has gcd 1, and matches the known coefficients', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: samples.length - 1 }),
        fc.array(fc.nat(), { minLength: 20, maxLength: 20 }),
        fc.boolean(),
        (k, noise, swap) => {
          const s = samples[k]!;
          const [l, r] = s.equation.split(' -> ') as [string, string];
          const sideL = l.split(' + ').map((t, i) => ({ t, c: s.expected[i]! }));
          const sideR = r.split(' + ').map((t, i) => ({ t, c: s.expected[sideL.length + i]! }));
          const shuffle = <T>(xs: T[]) =>
            xs
              .map((x, i) => ({ x, w: noise[i % noise.length]! + i / 100 }))
              .sort((a, b) => a.w - b.w)
              .map((y) => y.x);
          const A = shuffle(sideL);
          const B = shuffle(sideR);
          const [left, right] = swap ? [B, A] : [A, B];
          const eq = `${left.map((x) => x.t).join(' + ')} -> ${right.map((x) => x.t).join(' + ')}`;
          const res = ok(eq);
          expect(res.coefficients.map(Number)).toEqual([...left, ...right].map((x) => x.c));
          let g = 0n;
          for (const c of res.coefficients) g = gcd(g, c);
          expect(g).toBe(1n);
          // bảo toàn nguyên tố
          const tally = new Map<string, bigint>();
          res.equation.species.forEach((sp, i) => {
            const sign = i < res.equation.reactantCount ? 1n : -1n;
            for (const [el, n] of sp.formula.composition)
              tally.set(el, (tally.get(el) ?? 0n) + sign * BigInt(n) * res.coefficients[i]!);
          });
          for (const v of tally.values()) expect(v).toBe(0n);
        }
      ),
      { numRuns: 300 }
    );
  });
});

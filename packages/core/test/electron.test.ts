import { describe, expect, it } from 'vitest';

import {
  capacity,
  electronConfiguration,
  fillingSteps,
  ionConfiguration,
  MADELUNG,
  orbitalBoxes,
  shells,
  toNotation,
  totalElectrons,
  unpairedElectrons,
} from '../src';

const cfg = (z: number, core = true) =>
  toNotation(electronConfiguration(z), { nobleGasCore: core });

describe('Madelung order', () => {
  it('has 19 subshells holding 118 electrons', () => {
    expect(MADELUNG.map(([n, l]) => `${n}${'spdf'[l]}`).join(' ')).toBe(
      '1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p'
    );
    expect(MADELUNG.reduce((s, [, l]) => s + capacity(l), 0)).toBe(118);
  });
});

describe('electronConfiguration', () => {
  it.each(Array.from({ length: 118 }, (_, i) => i + 1))('Z=%i is consistent', (z) => {
    const c = electronConfiguration(z);
    expect(totalElectrons(c)).toBe(z);
    for (const s of c) {
      expect(s.electrons).toBeGreaterThan(0);
      expect(s.electrons).toBeLessThanOrEqual(capacity(s.l));
    }
    expect(shells(c).reduce((a, b) => a + b, 0)).toBe(z);
  });

  it.each([
    [1, '1s1'],
    [2, '1s2'],
    [8, '[He] 2s2 2p4'],
    [10, '[He] 2s2 2p6'],
    [11, '[Ne] 3s1'],
    [18, '[Ne] 3s2 3p6'],
    [24, '[Ar] 3d5 4s1'],
    [26, '[Ar] 3d6 4s2'],
    [29, '[Ar] 3d10 4s1'],
    [30, '[Ar] 3d10 4s2'],
    [35, '[Ar] 3d10 4s2 4p5'],
    [42, '[Kr] 4d5 5s1'],
    [46, '[Kr] 4d10'],
    [47, '[Kr] 4d10 5s1'],
    [57, '[Xe] 5d1 6s2'],
    [58, '[Xe] 4f1 5d1 6s2'],
    [64, '[Xe] 4f7 5d1 6s2'],
    [78, '[Xe] 4f14 5d9 6s1'],
    [79, '[Xe] 4f14 5d10 6s1'],
    [82, '[Xe] 4f14 5d10 6s2 6p2'],
    [90, '[Rn] 6d2 7s2'],
    [92, '[Rn] 5f3 6d1 7s2'],
    [103, '[Rn] 5f14 7s2 7p1'],
    [118, '[Rn] 5f14 6d10 7s2 7p6'],
  ])('Z=%i → %s', (z, expected) => {
    expect(cfg(z)).toBe(expected);
  });

  it('writes full notation sorted by shell (SGK style)', () => {
    expect(cfg(26, false)).toBe('1s2 2s2 2p6 3s2 3p6 3d6 4s2');
    expect(toNotation(electronConfiguration(26), { nobleGasCore: true, superscript: true })).toBe(
      '[Ar] 3d⁶ 4s²'
    );
  });

  it('computes shells', () => {
    expect(shells(electronConfiguration(26))).toEqual([2, 8, 14, 2]);
    expect(shells(electronConfiguration(79))).toEqual([2, 8, 18, 32, 18, 1]);
  });
});

describe('orbital boxes & Hund', () => {
  it('N has 3 unpaired electrons in 2p', () => {
    const p = orbitalBoxes(electronConfiguration(7)).find((s) => s.label === '2p');
    expect(p?.boxes).toEqual([
      { up: true, down: false },
      { up: true, down: false },
      { up: true, down: false },
    ]);
    expect(unpairedElectrons(electronConfiguration(7))).toBe(3);
  });
  it('O has 2 unpaired, Fe has 4, Cr has 6', () => {
    expect(unpairedElectrons(electronConfiguration(8))).toBe(2);
    expect(unpairedElectrons(electronConfiguration(26))).toBe(4);
    expect(unpairedElectrons(electronConfiguration(24))).toBe(6);
  });
});

describe('ionConfiguration', () => {
  const ion = (z: number, q: number) => toNotation(ionConfiguration(z, q), { nobleGasCore: true });
  it('removes 4s before 3d', () => {
    expect(ion(26, 2)).toBe('[Ar] 3d6');
    expect(ion(26, 3)).toBe('[Ar] 3d5');
    expect(ion(29, 1)).toBe('[Ar] 3d10');
  });
  it('main group ions reach noble gas configuration', () => {
    expect(ion(11, 1)).toBe('[He] 2s2 2p6');
    expect(ion(17, -1)).toBe('[Ne] 3s2 3p6');
    expect(ion(8, -2)).toBe('[He] 2s2 2p6');
  });
  it('rejects impossible charges', () => {
    expect(() => ionConfiguration(1, 2)).toThrow();
  });
});

describe('fillingSteps', () => {
  it('has one step per electron, rules follow Aufbau/Hund/Pauli', () => {
    const steps = fillingSteps(8);
    expect(steps).toHaveLength(8);
    expect(steps.map((s) => s.rule)).toEqual([
      'aufbau',
      'pauli',
      'aufbau',
      'pauli',
      'aufbau',
      'hund',
      'hund',
      'pauli',
    ]);
    expect(steps.at(-1)?.configuration).toEqual(electronConfiguration(8));
  });
  it('adds a final exception step for Cr', () => {
    const steps = fillingSteps(24);
    expect(steps).toHaveLength(25);
    expect(steps.at(-2)?.configuration.find((s) => s.l === 2)?.electrons).toBe(4);
    expect(steps.at(-1)?.rule).toBe('exception');
    expect(steps.at(-1)?.configuration).toEqual(electronConfiguration(24));
  });
});

import { describe, expect, it } from 'vitest';

import { nucleonCounts, representativeMassNumber } from '../src/nuclear';

describe('representativeMassNumber', () => {
  it.each([
    [1, 1],
    [6, 12],
    [17, 35],
    [26, 56],
    [29, 63],
    [35, 79],
    [43, 98],
    [92, 238],
    [118, 294],
  ])('Z=%i → A=%i', (z, a) => expect(representativeMassNumber(z)).toBe(a));

  it('never has fewer nucleons than protons, and grows roughly with Z', () => {
    for (let z = 1; z <= 118; z++) {
      const a = representativeMassNumber(z);
      expect(a).toBeGreaterThanOrEqual(z);
      expect(a).toBeLessThanOrEqual(2.6 * z + 4);
    }
  });

  it('rejects out-of-range Z', () =>
    expect(() => representativeMassNumber(119)).toThrow(RangeError));
});

describe('nucleonCounts', () => {
  it('iron-56: 26p, 30n, 26e', () =>
    expect(nucleonCounts(26)).toEqual({
      protons: 26,
      neutrons: 30,
      electrons: 26,
      massNumber: 56,
    }));
});

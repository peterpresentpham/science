import { describe, expect, it } from 'vitest';

import {
  laguerre,
  meanRadius,
  nodeCounts,
  type OrbitalL,
  orbitalName,
  psi,
  radial,
  realYlm,
  sampleOrbital,
} from '../src/orbital';

const SUBSHELLS: Array<[number, OrbitalL]> = [];
for (let n = 1; n <= 5; n++)
  for (let l = 0; l < Math.min(n, 4); l++) SUBSHELLS.push([n, l as OrbitalL]);

/** Tích phân Simpson của f trên [0, b] */
function simpson(f: (x: number) => number, b: number, steps = 4000) {
  const h = b / steps;
  let s = f(0) + f(b);
  for (let i = 1; i < steps; i++) s += f(i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}

/** Tích phân trên mặt cầu của f(x, y, z) với (x, y, z) là vector đơn vị */
function sphere(f: (x: number, y: number, z: number) => number, N = 120) {
  let s = 0;
  const dth = Math.PI / N;
  const dph = (2 * Math.PI) / (2 * N);
  for (let i = 0; i < N; i++) {
    const th = (i + 0.5) * dth;
    for (let j = 0; j < 2 * N; j++) {
      const ph = (j + 0.5) * dph;
      s +=
        f(Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)) *
        Math.sin(th) *
        dth *
        dph;
    }
  }
  return s;
}

describe('laguerre', () => {
  it('matches closed forms', () => {
    for (const x of [0, 0.7, 3, 9]) {
      expect(laguerre(0, 3, x)).toBe(1);
      expect(laguerre(1, 2, x)).toBeCloseTo(3 - x, 12);
      // L_2^1(x) = x²/2 − 3x + 3
      expect(laguerre(2, 1, x)).toBeCloseTo((x * x) / 2 - 3 * x + 3, 12);
    }
  });
});

describe('radial', () => {
  it.each(SUBSHELLS)('R_%i%i is normalised', (n, l) => {
    expect(simpson((r) => radial(n, l, r) ** 2 * r * r, 40 * n * n)).toBeCloseTo(1, 4);
  });

  it.each(SUBSHELLS)('R_%i%i has n − l − 1 radial nodes', (n, l) => {
    let changes = 0;
    let prev = radial(n, l, 1e-6);
    for (let r = 0.01; r < 40 * n * n; r += 0.01) {
      const v = radial(n, l, r);
      if (Math.abs(v) < 1e-14) continue; // đuôi rất nhỏ, tránh nhiễu số học
      if (Math.sign(v) !== Math.sign(prev)) changes++;
      prev = v;
    }
    expect(changes).toBe(nodeCounts(n, l).radial);
  });

  it('shrinks with nuclear charge', () => {
    expect(radial(1, 0, 0, 2)).toBeCloseTo(2 * 2 ** 1.5, 10); // R_10(0) = 2 Z^{3/2}
  });
});

describe('realYlm', () => {
  for (let l = 0; l <= 3; l++) {
    for (let m = -l; m <= l; m++) {
      it(`Y(${l},${m}) is normalised`, () => {
        expect(sphere((x, y, z) => realYlm(l, m, x, y, z) ** 2)).toBeCloseTo(1, 3);
      });
    }
  }

  it('is orthogonal between different orbitals', () => {
    for (let l = 1; l <= 3; l++) {
      for (let m = -l; m < l; m++) {
        const dot = sphere((x, y, z) => realYlm(l, m, x, y, z) * realYlm(l, m + 1, x, y, z));
        expect(Math.abs(dot)).toBeLessThan(1e-3);
      }
    }
  });

  it('points the p orbitals along their axes', () => {
    expect(realYlm(1, 1, 1, 0, 0)).toBeGreaterThan(0); // px
    expect(realYlm(1, 1, 0, 1, 0)).toBeCloseTo(0, 12);
    expect(realYlm(1, -1, 0, 1, 0)).toBeGreaterThan(0); // py
    expect(realYlm(1, 0, 0, 0, 1)).toBeGreaterThan(0); // pz
  });

  it('dxy is zero on the axes and largest on the diagonal', () => {
    expect(realYlm(2, -2, 1, 0, 0)).toBeCloseTo(0, 12);
    expect(realYlm(2, -2, 1, 1, 0)).toBeGreaterThan(realYlm(2, -2, 1, 0.2, 0));
  });
});

describe('psi', () => {
  it('1s at the nucleus is 1/√π', () => {
    expect(psi(1, 0, 0, 0, 0, 0)).toBeCloseTo(1 / Math.sqrt(Math.PI), 12);
  });

  it('2pz changes sign across the xy plane', () => {
    expect(psi(2, 1, 0, 0, 0, 2)).toBeGreaterThan(0);
    expect(psi(2, 1, 0, 0, 0, -2)).toBeLessThan(0);
    expect(psi(2, 1, 0, 2, 0, 0)).toBeCloseTo(0, 12);
  });
});

describe('orbitalName', () => {
  it('uses textbook names', () => {
    expect(orbitalName(1, 0, 0)).toBe('1s');
    expect(orbitalName(2, 1, 1)).toBe('2px');
    expect(orbitalName(3, 2, 0)).toBe('3dz²');
    expect(orbitalName(4, 3, -2)).toBe('4fxyz');
  });
});

describe('sampleOrbital', () => {
  it('is deterministic for a seed', () => {
    const a = sampleOrbital(2, 1, 0, 100, { seed: 7 });
    const b = sampleOrbital(2, 1, 0, 100, { seed: 7 });
    expect([...a.positions]).toEqual([...b.positions]);
  });

  it.each<[number, OrbitalL, number]>([
    [1, 0, 0],
    [2, 1, 0],
    [3, 2, 0],
    [4, 3, 1],
  ])('mean radius of %i,%i,%i matches theory', (n, l, m) => {
    const s = sampleOrbital(n, l, m, 20000, { seed: 3 });
    let sum = 0;
    for (let i = 0; i < 20000; i++) {
      sum += Math.hypot(s.positions[i * 3]!, s.positions[i * 3 + 1]!, s.positions[i * 3 + 2]!);
    }
    expect(sum / 20000 / meanRadius(n, l)).toBeCloseTo(1, 1);
  });

  it('2pz has both phases, one above and one below the xy plane', () => {
    const s = sampleOrbital(2, 1, 0, 2000, { seed: 1 });
    for (let i = 0; i < 2000; i++) {
      const z = s.positions[i * 3 + 2]!;
      if (Math.abs(z) > 1e-6) expect(s.phase[i]).toBe(z > 0 ? 1 : 0);
    }
  });

  it('dxy keeps points away from the x axis (angular node)', () => {
    const s = sampleOrbital(3, 2, -2, 5000, { seed: 2 });
    let nearAxis = 0;
    for (let i = 0; i < 5000; i++) {
      const [x, y, z] = [s.positions[i * 3]!, s.positions[i * 3 + 1]!, s.positions[i * 3 + 2]!];
      if (Math.hypot(y, z) < 0.05 * Math.abs(x)) nearAxis++;
    }
    expect(nearAxis).toBeLessThan(25);
  });

  it('rejects impossible quantum numbers', () => {
    expect(() => sampleOrbital(2, 2 as OrbitalL, 0, 1)).toThrow(RangeError);
    expect(() => sampleOrbital(3, 1, 2, 1)).toThrow(RangeError);
  });
});

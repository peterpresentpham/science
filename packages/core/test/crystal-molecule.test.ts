import { describe, expect, it } from 'vitest';

import { buildCrystal, crystalToXYZ } from '../src/crystal';
import { angle, distance, mainGroupValence, parseSDF, vsepr } from '../src/molecule';

describe('buildCrystal', () => {
  it.each([
    ['bcc', 2.8665, 8, 2, (a: number) => (a * Math.sqrt(3)) / 2],
    ['fcc', 3.615, 12, 4, (a: number) => a / Math.SQRT2],
    ['diamond', 3.567, 4, 8, (a: number) => (a * Math.sqrt(3)) / 4],
    ['rocksalt', 5.64, 6, 8, (a: number) => a / 2],
    ['cscl', 4.12, 8, 2, (a: number) => (a * Math.sqrt(3)) / 2],
    ['zincblende', 5.41, 4, 8, (a: number) => (a * Math.sqrt(3)) / 4],
  ] as const)(
    '%s: coordination, atoms per cell, nearest distance',
    (lattice, a, cn, perCell, nn) => {
      const c = buildCrystal({ lattice, a });
      expect(c.coordination).toBe(cn);
      expect(c.atomsPerCell).toBe(perCell);
      expect(c.nearest).toBeCloseTo(nn(a), 4);
    }
  );

  it('hcp (ideal c/a) has 12 nearest neighbours at distance a', () => {
    const c = buildCrystal({ lattice: 'hcp', a: 3, c: 3 * Math.sqrt(8 / 3) });
    expect(c.coordination).toBe(12);
    expect(c.nearest).toBeCloseTo(3, 4);
  });

  it('graphite: 3 neighbours in the layer at a/√3', () => {
    const c = buildCrystal({ lattice: 'graphite', a: 2.464, c: 6.711 });
    expect(c.coordination).toBe(3);
    expect(c.nearest).toBeCloseTo(2.464 / Math.sqrt(3), 3);
  });

  it('a conventional fcc cell drawn with corners and faces shows 14 atoms', () => {
    expect(buildCrystal({ lattice: 'fcc', a: 4 }).atoms).toHaveLength(14);
    expect(buildCrystal({ lattice: 'bcc', a: 4 }).atoms).toHaveLength(9);
    expect(buildCrystal({ lattice: 'fcc', a: 4 }, 2).atoms).toHaveLength(63);
    expect(buildCrystal({ lattice: 'fcc', a: 4 }).edges).toHaveLength(12);
  });

  it('B12 icosahedron: 12 atoms, each with 5 neighbours at the edge length', () => {
    const c = buildCrystal({ lattice: 'icosahedron', a: 1.77 });
    expect(c.atoms).toHaveLength(12);
    const p0 = c.atoms[0]!.pos;
    const near = c.atoms.slice(1).filter((x) => Math.abs(distance(x.pos, p0) - 1.77) < 1e-6);
    expect(near).toHaveLength(5);
  });

  it('writes XYZ with one symbol per site', () => {
    const xyz = crystalToXYZ(buildCrystal({ lattice: 'rocksalt', a: 5.64 }), ['Na', 'Cl']);
    const lines = xyz.trim().split('\n');
    expect(Number(lines[0])).toBe(lines.length - 2);
    expect(xyz).toMatch(/^Na /m);
    expect(xyz).toMatch(/^Cl /m);
  });
});

// Nước 3D rút gọn từ PubChem CID 962
const WATER = `962
  -OEChem-

  3  2  0     0  0  0  0  0  0999 V2000
    0.0000    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
    0.2774    0.8929    0.2544 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.6068   -0.2383   -0.7169 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  1  3  1  0  0  0  0
M  END
$$$$
`;
const AMMONIUM_2D = `223
  -OEChem-

  5  4  0     0  0  0  0  0  0999 V2000
    2.0000    0.0000    0.0000 N   0  3  0  0  0  0  0  0  0  0  0  0
    2.5000    0.8660    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    2.5000   -0.8660    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    1.0000    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.0000    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  1  3  1  0  0  0  0
  1  4  1  0  0  0  0
  1  5  1  0  0  0  0
M  CHG  1   1   1
M  END
`;

describe('parseSDF', () => {
  it('reads atoms, bonds and 3D coordinates', () => {
    const r = parseSDF(WATER);
    if (!r.ok) throw new Error(r.error);
    expect(r.value.atoms.map((a) => a.el)).toEqual(['O', 'H', 'H']);
    expect(r.value.bonds).toHaveLength(2);
    expect(r.value.flat).toBe(false);
  });
  it('reads charges from the M  CHG block and flags 2D files', () => {
    const r = parseSDF(AMMONIUM_2D);
    if (!r.ok) throw new Error(r.error);
    expect(r.value.atoms[0]!.charge).toBe(1);
    expect(r.value.flat).toBe(true);
  });
  it('rejects non-V2000 text', () => expect(parseSDF('hello').ok).toBe(false));
});

describe('measurements', () => {
  it('angle of a right triangle corner is 90°', () =>
    expect(angle([1, 0, 0], [0, 0, 0], [0, 1, 0])).toBeCloseTo(90, 10));
});

describe('mainGroupValence', () => {
  it.each([
    ['H', 1],
    ['C', 4],
    ['N', 5],
    ['O', 6],
    ['F', 7],
    ['Ne', 8],
    ['Na', 1],
    ['Al', 3],
    ['P', 5],
    ['S', 6],
    ['Cl', 7],
    ['Ca', 2],
    ['Ga', 3],
    ['Br', 7],
    ['Sn', 4],
    ['I', 7],
    ['Xe', 8],
    ['Pb', 4],
  ] as const)('%s → %i', (el, v) => expect(mainGroupValence(el)).toBe(v));
  it.each(['Fe', 'Cu', 'Au', 'La', 'U'])('%s is not main group', (el) =>
    expect(mainGroupValence(el)).toBeNull()
  );
});

describe('vsepr', () => {
  it('water is AX2E2, bent, ~104.5°', () => {
    const r = parseSDF(WATER);
    if (!r.ok) throw new Error();
    const [c] = vsepr(r.value);
    expect(c).toMatchObject({ el: 'O', notation: 'AX2E2', geometry: 'bent', idealAngle: 109.5 });
    expect(c!.measuredAngle).toBeGreaterThan(100);
    expect(c!.measuredAngle).toBeLessThan(110);
  });
  it('ammonium is AX4, tetrahedral (charge taken into account)', () => {
    const r = parseSDF(AMMONIUM_2D);
    if (!r.ok) throw new Error();
    expect(vsepr(r.value)[0]).toMatchObject({
      notation: 'AX4',
      geometry: 'tetrahedral',
      measuredAngle: null,
    });
  });
});

import { describe, expect, it } from 'vitest';

import {
  atomsPerGram,
  atomsPerMillimetre,
  compareDensity,
  compareTemperature,
  humanScale,
  type HumanScaleInput,
} from '../src';

const base: HumanScaleInput = {
  z: 26,
  atomicMass: 55.845,
  phase: 'solid',
  densityGcm3: 7.874,
  meltingPointK: 1811,
  boilingPointK: 3134,
  atomicRadiusPm: 194,
};
const kinds = (input: Partial<HumanScaleInput>) =>
  humanScale({ ...base, ...input }).map((f) => f.kind);

describe('compareTemperature', () => {
  it.each([
    // [°C, relation, landmark]
    [-38.83, 'below', 'freezer'], // Hg nóng chảy: lạnh hơn ngăn đá
    [-268.93, 'below', 'coldestEarth'], // He sôi
    [356.73, 'above', 'oven'], // Hg sôi
    [29.76, 'above', 'room'], // Ga nóng chảy (không đủ gần 25 °C)
    [1538, 'above', 'lava'], // Fe nóng chảy
    [3422, 'above', 'gasFlame'], // W nóng chảy
    [5554.85, 'near', 'sunSurface'], // W sôi
    [99, 'near', 'boilingWater'],
    [-7.2, 'below', 'ice'], // Br nóng chảy
    [9000, 'above', 'sunSurface'],
  ] as const)('%s °C → %s %s', (c, relation, landmark) => {
    expect(compareTemperature(c)).toEqual({ relation, landmark });
  });
});

describe('compareDensity', () => {
  it('compares solids and liquids with water', () => {
    expect(compareDensity(7.874, 'solid')).toMatchObject({ relation: 'heavierThanWater' });
    expect(compareDensity(7.874, 'solid').ratio).toBeCloseTo(7.874);
    expect(compareDensity(0.534, 'solid')).toMatchObject({ relation: 'lighterThanWater' });
    expect(compareDensity(0.97, 'solid')).toEqual({ relation: 'likeWater', ratio: 1 });
  });
  it('compares gases with air', () => {
    expect(compareDensity(0.00008988, 'gas').relation).toBe('lighterThanAir'); // H
    expect(compareDensity(0.00008988, 'gas').ratio).toBeCloseTo(13.6, 1);
    expect(compareDensity(0.00973, 'gas').relation).toBe('heavierThanAir'); // Rn
    expect(compareDensity(0.0012506, 'gas').relation).toBe('likeAir'); // N
  });
});

describe('counts', () => {
  it('lines up about 2.6 million iron atoms per millimetre', () => {
    expect(atomsPerMillimetre(194)).toBeCloseTo(2.577e6, -3);
  });
  it('has about 1.08 × 10²² iron atoms per gram', () => {
    expect(atomsPerGram(55.845)).toBeCloseTo(1.0784e22, -19);
  });
});

describe('humanScale', () => {
  it('gallium melts in your hand instead of a plain melting comparison', () => {
    const facts = kinds({ z: 31, meltingPointK: 302.91 });
    expect(facts).toContain('meltsInHand');
    expect(facts).not.toContain('melting');
  });
  it('skips helium melting point (needs pressure)', () => {
    expect(
      kinds({
        z: 2,
        phase: 'gas',
        densityGcm3: 0.0001785,
        meltingPointK: 0.95,
        boilingPointK: 4.22,
      })
    ).toEqual(['density', 'boiling', 'atomsPerMm', 'atomsPerGram']);
  });
  it('mercury: liquid, heavy, freezes below the freezer', () => {
    const facts = humanScale({
      ...base,
      z: 80,
      phase: 'liquid',
      densityGcm3: 13.5336,
      meltingPointK: 234.32,
    });
    expect(facts.find((f) => f.kind === 'melting')).toMatchObject({
      relation: 'below',
      landmark: 'freezer',
    });
  });
  it('superheavy elements still get two facts, marked as hypothetical', () => {
    const facts = humanScale({
      z: 118,
      atomicMass: 294,
      phase: 'unknown',
      densityGcm3: null,
      meltingPointK: null,
      boilingPointK: null,
      atomicRadiusPm: null,
    });
    expect(facts.map((f) => f.kind)).toEqual(['radioactive', 'atomsPerGram']);
    expect(facts[1]).toMatchObject({ hypothetical: true });
  });
});

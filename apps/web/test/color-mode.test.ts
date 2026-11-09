import { describe, expect, it } from 'vitest';

import {
  DISCOVERY_RANGE,
  knownBy,
  paintCell,
  parseColorMode,
  phaseAt,
  propertyScale,
  ROOM_TEMP_K,
} from '../src/lib/color-mode';
import { COMPARE_MAX, parseZList } from '../src/lib/compare';
import { BY_Z, ELEMENTS } from '../src/lib/elements';

const el = (sym: string) => ELEMENTS.find((e) => e.symbol === sym)!;
const opts = (o: Partial<{ tempK: number; year: number }> = {}) => ({
  tempK: o.tempK ?? ROOM_TEMP_K,
  year: o.year ?? DISCOVERY_RANGE.max,
  format: (v: number, d: number) => v.toFixed(d),
  blockLabel: (b: string) => `${b}-block`,
});

describe('parseColorMode', () => {
  it('falls back to category for unknown or missing values', () => {
    expect(parseColorMode(null)).toBe('category');
    expect(parseColorMode('rainbow')).toBe('category');
    expect(parseColorMode('en')).toBe('en');
  });
});

describe('phaseAt', () => {
  it('matches the familiar room-temperature states', () => {
    expect(phaseAt(el('Fe'), ROOM_TEMP_K)).toBe('solid');
    expect(phaseAt(el('Hg'), ROOM_TEMP_K)).toBe('liquid');
    expect(phaseAt(el('Br'), ROOM_TEMP_K)).toBe('liquid');
    expect(phaseAt(el('O'), ROOM_TEMP_K)).toBe('gas');
  });

  it('follows the slider: gallium melts on a hot day, iron boils in a furnace', () => {
    expect(phaseAt(el('Ga'), 273)).toBe('solid');
    expect(phaseAt(el('Ga'), 310)).toBe('liquid');
    expect(phaseAt(el('Fe'), 3500)).toBe('gas');
  });

  it('helium stays liquid near absolute zero (no melting point at normal pressure)', () => {
    expect(phaseAt({ meltingPointK: null, boilingPointK: 4.22 }, 1)).toBe('liquid');
  });

  it('is unknown without data', () => {
    expect(phaseAt({ meltingPointK: null, boilingPointK: null }, ROOM_TEMP_K)).toBe('unknown');
  });
});

describe('propertyScale', () => {
  it('maps the extremes to 0 and 1', () => {
    const s = propertyScale('en');
    expect(s.at(s.min)).toBe(0);
    expect(s.at(s.max)).toBe(1);
    expect(s.at(el('F').electronegativity!)).toBe(1);
  });

  it('uses a log scale for density so gases and metals both get room', () => {
    const s = propertyScale('density');
    // log10: H₂ (≈ 0,00009) → −4,05; Os (22,6) → 1,35; nước (1) → 0 nằm ở khoảng 3/4 thang.
    // Thang tuyến tính sẽ đặt nước ở ≈ 0,04, dồn gần hết nguyên tố vào cùng một màu nhạt.
    const water = s.at(1);
    expect(water).toBeGreaterThan(0.7);
    expect(water).toBeLessThan(0.8);
  });
});

describe('paintCell', () => {
  it('keeps category colours by default', () => {
    expect(paintCell(el('Na'), 'category', opts())).toEqual({});
  });

  it('labels the block on the tile as well as colouring it', () => {
    const p = paintCell(el('Fe'), 'block', opts());
    expect(p.color).toBe('var(--block-d)');
    expect(p.caption).toBe('d-block');
  });

  it('marks missing property values with hatching instead of a scale colour', () => {
    const noEa = ELEMENTS.find((e) => e.electronAffinityEv == null)!;
    expect(paintCell(noEa, 'ea', opts())).toMatchObject({ missing: true });
    const fe = paintCell(el('Fe'), 'mp', opts());
    expect(fe.missing).toBeUndefined();
    expect(fe.caption).toBe('1538'); // 1811 K → °C
  });

  it('hatches elements not yet discovered in the chosen year', () => {
    const ts = el('Ts');
    expect(paintCell(ts, 'discovery', opts({ year: 2000 })).missing).toBe(true);
    expect(paintCell(ts, 'discovery', opts({ year: DISCOVERY_RANGE.max })).missing).toBeUndefined();
  });

  it('counts ancient elements (no year) as always known', () => {
    expect(knownBy({ discoveryYear: null }, DISCOVERY_RANGE.min - 1)).toBe(true);
  });
});

describe('parseZList', () => {
  it('drops unknown, duplicate and extra numbers', () => {
    expect(parseZList('11,19,abc,11,999')).toEqual([11, 19]);
    expect(parseZList('1,2,3,4,5')).toHaveLength(COMPARE_MAX);
    expect(parseZList(null)).toEqual([]);
    expect(BY_Z.has(118)).toBe(true);
  });
});

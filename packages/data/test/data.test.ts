import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { electronConfiguration, humanScale, shells, toNotation } from '@chem/core';
import { describe, expect, it } from 'vitest';

import { parseAttribution, PHOTO_LICENSES, photoFile } from '../src/photo';
import { ElementFull, ElementLite } from '../src/schema';
import { Story } from '../src/story';

const DIST = join(import.meta.dirname, '..', 'dist');
const lite = ElementLite.array().parse(
  JSON.parse(readFileSync(join(DIST, 'elements.json'), 'utf8'))
);
const full = readdirSync(join(DIST, 'elements')).map((f) =>
  ElementFull.parse(JSON.parse(readFileSync(join(DIST, 'elements', f), 'utf8')))
);

describe('dist data integrity', () => {
  it('has 118 elements with consecutive Z', () => {
    expect(lite).toHaveLength(118);
    expect(lite.map((e) => e.z)).toEqual(Array.from({ length: 118 }, (_, i) => i + 1));
    expect(full).toHaveLength(118);
  });

  it('has unique symbols, slugs and grid positions', () => {
    expect(new Set(lite.map((e) => e.symbol)).size).toBe(118);
    expect(new Set(lite.map((e) => e.slug)).size).toBe(118);
    expect(new Set(lite.map((e) => `${e.grid.x},${e.grid.y}`)).size).toBe(118);
    expect(new Set(lite.map((e) => `${e.grid32.x},${e.grid32.y}`)).size).toBe(118);
  });

  it('electron configuration and shells agree with @chem/core', () => {
    for (const e of full) {
      const cfg = electronConfiguration(e.z);
      expect(e.electronConfiguration).toBe(toNotation(cfg, { nobleGasCore: true }));
      expect(e.shells).toEqual(shells(cfg));
      expect(e.shells.reduce((a, b) => a + b, 0)).toBe(e.z);
    }
  });

  it('every element has a Vietnamese name', () => {
    for (const e of lite) expect(e.name.vi.length).toBeGreaterThan(0);
  });

  it('spot-checks well known values', () => {
    const by = Object.fromEntries(lite.map((e) => [e.symbol, e]));
    expect(by.Fe?.name.vi).toBe('Sắt');
    expect(by.Na?.name.en).toBe('Sodium');
    expect(by.Hg?.phaseAtSTP).toBe('liquid');
    expect(by.Br?.phaseAtSTP).toBe('liquid');
    expect(by.O?.phaseAtSTP).toBe('gas');
    expect(by.Cl?.category).toBe('halogen');
    expect(by.Fe?.group).toBe(8);
    expect(by.La?.group).toBeNull();
    expect(by.Li?.atomicMass).toBe(6.94);
    expect(by.F?.electronegativity).toBe(3.98);
  });
});

describe('photos', () => {
  const IMAGES = join(import.meta.dirname, '..', 'images');

  it('has a photo for most elements, and each photo has both files on disk', () => {
    const withPhoto = lite.filter((e) => e.photo);
    expect(withPhoto.length).toBeGreaterThanOrEqual(100);
    for (const e of withPhoto) {
      for (const size of ['large', 'thumb', 'mini'] as const) {
        expect(existsSync(join(IMAGES, photoFile(e.slug, size))), `${e.slug} ${size}`).toBe(true);
      }
    }
  });

  it('credits every photo with an allowed license', () => {
    for (const e of full) {
      expect(Boolean(e.photo), e.slug).toBe(Boolean(e.photoCredit));
      if (e.photoCredit) expect(Object.keys(PHOTO_LICENSES)).toContain(e.photoCredit.license);
    }
  });

  it('keeps known problem images out', () => {
    for (const slug of ['cm', 'rf', 'og'])
      expect(lite.find((e) => e.slug === slug)?.photo).toBeNull();
  });
});

describe('parseAttribution', () => {
  it.each([
    [
      'User:Jurii, CC BY 3.0 <https://creativecommons.org/licenses/by/3.0>, via Wikimedia Commons',
      'Jurii',
      'CC BY 3.0',
    ],
    [
      'GFDL, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons',
      'Wikimedia Commons contributor',
      'CC BY-SA 4.0',
    ],
    [
      'Dnn87 Contact email: Dnn87yahoo.dk, CC BY-SA 3.0 <x>, via Wikimedia Commons',
      'Dnn87',
      'CC BY-SA 3.0',
    ],
    [
      'Chemical Elements A Virtual Museum under a Creative Commons Attribution 3.0 Unported License, source: x',
      'Chemical Elements – A Virtual Museum',
      'CC BY 3.0',
    ],
    ['Benjah-bmm27, Public domain, via Wikimedia Commons', 'Benjah-bmm27', 'Public domain'],
    [
      "Native_Copper_Macro_Digon3.jpg: 'Jonathan Zander (Digon3)' derivative work: Materialscientist, CC BY-SA 2.5 <x>",
      'Jonathan Zander (Digon3), Materialscientist',
      'CC BY-SA 2.5',
    ],
    [
      'The original uploader was Dnn87 at English Wikipedia., CC BY-SA 3.0 <x>',
      'Dnn87',
      'CC BY-SA 3.0',
    ],
    [
      'Haire, R. G., US Department of Energy.Touched up by Materialscientist at en.wikipedia., Public domain',
      'Haire, R. G., US Department of Energy; Materialscientist',
      'Public domain',
    ],
  ])('%s', (input, author, license) => {
    expect(parseAttribution(input)).toEqual({ author, license });
  });

  it('rejects unknown licenses', () => {
    expect(parseAttribution('Image © CERN')).toBeNull();
  });
});

describe('human-scale comparisons', () => {
  it('gives every element at least two comparisons', () => {
    for (const e of lite) {
      const facts = humanScale({ ...e, phase: e.phaseAtSTP });
      expect(facts.length, e.symbol).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('lenses', () => {
  const members = (id: string) =>
    lite.filter((e) => e.lenses.includes(id as never)).map((e) => e.symbol);

  it('computes the data-driven lenses', () => {
    expect(members('radioactive')).toHaveLength(37);
    expect(members('synthetic')).toHaveLength(24);
    expect(members('synthetic')[0]).toBe('Am');
    expect(members('liquid').sort()).toEqual(['Br', 'Cs', 'Fr', 'Ga', 'Hg', 'Rb']);
  });

  it('builds the curated lenses from their lists', () => {
    expect(members('body')).toHaveLength(21);
    expect(members('phone')).toHaveLength(20);
    expect(members('precious').sort()).toEqual(['Ag', 'Au', 'Ir', 'Os', 'Pd', 'Pt', 'Rh', 'Ru']);
    // "Trong bếp" khai báo trong stories
    expect(members('kitchen').sort()).toEqual(['Al', 'Cl', 'Cr', 'Fe', 'I', 'Na', 'Ni', 'Sn']);
  });

  it('keeps body data consistent', () => {
    const percent = lite.reduce(
      (s, e) => s + (e.body && 'percent' in e.body ? e.body.percent : 0),
      0
    );
    expect(percent).toBeGreaterThan(98);
    expect(percent).toBeLessThanOrEqual(100);
    expect(lite.find((e) => e.symbol === 'Fe')?.body).toEqual({ grams: 4.2 });
  });
});

/** Nguyên tố bắt buộc phải có câu chuyện. Tăng dần theo từng lô để không ai lỡ xoá nội dung đã có. */
const REQUIRED_STORIES = [
  // H → Zn
  ...['h', 'he', 'li', 'be', 'b', 'c', 'n', 'o', 'f', 'ne', 'na', 'mg', 'al', 'si', 'p'],
  ...['s', 'cl', 'ar', 'k', 'ca', 'sc', 'ti', 'v', 'cr', 'mn', 'fe', 'co', 'ni', 'cu', 'zn'],
  // các nguyên tố quen thuộc khác
  ...['ag', 'sn', 'i', 'w', 'pt', 'au', 'hg', 'pb', 'u', 'ra'],
];

describe('stories', () => {
  const useText = { vi: 'Trang sức', en: 'Jewellery' };
  const valid = {
    hook: { vi: 'Câu móc câu', en: 'A hook' },
    uses: [{ icon: 'Gem', text: useText }],
    facts: [
      { q: { vi: 'Hỏi?', en: 'Q?' }, a: { vi: 'Đáp.', en: 'A.' }, source: 'https://example.org' },
    ],
  };

  it('has a story for every required element, with hook in lite data', () => {
    expect(REQUIRED_STORIES).toHaveLength(40);
    for (const slug of REQUIRED_STORIES) {
      const e = full.find((x) => x.slug === slug);
      expect(e?.story, slug).not.toBeNull();
      expect(lite.find((x) => x.slug === slug)?.hook, slug).toEqual(e?.story?.hook);
    }
  });

  it('builds search keywords from uses, without diacritics', () => {
    const na = lite.find((e) => e.symbol === 'Na');
    expect(na?.keywords).toContain('muoi an');
    expect(na?.keywords).toContain('table salt');
    for (const e of lite) expect(e.keywords === '', e.slug).toBe(e.hook === null);
  });

  it('has a story with hook and at least one use for all 118 elements', () => {
    for (const e of full) {
      expect(e.story?.hook, e.slug).toBeTruthy();
      expect(e.story?.uses.length, e.slug).toBeGreaterThan(0);
    }
  });

  it('keeps hook null for elements without a story', () => {
    const withStory = new Set(full.filter((e) => e.story).map((e) => e.slug));
    for (const e of lite) expect(e.hook === null, e.slug).toBe(!withStory.has(e.slug));
  });

  it('accepts a valid story and rejects broken ones', () => {
    expect(Story.safeParse(valid).success).toBe(true);
    // thiếu nguồn
    expect(
      Story.safeParse({ ...valid, facts: [{ ...valid.facts[0], source: undefined }] }).success
    ).toBe(false);
    // nguồn không phải URL
    expect(
      Story.safeParse({ ...valid, facts: [{ ...valid.facts[0], source: 'Wikipedia' }] }).success
    ).toBe(false);
    // thiếu tiếng Anh
    expect(Story.safeParse({ ...valid, hook: { vi: 'Câu móc câu' } }).success).toBe(false);
    // câu móc câu quá dài
    expect(Story.safeParse({ ...valid, hook: { vi: 'x'.repeat(131), en: 'x' } }).success).toBe(
      false
    );
    // không có công dụng nào
    expect(Story.safeParse({ ...valid, uses: [] }).success).toBe(false);
    // icon ngoài danh sách
    expect(Story.safeParse({ ...valid, uses: [{ icon: 'Banana', text: useText }] }).success).toBe(
      false
    );
  });
});

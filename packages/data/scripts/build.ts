/**
 * Gộp raw/ + curated/ → kiểm tra bằng Zod → dist/.
 * Chạy: pnpm --filter @chem/data build
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  decayKind,
  electronConfiguration,
  isPredicted,
  isRadioactive,
  shells,
  toNotation,
} from '@chem/core';
import { z } from 'zod';

import { COMPOUND_CRYSTALS } from '../curated/compound-crystals.ts';
import { COMPOUNDS } from '../curated/compounds.ts';
import { FLAME } from '../curated/flame.ts';
import { GALLERY } from '../curated/gallery.ts';
import {
  BODY_MASS_PERCENT,
  BODY_TRACE_GRAMS,
  NEAR_LIQUID_MAX_C,
  PHONE_RISK,
  PRECIOUS,
  SYNTHETIC_FROM_Z,
} from '../curated/lenses.ts';
import { ATOMIC_MASS_OVERRIDES, DISCOVERY_YEAR_OVERRIDES, NAMES_VI } from '../curated/names-vi.ts';
import { REACTIONS } from '../curated/reactions.ts';
import { STRUCTURES } from '../curated/structures.ts';
import timelineData from '../curated/timeline.ts';
import { Compound } from '../src/compound.ts';
import { Deck } from '../src/flashcard.ts';
import { GalleryManifest, galleryPageUrl } from '../src/gallery.ts';
import { History } from '../src/history.ts';
import { type LensId, normalizeSearch } from '../src/lenses.ts';
import { Lesson } from '../src/lesson.ts';
import { PHOTO_LICENSES, PhotoManifest } from '../src/photo.ts';
import { Quiz } from '../src/quiz.ts';
import { Reaction } from '../src/reaction.ts';
import { type Category, ElementFull, ElementLite, Isotope } from '../src/schema.ts';
import { Story } from '../src/story.ts';
import { Timeline } from '../src/timeline.ts';
import { loadCurated } from './learning-utils.ts';

const ROOT = join(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');

const readJson = async <T>(f: string): Promise<T> =>
  JSON.parse(await readFile(join(ROOT, 'raw', f), 'utf8'));

interface PubChemTable {
  Table: { Columns: { Column: string[] }; Row: Array<{ Cell: string[] }> };
}
interface Bow {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  appearance: string | null;
  discovered_by: string | null;
  named_by: string | null;
  period: number;
  group: number;
  xpos: number;
  ypos: number;
  wxpos: number;
  wypos: number;
  shells: number[];
  ionization_energies: number[];
  summary: string;
  source: string;
  block: 's' | 'p' | 'd' | 'f';
}

// Học liệu do GPT biên soạn (curated/{history,lessons,quiz,flashcards,timeline}); lỗi schema thì build dừng.
const histories = new Map(
  (await loadCurated('history', History)).map((h) => [h.file.replace(/\.ts$/, ''), h.data])
);
const lessons = (await loadCurated('lessons', Lesson))
  .map((l) => l.data)
  .sort((a, b) => a.order - b.order);
const quizzes = (await loadCurated('quiz', Quiz)).map((q) => q.data);
const decks = (await loadCurated('flashcards', Deck)).map((d) => d.data);
const reactions = REACTIONS.map((r) => Reaction.parse(r));
const timeline = Timeline.parse(timelineData).sort((a, b) => a.year - b.year);

// Ảnh thư viện do scripts/gallery-images.ts sinh ra; chưa có thì nguyên tố không có thư viện.
const galleryManifest = GalleryManifest.parse(
  JSON.parse(
    await readFile(join(ROOT, 'images', 'gallery', 'manifest.json'), 'utf8').catch(() => '{}')
  )
);

// Ảnh do scripts/images.ts sinh ra (đã commit). Chưa có thì mọi nguyên tố không có ảnh.
const photos = PhotoManifest.parse(
  JSON.parse(await readFile(join(ROOT, 'images', 'manifest.json'), 'utf8').catch(() => '{}'))
);

const pubchem = await readJson<PubChemTable>('pubchem-periodic.json');
const bow = (await readJson<{ elements: Bow[] }>('bowserinator.json')).elements;
const cols = pubchem.Table.Columns.Column;
const rows = pubchem.Table.Row.map((r) =>
  Object.fromEntries(cols.map((c, i) => [c, r.Cell[i] ?? '']))
);

const num = (s: string | undefined): number | null => {
  if (s === undefined || s.trim() === '') return null;
  const v = Number(s);
  return Number.isFinite(v) ? v : null;
};

const CATEGORY_MAP: Record<string, Category> = {
  Nonmetal: 'nonmetal',
  'Noble gas': 'noble-gas',
  'Alkali metal': 'alkali-metal',
  'Alkaline earth metal': 'alkaline-earth-metal',
  Metalloid: 'metalloid',
  Halogen: 'halogen',
  'Post-transition metal': 'post-transition-metal',
  'Transition metal': 'transition-metal',
  Lanthanide: 'lanthanide',
  Actinide: 'actinide',
};

const warnings: string[] = [];

// Câu chuyện tự biên soạn: mỗi file stories/<slug>.ts, kiểm tra bằng schema; sai thì dừng build
const STORIES_DIR = join(import.meta.dirname, '..', 'stories');
const stories = new Map<string, Story>();
for (const file of (await readdir(STORIES_DIR)).filter((f) => f.endsWith('.ts')).sort()) {
  const slug = file.replace(/\.ts$/, '');
  const mod = (await import(pathToFileURL(join(STORIES_DIR, file)).href)) as { default: unknown };
  const parsed = Story.safeParse(mod.default);
  if (!parsed.success) {
    throw new Error(`stories/${file} sai schema:\n${z.prettifyError(parsed.error)}`);
  }
  stories.set(slug, parsed.data);
}
// Phổ vạch NIST (scripts/fetch-spectra.ts) và hợp chất PubChem (scripts/fetch-compounds.ts), đã commit
const spectra: Record<string, Array<[number, number]>> = await readJson('spectra.json');
const compounds = z
  .array(Compound)
  .parse(
    (
      JSON.parse(await readFile(join(ROOT, 'compounds', 'index.json'), 'utf8')) as Array<
        Omit<Compound, 'crystal'>
      >
    ).map((c) => ({ ...c, crystal: (c.query && COMPOUND_CRYSTALS[c.query]) || null }))
  );
for (const q of Object.keys(COMPOUND_CRYSTALS))
  if (!compounds.some((c) => c.query === q))
    throw new Error(`compound-crystals: không có hợp chất "${q}" trong compounds/index.json`);
for (const c of COMPOUNDS)
  if (!compounds.some((x) => (c.cid ? x.cid === c.cid : x.query === c.q)))
    throw new Error(`curated/compounds: "${c.q ?? c.cid}" chưa được tải, chạy fetch:compounds`);

// Đồng vị IAEA (scripts/fetch-isotopes.ts), đã commit
type RawIsotope = [
  number,
  number,
  number | null,
  [string, string, string, number] | 'S' | null,
  Array<[string, number | null]>,
  string | null,
  number | null,
];
const isotopesByZ = new Map<number, Isotope[]>();
/** Bản đồ hạt nhân gọn: [Z, N, mã]; mã S bền, B β⁻, E bắt electron/β⁺, A α, O khác (SF, p, n…) */
const nuclides: Array<[number, number, string]> = [];
const KIND_CODE = { 'beta-minus': 'B', 'electron-capture': 'E', alpha: 'A', other: 'O' } as const;
for (const [z, n, abundance, hl, decays, jp, discovery] of await readJson<RawIsotope[]>(
  'isotopes.json'
)) {
  const iso = Isotope.parse({
    n,
    abundance,
    stable: hl === 'S',
    halfLife: hl && hl !== 'S' ? { text: hl[0], unit: hl[1], op: hl[2], seconds: hl[3] } : null,
    decays: decays.map(([mode, pct]) => ({ mode, pct })),
    jp,
    discovery,
  });
  isotopesByZ.set(z, [...(isotopesByZ.get(z) ?? []), iso]);
  nuclides.push([z, n, iso.stable ? 'S' : decays[0] ? KIND_CODE[decayKind(decays[0][0])] : 'O']);
}

const lite: ElementLite[] = [];
const full: ElementFull[] = [];

for (let z = 1; z <= 118; z++) {
  const p = rows[z - 1];
  const b = bow[z - 1];
  if (!p || !b) throw new Error(`Thiếu dữ liệu cho Z=${z}`);
  if (Number(p.AtomicNumber) !== z || b.number !== z) throw new Error(`Lệch thứ tự ở Z=${z}`);
  if (p.Symbol !== b.symbol) throw new Error(`Lệch ký hiệu ở Z=${z}: ${p.Symbol} / ${b.symbol}`);

  const category = CATEGORY_MAP[p.GroupBlock ?? ''];
  if (!category) throw new Error(`Không rõ nhóm "${p.GroupBlock}" ở Z=${z}`);

  const state = (p.StandardState ?? '').toLowerCase();
  const phaseAtSTP = state.includes('solid')
    ? 'solid'
    : state.includes('liquid')
      ? 'liquid'
      : state.includes('gas')
        ? 'gas'
        : 'unknown';

  const atomicMass = ATOMIC_MASS_OVERRIDES[b.symbol] ?? num(p.AtomicMass) ?? b.atomic_mass;
  if (
    z <= 94 &&
    !(b.symbol in ATOMIC_MASS_OVERRIDES) &&
    Math.abs(atomicMass - b.atomic_mass) > 0.05
  ) {
    warnings.push(`Z=${z}: khối lượng lệch PubChem ${atomicMass} / Bowserinator ${b.atomic_mass}`);
  }

  const cfg = electronConfiguration(z);
  const sh = shells(cfg);
  if (sh.join() !== b.shells.join()) {
    warnings.push(`Z=${z}: shells core [${sh}] / Bowserinator [${b.shells}]`);
  }

  const photo = photos[b.symbol.toLowerCase()];
  const year = DISCOVERY_YEAR_OVERRIDES[b.symbol] ?? num(p.YearDiscovered);
  const isF = category === 'lanthanide' || category === 'actinide';

  const sym = b.symbol;
  const meltingPointK = num(p.MeltingPoint);
  const bodyPercent = BODY_MASS_PERCENT[sym];
  const bodyGrams = BODY_TRACE_GRAMS[sym];
  const lenses: LensId[] = [];
  if (bodyPercent != null || bodyGrams != null) lenses.push('body');
  if (PHONE_RISK[sym]) lenses.push('phone');
  if (PRECIOUS.includes(sym)) lenses.push('precious');
  if (isRadioactive(z)) lenses.push('radioactive');
  if (
    phaseAtSTP === 'liquid' ||
    (phaseAtSTP === 'solid' && meltingPointK != null && meltingPointK - 273.15 < NEAR_LIQUID_MAX_C)
  ) {
    lenses.push('liquid');
  }
  if (z >= SYNTHETIC_FROM_Z) lenses.push('synthetic');
  const story = stories.get(sym.toLowerCase());
  for (const l of story?.lenses ?? []) lenses.push(l);

  const liteEl: ElementLite = {
    z,
    symbol: b.symbol,
    slug: b.symbol.toLowerCase(),
    name: { vi: NAMES_VI[z - 1] ?? b.name, en: p.Name || b.name },
    atomicMass,
    category,
    block: b.block,
    group: isF ? null : b.group,
    period: b.period,
    grid: { x: b.xpos, y: b.ypos },
    grid32: { x: b.wxpos, y: b.wypos },
    phaseAtSTP,
    phasePredicted: state.includes('expected'),
    electronegativity: num(p.Electronegativity),
    atomicRadiusPm: num(p.AtomicRadius),
    ionizationEnergyEv: num(p.IonizationEnergy),
    electronAffinityEv: num(p.ElectronAffinity),
    meltingPointK,
    boilingPointK: num(p.BoilingPoint),
    densityGcm3: num(p.Density),
    discoveryYear: year,
    // PubChem làm mất số 0 ở đầu (Pd: "6985" → "006985")
    cpkHex: p.CPKHexColor ? p.CPKHexColor.toLowerCase().padStart(6, '0') : null,
    photo: photo ? { w: photo.w, h: photo.h } : null,
    lenses,
    body:
      bodyPercent != null
        ? { percent: bodyPercent }
        : bodyGrams != null
          ? { grams: bodyGrams }
          : null,
    phoneRisk: PHONE_RISK[sym] ?? null,
    hook: story?.hook ?? null,
    keywords: normalizeSearch(
      (story?.uses ?? []).flatMap((u) => [u.text.vi, u.text.en]).join(' | ')
    ),
  };

  const fullEl: ElementFull = {
    ...liteEl,
    electronConfiguration: toNotation(cfg, { nobleGasCore: true }),
    configurationPredicted: isPredicted(z),
    shells: sh,
    oxidationStates: (p.OxidationStates ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter(Number.isInteger),
    ionizationEnergiesKjMol: b.ionization_energies ?? [],
    discoveredBy: b.discovered_by,
    namedBy: b.named_by,
    appearance: b.appearance,
    summary: { en: b.summary, vi: null },
    wikipedia: b.source?.startsWith('http') ? b.source : null,
    photoCredit: photo?.credit ?? null,
    history: histories.get(sym.toLowerCase()) ?? null,
    gallery: (GALLERY[sym] ?? []).flatMap((g, i) => {
      const made = galleryManifest[sym]?.[i];
      if (made?.file !== g.file) return []; // chưa tải: bỏ để chỉ số vẫn khớp tên file nén
      return [
        {
          kind: g.kind,
          caption: g.caption,
          author: g.author,
          license: g.license,
          licenseUrl: PHOTO_LICENSES[g.license],
          sourceUrl: galleryPageUrl(g.file),
          w: made.w,
          h: made.h,
        },
      ];
    }),
    sources: ['PubChem Periodic Table', 'Bowserinator/Periodic-Table-JSON (CC BY-SA 3.0)'],
    story: story ?? null,
    spectrum: spectra[sym]?.filter(([, i]) => i > 0) ?? null,
    flame: FLAME[sym] ?? null,
    isotopes: isotopesByZ.get(z) ?? [],
    structures: STRUCTURES[sym] ?? [],
    compounds: compounds
      .filter((c) => !c.elemental && c.elements.includes(sym))
      .sort((a, b) => a.elements.length - b.elements.length || a.mw - b.mw)
      .map((c) => ({ cid: c.cid, formula: c.formula, vi: c.vi, en: c.en })),
  };

  lite.push(ElementLite.parse(liteEl));
  full.push(ElementFull.parse(fullEl));
}

const slugs = new Set(lite.map((e) => e.slug));
for (const slug of stories.keys()) {
  if (!slugs.has(slug))
    throw new Error(`stories/${slug}.ts: không có nguyên tố nào có slug "${slug}"`);
}

await rm(DIST, { recursive: true, force: true });
await mkdir(join(DIST, 'elements'), { recursive: true });
await writeFile(join(DIST, 'elements.json'), JSON.stringify(lite));
await Promise.all(
  full.map((e) => writeFile(join(DIST, 'elements', `${e.slug}.json`), JSON.stringify(e)))
);
await writeFile(join(DIST, 'compounds.json'), JSON.stringify(compounds));
await mkdir(join(DIST, 'learning'), { recursive: true });
for (const [name, value] of Object.entries({ timeline, lessons, quizzes, decks, reactions }))
  await writeFile(join(DIST, 'learning', `${name}.json`), JSON.stringify(value));
await writeFile(join(DIST, 'nuclides.json'), JSON.stringify(nuclides));
await writeFile(
  join(DIST, 'meta.json'),
  JSON.stringify({ builtAt: new Date().toISOString(), count: lite.length, warnings }, null, 2)
);

for (const w of warnings) console.warn(`⚠ ${w}`);
console.log(`✓ ${lite.length} nguyên tố → dist/ (${warnings.length} cảnh báo)`);

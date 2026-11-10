/** Kiểm tra bộ thẻ, công thức, điện tích ion và liên kết CID theo danh mục đã tuyển. */
import { parseFormula, SYMBOLS } from '@chem/core';

import { PRIORITY } from '../curated/compounds.ts';
import { Deck } from '../src/flashcard.ts';
import { curatedCompoundIndex, ensure, loadCurated, unique } from './learning-utils.ts';

const expected = [
  'ions',
  'compound-names',
  'reactivity',
  'solubility',
  'tests',
  'oxidation-states',
];
const decks = await loadCurated('flashcards', Deck);
const compounds = await curatedCompoundIndex();
const ids: string[] = [];
const symbols = new Set<string>(SYMBOLS);
ensure(decks.length === expected.length, 'Phải có đủ 6 bộ thẻ');
unique(
  decks.map(({ data }) => data.id),
  'ID bộ thẻ'
);
let linked = 0;
for (const { file, data: deck } of decks) {
  ensure(expected.includes(deck.id), `${file}: bộ thẻ không đúng danh sách`);
  ensure(file === `${deck.id}.ts`, `${file}: tên file không khớp ID`);
  unique(deck.grade.map(String), `${deck.id}: lớp`);
  unique(
    deck.cards.map((card) => card.front.vi),
    `${deck.id}: mặt trước vi`
  );
  unique(
    deck.cards.map((card) => card.front.en),
    `${deck.id}: mặt trước en`
  );
  for (const card of deck.cards) {
    ids.push(card.id);
    ensure(card.id.startsWith(`${deck.id}-`), `${card.id}: sai tiền tố`);
    for (const symbol of card.elements)
      ensure(symbols.has(symbol), `${card.id}: ký hiệu không hợp lệ`);
    if (card.formula) {
      const parsed = parseFormula(card.formula);
      ensure(parsed.ok, `${card.id}: công thức không đọc được`);
      for (const symbol of parsed.value.composition.keys())
        ensure(
          card.elements.includes(symbol as (typeof card.elements)[number]),
          `${card.id}: elements thiếu ${symbol}`
        );
      if (deck.id === 'ions') {
        const vi = /điện tích ([+−]\d+)/.exec(card.back.vi);
        const en = /charge ([+−]\d+)/.exec(card.back.en);
        ensure(vi && en, `${card.id}: chưa ghi điện tích rõ ràng`);
        ensure(
          Number(vi[1]!.replace('−', '-')) === parsed.value.charge,
          `${card.id}: sai điện tích bản vi`
        );
        ensure(
          Number(en[1]!.replace('−', '-')) === parsed.value.charge,
          `${card.id}: sai điện tích bản en`
        );
      }
    }
    if (deck.id === 'compound-names')
      ensure(card.cid && card.formula, `${card.id}: thiếu CID hoặc công thức`);
    if (card.cid) {
      const compound = compounds.get(card.cid);
      ensure(compound, `${card.id}: CID ${card.cid} không thuộc curated/compounds.ts`);
      if (card.formula) {
        const supplied = parseFormula(card.formula);
        const canonical = parseFormula(compound.formula);
        ensure(supplied.ok && canonical.ok, `${card.id}: công thức đối chiếu không đọc được`);
        const composition = (value: Map<string, number>) =>
          JSON.stringify([...value].sort(([a], [b]) => a.localeCompare(b)));
        ensure(
          composition(supplied.value.composition) === composition(canonical.value.composition),
          `${card.id}: công thức không khớp CID`
        );
      }
      linked++;
    }
  }
  if (deck.id === 'oxidation-states') {
    for (const symbol of PRIORITY)
      ensure(
        deck.cards.some((card) => card.elements.includes(symbol as (typeof card.elements)[number])),
        `Thiếu thẻ số oxi hoá ${symbol}`
      );
  }
  console.log(`· ${deck.id}: ${deck.cards.length} thẻ`);
}
unique(ids, 'ID toàn bộ flashcard');
console.log(`✓ ${decks.length} bộ, ${ids.length} thẻ; ${linked} CID hợp lệ.`);

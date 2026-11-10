import { defineDeck } from '../../src/flashcard.ts';

/** Đối chiếu phạm vi Kết nối tri thức với cuộc sống, GDPT 2018. Nội dung tự biên soạn; quy tắc được ghi kèm phạm vi và ngoại lệ cần thiết. */
export default defineDeck({
  id: 'ions',
  title: {
    vi: 'Ion thường gặp',
    en: 'Common ions',
  },
  description: {
    vi: 'Nhớ công thức và điện tích, phân biệt các ion có tên gần nhau.',
    en: 'Recall formulas and charges, distinguishing similarly named ions.',
  },
  grade: [10, 11, 12],
  cards: [
    {
      id: 'ions-001',
      front: {
        vi: 'Ion amoni có công thức và điện tích gì?',
        en: 'What are the formula and charge of ammonium?',
      },
      back: {
        vi: 'NH₄⁺; điện tích +1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'NH₄⁺; charge +1. Subscripts count atoms rather than charge.',
      },
      elements: ['N', 'H'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'NH4^+',
    },
    {
      id: 'ions-002',
      front: {
        vi: 'Ion hiđroxit có công thức và điện tích gì?',
        en: 'What are the formula and charge of hydroxide?',
      },
      back: {
        vi: 'OH⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'OH⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['O', 'H'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'OH^-',
    },
    {
      id: 'ions-003',
      front: {
        vi: 'Ion nitrat có công thức và điện tích gì?',
        en: 'What are the formula and charge of nitrate?',
      },
      back: {
        vi: 'NO₃⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'NO₃⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['N', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'NO3^-',
    },
    {
      id: 'ions-004',
      front: {
        vi: 'Ion nitrit có công thức và điện tích gì?',
        en: 'What are the formula and charge of nitrite?',
      },
      back: {
        vi: 'NO₂⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'NO₂⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['N', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'NO2^-',
    },
    {
      id: 'ions-005',
      front: {
        vi: 'Ion sunfat có công thức và điện tích gì?',
        en: 'What are the formula and charge of sulfate?',
      },
      back: {
        vi: 'SO₄²⁻; điện tích −2. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'SO₄²⁻; charge −2. Subscripts count atoms rather than charge.',
      },
      elements: ['S', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'SO4^2-',
    },
    {
      id: 'ions-006',
      front: {
        vi: 'Ion sunfit có công thức và điện tích gì?',
        en: 'What are the formula and charge of sulfite?',
      },
      back: {
        vi: 'SO₃²⁻; điện tích −2. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'SO₃²⁻; charge −2. Subscripts count atoms rather than charge.',
      },
      elements: ['S', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'SO3^2-',
    },
    {
      id: 'ions-007',
      front: {
        vi: 'Ion hiđrosunfat có công thức và điện tích gì?',
        en: 'What are the formula and charge of hydrogen sulfate?',
      },
      back: {
        vi: 'HSO₄⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'HSO₄⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['H', 'S', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'HSO4^-',
    },
    {
      id: 'ions-008',
      front: {
        vi: 'Ion cacbonat có công thức và điện tích gì?',
        en: 'What are the formula and charge of carbonate?',
      },
      back: {
        vi: 'CO₃²⁻; điện tích −2. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'CO₃²⁻; charge −2. Subscripts count atoms rather than charge.',
      },
      elements: ['C', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'CO3^2-',
    },
    {
      id: 'ions-009',
      front: {
        vi: 'Ion hiđrocacbonat có công thức và điện tích gì?',
        en: 'What are the formula and charge of hydrogen carbonate?',
      },
      back: {
        vi: 'HCO₃⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'HCO₃⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['H', 'C', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'HCO3^-',
    },
    {
      id: 'ions-010',
      front: {
        vi: 'Ion photphat có công thức và điện tích gì?',
        en: 'What are the formula and charge of phosphate?',
      },
      back: {
        vi: 'PO₄³⁻; điện tích −3. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'PO₄³⁻; charge −3. Subscripts count atoms rather than charge.',
      },
      elements: ['P', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'PO4^3-',
    },
    {
      id: 'ions-011',
      front: {
        vi: 'Ion đihiđrophotphat có công thức và điện tích gì?',
        en: 'What are the formula and charge of dihydrogen phosphate?',
      },
      back: {
        vi: 'H₂PO₄⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'H₂PO₄⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['H', 'P', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'H2PO4^-',
    },
    {
      id: 'ions-012',
      front: {
        vi: 'Ion hiđrophotphat có công thức và điện tích gì?',
        en: 'What are the formula and charge of hydrogen phosphate?',
      },
      back: {
        vi: 'HPO₄²⁻; điện tích −2. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'HPO₄²⁻; charge −2. Subscripts count atoms rather than charge.',
      },
      elements: ['H', 'P', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'HPO4^2-',
    },
    {
      id: 'ions-013',
      front: {
        vi: 'Ion pemanganat có công thức và điện tích gì?',
        en: 'What are the formula and charge of permanganate?',
      },
      back: {
        vi: 'MnO₄⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'MnO₄⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['Mn', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'MnO4^-',
    },
    {
      id: 'ions-014',
      front: {
        vi: 'Ion cromat có công thức và điện tích gì?',
        en: 'What are the formula and charge of chromate?',
      },
      back: {
        vi: 'CrO₄²⁻; điện tích −2. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'CrO₄²⁻; charge −2. Subscripts count atoms rather than charge.',
      },
      elements: ['Cr', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'CrO4^2-',
    },
    {
      id: 'ions-015',
      front: {
        vi: 'Ion đicromat có công thức và điện tích gì?',
        en: 'What are the formula and charge of dichromate?',
      },
      back: {
        vi: 'Cr₂O₇²⁻; điện tích −2. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'Cr₂O₇²⁻; charge −2. Subscripts count atoms rather than charge.',
      },
      elements: ['Cr', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'Cr2O7^2-',
    },
    {
      id: 'ions-016',
      front: {
        vi: 'Ion axetat có công thức và điện tích gì?',
        en: 'What are the formula and charge of acetate?',
      },
      back: {
        vi: 'CH₃COO⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'CH₃COO⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['C', 'H', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'CH3COO^-',
    },
    {
      id: 'ions-017',
      front: {
        vi: 'Ion hipoclorit có công thức và điện tích gì?',
        en: 'What are the formula and charge of hypochlorite?',
      },
      back: {
        vi: 'ClO⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'ClO⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['Cl', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'ClO^-',
    },
    {
      id: 'ions-018',
      front: {
        vi: 'Ion clorat có công thức và điện tích gì?',
        en: 'What are the formula and charge of chlorate?',
      },
      back: {
        vi: 'ClO₃⁻; điện tích −1. Chỉ số dưới đếm nguyên tử, không phải điện tích.',
        en: 'ClO₃⁻; charge −1. Subscripts count atoms rather than charge.',
      },
      elements: ['Cl', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/2-7-chemical-nomenclature',
      formula: 'ClO3^-',
    },
  ],
});

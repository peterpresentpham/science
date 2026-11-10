import { defineDeck } from '../../src/flashcard.ts';

/** Đối chiếu phạm vi Kết nối tri thức với cuộc sống, GDPT 2018. Nội dung tự biên soạn; quy tắc được ghi kèm phạm vi và ngoại lệ cần thiết. */
export default defineDeck({
  id: 'compound-names',
  title: {
    vi: 'Công thức và tên hợp chất',
    en: 'Compound formulas and names',
  },
  description: {
    vi: 'Tên Việt theo danh mục đã tuyển; CID liên kết với mẫu hợp chất của dự án.',
    en: 'Vietnamese names follow the curated catalogue; CIDs link to project compounds.',
  },
  grade: [10, 11, 12],
  cards: [
    {
      id: 'compound-names-001',
      front: {
        vi: 'H2O có tên là gì?',
        en: 'What is H2O called?',
      },
      back: {
        vi: 'Nước. Tên tiếng Anh: water.',
        en: 'Water. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['H', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/962',
      formula: 'H2O',
      cid: 962,
    },
    {
      id: 'compound-names-002',
      front: {
        vi: 'NaCl có tên là gì?',
        en: 'What is NaCl called?',
      },
      back: {
        vi: 'Natri clorua (muối ăn). Tên tiếng Anh: sodium chloride.',
        en: 'Sodium chloride. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['Cl', 'Na'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/5234',
      formula: 'NaCl',
      cid: 5234,
    },
    {
      id: 'compound-names-003',
      front: {
        vi: 'NaOH có tên là gì?',
        en: 'What is NaOH called?',
      },
      back: {
        vi: 'Natri hiđroxit (xút). Tên tiếng Anh: sodium hydroxide.',
        en: 'Sodium hydroxide. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['H', 'Na', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/14798',
      formula: 'NaOH',
      cid: 14798,
    },
    {
      id: 'compound-names-004',
      front: {
        vi: 'NaHCO3 có tên là gì?',
        en: 'What is NaHCO3 called?',
      },
      back: {
        vi: 'Natri hiđrocacbonat (baking soda). Tên tiếng Anh: sodium bicarbonate.',
        en: 'Sodium bicarbonate. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['C', 'H', 'Na', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/516892',
      formula: 'NaHCO3',
      cid: 516892,
    },
    {
      id: 'compound-names-005',
      front: {
        vi: 'Na2CO3 có tên là gì?',
        en: 'What is Na2CO3 called?',
      },
      back: {
        vi: 'Natri cacbonat (sôđa). Tên tiếng Anh: sodium carbonate.',
        en: 'Sodium carbonate. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['C', 'Na', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/10340',
      formula: 'Na2CO3',
      cid: 10340,
    },
    {
      id: 'compound-names-006',
      front: {
        vi: 'CaO có tên là gì?',
        en: 'What is CaO called?',
      },
      back: {
        vi: 'Canxi oxit (vôi sống). Tên tiếng Anh: calcium oxide.',
        en: 'Calcium oxide. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['Ca', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/14778',
      formula: 'CaO',
      cid: 14778,
    },
    {
      id: 'compound-names-007',
      front: {
        vi: 'Ca(OH)2 có tên là gì?',
        en: 'What is Ca(OH)2 called?',
      },
      back: {
        vi: 'Canxi hiđroxit (vôi tôi). Tên tiếng Anh: calcium hydroxide.',
        en: 'Calcium hydroxide. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['Ca', 'H', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/6093208',
      formula: 'Ca(OH)2',
      cid: 6093208,
    },
    {
      id: 'compound-names-008',
      front: {
        vi: 'CaCO3 có tên là gì?',
        en: 'What is CaCO3 called?',
      },
      back: {
        vi: 'Canxi cacbonat (đá vôi). Tên tiếng Anh: calcium carbonate.',
        en: 'Calcium carbonate. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['C', 'Ca', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/10112',
      formula: 'CaCO3',
      cid: 10112,
    },
    {
      id: 'compound-names-009',
      front: {
        vi: 'HCl có tên là gì?',
        en: 'What is HCl called?',
      },
      back: {
        vi: 'Hiđro clorua; dung dịch trong nước gọi là axit clohiđric (hydrochloric acid).',
        en: 'Hydrogen chloride; its aqueous solution is hydrochloric acid.',
      },
      elements: ['Cl', 'H'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/313',
      formula: 'HCl',
      cid: 313,
    },
    {
      id: 'compound-names-010',
      front: {
        vi: 'HNO3 có tên là gì?',
        en: 'What is HNO3 called?',
      },
      back: {
        vi: 'Axit nitric. Tên tiếng Anh: nitric acid.',
        en: 'Nitric acid. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['H', 'N', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/944',
      formula: 'HNO3',
      cid: 944,
    },
    {
      id: 'compound-names-011',
      front: {
        vi: 'H2SO4 có tên là gì?',
        en: 'What is H2SO4 called?',
      },
      back: {
        vi: 'Axit sunfuric. Tên tiếng Anh: sulfuric acid.',
        en: 'Sulfuric acid. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['H', 'O', 'S'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/1118',
      formula: 'H2SO4',
      cid: 1118,
    },
    {
      id: 'compound-names-012',
      front: {
        vi: 'NH3 có tên là gì?',
        en: 'What is NH3 called?',
      },
      back: {
        vi: 'Amoniac. Tên tiếng Anh: ammonia.',
        en: 'Ammonia. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['H', 'N'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/222',
      formula: 'NH3',
      cid: 222,
    },
    {
      id: 'compound-names-013',
      front: {
        vi: 'NH4Cl có tên là gì?',
        en: 'What is NH4Cl called?',
      },
      back: {
        vi: 'Amoni clorua. Tên tiếng Anh: ammonium chloride.',
        en: 'Ammonium chloride. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['Cl', 'H', 'N'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/25517',
      formula: 'NH4Cl',
      cid: 25517,
    },
    {
      id: 'compound-names-014',
      front: {
        vi: 'NH4NO3 có tên là gì?',
        en: 'What is NH4NO3 called?',
      },
      back: {
        vi: 'Amoni nitrat. Tên tiếng Anh: ammonium nitrate.',
        en: 'Ammonium nitrate. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['H', 'N', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/22985',
      formula: 'NH4NO3',
      cid: 22985,
    },
    {
      id: 'compound-names-015',
      front: {
        vi: 'KMnO4 có tên là gì?',
        en: 'What is KMnO4 called?',
      },
      back: {
        vi: 'Kali pemanganat (thuốc tím). Tên tiếng Anh: potassium permanganate.',
        en: 'Potassium permanganate. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['K', 'Mn', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/516875',
      formula: 'KMnO4',
      cid: 516875,
    },
    {
      id: 'compound-names-016',
      front: {
        vi: 'CuSO4 có tên là gì?',
        en: 'What is CuSO4 called?',
      },
      back: {
        vi: 'Đồng(II) sunfat. Tên tiếng Anh: copper(II) sulfate.',
        en: 'Copper(ii) sulfate. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['Cu', 'O', 'S'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/24462',
      formula: 'CuSO4',
      cid: 24462,
    },
    {
      id: 'compound-names-017',
      front: {
        vi: 'AgNO3 có tên là gì?',
        en: 'What is AgNO3 called?',
      },
      back: {
        vi: 'Bạc nitrat. Tên tiếng Anh: silver nitrate.',
        en: 'Silver nitrate. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['Ag', 'N', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/24470',
      formula: 'AgNO3',
      cid: 24470,
    },
    {
      id: 'compound-names-018',
      front: {
        vi: 'Al2O3 có tên là gì?',
        en: 'What is Al2O3 called?',
      },
      back: {
        vi: 'Nhôm oxit. Tên tiếng Anh: aluminium oxide.',
        en: 'Aluminium oxide. Match the entire formula, including any brackets and subscripts.',
      },
      elements: ['Al', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/9989226',
      formula: 'Al2O3',
      cid: 9989226,
    },
  ],
});

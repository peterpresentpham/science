import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1807,
    by: {
      vi: 'Humphry Davy',
      en: 'Humphry Davy',
    },
    place: {
      vi: 'London, Anh',
      en: 'London, England',
    },
    source: 'https://periodic-table.rsc.org/element/11/sodium',
  },
  naming: {
    text: {
      vi: 'Sodium từ “soda”; Na đến từ tên Latin “natrium”, gắn với natron.',
      en: 'Sodium comes from “soda”; Na derives from Latin “natrium”, associated with natron.',
    },
    source: 'https://pubchem.ncbi.nlm.nih.gov/element/11',
  },
  story: [
    {
      vi: 'Muối ăn đã quen thuộc từ lâu, nhưng natri kim loại không giống muối chút nào. Davy dùng dòng điện để tách kim loại từ natri hiđroxit.',
      en: 'Table salt was familiar, but sodium metal looked nothing like salt. Davy used an electric current to isolate the metal from sodium hydroxide.',
      source: 'https://periodic-table.rsc.org/element/11/sodium',
    },
    {
      vi: 'Điện phân giúp vượt qua những cách khử bằng nhiệt vốn không phù hợp. Các giọt kim loại thu được cho thấy hợp chất quen thuộc có thể che giấu một đơn chất rất khác.',
      en: 'Electrolysis succeeded where conventional thermal reduction was unsuitable. The metal droplets revealed how a familiar compound can conceal a very different element.',
      source: 'https://periodic-table.rsc.org/element/11/sodium',
    },
  ],
  milestones: [
    {
      year: 1808,
      text: {
        vi: 'Gay-Lussac và Thénard điều chế natri bằng phương pháp hoá học.',
        en: 'Gay-Lussac and Thénard prepared sodium by a chemical method.',
      },
      source: 'https://periodic-table.rsc.org/element/11/sodium',
    },
    {
      year: 1957,
      text: {
        vi: 'Skou phát hiện enzyme bơm ion Na⁺/K⁺ qua màng tế bào.',
        en: 'Skou discovered the enzyme that pumps Na⁺ and K⁺ across cell membranes.',
      },
      source: 'https://www.nobelprize.org/prizes/chemistry/1997/skou/facts/',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/11/sodium',
    'https://pubchem.ncbi.nlm.nih.gov/element/11',
    'https://www.nobelprize.org/prizes/chemistry/1997/skou/facts/',
  ],
});

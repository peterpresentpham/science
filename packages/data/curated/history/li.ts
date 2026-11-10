import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1817,
    by: {
      vi: 'Johan August Arfvedson',
      en: 'Johan August Arfvedson',
    },
    place: {
      vi: 'Stockholm, Thuỵ Điển',
      en: 'Stockholm, Sweden',
    },
    source: 'https://periodic-table.rsc.org/element/3/lithium',
    note: {
      vi: 'Dữ liệu gốc viết “Arfwedson”; dùng cách viết Arfvedson trên RSC, cùng một người.',
      en: 'The existing data spells the name “Arfwedson”; RSC uses Arfvedson for the same person.',
    },
  },
  naming: {
    text: {
      vi: 'Lithium bắt nguồn từ “lithos”, nghĩa là đá, vì được nhận ra trong khoáng vật.',
      en: 'Lithium comes from “lithos”, meaning stone, because it was identified in a mineral.',
    },
    source: 'https://periodic-table.rsc.org/element/3/lithium',
  },
  story: [
    {
      vi: 'Phân tích petalit, Arfvedson nhận ra một kim loại kiềm chưa biết. Ông xác định được sự có mặt của nó trong hợp chất nhưng chưa tách được kim loại.',
      en: 'Analysing petalite, Arfvedson identified an unknown alkali metal. He established its presence in a compound without isolating the metal.',
      source: 'https://periodic-table.rsc.org/element/3/lithium',
    },
    {
      vi: 'Nhận ra một nguyên tố và cầm được mẫu đơn chất là hai việc khác nhau. Với liti, việc điều chế đủ kim loại để nghiên cứu còn phải chờ những người làm điện phân sau đó.',
      en: 'Recognising an element and obtaining a sample are different achievements. Producing enough lithium for study required later work on electrolysis.',
      source: 'https://periodic-table.rsc.org/element/3/lithium',
    },
  ],
  milestones: [
    {
      year: 1821,
      text: {
        vi: 'William Brande thu được một lượng rất nhỏ liti bằng điện phân.',
        en: 'William Brande obtained a tiny amount of lithium by electrolysis.',
      },
      source: 'https://periodic-table.rsc.org/element/3/lithium',
    },
    {
      year: 1855,
      text: {
        vi: 'Bunsen và Matthiessen điện phân liti clorua nóng chảy để thu lượng kim loại lớn hơn.',
        en: 'Bunsen and Matthiessen electrolysed molten lithium chloride to obtain larger quantities.',
      },
      source: 'https://periodic-table.rsc.org/element/3/lithium',
    },
  ],
  sources: ['https://periodic-table.rsc.org/element/3/lithium'],
});

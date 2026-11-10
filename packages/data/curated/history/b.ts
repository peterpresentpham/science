import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1808,
    by: {
      vi: 'Gay-Lussac, Thénard; Humphry Davy',
      en: 'Gay-Lussac, Thénard; Humphry Davy',
    },
    place: {
      vi: 'Paris và London',
      en: 'Paris and London',
    },
    source: 'https://periodic-table.rsc.org/element/5/boron',
    note: {
      vi: 'Dữ liệu gốc chỉ nêu Gay-Lussac; RSC ghi cả Thénard và Davy trong các nhóm độc lập.',
      en: 'The existing data names only Gay-Lussac; RSC also credits Thénard and Davy in independent teams.',
    },
  },
  naming: {
    text: {
      vi: 'Boron liên quan đến “buraq”, tên gọi gắn với hàn the trong tiếng Ả Rập.',
      en: 'Boron is related to “buraq”, an Arabic name associated with borax.',
    },
    source: 'https://periodic-table.rsc.org/element/5/boron',
  },
  story: [
    {
      vi: 'Hai nhóm ở Paris và London độc lập tạo ra vật liệu chứa bo từ hàn the. Những mẫu đầu chưa phải bo tinh khiết, dù đã mở đường cho việc nhận diện nguyên tố.',
      en: 'Teams in Paris and London independently obtained boron-containing material from borax. Their early samples were impure but established a path to identifying the element.',
      source: 'https://periodic-table.rsc.org/element/5/boron',
    },
    {
      vi: 'Tạp chất làm tính chất mẫu thay đổi mạnh. Vì thế câu chuyện bo còn là câu chuyện làm sạch vật liệu, không chỉ là ghi tên người phát hiện.',
      en: 'Impurities strongly changed the samples’ properties. Boron’s history is therefore also about purification, rather than simply attaching a discoverer’s name.',
      source: 'https://periodic-table.rsc.org/element/5/boron',
    },
  ],
  milestones: [
    {
      year: 1892,
      text: {
        vi: 'Henri Moissan tạo được bo tinh khiết hơn những mẫu ban đầu.',
        en: 'Henri Moissan obtained boron purer than the early samples.',
      },
      source: 'https://periodic-table.rsc.org/element/5/boron',
    },
    {
      year: 1976,
      text: {
        vi: 'Lipscomb nhận Nobel Hoá học cho nghiên cứu cấu trúc các boran.',
        en: 'Lipscomb received the Chemistry Nobel Prize for studies of borane structures.',
      },
      source: 'https://www.nobelprize.org/prizes/chemistry/1976/summary/',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/5/boron',
    'https://www.nobelprize.org/prizes/chemistry/1976/summary/',
  ],
});

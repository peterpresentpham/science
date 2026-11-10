import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: null,
    by: {
      vi: 'Không có một người phát hiện duy nhất',
      en: 'No single discoverer',
    },
    place: {
      vi: 'Nhiều nền văn minh cổ',
      en: 'Several ancient civilisations',
    },
    source: 'https://periodic-table.rsc.org/element/26/iron',
    note: {
      vi: '“5000 BC” trong discoveredBy của dữ liệu gốc là mốc thời gian, không phải tên người phát hiện.',
      en: '“5000 BC” in the existing discoveredBy field is a date, not a discoverer’s name.',
    },
  },
  naming: {
    text: {
      vi: 'Iron có nguồn từ tên Anglo-Saxon; ký hiệu Fe từ Latin “ferrum”, nghĩa là sắt.',
      en: 'Iron comes from an Anglo-Saxon name; Fe comes from Latin “ferrum”, iron.',
    },
    source: 'https://pubchem.ncbi.nlm.nih.gov/element/Fe',
  },
  story: [
    {
      vi: 'Một số đồ sắt cổ có nguồn gốc thiên thạch, trước cả khi con người luyện được quặng sắt. Vì thế dùng sắt và sản xuất sắt là hai chặng lịch sử khác nhau.',
      en: 'Some early iron objects were made from meteorites, before people learned to smelt iron ore. Using iron and producing iron were different historical stages.',
      source: 'https://periodic-table.rsc.org/element/26/iron',
    },
    {
      vi: 'Các loại sắt có tính chất khác nhau do thành phần và cách xử lí. Hiểu vai trò của cacbon giúp giải thích sự khác nhau giữa sắt rèn, gang và thép.',
      en: 'Different compositions and treatments gave iron products different properties. Understanding carbon helped distinguish wrought iron, cast iron and steel.',
      source: 'https://periodic-table.rsc.org/element/26/iron',
    },
  ],
  milestones: [
    {
      year: 1722,
      text: {
        vi: 'Réaumur viết sách giải thích sự khác nhau giữa các dạng vật liệu sắt.',
        en: 'Réaumur published an account explaining differences among iron-based materials.',
      },
      source: 'https://periodic-table.rsc.org/element/26/iron',
    },
    {
      year: 1856,
      text: {
        vi: 'Bessemer đưa ra quy trình sản xuất thép với quy mô lớn hơn.',
        en: 'Bessemer introduced a process that enabled larger-scale steel production.',
      },
      source: 'https://periodic-table.rsc.org/element/26/iron',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/26/iron',
    'https://pubchem.ncbi.nlm.nih.gov/element/Fe',
  ],
});

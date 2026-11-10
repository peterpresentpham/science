import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1825,
    by: {
      vi: 'Hans Christian Ørsted',
      en: 'Hans Christian Ørsted',
    },
    place: {
      vi: 'Copenhagen, Đan Mạch',
      en: 'Copenhagen, Denmark',
    },
    source: 'https://periodic-table.rsc.org/element/13/aluminium',
    note: {
      vi: 'Dữ liệu gốc có năm 1825 nhưng thiếu discoveredBy; bổ sung Ørsted theo RSC.',
      en: 'The existing data has 1825 but no discoveredBy value; Ørsted is supplied from RSC.',
    },
  },
  naming: {
    text: {
      vi: 'Aluminium từ Latin “alumen”, tên của phèn.',
      en: 'Aluminium derives from Latin “alumen”, the name for alum.',
    },
    source: 'https://periodic-table.rsc.org/element/13/aluminium',
  },
  story: [
    {
      vi: 'Nhôm nằm trong các hợp chất rất bền nên khó tách thành kim loại. Ørsted tạo được mẫu chưa tinh khiết, rồi Wöhler cải tiến cách điều chế.',
      en: 'Aluminium was difficult to isolate from its stable compounds. Ørsted obtained an impure sample, and Wöhler improved the preparation.',
      source: 'https://periodic-table.rsc.org/element/13/aluminium',
    },
    {
      vi: 'Kim loại này từng hiếm dù quặng không hiếm. Bước ngoặt là quy trình điện phân cho phép sản xuất với giá thành thấp hơn nhiều.',
      en: 'The metal was once scarce even though its ores were not. Electrolysis transformed its availability by making production much cheaper.',
      source: 'https://periodic-table.rsc.org/element/13/aluminium',
    },
  ],
  milestones: [
    {
      year: 1827,
      text: {
        vi: 'Wöhler cải tiến phương pháp để thu nhôm tinh khiết hơn.',
        en: 'Wöhler improved the method to obtain purer aluminium.',
      },
      source: 'https://periodic-table.rsc.org/element/13/aluminium',
    },
    {
      year: 1886,
      text: {
        vi: 'Hall phát triển quy trình điện phân nhôm trong criolit nóng chảy.',
        en: 'Hall developed aluminium electrolysis in molten cryolite.',
      },
      source: 'https://www.acs.org/education/whatischemistry/landmarks/aluminumprocess.html',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/13/aluminium',
    'https://www.acs.org/education/whatischemistry/landmarks/aluminumprocess.html',
  ],
});

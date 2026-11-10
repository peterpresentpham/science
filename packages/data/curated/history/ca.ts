import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1808,
    by: {
      vi: 'Humphry Davy',
      en: 'Humphry Davy',
    },
    place: {
      vi: 'London, Anh',
      en: 'London, England',
    },
    source: 'https://periodic-table.rsc.org/element/20/calcium',
  },
  naming: {
    text: {
      vi: 'Calcium lấy từ Latin “calx”, nghĩa là vôi.',
      en: 'Calcium derives from Latin “calx”, meaning lime.',
    },
    source: 'https://periodic-table.rsc.org/element/20/calcium',
  },
  story: [
    {
      vi: 'Vôi được dùng lâu đời nhưng không dễ tách kim loại từ nó. Davy chuyển sang điện phân hỗn hợp tạo hỗn hống, rồi loại thuỷ ngân để thu canxi.',
      en: 'Lime had long been useful, but its metal was hard to isolate. Davy produced an amalgam by electrolysis and removed the mercury to obtain calcium.',
      source: 'https://periodic-table.rsc.org/element/20/calcium',
    },
    {
      vi: 'Tên canxi nhắc đến nguyên liệu quen thuộc, không phải vẻ ngoài của kim loại. Việc điều chế nó góp phần chứng minh các “đất” như vôi thực ra là hợp chất.',
      en: 'Its name points to a familiar raw material rather than the metal’s appearance. Isolation helped establish that “earths” such as lime were compounds.',
      source: 'https://periodic-table.rsc.org/element/20/calcium',
    },
  ],
  milestones: [
    {
      year: 1892,
      text: {
        vi: 'Willson tìm ra quy trình lò hồ quang tạo canxi cacbua.',
        en: 'Willson discovered an electric-arc process for making calcium carbide.',
      },
      source:
        'https://www.acs.org/education/whatischemistry/landmarks/calciumcarbideacetylene.html',
    },
    {
      year: 1894,
      text: {
        vi: 'Nhà máy thương mại đầu tiên theo quy trình canxi cacbua của Willson bắt đầu vận hành.',
        en: 'The first commercial plant using Willson’s calcium carbide process began operation.',
      },
      source:
        'https://www.acs.org/education/whatischemistry/landmarks/calciumcarbideacetylene.html',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/20/calcium',
    'https://www.acs.org/education/whatischemistry/landmarks/calciumcarbideacetylene.html',
  ],
});

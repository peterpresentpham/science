import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1766,
    by: {
      vi: 'Henry Cavendish',
      en: 'Henry Cavendish',
    },
    place: {
      vi: 'Anh',
      en: 'England',
    },
    source: 'https://periodic-table.rsc.org/element/1/hydrogen',
  },
  naming: {
    text: {
      vi: 'Hydrogen ghép từ tiếng Hy Lạp chỉ “nước” và “tạo ra”: khí này cháy tạo nước.',
      en: 'Hydrogen combines Greek words for “water” and “forming”: the gas burns to form water.',
    },
    source: 'https://periodic-table.rsc.org/element/1/hydrogen',
  },
  story: [
    {
      vi: 'Cavendish thu khí thoát ra khi kim loại gặp axit và nhận ra nó khác không khí. Điều mới là xác định một loại khí riêng, chứ không chỉ nhìn thấy bọt khí.',
      en: 'Cavendish collected gas released when metals met acids and recognised it as distinct from air. Identifying a separate gas went beyond merely seeing bubbles.',
      source: 'https://periodic-table.rsc.org/element/1/hydrogen',
    },
    {
      vi: 'Tên “sinh ra nước” gắn với việc hiđro cháy tạo nước. Kết quả ấy góp phần thay đổi quan niệm cũ rằng nước là một nguyên tố.',
      en: 'The “water-forming” name reflects hydrogen combustion. That observation helped overturn the old belief that water was an element.',
      source: 'https://periodic-table.rsc.org/element/1/hydrogen',
    },
  ],
  milestones: [
    {
      year: 1783,
      text: {
        vi: 'Jacques Charles dùng hiđro cho một chuyến bay khinh khí cầu.',
        en: 'Jacques Charles used hydrogen in a balloon flight.',
      },
      source: 'https://periodic-table.rsc.org/element/1/hydrogen',
    },
    {
      year: 1931,
      text: {
        vi: 'Urey và cộng sự phát hiện deuteri, đồng vị nặng của hiđro.',
        en: 'Urey and colleagues discovered deuterium, a heavy hydrogen isotope.',
      },
      source: 'https://periodic-table.rsc.org/element/1/hydrogen',
    },
  ],
  sources: ['https://periodic-table.rsc.org/element/1/hydrogen'],
});

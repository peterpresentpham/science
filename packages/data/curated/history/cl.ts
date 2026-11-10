import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1774,
    by: {
      vi: 'Carl Wilhelm Scheele',
      en: 'Carl Wilhelm Scheele',
    },
    place: {
      vi: 'Uppsala, Thuỵ Điển',
      en: 'Uppsala, Sweden',
    },
    source: 'https://periodic-table.rsc.org/element/17/chlorine',
  },
  naming: {
    text: {
      vi: 'Chlorine từ tiếng Hy Lạp “chloros”, chỉ màu vàng lục của khí.',
      en: 'Chlorine comes from Greek “chloros”, referring to the gas’s yellow-green colour.',
    },
    source: 'https://periodic-table.rsc.org/element/17/chlorine',
  },
  story: [
    {
      vi: 'Scheele tạo được một khí vàng lục có khả năng tẩy màu. Tuy vậy, ông chưa hiểu đó là một nguyên tố mới theo cách phân loại ngày nay.',
      en: 'Scheele obtained a yellow-green gas that bleached coloured materials. He did not yet recognise it as an element in the modern sense.',
      source: 'https://periodic-table.rsc.org/element/17/chlorine',
    },
    {
      vi: 'Davy nghiên cứu lại khí này và kết luận nó là đơn chất. Trường hợp clo cho thấy một chất có thể được điều chế trước khi bản chất của nó được giải thích đúng.',
      en: 'Davy revisited the gas and concluded that it was elemental. Chlorine illustrates how a substance can be prepared before its nature is correctly understood.',
      source: 'https://periodic-table.rsc.org/element/17/chlorine',
    },
  ],
  milestones: [
    {
      year: 1810,
      text: {
        vi: 'Davy công bố clo là nguyên tố và đặt tên theo màu khí.',
        en: 'Davy announced chlorine’s elemental nature and named it for its colour.',
      },
      source: 'https://periodic-table.rsc.org/element/17/chlorine',
    },
    {
      year: 1908,
      text: {
        vi: 'Jersey City bắt đầu khử trùng nước cấp thường xuyên bằng hợp chất clo.',
        en: 'Jersey City began routine chlorination of its public water supply.',
      },
      source: 'https://archive.cdc.gov/www_cdc_gov/healthywater/drinking/history.html',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/17/chlorine',
    'https://archive.cdc.gov/www_cdc_gov/healthywater/drinking/history.html',
  ],
});

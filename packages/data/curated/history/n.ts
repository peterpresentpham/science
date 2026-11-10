import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1772,
    by: {
      vi: 'Daniel Rutherford',
      en: 'Daniel Rutherford',
    },
    place: {
      vi: 'Edinburgh, Scotland',
      en: 'Edinburgh, Scotland',
    },
    source: 'https://periodic-table.rsc.org/element/7/nitrogen',
  },
  naming: {
    text: {
      vi: 'Nitrogen ghép từ các từ Hy Lạp mang nghĩa “tạo diêm tiêu”.',
      en: 'Nitrogen combines Greek words meaning “nitre-forming”.',
    },
    source: 'https://periodic-table.rsc.org/element/7/nitrogen',
  },
  story: [
    {
      vi: 'Rutherford nghiên cứu phần khí còn lại sau khi loại những thành phần khác khỏi không khí. Phần khí ấy không duy trì sự cháy và được ông mô tả trong luận án.',
      en: 'Rutherford studied the gas left after other components were removed from air. It did not support combustion, and he described it in his thesis.',
      source: 'https://periodic-table.rsc.org/element/7/nitrogen',
    },
    {
      vi: 'Cavendish và Priestley cũng từng thu được khí này. Điểm đáng chú ý ở Rutherford là xem nó như một thành phần riêng của không khí.',
      en: 'Cavendish and Priestley had also obtained the gas. Rutherford’s contribution was recognising it as a distinct component of air.',
      source: 'https://periodic-table.rsc.org/element/7/nitrogen',
    },
  ],
  milestones: [
    {
      year: 1909,
      text: {
        vi: 'Haber trình diễn tổng hợp amoniac từ nitơ và hiđro ở quy mô phòng thí nghiệm.',
        en: 'Haber demonstrated laboratory synthesis of ammonia from nitrogen and hydrogen.',
      },
      source: 'https://pubsapp.acs.org/subscribe/archive/tcaw/10/i02/html/02chemch.html',
    },
    {
      year: 1913,
      text: {
        vi: 'BASF vận hành nhà máy amoniac Haber–Bosch ở Oppau.',
        en: 'BASF started the Haber–Bosch ammonia plant at Oppau.',
      },
      source: 'https://pubsapp.acs.org/subscribe/archive/tcaw/10/i02/html/02chemch.html',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/7/nitrogen',
    'https://pubsapp.acs.org/subscribe/archive/tcaw/10/i02/html/02chemch.html',
  ],
});

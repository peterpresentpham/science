import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1669,
    by: {
      vi: 'Hennig Brand',
      en: 'Hennig Brand',
    },
    place: {
      vi: 'Hamburg, Đức',
      en: 'Hamburg, Germany',
    },
    source: 'https://periodic-table.rsc.org/element/15/phosphorus',
  },
  naming: {
    text: {
      vi: 'Phosphorus từ tiếng Hy Lạp “phosphoros”, nghĩa là mang ánh sáng.',
      en: 'Phosphorus comes from Greek “phosphoros”, meaning light-bearer.',
    },
    source: 'https://periodic-table.rsc.org/element/15/phosphorus',
  },
  story: [
    {
      vi: 'Brand tìm vật liệu có khả năng biến kim loại thành vàng, nhưng thu được một chất phát sáng. Ông giữ bí mật cách làm, rồi bán mẫu để kiếm tiền.',
      en: 'Seeking a material that could turn metals into gold, Brand obtained a glowing substance. He kept his process secret and later sold samples.',
      source: 'https://periodic-table.rsc.org/element/15/phosphorus',
    },
    {
      vi: 'Boyle và những người khác tiếp tục nghiên cứu chất mới. Về sau, nguồn nguyên liệu từ xương giúp photpho bớt phụ thuộc vào cách điều chế ban đầu.',
      en: 'Boyle and others investigated the new substance. Later use of bone as a raw material freed phosphorus production from its original preparation route.',
      source: 'https://periodic-table.rsc.org/element/15/phosphorus',
    },
  ],
  milestones: [
    {
      year: 1934,
      text: {
        vi: 'Joliot-Curie tạo đồng vị photpho phóng xạ bằng phản ứng hạt nhân.',
        en: 'The Joliot-Curies produced a radioactive phosphorus isotope in a nuclear reaction.',
      },
      source: 'https://www.nobelprize.org/prizes/chemistry/1935/joliot-fred/facts/',
    },
    {
      year: 1979,
      text: {
        vi: 'Wittig được trao Nobel cho việc phát triển thuốc thử chứa photpho trong tổng hợp hữu cơ.',
        en: 'Wittig received the Nobel Prize for developing phosphorus reagents for organic synthesis.',
      },
      source: 'https://www.nobelprize.org/prizes/chemistry/1979/summary/',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/15/phosphorus',
    'https://www.nobelprize.org/prizes/chemistry/1935/joliot-fred/facts/',
    'https://www.nobelprize.org/prizes/chemistry/1979/summary/',
  ],
});

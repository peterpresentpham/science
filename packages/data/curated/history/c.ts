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
    source: 'https://periodic-table.rsc.org/element/6/carbon',
    note: {
      vi: '“Ancient Egypt” trong dữ liệu gốc không phải tên người phát hiện; nguyên tố được biết từ thời cổ đại.',
      en: '“Ancient Egypt” in the existing data is not a discoverer’s name; carbon has been known since antiquity.',
    },
  },
  naming: {
    text: {
      vi: 'Carbon từ tiếng Latin “carbo”, nghĩa là than.',
      en: 'Carbon comes from the Latin “carbo”, meaning charcoal.',
    },
    source: 'https://periodic-table.rsc.org/element/6/carbon',
  },
  story: [
    {
      vi: 'Con người đã dùng than và muội từ rất lâu trước khi có khái niệm nguyên tố. Kim cương thì trông khác hẳn, nên việc nhận ra chúng có cùng bản chất không hề hiển nhiên.',
      en: 'People used charcoal and soot long before the concept of an element. Diamond looked so different that recognising their shared chemical identity was far from obvious.',
      source: 'https://periodic-table.rsc.org/element/6/carbon',
    },
    {
      vi: 'Thí nghiệm đốt kim cương cho thấy nó tạo cacbon đioxit. So sánh sản phẩm phản ứng giúp nối một viên đá trong suốt với chất màu đen quen thuộc.',
      en: 'Burning diamond produced carbon dioxide. Comparing reaction products connected a transparent gem with familiar black forms of carbon.',
      source: 'https://periodic-table.rsc.org/element/6/carbon',
    },
  ],
  milestones: [
    {
      year: 1694,
      text: {
        vi: 'Averani và Targioni dùng ánh sáng hội tụ để làm kim cương cháy.',
        en: 'Averani and Targioni used focused sunlight to burn diamond.',
      },
      source: 'https://periodic-table.rsc.org/element/6/carbon',
    },
    {
      year: 1796,
      text: {
        vi: 'Tennant chứng minh kim cương khi cháy chỉ tạo CO₂, xác nhận nó là cacbon.',
        en: 'Tennant showed that burning diamond produced only CO₂, establishing it as carbon.',
      },
      source: 'https://periodic-table.rsc.org/element/6/carbon',
    },
  ],
  sources: ['https://periodic-table.rsc.org/element/6/carbon'],
});

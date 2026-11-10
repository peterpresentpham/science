import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1746,
    by: {
      vi: 'Andreas Marggraf',
      en: 'Andreas Marggraf',
    },
    place: {
      vi: 'Đức',
      en: 'Germany',
    },
    source: 'https://periodic-table.rsc.org/element/30/zinc',
    note: {
      vi: 'Giữ 1746 theo dữ liệu gốc cho Marggraf ở châu Âu; “India” nhắc đến truyền thống sản xuất sớm hơn.',
      en: '1746 is retained for Marggraf’s European work; “India” refers to an earlier production tradition.',
    },
  },
  naming: {
    text: {
      vi: 'Zinc liên quan đến tên “zinc” trong tiếng Đức; nguồn xa của tên còn chưa chắc chắn.',
      en: 'Zinc is related to the German name “zinc”; its more distant origin remains uncertain.',
    },
    source: 'https://periodic-table.rsc.org/element/30/zinc',
  },
  story: [
    {
      vi: 'Kẽm đã được sản xuất ở Ấn Độ từ trước các thí nghiệm châu Âu. Vì thế một năm phát hiện duy nhất có thể bỏ sót lịch sử luyện kim ở những khu vực khác.',
      en: 'Zinc was produced in India before the European experiments. A single discovery date can therefore hide metallurgical traditions elsewhere.',
      source: 'https://periodic-table.rsc.org/element/30/zinc',
    },
    {
      vi: 'Mốc Marggraf nói về nghiên cứu ở châu Âu, không có nghĩa ông là người đầu tiên trong lịch sử nhìn thấy kim loại kẽm.',
      en: 'Marggraf’s date refers to European research, not to the first time anyone in history encountered zinc metal.',
      source: 'https://periodic-table.rsc.org/element/30/zinc',
    },
  ],
  milestones: [
    {
      year: 1836,
      text: {
        vi: 'Sorel đăng kí sáng chế quy trình bảo vệ thép bằng lớp kẽm nóng chảy.',
        en: 'Sorel patented a process protecting steel with a molten-zinc coating.',
      },
      source: 'https://galvanizing.org.uk/hot-dip-galvanizing/history-of-galvanizing/',
    },
    {
      year: 1850,
      text: {
        vi: 'Ngành mạ kẽm Anh đã tiêu thụ kẽm ở quy mô công nghiệp lớn.',
        en: 'The British galvanizing industry was using zinc on a substantial industrial scale.',
      },
      source: 'https://galvanizing.org.uk/hot-dip-galvanizing/history-of-galvanizing/',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/30/zinc',
    'https://galvanizing.org.uk/hot-dip-galvanizing/history-of-galvanizing/',
  ],
});

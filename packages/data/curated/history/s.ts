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
      vi: 'Nhiều vùng từ thời cổ đại',
      en: 'Several regions in antiquity',
    },
    source: 'https://periodic-table.rsc.org/element/16/sulfur',
    note: {
      vi: 'Giá trị “Ancient china” trong dữ liệu gốc không chỉ một người; không gán năm phát hiện chính xác.',
      en: 'The existing “Ancient china” value does not name an individual; no exact discovery year is assigned.',
    },
  },
  naming: {
    text: {
      vi: 'Nguồn xa của sulfur chưa chắc chắn; RSC nêu các khả năng liên quan đến “sulvere” hoặc Latin “sulfurium”.',
      en: 'The distant origin of sulfur is uncertain; RSC lists possibilities involving “sulvere” or Latin “sulfurium”.',
    },
    source: 'https://periodic-table.rsc.org/element/16/sulfur',
  },
  story: [
    {
      vi: 'Lưu huỳnh tự nhiên dễ nhận ra nhờ màu vàng. Người xưa đã dùng nó trước khi có cách phân biệt chặt chẽ nguyên tố với hợp chất.',
      en: 'Native sulfur is conspicuously yellow. It was used long before a rigorous distinction between elements and compounds existed.',
      source: 'https://periodic-table.rsc.org/element/16/sulfur',
    },
    {
      vi: 'Ngay cả sau Lavoisier, tính đơn chất của lưu huỳnh vẫn từng bị tranh luận vì mẫu lẫn tạp chất. Làm sạch và kiểm tra thành phần mới giúp kết luận vững hơn.',
      en: 'Even after Lavoisier, sulfur’s elemental nature was disputed because samples contained impurities. Purification and compositional analysis strengthened the conclusion.',
      source: 'https://periodic-table.rsc.org/element/16/sulfur',
    },
  ],
  milestones: [
    {
      year: 1809,
      text: {
        vi: 'Gay-Lussac và Thénard đưa ra bằng chứng lưu huỳnh là nguyên tố.',
        en: 'Gay-Lussac and Thénard supplied evidence that sulfur is an element.',
      },
      source: 'https://periodic-table.rsc.org/element/16/sulfur',
    },
    {
      year: 1839,
      text: {
        vi: 'Goodyear phát triển lưu hoá cao su với lưu huỳnh.',
        en: 'Goodyear developed sulfur vulcanisation of rubber.',
      },
      source: 'https://www.acs.org/education/whatischemistry/landmarks/syntheticrubber.html',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/16/sulfur',
    'https://www.acs.org/education/whatischemistry/landmarks/syntheticrubber.html',
  ],
});

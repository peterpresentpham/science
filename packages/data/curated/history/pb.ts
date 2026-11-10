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
    source: 'https://periodic-table.rsc.org/element/82/lead',
    note: {
      vi: 'Không có năm hay người phát hiện duy nhất; discoveredBy của dữ liệu gốc chỉ ghi vùng hoặc mốc cổ đại.',
      en: 'There is no single discovery year or discoverer; the existing discoveredBy value records a region or ancient date.',
    },
  },
  naming: {
    text: {
      vi: 'Lead là tên Anglo-Saxon; Pb theo Latin “plumbum”, từ cũng để lại dấu vết trong tên nghề thợ ống nước.',
      en: 'Lead is an Anglo-Saxon name; Pb follows Latin “plumbum”, also preserved in the word plumber.',
    },
    source: 'https://periodic-table.rsc.org/element/82/lead',
  },
  story: [
    {
      vi: 'Chì dễ tạo hình nên từng có mặt trong ống nước, đồ dùng và chất màu. Con người sử dụng nó rất lâu trước khi nhận thức đầy đủ độc tính.',
      en: 'Lead’s workability made it useful in pipes, household objects and pigments. It was used long before its toxicity was fully understood.',
      source: 'https://periodic-table.rsc.org/element/82/lead',
    },
    {
      vi: 'Lịch sử chì cho thấy tính tiện dụng của vật liệu không đủ để đánh giá tác động sức khoẻ. Một ứng dụng có thể phổ biến rồi bị loại bỏ khi có bằng chứng mới.',
      en: 'Lead’s history shows that usefulness alone does not determine health impact. An application may become widespread and later be abandoned as evidence develops.',
      source: 'https://periodic-table.rsc.org/element/82/lead',
    },
  ],
  milestones: [
    {
      year: 1860,
      text: {
        vi: 'Planté giới thiệu ắc quy chì–axit có thể nạp lại theo hồ sơ Bảo tàng Khoa học.',
        en: 'Planté introduced the rechargeable lead–acid cell, according to the Science Museum record.',
      },
      source:
        'https://collection.sciencemuseumgroup.org.uk/objects/co36401/one-of-the-first-rechargeable-batteries-about-1860-lead-acid-rechargeable-batteries',
    },
    {
      year: 1996,
      text: {
        vi: 'Hoa Kỳ hoàn tất loại bỏ xăng pha chì cho xe đường bộ.',
        en: 'The United States completed the phase-out of leaded gasoline for road vehicles.',
      },
      source:
        'https://www.epa.gov/archive/epa/aboutepa/epa-takes-final-step-phaseout-leaded-gasoline.html',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/82/lead',
    'https://collection.sciencemuseumgroup.org.uk/objects/co36401/one-of-the-first-rechargeable-batteries-about-1860-lead-acid-rechargeable-batteries',
    'https://www.epa.gov/archive/epa/aboutepa/epa-takes-final-step-phaseout-leaded-gasoline.html',
  ],
});

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
    source: 'https://periodic-table.rsc.org/element/47/silver',
    note: {
      vi: 'Không có năm hay người phát hiện duy nhất; discoveredBy của dữ liệu gốc chỉ ghi vùng hoặc mốc cổ đại.',
      en: 'There is no single discovery year or discoverer; the existing discoveredBy value records a region or ancient date.',
    },
  },
  naming: {
    text: {
      vi: 'Silver có gốc Anglo-Saxon; ký hiệu Ag theo tên Latin “argentum”.',
      en: 'Silver has an Anglo-Saxon origin; Ag follows Latin “argentum”.',
    },
    source: 'https://pubchem.ncbi.nlm.nih.gov/element/Ag',
  },
  story: [
    {
      vi: 'Bạc được khai thác và tinh luyện từ thời cổ đại. Trong quá trình luyện, người ta có thể oxi hoá các kim loại đi kèm để giữ lại bạc.',
      en: 'Silver was mined and refined in antiquity. Refiners could oxidise accompanying metals while retaining the silver.',
      source: 'https://periodic-table.rsc.org/element/47/silver',
    },
    {
      vi: 'Tính chất của kim loại giúp làm tiền và đồ trang sức, còn tính chất của hợp chất bạc lại mở đường cho nhiếp ảnh. Hai vai trò ấy không nên bị đánh đồng.',
      en: 'The metal served coinage and jewellery, while silver compounds later enabled photography. These roles depend on different chemical forms.',
      source: 'https://periodic-table.rsc.org/element/47/silver',
    },
  ],
  milestones: [
    {
      year: -3000,
      text: {
        vi: 'Bằng chứng khai mỏ ở Thổ Nhĩ Kỳ và Hy Lạp cho thấy bạc đã được khai thác khoảng thời điểm này.',
        en: 'Mining evidence in Turkey and Greece shows silver extraction around this time.',
      },
      source: 'https://periodic-table.rsc.org/element/47/silver',
    },
    {
      year: 1839,
      text: {
        vi: 'Daguerreotype dùng bề mặt mạ bạc trở thành phương pháp nhiếp ảnh được công bố rộng rãi.',
        en: 'The silver-surfaced daguerreotype became a publicly announced photographic process.',
      },
      source:
        'https://www.loc.gov/collections/daguerreotypes/articles-and-essays/the-daguerreotype-medium/',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/47/silver',
    'https://pubchem.ncbi.nlm.nih.gov/element/Ag',
    'https://www.loc.gov/collections/daguerreotypes/articles-and-essays/the-daguerreotype-medium/',
  ],
});

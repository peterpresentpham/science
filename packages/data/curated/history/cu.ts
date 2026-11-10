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
    source: 'https://periodic-table.rsc.org/element/29/copper',
    note: {
      vi: 'Không có năm hay người phát hiện duy nhất; discoveredBy của dữ liệu gốc chỉ ghi vùng hoặc mốc cổ đại.',
      en: 'There is no single discovery year or discoverer; the existing discoveredBy value records a region or ancient date.',
    },
  },
  naming: {
    text: {
      vi: 'Copper liên quan đến tên đảo Cyprus; Cu theo Latin “cuprum”.',
      en: 'Copper is linked to the island of Cyprus; Cu follows Latin “cuprum”.',
    },
    source: 'https://pubchem.ncbi.nlm.nih.gov/element/Cu',
  },
  story: [
    {
      vi: 'Đồng tự sinh đôi khi có thể tìm thấy ở dạng kim loại. Điều đó giúp con người làm đồ đồng trước khi có kĩ thuật xử lí quặng phức tạp.',
      en: 'Native copper can sometimes be found as metal. This allowed copper objects to be made before complex ore-processing techniques existed.',
      source: 'https://periodic-table.rsc.org/element/29/copper',
    },
    {
      vi: 'Pha đồng với thiếc cho vật liệu khác hẳn đồng nguyên chất. Vai trò của đồng vì thế gắn cả với những bước tiến trong chế tạo hợp kim.',
      en: 'Alloying copper with tin produced a material unlike pure copper. Its history is also tied to advances in alloy-making.',
      source: 'https://periodic-table.rsc.org/element/29/copper',
    },
  ],
  milestones: [
    {
      year: 1839,
      text: {
        vi: 'Phương pháp ảnh daguerreotype dùng tấm đồng mạ bạc được công bố.',
        en: 'The daguerreotype process using silver-plated copper sheets was announced.',
      },
      source:
        'https://www.loc.gov/collections/daguerreotypes/articles-and-essays/the-daguerreotype-medium/',
    },
    {
      year: 1886,
      text: {
        vi: 'Tượng Nữ thần Tự do với lớp vỏ đồng được khánh thành.',
        en: 'The copper-clad Statue of Liberty was dedicated.',
      },
      source: 'https://www.nps.gov/stli/learn/statue-of-liberty-facts.htm',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/29/copper',
    'https://pubchem.ncbi.nlm.nih.gov/element/Cu',
    'https://www.loc.gov/collections/daguerreotypes/articles-and-essays/the-daguerreotype-medium/',
    'https://www.nps.gov/stli/learn/statue-of-liberty-facts.htm',
  ],
});

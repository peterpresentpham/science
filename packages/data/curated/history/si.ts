import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1824,
    by: {
      vi: 'Jöns Jacob Berzelius',
      en: 'Jöns Jacob Berzelius',
    },
    place: {
      vi: 'Stockholm, Thuỵ Điển',
      en: 'Stockholm, Sweden',
    },
    source: 'https://periodic-table.rsc.org/element/14/silicon',
    note: {
      vi: 'Dữ liệu gốc ghi 1854, mốc silic tinh thể. Dùng năm 1824 cho lần Berzelius tách silic theo RSC.',
      en: 'The existing 1854 date refers to crystalline silicon. This account uses RSC’s 1824 date for Berzelius’s isolation.',
    },
  },
  naming: {
    text: {
      vi: 'Silicon từ Latin “silex” hoặc “silicis”, nghĩa là đá lửa.',
      en: 'Silicon comes from Latin “silex” or “silicis”, meaning flint.',
    },
    source: 'https://periodic-table.rsc.org/element/14/silicon',
  },
  story: [
    {
      vi: 'Con người biết đá lửa và thuỷ tinh rất sớm, nhưng silic trong chúng bị liên kết với oxi. Tách được đơn chất là một bài toán khác hẳn chế tác cát hay đá.',
      en: 'People knew flint and glass long before isolating silicon, which was bound to oxygen in those materials. Obtaining the element was quite different from shaping sand or stone.',
      source: 'https://periodic-table.rsc.org/element/14/silicon',
    },
    {
      vi: 'Berzelius thu được bột silic tương đối tinh khiết rồi loại các tạp chất. Câu chuyện nhắc rằng một vật liệu phổ biến không nhất thiết cho ta ngay mẫu nguyên tố của nó.',
      en: 'Berzelius obtained relatively pure silicon powder and removed impurities. An abundant material does not necessarily make its constituent element easy to isolate.',
      source: 'https://periodic-table.rsc.org/element/14/silicon',
    },
  ],
  milestones: [
    {
      year: 1854,
      text: {
        vi: 'Sainte-Claire Deville điều chế silic ở dạng tinh thể.',
        en: 'Sainte-Claire Deville prepared crystalline silicon.',
      },
      source: 'https://pubchem.ncbi.nlm.nih.gov/element/Si',
    },
    {
      year: 1954,
      text: {
        vi: 'Bell Labs trình diễn pin mặt trời silic có khả năng sử dụng thực tế.',
        en: 'Bell Labs demonstrated a practical silicon solar cell.',
      },
      source: 'https://www.aps.org/apsnews/2009/04/bell-labs-silicon-solar-cell',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/14/silicon',
    'https://pubchem.ncbi.nlm.nih.gov/element/Si',
    'https://www.aps.org/apsnews/2009/04/bell-labs-silicon-solar-cell',
  ],
});

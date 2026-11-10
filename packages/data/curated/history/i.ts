import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1811,
    by: {
      vi: 'Bernard Courtois',
      en: 'Bernard Courtois',
    },
    place: {
      vi: 'Paris, Pháp',
      en: 'Paris, France',
    },
    source: 'https://periodic-table.rsc.org/element/53/iodine',
  },
  naming: {
    text: {
      vi: 'Iodine từ tiếng Hy Lạp “iodes”, nghĩa là tím, gợi màu hơi iot.',
      en: 'Iodine comes from Greek “iodes”, violet, referring to the colour of its vapour.',
    },
    source: 'https://periodic-table.rsc.org/element/53/iodine',
  },
  story: [
    {
      vi: 'Courtois làm việc với tro rong biển trong sản xuất diêm tiêu. Hơi tím xuất hiện rồi ngưng tụ thành tinh thể có ánh kim, khiến ông nghi ngờ có nguyên tố mới.',
      en: 'Courtois worked with seaweed ash in saltpetre production. Violet vapour condensed into lustrous crystals, suggesting a new element.',
      source: 'https://periodic-table.rsc.org/element/53/iodine',
    },
    {
      vi: 'Ông chuyển mẫu cho các nhà hoá học khác nghiên cứu. Việc chứng minh bản chất nguyên tố có đóng góp của nhiều người, dù mốc phát hiện gắn với Courtois.',
      en: 'He passed samples to other chemists for investigation. Establishing its elemental nature involved several people, although discovery is associated with Courtois.',
      source: 'https://periodic-table.rsc.org/element/53/iodine',
    },
  ],
  milestones: [
    {
      year: 1813,
      text: {
        vi: 'Iot được giới thiệu công khai tại Paris và được Gay-Lussac cùng Davy xác nhận.',
        en: 'Iodine was publicly presented in Paris and confirmed by Gay-Lussac and Davy.',
      },
      source: 'https://periodic-table.rsc.org/element/53/iodine',
    },
    {
      year: 1924,
      text: {
        vi: 'Muối iot được bán tại Michigan, Hoa Kỳ, trong chương trình bổ sung iot vào thực phẩm.',
        en: 'Iodized salt went on sale in Michigan, USA, as part of food fortification.',
      },
      source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3509517/',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/53/iodine',
    'https://pmc.ncbi.nlm.nih.gov/articles/PMC3509517/',
  ],
});

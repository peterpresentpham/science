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
    source: 'https://periodic-table.rsc.org/element/80/mercury',
    note: {
      vi: 'Không có năm hay người phát hiện duy nhất; discoveredBy của dữ liệu gốc chỉ ghi vùng hoặc mốc cổ đại.',
      en: 'There is no single discovery year or discoverer; the existing discoveredBy value records a region or ancient date.',
    },
  },
  naming: {
    text: {
      vi: 'Mercury lấy theo tên hành tinh Mercury; Hg từ “hydrargyrum”, liên quan đến tiếng Hy Lạp chỉ bạc lỏng.',
      en: 'Mercury is named after the planet; Hg comes from “hydrargyrum”, linked to Greek words for liquid silver.',
    },
    source: 'https://periodic-table.rsc.org/element/80/mercury',
  },
  story: [
    {
      vi: 'Người xưa biết chu sa đỏ và có thể thu kim loại lỏng từ khoáng vật này. Vẻ ngoài khác thường của thuỷ ngân khiến nó có vai trò lớn trong giả kim thuật.',
      en: 'Ancient people knew red cinnabar and could obtain liquid metal from it. Mercury’s unusual appearance gave it a prominent place in alchemy.',
      source: 'https://periodic-table.rsc.org/element/80/mercury',
    },
    {
      vi: 'Khả năng tạo hỗn hống với vàng từng được dùng trong khai khoáng. Những ứng dụng cũ không chứng minh chất này an toàn: hơi thuỷ ngân rất độc.',
      en: 'Its ability to form an amalgam with gold was used in mining. Historical use does not establish safety: mercury vapour is highly toxic.',
      source: 'https://periodic-table.rsc.org/element/80/mercury',
    },
  ],
  milestones: [
    {
      year: 1643,
      text: {
        vi: 'Torricelli dùng cột thuỷ ngân trong nghiên cứu áp suất không khí, khoảng thời điểm này.',
        en: 'Torricelli used a mercury column to study atmospheric pressure around this time.',
      },
      source: 'https://catalogue.museogalileo.it/indepth/AirPump.html',
    },
    {
      year: 1848,
      text: {
        vi: 'Thuỷ ngân từ New Almaden được dùng trong khai thác vàng ở California.',
        en: 'Mercury from New Almaden was used in California gold mining.',
      },
      source: 'https://periodic-table.rsc.org/element/80/mercury',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/80/mercury',
    'https://catalogue.museogalileo.it/indepth/AirPump.html',
  ],
});

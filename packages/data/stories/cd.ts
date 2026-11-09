import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Thủ phạm của bệnh "itai-itai" (đau quá, đau quá) ở Nhật Bản, khi nước thải mỏ ngấm vào ruộng lúa.',
    en: 'The cause of Japan\'s "itai-itai" ("it hurts, it hurts") disease, when mine waste seeped into rice fields.',
  },
  uses: [
    {
      icon: 'Battery',
      text: {
        vi: 'Pin sạc Ni-Cd (đời cũ)',
        en: 'Old Ni-Cd rechargeable batteries',
      },
    },
    {
      icon: 'Sun',
      text: {
        vi: 'Pin mặt trời CdTe',
        en: 'CdTe solar panels',
      },
    },
    {
      icon: 'Pencil',
      text: {
        vi: 'Màu vàng, đỏ trong sơn hoạ sĩ',
        en: "Yellow and red artists' paints",
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Bệnh itai-itai là gì?',
        en: 'What was itai-itai disease?',
      },
      a: {
        vi: 'Ở tỉnh Toyama (Nhật Bản), nước sông nhiễm cadimi từ mỏ đã tưới ruộng lúa suốt nhiều năm. Người ăn gạo đó bị xương giòn và đau dữ dội, nên bệnh được gọi theo tiếng kêu "itai-itai".',
        en: 'In Toyama, Japan, river water polluted with cadmium from a mine irrigated rice fields for years. People who ate the rice developed brittle, agonisingly painful bones, so the disease was named after their cries.',
      },
      source: 'https://en.wikipedia.org/wiki/Itai-itai_disease',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Rất độc, tích tụ trong thận và xương. Pin cũ chứa cadimi cần được thu gom riêng.',
      en: 'Very toxic, building up in kidneys and bones. Old cadmium batteries need separate collection.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Kim cương giả phổ biến nhất, zirconia, làm từ zirconi.',
    en: 'The most popular fake diamond, cubic zirconia, is made from zirconium.',
  },
  uses: [
    {
      icon: 'Gem',
      text: {
        vi: 'Kim cương giả (zirconia)',
        en: 'Imitation diamonds (cubic zirconia)',
      },
    },
    {
      icon: 'Smile',
      text: {
        vi: 'Răng sứ',
        en: 'Ceramic dental crowns',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Vỏ thanh nhiên liệu lò hạt nhân',
        en: 'Nuclear fuel rod cladding',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao lò hạt nhân dùng zirconi?',
        en: 'Why do nuclear reactors use zirconium?',
      },
      a: {
        vi: 'Zirconi gần như "trong suốt" với neutron: nó hầu như không hấp thụ neutron, nên không làm chậm phản ứng. Nó còn bền và chịu ăn mòn tốt trong nước nóng.',
        en: 'Zirconium is almost "transparent" to neutrons: it barely absorbs them, so it does not slow the reaction. It also resists corrosion in hot water.',
      },
      source: 'https://en.wikipedia.org/wiki/Zirconium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại; được dùng làm răng sứ.',
      en: 'Harmless; it is used in dental crowns.',
    },
  },
});

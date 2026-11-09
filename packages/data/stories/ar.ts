import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Chiếm gần 1% không khí, nhiều gấp hơn 20 lần khí cacbonic.',
    en: 'Almost 1% of the air, more than 20 times as much as carbon dioxide.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Khí trong bóng đèn sợi đốt',
        en: 'The gas in incandescent bulbs',
      },
    },
    {
      icon: 'Wrench',
      text: {
        vi: 'Khí bảo vệ khi hàn kim loại',
        en: 'Shielding gas for welding',
      },
    },
    {
      icon: 'Building2',
      text: {
        vi: 'Lớp giữa kính cách nhiệt',
        en: 'Filling double-glazed windows',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên agon nghĩa là gì?',
        en: 'What does the name argon mean?',
      },
      a: {
        vi: 'Trong tiếng Hy Lạp, "argos" nghĩa là "lười biếng", vì agon gần như không phản ứng với bất cứ thứ gì.',
        en: 'In Greek, "argos" means "lazy", because argon hardly reacts with anything.',
      },
      source: 'https://en.wikipedia.org/wiki/Argon',
    },
    {
      q: {
        vi: 'Vì sao bóng đèn sợi đốt bơm agon?',
        en: 'Why are light bulbs filled with argon?',
      },
      a: {
        vi: 'Dây tóc nóng trắng sẽ cháy ngay nếu gặp oxi. Agon không phản ứng, lại làm dây tóc bay hơi chậm hơn so với chân không, nên bóng bền hơn.',
        en: "A white-hot filament would burn up at once in oxygen. Argon does not react, and it slows the filament's evaporation compared with a vacuum, so the bulb lasts longer.",
      },
      source: 'https://en.wikipedia.org/wiki/Argon',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Không độc, không cháy. Chỉ nguy hiểm khi tràn ngập phòng kín vì chiếm chỗ oxi.',
      en: 'Not poisonous and does not burn. Only dangerous if it fills a closed room and pushes out oxygen.',
    },
  },
});

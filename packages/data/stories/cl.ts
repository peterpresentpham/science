import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Clo giữ cho nước máy và hồ bơi sạch vi khuẩn, và nằm trong từng hạt muối ăn của bạn.',
    en: 'Chlorine keeps tap water and swimming pools free of germs, and it is in every grain of your table salt.',
  },
  uses: [
    {
      icon: 'Droplet',
      text: {
        vi: 'Khử trùng nước máy',
        en: 'Disinfecting tap water',
      },
    },
    {
      icon: 'Waves',
      text: {
        vi: 'Giữ nước hồ bơi sạch',
        en: 'Keeping pools clean',
      },
    },
    {
      icon: 'Soup',
      text: {
        vi: 'Muối ăn (natri clorua)',
        en: 'Table salt (sodium chloride)',
      },
    },
    {
      icon: 'Wrench',
      text: {
        vi: 'Ống nhựa PVC',
        en: 'PVC plastic pipes',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Mùi "hồ bơi" từ đâu ra?',
        en: 'Where does the "pool smell" come from?',
      },
      a: {
        vi: 'Không hẳn từ clo. Khi clo trong nước gặp mồ hôi và nước tiểu của người bơi, chúng tạo ra cloramin. Mùi hắc ấy chủ yếu là cloramin.',
        en: "Not really from chlorine. When chlorine in the water meets swimmers' sweat and urine, it forms chloramines. That sharp smell is mostly chloramines.",
      },
      source: 'https://en.wikipedia.org/wiki/Chloramines',
    },
    {
      q: {
        vi: 'Vì sao nước máy có clo?',
        en: 'Why is there chlorine in tap water?',
      },
      a: {
        vi: 'Từ đầu thế kỷ 20, nhiều thành phố bắt đầu cho clo vào nước máy để diệt vi khuẩn gây bệnh như tả và thương hàn. Đây được coi là một trong những tiến bộ y tế công cộng lớn nhất.',
        en: 'From the early 20th century, cities began adding chlorine to drinking water to kill germs that cause cholera and typhoid. It is counted among the greatest public health advances.',
      },
      source: 'https://en.wikipedia.org/wiki/Water_chlorination',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Khí clo rất độc. Không bao giờ trộn nước tẩy javel với chất tẩy có axit hay amoniac vì sẽ sinh khí độc.',
      en: 'Chlorine gas is very toxic. Never mix bleach with acidic or ammonia cleaners: it releases poisonous gas.',
    },
  },
  lenses: ['kitchen'],
});

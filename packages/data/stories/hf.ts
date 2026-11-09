import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Giống zirconi đến mức mãi tới năm 1923 người ta mới phát hiện ra nó.',
    en: 'So similar to zirconium that it was not discovered until 1923.',
  },
  uses: [
    {
      icon: 'Cpu',
      text: {
        vi: 'Lớp cách điện trong chip đời mới',
        en: 'Insulating layers in modern chips',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Thanh điều khiển lò hạt nhân',
        en: 'Nuclear reactor control rods',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên hafni từ đâu mà có?',
        en: 'Where does the name hafnium come from?',
      },
      a: {
        vi: 'Từ Hafnia, tên La-tinh của Copenhagen, nơi nó được tìm ra.',
        en: 'From Hafnia, the Latin name of Copenhagen, where it was discovered.',
      },
      source: 'https://en.wikipedia.org/wiki/Hafnium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại ở dạng thành phẩm.',
      en: 'Harmless in finished products.',
    },
  },
});

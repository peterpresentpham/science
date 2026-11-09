import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nhiều đồng hồ nguyên tử, kể cả trên vệ tinh GPS, đếm thời gian bằng dao động của nguyên tử rubiđi.',
    en: 'Many atomic clocks, including those on GPS satellites, keep time with the vibrations of rubidium atoms.',
  },
  uses: [
    {
      icon: 'Zap',
      text: {
        vi: 'Đồng hồ nguyên tử',
        en: 'Atomic clocks',
      },
    },
    {
      icon: 'Rocket',
      text: {
        vi: 'Vệ tinh định vị GPS',
        en: 'GPS navigation satellites',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên rubiđi từ đâu mà có?',
        en: 'Where does the name rubidium come from?',
      },
      a: {
        vi: 'Năm 1861, Bunsen và Kirchhoff tìm ra nó nhờ những vạch màu đỏ thẫm trong quang phổ. "Rubidus" trong tiếng La-tinh nghĩa là đỏ thẫm.',
        en: 'In 1861 Bunsen and Kirchhoff found it through deep red lines in its spectrum. "Rubidus" is Latin for deep red.',
      },
      source: 'https://en.wikipedia.org/wiki/Rubidium',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Bốc cháy khi gặp không khí ẩm và nước; phải cất kín.',
      en: 'Ignites in moist air and water; must be sealed away.',
    },
  },
});

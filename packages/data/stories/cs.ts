import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một giây được định nghĩa bằng đúng 9.192.631.770 dao động của nguyên tử xesi.',
    en: 'One second is defined as exactly 9,192,631,770 vibrations of a caesium atom.',
  },
  uses: [
    {
      icon: 'Zap',
      text: {
        vi: 'Đồng hồ nguyên tử chuẩn',
        en: 'Standard atomic clocks',
      },
    },
    {
      icon: 'Factory',
      text: {
        vi: 'Dung dịch khoan giếng dầu',
        en: 'Oil well drilling fluids',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Xesi gặp nước thì sao?',
        en: 'What happens when caesium meets water?',
      },
      a: {
        vi: 'Nó phản ứng gần như nổ tung, dữ dội hơn cả natri và kali. Xesi lại nóng chảy ở khoảng 28 °C, nên một ngày nóng là đủ làm nó tan chảy.',
        en: 'It reacts almost explosively, more violently than sodium or potassium. Caesium also melts at about 28 °C, so a hot day is enough to melt it.',
      },
      source: 'https://en.wikipedia.org/wiki/Caesium',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Nổ khi gặp nước; luôn cất kín trong khí trơ.',
      en: 'Explodes with water; always sealed under inert gas.',
    },
  },
});

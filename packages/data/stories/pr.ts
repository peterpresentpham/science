import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Kính bảo hộ của thợ thổi thuỷ tinh có praseodymi để lọc ánh sáng vàng chói.',
    en: "Glassblowers' goggles contain praseodymium to filter out glaring yellow light.",
  },
  uses: [
    {
      icon: 'Shield',
      text: {
        vi: 'Kính bảo hộ thợ hàn, thổi thuỷ tinh',
        en: 'Welding and glassblowing goggles',
      },
    },
    {
      icon: 'Magnet',
      text: {
        vi: 'Nam châm mạnh',
        en: 'Strong magnets',
      },
    },
    {
      icon: 'Gem',
      text: {
        vi: 'Màu xanh lá cho thuỷ tinh, gốm',
        en: 'Green colour in glass and ceramics',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên praseodymi nghĩa là gì?',
        en: 'What does the name praseodymium mean?',
      },
      a: {
        vi: 'Nghĩa là "cặp song sinh xanh lá". Người ta từng tưởng "didymi" là một nguyên tố, cho tới năm 1885 mới tách được thành hai: praseodymi và neodymi.',
        en: 'It means "green twin". "Didymium" was thought to be one element until 1885, when it was split into two: praseodymium and neodymium.',
      },
      source: 'https://en.wikipedia.org/wiki/Praseodymium',
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

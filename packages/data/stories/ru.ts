import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Tên đặt theo nước Nga, Ruthenia trong tiếng La-tinh.',
    en: 'Named after Russia, Ruthenia in Latin.',
  },
  uses: [
    {
      icon: 'Cpu',
      text: {
        vi: 'Lớp ghi dữ liệu trong ổ cứng',
        en: 'Data layers in hard drives',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Tiếp điểm điện chống mòn',
        en: 'Wear-resistant electrical contacts',
      },
    },
  ],
  facts: [],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Kim loại vô hại; riêng rutheni tetroxit thì rất độc.',
      en: 'The metal is harmless; ruthenium tetroxide, though, is very toxic.',
    },
  },
});

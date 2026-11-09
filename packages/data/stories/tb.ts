import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một trong bốn nguyên tố mang tên ngôi làng Ytterby ở Thuỵ Điển.',
    en: 'One of four elements named after the Swedish village of Ytterby.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Màu xanh lá trên màn hình, đèn',
        en: 'Green in screens and lamps',
      },
    },
    {
      icon: 'Magnet',
      text: {
        vi: 'Vật liệu co giãn theo từ trường',
        en: 'Materials that change shape in a magnetic field',
      },
    },
  ],
  facts: [],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại ở dạng thành phẩm.',
      en: 'Harmless in finished products.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Tín hiệu Internet chạy trong cáp quang dưới đáy biển được khuếch đại nhờ erbi.',
    en: 'Internet signals in undersea fibre-optic cables are boosted by erbium.',
  },
  uses: [
    {
      icon: 'Cable',
      text: {
        vi: 'Bộ khuếch đại cáp quang',
        en: 'Fibre-optic amplifiers',
      },
    },
    {
      icon: 'Gem',
      text: {
        vi: 'Màu hồng cho thuỷ tinh',
        en: 'Pink colour in glass',
      },
    },
    {
      icon: 'Hospital',
      text: {
        vi: 'Laser thẩm mỹ da',
        en: 'Cosmetic skin lasers',
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

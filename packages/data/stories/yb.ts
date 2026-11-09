import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đồng hồ nguyên tử dùng ytterbi thuộc loại chính xác nhất từng được chế tạo.',
    en: 'Ytterbium atomic clocks are among the most precise clocks ever built.',
  },
  uses: [
    {
      icon: 'Zap',
      text: {
        vi: 'Đồng hồ nguyên tử thế hệ mới',
        en: 'Next-generation atomic clocks',
      },
    },
    {
      icon: 'Wrench',
      text: {
        vi: 'Laser cắt kim loại',
        en: 'Metal-cutting lasers',
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

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đá lửa trong bật lửa là hợp kim chứa xeri, toé tia lửa khi bị bánh xe cào.',
    en: 'The flint in a lighter is a cerium alloy that sparks when the wheel scrapes it.',
  },
  uses: [
    {
      icon: 'Flame',
      text: {
        vi: 'Đá lửa bật lửa',
        en: 'Lighter flints',
      },
    },
    {
      icon: 'Car',
      text: {
        vi: 'Bộ lọc khí thải ô tô',
        en: 'Car catalytic converters',
      },
    },
    {
      icon: 'Gem',
      text: {
        vi: 'Bột đánh bóng kính, mắt kính',
        en: 'Polishing powder for glass and lenses',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên xeri từ đâu mà có?',
        en: 'Where does the name cerium come from?',
      },
      a: {
        vi: 'Từ Ceres, hành tinh lùn được phát hiện năm 1801, chỉ hai năm trước khi xeri được tìm ra.',
        en: 'From Ceres, the dwarf planet discovered in 1801, just two years before cerium.',
      },
      source: 'https://en.wikipedia.org/wiki/Cerium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại khi dùng.',
      en: 'Harmless in use.',
    },
  },
});

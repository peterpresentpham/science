import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố bền vững cuối cùng được tìm thấy trong tự nhiên, năm 1925.',
    en: 'The last stable element to be discovered in nature, in 1925.',
  },
  uses: [
    {
      icon: 'Plane',
      text: {
        vi: 'Cánh tuabin động cơ phản lực',
        en: 'Jet engine turbine blades',
      },
    },
    {
      icon: 'Factory',
      text: {
        vi: 'Chất xúc tác lọc dầu',
        en: 'Oil refining catalysts',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên reni từ đâu mà có?',
        en: 'Where does the name rhenium come from?',
      },
      a: {
        vi: 'Từ Rhenus, tên La-tinh của sông Rhine ở châu Âu.',
        en: 'From Rhenus, the Latin name of the river Rhine.',
      },
      source: 'https://en.wikipedia.org/wiki/Rhenium',
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

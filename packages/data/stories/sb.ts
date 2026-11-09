import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Người Ai Cập cổ đại dùng bột khoáng chứa antimon để kẻ mắt.',
    en: 'Ancient Egyptians used an antimony mineral as eyeliner.',
  },
  uses: [
    {
      icon: 'Flame',
      text: {
        vi: 'Chất chống cháy trong nhựa, vải',
        en: 'Flame retardants in plastics and fabrics',
      },
    },
    {
      icon: 'Battery',
      text: {
        vi: 'Ắc quy chì',
        en: 'Lead-acid batteries',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Ký hiệu Sb từ đâu ra?',
        en: 'Where does the symbol Sb come from?',
      },
      a: {
        vi: 'Từ "stibium", tên La-tinh của khoáng vật stibnit, chính là loại bột kẻ mắt thời cổ.',
        en: 'From "stibium", the Latin name for the mineral stibnite, the ancient eyeliner itself.',
      },
      source: 'https://en.wikipedia.org/wiki/Antimony',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Nhiều hợp chất antimon độc khi nuốt hoặc hít.',
      en: 'Many antimony compounds are toxic if swallowed or inhaled.',
    },
  },
});

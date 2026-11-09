import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Cùng với thuỷ ngân, là một trong hai nguyên tố duy nhất ở thể lỏng ở nhiệt độ phòng.',
    en: 'Along with mercury, one of only two elements that are liquid at room temperature.',
  },
  uses: [
    {
      icon: 'Flame',
      text: {
        vi: 'Chất chống cháy trong đồ điện tử, nội thất',
        en: 'Flame retardants in electronics and furniture',
      },
    },
    {
      icon: 'Waves',
      text: {
        vi: 'Khử trùng bể bơi, bồn sục',
        en: 'Disinfecting pools and hot tubs',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Màu tía của vua chúa La Mã có brom?',
        en: 'Did Roman imperial purple contain bromine?',
      },
      a: {
        vi: 'Có. Thuốc nhuộm tía Tyre làm từ một loài ốc biển, và phân tử tạo màu có chứa brom. Cần hàng nghìn con ốc mới đủ nhuộm một chút vải, nên chỉ giới quyền quý mới mặc nổi.',
        en: 'Yes. Tyrian purple came from sea snails, and its dye molecule contains bromine. It took thousands of snails to dye a little cloth, so only the powerful could wear it.',
      },
      source: 'https://en.wikipedia.org/wiki/Tyrian_purple',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Brom lỏng gây bỏng nặng và hơi của nó rất độc.',
      en: 'Liquid bromine causes severe burns and its fumes are very toxic.',
    },
  },
});

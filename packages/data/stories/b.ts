import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nhờ bo mà nồi, cốc thuỷ tinh chịu nhiệt không nứt khi bạn đổ nước sôi vào.',
    en: 'Boron is why heat-proof glassware does not crack when you pour in boiling water.',
  },
  uses: [
    {
      icon: 'CookingPot',
      text: {
        vi: 'Đồ thuỷ tinh chịu nhiệt',
        en: 'Heat-proof glassware',
      },
    },
    {
      icon: 'Magnet',
      text: {
        vi: 'Nam châm mạnh trong tai nghe, loa',
        en: 'Strong magnets in earphones and speakers',
      },
    },
    {
      icon: 'Sprout',
      text: {
        vi: 'Vi chất cho cây trồng',
        en: 'A micronutrient for crops',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao thuỷ tinh có bo không nứt khi gặp nóng?',
        en: "Why doesn't boron glass crack in the heat?",
      },
      a: {
        vi: 'Thuỷ tinh nở ra khi nóng; nếu một phần nóng nhanh hơn phần còn lại, nó nứt. Thêm bo làm thuỷ tinh giãn nở ít hơn khoảng 3 lần, nên chịu được thay đổi nhiệt đột ngột tốt hơn nhiều.',
        en: 'Glass expands when heated; if one part heats faster than the rest, it cracks. Adding boron makes glass expand about 3 times less, so it copes far better with sudden temperature changes.',
      },
      source: 'https://en.wikipedia.org/wiki/Borosilicate_glass',
    },
    {
      q: {
        vi: 'Nam châm mạnh nhất trong đồ điện tử có gì?',
        en: 'What is in the strongest magnets in gadgets?',
      },
      a: {
        vi: 'Nam châm neodymium, loại nam châm vĩnh cửu mạnh nhất phổ biến hiện nay, là hợp kim của neodymium, sắt và bo. Chúng có trong tai nghe, loa và động cơ xe điện.',
        en: 'Neodymium magnets, the strongest common permanent magnets, are an alloy of neodymium, iron and boron. They are in earphones, speakers and electric car motors.',
      },
      source: 'https://en.wikipedia.org/wiki/Neodymium_magnet',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Đồ dùng chứa bo vô hại. Hàn the là một hợp chất của bo, không được dùng trong thực phẩm.',
      en: 'Everyday items containing boron are harmless. Borax, a boron compound, must not be used in food.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Hầu hết thiên thạch kim loại rơi xuống Trái Đất là hợp kim sắt–niken.',
    en: 'Most metal meteorites that fall to Earth are an iron–nickel alloy.',
  },
  uses: [
    {
      icon: 'CookingPot',
      text: {
        vi: 'Xoong nồi, bồn rửa inox',
        en: 'Stainless steel pots and sinks',
      },
    },
    {
      icon: 'Coins',
      text: {
        vi: 'Tiền xu',
        en: 'Coins',
      },
    },
    {
      icon: 'Battery',
      text: {
        vi: 'Pin xe điện, pin sạc',
        en: 'Electric car and rechargeable batteries',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Đồng "nickel" của Mỹ có bao nhiêu niken?',
        en: 'How much nickel is in a US nickel?',
      },
      a: {
        vi: 'Chỉ 25%, phần còn lại là đồng.',
        en: 'Only 25%; the rest is copper.',
      },
      source: 'https://en.wikipedia.org/wiki/Nickel_(United_States_coin)',
    },
    {
      q: {
        vi: 'Vì sao đeo trang sức rẻ tiền bị ngứa?',
        en: 'Why does cheap jewellery make some people itch?',
      },
      a: {
        vi: 'Nhiều người dị ứng với niken, thường có trong trang sức giá rẻ, khoá thắt lưng hay khuy quần. Đây là một trong những dị ứng tiếp xúc phổ biến nhất.',
        en: 'Many people are allergic to nickel, found in cheap jewellery, belt buckles and jeans buttons. It is one of the most common contact allergies.',
      },
      source: 'https://en.wikipedia.org/wiki/Nickel_allergy',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Có thể gây dị ứng da khi tiếp xúc lâu. Đồ inox chứa niken vẫn an toàn để nấu ăn.',
      en: 'Can cause skin allergies with long contact. Stainless steel containing nickel is still safe for cooking.',
    },
  },
  lenses: ['kitchen'],
});

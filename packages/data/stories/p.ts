import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Được tìm ra năm 1669 khi một nhà giả kim đun nước tiểu để tìm cách tạo ra vàng.',
    en: 'Discovered in 1669 when an alchemist boiled down urine hoping to make gold.',
  },
  uses: [
    {
      icon: 'Sprout',
      text: {
        vi: 'Phân lân',
        en: 'Phosphate fertiliser',
      },
    },
    {
      icon: 'Flame',
      text: {
        vi: 'Mặt quẹt của bao diêm',
        en: 'The striking strip on matchboxes',
      },
    },
    {
      icon: 'Smile',
      text: {
        vi: 'Xương và răng (canxi photphat)',
        en: 'Bones and teeth (calcium phosphate)',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao photpho phát sáng trong bóng tối?',
        en: 'Why does phosphorus glow in the dark?',
      },
      a: {
        vi: 'Photpho trắng phản ứng chậm với oxi trong không khí, và năng lượng sinh ra thoát ra thành ánh sáng xanh lục mờ. Tên photpho nghĩa là "mang ánh sáng" trong tiếng Hy Lạp.',
        en: 'White phosphorus reacts slowly with oxygen in the air, and the energy escapes as a faint green glow. Its name means "light-bearer" in Greek.',
      },
      source: 'https://en.wikipedia.org/wiki/Phosphorus',
    },
    {
      q: {
        vi: 'Que diêm có photpho ở đâu?',
        en: 'Where is the phosphorus in a match?',
      },
      a: {
        vi: 'Với diêm an toàn, photpho đỏ nằm ở mặt quẹt trên bao diêm, không ở đầu que. Khi quẹt, ma sát làm một chút photpho đỏ bắt lửa và châm cháy đầu que.',
        en: "In safety matches, red phosphorus is on the box's striking strip, not the match head. Striking it makes a little red phosphorus ignite and light the head.",
      },
      source: 'https://en.wikipedia.org/wiki/Match',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Photpho trắng rất độc và tự bốc cháy trong không khí. Photpho trong thức ăn, phân bón ở dạng hợp chất an toàn hơn nhiều.',
      en: 'White phosphorus is very toxic and catches fire by itself in air. The phosphorus in food and fertiliser is in far safer compounds.',
    },
  },
});

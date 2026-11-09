import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố nhẹ nhất và nhiều nhất vũ trụ: cứ 10 nguyên tử thì khoảng 9 là hidro.',
    en: 'The lightest and most common element in the universe: about 9 in every 10 atoms are hydrogen.',
  },
  uses: [
    {
      icon: 'Droplet',
      text: {
        vi: 'Hai trong ba nguyên tử của mỗi phân tử nước',
        en: 'Two of the three atoms in every water molecule',
      },
    },
    {
      icon: 'Sun',
      text: { vi: 'Nhiên liệu giúp Mặt Trời toả sáng', en: 'The fuel that makes the Sun shine' },
    },
    {
      icon: 'Sprout',
      text: { vi: 'Sản xuất phân đạm cho cây trồng', en: 'Making fertiliser for crops' },
    },
    { icon: 'Rocket', text: { vi: 'Nhiên liệu tên lửa', en: 'Rocket fuel' } },
  ],
  facts: [
    {
      q: { vi: 'Mặt Trời "đốt" gì để sáng?', en: 'What does the Sun "burn" to shine?' },
      a: {
        vi: 'Không phải lửa. Trong lõi Mặt Trời, hạt nhân hidro bị ép vào nhau thành heli, khoảng 600 triệu tấn hidro mỗi giây. Năng lượng sinh ra chính là ánh sáng và hơi ấm bạn nhận được.',
        en: "Not fire. In the Sun's core, hydrogen nuclei are squeezed together into helium, about 600 million tonnes of hydrogen every second. The energy released is the light and warmth you feel.",
      },
      source: 'https://en.wikipedia.org/wiki/Sun',
    },
    {
      q: { vi: 'Vì sao khí cầu Hindenburg bốc cháy?', en: 'Why did the Hindenburg airship burn?' },
      a: {
        vi: 'Năm 1937, khí cầu Hindenburg dùng hidro để nổi vì hidro nhẹ hơn không khí rất nhiều. Nhưng hidro cũng rất dễ cháy: khi bắt lửa, con tàu cháy rụi trong chưa đầy một phút. Khí cầu ngày nay dùng heli, loại khí không cháy.',
        en: "In 1937 the Hindenburg used hydrogen to float, because it is far lighter than air. But hydrogen is also very flammable: once it caught fire, the ship burned up in under a minute. Today's airships use helium, which does not burn.",
      },
      source: 'https://en.wikipedia.org/wiki/Hindenburg_disaster',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Khí không độc nhưng rất dễ cháy, có thể nổ khi trộn với không khí.',
      en: 'Not poisonous, but very flammable and can explode when mixed with air.',
    },
  },
});

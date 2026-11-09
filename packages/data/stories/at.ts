import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố tự nhiên hiếm nhất: cả vỏ Trái Đất lúc nào cũng chỉ có chưa tới 1 gam.',
    en: "The rarest natural element: Earth's whole crust holds less than a gram at any moment.",
  },
  uses: [
    {
      icon: 'Hospital',
      text: {
        vi: 'Nghiên cứu điều trị ung thư',
        en: 'Cancer treatment research',
      },
    },
  ],
  facts: [],
});

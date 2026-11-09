import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố đầu tiên nặng hơn urani, đặt tên theo sao Hải Vương, hành tinh nằm sau sao Thiên Vương.',
    en: 'The first element heavier than uranium, named after Neptune, the planet beyond Uranus.',
  },
  uses: [
    {
      icon: 'Rocket',
      text: {
        vi: 'Nguyên liệu để sản xuất pin hạt nhân cho tàu vũ trụ',
        en: 'Raw material for spacecraft nuclear batteries',
      },
    },
  ],
  facts: [],
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo thành phố Berkeley (Mỹ), nơi ra đời của nhiều nguyên tố nặng.',
    en: 'Named after Berkeley, California, birthplace of many heavy elements.',
  },
  uses: [
    {
      icon: 'FlaskConical',
      text: {
        vi: 'Nguyên liệu tạo ra nguyên tố tennessine',
        en: 'Raw material for making tennessine',
      },
    },
  ],
  facts: [],
});

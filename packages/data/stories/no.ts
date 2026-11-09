import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo Alfred Nobel, người lập ra giải Nobel.',
    en: 'Named after Alfred Nobel, founder of the Nobel Prizes.',
  },
  uses: [
    {
      icon: 'FlaskConical',
      text: {
        vi: 'Chỉ dùng trong nghiên cứu khoa học',
        en: 'Used only in scientific research',
      },
    },
  ],
  facts: [],
});

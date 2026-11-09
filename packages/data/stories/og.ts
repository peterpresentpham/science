import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố nặng nhất từng được tạo ra; đặt tên theo Yuri Oganessian khi ông vẫn còn sống.',
    en: 'The heaviest element ever made; named after Yuri Oganessian while he was still alive.',
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

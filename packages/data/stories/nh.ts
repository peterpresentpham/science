import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố đầu tiên được tìm ra ở châu Á; tên lấy từ "Nihon", nghĩa là Nhật Bản.',
    en: 'The first element discovered in Asia; its name comes from "Nihon", meaning Japan.',
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

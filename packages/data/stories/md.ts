import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo Mendeleev, cha đẻ bảng tuần hoàn; lần đầu chỉ tạo được 17 nguyên tử.',
    en: 'Named after Mendeleev, father of the periodic table; the first experiment made just 17 atoms.',
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

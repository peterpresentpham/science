import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo Lise Meitner, nhà vật lý góp phần giải thích hiện tượng phân hạch hạt nhân.',
    en: 'Named after Lise Meitner, the physicist who helped explain nuclear fission.',
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

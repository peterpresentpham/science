import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo Phòng thí nghiệm Quốc gia Lawrence Livermore (Mỹ).',
    en: 'Named after Lawrence Livermore National Laboratory in the USA.',
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

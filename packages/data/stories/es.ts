import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Được phát hiện trong bụi phóng xạ của vụ thử bom khinh khí đầu tiên năm 1952; đặt tên theo Einstein.',
    en: 'Found in the fallout of the first hydrogen bomb test in 1952; named after Einstein.',
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

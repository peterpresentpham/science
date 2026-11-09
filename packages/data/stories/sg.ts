import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo Glenn Seaborg khi ông vẫn còn sống, điều trước đó chưa từng có.',
    en: 'Named after Glenn Seaborg while he was still alive, a first at the time.',
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

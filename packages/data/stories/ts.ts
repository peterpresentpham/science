import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo bang Tennessee (Mỹ), nơi sản xuất nguyên liệu berkeli để tạo ra nó.',
    en: 'Named after Tennessee, USA, where the berkelium used to make it was produced.',
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

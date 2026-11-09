import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo Ernest Lawrence, người phát minh máy gia tốc hạt cyclotron.',
    en: 'Named after Ernest Lawrence, inventor of the cyclotron particle accelerator.',
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

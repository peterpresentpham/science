import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo bang Hessen của Đức, nơi có phòng thí nghiệm đã tạo ra nó.',
    en: 'Named after the German state of Hesse, home of the lab that made it.',
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

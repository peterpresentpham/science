import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo Phòng thí nghiệm Flerov ở Dubna (Nga), nơi nó được tạo ra.',
    en: 'Named after the Flerov Laboratory in Dubna, Russia, where it was made.',
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

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo Dubna, thị trấn ở Nga có viện nghiên cứu đã tạo ra nhiều nguyên tố siêu nặng.',
    en: 'Named after Dubna, the Russian town whose institute has created many superheavy elements.',
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

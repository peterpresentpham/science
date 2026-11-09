import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo thành phố Darmstadt (Đức), nơi nó được tạo ra năm 1994.',
    en: 'Named after Darmstadt, Germany, where it was made in 1994.',
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

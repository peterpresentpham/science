import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Cũng được tìm thấy trong bụi của vụ thử bom khinh khí năm 1952; đặt tên theo Enrico Fermi.',
    en: 'Also found in the 1952 hydrogen bomb fallout; named after Enrico Fermi.',
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

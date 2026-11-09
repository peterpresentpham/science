import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nam châm samari–coban giữ được từ tính ở nhiệt độ cao, nơi nam châm thường đã yếu đi.',
    en: 'Samarium–cobalt magnets stay strong at high temperatures where ordinary magnets weaken.',
  },
  uses: [
    {
      icon: 'Magnet',
      text: {
        vi: 'Nam châm chịu nhiệt',
        en: 'Heat-resistant magnets',
      },
    },
    {
      icon: 'Hospital',
      text: {
        vi: 'Thuốc giảm đau ung thư xương',
        en: 'Pain relief for bone cancer',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Samari được đặt tên theo ai?',
        en: 'Who is samarium named after?',
      },
      a: {
        vi: 'Theo khoáng vật samarskit, vốn mang tên kỹ sư mỏ người Nga Samarsky-Bykhovets. Vì vậy samari là nguyên tố đầu tiên được đặt tên, dù gián tiếp, theo một người.',
        en: 'After the mineral samarskite, named for the Russian mining engineer Samarsky-Bykhovets. That makes samarium the first element named, indirectly, after a person.',
      },
      source: 'https://en.wikipedia.org/wiki/Samarium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại ở dạng thành phẩm.',
      en: 'Harmless in finished products.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Mỗi bộ pin của chiếc Toyota Prius đời đầu chứa khoảng 10–15 kg lantan.',
    en: 'Each early Toyota Prius battery contained about 10–15 kg of lanthanum.',
  },
  uses: [
    {
      icon: 'Battery',
      text: {
        vi: 'Pin NiMH xe hybrid',
        en: 'NiMH batteries in hybrid cars',
      },
    },
    {
      icon: 'Scan',
      text: {
        vi: 'Thấu kính máy ảnh chất lượng cao',
        en: 'High-quality camera lenses',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên lantan nghĩa là gì?',
        en: 'What does the name lanthanum mean?',
      },
      a: {
        vi: 'Từ chữ Hy Lạp "lanthanein" nghĩa là "ẩn giấu", vì nó lẩn trong một khoáng vật ceri suốt nhiều năm mới được tách ra.',
        en: 'From the Greek "lanthanein", "to lie hidden", because it hid in a cerium mineral for years before being separated.',
      },
      source: 'https://en.wikipedia.org/wiki/Lanthanum',
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

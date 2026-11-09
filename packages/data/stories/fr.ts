import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố cuối cùng được tìm thấy trong tự nhiên (1939), và cả vỏ Trái Đất chỉ có vài chục gam.',
    en: "The last element discovered in nature (1939); Earth's whole crust holds only a few tens of grams.",
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
  facts: [
    {
      q: {
        vi: 'Ai tìm ra franxi?',
        en: 'Who discovered francium?',
      },
      a: {
        vi: 'Marguerite Perey, trợ lý của Marie Curie, năm 1939. Bà đặt tên nó theo nước Pháp, quê hương mình.',
        en: "Marguerite Perey, Marie Curie's assistant, in 1939. She named it after her home country, France.",
      },
      source: 'https://en.wikipedia.org/wiki/Francium',
    },
  ],
});

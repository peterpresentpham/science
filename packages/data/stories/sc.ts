import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một chút scandi trộn vào nhôm làm ra khung xe đạp và gậy bóng chày vừa nhẹ vừa cứng.',
    en: 'A dash of scandium in aluminium makes bicycle frames and baseball bats both light and strong.',
  },
  uses: [
    {
      icon: 'Wrench',
      text: {
        vi: 'Khung xe đạp thể thao',
        en: 'Sports bicycle frames',
      },
    },
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Đèn cao áp chiếu sân vận động',
        en: 'Stadium floodlights',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Ai đoán trước sự tồn tại của scandi?',
        en: 'Who predicted scandium before it was found?',
      },
      a: {
        vi: 'Năm 1869, Mendeleev để một ô trống trong bảng tuần hoàn và dự đoán tính chất của nguyên tố còn thiếu. Năm 1879, scandi được tìm ra và khớp với dự đoán của ông.',
        en: "In 1869 Mendeleev left a gap in his periodic table and predicted the missing element's properties. Scandium, found in 1879, matched his prediction.",
      },
      source: 'https://en.wikipedia.org/wiki/Scandium',
    },
    {
      q: {
        vi: 'Tên scandi từ đâu mà có?',
        en: 'Where does the name scandium come from?',
      },
      a: {
        vi: 'Từ Scandinavia, vùng Bắc Âu nơi người ta tìm ra nó trong các khoáng vật hiếm.',
        en: 'From Scandinavia, the region of northern Europe where it was found in rare minerals.',
      },
      source: 'https://en.wikipedia.org/wiki/Scandium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Hầu như không gặp ngoài đời; hợp kim chứa scandi vô hại.',
      en: 'Rarely met in daily life; scandium alloys are harmless.',
    },
  },
});

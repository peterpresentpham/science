import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Henry Ford chọn thép vanadi cho chiếc Model T vì nó vừa bền vừa nhẹ.',
    en: 'Henry Ford chose vanadium steel for the Model T because it was strong yet light.',
  },
  uses: [
    {
      icon: 'Wrench',
      text: {
        vi: 'Cờ lê, tua vít thép Cr-V',
        en: 'Chrome-vanadium spanners and screwdrivers',
      },
    },
    {
      icon: 'Car',
      text: {
        vi: 'Thép bền cho ô tô',
        en: 'Tough steel for cars',
      },
    },
    {
      icon: 'Battery',
      text: {
        vi: 'Pin lưu trữ điện cỡ lớn',
        en: 'Large grid-storage batteries',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Dụng cụ ghi "Cr-V" nghĩa là gì?',
        en: 'What does "Cr-V" on tools mean?',
      },
      a: {
        vi: 'Đó là thép crom–vanadi. Một chút vanadi làm cấu trúc thép mịn hơn, giúp cờ lê và tua vít cứng, dai và khó gãy.',
        en: 'It is chromium–vanadium steel. A little vanadium gives the steel a finer structure, making spanners and screwdrivers hard, tough and hard to snap.',
      },
      source: 'https://en.wikipedia.org/wiki/Vanadium',
    },
    {
      q: {
        vi: 'Tên vanadi từ đâu mà có?',
        en: 'Where does the name vanadium come from?',
      },
      a: {
        vi: 'Từ Vanadís, một tên khác của nữ thần sắc đẹp Freyja trong thần thoại Bắc Âu, vì các hợp chất của vanadi có rất nhiều màu đẹp.',
        en: 'From Vanadís, another name of Freyja, the Norse goddess of beauty, because vanadium compounds come in many beautiful colours.',
      },
      source: 'https://en.wikipedia.org/wiki/Vanadium',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Đồ thép chứa vanadi vô hại. Một số hợp chất của vanadi độc khi hít hoặc nuốt.',
      en: 'Steel containing vanadium is harmless. Some vanadium compounds are toxic if inhaled or swallowed.',
    },
  },
});

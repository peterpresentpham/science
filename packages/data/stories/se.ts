import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Tên đặt theo Mặt Trăng (Selene), vì nó giống telua, nguyên tố mang tên Trái Đất.',
    en: 'Named after the Moon (Selene), because it resembles tellurium, the element named after Earth.',
  },
  uses: [
    {
      icon: 'Pill',
      text: {
        vi: 'Vi chất cần cho cơ thể',
        en: 'A trace nutrient your body needs',
      },
    },
    {
      icon: 'Sun',
      text: {
        vi: 'Pin mặt trời màng mỏng',
        en: 'Thin-film solar cells',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Ăn hạt quả hạch Brazil có gì đặc biệt?',
        en: 'What is special about Brazil nuts?',
      },
      a: {
        vi: 'Chúng rất giàu selen: chỉ một hai hạt đã đủ nhu cầu cả ngày. Ăn quá nhiều mỗi ngày trong thời gian dài có thể gây ngộ độc selen.',
        en: "They are so rich in selenium that one or two cover a day's needs. Eating lots every day for a long time can cause selenium poisoning.",
      },
      source: 'https://en.wikipedia.org/wiki/Brazil_nut',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Cơ thể cần một lượng rất nhỏ; dư thừa thì độc, gây rụng tóc và giòn móng.',
      en: 'Your body needs a tiny amount; too much is toxic, causing hair loss and brittle nails.',
    },
  },
});

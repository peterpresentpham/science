import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Bộ lọc khí thải dưới gầm ô tô chứa vài gam bạch kim và kim loại cùng họ để biến khí độc thành khí ít độc hơn.',
    en: "A car's catalytic converter holds a few grams of platinum-group metals that turn toxic exhaust into safer gases.",
  },
  uses: [
    {
      icon: 'Car',
      text: {
        vi: 'Bộ lọc khí thải ô tô',
        en: 'Car catalytic converters',
      },
    },
    {
      icon: 'Gem',
      text: {
        vi: 'Trang sức',
        en: 'Jewellery',
      },
    },
    {
      icon: 'Hospital',
      text: {
        vi: 'Thuốc trị ung thư (cisplatin)',
        en: 'Cancer medicine (cisplatin)',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Bạch kim giúp chữa ung thư thế nào?',
        en: 'How does platinum help treat cancer?',
      },
      a: {
        vi: 'Thuốc cisplatin chứa một nguyên tử bạch kim. Nó bám vào ADN của tế bào ung thư khiến chúng không phân chia được. Cisplatin đã giúp chữa khỏi phần lớn ca ung thư tinh hoàn.',
        en: "The drug cisplatin contains a platinum atom. It binds to cancer cells' DNA so they cannot divide. Cisplatin has made most cases of testicular cancer curable.",
      },
      source: 'https://en.wikipedia.org/wiki/Cisplatin',
    },
    {
      q: {
        vi: 'Quả cân kilôgam chuẩn từng làm bằng gì?',
        en: 'What was the standard kilogram made of?',
      },
      a: {
        vi: 'Từ 1889 đến 2019, kilôgam được định nghĩa bằng một quả cân hình trụ làm từ hợp kim bạch kim–iridi, cất ở gần Paris. Nay kilôgam được định nghĩa qua một hằng số vật lý.',
        en: 'From 1889 to 2019 the kilogram was defined by a cylinder of platinum–iridium alloy kept near Paris. Now it is defined by a physical constant.',
      },
      source: 'https://en.wikipedia.org/wiki/International_Prototype_of_the_Kilogram',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại khi dùng làm trang sức.',
      en: 'Harmless as jewellery.',
    },
  },
});

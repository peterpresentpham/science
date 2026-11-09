import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Kim loại duy nhất ở thể lỏng ở nhiệt độ phòng.',
    en: 'The only metal that is liquid at room temperature.',
  },
  uses: [
    { icon: 'Thermometer', text: { vi: 'Nhiệt kế đời cũ', en: 'Old-style thermometers' } },
    { icon: 'Lightbulb', text: { vi: 'Bóng đèn huỳnh quang', en: 'Fluorescent lamps' } },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao nhiệt kế thuỷ ngân dần bị cấm?',
        en: 'Why are mercury thermometers being phased out?',
      },
      a: {
        vi: 'Hơi thuỷ ngân độc với não và thận. Công ước Minamata, có hiệu lực từ năm 2017, yêu cầu các nước loại bỏ dần nhiệt kế, máy đo huyết áp và nhiều sản phẩm khác chứa thuỷ ngân.',
        en: 'Mercury vapour harms the brain and kidneys. The Minamata Convention, in force since 2017, requires countries to phase out mercury thermometers, blood-pressure gauges and many other products.',
      },
      source: 'https://en.wikipedia.org/wiki/Minamata_Convention_on_Mercury',
    },
    {
      q: {
        vi: 'Vì sao thuỷ ngân co lại thành giọt tròn?',
        en: 'Why does mercury form round beads?',
      },
      a: {
        vi: 'Các nguyên tử thuỷ ngân hút nhau rất mạnh, mạnh hơn lực hút với mặt bàn hay thuỷ tinh. Vì thế nó co lại thành giọt tròn thay vì loang ra như nước.',
        en: 'Mercury atoms pull on each other very strongly, more than they cling to a table or glass. So mercury pulls itself into round beads instead of spreading like water.',
      },
      source: 'https://en.wikipedia.org/wiki/Mercury_(element)',
    },
    {
      q: { vi: 'Ký hiệu Hg nghĩa là gì?', en: 'Where does the symbol Hg come from?' },
      a: {
        vi: 'Từ "hydrargyrum", tên La-tinh gốc Hy Lạp, nghĩa là "bạc lỏng".',
        en: 'From "hydrargyrum", a Latinised Greek name meaning "liquid silver".',
      },
      source: 'https://en.wikipedia.org/wiki/Mercury_(element)',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Hơi thuỷ ngân rất độc. Nếu nhiệt kế vỡ: mở cửa cho thoáng, không dùng máy hút bụi, gom giọt bằng tấm bìa cứng.',
      en: 'Mercury vapour is very toxic. If a thermometer breaks, air the room, never vacuum, and gather the beads with stiff card.',
    },
  },
});

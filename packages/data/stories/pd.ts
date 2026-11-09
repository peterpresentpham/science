import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Có thể "nuốt" lượng khí hidro gấp tới khoảng 900 lần thể tích của chính nó.',
    en: 'It can soak up around 900 times its own volume of hydrogen gas.',
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
      icon: 'Cpu',
      text: {
        vi: 'Tụ điện trong đồ điện tử',
        en: 'Capacitors in electronics',
      },
    },
    {
      icon: 'Smile',
      text: {
        vi: 'Hợp kim nha khoa',
        en: 'Dental alloys',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên paladi từ đâu mà có?',
        en: 'Where does the name palladium come from?',
      },
      a: {
        vi: 'Từ tiểu hành tinh Pallas, được phát hiện năm 1802, chỉ một năm trước khi paladi được tìm ra.',
        en: 'From the asteroid Pallas, discovered in 1802, just a year before palladium was found.',
      },
      source: 'https://en.wikipedia.org/wiki/Palladium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại khi dùng làm trang sức, nha khoa.',
      en: 'Harmless in jewellery and dentistry.',
    },
  },
});

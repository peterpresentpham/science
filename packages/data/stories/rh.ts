import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Lớp mạ trắng sáng trên nhiều chiếc nhẫn vàng trắng là rhodi, một trong những kim loại hiếm nhất.',
    en: 'The bright white plating on many white-gold rings is rhodium, one of the rarest metals.',
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
        vi: 'Mạ trang sức vàng trắng',
        en: 'Plating white-gold jewellery',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên rhodi nghĩa là gì?',
        en: 'What does the name rhodium mean?',
      },
      a: {
        vi: 'Từ chữ Hy Lạp "rhodon" nghĩa là hoa hồng, vì muối của nó có màu hồng.',
        en: 'From the Greek "rhodon", meaning rose, because its salts are rose-coloured.',
      },
      source: 'https://en.wikipedia.org/wiki/Rhodium',
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

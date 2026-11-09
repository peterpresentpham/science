import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Kim loại đặc nhất: một lít osmi nặng khoảng 22,6 kg.',
    en: 'The densest metal: a litre of osmium weighs about 22.6 kg.',
  },
  uses: [
    {
      icon: 'Pencil',
      text: {
        vi: 'Đầu ngòi bút máy (hợp kim)',
        en: 'Fountain pen nib tips (alloys)',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Tiếp điểm điện chống mòn',
        en: 'Wear-resistant electrical contacts',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên osmi nghĩa là gì?',
        en: 'What does the name osmium mean?',
      },
      a: {
        vi: 'Từ chữ Hy Lạp "osme" nghĩa là mùi, vì osmi tetroxit, hình thành khi bột osmi gặp không khí, có mùi hắc rất đặc trưng.',
        en: 'From the Greek "osme", meaning smell, because osmium tetroxide, which forms when the powder meets air, has a sharp odour.',
      },
      source: 'https://en.wikipedia.org/wiki/Osmium',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Kim loại khối vô hại, nhưng osmi tetroxit rất độc.',
      en: 'The solid metal is harmless, but osmium tetroxide is very toxic.',
    },
  },
});

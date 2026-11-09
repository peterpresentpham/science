import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Vi khuẩn ở rễ cây họ đậu cần molypden để biến nitơ trong không khí thành "phân bón" tự nhiên.',
    en: 'The bacteria on bean roots need molybdenum to turn nitrogen from the air into natural "fertiliser".',
  },
  uses: [
    {
      icon: 'Wrench',
      text: {
        vi: 'Thép cứng cho dụng cụ, động cơ',
        en: 'Hard steel for tools and engines',
      },
    },
    {
      icon: 'Car',
      text: {
        vi: 'Dầu mỡ bôi trơn chịu tải',
        en: 'Heavy-duty lubricants',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên molypden nghĩa là gì?',
        en: 'What does the name molybdenum mean?',
      },
      a: {
        vi: 'Từ chữ Hy Lạp "molybdos" nghĩa là chì, vì quặng của nó từng bị nhầm với quặng chì và than chì.',
        en: 'From the Greek "molybdos", meaning lead, because its ore was confused with lead ore and graphite.',
      },
      source: 'https://en.wikipedia.org/wiki/Molybdenum',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Cơ thể cần một lượng rất nhỏ; vô hại khi dùng.',
      en: 'Your body needs a tiny amount; harmless in use.',
    },
  },
});

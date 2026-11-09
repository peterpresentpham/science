import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một lớp kẽm mỏng phủ ngoài giúp mái tôn và hàng rào sắt không gỉ suốt hàng chục năm.',
    en: 'A thin coat of zinc keeps steel roofs and fences from rusting for decades.',
  },
  uses: [
    {
      icon: 'Building2',
      text: {
        vi: 'Tôn mạ kẽm, ống thép',
        en: 'Galvanised roofing and pipes',
      },
    },
    {
      icon: 'Battery',
      text: {
        vi: 'Pin AA',
        en: 'AA batteries',
      },
    },
    {
      icon: 'Sun',
      text: {
        vi: 'Kem chống nắng (kẽm oxit)',
        en: 'Sunscreen (zinc oxide)',
      },
    },
    {
      icon: 'Pill',
      text: {
        vi: 'Viên bổ sung kẽm',
        en: 'Zinc supplements',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao kẽm bảo vệ được sắt ngay cả khi bị xước?',
        en: 'How does zinc protect steel even when scratched?',
      },
      a: {
        vi: 'Kẽm dễ bị ăn mòn hơn sắt. Khi lớp mạ bị xước, kẽm xung quanh bị ăn mòn trước thay cho sắt, nên sắt bên dưới vẫn an toàn.',
        en: 'Zinc corrodes more easily than iron. When the coating is scratched, the surrounding zinc corrodes first in place of the iron, so the steel underneath stays safe.',
      },
      source: 'https://en.wikipedia.org/wiki/Galvanization',
    },
    {
      q: {
        vi: 'Cơ thể cần kẽm để làm gì?',
        en: 'What does your body need zinc for?',
      },
      a: {
        vi: 'Kẽm có mặt trong hàng trăm loại enzym, giúp vết thương lành và giúp vị giác, khứu giác hoạt động. Thiếu kẽm có thể làm ăn mất ngon.',
        en: 'Zinc is part of hundreds of enzymes, helps wounds heal and keeps taste and smell working. A lack of zinc can dull your appetite.',
      },
      source: 'https://en.wikipedia.org/wiki/Zinc',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Cơ thể cần kẽm. Hít khói khi hàn tôn mạ kẽm có thể gây "sốt khói kim loại".',
      en: 'Your body needs zinc. Breathing fumes from welding galvanised steel can cause "metal fume fever".',
    },
  },
});

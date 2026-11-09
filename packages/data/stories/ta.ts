import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Cơ thể không phản ứng với tantan, nên nó được làm ốc vít và ghim trong phẫu thuật.',
    en: 'The body does not react to tantalum, so it is used for surgical screws and staples.',
  },
  uses: [
    {
      icon: 'Cpu',
      text: {
        vi: 'Tụ điện tí hon trong điện thoại, laptop',
        en: 'Tiny capacitors in phones and laptops',
      },
    },
    {
      icon: 'Hospital',
      text: {
        vi: 'Dụng cụ cấy ghép y tế',
        en: 'Medical implants',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên tantan từ đâu mà có?',
        en: 'Where does the name tantalum come from?',
      },
      a: {
        vi: 'Từ Tantalus, nhân vật thần thoại Hy Lạp bị phạt đứng trong nước mà không uống được. Tantan ngâm trong axit cũng gần như không "uống" chút axit nào.',
        en: 'From Tantalus, the Greek figure punished to stand in water he could never drink. Tantalum dipped in acid barely "drinks" any either.',
      },
      source: 'https://en.wikipedia.org/wiki/Tantalum',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại; được cấy vào cơ thể người.',
      en: 'Harmless; it is implanted in people.',
    },
  },
});

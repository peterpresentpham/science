import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một kim loại mềm như sáp, cắt được bằng dao, và phản ứng dữ dội khi gặp nước.',
    en: 'A metal as soft as wax that you can cut with a knife, and that reacts violently with water.',
  },
  uses: [
    { icon: 'Soup', text: { vi: 'Muối ăn (natri clorua)', en: 'Table salt (sodium chloride)' } },
    {
      icon: 'CakeSlice',
      text: { vi: 'Bột nở làm bánh (natri bicacbonat)', en: 'Baking soda (sodium bicarbonate)' },
    },
    { icon: 'Lightbulb', text: { vi: 'Đèn đường ánh vàng cam', en: 'Orange street lights' } },
  ],
  facts: [
    {
      q: {
        vi: 'Muối ăn làm từ một kim loại dễ cháy và một khí độc?',
        en: 'Is table salt made of a reactive metal and a poisonous gas?',
      },
      a: {
        vi: 'Đúng vậy. Natri phản ứng mạnh với nước, clo là khí độc, nhưng khi kết hợp với nhau thành natri clorua thì lại là muối ăn hằng ngày.',
        en: 'Yes. Sodium reacts violently with water and chlorine is a poisonous gas, yet together they form sodium chloride, everyday table salt.',
      },
      source: 'https://en.wikipedia.org/wiki/Sodium_chloride',
    },
    {
      q: { vi: 'Vì sao đèn đường cũ có màu vàng cam?', en: 'Why were old street lights orange?' },
      a: {
        vi: 'Đó là đèn hơi natri. Natri bị kích thích phát ra ánh sáng gần như chỉ một màu vàng cam (bước sóng khoảng 589 nm). Loại đèn này rất tiết kiệm điện nên từng phổ biến khắp các con phố.',
        en: 'They were sodium-vapour lamps. Excited sodium gives off almost a single orange-yellow colour (around 589 nm). The lamps were very efficient, so they once lit streets everywhere.',
      },
      source: 'https://en.wikipedia.org/wiki/Sodium-vapor_lamp',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Natri kim loại ăn mòn da và phản ứng mạnh với nước, nên phải cất dưới dầu. Muối ăn thì an toàn với lượng vừa phải.',
      en: 'Sodium metal burns skin and reacts violently with water, so it is stored under oil. Table salt is safe in moderation.',
    },
  },
  lenses: ['kitchen'],
});

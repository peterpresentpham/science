import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Khoảng 1 kg trong cơ thể bạn là canxi, gần như tất cả nằm trong xương và răng.',
    en: 'About 1 kg of your body is calcium, almost all of it in your bones and teeth.',
  },
  uses: [
    {
      icon: 'Smile',
      text: {
        vi: 'Xương và răng',
        en: 'Bones and teeth',
      },
    },
    {
      icon: 'Building2',
      text: {
        vi: 'Xi măng, vôi vữa',
        en: 'Cement and lime mortar',
      },
    },
    {
      icon: 'Soup',
      text: {
        vi: 'Sữa, đậu phụ, tôm cua',
        en: 'Milk, tofu and shellfish',
      },
    },
    {
      icon: 'Pencil',
      text: {
        vi: 'Phấn viết bảng',
        en: 'Blackboard chalk',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vỏ trứng, vỏ ốc và đá vôi có gì chung?',
        en: 'What do eggshells, seashells and limestone share?',
      },
      a: {
        vi: 'Đều chủ yếu là canxi cacbonat. Rất nhiều đá vôi trên Trái Đất hình thành từ vỏ và xương của sinh vật biển tích tụ qua hàng triệu năm.',
        en: "They are all mostly calcium carbonate. Much of Earth's limestone formed from the shells and skeletons of sea creatures piling up over millions of years.",
      },
      source: 'https://en.wikipedia.org/wiki/Calcium_carbonate',
    },
    {
      q: {
        vi: 'Canxi là kim loại à?',
        en: 'Is calcium a metal?',
      },
      a: {
        vi: 'Đúng. Canxi nguyên chất là kim loại màu bạc, khá mềm và phản ứng với nước. Ngoài đời ta chỉ gặp nó trong hợp chất như đá vôi, thạch cao hay trong xương.',
        en: 'Yes. Pure calcium is a fairly soft silvery metal that reacts with water. In daily life we only meet it in compounds such as limestone, plaster or bone.',
      },
      source: 'https://en.wikipedia.org/wiki/Calcium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Canxi trong thức ăn và đá vôi vô hại. Vôi sống nóng lên mạnh khi gặp nước, có thể gây bỏng.',
      en: 'Calcium in food and limestone is harmless. Quicklime heats up strongly with water and can burn.',
    },
  },
});

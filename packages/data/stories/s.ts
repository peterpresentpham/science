import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Mùi trứng thối, mùi tỏi, cả cái cay mắt khi cắt hành: đều có công của lưu huỳnh.',
    en: 'Rotten eggs, garlic, and the sting when you cut onions: all thanks to sulfur.',
  },
  uses: [
    {
      icon: 'Car',
      text: {
        vi: 'Lưu hoá cao su làm lốp xe',
        en: 'Vulcanising rubber for tyres',
      },
    },
    {
      icon: 'Flame',
      text: {
        vi: 'Thuốc súng, pháo',
        en: 'Gunpowder and fireworks',
      },
    },
    {
      icon: 'Factory',
      text: {
        vi: 'Axit sunfuric cho công nghiệp',
        en: 'Sulfuric acid for industry',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao cắt hành lại cay mắt?',
        en: 'Why do onions make you cry?',
      },
      a: {
        vi: 'Khi dao làm vỡ tế bào hành, một chất chứa lưu huỳnh bay lên. Gặp nước ở mắt, nó gây kích ứng, nên mắt tiết nước mắt để rửa trôi.',
        en: 'When a knife breaks onion cells, a sulfur-containing gas is released. It irritates the water in your eyes, so they make tears to wash it away.',
      },
      source: 'https://en.wikipedia.org/wiki/Syn-Propanethial-S-oxide',
    },
    {
      q: {
        vi: 'Núi lửa có mùi gì?',
        en: 'What do volcanoes smell like?',
      },
      a: {
        vi: 'Mùi lưu huỳnh. Quanh miệng núi lửa thường có những lớp tinh thể lưu huỳnh màu vàng, và khí núi lửa chứa lưu huỳnh đioxit và hidro sunfua.',
        en: 'Sulfur. Volcanic vents are often crusted with yellow sulfur crystals, and volcanic gas contains sulfur dioxide and hydrogen sulfide.',
      },
      source: 'https://en.wikipedia.org/wiki/Sulfur',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Lưu huỳnh rắn vô hại. Các khí của nó như hidro sunfua (mùi trứng thối) thì độc khi đậm đặc.',
      en: 'Solid sulfur is harmless. Its gases, such as hydrogen sulfide (the rotten-egg smell), are toxic when concentrated.',
    },
  },
});

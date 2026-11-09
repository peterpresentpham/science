import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nóng chảy ở 3422 °C, cao nhất trong mọi kim loại, nên từng là dây tóc của mọi bóng đèn sợi đốt.',
    en: 'It melts at 3422 °C, higher than any other metal, so it was the filament in every incandescent bulb.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Dây tóc bóng đèn sợi đốt',
        en: 'Incandescent bulb filaments',
      },
    },
    {
      icon: 'Wrench',
      text: {
        vi: 'Mũi khoan, dao cắt siêu cứng',
        en: 'Extra-hard drill bits and cutting tools',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Quả nặng trong bộ rung điện thoại',
        en: 'Weights in phone vibration motors',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Ký hiệu W từ đâu ra?',
        en: 'Where does the symbol W come from?',
      },
      a: {
        vi: 'Từ "wolfram", tên tiếng Đức, và tên "vonfram" trong tiếng Việt cũng từ chữ này. Thợ mỏ xưa gọi quặng của nó là "bọt sói" vì nó làm hao thiếc khi nấu chảy chung, như sói ăn cừu.',
        en: 'From "wolfram", its German name. Old miners called its ore "wolf\'s froth" because it devoured tin when smelted together, like a wolf eating sheep.',
      },
      source: 'https://en.wikipedia.org/wiki/Tungsten',
    },
    {
      q: {
        vi: 'Vonfram nặng cỡ nào?',
        en: 'How heavy is tungsten?',
      },
      a: {
        vi: 'Nặng ngang vàng: nặng gấp khoảng 19 lần cùng thể tích nước. Vì vậy nó được dùng làm đối trọng và làm phi tiêu cao cấp.',
        en: 'As heavy as gold: about 19 times heavier than the same volume of water. That is why it is used for counterweights and high-end darts.',
      },
      source: 'https://en.wikipedia.org/wiki/Tungsten',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại khi cầm, dùng.',
      en: 'Harmless to handle and use.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Ngôi làng nhỏ Ytterby ở Thuỵ Điển đã cho tên tới bốn nguyên tố, và ytri là một trong số đó.',
    en: 'The tiny Swedish village of Ytterby gave its name to four elements, and yttrium is one of them.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Bột phát sáng trong đèn LED trắng',
        en: 'Phosphors in white LEDs',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Laser y tế, vật liệu siêu dẫn',
        en: 'Medical lasers and superconductors',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Ytri liên quan gì đến chất siêu dẫn?',
        en: 'What does yttrium have to do with superconductors?',
      },
      a: {
        vi: 'Năm 1987, người ta tạo ra một chất chứa ytri, bari, đồng và oxi trở thành siêu dẫn khi được làm lạnh bằng nitơ lỏng, ấm hơn nhiều so với các chất siêu dẫn trước đó.',
        en: 'In 1987, a material of yttrium, barium, copper and oxygen was found to superconduct when cooled with liquid nitrogen, far warmer than earlier superconductors.',
      },
      source: 'https://en.wikipedia.org/wiki/Yttrium_barium_copper_oxide',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Hầu như không gặp ngoài đời; vô hại ở dạng thành phẩm.',
      en: 'Rarely met in daily life; harmless in finished products.',
    },
  },
});

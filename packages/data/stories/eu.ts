import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Tờ tiền euro có mực chứa europi phát sáng dưới đèn UV để chống làm giả.',
    en: 'Euro banknotes use europium inks that glow under UV light to stop forgeries.',
  },
  uses: [
    {
      icon: 'Coins',
      text: {
        vi: 'Mực chống tiền giả',
        en: 'Anti-forgery inks',
      },
    },
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Màu đỏ trên màn hình, đèn huỳnh quang',
        en: 'Red in screens and fluorescent lamps',
      },
    },
  ],
  facts: [],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại ở dạng thành phẩm.',
      en: 'Harmless in finished products.',
    },
  },
});

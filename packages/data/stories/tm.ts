import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một trong những đất hiếm hiếm nhất, tên đặt theo Thule, vùng đất huyền thoại ở cực bắc.',
    en: 'One of the rarest rare earths, named after Thule, a legendary land in the far north.',
  },
  uses: [
    {
      icon: 'Scan',
      text: {
        vi: 'Máy chụp X-quang cầm tay',
        en: 'Portable X-ray machines',
      },
    },
    {
      icon: 'Coins',
      text: {
        vi: 'Mực chống tiền giả',
        en: 'Anti-forgery inks',
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

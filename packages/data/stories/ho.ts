import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Tên đặt theo Holmia, tên La-tinh của thành phố Stockholm.',
    en: 'Named after Holmia, the Latin name for Stockholm.',
  },
  uses: [
    {
      icon: 'Hospital',
      text: {
        vi: 'Laser phẫu thuật, tán sỏi thận',
        en: 'Surgical lasers and kidney stone treatment',
      },
    },
    {
      icon: 'Magnet',
      text: {
        vi: 'Lõi tạo từ trường cực mạnh',
        en: 'Pole pieces for the strongest magnets',
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

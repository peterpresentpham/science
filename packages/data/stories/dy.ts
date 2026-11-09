import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Tên nghĩa là "khó lấy được": nhà hoá học tìm ra nó đã thử hơn 30 lần mới tách được.',
    en: 'Its name means "hard to get": its discoverer needed more than 30 attempts to isolate it.',
  },
  uses: [
    {
      icon: 'Magnet',
      text: {
        vi: 'Giúp nam châm xe điện chịu nóng',
        en: 'Heat-proofing magnets in electric cars',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Đèn chiếu sáng cường độ cao',
        en: 'High-intensity lighting',
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

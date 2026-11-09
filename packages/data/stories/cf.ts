import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một microgam californi phát ra khoảng 2 triệu neutron mỗi giây.',
    en: 'A single microgram of californium gives off about 2 million neutrons per second.',
  },
  uses: [
    {
      icon: 'Zap',
      text: {
        vi: 'Khởi động lò phản ứng hạt nhân',
        en: 'Starting up nuclear reactors',
      },
    },
    {
      icon: 'Scan',
      text: {
        vi: 'Dò tìm dầu, vàng, chất nổ bằng neutron',
        en: 'Neutron scanning for oil, gold and explosives',
      },
    },
  ],
  facts: [],
});

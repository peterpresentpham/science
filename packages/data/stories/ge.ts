import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Bóng bán dẫn đầu tiên trên thế giới, năm 1947, được làm từ gecmani chứ không phải silic.',
    en: "The world's first transistor, in 1947, was made of germanium, not silicon.",
  },
  uses: [
    {
      icon: 'Cable',
      text: {
        vi: 'Sợi cáp quang',
        en: 'Optical fibres',
      },
    },
    {
      icon: 'Scan',
      text: {
        vi: 'Thấu kính camera ảnh nhiệt',
        en: 'Lenses for thermal cameras',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên gecmani từ đâu mà có?',
        en: 'Where does the name germanium come from?',
      },
      a: {
        vi: 'Mendeleev dự đoán nó là "eka-silic". Năm 1886, nhà hoá học Đức Clemens Winkler tìm ra nó và đặt tên theo nước Đức.',
        en: 'Mendeleev predicted it as "eka-silicon". In 1886 the German chemist Clemens Winkler found it and named it after Germany.',
      },
      source: 'https://en.wikipedia.org/wiki/Germanium',
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

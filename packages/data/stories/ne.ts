import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Biển hiệu "đèn neon" chỉ có màu đỏ cam khi bên trong thật sự là neon; các màu khác thường là khí khác.',
    en: 'A "neon" sign only glows red-orange when it really holds neon; other colours usually come from other gases.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Biển hiệu đèn neon',
        en: 'Neon signs',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Đèn báo trong bút thử điện',
        en: 'Indicator lamps in voltage testers',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên neon nghĩa là gì?',
        en: 'What does the name neon mean?',
      },
      a: {
        vi: 'Trong tiếng Hy Lạp, "neos" nghĩa là "mới". Năm 1898, hai nhà hoá học Anh Ramsay và Travers tìm ra nó khi chưng cất không khí hoá lỏng.',
        en: 'In Greek, "neos" means "new". In 1898 the British chemists Ramsay and Travers found it while distilling liquefied air.',
      },
      source: 'https://en.wikipedia.org/wiki/Neon',
    },
    {
      q: {
        vi: 'Vì sao neon không phản ứng với gì?',
        en: "Why doesn't neon react with anything?",
      },
      a: {
        vi: 'Lớp electron ngoài cùng của neon đã đầy đủ, nên nó gần như không nhường, nhận hay dùng chung electron. Đến nay chưa ai tạo được hợp chất bền nào của neon.',
        en: "Neon's outer electron shell is full, so it hardly ever gives, takes or shares electrons. No stable neon compound has ever been made.",
      },
      source: 'https://en.wikipedia.org/wiki/Neon',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Không độc, không cháy.',
      en: 'Not poisonous and does not burn.',
    },
  },
});

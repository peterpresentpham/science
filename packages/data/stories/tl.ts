import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Từng được dùng làm thuốc diệt chuột, và bị gọi là "chất độc của kẻ đầu độc" vì không màu, không vị.',
    en: 'Once used as rat poison and dubbed "the poisoner\'s poison" because it is colourless and tasteless.',
  },
  uses: [
    {
      icon: 'Scan',
      text: {
        vi: 'Chụp xạ hình tim',
        en: 'Heart scans',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên tali từ đâu mà có?',
        en: 'Where does the name thallium come from?',
      },
      a: {
        vi: 'Từ chữ Hy Lạp "thallos" nghĩa là chồi non xanh, theo vạch màu xanh lá sáng trong quang phổ của nó.',
        en: 'From the Greek "thallos", a green shoot, after the bright green line in its spectrum.',
      },
      source: 'https://en.wikipedia.org/wiki/Thallium',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Cực độc, thấm được qua da. Đã bị cấm làm thuốc diệt chuột ở nhiều nước.',
      en: 'Extremely toxic and absorbed through skin. Banned as rat poison in many countries.',
    },
  },
});

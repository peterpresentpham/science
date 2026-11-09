import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Kim loại dẫn điện tốt nhất và phản xạ ánh sáng tốt nhất.',
    en: 'The metal that conducts electricity best and reflects light best.',
  },
  uses: [
    {
      icon: 'Gem',
      text: {
        vi: 'Trang sức',
        en: 'Jewellery',
      },
    },
    {
      icon: 'Cpu',
      text: {
        vi: 'Tiếp điểm, mạch điện',
        en: 'Electrical contacts and circuits',
      },
    },
    {
      icon: 'Sun',
      text: {
        vi: 'Pin mặt trời',
        en: 'Solar cells',
      },
    },
    {
      icon: 'Hospital',
      text: {
        vi: 'Băng gạc kháng khuẩn',
        en: 'Antibacterial wound dressings',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao đồ bạc bị đen?',
        en: 'Why does silver turn black?',
      },
      a: {
        vi: 'Bạc phản ứng với các khí chứa lưu huỳnh trong không khí, đến từ trứng, hành tỏi hay khói xe, tạo ra lớp bạc sunfua màu đen. Đây không phải gỉ do oxi.',
        en: 'Silver reacts with sulfur gases in the air, from eggs, onions or exhaust fumes, forming black silver sulfide. It is not rust from oxygen.',
      },
      source: 'https://en.wikipedia.org/wiki/Tarnish',
    },
    {
      q: {
        vi: 'Gương được tráng bằng gì?',
        en: 'What are mirrors coated with?',
      },
      a: {
        vi: 'Từ thế kỷ 19, người ta phủ một lớp bạc mỏng lên mặt sau tấm kính bằng phản ứng hoá học. Nhiều loại gương ngày nay vẫn làm theo cách này.',
        en: 'Since the 19th century, mirrors have been made by depositing a thin layer of silver on the back of glass with a chemical reaction. Many mirrors are still made this way.',
      },
      source: 'https://en.wikipedia.org/wiki/Silvering',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại khi dùng làm trang sức, dao dĩa.',
      en: 'Harmless as jewellery and cutlery.',
    },
  },
});

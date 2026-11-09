import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Chất độc khét tiếng trong lịch sử, từng bị gọi là "bột thừa kế".',
    en: 'History\'s most notorious poison, once nicknamed "inheritance powder".',
  },
  uses: [
    {
      icon: 'Cpu',
      text: {
        vi: 'Chip gali arsenua trong điện thoại',
        en: 'Gallium arsenide chips in phones',
      },
    },
    {
      icon: 'Pill',
      text: {
        vi: 'Thuốc trị một dạng bệnh bạch cầu',
        en: 'Medicine for a form of leukaemia',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao asen bị gọi là "bột thừa kế"?',
        en: 'Why was arsenic called "inheritance powder"?',
      },
      a: {
        vi: 'Nó gần như không màu, không mùi, không vị, và triệu chứng ngộ độc giống bệnh tả, nên thời xưa bị dùng để đầu độc người giàu lấy gia tài. Năm 1836, phép thử Marsh ra đời giúp phát hiện asen.',
        en: 'It is nearly colourless, odourless and tasteless, and poisoning looks like cholera, so it was used to kill the wealthy for their fortunes. In 1836 the Marsh test made it detectable.',
      },
      source: 'https://en.wikipedia.org/wiki/Marsh_test',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Rất độc. Nước giếng khoan ở một số vùng, kể cả đồng bằng sông Hồng, có thể nhiễm asen; nên xét nghiệm trước khi dùng.',
      en: "Highly toxic. Well water in some regions, including Vietnam's Red River delta, can contain arsenic; get it tested.",
    },
  },
});

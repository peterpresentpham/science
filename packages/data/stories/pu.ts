import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Plutoni tự toả nhiệt đã cấp điện cho hai tàu Voyager suốt gần nửa thế kỷ ngoài không gian.',
    en: 'Self-heating plutonium has powered the two Voyager probes in space for nearly half a century.',
  },
  uses: [
    {
      icon: 'Rocket',
      text: {
        vi: 'Pin hạt nhân cho tàu thăm dò vũ trụ',
        en: 'Nuclear batteries for space probes',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Nhiên liệu hạt nhân',
        en: 'Nuclear fuel',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên plutoni từ đâu mà có?',
        en: 'Where does the name plutonium come from?',
      },
      a: {
        vi: 'Từ sao Diêm Vương (Pluto), nối tiếp urani (sao Thiên Vương) và neptuni (sao Hải Vương).',
        en: 'From Pluto, following uranium (Uranus) and neptunium (Neptune).',
      },
      source: 'https://en.wikipedia.org/wiki/Plutonium',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Cực độc nếu hít phải bụi, đồng thời phóng xạ.',
      en: 'Extremely toxic if dust is inhaled, as well as radioactive.',
    },
  },
});

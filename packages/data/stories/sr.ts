import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Màu đỏ thắm của pháo hoa và pháo sáng là nhờ stronti.',
    en: 'The deep red of fireworks and flares comes from strontium.',
  },
  uses: [
    {
      icon: 'PartyPopper',
      text: {
        vi: 'Pháo hoa màu đỏ',
        en: 'Red fireworks',
      },
    },
    {
      icon: 'Flame',
      text: {
        vi: 'Pháo sáng cứu hộ',
        en: 'Emergency flares',
      },
    },
    {
      icon: 'Smile',
      text: {
        vi: 'Kem đánh răng cho răng nhạy cảm',
        en: 'Toothpaste for sensitive teeth',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên stronti từ đâu mà có?',
        en: 'Where does the name strontium come from?',
      },
      a: {
        vi: 'Từ Strontian, một ngôi làng ở Scotland, nơi người ta tìm thấy khoáng vật chứa nó vào cuối thế kỷ 18.',
        en: 'From Strontian, a village in Scotland where a mineral containing it was found in the late 18th century.',
      },
      source: 'https://en.wikipedia.org/wiki/Strontium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Stronti trong pháo hoa, kem đánh răng không độc. Stronti-90 phóng xạ từ bụi hạt nhân thì nguy hiểm vì tích tụ trong xương.',
      en: 'The strontium in fireworks and toothpaste is not toxic. Radioactive strontium-90 from fallout is dangerous because it builds up in bone.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Màn hình cảm ứng của bạn có một lớp indi thiếc oxit: trong suốt mà vẫn dẫn điện.',
    en: 'Your touchscreen has a layer of indium tin oxide: transparent yet electrically conductive.',
  },
  uses: [
    {
      icon: 'Cpu',
      text: {
        vi: 'Màn hình cảm ứng, màn hình phẳng',
        en: 'Touchscreens and flat screens',
      },
    },
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Đèn LED',
        en: 'LEDs',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên indi từ đâu mà có?',
        en: 'Where does the name indium come from?',
      },
      a: {
        vi: 'Từ vạch màu chàm (indigo) nổi bật trong quang phổ của nó, nhờ đó người ta phát hiện ra nó năm 1863.',
        en: 'From the bright indigo line in its spectrum, which revealed it in 1863.',
      },
      source: 'https://en.wikipedia.org/wiki/Indium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại khi cầm; không nên hít bụi hợp chất indi.',
      en: 'Harmless to hold; avoid breathing indium compound dust.',
    },
  },
});

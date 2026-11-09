import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Rất có thể đang ở trên trần nhà bạn: nhiều thiết bị báo khói chứa một lượng americi cực nhỏ.',
    en: 'Quite possibly on your ceiling: many smoke detectors contain a tiny amount of americium.',
  },
  uses: [
    {
      icon: 'Shield',
      text: {
        vi: 'Thiết bị báo khói',
        en: 'Smoke detectors',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao thiết bị báo khói cần americi?',
        en: 'Why do smoke detectors need americium?',
      },
      a: {
        vi: 'Americi làm không khí trong một buồng nhỏ dẫn được dòng điện yếu. Khói lọt vào làm dòng điện giảm, và thiết bị kêu.',
        en: 'Americium makes the air in a small chamber carry a tiny current. Smoke getting in reduces the current, and the alarm sounds.',
      },
      source: 'https://en.wikipedia.org/wiki/Smoke_detector',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Lượng trong thiết bị báo khói rất nhỏ và an toàn khi còn nguyên vỏ; đừng tháo nguồn phóng xạ ra.',
      en: 'The amount in a smoke detector is tiny and safe while sealed; never remove the source.',
    },
  },
});

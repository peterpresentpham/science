import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đèn chiếu phim trong rạp dùng khí xenon vì nó cho ánh sáng gần giống ánh Mặt Trời.',
    en: 'Cinema projectors use xenon lamps because their light is close to sunlight.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Đèn pha ô tô, máy chiếu rạp phim',
        en: 'Car headlights and cinema projectors',
      },
    },
    {
      icon: 'Rocket',
      text: {
        vi: 'Nhiên liệu động cơ ion của tàu vũ trụ',
        en: 'Fuel for spacecraft ion engines',
      },
    },
    {
      icon: 'Hospital',
      text: {
        vi: 'Khí gây mê',
        en: 'An anaesthetic gas',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Khí hiếm có thật sự không phản ứng?',
        en: 'Do noble gases really never react?',
      },
      a: {
        vi: 'Người ta từng tin như vậy, cho tới năm 1962, khi Neil Bartlett tạo ra hợp chất đầu tiên của một khí hiếm, và đó là hợp chất của xenon.',
        en: 'People believed so until 1962, when Neil Bartlett made the first compound of a noble gas, and it was a xenon compound.',
      },
      source: 'https://en.wikipedia.org/wiki/Xenon',
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

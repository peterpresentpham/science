import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Được Marie Curie đặt tên theo Ba Lan, quê hương bà, khi đất nước ấy còn chưa có tên trên bản đồ.',
    en: 'Named by Marie Curie after her homeland Poland, at a time when Poland did not exist on the map.',
  },
  uses: [
    {
      icon: 'Zap',
      text: {
        vi: 'Thiết bị khử tĩnh điện công nghiệp',
        en: 'Industrial anti-static devices',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Poloni từng được dùng làm gì đáng sợ?',
        en: 'What sinister use has polonium had?',
      },
      a: {
        vi: 'Năm 2006, cựu sĩ quan tình báo Nga Alexander Litvinenko chết ở London sau khi bị đầu độc bằng poloni-210 bỏ vào trà.',
        en: 'In 2006 former Russian intelligence officer Alexander Litvinenko died in London after being poisoned with polonium-210 put in his tea.',
      },
      source: 'https://en.wikipedia.org/wiki/Poisoning_of_Alexander_Litvinenko',
    },
  ],
});

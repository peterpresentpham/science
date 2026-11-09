import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo Trái Đất (Tellus); ai tiếp xúc với nó có thể bị hơi thở mùi tỏi suốt nhiều tuần.',
    en: 'Named after Earth (Tellus); exposure to it can give you garlic breath for weeks.',
  },
  uses: [
    {
      icon: 'Sun',
      text: {
        vi: 'Pin mặt trời CdTe',
        en: 'CdTe solar panels',
      },
    },
    {
      icon: 'Cpu',
      text: {
        vi: 'Đĩa DVD, Blu-ray ghi lại được',
        en: 'Rewritable DVDs and Blu-rays',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao telua làm hơi thở có mùi tỏi?',
        en: 'Why does tellurium cause garlic breath?',
      },
      a: {
        vi: 'Cơ thể biến telua thành một hợp chất dễ bay hơi có mùi tỏi nồng, rồi thải ra qua hơi thở và mồ hôi. Chỉ một lượng rất nhỏ cũng đủ gây mùi.',
        en: 'The body turns tellurium into a volatile compound with a strong garlic smell, released in breath and sweat. Even a tiny amount is enough.',
      },
      source: 'https://en.wikipedia.org/wiki/Tellurium',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Nhiều hợp chất telua độc.',
      en: 'Many tellurium compounds are toxic.',
    },
  },
});

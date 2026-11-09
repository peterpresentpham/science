import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố duy nhất trong họ lantan không có dạng bền, gần như không tồn tại trong vỏ Trái Đất.',
    en: "The only lanthanide with no stable form; there is almost none in Earth's crust.",
  },
  uses: [
    {
      icon: 'Battery',
      text: {
        vi: 'Pin hạt nhân cho máy tạo nhịp tim (trước đây)',
        en: 'Nuclear batteries for pacemakers (in the past)',
      },
    },
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Sơn dạ quang (trước đây)',
        en: 'Glow-in-the-dark paint (in the past)',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên prometi từ đâu mà có?',
        en: 'Where does the name promethium come from?',
      },
      a: {
        vi: 'Từ Prometheus, vị thần Hy Lạp lấy trộm lửa trao cho loài người, như một lời nhắc về sức mạnh và hiểm hoạ của năng lượng hạt nhân.',
        en: 'From Prometheus, the Greek titan who stole fire for humanity, as a reminder of the power and danger of nuclear energy.',
      },
      source: 'https://en.wikipedia.org/wiki/Promethium',
    },
  ],
});

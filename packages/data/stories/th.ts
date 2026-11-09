import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đặt tên theo thần sấm Thor; măng-sông đèn khí từng được tẩm thori để sáng rực.',
    en: 'Named after Thor, god of thunder; gas lantern mantles once used thorium to glow brightly.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Măng-sông đèn khí (trước đây)',
        en: 'Gas lantern mantles (in the past)',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Nhiên liệu tiềm năng cho lò hạt nhân',
        en: 'A possible future nuclear fuel',
      },
    },
  ],
  facts: [],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Phóng xạ yếu. Măng-sông thori cũ không nên để trẻ em nghịch.',
      en: 'Weakly radioactive. Keep old thorium mantles away from children.',
    },
  },
});

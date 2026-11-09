import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Trước khi chụp X-quang dạ dày, bệnh nhân uống một cốc "bari" để ruột hiện rõ trên phim.',
    en: 'Before a stomach X-ray, patients drink a barium "meal" so their gut shows up on the film.',
  },
  uses: [
    {
      icon: 'Scan',
      text: {
        vi: 'Thuốc cản quang chụp dạ dày, ruột',
        en: 'Contrast for stomach and gut X-rays',
      },
    },
    {
      icon: 'PartyPopper',
      text: {
        vi: 'Màu xanh lá của pháo hoa',
        en: 'Green fireworks',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Bari độc mà sao uống được?',
        en: 'If barium is toxic, how can patients drink it?',
      },
      a: {
        vi: 'Thứ bệnh nhân uống là bari sunfat, hầu như không tan trong nước nên cơ thể không hấp thụ được và thải ra nguyên vẹn. Các muối bari tan được thì độc.',
        en: 'Patients drink barium sulfate, which hardly dissolves, so the body cannot absorb it and passes it out. Soluble barium salts are toxic.',
      },
      source: 'https://en.wikipedia.org/wiki/Barium_sulfate',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Bari sunfat dùng trong y tế an toàn; các muối bari tan được thì độc.',
      en: 'Medical barium sulfate is safe; soluble barium salts are toxic.',
    },
  },
});

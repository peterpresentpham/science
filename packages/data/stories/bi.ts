import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Kim loại nặng hiếm hoi gần như không độc; tinh thể của nó có màu cầu vồng và hình bậc thang.',
    en: 'A rare heavy metal that is nearly non-toxic; its crystals are rainbow-coloured and stair-stepped.',
  },
  uses: [
    {
      icon: 'Pill',
      text: {
        vi: 'Thuốc đau dạ dày',
        en: 'Stomach remedies',
      },
    },
    {
      icon: 'Flame',
      text: {
        vi: 'Đầu phun chữa cháy tự động',
        en: 'Automatic fire sprinklers',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Bitmut có phóng xạ không?',
        en: 'Is bismuth radioactive?',
      },
      a: {
        vi: 'Về lý thuyết là có, nhưng chu kỳ bán rã của nó dài hơn tuổi vũ trụ hơn một tỉ lần. Trên thực tế, có thể coi bitmut là bền.',
        en: 'Technically yes, but its half-life is over a billion times the age of the universe. For all practical purposes it is stable.',
      },
      source: 'https://en.wikipedia.org/wiki/Bismuth',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Gần như không độc; được dùng trong thuốc dạ dày.',
      en: 'Nearly non-toxic; used in stomach medicines.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Cát ngoài bãi biển và con chip trong điện thoại của bạn đều làm từ silic.',
    en: 'The sand on the beach and the chip in your phone are both made from silicon.',
  },
  uses: [
    {
      icon: 'Cpu',
      text: {
        vi: 'Chip điện tử',
        en: 'Computer chips',
      },
    },
    {
      icon: 'Sun',
      text: {
        vi: 'Tấm pin mặt trời',
        en: 'Solar panels',
      },
    },
    {
      icon: 'Building2',
      text: {
        vi: 'Thuỷ tinh, xi măng',
        en: 'Glass and cement',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Thung lũng Silicon được đặt tên theo gì?',
        en: 'What is Silicon Valley named after?',
      },
      a: {
        vi: 'Theo silic, vật liệu làm nên các con chip mà nhiều công ty ở vùng này của California sản xuất từ những năm 1960–1970.',
        en: 'After silicon, the material of the chips that companies in this part of California began making in the 1960s and 1970s.',
      },
      source: 'https://en.wikipedia.org/wiki/Silicon_Valley',
    },
    {
      q: {
        vi: 'Silic làm chip phải sạch cỡ nào?',
        en: 'How pure must silicon be for chips?',
      },
      a: {
        vi: 'Cực kỳ sạch: từ 99,9999999% trở lên, tức là cứ một tỉ nguyên tử thì nhiều nhất một nguyên tử lạ.',
        en: 'Extremely pure: 99.9999999% or better, meaning at most one foreign atom in every billion.',
      },
      source: 'https://en.wikipedia.org/wiki/Silicon',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Silic và cát vô hại khi cầm. Không nên hít bụi cát mịn trong thời gian dài.',
      en: 'Silicon and sand are harmless to handle. Avoid breathing fine sand dust over long periods.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Kim loại nhẹ nhất, nổi được trên dầu, và đang nằm trong pin điện thoại của bạn.',
    en: 'The lightest metal: it floats on oil, and it is inside your phone battery.',
  },
  uses: [
    {
      icon: 'Battery',
      text: {
        vi: 'Pin điện thoại, laptop, xe điện',
        en: 'Batteries in phones, laptops and electric cars',
      },
    },
    {
      icon: 'CookingPot',
      text: {
        vi: 'Mặt bếp gốm thuỷ tinh chịu nhiệt',
        en: 'Heat-proof glass-ceramic cooktops',
      },
    },
    {
      icon: 'Pill',
      text: {
        vi: 'Thuốc điều trị rối loạn lưỡng cực',
        en: 'Medicine for bipolar disorder',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Liti từ đâu mà có?',
        en: 'Where did lithium come from?',
      },
      a: {
        vi: 'Liti là một trong ba nguyên tố đầu tiên của vũ trụ, hình thành chỉ vài phút sau Vụ Nổ Lớn, cùng với hidro và heli.',
        en: "Lithium is one of the universe's first three elements, formed minutes after the Big Bang along with hydrogen and helium.",
      },
      source: 'https://en.wikipedia.org/wiki/Big_Bang_nucleosynthesis',
    },
    {
      q: {
        vi: 'Vì sao pin lại dùng liti?',
        en: 'Why do batteries use lithium?',
      },
      a: {
        vi: 'Liti rất nhẹ và dễ nhường electron, nên pin liti chứa được nhiều năng lượng trên mỗi gam. Nhờ vậy điện thoại vừa mỏng nhẹ vừa dùng được cả ngày.',
        en: 'Lithium is very light and gives up electrons easily, so lithium batteries store a lot of energy per gram. That is why phones can be thin and still last all day.',
      },
      source: 'https://en.wikipedia.org/wiki/Lithium-ion_battery',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Kim loại liti phản ứng với nước. Pin liti bị phồng, móp hoặc thủng có thể bốc cháy.',
      en: 'Lithium metal reacts with water. Swollen, dented or punctured lithium batteries can catch fire.',
    },
  },
});

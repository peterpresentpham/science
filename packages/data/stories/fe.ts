import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Cơ thể bạn đang mang khoảng 4 gam sắt, đủ làm một chiếc đinh nhỏ, và chính nó giúp máu chở oxi.',
    en: 'Your body holds about 4 grams of iron, enough for a small nail, and it is what lets your blood carry oxygen.',
  },
  uses: [
    {
      icon: 'Building2',
      text: { vi: 'Thép xây nhà, cầu đường', en: 'Steel for buildings and bridges' },
    },
    { icon: 'Car', text: { vi: 'Ô tô, tàu hoả, tàu thuỷ', en: 'Cars, trains and ships' } },
    { icon: 'CookingPot', text: { vi: 'Chảo gang', en: 'Cast-iron pans' } },
    { icon: 'Pill', text: { vi: 'Viên bổ máu', en: 'Iron supplements' } },
  ],
  facts: [
    {
      q: { vi: 'Lõi Trái Đất làm bằng gì?', en: "What is Earth's core made of?" },
      a: {
        vi: 'Chủ yếu là sắt pha niken. Sắt lỏng chuyển động ở lõi ngoài tạo ra từ trường Trái Đất, thứ làm kim la bàn chỉ về hướng bắc.',
        en: "Mostly iron mixed with nickel. Molten iron moving in the outer core generates Earth's magnetic field, which makes a compass needle point north.",
      },
      source: 'https://en.wikipedia.org/wiki/Earth%27s_outer_core',
    },
    {
      q: { vi: 'Vì sao sao Hoả màu đỏ?', en: 'Why is Mars red?' },
      a: {
        vi: 'Vì bụi trên bề mặt sao Hoả chứa nhiều sắt oxit, tức là gỉ sắt.',
        en: 'Because the dust covering Mars is rich in iron oxide, which is rust.',
      },
      source: 'https://en.wikipedia.org/wiki/Mars',
    },
    {
      q: { vi: 'Thép khác sắt ở chỗ nào?', en: 'How is steel different from iron?' },
      a: {
        vi: 'Thép là sắt trộn thêm một ít cacbon, thường dưới khoảng 2%. Chút cacbon ấy làm thép cứng và bền hơn sắt nguyên chất nhiều lần.',
        en: 'Steel is iron with a little carbon added, usually less than about 2%. That small amount makes it much harder and stronger than pure iron.',
      },
      source: 'https://en.wikipedia.org/wiki/Steel',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Cơ thể cần sắt. Chỉ uống quá nhiều viên sắt mới gây ngộ độc, nhất là với trẻ nhỏ.',
      en: 'Your body needs iron. Only taking too many iron tablets is poisonous, especially for small children.',
    },
  },
  lenses: ['kitchen'],
});

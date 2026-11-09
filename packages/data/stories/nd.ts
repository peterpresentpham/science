import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nam châm neodymi nhỏ bằng hạt đậu có thể giữ một vật nặng gấp hàng trăm lần chính nó.',
    en: 'A pea-sized neodymium magnet can hold something hundreds of times its own weight.',
  },
  uses: [
    {
      icon: 'Magnet',
      text: {
        vi: 'Nam châm trong tai nghe, loa, ổ cứng',
        en: 'Magnets in earphones, speakers and hard drives',
      },
    },
    {
      icon: 'Car',
      text: {
        vi: 'Động cơ xe điện, tuabin gió',
        en: 'Electric car motors and wind turbines',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Nam châm neodymi ra đời khi nào?',
        en: 'When were neodymium magnets invented?',
      },
      a: {
        vi: 'Năm 1984, General Motors và Sumitomo cùng công bố loại nam châm neodymi–sắt–bo. Từ đó, đồ điện tử có thể dùng nam châm nhỏ hơn nhiều mà vẫn mạnh.',
        en: 'In 1984 General Motors and Sumitomo announced the neodymium–iron–boron magnet. Since then gadgets can use far smaller magnets with the same strength.',
      },
      source: 'https://en.wikipedia.org/wiki/Neodymium_magnet',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Nam châm mạnh có thể kẹp đau tay; trẻ em nuốt từ hai viên trở lên là rất nguy hiểm.',
      en: 'Strong magnets can pinch painfully; a child swallowing two or more is a medical emergency.',
    },
  },
});

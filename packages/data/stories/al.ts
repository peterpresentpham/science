import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Từng là kim loại quý: Napoleon III được kể là đãi những vị khách quý nhất bằng dao nĩa nhôm.',
    en: 'Once a precious metal: Napoleon III is said to have served his most honoured guests with aluminium cutlery.',
  },
  uses: [
    { icon: 'CupSoda', text: { vi: 'Lon nước ngọt', en: 'Drink cans' } },
    { icon: 'Package', text: { vi: 'Giấy bạc bọc thức ăn', en: 'Kitchen foil' } },
    { icon: 'Plane', text: { vi: 'Thân máy bay', en: 'Aircraft bodies' } },
    {
      icon: 'CookingPot',
      text: { vi: 'Xoong nồi, khung cửa', en: 'Pots, pans and window frames' },
    },
  ],
  facts: [
    {
      q: { vi: 'Vì sao nhôm từng đắt đỏ?', en: 'Why was aluminium once so expensive?' },
      a: {
        vi: 'Nhôm có rất nhiều trong vỏ Trái Đất nhưng luôn bám chặt với các nguyên tố khác. Trước khi có phương pháp điện phân năm 1886, tách nhôm ra rất tốn kém, nên nó từng được coi là kim loại quý.',
        en: "Aluminium is abundant in Earth's crust but always tightly bound to other elements. Before the electrolysis process of 1886, extracting it was so costly that it was treated as a precious metal.",
      },
      source: 'https://en.wikipedia.org/wiki/Hall%E2%80%93H%C3%A9roult_process',
    },
    {
      q: { vi: 'Vì sao nhôm không bị gỉ như sắt?', en: "Why doesn't aluminium rust like iron?" },
      a: {
        vi: 'Nhôm vẫn bị gỉ, nhưng lớp gỉ (nhôm oxit) chỉ dày vài phần triệu milimét và bám rất chặt. Lớp này che kín bề mặt nên phần nhôm bên dưới không bị ăn mòn tiếp.',
        en: 'Aluminium does corrode, but its oxide layer is only a few millionths of a millimetre thick and sticks tightly. It seals the surface so the metal underneath is protected.',
      },
      source: 'https://en.wikipedia.org/wiki/Aluminium',
    },
    {
      q: { vi: 'Tái chế lon nhôm có đáng không?', en: 'Is recycling aluminium cans worth it?' },
      a: {
        vi: 'Rất đáng. Nấu chảy nhôm cũ chỉ tốn khoảng 5% năng lượng so với sản xuất nhôm mới từ quặng.',
        en: 'Very much so. Remelting old aluminium takes only about 5% of the energy needed to make new aluminium from ore.',
      },
      source: 'https://en.wikipedia.org/wiki/Aluminium_recycling',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Dùng làm nồi và lon nước hằng ngày. Riêng bột nhôm thật mịn thì dễ cháy.',
      en: 'Used every day for pans and cans. Only very fine aluminium powder is a fire risk.',
    },
  },
  lenses: ['kitchen'],
});

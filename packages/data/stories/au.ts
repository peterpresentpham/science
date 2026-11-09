import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Toàn bộ vàng con người từng khai thác (tính đến 2023) chỉ đúc được một khối lập phương cạnh khoảng 22 mét.',
    en: 'All the gold ever mined (as of 2023) would make a single cube only about 22 metres on each side.',
  },
  uses: [
    { icon: 'Gem', text: { vi: 'Trang sức', en: 'Jewellery' } },
    { icon: 'Coins', text: { vi: 'Dự trữ của ngân hàng trung ương', en: 'Central bank reserves' } },
    {
      icon: 'Cpu',
      text: {
        vi: 'Chân tiếp xúc trong điện thoại, máy tính',
        en: 'Contacts inside phones and computers',
      },
    },
  ],
  facts: [
    {
      q: { vi: 'Vì sao vàng không bao giờ gỉ?', en: "Why doesn't gold ever rust?" },
      a: {
        vi: 'Vàng gần như không phản ứng với oxi hay nước. Đồ vàng từ hàng nghìn năm trước, như mặt nạ của vua Tutankhamun, đến nay vẫn sáng bóng.',
        en: "Gold barely reacts with oxygen or water. Gold objects thousands of years old, like Tutankhamun's mask, still shine today.",
      },
      source: 'https://en.wikipedia.org/wiki/Gold',
    },
    {
      q: {
        vi: 'Một gam vàng dát mỏng được bao rộng?',
        en: 'How far can one gram of gold be beaten out?',
      },
      a: {
        vi: 'Khoảng 1 mét vuông. Lá vàng mỏng đến mức ánh sáng xuyên qua được và có màu xanh lục lam.',
        en: 'To about one square metre. Gold leaf gets so thin that light passes through it, looking greenish blue.',
      },
      source: 'https://en.wikipedia.org/wiki/Gold',
    },
    {
      q: { vi: 'Vàng trên Trái Đất từ đâu tới?', en: "Where did Earth's gold come from?" },
      a: {
        vi: 'Vàng được tạo ra trong những vụ va chạm dữ dội giữa các sao neutron và một số vụ nổ sao, rồi trôi trong bụi vũ trụ trước khi Trái Đất hình thành.',
        en: 'Gold was forged in violent collisions between neutron stars and in some exploding stars, then drifted in cosmic dust before Earth formed.',
      },
      source: 'https://en.wikipedia.org/wiki/Gold',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại. Vàng lá còn được rắc lên món ăn để trang trí.',
      en: 'Harmless. Gold leaf is even used to decorate food.',
    },
  },
});

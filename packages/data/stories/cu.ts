import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Con người dùng đồng từ khoảng 11.000 năm trước, và hôm nay nó vẫn chạy trong dây điện nhà bạn.',
    en: 'People have used copper for about 11,000 years, and today it still runs through the wires in your home.',
  },
  uses: [
    { icon: 'Cable', text: { vi: 'Dây điện', en: 'Electrical wiring' } },
    {
      icon: 'Cpu',
      text: { vi: 'Mạch điện thoại, máy tính', en: 'Circuits in phones and computers' },
    },
    { icon: 'Coins', text: { vi: 'Tiền xu', en: 'Coins' } },
    { icon: 'Wrench', text: { vi: 'Ống nước', en: 'Water pipes' } },
  ],
  facts: [
    {
      q: { vi: 'Vì sao tượng Nữ thần Tự do màu xanh?', en: 'Why is the Statue of Liberty green?' },
      a: {
        vi: 'Tượng được phủ một lớp đồng mỏng. Ban đầu nó có màu nâu đỏ của đồng mới. Sau nhiều năm ngoài trời, đồng phản ứng với không khí tạo ra lớp gỉ xanh, và lớp gỉ này lại bảo vệ phần đồng bên dưới.',
        en: 'The statue is clad in thin copper sheets. It started out the reddish brown of new copper. Years outdoors turned the surface into a green patina, which now protects the copper underneath.',
      },
      source: 'https://en.wikipedia.org/wiki/Statue_of_Liberty',
    },
    {
      q: {
        vi: 'Vì sao dây điện dùng đồng mà không dùng bạc?',
        en: 'Why are wires made of copper, not silver?',
      },
      a: {
        vi: 'Bạc dẫn điện tốt nhất nhưng đắt hơn nhiều. Đồng dẫn điện chỉ kém bạc một chút, lại rẻ, dễ kéo thành sợi và bền.',
        en: 'Silver conducts best but costs far more. Copper is a close second, and it is cheap, easy to draw into wire and durable.',
      },
      source: 'https://en.wikipedia.org/wiki/Copper_conductor',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Cơ thể cần một lượng rất nhỏ. Cầm, dùng đồ bằng đồng hằng ngày đều vô hại.',
      en: 'Your body needs a tiny amount. Handling and using copper items every day is harmless.',
    },
  },
});

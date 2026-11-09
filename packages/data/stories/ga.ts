import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một chiếc thìa bằng gali sẽ tan chảy ngay khi bạn khuấy cốc trà nóng.',
    en: 'A gallium spoon melts away as soon as you stir a cup of hot tea.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Đèn LED (gali nitrua)',
        en: 'LEDs (gallium nitride)',
      },
    },
    {
      icon: 'Cpu',
      text: {
        vi: 'Chip tần số cao trong điện thoại',
        en: 'High-frequency chips in phones',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Ai đoán trước sự tồn tại của gali?',
        en: 'Who predicted gallium before it was found?',
      },
      a: {
        vi: 'Mendeleev dự đoán nó từ năm 1871 và gọi là "eka-nhôm". Năm 1875, nhà hoá học Pháp Lecoq de Boisbaudran tìm ra nó và đặt tên theo Gallia, tên La-tinh của nước Pháp.',
        en: 'Mendeleev predicted it in 1871 as "eka-aluminium". In 1875 the French chemist Lecoq de Boisbaudran found it and named it after Gallia, Latin for France.',
      },
      source: 'https://en.wikipedia.org/wiki/Gallium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại khi cầm, nhưng làm hỏng nhôm: gali thấm vào nhôm khiến nó giòn và gãy vụn.',
      en: 'Harmless to hold, but it ruins aluminium: gallium soaks into it and makes it brittle.',
    },
  },
});

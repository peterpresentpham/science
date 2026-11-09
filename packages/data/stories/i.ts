import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một chút iot thêm vào muối ăn giúp hàng tỉ người tránh được bệnh bướu cổ.',
    en: 'A pinch of iodine added to table salt protects billions of people from goitre.',
  },
  uses: [
    {
      icon: 'Soup',
      text: {
        vi: 'Muối i-ốt',
        en: 'Iodised salt',
      },
    },
    {
      icon: 'Hospital',
      text: {
        vi: 'Cồn i-ốt sát trùng vết thương',
        en: 'Iodine antiseptic for wounds',
      },
    },
    {
      icon: 'Scan',
      text: {
        vi: 'Thuốc cản quang khi chụp X-quang',
        en: 'Contrast agent for X-ray scans',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao cơ thể cần iot?',
        en: 'Why does your body need iodine?',
      },
      a: {
        vi: 'Tuyến giáp dùng iot để làm hormon điều khiển tốc độ trao đổi chất. Thiếu iot, tuyến giáp to ra thành bướu cổ; ở thai nhi và trẻ nhỏ, thiếu iot có thể làm chậm phát triển trí tuệ.',
        en: 'The thyroid uses iodine to make hormones that set your metabolism. Without enough, the thyroid swells into a goitre; in unborn babies and young children it can hold back mental development.',
      },
      source: 'https://en.wikipedia.org/wiki/Iodine_deficiency',
    },
    {
      q: {
        vi: 'Iot nguyên chất trông thế nào?',
        en: 'What does pure iodine look like?',
      },
      a: {
        vi: 'Là tinh thể màu tím đen, óng ánh như kim loại. Đun nhẹ, nó bốc thành hơi màu tím. Tên iot đến từ chữ Hy Lạp nghĩa là "màu tím".',
        en: 'Shiny, almost metallic violet-black crystals. Warm them gently and they give off a violet vapour. The name comes from the Greek word for "violet".',
      },
      source: 'https://en.wikipedia.org/wiki/Iodine',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Lượng nhỏ trong muối là cần thiết. Iot nguyên chất làm bỏng da và độc nếu nuốt.',
      en: 'The small amount in salt is essential. Pure iodine burns skin and is toxic if swallowed.',
    },
  },
  lenses: ['kitchen'],
});

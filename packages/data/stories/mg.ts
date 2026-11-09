import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Cháy với ánh sáng trắng chói loá, đến mức từng được dùng làm đèn flash chụp ảnh.',
    en: 'It burns with such a dazzling white light that it was once used as camera flash.',
  },
  uses: [
    {
      icon: 'PartyPopper',
      text: {
        vi: 'Pháo hoa, pháo sáng',
        en: 'Fireworks and flares',
      },
    },
    {
      icon: 'Cpu',
      text: {
        vi: 'Vỏ laptop, máy ảnh nhẹ',
        en: 'Light laptop and camera bodies',
      },
    },
    {
      icon: 'Leaf',
      text: {
        vi: 'Trung tâm của chất diệp lục',
        en: 'The centre of chlorophyll',
      },
    },
    {
      icon: 'Pill',
      text: {
        vi: 'Thuốc đau dạ dày (sữa magie)',
        en: 'Antacids (milk of magnesia)',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Lá cây xanh nhờ magie à?',
        en: 'Do leaves need magnesium to be green?',
      },
      a: {
        vi: 'Mỗi phân tử diệp lục, chất giúp lá hấp thụ ánh sáng để quang hợp, có một nguyên tử magie ở chính giữa. Thiếu magie, lá cây vàng đi.',
        en: 'Every chlorophyll molecule, which lets leaves absorb light for photosynthesis, has a magnesium atom at its centre. Without magnesium, leaves turn yellow.',
      },
      source: 'https://en.wikipedia.org/wiki/Chlorophyll',
    },
    {
      q: {
        vi: 'Vì sao không dập lửa magie bằng nước?',
        en: "Why can't you put out a magnesium fire with water?",
      },
      a: {
        vi: 'Magie đang cháy nóng đến mức tách được oxi từ nước, sinh ra khí hidro dễ cháy và làm đám cháy dữ hơn. Phải dập bằng cát khô hoặc bình chữa cháy chuyên dụng.',
        en: 'Burning magnesium is hot enough to pull oxygen out of water, releasing flammable hydrogen and making the fire worse. It must be smothered with dry sand or a special extinguisher.',
      },
      source: 'https://en.wikipedia.org/wiki/Magnesium',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Khối magie an toàn khi cầm, nhưng bột và dải magie mỏng dễ bắt lửa và cháy rất nóng.',
      en: 'Solid magnesium is safe to hold, but powder and thin ribbon catch fire easily and burn very hot.',
    },
  },
});

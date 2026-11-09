import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một lớp đất mỏng giàu iridi trên khắp Trái Đất là dấu vết của thiên thạch đã xoá sổ khủng long.',
    en: 'A thin, iridium-rich layer of rock around the world is the fingerprint of the asteroid that wiped out the dinosaurs.',
  },
  uses: [
    {
      icon: 'Car',
      text: {
        vi: 'Bugi xe cao cấp',
        en: 'Premium spark plugs',
      },
    },
    {
      icon: 'Pencil',
      text: {
        vi: 'Đầu ngòi bút máy',
        en: 'Fountain pen nib tips',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Iridi kể gì về khủng long?',
        en: 'What does iridium tell us about dinosaurs?',
      },
      a: {
        vi: 'Năm 1980, nhóm của Luis và Walter Alvarez thấy lớp đất 66 triệu năm tuổi chứa nhiều iridi bất thường. Iridi hiếm trên mặt đất nhưng nhiều trong thiên thạch, gợi ý một vụ va chạm khổng lồ.',
        en: "In 1980 Luis and Walter Alvarez's team found a 66-million-year-old layer unusually rich in iridium. Iridium is rare on Earth's surface but common in asteroids, pointing to a giant impact.",
      },
      source: 'https://en.wikipedia.org/wiki/Cretaceous%E2%80%93Paleogene_boundary',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại ở dạng thành phẩm.',
      en: 'Harmless in finished products.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đường ray xe lửa dùng thép mangan, loại thép càng bị va đập càng cứng hơn.',
    en: 'Railway tracks use manganese steel, which gets harder the more it is hammered.',
  },
  uses: [
    {
      icon: 'Building2',
      text: {
        vi: 'Thép xây dựng',
        en: 'Construction steel',
      },
    },
    {
      icon: 'Battery',
      text: {
        vi: 'Pin kiềm (pin AA)',
        en: 'Alkaline batteries (AA)',
      },
    },
    {
      icon: 'Shield',
      text: {
        vi: 'Thép chịu va đập',
        en: 'Impact-resistant steel',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Pin AA có mangan à?',
        en: 'Is there manganese in AA batteries?',
      },
      a: {
        vi: 'Có. Pin kiềm thông thường dùng mangan đioxit ở một cực và kẽm ở cực kia.',
        en: 'Yes. Ordinary alkaline batteries use manganese dioxide at one electrode and zinc at the other.',
      },
      source: 'https://en.wikipedia.org/wiki/Alkaline_battery',
    },
    {
      q: {
        vi: 'Đáy biển có "khoai tây" kim loại?',
        en: 'Are there metal "potatoes" on the seabed?',
      },
      a: {
        vi: 'Có những khối tròn cỡ củ khoai tây rải rác dưới đáy biển sâu, gọi là kết hạch đa kim, giàu mangan và sắt. Chúng lớn lên cực chậm, chỉ vài milimét mỗi triệu năm.',
        en: 'Potato-sized lumps called polymetallic nodules lie scattered on the deep seabed, rich in manganese and iron. They grow extremely slowly, a few millimetres per million years.',
      },
      source: 'https://en.wikipedia.org/wiki/Manganese_nodule',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Cơ thể cần một lượng nhỏ. Hít bụi mangan lâu dài trong công nghiệp thì hại thần kinh.',
      en: 'Your body needs a little. Breathing manganese dust for years in industry harms the nerves.',
    },
  },
});

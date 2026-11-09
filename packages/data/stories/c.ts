import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Ruột bút chì và viên kim cương đều chỉ là cacbon, chỉ khác cách các nguyên tử xếp với nhau.',
    en: 'Pencil lead and diamond are both pure carbon; only the way the atoms are arranged differs.',
  },
  uses: [
    { icon: 'Pencil', text: { vi: 'Ruột bút chì (than chì)', en: 'Pencil lead (graphite)' } },
    { icon: 'Gem', text: { vi: 'Kim cương', en: 'Diamonds' } },
    { icon: 'Flame', text: { vi: 'Than, xăng, khí đốt', en: 'Coal, petrol and gas' } },
    {
      icon: 'Leaf',
      text: { vi: 'Khung xương của mọi sinh vật sống', en: 'The backbone of every living thing' },
    },
  ],
  facts: [
    {
      q: { vi: 'Bút chì có chì không?', en: 'Is there lead in a pencil?' },
      a: {
        vi: 'Không. Ruột bút chì là than chì trộn đất sét. Tên gọi có từ thời người ta tưởng than chì là một loại quặng chì.',
        en: 'No. Pencil "lead" is graphite mixed with clay. The name dates from when people thought graphite was a kind of lead ore.',
      },
      source: 'https://en.wikipedia.org/wiki/Pencil',
    },
    {
      q: { vi: 'Vì sao sinh vật nào cũng cần cacbon?', en: 'Why is all life built on carbon?' },
      a: {
        vi: 'Mỗi nguyên tử cacbon nối được với 4 nguyên tử khác, kể cả các nguyên tử cacbon khác, thành mạch dài, vòng hay nhánh. Nhờ vậy nó tạo ra vô số phân tử phức tạp như ADN, protein và đường.',
        en: 'Each carbon atom can bond to 4 others, including other carbon atoms, forming long chains, rings and branches. That lets it build countless complex molecules such as DNA, proteins and sugars.',
      },
      source: 'https://en.wikipedia.org/wiki/Carbon',
    },
    {
      q: {
        vi: 'Làm sao biết một xác ướp bao nhiêu tuổi?',
        en: 'How do we know how old a mummy is?',
      },
      a: {
        vi: 'Sinh vật sống luôn nhận vào cacbon-14, một dạng cacbon phóng xạ có sẵn trong không khí. Sau khi chết, lượng cacbon-14 giảm một nửa sau mỗi khoảng 5.730 năm. Đo phần còn lại là biết nó chết cách đây bao lâu.',
        en: 'Living things keep taking in carbon-14, a radioactive form of carbon found in the air. After death, the carbon-14 halves about every 5,730 years. Measuring what is left tells how long ago it died.',
      },
      source: 'https://en.wikipedia.org/wiki/Radiocarbon_dating',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Than chì và kim cương đều vô hại. Bụi than thì không nên hít.',
      en: 'Graphite and diamond are harmless. Avoid breathing coal dust.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Người La Mã làm ống nước bằng chì; ký hiệu Pb và chữ "plumber" (thợ ống nước) đều từ chữ La-tinh "plumbum".',
    en: 'The Romans made water pipes of lead; the symbol Pb and the word "plumber" both come from Latin "plumbum".',
  },
  uses: [
    {
      icon: 'Battery',
      text: {
        vi: 'Ắc quy ô tô, xe máy',
        en: 'Car and motorbike batteries',
      },
    },
    {
      icon: 'Shield',
      text: {
        vi: 'Áo chì chắn tia X',
        en: 'X-ray shielding aprons',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao xăng pha chì bị cấm?',
        en: 'Why was leaded petrol banned?',
      },
      a: {
        vi: 'Chì từng được thêm vào xăng để động cơ chạy êm. Khói xe khiến chì tích tụ trong cơ thể người, gây hại não, nhất là ở trẻ em. Năm 2021, Algeria là nước cuối cùng ngừng bán xăng pha chì cho ô tô.',
        en: "Lead was added to petrol to make engines run smoothly. Exhaust built up lead in people's bodies, harming the brain, especially in children. In 2021 Algeria became the last country to stop selling it for cars.",
      },
      source: 'https://en.wikipedia.org/wiki/Tetraethyllead',
    },
    {
      q: {
        vi: 'Vì sao áo chắn tia X làm bằng chì?',
        en: 'Why are X-ray aprons made of lead?',
      },
      a: {
        vi: 'Chì rất đặc và nặng nên chặn tia X tốt. Nó được dùng làm áo che cho bệnh nhân và lót tường phòng chụp.',
        en: 'Lead is very dense, so it blocks X-rays well. It is used in patient aprons and to line the walls of X-ray rooms.',
      },
      source: 'https://en.wikipedia.org/wiki/Lead_shielding',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Chì tích tụ trong cơ thể và hại não, nhất là với trẻ em. Không dùng đồ sơn chì hay gốm men chì để đựng thức ăn.',
      en: 'Lead builds up in the body and harms the brain, especially in children. Do not use lead-painted items or lead-glazed pottery for food.',
    },
  },
});

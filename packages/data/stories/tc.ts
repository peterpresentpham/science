import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố đầu tiên do con người tạo ra, năm 1937; tên nó nghĩa là "nhân tạo".',
    en: 'The first element made by people, in 1937; its name means "artificial".',
  },
  uses: [
    {
      icon: 'Scan',
      text: {
        vi: 'Chụp xạ hình xương, tim trong y học hạt nhân',
        en: 'Bone and heart scans in nuclear medicine',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao tecneti dùng được trong y học?',
        en: 'Why is technetium useful in medicine?',
      },
      a: {
        vi: 'Tecneti-99m phát ra tia gamma dễ đo từ bên ngoài cơ thể và mất một nửa phóng xạ chỉ sau khoảng 6 giờ, nên chụp xong là nhanh chóng hết. Mỗi năm nó được dùng trong hàng chục triệu lần chụp chẩn đoán.',
        en: 'Technetium-99m gives off gamma rays that are easy to detect outside the body, and loses half its radioactivity in about 6 hours, so it fades quickly. It is used in tens of millions of scans each year.',
      },
      source: 'https://en.wikipedia.org/wiki/Technetium-99m',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Phóng xạ. Lượng dùng trong y tế rất nhỏ và tự mất dần sau vài ngày.',
      en: 'Radioactive. Medical doses are tiny and fade away within days.',
    },
  },
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Bền như thép mà nhẹ hơn gần một nửa, và xương có thể mọc bám vào nó: vì thế răng implant làm bằng titan.',
    en: 'As strong as steel at nearly half the weight, and bone grows onto it: that is why dental implants are titanium.',
  },
  uses: [
    {
      icon: 'Hospital',
      text: {
        vi: 'Khớp nhân tạo, trụ implant răng',
        en: 'Artificial joints and dental implants',
      },
    },
    {
      icon: 'Plane',
      text: {
        vi: 'Máy bay, tàu vũ trụ',
        en: 'Aircraft and spacecraft',
      },
    },
    {
      icon: 'Sun',
      text: {
        vi: 'Kem chống nắng (titan đioxit)',
        en: 'Sunscreen (titanium dioxide)',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Kem chống nắng chặn tia UV bằng gì?',
        en: 'How does sunscreen block UV light?',
      },
      a: {
        vi: 'Nhiều loại dùng titan đioxit: những hạt rất nhỏ phản xạ và hấp thụ tia cực tím trước khi chúng chạm tới da. Chất này cũng là màu trắng trong sơn, giấy và nhựa.',
        en: 'Many use titanium dioxide: tiny particles that reflect and absorb ultraviolet light before it reaches your skin. It is also the white in paint, paper and plastics.',
      },
      source: 'https://en.wikipedia.org/wiki/Titanium_dioxide',
    },
    {
      q: {
        vi: 'Vì sao implant nha khoa làm bằng titan?',
        en: 'Why are dental implants made of titanium?',
      },
      a: {
        vi: 'Titan không gỉ trong cơ thể, và xương có thể mọc bám chặt vào bề mặt của nó, gọi là tích hợp xương. Nhờ vậy trụ titan cắm vào xương hàm giữ được răng giả hàng chục năm.',
        en: 'Titanium does not corrode in the body, and bone grows firmly onto its surface, a process called osseointegration. So a titanium post in the jaw can hold a false tooth for decades.',
      },
      source: 'https://en.wikipedia.org/wiki/Osseointegration',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại; được cấy vào cơ thể người hằng ngày.',
      en: 'Harmless; it is implanted in people every day.',
    },
  },
});

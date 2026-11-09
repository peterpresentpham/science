import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một quả chuối chứa khoảng 400 mg kali, và một phần rất nhỏ trong số đó là phóng xạ tự nhiên.',
    en: 'A banana holds about 400 mg of potassium, and a tiny part of it is naturally radioactive.',
  },
  uses: [
    {
      icon: 'Sprout',
      text: {
        vi: 'Phân kali cho cây',
        en: 'Potash fertiliser',
      },
    },
    {
      icon: 'Leaf',
      text: {
        vi: 'Chuối, khoai tây, rau xanh',
        en: 'Bananas, potatoes and greens',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Giúp tim và cơ hoạt động',
        en: 'Keeping your heart and muscles working',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Ăn chuối có bị nhiễm phóng xạ không?',
        en: 'Is eating bananas radioactive?',
      },
      a: {
        vi: 'Không đáng lo. Khoảng 0,012% kali tự nhiên là kali-40, một dạng phóng xạ. Lượng phóng xạ từ một quả chuối nhỏ đến mức người ta dùng nó làm đơn vị vui để so sánh: "liều tương đương một quả chuối".',
        en: 'Nothing to worry about. About 0.012% of natural potassium is radioactive potassium-40. A banana\'s dose is so small that people use it as a playful unit: the "banana equivalent dose".',
      },
      source: 'https://en.wikipedia.org/wiki/Banana_equivalent_dose',
    },
    {
      q: {
        vi: 'Kim loại kali gặp nước thì sao?',
        en: 'What happens when potassium metal meets water?',
      },
      a: {
        vi: 'Nó bốc cháy ngay với ngọn lửa màu tím hồng. Kali phản ứng với nước còn dữ dội hơn natri.',
        en: 'It bursts into a lilac flame at once. Potassium reacts with water even more violently than sodium.',
      },
      source: 'https://en.wikipedia.org/wiki/Potassium',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Kim loại kali bốc cháy khi gặp nước. Kali trong thức ăn thì cần thiết cho cơ thể.',
      en: 'Potassium metal ignites in water. Potassium in food is essential for your body.',
    },
  },
});

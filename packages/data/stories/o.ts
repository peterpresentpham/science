import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Chiếm gần 2/3 khối lượng cơ thể bạn, phần lớn nằm trong nước.',
    en: 'Makes up nearly two thirds of your body mass, mostly locked up in water.',
  },
  uses: [
    {
      icon: 'Wind',
      text: { vi: 'Khoảng 21% không khí bạn thở', en: 'About 21% of the air you breathe' },
    },
    { icon: 'Hospital', text: { vi: 'Bình oxi trong bệnh viện', en: 'Oxygen tanks in hospitals' } },
    { icon: 'Flame', text: { vi: 'Giúp lửa cháy', en: 'Keeping fires burning' } },
    { icon: 'Rocket', text: { vi: 'Oxi lỏng cho tên lửa', en: 'Liquid oxygen for rockets' } },
  ],
  facts: [
    {
      q: { vi: 'Oxi lỏng có màu gì?', en: 'What colour is liquid oxygen?' },
      a: {
        vi: 'Xanh da trời nhạt. Nó còn bị nam châm hút: đổ oxi lỏng qua giữa hai cực của nam châm mạnh, dòng chất lỏng sẽ bám lại giữa hai cực.',
        en: 'Pale blue. It is also attracted to magnets: pour liquid oxygen between the poles of a strong magnet and it clings there.',
      },
      source: 'https://en.wikipedia.org/wiki/Liquid_oxygen',
    },
    {
      q: {
        vi: 'Oxi trong không khí từ đâu ra?',
        en: 'Where does the oxygen in the air come from?',
      },
      a: {
        vi: 'Từ cây xanh, tảo và vi khuẩn lam khi quang hợp. Khoảng 2,4 tỉ năm trước, vi khuẩn lam bắt đầu làm oxi tích tụ trong khí quyển, gọi là Sự kiện Oxi hoá Lớn.',
        en: 'From plants, algae and cyanobacteria as they photosynthesise. About 2.4 billion years ago, cyanobacteria began filling the atmosphere with oxygen, an episode called the Great Oxidation Event.',
      },
      source: 'https://en.wikipedia.org/wiki/Great_Oxidation_Event',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Cần để sống, nhưng oxi đậm đặc làm mọi thứ cháy dữ dội hơn. Không để bình oxi gần lửa.',
      en: 'Essential for life, but concentrated oxygen makes everything burn much more fiercely. Keep oxygen tanks away from flames.',
    },
  },
});

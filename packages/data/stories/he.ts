import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Được tìm thấy trên Mặt Trời trước, gần 30 năm sau mới tìm thấy trên Trái Đất.',
    en: 'Found on the Sun first, and only found on Earth almost 30 years later.',
  },
  uses: [
    { icon: 'PartyPopper', text: { vi: 'Bóng bay và khí cầu', en: 'Party balloons and airships' } },
    {
      icon: 'Scan',
      text: {
        vi: 'Làm lạnh nam châm trong máy chụp MRI',
        en: 'Cooling the magnets in MRI scanners',
      },
    },
    {
      icon: 'Waves',
      text: { vi: 'Khí thở cho thợ lặn sâu', en: 'Breathing gas for deep-sea divers' },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao hít heli thì giọng the thé?',
        en: 'Why does helium make your voice squeaky?',
      },
      a: {
        vi: 'Âm thanh đi trong heli nhanh gần gấp 3 lần trong không khí. Dây thanh của bạn vẫn rung như cũ, nhưng khoang họng và miệng cộng hưởng ở tần số cao hơn, nên giọng nghe cao và lạ.',
        en: 'Sound travels almost 3 times faster in helium than in air. Your vocal cords vibrate as usual, but your throat and mouth resonate at higher frequencies, so your voice sounds high and odd.',
      },
      source: 'https://en.wikipedia.org/wiki/Helium',
    },
    {
      q: {
        vi: 'Năm 1868 người ta tìm ra heli bằng cách nào?',
        en: 'How was helium discovered in 1868?',
      },
      a: {
        vi: 'Khi quan sát nhật thực, các nhà thiên văn thấy trong ánh sáng Mặt Trời một vạch màu vàng không khớp với nguyên tố nào đã biết. Tên heli đến từ "helios", tiếng Hy Lạp nghĩa là Mặt Trời. Năm 1895 heli mới được tách ra trên Trái Đất.',
        en: 'Watching a solar eclipse, astronomers saw a yellow line in sunlight that matched no known element. The name comes from "helios", Greek for Sun. Helium was only isolated on Earth in 1895.',
      },
      source: 'https://en.wikipedia.org/wiki/Helium',
    },
    {
      q: { vi: 'Heli có thể cạn kiệt không?', en: 'Can we run out of helium?' },
      a: {
        vi: 'Có. Heli trên Trái Đất chủ yếu sinh ra từ phân rã phóng xạ trong lòng đất qua hàng triệu năm, bị giữ lại trong mỏ khí tự nhiên. Một khi thoát ra không khí, nó nhẹ đến mức dần bay khỏi Trái Đất.',
        en: "Yes. Earth's helium mostly comes from radioactive decay underground over millions of years, trapped in natural gas fields. Once released into the air, it is so light that it slowly escapes into space.",
      },
      source: 'https://en.wikipedia.org/wiki/Helium',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Không độc và không cháy, nhưng hít heli thay cho không khí có thể gây ngạt. Đừng hít trực tiếp từ bình.',
      en: 'Not poisonous and does not burn, but breathing it instead of air can suffocate you. Never inhale from a tank.',
    },
  },
});

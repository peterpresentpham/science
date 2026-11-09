import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Gần 4/5 không khí bạn đang thở là nitơ, nhưng cơ thể bạn không dùng được nó trực tiếp.',
    en: 'Nearly four fifths of the air you breathe is nitrogen, yet your body cannot use it directly.',
  },
  uses: [
    {
      icon: 'Wind',
      text: {
        vi: '78% không khí',
        en: '78% of the air',
      },
    },
    {
      icon: 'Sprout',
      text: {
        vi: 'Phân đạm',
        en: 'Nitrogen fertiliser',
      },
    },
    {
      icon: 'Package',
      text: {
        vi: 'Khí bơm trong túi snack',
        en: 'The gas inside snack bags',
      },
    },
    {
      icon: 'Thermometer',
      text: {
        vi: 'Nitơ lỏng để làm lạnh nhanh',
        en: 'Liquid nitrogen for rapid cooling',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao túi bim bim căng phồng?',
        en: 'Why are snack bags puffed up?',
      },
      a: {
        vi: 'Túi được bơm nitơ thay cho không khí. Nitơ không phản ứng với dầu mỡ trong snack nên snack không bị ôi, và lớp đệm khí giúp chúng không vỡ vụn.',
        en: 'The bags are filled with nitrogen instead of air. Nitrogen does not react with the oils in the snacks, so they do not go stale, and the cushion of gas stops them crumbling.',
      },
      source: 'https://en.wikipedia.org/wiki/Modified_atmosphere',
    },
    {
      q: {
        vi: 'Nitơ lỏng lạnh cỡ nào?',
        en: 'How cold is liquid nitrogen?',
      },
      a: {
        vi: 'Nó sôi ở khoảng −196 °C. Đổ ra ngoài, nó sôi ngay, và làn khói trắng bạn thấy thật ra là hơi nước trong không khí bị làm lạnh ngưng tụ lại.',
        en: 'It boils at about −196 °C. Poured out, it boils at once, and the white fog you see is actually water vapour in the air condensing from the cold.',
      },
      source: 'https://en.wikipedia.org/wiki/Liquid_nitrogen',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Khí nitơ không độc, nhưng nitơ lỏng gây bỏng lạnh, và trong phòng kín nó có thể chiếm chỗ oxi gây ngạt.',
      en: 'Nitrogen gas is not poisonous, but liquid nitrogen causes cold burns, and in a closed room it can push out oxygen and suffocate.',
    },
  },
});

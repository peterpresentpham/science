import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Inox không gỉ là nhờ crom, chiếm ít nhất khoảng 1/10 khối lượng của nó.',
    en: 'Stainless steel stays stainless thanks to chromium, at least about a tenth of its weight.',
  },
  uses: [
    {
      icon: 'CookingPot',
      text: {
        vi: 'Xoong nồi, bồn rửa inox',
        en: 'Stainless steel pots and sinks',
      },
    },
    {
      icon: 'Car',
      text: {
        vi: 'Lớp mạ bóng loáng',
        en: 'Shiny chrome plating',
      },
    },
    {
      icon: 'Gem',
      text: {
        vi: 'Màu đỏ của hồng ngọc',
        en: 'The red of rubies',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao inox không gỉ?',
        en: "Why doesn't stainless steel rust?",
      },
      a: {
        vi: 'Crom trong thép tạo trên bề mặt một lớp oxit mỏng đến mức vô hình nhưng kín. Khi bị xước, lớp này tự hình thành lại, nên sắt bên trong không bị gỉ.',
        en: 'Chromium in the steel forms an invisibly thin but tight oxide layer on the surface. When scratched, it re-forms by itself, so the iron inside never rusts.',
      },
      source: 'https://en.wikipedia.org/wiki/Stainless_steel',
    },
    {
      q: {
        vi: 'Vì sao hồng ngọc màu đỏ?',
        en: 'Why are rubies red?',
      },
      a: {
        vi: 'Hồng ngọc là nhôm oxit có lẫn một ít crom, và chính crom tạo màu đỏ. Không có crom, cùng loại đá ấy là saphia, không màu hoặc có màu khác.',
        en: 'A ruby is aluminium oxide with a little chromium, and the chromium makes it red. Without chromium the same stone is a sapphire, colourless or another colour.',
      },
      source: 'https://en.wikipedia.org/wiki/Ruby',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Inox và đồ mạ crom vô hại. Một số hợp chất crom (crom hoá trị VI) gây ung thư, thường chỉ gặp trong công nghiệp.',
      en: 'Stainless steel and chrome plating are harmless. Some chromium compounds (hexavalent chromium) cause cancer, mostly in industry.',
    },
  },
  lenses: ['kitchen'],
});

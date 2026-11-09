import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Từ 1960 đến 1983, độ dài một mét được định nghĩa theo bước sóng ánh sáng của krypton.',
    en: 'From 1960 to 1983, the metre was defined by the wavelength of light from krypton.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Đèn flash chụp ảnh tốc độ cao',
        en: 'High-speed photography flashes',
      },
    },
    {
      icon: 'Building2',
      text: {
        vi: 'Lớp giữa kính cách nhiệt',
        en: 'Filling insulated windows',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên krypton nghĩa là gì?',
        en: 'What does the name krypton mean?',
      },
      a: {
        vi: 'Trong tiếng Hy Lạp, "kryptos" nghĩa là "ẩn giấu", vì nó lẩn trong không khí với lượng rất nhỏ. Hành tinh Krypton của Siêu Nhân ra đời sau, mượn tên nguyên tố này.',
        en: 'In Greek, "kryptos" means "hidden", as it hides in air in tiny amounts. Superman\'s planet Krypton came later and borrowed the name.',
      },
      source: 'https://en.wikipedia.org/wiki/Krypton',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Không độc, không cháy.',
      en: 'Not poisonous and does not burn.',
    },
  },
});

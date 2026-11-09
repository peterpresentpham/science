import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Đồ hộp tiếng Anh gọi là "tin can" vì vỏ thép được phủ một lớp thiếc chống gỉ.',
    en: 'Food cans are called "tin cans" because their steel is coated with rust-proof tin.',
  },
  uses: [
    {
      icon: 'Package',
      text: {
        vi: 'Hộp đồ hộp (sắt tây)',
        en: 'Food cans (tinplate)',
      },
    },
    {
      icon: 'Cpu',
      text: {
        vi: 'Thiếc hàn mạch điện',
        en: 'Solder for circuit boards',
      },
    },
    {
      icon: 'Gem',
      text: {
        vi: 'Đồng thanh đúc chuông, tượng',
        en: 'Bronze for bells and statues',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Thời đại đồ đồng cần thiếc để làm gì?',
        en: 'Why did the Bronze Age need tin?',
      },
      a: {
        vi: 'Đồ đồng thời cổ là đồng thanh: đồng trộn khoảng 10% thiếc. Thêm thiếc làm kim loại cứng hơn nhiều, đủ để làm vũ khí và công cụ.',
        en: 'Ancient bronze is copper mixed with about 10% tin. The tin makes the metal much harder, good enough for weapons and tools.',
      },
      source: 'https://en.wikipedia.org/wiki/Bronze',
    },
    {
      q: {
        vi: 'Thiếc biết "kêu" à?',
        en: 'Can tin really "cry"?',
      },
      a: {
        vi: 'Có. Uốn cong một thanh thiếc sẽ nghe tiếng lách tách nhỏ, gọi là "tiếng khóc của thiếc", do các tinh thể bên trong trượt lên nhau.',
        en: 'Yes. Bend a bar of tin and you hear a faint crackle, the "tin cry", made by crystals inside slipping past each other.',
      },
      source: 'https://en.wikipedia.org/wiki/Tin',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại; được dùng làm hộp đựng thức ăn.',
      en: 'Harmless; it is used to package food.',
    },
  },
  lenses: ['kitchen'],
});

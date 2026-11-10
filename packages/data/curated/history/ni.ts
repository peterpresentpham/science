import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1751,
    by: {
      vi: 'Axel Fredrik Cronstedt',
      en: 'Axel Fredrik Cronstedt',
    },
    place: {
      vi: 'Thuỵ Điển',
      en: 'Sweden',
    },
    source: 'https://periodic-table.rsc.org/element/28/nickel',
  },
  naming: {
    text: {
      vi: 'Nickel rút từ “kupfernickel” trong tiếng Đức, tên thợ mỏ đặt cho quặng tưởng chứa đồng nhưng khó luyện ra đồng.',
      en: 'Nickel is shortened from German “kupfernickel”, a miners’ name for ore that seemed copper-bearing but yielded no copper.',
    },
    source: 'https://periodic-table.rsc.org/element/28/nickel',
  },
  story: [
    {
      vi: 'Cronstedt nghiên cứu một khoáng vật nay gọi là nickelin và thu được kim loại mới. Cái tên giữ lại dấu vết của một sự nhầm lẫn trong khai khoáng.',
      en: 'Cronstedt investigated the mineral now called nickeline and obtained a new metal. Its name preserves an old misunderstanding in mining.',
      source: 'https://periodic-table.rsc.org/element/28/nickel',
    },
    {
      vi: 'Không phải ai cũng tin mẫu mới là nguyên tố vì nó còn lẫn nhiều kim loại. Những mẫu niken tinh khiết hơn về sau đã giúp giải quyết cuộc tranh luận.',
      en: 'Some chemists doubted that the impure samples represented an element. Later preparation of purer nickel helped settle the dispute.',
      source: 'https://periodic-table.rsc.org/element/28/nickel',
    },
  ],
  milestones: [
    {
      year: 1754,
      text: {
        vi: 'Cronstedt công bố và đặt tên nickel cho kim loại ông nghiên cứu.',
        en: 'Cronstedt announced and named the metal nickel.',
      },
      source: 'https://periodic-table.rsc.org/element/28/nickel',
    },
    {
      year: 1775,
      text: {
        vi: 'Bergman điều chế niken tinh khiết, củng cố việc nhận diện nguyên tố.',
        en: 'Bergman prepared pure nickel, strengthening its identification as an element.',
      },
      source: 'https://periodic-table.rsc.org/element/28/nickel',
    },
  ],
  sources: ['https://periodic-table.rsc.org/element/28/nickel'],
});

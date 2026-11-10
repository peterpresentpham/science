import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1797,
    by: {
      vi: 'Louis Nicolas Vauquelin',
      en: 'Louis Nicolas Vauquelin',
    },
    place: {
      vi: 'Paris, Pháp',
      en: 'Paris, France',
    },
    source: 'https://periodic-table.rsc.org/element/24/chromium',
    note: {
      vi: 'Giữ năm 1797 theo dữ liệu gốc; RSC kể mốc 1798 gắn với thu được kim loại.',
      en: '1797 is retained from the existing data; RSC’s account associates 1798 with obtaining the metal.',
    },
  },
  naming: {
    text: {
      vi: 'Chromium lấy từ tiếng Hy Lạp “chroma”, nghĩa là màu sắc, vì các hợp chất của nó có nhiều màu.',
      en: 'Chromium comes from Greek “chroma”, colour, reflecting the varied colours of its compounds.',
    },
    source: 'https://periodic-table.rsc.org/element/24/chromium',
  },
  story: [
    {
      vi: 'Vauquelin nghiên cứu quặng crocoit đỏ cam. Sau khi loại chì, ông theo dõi phần còn lại và nhận ra nguyên tố mới đứng sau nhiều màu khác nhau.',
      en: 'Vauquelin investigated orange-red crocoite. Removing the lead allowed him to follow the remaining component and identify an element associated with varied colours.',
      source: 'https://periodic-table.rsc.org/element/24/chromium',
    },
    {
      vi: 'Mốc nhận diện hợp chất và mốc tách kim loại thường nằm sát nhau. Với crom, cần đọc rõ bảng đang nói về bước nào thay vì coi mọi năm khác nhau là cùng một sự kiện.',
      en: 'Identification in a compound and isolation of the metal occurred close together. Chromium’s dates make more sense when each achievement is identified explicitly.',
      source: 'https://periodic-table.rsc.org/element/24/chromium',
    },
  ],
  milestones: [
    {
      year: 1798,
      text: {
        vi: 'Vauquelin thu được crom kim loại sau khi nghiên cứu các hợp chất của nó.',
        en: 'Vauquelin obtained chromium metal after investigating its compounds.',
      },
      source: 'https://periodic-table.rsc.org/element/24/chromium',
    },
    {
      year: 1913,
      text: {
        vi: 'Brearley phát triển thép không gỉ chứa crom tại Sheffield.',
        en: 'Brearley developed chromium-containing stainless steel in Sheffield.',
      },
      source: 'https://en.wikipedia.org/wiki/Stainless_steel',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/24/chromium',
    'https://en.wikipedia.org/wiki/Stainless_steel',
  ],
});

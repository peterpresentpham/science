import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1774,
    by: {
      vi: 'Joseph Priestley; Carl Wilhelm Scheele',
      en: 'Joseph Priestley; Carl Wilhelm Scheele',
    },
    place: {
      vi: 'Anh và Thuỵ Điển',
      en: 'England and Sweden',
    },
    source: 'https://periodic-table.rsc.org/element/8/oxygen',
    note: {
      vi: 'Giữ năm 1774 của dữ liệu gốc theo mốc Priestley; Scheele tạo khí trước nhưng công bố sau.',
      en: 'The existing year 1774 is retained for Priestley’s work; Scheele prepared the gas earlier but published later.',
    },
  },
  naming: {
    text: {
      vi: 'Oxygen nghĩa là “tạo axit”. Lavoisier đặt tên dựa trên quan niệm cũ rằng mọi axit đều chứa oxi.',
      en: 'Oxygen means “acid-forming”. Lavoisier named it under the mistaken belief that all acids contained oxygen.',
    },
    source: 'https://periodic-table.rsc.org/element/8/oxygen',
  },
  story: [
    {
      vi: 'Priestley thu được khí làm ngọn nến cháy sáng hơn khi nghiên cứu thuỷ ngân oxit. Scheele đã tạo ra khí tương tự trước đó, nhưng công bố muộn hơn.',
      en: 'Studying mercury oxide, Priestley obtained a gas that made a candle burn more brightly. Scheele had prepared the gas earlier but published later.',
      source: 'https://periodic-table.rsc.org/element/8/oxygen',
    },
    {
      vi: 'Lavoisier đặt khí này vào cách giải thích mới về sự cháy. Vì vậy lịch sử oxi gắn với nhiều người: tạo ra mẫu, công bố kết quả và giải thích ý nghĩa không phải cùng một việc.',
      en: 'Lavoisier placed the gas within a new explanation of combustion. Preparing a sample, publishing the result and understanding its significance were separate contributions.',
      source: 'https://periodic-table.rsc.org/element/8/oxygen',
    },
  ],
  milestones: [
    {
      year: 1777,
      text: {
        vi: 'Bản mô tả nghiên cứu oxi của Scheele được xuất bản.',
        en: 'Scheele’s account of his oxygen research was published.',
      },
      source: 'https://periodic-table.rsc.org/element/8/oxygen',
    },
    {
      year: 1895,
      text: {
        vi: 'Morley công bố phép xác định khối lượng nguyên tử oxi có độ chính xác cao.',
        en: 'Morley published a highly precise determination of oxygen’s atomic weight.',
      },
      source: 'https://www.acs.org/education/whatischemistry/landmarks/landmarks-timeline.html',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/8/oxygen',
    'https://www.acs.org/education/whatischemistry/landmarks/landmarks-timeline.html',
  ],
});

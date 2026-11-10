import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1886,
    by: {
      vi: 'Henri Moissan',
      en: 'Henri Moissan',
    },
    place: {
      vi: 'Paris, Pháp',
      en: 'Paris, France',
    },
    source: 'https://periodic-table.rsc.org/element/9/fluorine',
    note: {
      vi: 'Dữ liệu gốc ghi 1670 và Ampère, không phải lần tách F₂. Dùng mốc Moissan 1886 theo RSC.',
      en: 'The existing 1670/Ampère entry does not describe isolation of F₂. This account uses Moissan’s 1886 result, following RSC.',
    },
  },
  naming: {
    text: {
      vi: 'Fluorine liên quan đến Latin “fluere”, nghĩa là chảy; fluorit từng được dùng làm chất trợ chảy.',
      en: 'Fluorine is linked to Latin “fluere”, to flow; fluorite was used as a flux.',
    },
    source: 'https://periodic-table.rsc.org/element/9/fluorine',
  },
  story: [
    {
      vi: 'Các nhà hoá học biết hợp chất của flo trước khi tách được đơn chất. Khí quá hoạt động và hoá chất chứa nó ăn mòn thiết bị, khiến công việc rất khó khăn.',
      en: 'Chemists knew fluorine compounds before isolating the element. Its extreme reactivity and corrosive compounds made the apparatus difficult to maintain.',
      source: 'https://periodic-table.rsc.org/element/9/fluorine',
    },
    {
      vi: 'Moissan thành công bằng điện phân trong hệ được làm lạnh. Đây là câu chuyện lịch sử về thiết bị và vật liệu phù hợp, không phải thí nghiệm để tự làm.',
      en: 'Moissan succeeded using electrolysis in a cooled system. The episode illustrates the importance of suitable apparatus and materials, not a home experiment.',
      source: 'https://periodic-table.rsc.org/element/9/fluorine',
    },
  ],
  milestones: [
    {
      year: 1906,
      text: {
        vi: 'Moissan nhận Nobel Hoá học, trong đó có công trình điều chế flo.',
        en: 'Moissan received the Chemistry Nobel Prize, including recognition of his work on fluorine.',
      },
      source: 'https://www.nobelprize.org/prizes/chemistry/1906/moissan/facts/',
    },
    {
      year: 1938,
      text: {
        vi: 'Roy Plunkett phát hiện PTFE, polymer chứa flo sau này mang nhãn Teflon.',
        en: 'Roy Plunkett discovered PTFE, the fluoropolymer later branded Teflon.',
      },
      source: 'https://www.teflon.com/en/news-events/history',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/9/fluorine',
    'https://www.nobelprize.org/prizes/chemistry/1906/moissan/facts/',
    'https://www.teflon.com/en/news-events/history',
  ],
});

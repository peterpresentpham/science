import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: null,
    by: {
      vi: 'Không có một người phát hiện duy nhất',
      en: 'No single discoverer',
    },
    place: {
      vi: 'Nhiều nền văn minh cổ',
      en: 'Several ancient civilisations',
    },
    source: 'https://periodic-table.rsc.org/element/50/tin',
    note: {
      vi: 'Không có năm hay người phát hiện duy nhất; discoveredBy của dữ liệu gốc chỉ ghi vùng hoặc mốc cổ đại.',
      en: 'There is no single discovery year or discoverer; the existing discoveredBy value records a region or ancient date.',
    },
  },
  naming: {
    text: {
      vi: 'Tin là tên Anglo-Saxon; Sn theo tên Latin “stannum”.',
      en: 'Tin is an Anglo-Saxon name; Sn follows Latin “stannum”.',
    },
    source: 'https://pubchem.ncbi.nlm.nih.gov/element/Sn',
  },
  story: [
    {
      vi: 'Thiếc có ảnh hưởng lớn thông qua đồng thanh, hợp kim của đồng với thiếc. Hợp kim dễ chế tác và cứng hơn đồng nguyên chất, nên được dùng cho công cụ.',
      en: 'Tin had a major impact through bronze, its alloy with copper. Bronze was easier to work and harder than pure copper, making it useful for tools.',
      source: 'https://periodic-table.rsc.org/element/50/tin',
    },
    {
      vi: 'Người xưa biết dùng thiếc trước khi hiểu nguyên tố theo nghĩa hiện đại. Không có tài liệu cho phép quy việc phát hiện kim loại này cho một người duy nhất.',
      en: 'Tin was used before elements were understood in the modern sense. The evidence does not identify one individual as its discoverer.',
      source: 'https://periodic-table.rsc.org/element/50/tin',
    },
  ],
  milestones: [
    {
      year: -3000,
      text: {
        vi: 'Đồng thanh bắt đầu được dùng tại Ai Cập, Lưỡng Hà và lưu vực sông Ấn khoảng thời điểm này.',
        en: 'Bronze began to be used in Egypt, Mesopotamia and the Indus valley around this time.',
      },
      source: 'https://periodic-table.rsc.org/element/50/tin',
    },
    {
      year: -700,
      text: {
        vi: 'Theo RSC, người Trung Quốc khai thác thiếc ở Vân Nam vào khoảng thời điểm này.',
        en: 'According to RSC, tin was being mined in Yunnan, China, around this time.',
      },
      source: 'https://periodic-table.rsc.org/element/50/tin',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/50/tin',
    'https://pubchem.ncbi.nlm.nih.gov/element/Sn',
  ],
});

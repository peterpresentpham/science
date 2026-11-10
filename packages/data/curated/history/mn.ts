import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1774,
    by: {
      vi: 'Johan Gottlieb Gahn',
      en: 'Johan Gottlieb Gahn',
    },
    place: {
      vi: 'Thuỵ Điển',
      en: 'Sweden',
    },
    source: 'https://periodic-table.rsc.org/element/25/manganese',
    note: {
      vi: 'Dữ liệu gốc ghi Bergman; dùng Gahn cho bước tách kim loại năm 1774, đồng thời ghi công nhóm nghiên cứu.',
      en: 'The existing data credits Bergman; Gahn is used for the 1774 metal isolation, while acknowledging the wider research group.',
    },
  },
  naming: {
    text: {
      vi: 'Nguồn tên manganese còn được giải thích theo nhiều cách; RSC liên hệ với “magnes” hoặc “magnesia nigra”.',
      en: 'Manganese has more than one proposed name origin; RSC links it with “magnes” or “magnesia nigra”.',
    },
    source: 'https://periodic-table.rsc.org/element/25/manganese',
  },
  story: [
    {
      vi: 'Quặng pyrolusit đen từng được dùng trong thuỷ tinh và chất màu. Nhóm của Bergman và Scheele nghiên cứu nó trước khi Gahn tách được kim loại.',
      en: 'Black pyrolusite had been used in glassmaking and pigments. Bergman and Scheele’s group studied it before Gahn isolated the metal.',
      source: 'https://periodic-table.rsc.org/element/25/manganese',
    },
    {
      vi: 'Công trình không thuộc về một phép thử đơn lẻ. Phân tích quặng, dự đoán có nguyên tố mới và tách đơn chất là những đóng góp có thể do những người khác nhau thực hiện.',
      en: 'The result did not come from one isolated test. Analysing the ore, inferring a new element and isolating its metal could involve different contributors.',
      source: 'https://periodic-table.rsc.org/element/25/manganese',
    },
  ],
  milestones: [
    {
      year: 1807,
      text: {
        vi: 'Tên manganese được chấp nhận rộng rãi theo tường thuật của RSC.',
        en: 'The name manganese had gained general acceptance, according to RSC’s account.',
      },
      source: 'https://periodic-table.rsc.org/element/25/manganese',
    },
    {
      year: 1856,
      text: {
        vi: 'Mushet giải quyết vấn đề thép giòn của quy trình Bessemer bằng hợp kim chứa mangan.',
        en: 'Mushet addressed brittleness in Bessemer steel using a manganese-containing alloy.',
      },
      source: 'https://periodic-table.rsc.org/element/25/manganese',
    },
  ],
  sources: ['https://periodic-table.rsc.org/element/25/manganese'],
});

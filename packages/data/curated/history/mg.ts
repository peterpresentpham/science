import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1808,
    by: {
      vi: 'Humphry Davy',
      en: 'Humphry Davy',
    },
    place: {
      vi: 'London, Anh',
      en: 'London, England',
    },
    source: 'https://periodic-table.rsc.org/element/12/magnesium',
    note: {
      vi: 'Giữ 1808 là năm tách kim loại bởi Davy. Joseph Black trong dữ liệu gốc gắn với mốc nhận diện magnesia năm 1755.',
      en: '1808 is retained for Davy’s metal isolation. Joseph Black in the existing data is associated with recognising magnesia in 1755.',
    },
  },
  naming: {
    text: {
      vi: 'Magnesium lấy tên từ vùng Magnesia ở Hy Lạp.',
      en: 'Magnesium takes its name from the Magnesia region of Greece.',
    },
    source: 'https://periodic-table.rsc.org/element/12/magnesium',
  },
  story: [
    {
      vi: 'Joseph Black phân biệt magnesia với vôi, cho thấy chúng không phải một chất. Nhưng nhận ra hợp chất thuộc về nguyên tố khác chưa đồng nghĩa đã có mẫu kim loại.',
      en: 'Joseph Black distinguished magnesia from lime, showing they were not the same substance. Recognising different elemental components did not yet provide a sample of the metal.',
      source: 'https://periodic-table.rsc.org/element/12/magnesium',
    },
    {
      vi: 'Davy tách được lượng nhỏ magie; Bussy về sau thu được mẫu đủ lớn để nghiên cứu. Những mốc này giải thích vì sao các bảng có thể ghi năm phát hiện khác nhau.',
      en: 'Davy isolated a small amount of magnesium; Bussy later obtained enough to study. These different achievements explain why discovery dates can vary between tables.',
      source: 'https://periodic-table.rsc.org/element/12/magnesium',
    },
  ],
  milestones: [
    {
      year: 1831,
      text: {
        vi: 'Bussy điều chế lượng magie đủ để khảo sát tính chất.',
        en: 'Bussy prepared enough magnesium to investigate its properties.',
      },
      source: 'https://periodic-table.rsc.org/element/12/magnesium',
    },
    {
      year: 1941,
      text: {
        vi: 'Tạp chí Nature mô tả sản xuất magie từ nước biển ở quy mô công nghiệp.',
        en: 'Nature described industrial production of magnesium from seawater.',
      },
      source: 'https://www.nature.com/articles/147638a0',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/12/magnesium',
    'https://www.nature.com/articles/147638a0',
  ],
});

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
    source: 'https://periodic-table.rsc.org/element/56/barium',
    note: {
      vi: 'Dữ liệu gốc ghi Scheele nhưng năm 1808 là mốc Davy tách kim loại; Scheele nghiên cứu các hợp chất trước đó.',
      en: 'The existing data names Scheele, but 1808 is Davy’s isolation date; Scheele studied barium compounds earlier.',
    },
  },
  naming: {
    text: {
      vi: 'Barium từ tiếng Hy Lạp “barys”, nghĩa là nặng, liên quan đến các khoáng vật có khối lượng riêng lớn.',
      en: 'Barium comes from Greek “barys”, heavy, referring to its dense minerals.',
    },
    source: 'https://periodic-table.rsc.org/element/56/barium',
  },
  story: [
    {
      vi: 'Barit và witherit được nghiên cứu trước khi có mẫu bari kim loại. Những khoáng vật nặng ấy gợi rằng chúng chứa một thành phần chưa được tách ra.',
      en: 'Barite and witherite were studied before metallic barium was obtained. Their unusual density suggested a component that had not yet been isolated.',
      source: 'https://periodic-table.rsc.org/element/56/barium',
    },
    {
      vi: 'Davy dùng điện phân để vượt qua cách luyện với cacbon không hiệu quả. Như với nhiều kim loại hoạt động mạnh, có quặng chưa có nghĩa là dễ có đơn chất.',
      en: 'Davy used electrolysis where carbon smelting had failed. As with many reactive metals, having an ore did not make the element easy to obtain.',
      source: 'https://periodic-table.rsc.org/element/56/barium',
    },
  ],
  milestones: [
    {
      year: 1938,
      text: {
        vi: 'Hahn và Strassmann nhận ra đồng vị bari trong sản phẩm bắn phá urani bằng neutron.',
        en: 'Hahn and Strassmann identified barium isotopes among neutron-irradiated uranium products.',
      },
      source: 'https://www.mpic.de/4469988/die-entdeckung-der-kernspaltung',
    },
    {
      year: 1944,
      text: {
        vi: 'Giải Nobel Hoá học năm này ghi nhận phát hiện phân hạch, với bằng chứng hoá học từ bari.',
        en: 'The Chemistry Nobel Prize for this year recognised nuclear fission, supported by chemical evidence involving barium.',
      },
      source: 'https://www.nobelprize.org/prizes/chemistry/1944/hahn/facts/',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/56/barium',
    'https://www.mpic.de/4469988/die-entdeckung-der-kernspaltung',
    'https://www.nobelprize.org/prizes/chemistry/1944/hahn/facts/',
  ],
});

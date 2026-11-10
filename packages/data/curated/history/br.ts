import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1826,
    by: {
      vi: 'Antoine Jérôme Balard',
      en: 'Antoine Jérôme Balard',
    },
    place: {
      vi: 'Montpellier, Pháp',
      en: 'Montpellier, France',
    },
    source: 'https://periodic-table.rsc.org/element/35/bromine',
  },
  naming: {
    text: {
      vi: 'Bromine từ tiếng Hy Lạp “bromos”, nghĩa là mùi hôi.',
      en: 'Bromine comes from Greek “bromos”, meaning stench.',
    },
    source: 'https://periodic-table.rsc.org/element/35/bromine',
  },
  story: [
    {
      vi: 'Balard nghiên cứu phần nước muối cô đặc còn lại sau khi bay hơi. Ông thu được chất lỏng đỏ cam và nhận ra đó là nguyên tố mới.',
      en: 'Balard investigated the concentrated residue left after brine evaporated. He obtained an orange-red liquid and recognised a new element.',
      source: 'https://periodic-table.rsc.org/element/35/bromine',
    },
    {
      vi: 'Löwig cũng đã tạo được mẫu brom nhưng chưa kịp hoàn tất việc công bố. Lịch sử này cho thấy thời điểm công bố ảnh hưởng thế nào đến việc ghi nhận công lao.',
      en: 'Löwig had also obtained bromine but had not finished publishing his work. The episode shows how publication timing affects scientific credit.',
      source: 'https://periodic-table.rsc.org/element/35/bromine',
    },
  ],
  milestones: [
    {
      year: 1891,
      text: {
        vi: 'Herbert Dow sản xuất brom từ nước muối bằng phương pháp điện hoá.',
        en: 'Herbert Dow produced bromine from brine by an electrochemical process.',
      },
      source: 'https://www.acs.org/education/whatischemistry/landmarks/bromineproduction.html',
    },
    {
      year: 1934,
      text: {
        vi: 'Nhà máy Ethyl-Dow bắt đầu khai thác brom trực tiếp từ nước biển.',
        en: 'The Ethyl-Dow plant began extracting bromine directly from seawater.',
      },
      source: 'https://www.dncr.nc.gov/blog/2023/12/11/bromine-extraction-d-98',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/35/bromine',
    'https://www.acs.org/education/whatischemistry/landmarks/bromineproduction.html',
    'https://www.dncr.nc.gov/blog/2023/12/11/bromine-extraction-d-98',
  ],
});

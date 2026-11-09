import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nguyên tố cuối cùng của họ lantan, từng bị ba nhà khoa học tranh nhau nhận là người tìm ra.',
    en: 'The last lanthanide, once claimed by three different scientists.',
  },
  uses: [
    {
      icon: 'Hospital',
      text: {
        vi: 'Thuốc trị ung thư tuyến tiền liệt',
        en: 'Prostate cancer treatment',
      },
    },
    {
      icon: 'Scan',
      text: {
        vi: 'Đầu dò máy chụp PET',
        en: 'Detectors in PET scanners',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Tên luteti từ đâu mà có?',
        en: 'Where does the name lutetium come from?',
      },
      a: {
        vi: 'Từ Lutetia, tên La-tinh của Paris, quê của Georges Urbain, một trong ba người tìm ra nó năm 1907.',
        en: 'From Lutetia, the Latin name of Paris, home of Georges Urbain, one of its three discoverers in 1907.',
      },
      source: 'https://en.wikipedia.org/wiki/Lutetium',
    },
  ],
  safety: {
    level: 'harmless',
    note: {
      vi: 'Vô hại ở dạng thành phẩm.',
      en: 'Harmless in finished products.',
    },
  },
});

import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: 1807,
    by: {
      vi: 'Humphry Davy',
      en: 'Humphry Davy',
    },
    place: {
      vi: 'London, Anh',
      en: 'London, England',
    },
    source: 'https://periodic-table.rsc.org/element/19/potassium',
  },
  naming: {
    text: {
      vi: 'Potassium lấy từ “potash”, gắn với tro thực vật. K theo tên “kalium” do Berzelius dùng.',
      en: 'Potassium comes from “potash”, associated with plant ashes. K follows the name “kalium” used by Berzelius.',
    },
    source: 'https://periodic-table.rsc.org/element/19/potassium',
  },
  story: [
    {
      vi: 'Davy dùng pin điện lớn để điện phân potash và thấy những giọt kim loại mới. Kali là một ví dụ sớm cho sức mạnh của điện trong việc tách nguyên tố.',
      en: 'Using a large battery, Davy electrolysed potash and observed droplets of a new metal. Potassium was an early demonstration of electricity’s power to isolate elements.',
      source: 'https://periodic-table.rsc.org/element/19/potassium',
    },
    {
      vi: 'Tên gọi vẫn lưu dấu nguồn nguyên liệu từ tro cây, còn ký hiệu đi theo một truyền thống đặt tên khác. Vì thế không phải ký hiệu nào cũng giống tên tiếng Anh.',
      en: 'The name preserves its connection with plant ashes, while the symbol follows another naming tradition. Element symbols therefore need not resemble their English names.',
      source: 'https://periodic-table.rsc.org/element/19/potassium',
    },
  ],
  milestones: [
    {
      year: 1908,
      text: {
        vi: 'Nature đăng nghiên cứu về tính phóng xạ tự nhiên của kali và các kim loại kiềm.',
        en: 'Nature published research on natural radioactivity in potassium and other alkali metals.',
      },
      source: 'https://www.nature.com/articles/078055a0',
    },
    {
      year: 1957,
      text: {
        vi: 'Skou phát hiện enzyme vận chuyển ion natri và kali qua màng tế bào.',
        en: 'Skou discovered the enzyme that transports sodium and potassium ions across cell membranes.',
      },
      source: 'https://www.nobelprize.org/prizes/chemistry/1997/skou/facts/',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/19/potassium',
    'https://www.nature.com/articles/078055a0',
    'https://www.nobelprize.org/prizes/chemistry/1997/skou/facts/',
  ],
});

import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Được tiêm cho bệnh nhân trước khi chụp MRI để hình ảnh rõ hơn.',
    en: 'Injected into patients before MRI scans to make the images clearer.',
  },
  uses: [
    {
      icon: 'Scan',
      text: {
        vi: 'Thuốc tương phản chụp MRI',
        en: 'MRI contrast agent',
      },
    },
    {
      icon: 'Zap',
      text: {
        vi: 'Thanh điều khiển lò hạt nhân',
        en: 'Nuclear reactor control rods',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Gadolini có bị nam châm hút không?',
        en: 'Is gadolinium magnetic?',
      },
      a: {
        vi: 'Tuỳ thời tiết: gadolini chỉ có từ tính mạnh như sắt khi lạnh hơn khoảng 20 °C. Vào một ngày lạnh nó dính nam châm, ngày nóng thì không.',
        en: 'It depends on the weather: gadolinium is only strongly magnetic like iron below about 20 °C. On a cold day it sticks to a magnet; on a hot day it does not.',
      },
      source: 'https://en.wikipedia.org/wiki/Gadolinium',
    },
  ],
  safety: {
    level: 'careful',
    note: {
      vi: 'Thuốc tương phản chứa gadolini an toàn với hầu hết người, nhưng cần thận trọng ở người suy thận.',
      en: 'Gadolinium contrast is safe for most people but needs caution in those with kidney disease.',
    },
  },
});

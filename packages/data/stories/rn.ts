import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Khí phóng xạ không màu, không mùi tích tụ trong nhà kín, là nguyên nhân gây ung thư phổi đứng thứ hai sau thuốc lá.',
    en: 'A colourless, odourless radioactive gas that builds up indoors; the second leading cause of lung cancer after smoking.',
  },
  uses: [
    {
      icon: 'Building2',
      text: {
        vi: 'Tầng hầm, nhà kín trên nền đất đá chứa urani',
        en: 'Basements and sealed homes over uranium-bearing ground',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Radon từ đâu ra?',
        en: 'Where does radon come from?',
      },
      a: {
        vi: 'Từ urani có tự nhiên trong đất đá phân rã dần. Khí radon thấm qua khe nứt vào nhà và tích tụ nếu không được thông gió.',
        en: 'From uranium naturally present in soil and rock as it decays. Radon seeps into homes through cracks and builds up without ventilation.',
      },
      source: 'https://en.wikipedia.org/wiki/Radon',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Thông gió tầng hầm và nhà kín. Ở nhiều nước có dịch vụ đo radon trong nhà.',
      en: 'Ventilate basements and sealed rooms. Many countries offer home radon testing.',
    },
  },
});

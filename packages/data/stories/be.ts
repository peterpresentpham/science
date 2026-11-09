import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Nhẹ hơn nhôm nhưng khó uốn cong hơn thép: gương của kính viễn vọng James Webb làm từ beri phủ vàng.',
    en: "Lighter than aluminium yet stiffer than steel: the James Webb telescope's mirrors are gold-coated beryllium.",
  },
  uses: [
    {
      icon: 'Rocket',
      text: {
        vi: 'Gương kính viễn vọng không gian',
        en: 'Space telescope mirrors',
      },
    },
    {
      icon: 'Scan',
      text: {
        vi: 'Cửa sổ của ống phát tia X',
        en: 'Windows in X-ray tubes',
      },
    },
    {
      icon: 'Cpu',
      text: {
        vi: 'Lò xo, đầu nối điện bằng đồng–beri',
        en: 'Copper–beryllium springs and connectors',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Vì sao gương James Webb có màu vàng?',
        en: 'Why are the James Webb mirrors gold?',
      },
      a: {
        vi: 'Gương chính gồm 18 tấm beri, nhẹ và giữ nguyên hình dạng khi cực lạnh ngoài không gian. Mỗi tấm được phủ một lớp vàng rất mỏng để phản xạ tốt ánh sáng hồng ngoại.',
        en: 'The main mirror is 18 beryllium segments, light and able to hold their shape in the deep cold of space. Each is coated with a very thin layer of gold to reflect infrared light well.',
      },
      source: 'https://en.wikipedia.org/wiki/James_Webb_Space_Telescope',
    },
    {
      q: {
        vi: 'Ngọc lục bảo liên quan gì đến beri?',
        en: 'What do emeralds have to do with beryllium?',
      },
      a: {
        vi: 'Ngọc lục bảo là một dạng của khoáng vật beryl, có chứa beri. Tên beri cũng đến từ chính chữ "beryl".',
        en: 'Emerald is a variety of the mineral beryl, which contains beryllium. The element\'s name comes from "beryl" itself.',
      },
      source: 'https://en.wikipedia.org/wiki/Beryl',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Hít bụi beri có thể gây bệnh phổi mãn tính. Đồ vật làm sẵn thì an toàn khi cầm.',
      en: 'Breathing beryllium dust can cause a chronic lung disease. Finished objects are safe to handle.',
    },
  },
});

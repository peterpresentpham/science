import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Từng được cho vào kem đánh răng và mỹ phẩm, vì người ta tưởng phóng xạ tốt cho sức khoẻ.',
    en: 'It was once added to toothpaste and cosmetics, because people thought radioactivity was healthy.',
  },
  uses: [
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Kim dạ quang đồng hồ (ngày xưa)',
        en: 'Glowing watch dials (in the past)',
      },
    },
    {
      icon: 'Hospital',
      text: {
        vi: 'Thuốc điều trị ung thư di căn xương',
        en: 'Treatment for cancer spread to bone',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: '"Những cô gái radi" là ai?',
        en: 'Who were the "Radium Girls"?',
      },
      a: {
        vi: 'Họ là những nữ công nhân Mỹ những năm 1920, sơn số dạ quang lên mặt đồng hồ bằng sơn radi và thường liếm đầu cọ cho nhọn. Nhiều người bị bệnh nặng; vụ kiện của họ góp phần làm ra đời các luật an toàn lao động.',
        en: 'They were American factory workers in the 1920s who painted watch dials with radium paint, often licking their brushes to a point. Many fell gravely ill; their lawsuits helped bring in workplace safety laws.',
      },
      source: 'https://en.wikipedia.org/wiki/Radium_Girls',
    },
    {
      q: {
        vi: 'Ai tìm ra radi?',
        en: 'Who discovered radium?',
      },
      a: {
        vi: 'Marie và Pierre Curie, năm 1898, sau khi xử lý hàng tấn quặng urani. Marie Curie là người đầu tiên đoạt hai giải Nobel.',
        en: 'Marie and Pierre Curie, in 1898, after processing tonnes of uranium ore. Marie Curie was the first person to win two Nobel Prizes.',
      },
      source: 'https://en.wikipedia.org/wiki/Radium',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Phóng xạ mạnh. Không tháo đồng hồ dạ quang radi cũ ra.',
      en: 'Strongly radioactive. Never take apart old radium watches.',
    },
  },
});

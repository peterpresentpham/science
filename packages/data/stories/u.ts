import { defineStory } from '../src/story.ts';

export default defineStory({
  hook: {
    vi: 'Một viên nhiên liệu urani nhỏ bằng đầu ngón tay cho năng lượng ngang khoảng 1 tấn than.',
    en: 'A fingertip-sized uranium fuel pellet holds as much energy as about a tonne of coal.',
  },
  uses: [
    {
      icon: 'Zap',
      text: {
        vi: 'Nhiên liệu nhà máy điện hạt nhân',
        en: 'Fuel for nuclear power plants',
      },
    },
    {
      icon: 'Lightbulb',
      text: {
        vi: 'Thuỷ tinh urani phát sáng xanh dưới đèn UV',
        en: 'Uranium glass that glows green under UV',
      },
    },
  ],
  facts: [
    {
      q: {
        vi: 'Phóng xạ được phát hiện thế nào?',
        en: 'How was radioactivity discovered?',
      },
      a: {
        vi: 'Năm 1896, Henri Becquerel để muối urani cạnh một tấm phim ảnh bọc kín trong ngăn kéo, vậy mà phim vẫn bị lộ sáng. Đó là lần đầu tiên con người thấy phóng xạ.',
        en: 'In 1896 Henri Becquerel left uranium salts next to a wrapped photographic plate in a drawer, and the plate was exposed anyway. It was the first glimpse of radioactivity.',
      },
      source: 'https://en.wikipedia.org/wiki/Henri_Becquerel',
    },
    {
      q: {
        vi: 'Trái Đất từng có lò phản ứng hạt nhân tự nhiên?',
        en: 'Did Earth once have natural nuclear reactors?',
      },
      a: {
        vi: 'Có. Khoảng 1,7 tỉ năm trước ở Oklo (Gabon ngày nay), quặng urani tự duy trì phản ứng phân hạch trong hàng trăm nghìn năm.',
        en: "Yes. About 1.7 billion years ago at Oklo, in today's Gabon, uranium ore sustained nuclear fission on its own for hundreds of thousands of years.",
      },
      source: 'https://en.wikipedia.org/wiki/Natural_nuclear_fission_reactor',
    },
  ],
  safety: {
    level: 'toxic',
    note: {
      vi: 'Phóng xạ yếu nhưng độc như một kim loại nặng. Chỉ được giữ ở nơi được cấp phép.',
      en: 'Only weakly radioactive, but toxic like a heavy metal. Only kept at licensed facilities.',
    },
  },
});

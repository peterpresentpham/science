import { defineHistory } from '../../src/history.ts';

/** Lịch sử tự biên soạn; đối chiếu RSC, tách việc nhận ra nguyên tố khỏi lần tách được đơn chất. */
export default defineHistory({
  discovery: {
    year: null,
    by: {
      vi: 'Không có một người phát hiện duy nhất',
      en: 'No single discoverer',
    },
    place: {
      vi: 'Nhiều nền văn minh cổ',
      en: 'Several ancient civilisations',
    },
    source: 'https://periodic-table.rsc.org/element/79/gold',
    note: {
      vi: 'Không có năm hay người phát hiện duy nhất; discoveredBy của dữ liệu gốc chỉ ghi vùng hoặc mốc cổ đại.',
      en: 'There is no single discovery year or discoverer; the existing discoveredBy value records a region or ancient date.',
    },
  },
  naming: {
    text: {
      vi: 'Gold là tên Anglo-Saxon của kim loại; ký hiệu Au lấy từ Latin “aurum”.',
      en: 'Gold is an Anglo-Saxon name for the metal; Au comes from Latin “aurum”.',
    },
    source: 'https://periodic-table.rsc.org/element/79/gold',
  },
  story: [
    {
      vi: 'Vàng có thể gặp ở dạng hạt hoặc cục kim loại trong tự nhiên. Con người vì thế làm đồ vàng trước khi phát triển nhiều kĩ thuật luyện kim khác.',
      en: 'Gold occurs naturally as metallic grains and nuggets. People could therefore work it before developing many other metallurgical techniques.',
      source: 'https://periodic-table.rsc.org/element/79/gold',
    },
    {
      vi: 'Khi việc dùng vàng mở rộng, người ta khai mỏ và đúc tiền thay vì chỉ nhặt hạt tự sinh. Giá trị lịch sử của vàng gắn với cả vật liệu lẫn trao đổi hàng hoá.',
      en: 'As its use expanded, mining and coinage supplemented collection of native grains. Gold’s history concerns both a material and a medium of exchange.',
      source: 'https://periodic-table.rsc.org/element/79/gold',
    },
  ],
  milestones: [
    {
      year: -640,
      text: {
        vi: 'Vương quốc Lydia bắt đầu đúc tiền bằng electrum, hợp kim vàng–bạc tự nhiên, khoảng thời điểm này.',
        en: 'Lydia began minting electrum coins, using a natural gold–silver alloy, around this time.',
      },
      source: 'https://periodic-table.rsc.org/element/79/gold',
    },
    {
      year: 1848,
      text: {
        vi: 'Thợ đào trong cơn sốt vàng California dùng thuỷ ngân để thu hồi vàng.',
        en: 'Miners in the California Gold Rush used mercury to recover gold.',
      },
      source: 'https://periodic-table.rsc.org/element/80/mercury',
    },
  ],
  sources: [
    'https://periodic-table.rsc.org/element/79/gold',
    'https://periodic-table.rsc.org/element/80/mercury',
  ],
});

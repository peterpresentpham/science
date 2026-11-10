/**
 * Màu ngọn lửa khi đốt muối của nguyên tố (thí nghiệm thử màu ngọn lửa trong SGK).
 * Mã màu là giá trị gần đúng để hiển thị; màu thật còn tuỳ muối, nồng độ, loại đèn khí.
 * `lines`: vạch phổ chính (nm) tạo nên màu đó, nếu đã biết.
 */
export interface Flame {
  hex: string;
  name: { vi: string; en: string };
  lines?: number[];
  note?: { vi: string; en: string };
}

export const FLAME: Record<string, Flame> = {
  Li: { hex: '#e8254f', name: { vi: 'đỏ son', en: 'crimson' }, lines: [670.8] },
  Na: {
    hex: '#ffb000',
    name: { vi: 'vàng rực', en: 'intense yellow' },
    lines: [589.0, 589.6],
    note: {
      vi: 'Màu vàng của natri rất mạnh, chỉ một chút tạp chất natri cũng che mất màu của các nguyên tố khác.',
      en: 'Sodium yellow is so strong that a trace of sodium hides the colour of other elements.',
    },
  },
  K: {
    hex: '#c39be6',
    name: { vi: 'tím hồng nhạt', en: 'lilac' },
    lines: [766.5, 404.4],
    note: {
      vi: 'Thường phải nhìn qua kính coban xanh để lọc bớt màu vàng của tạp chất natri.',
      en: 'Usually viewed through blue cobalt glass to filter out yellow from sodium impurities.',
    },
  },
  Rb: { hex: '#c2286b', name: { vi: 'đỏ tím', en: 'red-violet' }, lines: [780.0, 420.2] },
  Cs: { hex: '#8f84de', name: { vi: 'tím xanh', en: 'blue-violet' }, lines: [455.5, 459.3] },
  Ca: { hex: '#ff5b1f', name: { vi: 'đỏ cam (đỏ gạch)', en: 'orange-red (brick red)' } },
  Sr: { hex: '#e8002f', name: { vi: 'đỏ thẫm', en: 'crimson red' } },
  Ba: { hex: '#b3e25a', name: { vi: 'lục vàng nhạt', en: 'pale apple green' } },
  Cu: {
    hex: '#18c7a2',
    name: { vi: 'xanh lục lam', en: 'blue-green' },
    note: {
      vi: 'Muối đồng(II) thường cho lửa xanh lục; đồng(II) clorua cho lửa xanh lam rõ hơn.',
      en: 'Copper(II) salts usually burn green; copper(II) chloride gives a bluer flame.',
    },
  },
  B: { hex: '#4fd65f', name: { vi: 'xanh lục sáng', en: 'bright green' } },
  Tl: { hex: '#33d153', name: { vi: 'xanh lục', en: 'pure green' }, lines: [535.0] },
  In: { hex: '#4b6cd6', name: { vi: 'xanh chàm', en: 'indigo blue' }, lines: [451.1] },
  Pb: { hex: '#b9c8ea', name: { vi: 'trắng xanh nhạt', en: 'pale bluish white' } },
};

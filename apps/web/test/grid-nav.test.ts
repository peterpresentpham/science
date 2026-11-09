import { describe, expect, it } from 'vitest';

import { ELEMENTS } from '../src/lib/elements';
import { nextCell } from '../src/lib/grid-nav';

describe('nextCell (arrow-key navigation)', () => {
  it.each([
    [1, 'right', 2], // H → He (bỏ qua khoảng trống)
    [2, 'down', 10], // He → Ne
    [10, 'left', 9], // Ne → F
    [1, 'down', 3], // H → Li
    [1, 'up', 1], // không có gì phía trên: giữ nguyên
    [56, 'right', 72], // Ba → Hf (ô 57–71 không phải nguyên tố)
    [88, 'down', 88], // Ra (cột 2): hàng f-block không có ô ở cột 2, giữ nguyên
    [57, 'up', 39], // La (cột 3, hàng 9) đi lên gặp Y (cột 3, hàng 5)
  ] as const)('Z=%i %s → %i', (from, dir, to) => {
    expect(nextCell(ELEMENTS, from, dir)).toBe(to);
  });
});

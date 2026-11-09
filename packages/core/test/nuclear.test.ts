import { describe, expect, it } from 'vitest';

import { isRadioactive } from '../src';

describe('isRadioactive', () => {
  it('has exactly 37 elements with no stable isotope', () => {
    const list = Array.from({ length: 118 }, (_, i) => i + 1).filter(isRadioactive);
    expect(list).toHaveLength(37);
    expect(list.slice(0, 3)).toEqual([43, 61, 84]);
  });

  it('treats bismuth and lead as stable', () => {
    expect(isRadioactive(82)).toBe(false);
    expect(isRadioactive(83)).toBe(false);
  });
});

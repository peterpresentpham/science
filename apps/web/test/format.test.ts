import { describe, expect, it } from 'vitest';

import { formatBig } from '../src/lib/format';

describe('formatBig', () => {
  it.each([
    [1.0784e22, 'vi', '10,8 nghìn tỉ tỉ'],
    [1.0784e22, 'en', '10.8 sextillion'],
    [2.577e6, 'vi', '2,58 triệu'],
    [5.97e23, 'en', '597 sextillion'],
    [850, 'vi', '850'],
  ] as const)('%s (%s) → %s', (n, locale, out) => {
    expect(formatBig(n, locale)).toBe(out);
  });
});

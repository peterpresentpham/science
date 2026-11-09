import { describe, expect, it } from 'vitest';

import { ELEMENTS } from '../src/lib/elements';
import { normalizeVi, searchElements } from '../src/lib/search';

describe('normalizeVi', () => {
  it.each([
    ['Lưu huỳnh', 'luu huynh'],
    ['Nitơ', 'nito'],
    ['Đồng', 'dong'],
    ['Thuỷ ngân', 'thuy ngan'],
    ['  Hiđro ', 'hidro'],
  ])('%s → %s', (input, out) => expect(normalizeVi(input)).toBe(out));
});

describe('searchElements', () => {
  const symbols = (q: string) => searchElements(ELEMENTS, q).map((e) => e.symbol);

  it('finds by Vietnamese name without diacritics', () => {
    expect(symbols('luu huynh')).toEqual(['S']);
    expect(symbols('dong')[0]).toBe('Cu');
  });
  it('finds by English name, symbol and atomic number', () => {
    expect(symbols('sodium')[0]).toBe('Na');
    expect(symbols('fe')[0]).toBe('Fe');
    expect(symbols('26')[0]).toBe('Fe');
  });
  it('ranks exact symbol before name matches', () => {
    // "c" trùng ký hiệu Carbon, sau đó mới tới các tên bắt đầu bằng "c"
    expect(symbols('c')[0]).toBe('C');
  });
  it('finds by everyday use, after name matches', () => {
    expect(symbols('muoi')).toEqual(expect.arrayContaining(['Na', 'Cl', 'I']));
    expect(symbols('bong den')).toEqual(expect.arrayContaining(['Ar', 'W', 'Hg']));
    // "sodium" khớp tên Natri trước, rồi mới tới Clo (công dụng: "Table salt (sodium chloride)")
    expect(symbols('sodium')).toEqual(['Na', 'Cl']);
  });
  it('finds by lens name and ranks those last', () => {
    const r = searchElements(ELEMENTS, 'dien thoai', { phone: 'Trong điện thoại' }).map(
      (e) => e.symbol
    );
    expect(r).toEqual(expect.arrayContaining(['Li', 'Cu', 'Au', 'Ga', 'In', 'Nd']));
    // Li, Cu, Au khớp qua công dụng nên đứng trước Ga, In, Nd (chỉ khớp qua lăng kính)
    expect(r.indexOf('Li')).toBeLessThan(r.indexOf('Ga'));
  });
  it('ignores uses and lenses for very short queries', () => {
    expect(symbols('pi')).not.toContain('Li');
  });
  it('returns everything for an empty query', () => {
    expect(searchElements(ELEMENTS, '  ')).toHaveLength(118);
  });
});

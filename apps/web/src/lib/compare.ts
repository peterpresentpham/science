import { useSyncExternalStore } from 'react';

import { BY_Z } from './elements';

/*
 * Khay so sánh: tối đa 3 nguyên tố: radar chồng các đa giác lên nhau, mà chỉ 3 màu phân loại đầu đạt kiểm định CVD "mọi cặp".
 * Lưu trong sessionStorage của tab, đọc qua useSyncExternalStore (server: rỗng).
 */
export const COMPARE_MAX = 3;
const KEY = 'nguyento:compare';
const EMPTY: readonly number[] = [];
let list: readonly number[] | null = null;
const listeners = new Set<() => void>();

function load(): readonly number[] {
  if (list) return list;
  try {
    const raw = JSON.parse(window.sessionStorage.getItem(KEY) ?? '[]') as unknown;
    list = Array.isArray(raw)
      ? raw.filter((z): z is number => Number.isInteger(z)).slice(0, COMPARE_MAX)
      : [];
  } catch {
    list = [];
  }
  return list;
}

function save(next: readonly number[]) {
  list = next;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // sessionStorage bị chặn: vẫn dùng được trong phiên hiện tại
  }
  for (const l of listeners) l();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Thêm/bỏ một nguyên tố. Khay đầy thì bỏ nguyên tố cũ nhất để nhường chỗ. */
export function toggleCompare(z: number) {
  const cur = load();
  if (cur.includes(z)) save(cur.filter((x) => x !== z));
  else save([...cur, z].slice(-COMPARE_MAX));
}

export const removeCompare = (z: number) => save(load().filter((x) => x !== z));
export const clearCompare = () => save([]);

export function useCompareList(): readonly number[] {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

/** Đường dẫn trang so sánh (chưa có locale), vd. "/compare/?z=11,19,37". */
export const compareHref = (zs: readonly number[]) => `/compare/?z=${zs.join(',')}`;

/** "11,19,abc,11,999" → [11, 19]: bỏ số hiệu lạ, trùng, và cắt theo COMPARE_MAX. */
export function parseZList(raw: string | null): number[] {
  if (!raw) return [];
  const out: number[] = [];
  for (const part of raw.split(',')) {
    const z = Number.parseInt(part, 10);
    if (BY_Z.has(z) && !out.includes(z)) out.push(z);
  }
  return out.slice(0, COMPARE_MAX);
}

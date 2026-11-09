import { useCallback, useSyncExternalStore } from 'react';

/*
 * Trạng thái nhỏ lưu trên query string (?lens=…&color=…) để chia sẻ link được.
 * - Đọc qua useSyncExternalStore: HTML tĩnh render với null, sau khi hydrate mới đọc URL.
 * - Ghi: giá trị mới có hiệu lực ngay (giữ trong `pending`), còn URL được cập nhật sau 250 ms.
 *   Kéo slider không gọi replaceState liên tục (Safari giới hạn số lần gọi).
 */
const EVENT = 'urlstatechange';
const FLUSH_MS = 250;
const pending = new Map<string, string | null>();
let timer: ReturnType<typeof setTimeout> | undefined;

function notify() {
  window.dispatchEvent(new Event(EVENT));
}

function flush() {
  timer = undefined;
  if (!pending.size) return;
  const url = new URL(window.location.href);
  for (const [k, v] of pending) {
    if (v === null) url.searchParams.delete(k);
    else url.searchParams.set(k, v);
  }
  pending.clear();
  window.history.replaceState(window.history.state, '', url);
}

function subscribe(onChange: () => void) {
  const onPop = () => {
    // Back/forward: bỏ các giá trị chưa kịp ghi, URL là nguồn đúng
    pending.clear();
    onChange();
  };
  window.addEventListener('popstate', onPop);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onPop);
    window.removeEventListener(EVENT, onChange);
  };
}

export function readUrlParam(name: string): string | null {
  if (pending.has(name)) return pending.get(name) ?? null;
  return new URLSearchParams(window.location.search).get(name);
}

/** Đặt nhiều tham số cùng lúc; null = xoá khỏi URL. */
export function setUrlParams(values: Record<string, string | null>) {
  for (const [k, v] of Object.entries(values)) pending.set(k, v);
  notify();
  clearTimeout(timer);
  timer = setTimeout(flush, FLUSH_MS);
}

/** Một tham số trên URL dưới dạng chuỗi (null nếu không có hoặc trước khi hydrate). */
export function useUrlParam(name: string): [string | null, (v: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => readUrlParam(name),
    () => null
  );
  const set = useCallback((v: string | null) => setUrlParams({ [name]: v }), [name]);
  return [value, set];
}

/** Ghi ngay các giá trị đang chờ (gọi trước khi pushState sang URL khác, vd. mở panel). */
export function flushUrlParams() {
  clearTimeout(timer);
  flush();
}

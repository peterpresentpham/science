'use client';

import { useEffect } from 'react';

import { BASE_PATH } from '@/lib/elements';
import { swUrl } from '@/lib/offline';

/**
 * Đăng ký service worker (chỉ bản production, nơi `postbuild` đã sinh sw.js).
 * Bỏ qua khi trình duyệt do máy điều khiển (Playwright…) để test không bị cache chen vào.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator) || navigator.webdriver) return;
    const register = () =>
      navigator.serviceWorker.register(swUrl, { scope: `${BASE_PATH}/` }).catch(() => {
        // Trình duyệt chặn (chế độ riêng tư…): site vẫn chạy bình thường, chỉ không có offline
      });
    if (document.readyState === 'complete') register();
    else {
      window.addEventListener('load', register, { once: true });
      return () => window.removeEventListener('load', register);
    }
  }, []);
  return null;
}

import type { MainModule } from '@rdkit/rdkit';

import { BASE_PATH } from './elements';

declare global {
  interface Window {
    initRDKitModule?: (opts?: { locateFile?: (f: string) => string }) => Promise<MainModule>;
  }
}

const dir = `${BASE_PATH}/rdkit`;
let loading: Promise<MainModule> | null = null;

/**
 * Nạp RDKit.js (WASM ≈ 7,5 MB) một lần cho cả trang, chỉ khi cần.
 * File được chép vào public/rdkit (scripts/sync-data.mjs) và nạp bằng thẻ script,
 * không đưa vào bundle để trang khác không phải gánh.
 */
export function loadRDKit(): Promise<MainModule> {
  loading ??= new Promise<MainModule>((resolve, reject) => {
    const fail = (e: unknown) => {
      loading = null; // cho phép thử lại khi có mạng
      reject(e instanceof Error ? e : new Error('RDKit load failed'));
    };
    const start = () =>
      window.initRDKitModule
        ? window.initRDKitModule({ locateFile: (f) => `${dir}/${f}` }).then(resolve, fail)
        : fail(new Error('initRDKitModule missing'));
    if (window.initRDKitModule) return start();
    const s = document.createElement('script');
    s.src = `${dir}/RDKit_minimal.js`;
    s.async = true;
    s.onload = start;
    s.onerror = () => fail(new Error('script'));
    document.head.appendChild(s);
  });
  return loading;
}

import { BASE_PATH } from './elements';

/** Tên kho Cache Storage chứa các gói offline do người dùng chủ động tải (service worker đọc kho này). */
export const PACK_CACHE = 'pack-v1';

export const swUrl = `${BASE_PATH}/sw.js`;
export const manifestUrl = `${BASE_PATH}/offline-manifest.json`;

export interface OfflinePack {
  id: string;
  /** null: dùng chung mọi ngôn ngữ */
  locale: 'vi' | 'en' | null;
  /** Tổng dung lượng chưa nén */
  bytes: number;
  urls: string[];
}
export interface OfflineManifest {
  version: string;
  base: string;
  packs: OfflinePack[];
}

export function formatBytes(bytes: number, locale: string): string {
  const mb = bytes / 1048576;
  const fmt = new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    maximumFractionDigits: mb >= 10 ? 0 : 1,
  });
  return mb >= 1 ? `${fmt.format(mb)} MB` : `${fmt.format(bytes / 1024)} KB`;
}

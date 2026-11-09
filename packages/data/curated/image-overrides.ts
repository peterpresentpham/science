import type { PhotoLicense } from '../src/photo.ts';

/**
 * Xử lý tay các ảnh mà chuỗi ghi công của nguồn không đủ rõ.
 * - `null`: không dùng ảnh (nguyên tố hiển thị hero không ảnh).
 * - object: ghi đè tác giả / giấy phép (và URL nếu cần) sau khi đã kiểm tra trên trang gốc.
 */
export const IMAGE_OVERRIDES: Record<
  string,
  null | { author: string; license: PhotoLicense; note: string; url?: string; sourceUrl?: string }
> = {
  Pm: {
    url: 'https://images-of-elements.com/promethium.jpg',
    sourceUrl: 'https://images-of-elements.com/promethium.php',
    author: 'Chemical Elements – A Virtual Museum',
    license: 'CC BY 3.0',
    note: 'Ảnh trên Commons đã bị xoá (404); dùng ảnh trên trang gốc images-of-elements (CC BY 3.0).',
  },
  Pu: {
    author: 'Los Alamos National Laboratory',
    license: 'Attribution',
    note: 'Commons ghi giấy phép "Attribution": dùng tự do, chỉ cần ghi công LANL.',
  },
  // Ảnh của EU JRC-ITU, nguồn không ghi giấy phép
  Cm: null,
  // "Image © CERN": không phải giấy phép mở
  Rf: null,
};

/** Ảnh giữ chỗ chung (không phải ảnh nguyên tố thật). */
export const PLACEHOLDER_IMAGE = /transactinoid\.png$/;

import { z } from 'zod';

/** Giấy phép ảnh được phép dùng. Thứ khác: build lỗi. */
export const PHOTO_LICENSES = {
  'CC BY 1.0': 'https://creativecommons.org/licenses/by/1.0/',
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  'CC BY-SA 2.5': 'https://creativecommons.org/licenses/by-sa/2.5/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'Public domain': null,
  /** Giấy phép "Attribution" của Wikimedia Commons: dùng tự do, chỉ cần ghi công */
  Attribution: 'https://commons.wikimedia.org/wiki/Template:Attribution',
} as const;
export type PhotoLicense = keyof typeof PHOTO_LICENSES;

export const PhotoCredit = z.object({
  /** Mô tả gốc của ảnh (tiếng Anh, từ nguồn) */
  title: z.string(),
  author: z.string().min(1),
  license: z.enum(Object.keys(PHOTO_LICENSES) as [PhotoLicense, ...PhotoLicense[]]),
  licenseUrl: z.string().url().nullable(),
  /** Trang mô tả ảnh (Wikimedia Commons / images-of-elements) */
  sourceUrl: z.string().url(),
});
export type PhotoCredit = z.infer<typeof PhotoCredit>;

/** Kích thước ảnh lớn (thumb và mini luôn vuông). */
export const PhotoSize = z.object({
  w: z.number().int().positive(),
  h: z.number().int().positive(),
});

export const PhotoManifest = z.record(
  z.string(),
  PhotoSize.extend({ credit: PhotoCredit, original: z.string().url() })
);
export type PhotoManifest = z.infer<typeof PhotoManifest>;

/** large: giữ tỉ lệ (hero); thumb: vuông (thẻ xem nhanh); mini: vuông, cho danh sách dài (hiển thị ~48px). */
export const PHOTO_WIDTHS = { large: 640, thumb: 240, mini: 96 } as const;
export const photoFile = (slug: string, size: keyof typeof PHOTO_WIDTHS) =>
  `${slug}-${PHOTO_WIDTHS[size]}.webp`;

const LICENSE_PATTERNS: Array<[RegExp, PhotoLicense]> = [
  [/CC BY-SA 4\.0/, 'CC BY-SA 4.0'],
  [/CC BY-SA 3\.0/, 'CC BY-SA 3.0'],
  [/CC BY-SA 2\.5/, 'CC BY-SA 2.5'],
  [/CC BY 3\.0|Creative Commons Attribution 3\.0/, 'CC BY 3.0'],
  [/CC BY 2\.0/, 'CC BY 2.0'],
  [/CC BY 1\.0/, 'CC BY 1.0'],
  [/Public domain/i, 'Public domain'],
];

/** Chuẩn hoá tên tác giả trong chuỗi ghi công của nguồn (lỗi gõ, email, lặp chữ). */
export function cleanAuthor(raw: string): string {
  // Ảnh phái sinh: "Tên_file.jpg: 'Tác giả' derivative work: Người sửa" → "Tác giả, Người sửa"
  const derivative = raw.match(/^[^:]+\.(?:jpe?g|png): '?([^']+)'? derivative work: (.+)$/i);
  if (derivative) raw = `${derivative[1]}, ${derivative[2]}`;
  return raw
    .replace(/^User:/, '')
    .replace(/^The original uploader was (.+?) at English Wikipedia\.?$/, '$1')
    .replace(/ at (English Wikipedia|en\.wikipedia)\.?$/, '')
    .replace(/\s*\(see File:[^)]*\)/, '')
    .replace(/\.?Touched up by (.+?)( at en\.wikipedia)?\.?$/, '; $1')
    .replace(/^Chemical Elements$/, 'Chemical Elements – A Virtual Museum')
    .replace(/\s*Contact email:.*$/i, '')
    .replace(/Unknown author(Unknown author)?/, 'Unknown author')
    .replace(/Hi-Res Images ?of ?Chemical Elements/, 'Hi-Res Images of Chemical Elements')
    .replace(/Chemical E[Ll]ements,? A Virtual Museum.*$/, 'Chemical Elements – A Virtual Museum')
    .replace(/,+$/, '')
    .trim();
}

/**
 * Tách chuỗi ghi công kiểu Wikimedia ("Tác giả, CC BY 3.0 <url>, via Wikimedia Commons, source: …")
 * thành tác giả + giấy phép. Không nhận ra giấy phép thì trả null.
 */
export function parseAttribution(
  attribution: string
): { author: string; license: PhotoLicense } | null {
  const hit = LICENSE_PATTERNS.find(([re]) => re.test(attribution));
  if (!hit) return null;
  const [re, license] = hit;
  const idx = attribution.search(re);
  let author = attribution.slice(0, idx).replace(/,?\s*(under a|under)?\s*$/i, '');
  // "GFDL, CC BY-SA 4.0": phần trước giấy phép là tên giấy phép khác, không phải tác giả
  if (/^(GFDL|)$/i.test(author.trim())) author = 'Wikimedia Commons contributor';
  return { author: cleanAuthor(author) || 'Unknown author', license };
}

/** Trang mô tả của một ảnh: trang File: trên Commons, hoặc trang .php của images-of-elements. */
export function sourcePageFor(url: string, attribution: string): string {
  const m = url.match(
    /upload\.wikimedia\.org\/wikipedia\/commons\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)$/
  );
  if (m?.[1]) return `https://commons.wikimedia.org/wiki/File:${m[1]}`;
  const src = attribution.match(/source:\s*(https?:\/\/\S+)/)?.[1];
  return (src ?? url).replace(/^http:/, 'https:');
}

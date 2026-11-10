import type { Category, ElementLite } from '@chem/data';
import elementsJson from '@chem/data/elements.json';
import { type GALLERY_WIDTHS, galleryFile } from '@chem/data/gallery';
import { PHOTO_WIDTHS, photoFile } from '@chem/data/photo';

export const ELEMENTS = elementsJson as ElementLite[];

export const BY_SLUG: ReadonlyMap<string, ElementLite> = new Map(ELEMENTS.map((e) => [e.slug, e]));
export const BY_Z: ReadonlyMap<number, ElementLite> = new Map(ELEMENTS.map((e) => [e.z, e]));

/** Màu đậm của loại nguyên tố (dùng cho chữ, viền, thanh màu). */
export const categoryColor = (c: Category) => `var(--cat-${c})`;

/** Màu loại pha với màu chữ: dùng cho chữ trên nền nhạt để đủ tương phản (WCAG AA). */
export const categoryInk = (c: Category) => `color-mix(in oklch, var(--cat-${c}) 55%, var(--fg))`;

/** Màu loại pha với nền surface theo tỉ lệ phần trăm (nền nhạt). */
export const categoryTint = (c: Category, percent: number) =>
  `color-mix(in oklch, var(--cat-${c}) ${percent}%, var(--surface))`;

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** URL gốc của site (có cả basePath), dùng cho link tuyệt đối trong metadata (hreflang, OG). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + BASE_PATH;

export const elementDataUrl = (slug: string) => `${BASE_PATH}/data/elements/${slug}.json`;

export const photoUrl = (slug: string, size: keyof typeof PHOTO_WIDTHS) =>
  `${BASE_PATH}/images/elements/${photoFile(slug, size)}`;

/** srcset gồm cả 2 cỡ ảnh: trình duyệt tự chọn theo `sizes` và mật độ điểm ảnh. */
export const photoSrcSet = (slug: string) =>
  `${photoUrl(slug, 'thumb')} ${PHOTO_WIDTHS.thumb}w, ${photoUrl(slug, 'large')} ${PHOTO_WIDTHS.large}w`;

export const galleryUrl = (slug: string, index: number, size: keyof typeof GALLERY_WIDTHS) =>
  `${BASE_PATH}/images/elements/gallery/${galleryFile(slug, index, size)}`;

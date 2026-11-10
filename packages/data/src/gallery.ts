import { z } from 'zod';

import { PHOTO_LICENSES } from './photo.ts';

export const GALLERY_KINDS = [
  'element',
  'mineral',
  'compound',
  'reaction',
  'flame',
  'use',
  'history',
] as const;

const text = (max: number) =>
  z.object({
    vi: z.string().trim().min(1).max(max),
    en: z.string().trim().min(1).max(max),
  });

export const GalleryImage = z
  .object({
    /** Tên chính xác của trang ảnh trên Wikimedia Commons. */
    file: z.string().startsWith('File:').min(6),
    kind: z.enum(GALLERY_KINDS),
    /** Ảnh chụp gì và điểm đáng chú ý, không dài quá 140 ký tự mỗi bản. */
    caption: text(140),
    /** Tác giả theo Commons, đã bỏ HTML. */
    author: z.string().trim().min(1),
    license: z.enum(
      Object.keys(PHOTO_LICENSES) as [
        keyof typeof PHOTO_LICENSES,
        ...Array<keyof typeof PHOTO_LICENSES>,
      ]
    ),
    /** Kích thước gốc, không phải kích thước thumbnail. */
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  })
  .refine((image) => Math.max(image.width, image.height) >= 800, {
    message: 'Cạnh dài của ảnh phải đạt ít nhất 800 px',
  });
export type GalleryImage = z.infer<typeof GalleryImage>;

export const Gallery = z.record(z.string(), z.array(GalleryImage).min(3).max(6));
export const defineGallery = (gallery: z.input<typeof Gallery>) => gallery;

/** Ảnh thư viện đã nén: large giữ tỉ lệ (lightbox), thumb vuông (lưới). */
export const GALLERY_WIDTHS = { large: 1000, thumb: 360 } as const;
export const galleryFile = (slug: string, index: number, size: keyof typeof GALLERY_WIDTHS) =>
  `${slug}-${index}-${GALLERY_WIDTHS[size]}.webp`;

/** images/gallery/manifest.json: kích thước ảnh large đã nén, theo thứ tự trong curated/gallery.ts. */
export const GalleryManifest = z.record(
  z.string(),
  z.array(z.object({ file: z.string(), w: z.number().int(), h: z.number().int() }))
);
export type GalleryManifest = z.infer<typeof GalleryManifest>;

/** Trang mô tả ảnh trên Commons (nguồn và ghi công). */
export const galleryPageUrl = (file: string) =>
  `https://commons.wikimedia.org/wiki/${encodeURIComponent(file.replaceAll(' ', '_')).replaceAll('%3A', ':').replaceAll('%2F', '/')}`;

/** Ảnh thư viện trong dữ liệu nguyên tố (đã gắn kích thước, giấy phép và trang nguồn). */
export const GalleryItem = z.object({
  kind: z.enum(GALLERY_KINDS),
  caption: z.object({ vi: z.string(), en: z.string() }),
  author: z.string(),
  license: z.string(),
  licenseUrl: z.string().url().nullable(),
  sourceUrl: z.string().url(),
  w: z.number().int().positive(),
  h: z.number().int().positive(),
});
export type GalleryItem = z.infer<typeof GalleryItem>;

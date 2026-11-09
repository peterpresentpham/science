import type { ElementLite } from '@chem/data';
import { PHOTO_WIDTHS } from '@chem/data/photo';

import { photoSrcSet, photoUrl } from '@/lib/elements';
import { cn } from '@/lib/format';

interface Props {
  el: Pick<ElementLite, 'slug' | 'photo'>;
  alt: string;
  /** Kích thước hiển thị (thuộc tính `sizes`), ví dụ "(min-width: 640px) 18rem, 100vw" */
  sizes: string;
  /**
   * Ảnh vuông đã cắt sẵn thay vì ảnh lớn giữ tỉ lệ:
   * - 'thumb' (240px): ô cỡ vừa;
   * - 'mini' (96px): danh sách dài, để không tốn băng thông lúc tải trang.
   */
  square?: 'thumb' | 'mini';
  /** Ảnh LCP: tải ngay, ưu tiên cao */
  priority?: boolean;
  className?: string;
}

/** Ảnh thật của nguyên tố (WebP tự host). Không có ảnh thì không render gì. */
export function ElementPhoto({ el, alt, sizes, square, priority, className }: Props) {
  if (!el.photo) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- site tĩnh, ảnh đã được nén sẵn lúc build
    <img
      src={photoUrl(el.slug, square ?? 'large')}
      srcSet={square ? undefined : photoSrcSet(el.slug)}
      sizes={square ? undefined : sizes}
      width={square ? PHOTO_WIDTHS[square] : el.photo.w}
      height={square ? PHOTO_WIDTHS[square] : el.photo.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('object-cover', className)}
    />
  );
}

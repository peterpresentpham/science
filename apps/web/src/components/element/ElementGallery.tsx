'use client';

import type { ElementFull } from '@chem/data';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { galleryUrl } from '@/lib/elements';

/** Lưới ảnh nhỏ; bấm một ảnh mở hộp xem lớn (thẻ dialog: có sẵn Esc, khoá cuộn, bẫy tiêu điểm). */
export function ElementGallery({
  slug,
  gallery,
}: {
  slug: string;
  gallery: ElementFull['gallery'];
}) {
  const t = useTranslations('element.gallery');
  const locale = useLocale() as 'vi' | 'en';
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const total = gallery.length;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % total));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + total) % total));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, total]);

  if (total === 0) return null;
  const current = open === null ? null : gallery[open]!;

  return (
    <section aria-labelledby={`gallery-${slug}`} className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={`gallery-${slug}`} className="font-display text-lg font-semibold">
          {t('title')}
        </h2>
        <span className="text-xs text-muted">{t('count', { count: total })}</span>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {gallery.map((g, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={t('open', { caption: g.caption[locale] })}
              className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- site tĩnh, ảnh đã nén sẵn */}
              <img
                src={galleryUrl(slug, i, 'thumb')}
                alt=""
                width={360}
                height={360}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform group-hover:scale-105"
              />
              <span className="absolute bottom-1 left-1 rounded-full bg-black/60 px-2 py-0.5 text-[0.65rem] text-white">
                {t(`kind.${g.kind}`)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        aria-label={t('title')}
        className="m-auto max-h-[92dvh] w-[min(96vw,64rem)] rounded-2xl border border-border bg-surface p-0 text-fg backdrop:bg-black/70"
      >
        {current && open !== null && (
          <figure className="flex max-h-[92dvh] flex-col">
            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element -- site tĩnh */}
              <img
                src={galleryUrl(slug, open, 'large')}
                alt={current.caption[locale]}
                width={current.w}
                height={current.h}
                decoding="async"
                className="max-h-[70dvh] w-auto max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label={t('close')}
                className="absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-5" aria-hidden />
              </button>
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setOpen((open - 1 + total) % total)}
                    aria-label={t('prev')}
                    className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ChevronLeft className="size-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen((open + 1) % total)}
                    aria-label={t('next')}
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ChevronRight className="size-5" aria-hidden />
                  </button>
                </>
              )}
            </div>
            <figcaption className="space-y-1 overflow-y-auto p-4 text-sm">
              <p>{current.caption[locale]}</p>
              <p className="text-xs text-muted">
                {t('credit', { author: current.author, license: current.license })} ·{' '}
                <span className="tabular">{t('position', { n: open + 1, total })}</span>
              </p>
              <a
                href={current.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs underline underline-offset-2"
              >
                {t('source')}
                <ExternalLink className="size-3" aria-hidden />
              </a>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}

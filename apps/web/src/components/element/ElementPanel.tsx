'use client';

import type { ElementFull } from '@chem/data';
import * as Dialog from '@radix-ui/react-dialog';
import { ExternalLink, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { CompareButton } from '@/components/compare/CompareButton';
import { BASE_PATH, BY_SLUG } from '@/lib/elements';

import { ElementDetail, PrevNext } from './ElementDetail';
import { ElementHero } from './ElementHero';

const cache = new Map<string, Promise<ElementFull>>();

export function loadElement(slug: string): Promise<ElementFull> {
  let p = cache.get(slug);
  if (!p) {
    p = fetch(`${BASE_PATH}/data/elements/${slug}.json`).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json() as Promise<ElementFull>;
    });
    p.catch(() => cache.delete(slug));
    cache.set(slug, p);
  }
  return p;
}

const SLUG_FROM_PATH = /\/element\/([a-z]{1,3})\/?$/;

/** Tên view-transition dùng chung giữa ô trong bảng và ô ký hiệu trong panel. */
export const TILE_TRANSITION = 'element-tile';

/** Ô (trong bảng) hoặc dòng (trong danh sách) đang hiển thị của nguyên tố, nếu có. */
const cellOf = (slug: string | null): HTMLElement | null => {
  const z = slug ? BY_SLUG.get(slug)?.z : undefined;
  if (!z) return null;
  const candidates = document.querySelectorAll<HTMLElement>(
    `a[data-z="${z}"], a[data-row-z="${z}"]`
  );
  return [...candidates].find((el) => el.getClientRects().length > 0) ?? null;
};

const canAnimate = () =>
  typeof document.startViewTransition === 'function' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Trạng thái panel nguyên tố gắn với URL.
 * Mở: pushState sang /{locale}/element/{slug}/ (trang này cũng tồn tại dạng tĩnh, nên refresh vẫn đúng).
 * Back của trình duyệt: popstate → đóng panel. Chuyển nguyên tố trong panel: replaceState.
 */
export function useElementPanel() {
  const locale = useLocale();
  const [slug, setSlugState] = useState<string | null>(null);
  const slugRef = useRef<string | null>(null);
  const homeUrl = useRef<string>('');

  /**
   * Đổi nguyên tố đang mở. Khi mở từ bảng hoặc đóng về bảng, dùng View Transitions API
   * để ô nguyên tố "bay" vào ô ký hiệu của panel (và ngược lại). Đổi qua lại trong panel thì không.
   */
  const setSlug = useCallback((next: string | null) => {
    const prev = slugRef.current;
    slugRef.current = next;
    const opening = prev === null && next !== null;
    const closing = prev !== null && next === null;
    const cell = opening ? cellOf(next) : closing ? cellOf(prev) : null;
    if (!cell || !canAnimate()) {
      setSlugState(next);
      return;
    }
    // Ảnh "trước": ô trong bảng mang tên transition (khi mở); ảnh "sau": ô ký hiệu trong panel mang tên đó.
    if (opening) cell.style.viewTransitionName = TILE_TRANSITION;
    const vt = document.startViewTransition(() => {
      if (opening) cell.style.viewTransitionName = '';
      flushSync(() => setSlugState(next));
      if (closing) cell.style.viewTransitionName = TILE_TRANSITION;
    });
    void vt.finished.finally(() => {
      cell.style.viewTransitionName = '';
    });
  }, []);

  const urlFor = useCallback((s: string) => `${BASE_PATH}/${locale}/element/${s}/`, [locale]);

  useEffect(() => {
    homeUrl.current = window.location.pathname + window.location.search;
    const onPop = () => {
      const m = window.location.pathname.match(SLUG_FROM_PATH);
      setSlug(m?.[1] && BY_SLUG.has(m[1]) ? m[1] : null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [setSlug]);

  const open = useCallback(
    (s: string) => {
      setSlug(s);
      void loadElement(s).catch(() => {});
      window.history.pushState({ elementPanel: s }, '', urlFor(s));
    },
    [urlFor, setSlug]
  );

  const select = useCallback(
    (s: string) => {
      setSlug(s);
      window.history.replaceState({ ...window.history.state, elementPanel: s }, '', urlFor(s));
    },
    [urlFor, setSlug]
  );

  const close = useCallback(() => {
    setSlug(null);
    if (window.history.state?.elementPanel) window.history.back();
    else window.history.pushState(null, '', homeUrl.current || `${BASE_PATH}/${locale}/`);
  }, [locale, setSlug]);

  return { slug, open, select, close, urlFor };
}

export type ElementPanelState = ReturnType<typeof useElementPanel>;

export function ElementPanel({ state }: { state: ElementPanelState }) {
  const t = useTranslations('element');
  const { slug, close, select, urlFor } = state;
  // Kết quả tải gắn với slug: khi slug đổi, kết quả cũ tự "hết hạn" mà không cần reset state trong effect
  const [result, setResult] = useState<{ slug: string; data?: ElementFull; error?: true } | null>(
    null
  );

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    loadElement(slug)
      .then((data) => !cancelled && setResult({ slug, data }))
      .catch(() => !cancelled && setResult({ slug, error: true }));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const lite = slug ? BY_SLUG.get(slug) : undefined;
  const current = result?.slug === slug ? result : null;
  const shown = current?.data ?? null;
  const error = current?.error ?? false;

  return (
    <Dialog.Root open={slug !== null} onOpenChange={(o) => !o && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay fixed inset-0 z-40 bg-fg/10 backdrop-blur-[3px]" />
        <Dialog.Content
          className="sheet fixed inset-y-2 right-2 z-50 flex w-[calc(100%-1rem)] max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-bg shadow-float outline-none sm:inset-y-3 sm:right-3"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-1">
            <Dialog.Title className="font-mono text-xs text-muted">
              {lite ? `${lite.z} · ${lite.symbol}` : ''}
            </Dialog.Title>
            <div className="flex items-center gap-1">
              {lite && <CompareButton z={lite.z} />}
              {slug && (
                <a
                  href={urlFor(slug)}
                  onClick={(e) => {
                    // Điều hướng thật sang trang tĩnh đầy đủ
                    e.preventDefault();
                    window.location.assign(urlFor(slug));
                  }}
                  className="flex items-center gap-1 rounded-full px-3 py-1 text-sm text-accent hover:bg-surface-2"
                >
                  {t('openFull')} <ExternalLink className="size-3.5" />
                </a>
              )}
              <Dialog.Close
                className="rounded-full p-1.5 hover:bg-surface-2"
                aria-label={t('close')}
              >
                <X className="size-5" />
              </Dialog.Close>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto px-3 pt-1 pb-4 sm:px-4">
            {lite && (
              <>
                <ElementHero
                  el={lite}
                  compact
                  tileTransitionName={TILE_TRANSITION}
                  credit={shown?.photoCredit}
                />
                <PrevNext z={lite.z} onSelect={select} />
              </>
            )}
            {shown ? (
              <ElementDetail element={shown} onSelect={select} compact withHeader={false} />
            ) : error ? (
              <p className="px-2 text-red-600">{t('loadError')}</p>
            ) : (
              <p className="px-2 text-muted">{t('loading')}</p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';

import { Link, usePathname } from '@/i18n/navigation';

const LINKS = [
  { href: '/', key: 'table' },
  { href: '/compound', key: 'compounds' },
  { href: '/tools', key: 'tools' },
  { href: '/compare', key: 'compare' },
  { href: '/lab', key: 'lab' },
  { href: '/learn', key: 'learn' },
  { href: '/lessons', key: 'lessons' },
  { href: '/builder', key: 'builder' },
  { href: '/timeline', key: 'timeline' },
] as const;

/**
 * Điều hướng chính. Từ 1280px: hàng link ngay trên header. Dưới 1280px: một nút Menu mở bảng
 * liệt kê đủ mọi trang (trước đây các link bị ẩn dần và điện thoại không vào được trang nào).
 */
export function NavLinks() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();
  const [lastPath, setLastPath] = useState(pathname);

  // Đổi trang thì đóng menu (cập nhật state ngay trong lúc render, không cần effect)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panel.current?.contains(target) && !(target as Element).closest?.(`[data-nav="${id}"]`))
        setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open, id]);

  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <ul className="hidden items-center gap-1 xl:flex">
        {LINKS.map(({ href, key }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={active(href) ? 'page' : undefined}
              className="rounded-full px-3 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-fg aria-[current=page]:text-fg"
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="xl:hidden">
        <button
          type="button"
          data-nav={id}
          aria-expanded={open}
          aria-controls={id}
          aria-label={t('menu')}
          onClick={() => setOpen((o) => !o)}
          className="flex size-9 items-center justify-center rounded-full text-muted outline-none hover:bg-surface-2 hover:text-fg focus-visible:ring-2 focus-visible:ring-ring"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
        {open && (
          <div
            ref={panel}
            id={id}
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-40 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-border bg-surface p-2 shadow-card sm:left-auto sm:w-72"
          >
            <ul>
              {LINKS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active(href) ? 'page' : undefined}
                    className="block rounded-xl px-4 py-3 text-base outline-none hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:bg-surface-2 aria-[current=page]:font-semibold"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

'use client';

import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

// Nạp lười: chỉ tải mã bảng lệnh khi người dùng mở lần đầu
const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

/** Nút tìm kiếm trên header + phím tắt ⌘K / Ctrl+K / "/". */
export function SearchButton() {
  const t = useTranslations('palette');
  const [open, setOpen] = useState(false);
  const [used, setUsed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((k === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !isTyping(e.target))) {
        e.preventDefault();
        setUsed(true);
        setOpen((o) => (k === 'k' ? !o : true));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setUsed(true);
          setOpen(true);
        }}
        aria-label={t('open')}
        aria-keyshortcuts="Meta+K Control+K /"
        className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted hover:text-fg"
      >
        <Search className="size-4" aria-hidden />
        <span className="max-sm:hidden">{t('button')}</span>
        <kbd className="font-mono text-[0.65rem] max-sm:hidden">⌘K</kbd>
      </button>
      {used && <CommandPalette open={open} onOpenChange={setOpen} />}
    </>
  );
}

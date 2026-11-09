'use client';

import { LENS_IDS } from '@chem/data/lenses';
import * as Dialog from '@radix-ui/react-dialog';
import { CornerDownLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useDeferredValue, useMemo, useState } from 'react';

import { categoryColor, ELEMENTS } from '@/lib/elements';
import { cn } from '@/lib/format';
import { searchElements } from '@/lib/search';

const MAX_RESULTS = 8;

interface Item {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  symbol?: string;
  color?: string;
}

/**
 * Bảng lệnh ⌘K: tìm nguyên tố (không dấu, theo tên/ký hiệu/số hiệu/công dụng) và đi tới trang.
 * Module này được nạp lười (chỉ khi mở lần đầu) để không làm nặng trang.
 */
export default function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const deferred = useDeferredValue(query);
  const lensNames = useMemo(
    () => Object.fromEntries(LENS_IDS.map((id) => [id, t(`lens.${id}.name`)])),
    [t]
  );

  const items: Item[] = useMemo(() => {
    const pages: Item[] = [
      { id: 'p:home', href: `/${locale}/`, title: t('nav.table'), subtitle: t('palette.page') },
      {
        id: 'p:compare',
        href: `/${locale}/compare/`,
        title: t('compare.title'),
        subtitle: t('palette.page'),
      },
      {
        id: 'p:credits',
        href: `/${locale}/credits/`,
        title: t('credits.title'),
        subtitle: t('palette.page'),
      },
    ];
    const q = deferred.trim();
    const els = (q ? searchElements(ELEMENTS, q, lensNames) : []).slice(0, MAX_RESULTS);
    const elItems = els.map<Item>((e) => ({
      id: `e:${e.z}`,
      href: `/${locale}/element/${e.slug}/`,
      title: locale === 'vi' ? e.name.vi : e.name.en,
      subtitle: e.hook ? (locale === 'vi' ? e.hook.vi : e.hook.en) : `${e.z}`,
      symbol: e.symbol,
      color: categoryColor(e.category),
    }));
    const pageItems = q
      ? pages.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
      : pages;
    return [...elItems, ...pageItems];
  }, [deferred, lensNames, locale, t]);

  const current = Math.min(active, Math.max(items.length - 1, 0));
  const go = (item: Item | undefined) => {
    if (!item) return;
    // router tự thêm basePath; href đã có locale
    onOpenChange(false);
    router.push(item.href);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) {
          setQuery('');
          setActive(0);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-[12vh] left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-float outline-none"
        >
          <Dialog.Title className="sr-only">{t('palette.title')}</Dialog.Title>
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted" aria-hidden />
            <input
              autoFocus
              role="combobox"
              aria-expanded
              aria-controls="palette-results"
              aria-activedescendant={items[current] ? `palette-${items[current].id}` : undefined}
              aria-label={t('search.label')}
              value={query}
              placeholder={t('palette.placeholder')}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setActive((current + 1) % Math.max(items.length, 1));
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setActive((current - 1 + items.length) % Math.max(items.length, 1));
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  go(items[current]);
                }
              }}
              className="h-12 flex-1 bg-transparent text-base outline-none"
            />
            <kbd className="rounded border border-border px-1.5 font-mono text-[0.65rem] text-muted">
              Esc
            </kbd>
          </div>
          <ul id="palette-results" role="listbox" className="max-h-[60vh] overflow-y-auto p-1.5">
            {items.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-muted">{t('search.empty')}</li>
            )}
            {items.map((it, i) => (
              <li
                key={it.id}
                id={`palette-${it.id}`}
                role="option"
                aria-selected={i === current}
                onMouseMove={() => setActive(i)}
                onClick={() => go(it)}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2',
                  i === current && 'bg-surface-2'
                )}
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border font-display font-semibold"
                  style={it.color ? { borderColor: it.color } : undefined}
                >
                  {it.symbol ?? '→'}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{it.title}</span>
                  <span className="block truncate text-xs text-muted">{it.subtitle}</span>
                </span>
                {i === current && <CornerDownLeft className="size-3.5 text-muted" aria-hidden />}
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

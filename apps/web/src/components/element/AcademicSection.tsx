'use client';

import { ChevronDown, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

export const ACADEMIC_ID = 'hoc-hoa';
const STORAGE_KEY = 'nguyento:academic-open';

/**
 * "Góc học hoá": toàn bộ phần học thuật (cấu hình electron, Bohr, ô lượng tử, bảng số liệu, vị trí…),
 * đóng sẵn cho người đọc tò mò, ai muốn đọc sâu thì mở ra.
 *
 * - Dùng <details> gốc: nội dung vẫn có trong HTML tĩnh (SEO, trình đọc màn hình), và Ctrl+F trong Chrome
 *   tự mở khi tìm thấy chữ bên trong.
 * - Mở sẵn khi URL có #hoc-hoa, hoặc khi người xem đã từng để mở (nhớ trong localStorage của họ).
 * - Trạng thái mở/đóng do chính <details> giữ; effect chỉ đặt `open` trên DOM, không setState.
 */
export function AcademicSection({ children }: { children: React.ReactNode }) {
  const t = useTranslations('academic');
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;
    const openFromHash = () => {
      if (window.location.hash === `#${ACADEMIC_ID}`) details.open = true;
    };
    let remembered = false;
    try {
      remembered = window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      // localStorage bị chặn (chế độ riêng tư…): mặc định đóng
    }
    if (remembered) details.open = true;
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const onToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, e.currentTarget.open ? '1' : '0');
    } catch {
      // bỏ qua
    }
  };

  return (
    <details
      ref={ref}
      id={ACADEMIC_ID}
      onToggle={onToggle}
      className="group scroll-mt-24 rounded-3xl border border-border bg-surface/70 shadow-card"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-3xl p-4 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-surface-2">
          <GraduationCap className="size-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-semibold tracking-tight">
            {t('title')}
          </span>
          <span className="block text-sm text-muted">{t('hint')}</span>
        </span>
        <span className="hidden text-sm text-muted sm:inline">
          <span className="group-open:hidden">{t('open')}</span>
          <span className="hidden group-open:inline">{t('close')}</span>
        </span>
        <ChevronDown
          className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="space-y-4 px-2 pb-2 sm:px-3 sm:pb-3">{children}</div>
    </details>
  );
}

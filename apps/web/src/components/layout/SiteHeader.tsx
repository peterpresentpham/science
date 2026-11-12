import { Link } from '@/i18n/navigation';

import { LocaleSwitcher } from './LocaleSwitcher';
import { NavLinks } from './NavLinks';
import { SearchButton } from './SearchButton';
import { ThemeToggle } from './ThemeToggle';

function Logo() {
  // Logo dạng "ô nguyên tố" của chính trang
  return (
    <span className="relative flex size-9 flex-col rounded-[9px] border border-border bg-surface p-1 shadow-card">
      <span className="font-mono text-[0.45rem] leading-none text-muted">118</span>
      <span className="mt-auto text-center font-display text-sm leading-none font-bold text-accent">
        Nt
      </span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 px-3 pt-3">
      <div className="relative mx-auto flex h-14 max-w-[92rem] items-center justify-between gap-4 rounded-2xl border border-border bg-surface/80 px-3 shadow-card backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap max-[419px]:sr-only">
            Nguyên tố
          </span>
        </Link>
        <nav className="flex items-center gap-1.5">
          <NavLinks />
          <SearchButton />
          <LocaleSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

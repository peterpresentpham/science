export function Chip({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-2.5 py-0.5 text-xs font-medium backdrop-blur">
      {color && <span className="size-2 rounded-full" style={{ background: color }} />}
      {children}
    </span>
  );
}

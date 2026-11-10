import { TriangleAlert } from 'lucide-react';

/**
 * Hiện lại chuỗi người dùng nhập, gạch chân đoạn lỗi, kèm thông báo.
 * Đoạn lỗi có cả nền màu lẫn gạch sóng (không chỉ dựa vào màu); vị trí cuối chuỗi hiện thành ô trống.
 */
export function ErrorHighlight({
  input,
  index,
  length,
  message,
}: {
  input: string;
  index: number;
  length: number;
  message: string;
}) {
  const end = Math.min(input.length, index + Math.max(length, 0));
  const before = input.slice(0, index);
  const bad = input.slice(index, end);
  const after = input.slice(end);
  return (
    <div
      role="alert"
      className="space-y-1.5 rounded-xl border border-[var(--danger)]/40 bg-[var(--danger)]/8 px-3 py-2 text-sm"
    >
      <p className="font-mono break-all whitespace-pre-wrap">
        {before}
        <mark className="rounded-sm bg-[var(--danger)]/25 text-fg underline decoration-[var(--danger)] decoration-wavy decoration-2 underline-offset-4">
          {bad || ' '}
        </mark>
        {after}
      </p>
      <p className="flex items-start gap-1.5">
        <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
        {message}
      </p>
    </div>
  );
}

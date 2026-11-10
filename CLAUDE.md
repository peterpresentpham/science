# CLAUDE.md

## Quy tắc bắt buộc

- **Không tự ý chạy test hay Lighthouse.** Các lệnh này tốn nhiều thời gian; muốn chạy phải hỏi và được xác nhận trước. Danh sách:
  - Unit test: `pnpm test`, `vitest`
  - E2E: `pnpm e2e`, `playwright test`, kể cả các spec tạm để chụp màn hình
  - `pnpm check` (lệnh này chạy cả test lẫn e2e)
  - Lighthouse, dưới mọi hình thức
- Được chạy mà không cần hỏi: `pnpm lint`, `pnpm lint:fix`, `pnpm format`, `pnpm format:check`, `pnpm typecheck`, `pnpm build`, `pnpm data:build`.
- Khi đã sửa code mà chưa chạy test, nói rõ điều đó trong phần báo cáo. Có thể đề xuất lệnh test nên chạy.
- **Không commit.** Người dùng tự commit thủ công. Không chạy `git commit`, không hỏi hay nhắc "có muốn commit không".

## Dự án

"Nguyên Tố": bảng tuần hoàn tương tác. Site **100% tĩnh**, không backend, không tài khoản. Next.js export tĩnh, có 2 ngôn ngữ vi/en.

- Monorepo pnpm, không dùng Turborepo:
  - `packages/core`: logic hoá học (cấu hình electron…)
  - `packages/data`: pipeline dữ liệu và ảnh
  - `apps/web`: giao diện
- TypeScript ghim ở `~6.0.3`, vì typescript-eslint chưa hỗ trợ TS 7.
- Lint và định dạng: ESLint 10 (flat config) + Prettier.
- Ảnh nguyên tố đã nén sẵn và commit trong `packages/data/images/`. Chỉ chạy `pnpm data:images` khi cần cập nhật ảnh (lệnh này cần mạng).

## Tài liệu

- `docs/y-tuong-bang-tuan-hoan.md`: ý tưởng sản phẩm
- `docs/ke-hoach-implement.md`: kế hoạch tổng và tiến độ
- `docs/huong-than-thien.md`, `docs/ke-hoach-than-thien.md`: hướng "thân thiện" (M1.5) và tiến độ từng bước
- Tài liệu viết bằng tiếng Việt.

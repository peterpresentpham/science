# Nguyên Tố: Bảng tuần hoàn tương tác

Web **hoàn toàn tĩnh** (Next.js static export), không có backend và không cần tài khoản.
Xem ý tưởng ở [`docs/y-tuong-bang-tuan-hoan.md`](docs/y-tuong-bang-tuan-hoan.md) và kế hoạch ở [`docs/ke-hoach-implement.md`](docs/ke-hoach-implement.md).

## Cấu trúc

```
apps/web         Next.js (App Router, output: "export"), next-intl (vi/en), Tailwind v4
packages/core    @chem/core: logic hoá học thuần TS (cấu hình electron, ...), test bằng Vitest
packages/data    @chem/data: pipeline dữ liệu (PubChem + Bowserinator → Zod → dist/*.json)
```

## Lệnh

```bash
pnpm install
pnpm dev               # build dữ liệu rồi chạy http://localhost:3000/vi/
pnpm build             # build dữ liệu + web; trang tĩnh nằm ở apps/web/out
pnpm check             # lint + typecheck + test + build + e2e (giống CI)
pnpm test              # unit test (core, data, web)
pnpm e2e               # Playwright trên bản build tĩnh (cần build trước)
pnpm lint              # ESLint (lint:fix để tự sửa)
pnpm format            # Prettier (format:check trong CI)
pnpm data:fetch        # tải lại dữ liệu nguồn vào packages/data/raw (snapshot được commit)
```

Deploy: upload thư mục `apps/web/out` lên host tĩnh bất kỳ (Cloudflare Pages, Netlify, GitHub Pages).
Nếu host dưới đường dẫn con, build với `NEXT_PUBLIC_BASE_PATH=/chemistry pnpm build`.
`NEXT_PUBLIC_SITE_URL` (ví dụ `https://user.github.io`) dùng để tạo URL tuyệt đối cho canonical/hreflang.

## Deploy (GitHub Pages)

Job `deploy` trong `.github/workflows/ci.yml` tự build lại với basePath của repo và deploy lên GitHub Pages
mỗi khi push lên `main` (sau khi lint, test, build, e2e đều xanh). Chỉ cần bật một lần:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

Thư mục `apps/web/out` là site tĩnh hoàn chỉnh, nên cũng có thể đưa lên Cloudflare Pages, Netlify hoặc bất kỳ host tĩnh nào.

## Ảnh nguyên tố

Ảnh nằm sẵn trong `packages/data/images/` (WebP 640px + 240px, kèm `manifest.json` ghi công) và được commit,
nên build không cần mạng. Chỉ chạy lại khi muốn cập nhật ảnh:

```bash
pnpm data:images            # tải ảnh còn thiếu
pnpm data:images --force    # tải lại tất cả
```

Script lấy URL và chuỗi ghi công từ Bowserinator, chỉ nhận các giấy phép trong `PHOTO_LICENSES`
(`packages/data/src/photo.ts`). Ảnh cần xử lý tay khai báo trong `packages/data/curated/image-overrides.ts`.
Danh sách ghi công đầy đủ ở trang `/vi/credits/`.

## Dữ liệu & giấy phép

- PubChem Periodic Table (NIH, public domain).
- [Bowserinator/Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON): **CC BY-SA 3.0**.
  Dữ liệu dẫn xuất (`packages/data/dist`) vì vậy cũng theo CC BY-SA 3.0.

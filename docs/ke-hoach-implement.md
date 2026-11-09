# Kế hoạch implement — Bảng Tuần Hoàn Tương Tác

> Tài liệu đi kèm: [`y-tuong-bang-tuan-hoan.md`](./y-tuong-bang-tuan-hoan.md) (ý tưởng sản phẩm).
> Tài liệu này là **kế hoạch kỹ thuật**: chọn công nghệ, kiến trúc, cấu trúc mã nguồn, thuật toán, và chia việc theo từng milestone có tiêu chí hoàn thành (DoD).
> Cấu trúc thư mục ở đây **thay thế** mục 7.2 của tài liệu ý tưởng.
> Ngày: 2026-11-09

---

## Tiến độ (cập nhật 2026-11-09)

- **M0: xong.** Chưa chạy `shadcn init` (đang dùng Radix trực tiếp, sẽ thêm khi cần Tabs, Slider, Command).
- **M1: xong** (2026-11-09).
  - Hiệu ứng ô → header làm bằng **View Transitions API** thay cho Motion: không thêm thư viện, trình duyệt không hỗ trợ hoặc bật giảm chuyển động thì bỏ qua. Panel hiện ngay phần đầu từ dữ liệu lite, phần còn lại tải sau.
  - Chế độ **Danh sách** (mặc định dưới 768px, chuyển qua lại được): tìm theo tên không dấu, ký hiệu, số hiệu; bấm chú giải để lọc theo loại.
  - **Lighthouse** (mobile/desktop): Performance 90–93/100, Accessibility, Best Practices, SEO đều 100. Đã sửa: tương phản chữ màu loại nguyên tố (`categoryInk`), cấu trúc `<dl>`, hreflang/canonical tuyệt đối (`metadataBase`), favicon, bỏ preload 6 file font chữ thân (LCP mobile 3,9 s → 3,1 s).
  - **Deploy:** job `deploy` trong CI đưa lên GitHub Pages khi push lên `main`; đã thử bản build với basePath `/chemistry`.
- **M1.5 "Thân thiện": xong nội dung bước 1–7**, chưa chạy test các bước 5–7 (chi tiết trong `ke-hoach-than-thien.md`).
- **M2: xong** (2026-11-09). Test pass: unit 172 + 26 + 38, e2e 42/42. **Chưa đo Lighthouse/INP, chưa xem trên trình duyệt.**
  - **Tô màu theo**: loại, khối, trạng thái (slider 0–6000 K), năm tìm ra (slider), 7 thuộc tính số (độ âm điện, bán kính, IE1, ái lực e, khối lượng riêng, nhiệt độ nóng chảy, sôi). Chế độ và slider nằm trên URL (`?color=phase&t=310`), ghi URL trễ 250 ms để kéo slider không gọi `replaceState` liên tục. Không dùng nuqs: tự viết `lib/url-state.ts` (khoảng 70 dòng) bằng `useSyncExternalStore`, `useLens` chuyển sang dùng chung.
  - **Màu theo nguyên tắc dataviz**, đã chạy bộ kiểm định màu (CVD, tương phản):
    - Thuộc tính số: một sắc xanh nhạt → đậm, không dùng cầu vồng; ô thiếu dữ liệu là sọc chéo. Khối lượng riêng dùng thang log.
    - Trạng thái và radar: 3 màu phân loại đầu (đạt kiểm định "mọi cặp" ở cả sáng và tối).
    - Khối s/p/d/f: 4 màu phân loại đầu **không đạt** (cam và vàng quá giống nhau), nên dùng bộ xanh dương/vàng/hồng/xanh lá, bộ 4 màu duy nhất đạt. Chế độ tối có một cặp ở mức CVD 6,9 nên ô ghi thêm chữ "khối d" làm mã hoá phụ.
  - **Bảng 32 cột** (`?layout=32`), dùng `grid32` có sẵn trong dữ liệu.
  - **Tìm nhanh ⌘K / Ctrl+K / "/"**: nút trên header, mã nạp lười khi mở lần đầu, dùng chung `searchElements` (không dấu, cả công dụng). Chưa thêm `cmdk`/shadcn: tự viết với Radix Dialog.
  - **So sánh**: Shift + click trên ô, hoặc nút "So sánh" trong panel → khay so sánh nổi ở đáy (lưu trong `sessionStorage`) → trang `/compare/?z=11,19,37` có radar SVG tự vẽ (không thêm thư viện) + bảng số liệu.
    - **Tối đa 3 nguyên tố, không phải 4**: radar chồng các đa giác lên nhau, mà chỉ 3 màu phân loại đầu phân biệt được với người mù màu khi đặt cạnh nhau.
  - **Test**: unit `apps/web/test/color-mode.test.ts`; e2e 5 test trong `table.spec.ts` (URL giữ chế độ, slider trạng thái, bảng 32 cột, ⌘K, so sánh).
  - Kích thước: HTML trang chủ 366 KB → 375 KB (thêm chuỗi dịch).
- **M3: xong code** (2026-11-09). **Chưa chạy test, chưa xem trên trình duyệt, chưa đo FPS.** Nằm trong "Góc học hoá" của trang nguyên tố, thẻ 01–03.
  - **Dựng nguyên tử** (`AtomBuilder`): Bohr + ô lượng tử + sơ đồ mũi tên chéo chạy đồng bộ theo `fillingSteps`, nút ⏮ ◀ ▶ ▶| ⏭, tốc độ 1×/2×/4×, thanh kéo bước. Mỗi bước ghi quy tắc đang áp dụng (vững bền / Hund / Pauli); bước ngoại lệ được làm nổi bật, riêng Cr, Cu, Mo, Ag, Au có thêm giải thích "d nửa bão hoà / bão hoà". Mặc định hiện cấu hình cuối nên HTML tĩnh không đổi so với M1. Không dùng `motion`: hiệu ứng mũi tên mới bằng CSS, tắt khi giảm chuyển động.
  - **Ion** (`IonExplorer`): chọn trong các số oxi hoá có trong dữ liệu; electron bị lấy đi hiện mờ, gạch ngang; electron nhận thêm được làm nổi bật.
  - **Orbital** (`@chem/core/orbital`): Laguerre, phần bán kính đã chuẩn hoá, 16 hàm cầu thực (s → f, tên theo SGK), ψ, lấy mẫu có seed.
    - **Khác kế hoạch:** lấy mẫu bằng cách tách biến (bán kính theo CDF của R²r², hướng theo Y²) thay cho lấy mẫu loại bỏ trong hình hộp. Kết quả chính xác như nhau, nhanh hơn nhiều: 40k điểm mất 12–113 ms trên Node.
    - Test (chưa chạy): chuẩn hoá R và Y, trực giao, số nút bán kính, ψ_1s(0) = 1/√π, ⟨r⟩ của mẫu khớp (3n² − l(l+1))/2, mặt nút góc của dxy.
  - **Đám mây 3D** (`OrbitalCloud`): chỉ tải khi bấm "Xem đám mây 3D". 40k điểm, 2 màu theo dấu ψ, xoay/phóng to, tự xoay, tự giảm số điểm nếu dưới khoảng 50 FPS. Trục z hướng lên như SGK.
    - **Khác kế hoạch:** dùng three.js trực tiếp, không dùng react-three-fiber/drei; không dùng Comlink (chỉ một loại thông điệp).
    - **Worker** build riêng bằng esbuild ra `public/workers/orbital.js` (`pnpm build-worker`, chạy trong `predev`/`prebuild`): Turbopack của Next 16.4 chép nguyên file `.ts` thay vì biên dịch `new Worker(new URL(...))`.
    - **Không có WebGL:** vẽ hình chiếu 2D bằng canvas từ cùng bộ điểm, thay cho ảnh render sẵn (không phải tạo và lưu 100+ ảnh).
  - e2e (chưa chạy): 3 test (dựng nguyên tử Cr, ion Fe³⁺, đám mây 2px).
  - Thẻ trong trang nguyên tố giờ có `aria-labelledby` theo tiêu đề; panel gắn `key` theo nguyên tố để trình phát/ion/orbital không giữ trạng thái của nguyên tố trước.
  - DoD còn phải kiểm bằng mắt: checklist hình dạng 1s → 4f so với hình trong giáo trình, FPS khi xoay. Bản M1 còn mang màu sách giáo khoa; hướng xử lý nằm ở [`huong-than-thien.md`](./huong-than-thien.md), kế hoạch implement ở [`ke-hoach-than-thien.md`](./ke-hoach-than-thien.md).
- Ghi chú khi làm:
  - Đã đối chiếu cấu hình electron trong `@chem/core` với PubChem và Bowserinator: khớp với Z = 1–102. Lr lấy theo NIST (`7p1`); Z ≥ 104 có cờ `configurationPredicted`.
  - Bowserinator dùng **CC BY-SA 3.0**, nên dữ liệu dẫn xuất cũng theo CC BY-SA 3.0.
  - Dữ liệu nguồn PubChem có vài lỗi, đã sửa trong `packages/data/curated/names-vi.ts`: Li/Pb bị làm tròn khối lượng, Al/Ca ghi năm phát hiện là "Ancient", mã màu của Pd mất số 0 ở đầu.
  - **TypeScript giữ ở 6.0.3**: đã thử TS 7 (typecheck nhanh hơn khoảng 5 lần) nhưng phải quay lại, vì `typescript-eslint` 8.72 chỉ hỗ trợ `typescript <6.1.0` (TS 7 không còn export API compiler kiểu cũ). Khi typescript-eslint hỗ trợ TS 7 thì nâng lại.
  - **Đổi Biome → ESLint + Prettier.** Lần chạy đầu, react-hooks v7 đã bắt được 2 lỗi thật: `setState` đồng bộ trong effect ở `ElementPanel`, và thiếu dependency ở `PeriodicTable`.
  - **Đã bỏ Turborepo**, thay bằng script pnpm (`pnpm check` chạy giống CI). Với 3 package, Turborepo không đem lại nhiều lợi ích mà còn gây lỗi race giữa `next typegen` và `next build`.

---

## 0. Nguyên tắc

1. **Logic hoá học tách khỏi UI.** Toàn bộ phần tính toán (phân tích công thức, cân bằng phương trình, cấu hình e, hàm sóng orbital) nằm trong package `@chem/core`. Package này là TypeScript thuần, không phụ thuộc React hay DOM, test được 100% bằng Vitest.
2. **Dữ liệu lõi đóng gói tĩnh.** Pipeline chạy lúc build sẽ tải và chuẩn hoá dữ liệu, kiểm tra bằng Zod, rồi sinh ra JSON có kiểu (typed JSON). Khi người dùng truy cập, chỉ phần tra hợp chất tuỳ ý mới cần gọi mạng.
3. **3D tải lười (lazy).** Three.js, 3Dmol.js và RDKit WASM chỉ được tải khi mở tab cần đến. Trang chủ phải nhẹ.
4. **Trạng thái nằm trong URL.** Chế độ màu, nhiệt độ, bộ lọc, tab đang mở đều lưu trong URL để chia sẻ link và để nút back hoạt động đúng.
5. **Mỗi milestone đều deploy được.** Không có nhánh sống lâu; merge vào `main` thường xuyên và có preview deploy cho mỗi PR.
6. **Web hoàn toàn tĩnh, không có backend, không cần tài khoản.** Build ra HTML/JS/CSS/JSON tĩnh (`output: "export"`), host trên CDN tĩnh bất kỳ. Người dùng vào là dùng được **toàn bộ** chức năng, không phải đăng nhập. Dữ liệu cá nhân (tiến độ học, yêu thích, cài đặt) chỉ lưu trên trình duyệt. Những phần cần server được ghi ở [mục 13: Ngoài phạm vi bản hiện tại](#13-ngoài-phạm-vi-bản-hiện-tại).

---

## 1. Tech stack

| Hạng mục                      | Lựa chọn                                                                                                    | Ghi chú / lý do                                                                                                                                                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Monorepo | **pnpm workspaces** + script pnpm | Tách `web`, `core`, `data`; không dùng Turborepo vì repo nhỏ (bỏ ngày 2026-11-09) |
| Framework                     | **Next.js (App Router, bản stable mới nhất) + React 19**, chế độ **static export** (`output: "export"`)     | 118 trang nguyên tố được dựng sẵn lúc build, tốt cho SEO. Static export **không hỗ trợ** Route Handler, middleware, intercepting route, ISR hay tối ưu ảnh lúc chạy, nên kế hoạch tránh hết các tính năng này (xem 5.11) |
| Ngôn ngữ                      | **TypeScript `strict`** + `noUncheckedIndexedAccess`                                                        |                                                                                                                                                                                                                          |
| Styling                       | **Tailwind CSS v4** + CSS variables cho theme                                                               | Màu nhóm nguyên tố định nghĩa thành token                                                                                                                                                                                |
| Component                     | **shadcn/ui** (Radix primitives)                                                                            | Tabs, Dialog, Slider, Command (ô tìm kiếm ⌘K), Tooltip                                                                                                                                                                   |
| Animation 2D                  | **Motion** (trước đây là Framer Motion)                                                                     | Shared layout transition (ô phóng to thành header), mô hình Bohr                                                                                                                                                         |
| 3D chung                      | **three + @react-three/fiber + @react-three/drei**                                                          | Orbital point cloud, bảng tuần hoàn 3D                                                                                                                                                                                   |
| 3D phân tử                    | **3Dmol.js** (`3dmol` trên npm)                                                                             | Đọc SDF/PDB/MOL2/XYZ/CIF. Bọc thành component client-only                                                                                                                                                                |
| 2D cấu trúc / cheminformatics | **@rdkit/rdkit** (RDKit.js WASM)                                                                            | Chuyển SMILES sang SVG 2D, kiểm tra hoá trị, tính InChI (dùng cho trình dựng phân tử ở M6)                                                                                                                               |
| State                         | **Zustand** (state UI cục bộ) + **nuqs** (state trong URL)                                                  |                                                                                                                                                                                                                          |
| Data fetching                 | **TanStack Query**                                                                                          | Chỉ dùng cho PubChem lúc chạy (runtime), gọi thẳng từ trình duyệt (PubChem trả `access-control-allow-origin: *`)                                                                                                         |
| Lưu trữ cục bộ                | **IndexedDB** qua `idb-keyval` hoặc Dexie, kèm `localStorage` cho cài đặt nhỏ                               | Tiến độ học, flashcard, yêu thích, lịch sử tra cứu                                                                                                                                                                       |
| Worker                        | **Comlink** + Web Worker                                                                                    | Lấy mẫu orbital và các phép tính nặng                                                                                                                                                                                    |
| Tìm kiếm                      | **Fuse.js** + hàm bỏ dấu tiếng Việt                                                                         | Chạy trên trình duyệt, index khoảng 118 nguyên tố + khoảng 500 hợp chất                                                                                                                                                  |
| Biểu đồ                       | **Visx** hoặc **Observable Plot**                                                                           | Đồ thị xu hướng, phổ, phân rã. Chọn Visx nếu cần kiểm soát kiểu React                                                                                                                                                    |
| i18n                          | **next-intl**                                                                                               | `vi` (mặc định), `en`                                                                                                                                                                                                    |
| Schema                        | **Zod**                                                                                                     | Kiểm tra dữ liệu ở pipeline và kiểm tra response của PubChem                                                                                                                                                             |
| PWA                           | **Serwist** (`@serwist/next`)                                                                               | Precache dữ liệu lõi và ảnh thu nhỏ                                                                                                                                                                                      |
| Backend                       | **Không có**                                                                                                | Xem mục 13                                                                                                                                                                                                               |
| Lint/format | **ESLint 10** (flat config: typescript-eslint, react-hooks v7, @next/eslint-plugin-next, simple-import-sort) + **Prettier** (plugin sắp xếp class Tailwind) | Thay Biome (2026-11-09) để có rule react-hooks/React Compiler và rule của Next. Cấu hình Prettier theo phong cách project decipher |
| Test                          | **Vitest** (+ fast-check cho property test), **Testing Library**, **Playwright** (e2e + so sánh screenshot) |                                                                                                                                                                                                                          |
| Storybook                     | **Storybook 8+** (tuỳ chọn)                                                                                 | Phát triển riêng lẻ ô nguyên tố, các viewer                                                                                                                                                                              |
| CI/CD                         | **GitHub Actions** + host tĩnh (**Cloudflare Pages**, Netlify hoặc GitHub Pages)                            | Preview deploy cho mỗi PR; chỉ upload thư mục `out/`                                                                                                                                                                     |
| Theo dõi lỗi / analytics      | Sentry (bản browser), Plausible/Cloudflare Web Analytics (không cookie)                                     | Đều là script phía client, không cần backend riêng                                                                                                                                                                       |

> Khi `pnpm add`, lấy bản stable mới nhất và ghim version trong lockfile. Các API dưới đây viết theo hiểu biết hiện tại; trước khi code cần đối chiếu lại docs của Next.js, 3Dmol.js và RDKit.js.

---

## 2. Cấu trúc repo

```
chemistry/
├── apps/
│   └── web/                         # Next.js app
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx                         # "/" → client redirect sang /vi (không có middleware)
│       │   │   └── [locale]/                        # generateStaticParams: vi, en
│       │   │       ├── layout.tsx
│       │   │       ├── page.tsx                     # trang chủ: bảng tuần hoàn + ElementPanel (client)
│       │   │       ├── element/[symbol]/
│       │   │       │   ├── layout.tsx               # header + thanh tab
│       │   │       │   ├── page.tsx                 # tab Tổng quan
│       │   │       │   ├── images/page.tsx
│       │   │       │   ├── atom/page.tsx
│       │   │       │   ├── structure/page.tsx
│       │   │       │   ├── isotopes/page.tsx
│       │   │       │   ├── history/page.tsx
│       │   │       │   └── uses/page.tsx
│       │   │       ├── compound/[cid]/page.tsx       # SSG cho hợp chất đã tuyển
│       │   │       ├── compound/view/page.tsx        # ?cid=… hợp chất bất kỳ, tải từ PubChem phía client
│       │   │       ├── tools/
│       │   │       │   ├── balance/page.tsx
│       │   │       │   ├── molar-mass/page.tsx
│       │   │       │   ├── builder/page.tsx
│       │   │       │   ├── trends/page.tsx
│       │   │       │   ├── solubility/page.tsx
│       │   │       │   └── lab/page.tsx
│       │   │       └── learn/...
│       │   ├── components/
│       │   │   ├── periodic-table/   # PeriodicTable, ElementCell, Legend, ColorModeBar, TemperatureSlider, Table3D
│       │   │   ├── element/          # ElementHeader, PropertyGrid, MiniTable
│       │   │   ├── atom/             # BohrModel, OrbitalBoxDiagram, OrbitalCloud, OrbitalPicker
│       │   │   ├── molecule/         # MoleculeViewer, CrystalViewer, Structure2D
│       │   │   ├── tools/            # Balancer, MolarMass, ...
│       │   │   ├── search/           # CommandPalette
│       │   │   └── ui/               # shadcn
│       │   ├── workers/orbital.worker.ts
│       │   ├── lib/                  # color scales, search index, url state, pubchem client
│       │   ├── stores/
│       │   └── messages/             # vi.json, en.json (chữ trên giao diện)
│       ├── public/
│       │   ├── images/elements/{symbol}/...   # ảnh đã tối ưu (avif/webp)
│       │   └── structures/                    # .sdf, .cif tĩnh
│       └── e2e/
├── packages/
│   ├── core/                        # @chem/core — TS thuần, không có DOM
│   │   └── src/
│   │       ├── formula/             # tokenizer, parser, composition, molar mass
│   │       ├── equation/            # parser phương trình, balancer, giải thích redox
│   │       ├── rational/            # số hữu tỉ dùng BigInt
│   │       ├── electron/            # thứ tự Madelung, ngoại lệ, sơ đồ ô, ion
│   │       ├── orbital/             # Laguerre, hàm cầu thực, ψ, sampler
│   │       ├── nuclear/             # phân rã, bán rã
│   │       └── index.ts
│   └── data/                        # @chem/data
│       ├── scripts/                 # fetch-*.ts, merge.ts, validate.ts, build.ts
│       ├── raw/                     # dữ liệu tải về (gitignored hoặc commit snapshot)
│       ├── curated/                 # do người viết: tên vi, mô tả, chương trình học, phản ứng, ảnh
│       │   ├── elements.vi.yaml
│       │   ├── compounds.yaml       # danh sách hợp chất tiêu biểu theo nguyên tố
│       │   ├── reactions.yaml
│       │   └── images.yaml          # metadata giấy phép ảnh
│       ├── src/schema.ts            # Zod schema = nguồn duy nhất cho type
│       └── dist/                    # JSON sinh ra + .d.ts (được web import)
├── docs/
├── pnpm-workspace.yaml
└── .github/workflows/ci.yml
```

---

## 3. Tầng dữ liệu (`@chem/data`)

### 3.1 Pipeline

```
fetch-pubchem.ts       → raw/pubchem-periodic.json
fetch-bowserinator.ts  → raw/bowserinator.json            (xpos/ypos, shells, ...)
fetch-isotopes.ts      → raw/isotopes.csv                 (IAEA LiveChart API)
fetch-spectra.ts       → raw/spectra/{symbol}.csv         (NIST ASD, chỉ các vạch mạnh)
fetch-compounds.ts     → public/structures/{cid}.sdf      (PubChem SDF 3D, có fallback về 2D)
fetch-crystals.ts      → public/structures/crystals/*.cif (COD theo ID đã chọn sẵn)
merge.ts               → gộp raw + curated → validate bằng Zod → dist/*.json
```

- Chạy bằng `pnpm --filter @chem/data build`. Các bước fetch phải **idempotent** và **commit snapshot** của `raw/`, để build không phụ thuộc vào việc mạng hay API bên ngoài còn sống.
- Throttle 4 request/giây với PubChem (giới hạn của họ là 5 request/giây); dùng `p-limit` và retry với backoff.
- **Lưu ý:** PubChem **không có conformer 3D** cho nhiều chất vô cơ hoặc ion (ví dụ NaCl, muối). Với các chất này:
  - tinh thể ion thì dùng **CIF từ COD**;
  - phân tử nhỏ không có 3D thì tải SDF 2D, rồi dựng 3D lúc build (RDKit ETKDG qua Python script, hoặc RDKit.js nếu bản WASM có hỗ trợ). Nếu vẫn không được thì đánh dấu `has3d: false`.
- `merge.ts` phải báo lỗi rõ ràng khi các nguồn lệch nhau quá ngưỡng (ví dụ khối lượng nguyên tử chênh > 0.01), và chọn nguồn ưu tiên theo cấu hình.

### 3.2 Schema (nguồn duy nhất cho type)

```ts
// packages/data/src/schema.ts
import { z } from "zod";

export const Category = z.enum([
  "alkali-metal",
  "alkaline-earth-metal",
  "transition-metal",
  "post-transition-metal",
  "metalloid",
  "nonmetal",
  "halogen",
  "noble-gas",
  "lanthanide",
  "actinide",
  "unknown",
]);

export const ImageMeta = z.object({
  src: z.string(), // /images/elements/fe/sample.avif
  width: z.number(),
  height: z.number(),
  credit: z.string(),
  license: z.enum(["CC0", "PD", "CC-BY-3.0", "CC-BY-4.0", "CC-BY-SA-3.0", "CC-BY-SA-4.0"]),
  sourceUrl: z.string().url(),
  kind: z.enum(["sample", "mineral", "application", "flame", "discharge"]),
});

export const Isotope = z.object({
  massNumber: z.number().int(),
  abundance: z.number().nullable(), // %, null nếu là đồng vị nhân tạo
  halfLifeSeconds: z.number().nullable(), // null = bền
  decayModes: z.array(z.string()),
});

export const Element = z.object({
  z: z.number().int().min(1).max(118),
  symbol: z.string().regex(/^[A-Z][a-z]?$/),
  slug: z.string(), // "fe"
  name: z.object({ vi: z.string(), en: z.string(), viAlt: z.string().optional() }),
  atomicMass: z.number(),
  category: Category,
  block: z.enum(["s", "p", "d", "f"]),
  group: z.number().int().min(1).max(18).nullable(),
  period: z.number().int().min(1).max(7),
  grid: z.object({ x: z.number().int(), y: z.number().int() }), // vị trí trong layout 18 cột
  electronConfig: z.string(), // dạng chuẩn, kiểm tra chéo với @chem/core
  shells: z.array(z.number().int()),
  oxidationStates: z.array(z.number().int()),
  electronegativity: z.number().nullable(),
  atomicRadiusPm: z.number().nullable(),
  ionizationEnergies: z.array(z.number()), // kJ/mol
  electronAffinity: z.number().nullable(),
  meltingPointK: z.number().nullable(),
  boilingPointK: z.number().nullable(),
  densityGcm3: z.number().nullable(),
  phaseAtSTP: z.enum(["solid", "liquid", "gas", "unknown"]),
  crystalStructure: z.string().nullable(),
  discovery: z.object({ year: z.number().nullable(), by: z.string().nullable() }),
  abundance: z.object({
    crust: z.number().nullable(),
    universe: z.number().nullable(),
    human: z.number().nullable(),
  }),
  origin: z.array(
    z.enum([
      "big-bang",
      "low-mass-stars",
      "massive-stars",
      "supernova",
      "neutron-star-merger",
      "cosmic-ray",
      "synthetic",
    ]),
  ),
  isotopes: z.array(Isotope),
  images: z.array(ImageMeta),
  allotropes: z.array(
    z.object({
      id: z.string(),
      name: z.object({ vi: z.string(), en: z.string() }),
      file: z.string(),
      format: z.enum(["sdf", "cif", "xyz"]),
    }),
  ),
  keyCompounds: z.array(z.number().int()), // CID, tham chiếu sang compounds.json
});
export type Element = z.infer<typeof Element>;
```

Output của pipeline:

- `dist/elements.json`: chỉ chứa **trường "lite"** cần cho bảng (z, symbol, name, mass, category, block, grid, phase, mp/bp, en, radius...), khoảng 30–40 KB gzip. Trang chủ import file này.
- `dist/elements/{slug}.json`: dữ liệu đầy đủ + nội dung vi/en, chỉ trang chi tiết mới import.
- `dist/compounds.json`, `dist/reactions.json`, `dist/spectra/{slug}.json`, `dist/search-index.json`.

### 3.3 Test dữ liệu (`packages/data/test/`)

- Có đủ 118 nguyên tố, `z` liên tục từ 1 đến 118, `symbol` không trùng, `grid` không trùng.
- `electronConfig` trong dữ liệu khớp với `@chem/core` `electronConfiguration(z)` (bao gồm cả ngoại lệ).
- Tổng `shells` = `z`.
- Mọi ảnh đều có license thuộc danh sách cho phép, và file ảnh tồn tại.
- Mọi `keyCompounds` đều có file cấu trúc, hoặc `has3d: false`.

---

## 4. `@chem/core`: logic hoá học

Đây là TypeScript thuần, xuất ra cả ESM lẫn type. Mục tiêu coverage > 95%.

### 4.1 Số hữu tỉ BigInt

```ts
// packages/core/src/rational/index.ts
export class Q {
  private constructor(
    readonly n: bigint,
    readonly d: bigint,
  ) {}
  static of(n: bigint | number, d: bigint | number = 1n): Q {
    let N = BigInt(n),
      D = BigInt(d);
    if (D === 0n) throw new RangeError("division by zero");
    if (D < 0n) {
      N = -N;
      D = -D;
    }
    const g = gcd(N < 0n ? -N : N, D);
    return new Q(N / g, D / g);
  }
  add(o: Q) {
    return Q.of(this.n * o.d + o.n * this.d, this.d * o.d);
  }
  sub(o: Q) {
    return Q.of(this.n * o.d - o.n * this.d, this.d * o.d);
  }
  mul(o: Q) {
    return Q.of(this.n * o.n, this.d * o.d);
  }
  div(o: Q) {
    return Q.of(this.n * o.d, this.d * o.n);
  }
  isZero() {
    return this.n === 0n;
  }
}
export const gcd = (a: bigint, b: bigint): bigint => (b === 0n ? a : gcd(b, a % b));
export const lcm = (a: bigint, b: bigint) => (a / gcd(a, b)) * b;
```

### 4.2 Phân tích công thức hoá học

Ngữ pháp (EBNF):

```
formula   := part (HYDRATE part)* charge?
part      := coef? group+
group     := ( ELEMENT | "(" group+ ")" | "[" group+ "]" ) count?
coef      := DIGITS                 // dùng cho hydrat: CuSO4·5H2O
count     := DIGITS
charge    := "^"? DIGITS? ("+" | "-")   // SO4^2-, Fe3+, NH4+
HYDRATE   := "·" | "." | "*"
ELEMENT   := [A-Z][a-z]?             // kiểm tra với danh sách 118 ký hiệu
```

API:

```ts
export interface ParsedFormula {
  composition: Map<string, number>; // { Cu: 1, S: 1, O: 9, H: 10 }
  charge: number;
  normalized: string; // "CuSO4·5H2O"
}
export function parseFormula(input: string): Result<ParsedFormula, FormulaError>;
export function molarMass(f: ParsedFormula, masses: Record<string, number>): number;
export function massPercent(f: ParsedFormula, masses: Record<string, number>): Record<string, number>;
```

- Viết tokenizer + recursive descent tay (không dùng parser generator) để có **thông báo lỗi kèm vị trí** (`{ index, message }`) và gạch chân được chỗ sai trên UI.
- Trường hợp đặc biệt: `Fe3+` là ion của Fe, không phải 3 nguyên tử Fe. Quy ước: chữ số đứng ngay trước dấu `+`/`-` ở cuối chuỗi là điện tích. Viết `Fe^3+` để rõ ràng; còn ion có số lượng thì viết `Fe2^...`. Cần test kỹ phần này.
- Hỗ trợ `e-` (electron) trong bán phản ứng.
- Mapping chuỗi kiểu `"Hg2^2+"` sang hiển thị có chỉ số trên/dưới: hàm `toDisplay(formula): Token[]` để UI render `<sub>`/`<sup>`.

### 4.3 Cân bằng phương trình

```ts
export interface BalanceResult {
  coefficients: bigint[]; // theo thứ tự chất trong phương trình
  steps: BalanceStep[]; // để UI hiển thị từng bước giải
  method: "matrix";
}
export function balance(equation: string): Result<BalanceResult, BalanceError>;
```

Thuật toán:

1. Tách vế theo `->`, `=`, `→`; tách chất theo `+` (chú ý `+` trong điện tích, nên tách theo `+` có khoảng trắng hoặc tách theo token).
2. Ma trận `A` có kích thước (số nguyên tố + 1 hàng điện tích) × (số chất). Cột chất tham gia mang dấu `+`, cột sản phẩm mang dấu `−`.
3. Đưa `A` về dạng RREF trên `Q` để tìm cơ sở của **không gian null**.
   - `nullity = 0` → báo lỗi "không cân bằng được" (ví dụ phương trình sai chất).
   - `nullity > 1` → báo lỗi "có nhiều tổ hợp độc lập". Đây thường là 2 phản ứng gộp chung; gợi ý người dùng tách ra. Có thể đưa ra một nghiệm nguyên dương nhỏ nhất bằng cách tìm kiếm có giới hạn, nhưng phải kèm cảnh báo.
   - `nullity = 1` → lấy vector, nhân với BCNN của các mẫu số, chia cho ƯCLN, rồi đổi dấu sao cho tất cả dương. Nếu vẫn có hệ số ≤ 0 thì báo lỗi (một chất bị đặt sai vế).
4. `steps` ghi lại: ma trận ban đầu → các phép biến đổi hàng → nghiệm. UI hiện dạng bảng.

**Giải thích theo phương pháp thăng bằng electron** (module riêng `equation/redox.ts`):

- Gán số oxi hoá cho từng nguyên tố trong từng chất theo bộ quy tắc: O = −2 (trừ peroxide và OF₂), H = +1 (trừ hydride kim loại), F = −1, kim loại kiềm = +1, kiềm thổ = +2; phần còn lại giải từ ràng buộc tổng = điện tích.
- Khi chất có nhiều nguyên tố "không xác định" thì không gán; khi đó chỉ hiển thị phương pháp ma trận. Ví dụ: hợp chất hữu cơ thì dùng số oxi hoá trung bình, có ghi chú.
- So sánh hai vế để tìm chất khử và chất oxi hoá, tính số e nhường/nhận, nhân chéo hệ số. Kết quả **phải khớp** với nghiệm ma trận; nếu lệch thì chỉ hiện nghiệm ma trận.

Property test (fast-check): tạo phương trình ngẫu nhiên từ các phản ứng đã biết, xáo thứ tự chất, rồi kiểm tra kết quả cân bằng bảo toàn số nguyên tử và điện tích, và `gcd(coeffs) = 1`.

### 4.4 Cấu hình electron

```ts
export type Subshell = { n: number; l: 0 | 1 | 2 | 3; electrons: number };
export const MADELUNG: Array<[n: number, l: number]> = /* 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p */;
export const EXCEPTIONS: Record<number, Subshell[]> = {
  24: /* Cr: [Ar] 3d5 4s1 */, 29: /* Cu */, 41: /* Nb */, 42: /* Mo */, 44: /* Ru */, 45: /* Rh */,
  46: /* Pd: [Kr] 4d10 */, 47: /* Ag */, 57: /* La */, 58: /* Ce */, 64: /* Gd */, 78: /* Pt */, 79: /* Au */,
  89: /* Ac */, 90: /* Th */, 91: /* Pa */, 92: /* U */, 93: /* Np */, 96: /* Cm */, 103: /* Lr: 7p1 */,
  // đối chiếu danh sách với dữ liệu NIST trước khi chốt
};
export function electronConfiguration(z: number): Subshell[];
export function toNotation(cfg: Subshell[], opts?: { nobleGasCore?: boolean }): string; // "[Ar] 3d6 4s2"
export function orbitalBoxes(cfg: Subshell[]): Array<{ label: string; boxes: Array<[up: boolean, down: boolean]> }>; // theo Hund
export function ionConfiguration(z: number, charge: number): Subshell[];
// Cation: bỏ e ở n lớn nhất trước (4s trước 3d), rồi đến l lớn nhất. Anion: điền tiếp theo Madelung.
export function fillingSteps(z: number): FillStep[];  // phục vụ hoạt hoạ: từng e, kèm quy tắc áp dụng (Aufbau/Pauli/Hund/exception)
```

### 4.5 Hàm sóng orbital (kiểu nguyên tử hydro)

```ts
// Đa thức Laguerre liên kết, tính bằng hệ thức truy hồi:
//   L0 = 1, L1 = 1 + α − x, L_{k+1} = ((2k + 1 + α − x) L_k − (k + α) L_{k−1}) / (k + 1)
export function laguerre(k: number, alpha: number, x: number): number;

// Phần bán kính (đơn vị a0; Z_eff tuỳ chọn để orbital "co lại" một cách định tính):
//   ρ = 2 Z r / n
//   R_nl ∝ ρ^l · e^{−ρ/2} · L_{n−l−1}^{2l+1}(ρ)
export function radial(n: number, l: number, r: number, Z?: number): number;

// Hàm cầu thực (real spherical harmonics) cho l ≤ 3. Viết tay từng biểu thức theo x/r, y/r, z/r
// để đặt tên rõ ràng: px, py, pz, dxy, dxz, dyz, dx2-y2, dz2, 7 orbital f.
export function realYlm(l: number, m: number, x: number, y: number, z: number): number;

export function psi(n: number, l: number, m: number, x: number, y: number, z: number, Z?: number): number;
```

Thuật toán lấy mẫu (chạy trong `orbital.worker.ts`):

1. Hộp lấy mẫu có bán kính `rMax ≈ (n² · 2.5 + 5) / Z` (đơn vị a0). Tinh chỉnh hệ số sao cho phần lớn mật độ nằm trong hộp.
2. Ước lượng `maxDensity` bằng cách lấy khoảng 20k điểm ngẫu nhiên, lấy giá trị lớn nhất rồi nhân 1.1.
3. Rejection sampling cho đến khi đủ `N` điểm (20k–60k tuỳ máy): chọn điểm đều trong hộp, chấp nhận nếu `u · max < ψ²`.
4. Trả về `Float32Array positions` và `Uint8Array phase` (dấu của ψ) bằng **transferable** để tránh copy.
5. Dùng seed PRNG cố định (ví dụ mulberry32) để screenshot test ổn định.

Ghi chú hiển thị trên UI: "Hình dạng theo nghiệm nguyên tử hydro; kích thước chỉ mang tính định tính."

### 4.6 Hạt nhân

- `remaining(N0, halfLife, t) = N0 · 2^(−t / T½)`.
- `simulateDecay(count, halfLife, dt, rng)` sinh ra từng sự kiện rời rạc để animate một lưới hạt nhân.

---

## 5. Tầng UI (`apps/web`)

### 5.1 Bảng tuần hoàn

- **Render bằng CSS Grid** `grid-template-columns: repeat(18, minmax(0, 1fr))`, gồm 10 hàng: 7 chu kỳ, 1 hàng đệm, 2 hàng f-block. Vị trí lấy từ `element.grid`. Chế độ 32 cột dùng một map `grid32` tính sẵn ở pipeline.
- `ElementCell` dùng `React.memo`, props tối thiểu (`el`, `colorValue`, `dimmed`, `selected`). Màu được tính ở cấp bảng qua `useMemo`, chỉ phụ thuộc color mode và nhiệt độ.
- Accessibility: `role="grid"`, mỗi ô là `role="gridcell"` + `<Link>`. Hook `useRovingFocus` điều hướng bằng phím mũi tên theo lưới (chỉ nhảy tới ô có nguyên tố).
- **Hover preview**: lưu `hoveredZ` trong Zustand (không lưu trong URL), throttle bằng `requestAnimationFrame`.
- **Mở nguyên tố** (không dùng intercepting route vì static export không hỗ trợ):
  - Ô vẫn là `<a href="/vi/element/fe">` thật, để SEO, mở tab mới và chuột giữa vẫn hoạt động.
  - Trên trang chủ, `onClick` chặn điều hướng mặc định, mở `ElementPanel` (Sheet bên phải) rồi gọi `history.pushState(null, "", "/vi/element/fe")`. Lắng nghe `popstate` để nút back đóng panel.
  - Panel tải `elements/{slug}.json` bằng `fetch`/`import()` phía client.
  - Truy cập thẳng link hoặc refresh thì ra trang đầy đủ đã dựng sẵn.
  - Hiệu ứng ô phóng to dùng `motion` `layoutId={"cell-"+z}` (ô và header của panel dùng chung layoutId).

### 5.2 Chế độ màu

```ts
// lib/color-modes.ts
export type ColorMode =
  | { kind: "category" }
  | { kind: "block" }
  | { kind: "phase"; temperatureK: number }
  | { kind: "property"; key: NumericKey; scale: "linear" | "log" }
  | { kind: "discovery"; year: number }
  | { kind: "abundance"; where: "crust" | "universe" | "human" }
  | { kind: "origin" };

export function cellColor(
  el: ElementLite,
  mode: ColorMode,
): { bg: string; fg: string; value?: number; dimmed?: boolean };
```

- Với chế độ `property`: dùng thang màu liên tục có độ sáng đều về mặt cảm nhận (perceptually uniform, ví dụ `d3-scale-chromatic` interpolateViridis/Cividis); thang log cho mật độ và độ phổ biến. Ô thiếu dữ liệu tô sọc chéo (CSS `repeating-linear-gradient`).
- `fg` được tự chọn đen hoặc trắng theo độ tương phản WCAG.
- URL dùng nuqs: `?mode=property&key=electronegativity&T=298`.
- Thanh trượt nhiệt độ: slider dạng log từ 0 đến 6000 K, có các mốc (0 °C, 25 °C, 100 °C, nhiệt độ bề mặt Mặt Trời). Khi kéo chỉ đổi màu, không re-layout. Dùng `useDeferredValue` để giao diện mượt.

### 5.3 Bảng 3D ("thành phố")

- `<Canvas>` của r3f, một `InstancedMesh` gồm 118 hộp. Chiều cao bằng giá trị đã chuẩn hoá của thuộc tính đang chọn; nội suy chiều cao bằng `maath/easing.damp` khi đổi thuộc tính.
- Chữ ký hiệu: `drei <Text>` (troika). Nếu tốn tài nguyên thì chỉ hiện khi zoom gần.
- Raycast khi click vào instance → `instanceId` → điều hướng tới trang nguyên tố.
- Tải bằng `dynamic(() => import(...), { ssr: false })`.

### 5.4 Tab "Mô hình nguyên tử"

| Component           | Cách làm                                                                                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BohrModel`         | SVG. Mỗi lớp vỏ là `<circle>`; electron là `<g>` quay bằng CSS `@keyframes rotate`, mỗi lớp một tốc độ (dùng CSS thay vì JS để mượt). Hạt nhân là cụm p/n xếp xoắn ốc kiểu Fibonacci. Có chế độ "dựng nguyên tử" dùng `fillingSteps`                          |
| `OrbitalBoxDiagram` | Grid HTML; mũi tên ↑↓ animate lần lượt bằng `motion` theo `fillingSteps`. Có nút ⏮ ⏯ ⏭ và tốc độ. Mỗi bước có chú thích quy tắc đang áp dụng. Bước ngoại lệ được highlight                                                                                    |
| `MadelungDiagram`   | SVG mũi tên chéo, đồng bộ highlight với bước hiện tại                                                                                                                                                                                                         |
| `OrbitalCloud`      | r3f `<points>` với `BufferGeometry` nhận Float32Array từ worker; dùng `AdditiveBlending`, `sizeAttenuation`; màu theo pha (2 màu). `OrbitalPicker` cho chọn n/l/m hoặc chọn nhanh "orbital hoá trị của nguyên tố này". Có OrbitControls và nút "xoay tự động" |
| `IonExplorer`       | Chọn số oxi hoá → `ionConfiguration` → diff với nguyên tử trung hoà, electron bị bớt hiện mờ đi                                                                                                                                                               |

### 5.5 Tab "Phân tử & Cấu trúc": `MoleculeViewer`

```tsx
"use client";
import { useEffect, useRef } from "react";

type Props = {
  data: string;
  format: "sdf" | "cif" | "pdb" | "xyz";
  style?: ViewStyle;
  supercell?: [number, number, number];
};

export function MoleculeViewer({ data, format, style = "ballStick", supercell }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let viewer: any;
    let cancelled = false;
    (async () => {
      const $3Dmol = await import("3dmol"); // lazy, client-only
      if (cancelled || !ref.current) return;
      viewer = $3Dmol.createViewer(ref.current, { backgroundAlpha: 0 });
      const model = viewer.addModel(data, format);
      // với CIF: dùng tuỳ chọn tạo ô mạng/siêu ô (kiểm tra API addModel/replicateUnitCell/addUnitCell của bản đang dùng)
      viewer.setStyle({}, STYLES[style]);
      viewer.zoomTo();
      viewer.render();
    })();
    return () => {
      cancelled = true;
      viewer?.clear();
    };
  }, [data, format, style, supercell]);
  return <div ref={ref} className="relative aspect-square w-full" />;
}
// STYLES.ballStick = { stick: { radius: 0.15 }, sphere: { scale: 0.25 } } ; spacefill = { sphere: {} } ; ...
```

- Màu nguyên tử theo chuẩn **CPK/Jmol** (3Dmol có sẵn bộ màu `Jmol`).
- Chế độ đo: bấm 2 nguyên tử để lấy toạ độ (`setClickable`), tính khoảng cách và vẽ `addCylinder` + `addLabel`; bấm 3 nguyên tử thì đo góc.
- Hình học VSEPR: tính sẵn ở pipeline cho các hợp chất tiêu biểu (`geometry: "bent"`), không tự suy luận lúc chạy ở giai đoạn đầu.
- Dữ liệu cấu trúc đọc từ `/structures/{cid}.sdf` (tĩnh); hợp chất ngoài danh sách thì tải thẳng từ PubChem (mục 5.6).

### 5.6 Gọi PubChem từ trình duyệt (không có proxy)

```ts
// lib/pubchem.ts — gọi thẳng https://pubchem.ncbi.nlm.nih.gov/rest/pug/...
// PubChem cho phép CORS (access-control-allow-origin: *), đã kiểm tra 2026-11-09.
// Chỉ dùng các endpoint:
//   compound/name/{name}/cids/JSON
//   compound/cid/{cid}/property/{props}/JSON
//   compound/cid/{cid}/record/SDF?record_type=3d|2d
//   compound/fastformula/{formula}/cids/JSON
// Throttle phía client ≤ 4 request/giây (p-throttle hoặc tự viết hàng đợi), retry khi gặp 503/429.
// Response JSON được parse bằng Zod.
```

- Hook TanStack Query (`useCompoundByName`, `useCompoundSdf`), `staleTime: Infinity` vì dữ liệu hợp chất gần như không đổi.
- Persist cache vào IndexedDB (`@tanstack/query-async-storage-persister`) để lần sau mở lại không phải gọi mạng.
- Khi offline hoặc PubChem lỗi: hiện thông báo "Cần kết nối mạng để tra chất ngoài thư viện", còn **mọi chất đã tuyển vẫn dùng bình thường**.

### 5.7 Tìm kiếm (⌘K)

- Lúc build sinh index gồm: nguyên tố (vi, en, viAlt, symbol, z) và hợp chất đã tuyển (tên vi, tên en, công thức, tên thông dụng như "muối ăn", "xút", "vôi sống").
- `normalizeVi(s) = s.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase()`. Hàm này dùng cho cả index lẫn câu truy vấn.
- Nếu chuỗi nhập trông như công thức (khớp được bằng `parseFormula`), thêm action "Tính khối lượng mol của …" và "Tra PubChem …".
- Không có kết quả trong index thì gợi ý "Tìm trên PubChem" (gọi thẳng PubChem từ trình duyệt).

### 5.8 i18n & nội dung

- Chữ trên giao diện nằm trong `messages/{vi,en}.json` (next-intl).
- Nội dung dài (mô tả, lịch sử, ứng dụng) nằm trong `curated/content/{slug}.{vi,en}.mdx` và được biên dịch lúc build (dùng `@next/mdx` hoặc `next-mdx-remote/rsc`). Trong MDX có thể nhúng component như `<Reaction eq="2Na + 2H2O -> 2NaOH + H2" />`, `<Element sym="Cl" />`.
- Ưu tiên viết nội dung cho khoảng 30 nguyên tố trong chương trình học trước. Nguyên tố chưa có nội dung vi thì hiện bản en, có badge "Chưa dịch".

### 5.9 Theme & design token

```css
/* globals.css (Tailwind v4 @theme) */
@theme {
  --color-cat-alkali: oklch(0.72 0.17 25);
  --color-cat-alkaline: oklch(0.8 0.14 70);
  --color-cat-transition: oklch(0.75 0.1 250);
  /* ... mỗi category 1 token, có biến thể dark mode */
}
```

Bảng màu category phải được kiểm tra với các dạng mù màu (protanopia/deuteranopia); mỗi category có thêm hoa văn nhỏ ở góc ô để không phải dựa hoàn toàn vào màu.

### 5.10 PWA / offline

- Serwist precache: app shell, `elements.json`, toàn bộ `elements/{slug}.json`, ảnh thu nhỏ (khoảng 118 ảnh × 10 KB).
- Runtime cache (StaleWhileRevalidate): ảnh lớn, `/structures/*`, response từ `pubchem.ncbi.nlm.nih.gov`.
- Có trang "Tải gói offline" để tải trước toàn bộ cấu trúc 3D, kèm thanh tiến trình.

### 5.11 Ràng buộc của static export (checklist)

| Tính năng Next.js                  | Trạng thái            | Thay bằng                                                                                                                                                           |
| ---------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Route Handler (`app/api/*`)        | ❌ không dùng         | Gọi thẳng PubChem từ client                                                                                                                                         |
| Middleware (dò ngôn ngữ, redirect) | ❌                    | `app/page.tsx` client redirect dựa trên `navigator.language`; mọi route đều có tiền tố `/vi` hoặc `/en`; next-intl dùng `setRequestLocale` + `generateStaticParams` |
| Intercepting / parallel route      | ❌                    | `ElementPanel` client + `history.pushState` (5.1)                                                                                                                   |
| ISR, `dynamicParams` cho route lạ  | ❌                    | Hợp chất ngoài danh sách dùng `/compound/view?cid=…` đọc `useSearchParams` phía client                                                                              |
| `next/image` tối ưu lúc chạy       | ❌                    | Pipeline tối ưu ảnh bằng sharp (avif/webp, 3 kích thước), `images.unoptimized: true` hoặc custom loader trỏ tới các file đã sinh sẵn                                |
| Server Components                  | ✅ chỉ chạy lúc build | Dùng để render nội dung tĩnh (MDX, bảng dữ liệu)                                                                                                                    |
| `trailingSlash`                    | đặt `true`            | Để host tĩnh nào cũng phục vụ đúng `/vi/element/fe/index.html`                                                                                                      |

---

## 6. Hiệu năng (budget)

| Chỉ số                                           | Mục tiêu                                                 |
| ------------------------------------------------ | -------------------------------------------------------- |
| JS trang chủ (gzip, first load)                  | ≤ 150 KB                                                 |
| LCP trang chủ (4G, máy tầm trung)                | ≤ 2.0 s                                                  |
| INP khi kéo thanh nhiệt độ                       | ≤ 100 ms                                                 |
| Mở tab Mô hình nguyên tử → hiện orbital đầu tiên | ≤ 800 ms (dùng worker; hiện skeleton trong lúc chờ)      |
| FPS khi xoay orbital 40k điểm                    | ≥ 50 trên laptop tầm trung, tự giảm số điểm nếu thấp hơn |

Công cụ: `@next/bundle-analyzer`, Lighthouse CI trong GitHub Actions, `r3f-perf` khi dev.

---

## 7. Chiến lược test

| Tầng         | Công cụ                                                    | Nội dung                                                                                                                                                                                                                                        |
| ------------ | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@chem/core` | Vitest + fast-check                                        | Parser (khoảng 100 case, cả case lỗi), balancer (khoảng 60 phương trình SGK + property test), cấu hình e cho đủ 118 nguyên tố so với bảng chuẩn, ion, chuẩn hoá orbital (tích phân Monte Carlo của ψ² ≈ 1), nút (node) của orbital nằm đúng chỗ |
| `@chem/data` | Vitest                                                     | Kiểm tra toàn vẹn dữ liệu (mục 3.3)                                                                                                                                                                                                             |
| Component    | Vitest + Testing Library                                   | ElementCell, điều hướng bàn phím, ColorModeBar cập nhật URL, Balancer UI hiện lỗi đúng vị trí                                                                                                                                                   |
| E2E          | Playwright, chạy trên **bản build tĩnh** (`npx serve out`) | Mở trang chủ → bấm Fe → panel → chuyển tab → refresh vẫn đúng trang → back đóng panel; tìm "muoi an" ra NaCl; cân bằng phương trình KMnO₄ + HCl; tiến độ học còn nguyên sau khi tải lại trang                                                   |
| Visual       | Playwright `toHaveScreenshot`                              | Bảng ở từng chế độ màu, dark/light; viewer 3D chụp sau khi render xong (dùng seed cố định)                                                                                                                                                      |
| a11y         | `@axe-core/playwright`                                     | Trang chủ, trang nguyên tố, các công cụ                                                                                                                                                                                                         |

---

## 8. CI/CD

```yaml
# .github/workflows/ci.yml (tóm tắt)
on: [pull_request, push]
jobs:
  check:
    steps:
      - pnpm install --frozen-lockfile
      - pnpm lint && pnpm typecheck && pnpm test
      - pnpm --filter @chem/data validate # không fetch, chỉ validate snapshot
      - pnpm --filter web build # output: "export" → apps/web/out
      - pnpm --filter web exec playwright test # chạy trên out/
      - lighthouse-ci (trang chủ + /vi/element/fe)
      - deploy out/ lên Cloudflare Pages (wrangler pages deploy) hoặc GitHub Pages
```

- Preview cho mỗi PR, production khi merge vào `main`. Không có server, biến môi trường bí mật hay database để quản lý.
- Cron hàng tháng chạy lại `fetch-*` và tự mở PR "data refresh" kèm bản diff.

---

## 9. Milestones

Thời lượng ước tính cho 1 dev làm part-time khoảng 15–20 giờ/tuần. Mỗi milestone kết thúc bằng một bản deploy.

### M0: Khởi tạo (≈ 1 tuần)

- [ ] `pnpm create next-app apps/web` (TS, App Router, Tailwind, src/), cấu hình pnpm workspace
- [ ] Tạo package `@chem/core` (tsup hoặc chỉ dùng `tsc`, export ESM) và `@chem/data`
- [ ] Biome/ESLint, `tsconfig.base.json` strict, path alias
- [ ] shadcn init (Button, Tabs, Dialog, Sheet, Slider, Command, Tooltip)
- [ ] next-intl với `[locale]`, theme sáng/tối (next-themes)
- [ ] `next.config`: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`
- [ ] Vitest, Playwright, GitHub Actions, project Cloudflare Pages (hoặc GitHub Pages)
- **DoD:** trang "Hello" deploy được dưới dạng file tĩnh; CI xanh; `pnpm test` chạy được ở cả 3 package.

### M1: Dữ liệu + Bảng tuần hoàn cơ bản (≈ 2 tuần)

- [ ] `fetch-pubchem`, `fetch-bowserinator`, `merge`, Zod schema, `dist/elements.json`
- [ ] `curated/elements.vi.yaml`: tên tiếng Việt cho 118 nguyên tố (tên SGK + tên cũ)
- [ ] `@chem/core/electron` + test cho đủ 118 nguyên tố
- [ ] `PeriodicTable` dạng CSS grid, `ElementCell`, chú giải category, responsive (cuộn ngang và chế độ danh sách trên mobile)
- [ ] Hover preview, điều hướng bàn phím
- [ ] Trang `/element/[symbol]` (SSG 118 trang) chỉ có tab Tổng quan: header + PropertyGrid + MiniTable
- [ ] `ElementPanel` mở từ trang chủ bằng `pushState`/`popstate`, có layout transition
- **DoD:** Lighthouse ≥ 90/95; e2e "bấm ô → modal → refresh" pass; dữ liệu pass toàn bộ test toàn vẹn.

### M2: Chế độ màu, tìm kiếm, so sánh (≈ 1.5 tuần)

- [x] `ColorModeBar` (tự viết URL state, không dùng nuqs); các chế độ category, block, phase (kèm slider nhiệt độ), property (EN, radius, IE1, EA, density, mp, bp), discovery (kèm slider năm)
- [x] Legend động (thang màu liên tục hoặc rời rạc), sọc chéo cho ô thiếu dữ liệu
- [x] Bảng 32 cột
- [x] CommandPalette ⌘K có xử lý dấu tiếng Việt
- [x] So sánh: Shift + click → khay so sánh → trang `/compare?z=11,19,37` có radar chart
- **DoD:** chia sẻ URL ở bất kỳ chế độ nào đều mở ra đúng trạng thái; INP khi kéo slider ≤ 100 ms.

### M3: Mô hình nguyên tử (≈ 2.5 tuần) ⭐

- [x] `BohrModel` (SVG + CSS animation), chế độ dựng nguyên tử
- [x] `fillingSteps` + `OrbitalBoxDiagram` có hoạt hoạ, `MadelungDiagram`, chú thích ngoại lệ
- [x] `@chem/core/orbital` (Laguerre, Ylm thực, ψ) + test chuẩn hoá và test nút
- [x] Worker + Comlink lấy mẫu; `OrbitalCloud` r3f, `OrbitalPicker`
- [x] `IonExplorer`
- [x] Fallback khi không có WebGL (ảnh tĩnh render sẵn)
- **DoD:** orbital 1s → 4f hiển thị đúng hình dạng (có checklist đối chiếu với hình tham khảo trong giáo trình); FPS đạt budget; giao diện không bị đứng trong lúc lấy mẫu.

### M4: Hình ảnh + Phân tử & Cấu trúc (≈ 2.5 tuần) ⭐

- [ ] `curated/images.yaml` + script tải ảnh và tối ưu (sharp → avif/webp, 3 kích thước), kiểm tra license
- [ ] Tab Hình ảnh: gallery (lightbox), dòng ghi công dưới mỗi ảnh
- [ ] `fetch-spectra` (NIST) → `SpectrumBar` (map bước sóng sang màu sRGB, vạch có độ đậm theo cường độ tương đối)
- [ ] Màu ngọn lửa: ảnh hoặc video đã tuyển, hoặc hiệu ứng shader đơn giản
- [ ] `curated/compounds.yaml` (5–10 chất cho mỗi nguyên tố trong khoảng 30 nguyên tố ưu tiên) → `fetch-compounds` → SDF tĩnh
- [ ] `fetch-crystals` (COD): bcc/fcc/hcp tiêu biểu, NaCl, kim cương, than chì
- [ ] `MoleculeViewer` (3Dmol), các kiểu hiển thị, đo khoảng cách/góc, nhãn VSEPR, siêu ô cho tinh thể
- [ ] Trang `/compound/[cid]`: SSG cho hợp chất đã tuyển; `/compound/view?cid=…` cho chất bất kỳ, tải phía client
- [ ] `lib/pubchem.ts`: gọi thẳng PubChem, throttle phía client, persist cache vào IndexedDB
- **DoD:** 30 nguyên tố ưu tiên có đủ ảnh, đơn chất 3D và ≥ 5 hợp chất; 3Dmol chỉ có trong chunk của tab Cấu trúc (kiểm tra bằng bundle analyzer).

### M5: Công cụ tính toán (≈ 2 tuần)

- [ ] `@chem/core/formula` + `molarMass`, `massPercent` + test
- [ ] Trang Molar Mass: ô nhập có highlight lỗi, biểu đồ tròn phần trăm, chuyển đổi g ↔ mol ↔ hạt ↔ V khí (có lựa chọn đktc 22,4 L hoặc đkc 24,79 L theo SGK mới)
- [ ] `@chem/core/rational` + `equation/balance` + property test
- [ ] `equation/redox` (gán số oxi hoá, thăng bằng e)
- [ ] Trang Balance: kết quả, từng bước (ma trận hoặc thăng bằng e), bấm chất để mở trang hợp chất, nút "Tính toán theo phương trình" (chất hết / chất dư)
- [ ] Bảng tính tan, dãy hoạt động kim loại (dữ liệu tuyển chọn)
- [ ] Đồ thị xu hướng: đồ thị đường theo Z, đồ thị tán xạ 2 thuộc tính
- **DoD:** 60 phương trình trong SGK cân bằng đúng; phương trình nhập sai báo lỗi dễ hiểu.

### M6: Mở rộng hình ảnh hoá (≈ 2 tuần)

- [ ] Tab Đồng vị (IAEA) + mô phỏng phân rã + bản đồ hạt nhân mini (canvas 2D)
- [ ] Tab Lịch sử: MDX cho 30 nguyên tố + trang `/timeline` (trục thời gian zoom được)
- [ ] Bảng 3D "thành phố"
- [ ] PWA offline (Serwist), trang tải gói offline
- **DoD:** chế độ máy bay vẫn mở được trang chủ, 118 trang nguyên tố và các cấu trúc đã precache.

### M7: Học tập, không cần tài khoản (≈ 2.5 tuần)

- [ ] Lớp lưu trữ `lib/storage/`: Dexie (IndexedDB) với các bảng `progress`, `srsCards`, `quizAttempts`, `favorites`, `settings`, có version để migrate schema; luôn có fallback khi IndexedDB bị chặn (chế độ ẩn danh)
- [ ] **Xuất/nhập tiến độ** ra file JSON (có version, kiểm tra bằng Zod khi nhập) để chuyển máy thủ công
- [ ] Quiz đặt nguyên tố vào bảng (drag & drop bằng `@dnd-kit`), đoán nguyên tố, thử thách cấu hình e, thử thách cân bằng
- [ ] Kỷ lục cá nhân (lưu cục bộ) thay cho bảng xếp hạng chung
- [ ] Flashcard dùng **FSRS** (`ts-fsrs`)
- [ ] Huy hiệu, chuỗi ngày học, thẻ sưu tầm (lưu cục bộ)
- [ ] Lộ trình bài học theo SGK (MDX + component tương tác)
- [ ] Chế độ giáo viên **không cần server**:
  - Trình soạn bộ câu hỏi; bộ câu hỏi được nén (`lz-string`) vào **link chia sẻ** (`/learn/quiz#q=…`), hoặc xuất ra file `.json` hay mã QR.
  - Học sinh mở link là làm bài được ngay, có màn hình kết quả để chụp hoặc gửi cho giáo viên.
  - Chế độ trình chiếu toàn màn hình.
- **DoD:** học sinh làm quiz, tải lại trang vẫn còn tiến độ; xuất file trên máy A và nhập trên máy B thì tiến độ khớp; link bộ câu hỏi mở được ở trình duyệt khác.

### M8: Trình dựng phân tử, phòng thí nghiệm ảo (≈ 3.5 tuần)

- [ ] Trình dựng phân tử: canvas 2D (Konva hoặc SVG tự viết), các thao tác thêm nguyên tử/liên kết; RDKit.js để kiểm tra hoá trị, sinh SMILES/InChIKey. Nhận dạng chất: tra bảng InChIKey của thư viện đã tuyển (offline) trước, nếu không có thì gọi PubChem. Dựng 3D: dùng RDKit.js nếu bản WASM hỗ trợ embed 3D, nếu không thì gọi PubChem để lấy SDF 3D theo CID; nếu cả hai đều không được thì chỉ hiện 2D (**không** dùng server riêng)
- [ ] Phòng thí nghiệm ảo: `reactions.yaml` (chất tham gia, điều kiện, hiện tượng: màu, kết tủa, khí, nhiệt); scene r3f cho ống nghiệm, chất lỏng (shader màu + hiệu ứng trộn), particle bọt khí và kết tủa
- **DoD:** dựng ethanol và nhận dạng đúng (cả khi offline vì ethanol có trong thư viện); 50 phản ứng trong lab chạy đúng hiện tượng.

**Tổng ước tính:** khoảng 19–22 tuần part-time cho M0–M8. MVP công khai được sau **M4** (khoảng 10–11 tuần).

---

## 10. Quy ước code

- Component server là mặc định; chỉ đặt `"use client"` ở component lá cần tương tác hoặc 3D.
- Không import `three`, `3dmol` hay `@rdkit/rdkit` ở cấp module trong component server; luôn dùng `dynamic` hoặc `await import`.
- Mọi dữ liệu từ bên ngoài (PubChem, file YAML) đều phải đi qua Zod trước khi dùng.
- `@chem/core` trả về `Result<T, E>` thay vì throw, để UI hiện lỗi có cấu trúc. Có thể tự viết type `Result` hoặc dùng `neverthrow`.
- Đơn vị ghi rõ trong tên trường (`meltingPointK`, `atomicRadiusPm`). UI chuyển đổi đơn vị qua `lib/units.ts`.
- Đặt tên commit theo Conventional Commits; dùng changesets nếu sau này publish `@chem/core`.

---

## 11. Rủi ro kỹ thuật & phương án dự phòng

| Rủi ro                                                            | Phương án                                                                                                                                     |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Thiếu conformer 3D trên PubChem                                   | CIF từ COD cho tinh thể; RDKit ETKDG lúc build; cờ `has3d`                                                                                    |
| 3Dmol.js khó tích hợp với SSR/ESM                                 | Client-only + dynamic import; nếu vẫn lỗi thì nạp bản UMD qua `<Script>` từ `/public`                                                         |
| RDKit WASM nặng (vài MB)                                          | Chỉ tải ở trang builder, cache bằng service worker                                                                                            |
| Ngoại lệ cấu hình e còn tranh cãi (La/Ce/Lr...)                   | Lấy NIST làm chuẩn, ghi chú "theo NIST"                                                                                                       |
| Giới hạn tốc độ của PubChem hoặc PubChem đổi chính sách CORS      | Snapshot lúc build cho mọi chất đã tuyển; cache IndexedDB và throttle phía client; nếu mất CORS thì chỉ mất tính năng tra chất ngoài thư viện |
| Panel `pushState` lệch trạng thái với URL (back/forward, refresh) | Viết e2e sớm (M1) cho luồng panel ↔ trang đầy đủ ↔ back/refresh                                                                               |
| Người dùng mất tiến độ khi xoá dữ liệu trình duyệt                | Gọi `navigator.storage.persist()`; nhắc xuất file định kỳ; nói rõ trên giao diện rằng dữ liệu chỉ lưu trên máy này                            |
| Phạm vi quá lớn                                                   | Bám milestone; mọi thứ ngoài M0–M4 chỉ làm sau khi MVP đã ra mắt                                                                              |

---

## 12. Việc làm ngay (tuần này)

1. Khởi tạo repo theo M0.
2. Viết `packages/data/src/schema.ts` và `fetch-pubchem.ts`, chạy thử và commit snapshot.
3. Viết `@chem/core/electron` + test 118 nguyên tố. Đây là phần lõi, dùng ở nhiều nơi.
4. Dựng `PeriodicTable` tĩnh với dữ liệu thật.

---

## 13. Ngoài phạm vi bản hiện tại

Bản hiện tại là **web tĩnh 100%**: không backend, không database, không tài khoản, không có bí mật (secret) nào phía server. Các tính năng dưới đây **không làm** ở bản này. Chúng chỉ được ghi lại để kiến trúc không chặn đường bổ sung sau này.

| Tính năng                                           | Vì sao cần server                                | Bản hiện tại làm thay bằng                                                  |
| --------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| Tài khoản, đăng nhập                                | Cần xác thực và lưu trữ phía server              | Không cần đăng nhập; mọi chức năng đều mở                                   |
| Đồng bộ tiến độ giữa thiết bị                       | Cần database                                     | IndexedDB + xuất/nhập file JSON                                             |
| Lớp học, mã lớp, giáo viên xem kết quả của học sinh | Cần database và phân quyền                       | Bộ câu hỏi chia sẻ qua link hoặc file; học sinh tự gửi màn hình kết quả     |
| Bảng xếp hạng chung                                 | Cần server ghi điểm (và chống gian lận)          | Kỷ lục cá nhân lưu cục bộ                                                   |
| Trợ lý AI hoá học (Claude API)                      | Phải giấu API key ở server, rate limit theo user | Không có. Các công cụ tính toán và nội dung giải thích từng bước vẫn đầy đủ |
| Proxy và cache PubChem dùng chung                   | Cần server và Redis                              | Gọi PubChem trực tiếp, cache trên từng trình duyệt                          |
| Báo lỗi nội dung lưu vào database                   | Cần endpoint                                     | Nút "Báo lỗi" mở GitHub Issue hoặc Google Form điền sẵn thông tin           |

**Để mở đường cho sau này** (không tốn thêm công bây giờ):

- Mọi truy cập dữ liệu cá nhân đều đi qua interface `ProgressStore` (`lib/storage/`). Sau này chỉ cần thêm `RemoteProgressStore` mà không phải sửa UI.
- Logic tính toán nằm trong `@chem/core`, có thể dùng lại làm "tool" cho trợ lý AI.
- Format file xuất tiến độ có `version`, có thể dùng luôn làm format import khi có tài khoản.

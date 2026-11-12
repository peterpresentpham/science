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
  - **Deploy:** chưa dựng CI/CD. Site là thư mục tĩnh `apps/web/out`, đưa lên host nào cũng được; cần đặt `NEXT_PUBLIC_SITE_URL` (và `NEXT_PUBLIC_BASE_PATH` nếu host dưới đường dẫn con) khi build.
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
- **M3: xong code** (2026-11-09), **sửa lại 2026-11-10**. **Chưa chạy test, chưa xem trên trình duyệt, chưa đo FPS.** Nằm trong "Góc học hoá" của trang nguyên tố, thẻ 01–02.
  - **2026-11-10, theo góp ý người dùng: bỏ "Dựng nguyên tử từng electron" và "Hình dạng orbital"** (dựng từng electron chỉ là thêm dần electron, các đám mây orbital nhìn na ná nhau). Thay bằng:
  - **Cấu tạo nguyên tử 3D** (`AtomStructure` + `AtomModel3D`, three.js tải khi thẻ sắp lọt vào màn hình; lúc chờ và khi không có WebGL thì hiện `BohrModel` 2D):
    - Hạt nhân xếp từ A quả cầu: lấy A điểm gần tâm nhất của mạng lập phương tâm mặt nên thành khối cầu đặc; proton và nơtron trộn ngẫu nhiên theo seed Z (ổn định giữa các lần tải).
    - Các lớp electron là vòng tròn hơi nghiêng khác nhau, electron quay quanh (lớp trong nhanh hơn, xen kẽ chiều). Giảm chuyển động thì đứng yên.
    - Nút "Cả nguyên tử" / "Cận hạt nhân" (camera trượt tới), tự xoay, kéo để xoay, cuộn để phóng to. Trỏ vào một lớp ở chú thích thì lớp đó nổi lên trên mô hình.
    - Bên cạnh: ký hiệu nguyên tử ᴬ_Z X, số proton / nơtron / electron, `A = Z + N`, ghi chú đồng vị.
    - Màu: electron / proton / nơtron = `--series-1/2/3` (bộ đã kiểm định mọi cặp); màu xám cho nơtron không qua kiểm định (trông như màu trơn, sát màu electron ở nền tối).
  - **Số nơtron**: `representativeMassNumber(z)` trong `@chem/core` (nuclear.ts): đồng vị phổ biến nhất trong tự nhiên; nguyên tố phóng xạ thì lấy đồng vị sống lâu nhất đã biết. Bảng 118 số khối tự soạn, **cần rà lại**. Test: `packages/core/test/nuclear-counts.test.ts`.
  - **Ion** (`IonExplorer`): giữ nguyên. Chọn trong các số oxi hoá có trong dữ liệu; electron bị lấy đi hiện mờ, gạch ngang; electron nhận thêm được làm nổi bật.
  - Đã xoá: `AtomBuilder`, `MadelungDiagram`, `OrbitalSection`, `OrbitalCloud`, worker orbital và script esbuild (`build-worker`). Module `@chem/core/orbital` và test của nó vẫn còn trong core nhưng web không dùng nữa.
- **SEO** (2026-11-10). Lint, typecheck, build qua; chưa chạy Lighthouse.
  - Metadata dùng chung `pageMetadata()` (`apps/web/src/lib/seo.ts`): title (template "… · Nguyên tố"), description riêng cho từng trang, canonical, hreflang vi/en/x-default, Open Graph, Twitter card. Chuỗi trong `meta.*` của messages.
  - Ảnh OG 1200×630 sinh lúc build bằng `next/og` qua route `app/og/[locale]/[file]` → file `.png` thật (`/og/vi/fe.png`, `/og/vi/site.png`); 238 ảnh. Không dùng `opengraph-image.tsx` vì khi export tĩnh Next ghi ra file không có đuôi. Font Be Vietnam Pro (OFL) dạng TTF ở `src/assets/fonts`.
  - `sitemap.xml` (254 URL, có hreflang), `robots.txt`, `manifest.webmanifest`, favicon mới (mô hình Bohr của C, không chứa chữ nên đổi tên không ảnh hưởng): `icon.svg`, `favicon.ico` 16/32/48, `apple-icon.png`, icon 192/512 + maskable.
  - JSON-LD: `WebSite` (trang chủ), `BreadcrumbList` (trang nguyên tố, công cụ), `WebApplication` (từng công cụ). Trang 404 có `noindex`.
  - Biến môi trường khi build production: `NEXT_PUBLIC_SITE_URL` (bắt buộc, thiếu sẽ cảnh báo), `NEXT_PUBLIC_BASE_PATH`, tuỳ chọn `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
  - Hạn chế: nếu host dưới đường dẫn con (`github.io/science/`), Google không đọc `robots.txt` ở đó; hãy gửi sitemap thủ công trong Search Console.
- **DoD:** chia sẻ URL ở bất kỳ chế độ nào đều mở ra đúng trạng thái; INP khi kéo slider ≤ 100 ms.

### M3: Mô hình nguyên tử (≈ 2.5 tuần) ⭐

- [x] `BohrModel` (SVG + CSS animation), dùng làm hình chờ và fallback
- [x] ~~`fillingSteps` + `OrbitalBoxDiagram` có hoạt hoạ, `MadelungDiagram`~~: đã làm rồi bỏ (2026-11-10); `OrbitalBoxDiagram` vẫn dùng trong Ion
- [x] `@chem/core/orbital` (Laguerre, Ylm thực, ψ) + test (giữ trong core, web không dùng)
- [x] ~~Worker lấy mẫu + `OrbitalCloud`~~: đã làm rồi bỏ (2026-11-10)
- [x] **Thay thế:** mô hình 3D cấu tạo nguyên tử (hạt nhân p + n, các lớp electron) + số p / n / e
- [x] `IonExplorer`
- [x] Fallback khi không có WebGL (sơ đồ Bohr 2D)
- **DoD (sửa):** 118 nguyên tố đều hiện đúng số p, n, e và số lớp; FPS ổn định trên điện thoại tầm trung với Og (294 nucleon, 7 lớp).

### M4: Hình ảnh + Phân tử & Cấu trúc (≈ 2.5 tuần) ⭐

> Trạng thái (2026-11-10): **xong code, trừ thư viện ảnh**. Lint, typecheck, build qua; **chưa chạy test, chưa xem trên trình duyệt**.

- [x] Thư viện ảnh trên trang nguyên tố (lưới + hộp xem lớn): GPT chọn 90 ảnh Commons cho 30 nguyên tố ưu tiên (`curated/gallery.ts`, kiểm bằng `scripts/check-gallery.ts`); `scripts/gallery-images.ts` tải và nén WebP (1000 px + 360 px vuông) vào `images/gallery/` (đã commit, 7,4 MB); `build.ts` gắn `gallery` vào dữ liệu nguyên tố; component `ElementGallery`; gói offline `gallery` (7,1 MB). Chưa có test e2e cho phần này.
- [x] `fetch-spectra` (NIST ASD, nguyên tử trung hoà, 380–750 nm, tối đa 60 vạch mạnh nhất) → `raw/spectra.json` (97 nguyên tố, 64 KB) → `SpectrumBar` (bước sóng → sRGB, độ đậm theo √cường độ, có dải phổ liên tục để so sánh, hover xem bước sóng).
- [x] Màu ngọn lửa: hiệu ứng SVG + CSS (`FlameTest`), dữ liệu tuyển `curated/flame.ts` (13 nguyên tố), đánh dấu vạch tạo màu trên phổ.
- [x] `curated/compounds.ts` (~150 chất, ≥ 5 chất cho mỗi nguyên tố trong 30 nguyên tố ưu tiên) → `fetch-compounds` (kiểm tra thành phần với PubChem) → `compounds/index.json` + `compounds/sdf/*.sdf` (161 chất kể cả phân tử đơn chất, 700 KB, commit sẵn).
  - 117/161 chất PubChem chỉ có SDF 2D (muối, hợp chất ion): trình xem ghi chú rõ; 20 hợp chất ion kinh điển có thêm mạng tinh thể (`curated/compound-crystals.ts`).
- [x] **Khác kế hoạch:** không dùng `fetch-crystals` (COD). Mạng tinh thể dựng bằng `@chem/core/crystal` từ kiểu mạng + hằng số mạng (bcc, fcc, hcp, kim cương, than chì, mặt thoi, NaCl, CsCl, ZnS, CaF₂, B₁₂). Cơ sở đơn giản, viết tay chính xác hơn và không phải tải CIF. Đơn chất có cấu trúc: `curated/structures.ts` (~55 nguyên tố). Bo, Mn, Hg dùng dạng gần đúng, có ghi rõ trên nhãn.
- [x] `StructureViewer` + `Mol3D` (3Dmol.js 2.5.4): bi–que / que / đặc / đường, nhãn ký hiệu, tự xoay, đo khoảng cách/góc (bấm 2–3 nguyên tử), VSEPR (`@chem/core/molecule`: AXₙEₘ, hình học, góc đo trên cấu trúc 3D), siêu ô 1×1×1 → 3×3×3, thông tin mạng (số phối trí, khoảng cách gần nhất).
- [x] Trang `/compound/[cid]` (SSG 161 chất × 2 ngôn ngữ, JSON-LD `ChemicalSubstance`, có trong sitemap), `/compound` (danh sách, lọc không dấu), `/compound/view?cid=…|q=…` (chất bất kỳ, tải phía client, noindex).
- [x] `lib/pubchem.ts`: gọi thẳng PubChem, xếp hàng tối đa 4 yêu cầu/giây, cache IndexedDB 30 ngày (có fallback bộ nhớ).
- [x] Trang nguyên tố: thẻ 03 "Cấu trúc & hợp chất", thẻ 04 "Ánh sáng". Bấm chất trong trang Cân bằng mở trang hợp chất nếu có. Hợp chất tìm được trong ⌘K. Link "Hợp chất" trên header.
- [ ] Chạy test: `packages/core/test/crystal-molecule.test.ts`, e2e `apps/web/e2e/m4.spec.ts`.
- **DoD:** 30 nguyên tố ưu tiên có ảnh (ảnh chính; chưa có thư viện nhiều ảnh), đơn chất 3D và ≥ 5 hợp chất: **đạt**. 3Dmol chỉ có trong chunk riêng (562 KB, 159 KB gzip), trang chủ, trang nguyên tố và trang hợp chất không tải sẵn: **đã kiểm tra trên bản build**.

### M5: Công cụ tính toán (≈ 2 tuần)

> Trạng thái: **đã viết xong code, chưa chạy test** (unit + e2e). Lint, typecheck, build đều qua.

- [x] `@chem/core/formula` + `molarMass`, `massPercent` + test (`packages/core/test/formula.test.ts`). Parser trả `Result` có vị trí lỗi; hiểu hiđrat (`·`, `.`, `*`), ngoặc `()`/`[]`, chỉ số dưới Unicode, điện tích `Fe3+`, `SO4^2-`, `SO4 2-`, `SO₄²⁻`; với `SO42-` thì báo mơ hồ và gợi ý `SO4^2-` thay vì đoán.
- [x] Trang Molar Mass (`/tools/molar-mass?f=`): ô nhập có highlight lỗi, chuyển đổi g ↔ mol ↔ hạt ↔ V khí (đkc 24,79 L / đktc 22,4 L).
  - *Lệch kế hoạch:* thay biểu đồ tròn bằng **thanh ngang xếp hạng một màu** nằm ngay trong bảng thành phần (theo nguyên tắc dataviz: phần–tổng thể nhiều lát đọc bằng thanh chính xác hơn bánh).
- [x] `@chem/core/rational` (phân số BigInt) + `equation/balance` (ma trận bảo toàn → RREF → không gian nghiệm) + property test bằng fast-check (xáo thứ tự chất, đổi vế).
- [x] `equation/redox`: gán số oxi hoá theo quy tắc (cố định F, KL kiềm, kiềm thổ, Al, H, O; bảng ion đa nguyên tử; muối nhị tố; FeS₂ là ca riêng), lập các quá trình và hệ số thăng bằng e. Nếu không chắc thì trả `null` và UI chỉ hiện phương pháp đại số.
- [x] Trang Balance (`/tools/balance?eq=`): kết quả, hai tab cách giải, kiểm tra hệ số người dùng tự ghi, phần "Tính theo phương trình" (chất hết / chất dư, nhập g hoặc mol).
  - Bấm vào chất mở trang Molar Mass của chất đó (chưa có trang hợp chất, sẽ đổi khi làm M4).
- [x] Bảng tính tan (`/tools/solubility`), dãy hoạt động kim loại (`/tools/activity`): dữ liệu trong `apps/web/src/lib/solubility.ts`. **Bảng tính tan là bản nháp, cần đối chiếu với SGK.**
- [x] Đồ thị xu hướng (`/tools/trends`): đường theo Z (đứt ở chỗ thiếu dữ liệu, vạch khí hiếm, crosshair), tán xạ 2 thuộc tính (màu khối + hình dạng điểm làm mã hoá phụ, hover theo điểm), cả hai có nút xem dạng bảng.
- [x] Trang tổng `/tools`, link "Công cụ" trên header, các trang công cụ có trong ⌘K.
- [ ] Chạy `pnpm --filter @chem/core test` và e2e `apps/web/e2e/tools.spec.ts`.
- **DoD:** 60 phương trình trong SGK cân bằng đúng (bộ mẫu `packages/core/src/equation/samples.ts` có 72 phương trình, **cần rà lại**); phương trình nhập sai báo lỗi dễ hiểu.

### M6: Mở rộng hình ảnh hoá (≈ 2 tuần)

> Trạng thái (2026-11-10): **xong code phần không phụ thuộc nội dung của GPT** (Đồng vị, bảng 3D, offline). Lint, typecheck, build qua; **chưa chạy test mới, chưa xem trên trình duyệt**. Còn lại: tab Lịch sử và trang `/timeline` (chờ dữ liệu từ GPT).

- [x] Thẻ **Đồng vị** (số 03 trong "Góc học hoá"), dữ liệu IAEA LiveChart (`scripts/fetch-isotopes.ts` → `raw/isotopes.json`, 3 353 hạt nhân, 244 bền):
  - bảng đồng vị (mặc định chỉ đồng vị đáng chú ý, bấm để xem hết);
  - **mô phỏng phân rã**: 400 hạt nhân, thanh trượt theo chu kỳ bán rã, đồ thị so với đường lý thuyết, hạt nhân con; có ghi chú cho C-14, U-238, K-40, I-131, Co-60, Cs-137;
  - **bản đồ hạt nhân** (canvas 2D, `dist/nuclides.json` 41 KB, chỉ tải khi cuộn tới), hàng của nguyên tố được làm nổi, trỏ vào ô để xem hạt nhân.
  - Hàm `decayKind` và `decayDaughter` trong `@chem/core/nuclear`.
- [x] **Bảng 3D "thành phố"** (nút "Bảng 3D", URL `?d=3`): mỗi nguyên tố là một toà nhà ở đúng vị trí trên bảng, cao theo thuộc tính đang tô màu (mặc định độ âm điện, thang log với khối lượng riêng); xoay, phóng to, trỏ để xem số liệu, bấm để mở nguyên tố. three.js chỉ tải khi bật; chỉ vẽ lại khi có thay đổi. Ở chế độ tô màu "Năm phát hiện", nguyên tố chưa được biết ở năm đang chọn nằm phẳng và "mọc" lên khi kéo thanh năm.
- [x] **Offline** (không dùng Serwist vì site xuất tĩnh và Turbopack): `scripts/build-sw.mjs` chạy sau `next build`, sinh `out/sw.js` và `out/offline-manifest.json`.
  - Tự lưu "vỏ" ứng dụng (JS, CSS, font, biểu tượng, hai trang chủ, trang `/offline`): khoảng 3,5 MB. Trang đã mở cũng được nhớ (tối đa 120 trang).
  - **Gói offline do người dùng bấm tải** ở trang `/offline`: nguyên tố (≈ 31 MB mỗi ngôn ngữ), hợp chất (≈ 13 MB), trang công cụ (≈ 1 MB), dữ liệu + ảnh + cấu trúc 3D (≈ 4 MB, dùng chung). Có tiến độ, tiếp tục, xoá.
  - Lý do không tự precache hết: mỗi trang nguyên tố nặng ≈ 270 KB HTML (nhúng toàn bộ thông điệp dịch), tổng cả hai ngôn ngữ ≈ 100 MB chưa nén.
  - Service worker chỉ đăng ký ở bản production và bỏ qua khi trình duyệt do máy điều khiển (Playwright).
- [ ] Tab Lịch sử: MDX cho 30 nguyên tố + trang `/timeline` (trục thời gian zoom được): chờ dữ liệu.
- **DoD:** chế độ máy bay mở được trang chủ (vỏ ứng dụng tự lưu) và 118 trang nguyên tố cùng cấu trúc (sau khi tải gói): **cần kiểm tra thủ công**, xem hướng dẫn trong báo cáo M6.

### M7: Học và luyện tập (phần hạ tầng)

> Trạng thái (2026-11-10): **xong phần hạ tầng không cần nội dung của GPT**, ở trang `/learn`. Lint, typecheck, build qua; **chưa chạy test, chưa xem trên trình duyệt**.

- [x] Lưu tiến độ trên máy bằng IndexedDB (Dexie, có version để nâng cấp cấu trúc); nếu trình duyệt chặn thì dùng bản trong bộ nhớ và báo người dùng.
- [x] Xuất/nhập tiến độ ra file JSON (kiểm bằng zod), xoá hết.
- [x] Thẻ ôn tập FSRS (`ts-fsrs`), 4 bộ thẻ tự sinh từ dữ liệu nguyên tố: tên → ký hiệu, ký hiệu → tên, tên → số hiệu, nguyên tố → loại.
- [x] Quiz 10 câu, 4 chế độ (ký hiệu, số hiệu, loại, viết cấu hình electron), cộng 2 chế độ ở dòng dưới. Kỷ lục lưu cục bộ, thay cho bảng xếp hạng chung.
- [x] Chuỗi ngày học và 12 huy hiệu.
- [x] Quiz **cân bằng phương trình** (tăng/giảm hệ số, bảng đếm nguyên tử hai vế cập nhật tức thì) và quiz **kéo-thả** phân loại nguyên tố (`@dnd-kit/core`; có bàn phím và cách bấm-chọn thay thế).
- [ ] Quiz và thẻ từ nội dung của GPT (học hoá, phòng thí nghiệm ảo).

### M8 (phần đã làm): Trình dựng phân tử 2D

> Trạng thái (2026-11-10): **xong bản đầu** ở trang `/builder`. Lint, typecheck, build qua; logic RDKit đã chạy thử bằng Node (etanol → C₂H₆O, aspirin → C₉H₈O₄, hoá trị sai bị từ chối); **chưa xem trên trình duyệt, chưa có test**.

- RDKit.js (`@rdkit/rdkit`, BSD-3) chép vào `public/rdkit` (≈ 7,1 MB, không commit), nạp bằng thẻ script khi vào trang, không nằm trong bundle.
- Vẽ nguyên tử (C H O N S P F Cl Br I), liên kết đơn/đôi/ba, di chuyển, xoá, hoàn tác/làm lại, "Làm đẹp" (RDKit sắp lại toạ độ).
- RDKit kiểm hoá trị, tự thêm H ngầm định, cho SMILES chuẩn, công thức Hill, khối lượng mol (dùng nguyên tử khối của site).
- Nhập SMILES để vẽ (cũng là cách dựng bằng bàn phím) và 6 ví dụ.
- Gói offline riêng `rdkit` (WASM nặng), service worker dùng cache-first cho `/rdkit/`.
- Chưa có: điện tích, vòng thơm vẽ tay có sẵn khuôn, xuất ảnh, đồng bộ sang trình xem 3D.

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

## Học liệu của GPT đã có giao diện

- Dữ liệu: `scripts/build.ts` đọc `curated/{history,lessons,quiz,flashcards,timeline}` (lỗi schema thì build dừng), gắn `history` vào JSON nguyên tố và ghi `dist/learning/{timeline,lessons,quizzes,decks}.json`; `sync-data.mjs` chép sang `public/data/learning/`.
- Trang nguyên tố: mục **Lịch sử** (`HistorySection`: phát hiện, đặt tên, câu chuyện, mốc chính, mỗi đoạn có nguồn), chỉ 30 nguyên tố ưu tiên có.
- `/timeline`: 42 mốc của GPT cộng năm phát hiện của các nguyên tố, lọc theo loại, nhóm theo thế kỷ.
- `/lessons` và `/lessons/[id]`: 6 bài (Hoá học 10). Widget: mô hình nguyên tử, cấu hình electron, tô bảng, xu hướng, cấu trúc 3D (tải khi bấm), cân bằng, khối lượng mol; cuối bài có câu hỏi luyện tập (`TopicQuiz` ở chế độ không lưu).
- `/learn`: tab Quiz thêm mục **Theo chủ đề** (10 chủ đề, 200 câu: một đáp án, nhiều đáp án, tính toán, đoán nguyên tố, có lời giải thích); tab Thẻ thêm 6 bộ thẻ nội dung (112 thẻ) dùng chung lịch FSRS.
- Ghi công ảnh thư viện nằm ở trang `/credits`. Chưa có test e2e cho các phần này.

## Phòng thí nghiệm ảo (M8)

- Dữ liệu: 50 phản ứng (`curated/reactions/`), build thành `dist/learning/reactions.json` (đã qua schema `Reaction`); `check-reactions.ts` kiểm cân bằng, cid, nhất quán hiện tượng. Đã thêm 10 hợp chất còn thiếu vào `compounds.ts` (Fe(OH)₂, Fe(OH)₃, Fe₂(SO₄)₃, Fe(SCN)₃, KSCN, K₂SO₄, K₂MnO₄, NaAlO₂, H₂CO₃, Ba(OH)₂·8H₂O); CuCl₂ và MnSO₄ vốn đã có. Hợp chất: 161 → 171.
- Trang `/lab` (`LabApp`): hai chế độ. **Thí nghiệm có sẵn**: lọc theo lớp, loại phản ứng, tìm kiếm. **Tự chọn hoá chất**: kệ 1–3 chất, tuỳ chọn đun nóng/xúc tác, ghép đúng phản ứng theo tập chất; thiếu đun nóng hoặc xúc tác thì gợi ý, không ghép được thì báo chưa có.
- `TestTube` (SVG): màu dung dịch chuyển dần, kết tủa lắng/lơ lửng theo kết cấu, bọt khí theo tốc độ, toả/thu nhiệt, ánh sáng, đèn cồn; giảm chuyển động thì không có bọt và nhấp nháy. Thời gian hoạt cảnh theo `durationSec` (3–12 giây).
- Có bước dự đoán (5 hiện tượng) rồi chấm điểm sau khi trộn; khung an toàn hiện trước khi trộn; link sang trang hợp chất/nguyên tố; phương trình ion rút gọn và lời giải thích.
- Logic thuần ở `lib/lab/{color,match,observe}.ts`. Chưa có test (unit/e2e) và chưa kiểm tra bằng mắt.


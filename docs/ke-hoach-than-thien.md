# Kế hoạch implement: M1.5 "Thân thiện"

## Tiến độ

- **Bước 1 (Ảnh): xong** (2026-11-09).
  - 102/118 nguyên tố có ảnh. Không có ảnh: Cm (không rõ giấy phép), Rf (© CERN), Db → Og (chỉ có hình giữ chỗ).
  - Ảnh của Pm trên Commons đã bị xoá, nên dùng ảnh trên images-of-elements.
  - Ảnh nặng tổng cộng 3,5 MB.
  - Alt text tạm thời: tiếng Việt là "Ảnh {tên}", tiếng Anh lấy mô tả gốc của ảnh. Alt viết tay cho 40 nguyên
    tố ưu tiên làm cùng bước 5.
  - Một số "ảnh" là hình minh hoạ chứ không phải mẫu thật (At, Fr, Md, No, Lr, Rn), vì các nguyên tố này phóng
    xạ quá mạnh hoặc quá hiếm để chụp. Bước 5 nên ghi chú điều này trong nội dung.
  - Lighthouse mobile:
    - Trang chủ và trang nguyên tố: Performance 88–89 (trước khi có ảnh: 90–93). LCP khoảng 3,6 s.
    - Desktop vẫn 100. Accessibility, Best Practices, SEO vẫn 100.
  - Ảnh nhỏ trong danh sách dùng cỡ 96px và chỉ tải sau khi trang hydrate. Nếu không làm vậy, trang chủ trên
    mobile còn 84 điểm.
  - Phần còn chậm nằm ở font tiêu đề: chữ hiện bằng font dự phòng trước, rồi đổi sang Bricolage. Có thể đạt ≥ 90
    nếu đặt `display: 'optional'` cho font tiêu đề, nhưng khi đó người vào lần đầu trên mạng chậm sẽ thấy tiêu đề
    bằng font dự phòng. Chưa làm, chờ quyết định.
- **Bước 2 (Sắp lại + Góc học hoá): xong code** (2026-11-09).
  - **Góc học hoá** (`AcademicSection`, `<details id="hoc-hoa">`): bọc nguyên vẹn các mục 01–04. Mặc định
    đóng; mở sẵn khi URL có `#hoc-hoa`; nhớ lựa chọn của từng người xem bằng `localStorage`.
  - **Hero**: thay các chip chu kỳ / nhóm / khối bằng nhãn đời thường:
    - "Rắn/Lỏng/Khí ở nhiệt độ phòng";
    - "Phóng xạ", tính bằng `isRadioactive` trong `@chem/core`: Tc, Pm và Z ≥ 84;
    - "Tìm ra năm …" hoặc "Biết đến từ thời cổ đại".

    Chu kỳ, nhóm và khối vẫn có trong mục Vị trí.
  - Giữa hero và Góc học hoá hiện chưa có gì; bước 3 ("Nói cho dễ hình dung") sẽ lấp chỗ này.
  - Test e2e đã cập nhật (Bohr và ngoại lệ Cr giờ nằm trong phần thu gọn) và thêm 3 test cho Góc học hoá.
    Đã chạy: unit 154 + 17 + 17, e2e 21/21 pass.
- **Bước 3 (Nói cho dễ hình dung): xong** (2026-11-09). Test pass.
  - **`@chem/core/human-scale`**: hàm `humanScale()` trả về danh sách so sánh (loại + tham số). Câu chữ nằm ở i18n.
    - Khối lượng riêng: chất rắn/lỏng so với nước ("nặng gấp 7,9 lần nước", "một chai 1 lít nặng 7,87 kg");
      chất khí so với không khí.
    - Nhiệt độ nóng chảy và sôi so với 10 mốc quen thuộc, từ nơi lạnh nhất Trái Đất (−89 °C) tới bề mặt Mặt
      Trời (~5500 °C).
    - "Tan chảy trong lòng bàn tay" cho chất rắn nóng chảy trong khoảng 25–37 °C (Ga, Cs).
    - Số nguyên tử xếp hàng dài 1 mm; số nguyên tử trong 1 gam, đọc bằng chữ ("10,8 nghìn tỉ tỉ").
    - Phóng xạ.
  - Ngoại lệ:
    - Heli: bỏ so sánh nhiệt độ nóng chảy, vì heli chỉ đông đặc khi bị nén.
    - Từ Fm trở đi: số nguyên tử trong 1 gam ghi rõ là giả định ("chưa ai từng tạo ra đủ lượng để cân được").
  - Nguyên tố nào cũng có ít nhất 2 so sánh. Siêu nặng (Rf → Og) có đúng 2: phóng xạ và số nguyên tử trong 1 gam.
  - Component `HumanScale` nằm giữa hero và Góc học hoá, có ở cả trang đầy đủ lẫn panel.
  - Test mới:
    - unit: `core/test/human-scale.test.ts`, `web/test/format.test.ts`, và test "118/118 có ≥ 2 so sánh" trong
      `data.test.ts`;
    - e2e: 4 test cho phần "Nói cho dễ hình dung".
  - An toàn: hiện mới tính được "phóng xạ" (chip ở hero và thẻ ở đây). Các mức "độc" và "cẩn thận" cần nội dung
    tự biên soạn nên để sang bước 5.
- **Bước 4 (Lăng kính): xong** (2026-11-09). Test pass: unit 172 + 21 + 22, e2e 29/29.
  - **6 lăng kính**, mỗi lăng kính có nguồn:

    | Lăng kính | Nguyên tố | Cách xác định |
    | --- | --- | --- |
    | Trong cơ thể bạn | 21 | 11 nguyên tố chính có % khối lượng, 10 vi lượng có số gam trong người 70 kg (Wikipedia) |
    | Trong điện thoại | 20 | Theo EuChemS 2022, kèm mức khan hiếm |
    | Quý và đắt | 8 | Au, Ag và 6 kim loại nhóm bạch kim |
    | Phóng xạ | 37 | Tính từ dữ liệu |
    | Lỏng (hoặc gần lỏng) | 6 | Hg, Br, Ga, Cs, Rb, Fr |
    | Chỉ có trong phòng thí nghiệm | 24 | Z ≥ 95 |

  - Danh sách tự biên soạn nằm ở `packages/data/curated/lenses.ts`; id lăng kính và nguồn ở `src/lenses.ts`
    (không dùng zod). Dữ liệu lite có thêm `lenses`, `body`, `phoneRisk`.
  - EuChemS chỉ nêu tên 20 nguyên tố có nguồn cung đáng lo. 10 nguyên tố còn lại chỉ có trên hình nên không
    đưa vào. Mục "nguồn gốc từ vùng xung đột" trong thông cáo có ghi "Carbon", nhiều khả năng là lỗi đánh máy,
    nên không dùng.
  - Giao diện:
    - `LensBar` nằm trên bảng và dưới ô tìm kiếm ở dạng danh sách.
    - Ô không thuộc lăng kính bị làm mờ (dùng lại cơ chế `dimmed`). Ở dạng danh sách thì lọc theo lăng kính.
    - Lăng kính "cơ thể" hiện huy hiệu % hoặc số gam trên ô; "điện thoại" hiện chấm màu đỏ/cam/vàng theo mức
      khan hiếm.
    - Đồng bộ với URL `?lens=`, đọc qua `useSyncExternalStore` (không `setState` trong effect).
  - Lăng kính "Trong bếp" để sang bước 5, vì cần nội dung từng nguyên tố.
  - Hạn chế đã biết: khi mở panel, URL đổi sang trang nguyên tố nên bảng phía sau tạm bỏ làm mờ. Đóng panel thì
    lăng kính hiện lại.
  - Test mới: 3 unit test (số thành viên từng lăng kính, dữ liệu cơ thể) và 4 test e2e.
  - Sau khi xem ảnh chụp, hàng chip được dời vào khoảng trống trong lòng bảng, ngay dưới tiêu đề.
    - Dòng giải thích lăng kính thay cho câu gợi ý "di chuột…". Bảng không bị đẩy xuống nữa.
    - Màn hẹp hơn 1400px: chip nằm trên một dòng, cuộn ngang, mờ dần ở mép phải. Khi đang chọn lăng kính,
      tiêu đề lớn chỉ còn cho trình đọc màn hình (`sr-only`), để các hàng của bảng không bị kéo giãn.
- **Bước 5 (Schema nội dung + lô đầu): xong code** (2026-11-09). Chưa chạy test.
  - **Schema** `packages/data/src/story.ts`:
    - `hook` ≤ 130 ký tự; `uses` 1–4 mục, icon thuộc danh sách đóng `USE_ICONS`; `facts` tối đa 3, `source`
      bắt buộc là URL; `safety` (`harmless` / `careful` / `toxic` + ghi chú).
    - Mức "phóng xạ" tính tự động, không cần ghi.
    - **Quyết định: bắt buộc có cả vi và en.** Kế hoạch ban đầu cho phép thiếu en; đổi để trang `/en/` không bị
      thiếu nội dung và không dồn nợ sang bước 7.
  - **Build**: đọc `packages/data/stories/*.ts`, kiểm tra từng file bằng schema. Sai schema hoặc slug không tồn
    tại thì build dừng, kèm thông báo lỗi chỉ rõ chỗ sai (đã thử với một nguồn không phải URL và một slug sai).
  - **Dữ liệu**: lite có thêm `hook` (`elements.json` từ 61,6 KB lên 65,2 KB); full có thêm `story`.
  - **Giao diện**:
    - Câu móc câu hiện ở hero, thẻ xem nhanh (thay cho cấu hình electron) và dòng phụ của danh sách mobile.
    - Trang và panel có thêm 3 mục: "Bạn gặp nó ở đâu", "Có thể bạn chưa biết" (hỏi–đáp dạng `<details>`, câu
      đầu mở sẵn, có link nguồn), và thẻ "An toàn".
    - Thứ tự: hero → công dụng → điều thú vị → "Nói cho dễ hình dung" → an toàn → Góc học hoá.
    - Nguyên tố chưa có câu chuyện chỉ hiện "Nói cho dễ hình dung", cộng thẻ an toàn nếu là nguyên tố phóng xạ.
  - **Lô đầu, 10 nguyên tố**: H, He, C, O, Na, Al, Fe, Cu, Au, Hg. Đây là bản nháp AI soạn, **chờ duyệt**:
    kiểm tra từng fact với link nguồn và sửa văn phong.
  - **Test mới**:
    - unit: `REQUIRED_STORIES` gồm 10 nguyên tố; `hook` trong lite khớp với story; schema từ chối câu chuyện
      thiếu nguồn, nguồn không phải URL, thiếu en, quá dài, không có công dụng, hoặc icon lạ;
    - e2e: 5 test.
- **Bước 6 (40 nguyên tố ưu tiên): xong code** (2026-11-09). Chưa chạy test.
  - **Nội dung**: thêm 30 câu chuyện (Li, Be, B, N, F, Ne, Mg, Si, P, S, Cl, Ar, K, Ca, Sc, Ti, V, Cr, Mn,
    Co, Ni, Zn, Ag, Sn, I, W, Pt, Pb, U, Ra), đủ 40. Đây là bản nháp, **chờ duyệt** như lô đầu.
    - Sinh bằng script tạm từ một bảng dữ liệu; từ nay sửa trực tiếp trong `stories/*.ts`.
    - Nguồn đều là Wikipedia tiếng Anh, chưa mở lại từng link để đối chiếu.
  - **Tìm kiếm**: dữ liệu lite có thêm `keywords` (công dụng vi + en, đã bỏ dấu).
    - `searchElements` tìm theo thứ tự: ký hiệu/số hiệu → tên → công dụng → tên lăng kính. Chỉ tìm theo công
      dụng và lăng kính khi chuỗi tìm từ 3 ký tự trở lên.
    - Gõ "muoi" ra Na, Cl, I; "bong den" ra Ar, W, Hg; "dien thoai" ra các nguyên tố có công dụng liên quan
      tới điện thoại, rồi tới các nguyên tố trong lăng kính điện thoại.
    - Hàm bỏ dấu chuyển sang `@chem/data/lenses` (`normalizeSearch`) để build và giao diện dùng chung.
  - **Lăng kính "Trong bếp"**:
    - Khai báo bằng trường `lenses: ['kitchen']` trong story. Gồm 8 nguyên tố: Na, Cl, I, Fe, Al, Cr, Ni, Sn.
    - Không có link nguồn chung; nguồn nằm ở trang từng nguyên tố (`LENS_SOURCES.kitchen = null`).
  - **Thẻ "Bạn có biết?"**:
    - Chọn ngẫu nhiên một câu móc câu kèm link mở panel nguyên tố, có nút "Điều khác".
    - Ở bảng, thẻ nằm thay chỗ câu gợi ý "Di chuột…"; HTML tĩnh vẫn hiện câu gợi ý cho tới khi hydrate. Ở danh
      sách mobile, thẻ nằm dưới tiêu đề.
  - **Kích thước**: `elements.json` 65,2 KB → 79,5 KB (câu móc câu + từ khoá cho 40 nguyên tố). Khi đủ 118
    nguyên tố, file này sẽ vào khoảng 110 KB (trước nén). Nếu thấy nặng, tách từ khoá ra file riêng, chỉ tải
    khi người dùng gõ vào ô tìm kiếm.
  - **Test mới**:
    - unit: `REQUIRED_STORIES` = 40; lăng kính bếp; từ khoá tìm kiếm; 3 test tìm kiếm theo công dụng và lăng
      kính. Sửa test cũ "sodium" vì Clo giờ cũng khớp qua công dụng "Table salt (sodium chloride)".
    - e2e: 3 test.
- **Bước 7 (Phần còn lại): xong nội dung** (2026-11-09). Chưa chạy test, chưa đo Lighthouse.
  - **Nội dung**: thêm 78 câu chuyện, đủ **118/118**, mỗi câu chuyện đều có cả vi và en. Đây là bản nháp,
    **chờ duyệt**.
    - Z 31–92: câu móc câu, công dụng, an toàn; hỏi–đáp chỉ viết khi chắc chắn (một số nguyên tố đất hiếm
      không có).
    - Nhóm siêu nặng (Z ≥ 93): câu móc câu về nguồn gốc tên hoặc cách tìm ra. Nguyên tố chưa có ứng dụng thật
      có công dụng "Chỉ dùng trong nghiên cứu khoa học" (icon mới `FlaskConical`). Mức an toàn để tự động là
      "phóng xạ", trừ Pu, Am có ghi chú riêng.
    - Không dùng khuôn chung "tồn tại chưa tới một giây" như kế hoạch ban đầu, vì câu đó sai với một số nguyên
      tố (vd. một đồng vị Db sống khoảng 16 giờ).
    - Sinh bằng script tạm từ một bảng dữ liệu; từ nay sửa trực tiếp trong `stories/*.ts`.
  - **Kích thước**:
    - `elements.json`: 102 KB (gzip 25 KB).
    - HTML trang chủ: 314 KB → 366 KB, vì dữ liệu nhẹ được nhúng vào trang.
    - Cần đo lại Lighthouse. Nếu tụt, tách `keywords` (và có thể cả `hook`) ra file riêng, tải sau.
  - **Chưa làm** (tuỳ chọn trong kế hoạch): icon đồ vật trên ô bảng tuần hoàn.
  - **Test**:
    - unit: thêm test 118/118 nguyên tố có câu móc câu và công dụng;
    - e2e: test "nguyên tố chưa có câu chuyện" đổi thành "không hiện mục rỗng" (dùng Og), vì giờ nguyên tố nào
      cũng có câu chuyện.

> Viết ngày 2026-11-09. Ý tưởng và lý do nằm ở [`huong-than-thien.md`](./huong-than-thien.md).
> Tài liệu này mô tả **cách làm**: dữ liệu, file nào đổi, thứ tự các bước, test và điều kiện xong.

## 0. Nguyên tắc

1. **Không bỏ gì.** Mọi nội dung M1 vẫn giữ nguyên:
   - cấu hình electron, mô hình Bohr, sơ đồ ô lượng tử;
   - bảng tính chất, bảng thu nhỏ, mô tả Wikipedia.

   Chúng được chuyển vào mục **"Góc học hoá"**, đóng sẵn, ai muốn đọc sâu thì mở ra.
2. **Đóng nhưng vẫn có trong HTML.** Phần học thuật vẫn được render tĩnh, chỉ ẩn bằng `<details>`. Nhờ vậy
   SEO, tìm bằng Ctrl+F và trình đọc màn hình vẫn dùng được. Không tải lười phần này.
3. **Thiếu nội dung thì trang vẫn đủ.** Nguyên tố chưa có câu chuyện thì ẩn các mục kể chuyện, nhưng các mục
   tính tự động (ảnh, so sánh con số, an toàn cơ bản) vẫn hiện. Không có ô trống hay chữ "đang cập nhật".
4. **Vẫn 100% tĩnh**, không backend. Mọi dữ liệu mới được sinh lúc build.
5. **Mỗi bước deploy được** và giữ Lighthouse ≥ 90/95 như M1.

---

## 1. Dữ liệu

### 1.1 Tổng quan luồng dữ liệu

```
packages/data/
├─ raw/                      (đã có) snapshot PubChem, Bowserinator
├─ curated/
│  ├─ names-vi.ts            (đã có)
│  ├─ stories/{slug}.ts      MỚI: câu móc câu, công dụng, điều thú vị, an toàn (mỗi nguyên tố 1 file)
│  ├─ lenses.ts              MỚI: lăng kính tự biên soạn (bếp, quý…) + nguồn
│  ├─ body.ts                MỚI: % khối lượng trong cơ thể người + nguồn
│  ├─ phone.ts               MỚI: nguyên tố trong điện thoại + mức khan hiếm (EuChemS 2019)
│  └─ image-overrides.ts     MỚI: xử lý tay các ảnh có giấy phép đặc biệt
├─ scripts/
│  ├─ build.ts               (sửa) gộp thêm stories, lenses, photo vào JSON
│  └─ images.ts              MỚI: tải + nén ảnh, sinh manifest (chạy tay, kết quả được commit)
└─ images/                   MỚI: ảnh WebP đã nén + manifest.json (commit vào git)
```

### 1.2 Schema câu chuyện (`packages/data/src/story.ts`)

```ts
const Text = z.object({ vi: z.string().min(1), en: z.string().min(1).optional() });

export const Story = z.object({
  hook: Text,                                   // ≤ 90 ký tự, 1 câu
  uses: z.array(z.object({
    icon: z.string(),                           // emoji hoặc tên icon lucide
    text: Text,                                 // "Dây điện trong nhà"
  })).min(1).max(4),
  facts: z.array(z.object({
    q: Text,                                    // "Vì sao vàng không bao giờ gỉ?"
    a: Text,                                    // 1–3 câu, ≤ 280 ký tự
    source: z.string().url(),                   // bắt buộc có nguồn
  })).max(3),
  safety: z.enum(['harmless', 'careful', 'toxic', 'radioactive']).optional(),
  safetyNote: Text.optional(),                  // "Cầm được, nhưng làm bẩn tay"
  lenses: z.array(LensId).default([]),          // các lăng kính tự biên soạn
});
```

- Mỗi file là `export default defineStory({...})`, nên có type, lint và Prettier như code.
- Nội dung tiếng Anh tạm thời có thể thiếu. Khi đó trang `/en/` ẩn các mục kể chuyện, không hiện tiếng Việt
  lẫn vào trang tiếng Anh.
- `build.ts` đọc toàn bộ thư mục `stories/` bằng `readdir` và import động. Mỗi file được kiểm tra bằng Zod;
  slug không tồn tại thì build lỗi.

### 1.3 Dữ liệu lite và full

| Trường mới                                                         | Lite (`elements.json`, nhúng vào trang chủ) | Full (`elements/{slug}.json`) |
| ------------------------------------------------------------------ | ------------------------------------------- | ----------------------------- |
| `hook`                                                             | ✔ (cho thẻ xem nhanh, danh sách)            | ✔                             |
| `uses` (icon + text)                                               | ✔ (2 cái đầu; dùng cho tìm kiếm và icon ô)  | ✔ đủ                          |
| `lenses: LensId[]`                                                 | ✔ (để lọc trên trang chủ)                   | ✔                             |
| `safety`                                                           | ✔                                           | ✔ + `safetyNote`              |
| `photo: { thumb, w, h }`                                           | ✔                                           | ✔ + ảnh lớn, ghi công         |
| `facts`                                                            | ✘                                           | ✔                             |
| `body: { massPercent }`                                            | ✔ (chỉ nguyên tố có trong cơ thể)           | ✔                             |

Ước lượng: dữ liệu lite tăng khoảng 25–30 KB trước nén (khoảng 6–8 KB sau gzip). Chấp nhận được; có test
chặn ngưỡng (xem mục 5).

### 1.4 Lăng kính (`LensId`)

| Id            | Cách xác định                                                   | Nơi định nghĩa                     |
| ------------- | ----------------------------------------------------------------- | ---------------------------------- |
| `radioactive` | Không có đồng vị bền: Tc, Pm và Z ≥ 84                            | Tính trong `build.ts`              |
| `liquid`      | Lỏng ở 25 °C (Hg, Br); "gần lỏng" nếu nóng chảy dưới 40 °C (Ga, Cs, Rb, Fr) | Tính từ `meltingPointK`  |
| `synthetic`   | Nguyên tố nhân tạo: Tc, Pm, Z ≥ 93                                | Tính trong `build.ts`              |
| `body`        | Có trong `curated/body.ts` (O, C, H, N, Ca, P… và vi chất Fe, Zn, I, Se…) | Tự biên soạn, có nguồn     |
| `phone`       | Có trong `curated/phone.ts`, kèm mức khan hiếm                    | Lấy từ bảng EuChemS 2019, ghi nguồn |
| `kitchen`     | Muối, giấy bạc, chảo gang, muối i-ốt, baking soda…                | Khai báo trong từng `stories/*.ts` |
| `precious`    | Au, Ag, Pt, Pd, Rh, Ir, Ru, Os                                    | `curated/lenses.ts`                |

`curated/lenses.ts` cũng giữ phần hiển thị của từng lăng kính: icon, tên vi/en, một dòng giải thích và link
nguồn.

### 1.5 So sánh dễ hình dung (`packages/core/src/human-scale/`)

Đây là các hàm thuần, có unit test, không phụ thuộc giao diện. Chúng trả về **khoá dịch kèm tham số** chứ
không trả về câu hoàn chỉnh, để i18n xử lý phần chữ.

```ts
densityVsWater(gcm3)        // { key: 'heavierThanWater', ratio: 7.9 } | 'lighterThanWater' | 'floatsOnWater'…
temperatureLandmark(kelvin) // mốc gần nhất bên dưới: thân nhiệt, nước sôi, lò nướng (250 °C),
                            // ngọn nến (~1000 °C), dung nham (~1200 °C), bề mặt Mặt Trời (~5500 °C)
roomTemperaturePhase(el)    // rắn/lỏng/khí ở 25 °C, kèm "tan trong lòng bàn tay" nếu < 37 °C
discoveredAgo(year, now)    // "khoảng 250 năm trước" | "từ thời cổ đại"
atomsIn(grams, molarMass)   // "một chiếc nhẫn 3 g chứa khoảng 9 × 10²¹ nguyên tử", chỉ dùng cho vài vật mẫu
```

Mốc so sánh nằm trong một bảng hằng số có ghi nguồn, để dễ sửa sau này.

### 1.6 Ảnh (`packages/data/scripts/images.ts`, chạy bằng `pnpm data:images`)

1. Lấy URL ảnh và ghi công từ `raw/bowserinator.json`.
2. **Lọc theo giấy phép.**
   - Dùng ngay: CC BY (1.0, 2.0, 3.0), CC BY-SA (2.5, 3.0, 4.0), public domain, và ảnh images-of-elements
     (CC BY 3.0). Nhóm này khoảng 100 ảnh.
   - Bốn ảnh ghi bản quyền riêng (CERN, Los Alamos, EU, GFDL) phải khai báo tay trong `image-overrides.ts`:
     cho phép (kèm ghi công đúng), thay URL khác, hoặc bỏ.
   - Gặp giấy phép lạ thì script dừng lại với lỗi; không âm thầm dùng.
3. Loại ảnh giữ chỗ "No Image Found" (15 nguyên tố, chủ yếu siêu nặng). Các nguyên tố này có `photo = null`.
4. Tải về bằng User-Agent chung của project, không dùng email cá nhân, và nghỉ ~300 ms giữa các request.
5. Nén bằng `sharp` (đã được phép build trong `pnpm-workspace.yaml`) ra hai kích thước:
   - `{slug}-640.webp`: hero, khoảng 40 KB;
   - `{slug}-240.webp`: thẻ xem nhanh và danh sách, khoảng 10 KB.

   Tổng khoảng 5 MB, **commit vào git**. Làm vậy để build không cần mạng và kết quả ổn định, giống thư mục
   `raw/`.
6. Sinh `images/manifest.json`, mỗi ảnh gồm:
   - kích thước;
   - alt vi/en (lấy từ `title`; tiếng Việt viết tay cho 40 nguyên tố ưu tiên, còn lại tạm dùng "Mẫu {tên}");
   - người chụp/tác giả, giấy phép, link giấy phép, link trang gốc.
7. `sync-data.mjs` chép ảnh sang `apps/web/public/images/elements/`.

---

## 2. Giao diện

### 2.1 Trang và panel nguyên tố: thứ tự mới

```
ElementHero (sửa)        ảnh thật · tên · câu móc câu · nhãn đời thường (trạng thái ở nhiệt độ phòng, an toàn, lăng kính)
PrevNext                 (giữ)
UsesSection      MỚI     "Bạn gặp nó ở đâu": 2–4 thẻ icon + chữ
FactsSection     MỚI     "Có thể bạn chưa biết": <details> hỏi–đáp, có link nguồn
HumanScale       MỚI     "Nói cho dễ hình dung": các so sánh từ core/human-scale
SafetyNote       MỚI     mức an toàn + một câu giải thích
AcademicSection  MỚI     <details id="hoc-hoa"> "Góc học hoá", đóng sẵn, bên trong là NGUYÊN VẸN:
                           01 Cấu tạo nguyên tử (Bohr, cấu hình, ô lượng tử)
                           02 Tính chất (bảng số liệu đầy đủ)
                           03 Vị trí trong bảng (MiniTable + giải thích chu kỳ/nhóm/khối)
                           04 Mô tả (Wikipedia)
                           nhãn chu kỳ · nhóm · khối (chuyển từ hero xuống đây)
Credit                   MỚI     ghi công ảnh + nguồn dữ liệu
```

Chi tiết:

- **`ElementHero`**
  - Bên trái là ảnh (`<img>` có `width`/`height`). Ô ký hiệu cũ thu nhỏ, đặt chồng lên góc ảnh.
  - Nguyên tố không có ảnh: giữ hero như M1 (ô ký hiệu lớn), thêm dòng "Chưa ai từng thấy đủ lượng để chụp ảnh"
    với nguyên tố siêu nặng.
  - Trang tĩnh dùng `fetchpriority="high"` cho ảnh hero. Panel dùng ảnh 240 làm placeholder trong lúc tải
    ảnh 640.
- **`AcademicSection`**
  - Bọc các `Card` hiện có, không sửa nội dung bên trong.
  - Mở tự động khi URL có `#hoc-hoa`.
  - Nhớ trạng thái mở/đóng của từng người xem bằng `localStorage`, bọc `try/catch`. Mặc định là đóng.
  - Nút "Mở góc học hoá" có thể dẫn thẳng tới từng mục: cấu hình electron, tính chất…
- `ElementDetail` chỉ đổi thứ tự và bọc thêm component. Các component con hiện có (`BohrModel`,
  `OrbitalBoxDiagram`, `MiniTable`, `ConfigText`) **không đổi**.
- Panel dùng cùng thứ tự, ở dạng `compact`.

### 2.2 Trang chủ

- **`LensBar`** (MỚI)
  - Hàng chip ngay trên bảng; ở dạng danh sách thì nằm dưới ô tìm kiếm.
  - Bấm một chip thì `activeLens` được đặt. Chip lăng kính và chip loại nguyên tố loại trừ nhau: chọn cái này
    thì bỏ cái kia.
  - Dùng lại cơ chế `dimmed` hiện có của `ElementCell`.
  - Hiện một dòng giải thích kèm link nguồn bên dưới.
  - Lăng kính `body`: mỗi ô hiện thêm % khối lượng.
  - Lăng kính `phone`: ô của nguyên tố khan hiếm có chấm cảnh báo.
  - Đồng bộ với URL `?lens=body` bằng `history.replaceState`, để chia sẻ link được. Lúc tải trang thì đọc
    URL qua `useSyncExternalStore`.
- **`ElementPreview` (thẻ xem nhanh)**
  - Có ảnh: ảnh 240, câu móc câu, 2 công dụng. Không có ảnh: giữ mô hình Bohr như hiện tại.
  - Các thông số cũ (độ âm điện, cấu hình) bỏ khỏi thẻ, nhưng vẫn còn trong Góc học hoá.
- **Phần mở đầu**: thêm thẻ "Bạn có biết?", chọn ngẫu nhiên một câu móc câu kèm link tới nguyên tố.
  - Chọn phía client bằng `useSyncExternalStore`, snapshot phía server là `null`, để không lệch hydration và
    không vi phạm rule `set-state-in-effect`.
  - Có nút "Điều khác".
- **Danh sách (mobile)**: thêm ảnh thumb 240 vào mỗi dòng (`loading="lazy"`) và câu móc câu thay cho dòng
  "tên tiếng Anh · loại".
- **Tìm kiếm**: `searchElements` tìm thêm trong `uses` và tên lăng kính, đều bỏ dấu. Gõ "dien thoai", "muoi",
  "bong den" đều ra kết quả. Thứ tự xếp hạng: ký hiệu/số hiệu → tên → công dụng.
- **Icon đồ vật trên ô**: tuỳ chọn, bước sau. Icon lấy từ `uses[0].icon`. Có công tắc "Hiện đồ vật" lưu trong
  `localStorage`.

### 2.3 Trang mới

- **`/[locale]/credits/`**: ghi công toàn bộ ảnh (tác giả, giấy phép, link) và nguồn dữ liệu. Footer có link
  tới trang này. Đây là yêu cầu của giấy phép CC BY.

### 2.4 i18n

- Chữ giao diện mới thêm vào `messages/{vi,en}.json` theo các nhóm: `friendly.*`, `lens.*`, `humanScale.*`,
  `safety.*`, `academic.*`.
- Nội dung từng nguyên tố nằm trong `stories`, không nằm trong `messages`.

---

## 3. Nội dung

### 3.1 Văn phong

- Xưng "bạn"; câu ngắn; mỗi câu một ý.
- Không dùng thuật ngữ. Bắt buộc dùng thì giải thích ngay trong câu.
- Câu móc câu phải cụ thể, bất ngờ và đúng sự thật. Không dùng các câu chung chung kiểu "nguyên tố quan trọng
  trong đời sống".
- Điều thú vị viết dạng câu hỏi thật, tức là câu mà người đọc có thể đã tự hỏi.
- Không ghi giá hay số liệu thay đổi theo thời gian. Có thì ghi kèm năm.

### 3.2 Quy trình

1. Làm theo lô 10 nguyên tố.
2. AI soạn nháp từ các nguồn mở (Wikipedia vi/en, RSC Periodic Table, PubChem, USGS). Mỗi `fact` phải kèm
   URL nguồn.
3. Người duyệt kiểm tra từng fact với nguồn và sửa văn phong. Commit lô đã duyệt.
4. Build tự kiểm tra: đúng schema, có nguồn, đúng độ dài, slug hợp lệ.

### 3.3 Thứ tự ưu tiên

1. **40 nguyên tố quen thuộc**:
   - H → Zn (30 nguyên tố);
   - Ag, Sn, I, W, Pt, Au, Hg, Pb, U, Ra.

   Mỗi nguyên tố viết đủ: móc câu, 2–4 công dụng, 2–3 điều thú vị, an toàn.
2. **48 nguyên tố tiếp theo** (đến Z = 92 cộng thêm Pu): móc câu, công dụng, an toàn; điều thú vị nếu có.
3. **Nhóm siêu nặng**: một khuôn chung ("chỉ từng được tạo ra vài nguyên tử, tồn tại chưa tới một giây") cộng
   thêm phần riêng: tên đặt theo ai/nơi nào, ai tạo ra.

`REQUIRED_STORIES` trong test liệt kê các nguyên tố bắt buộc phải có câu chuyện đầy đủ. Danh sách này tăng dần
theo từng lô, để không ai lỡ xoá mất nội dung đã có.

---

## 4. Các bước thực hiện

Mỗi bước là một PR, deploy được và qua `pnpm check`.

| #   | Bước                         | Nội dung chính                                                                                                         | Xong khi (DoD)                                                                                                                                                             |
| --- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Ảnh**                      | Script `images.ts` + `image-overrides.ts`; manifest; `photo` trong JSON; ảnh trong hero, thẻ xem nhanh, danh sách; trang `/credits/` | ≥ 100 nguyên tố có ảnh đúng giấy phép; trang credits liệt kê đủ; LCP mobile trang nguyên tố ≤ 3,5 s; e2e: hero Fe có ảnh với alt, Og hiện hero dự phòng |
| 2   | **Sắp lại + Góc học hoá**    | `AcademicSection` bọc nguyên vẹn các mục 01–04; đổi thứ tự trang và panel; nhãn đời thường trong hero                  | Toàn bộ nội dung M1 vẫn có trong HTML tĩnh; đóng mặc định; `#hoc-hoa` mở sẵn; e2e cũ vẫn pass (sửa selector nếu cần)                                                        |
| 3   | **Nói cho dễ hình dung**     | `@chem/core/human-scale` + test; `HumanScale`; an toàn tính tự động (`radioactive`)                                      | 118/118 nguyên tố có ít nhất 2 so sánh; unit test cho các mốc biên (Hg, Ga, He, W)                                                                                          |
| 4   | **Lăng kính**                | `LensBar`; các lăng kính tính được (phóng xạ, lỏng, nhân tạo); `body.ts`, `phone.ts`, `lenses.ts` có nguồn; `?lens=`  | 6 lăng kính chạy ở cả bảng và danh sách; link `?lens=phone` mở đúng; e2e cho `body` và `phone`                                                                              |
| 5   | **Schema nội dung + lô đầu** | `Story` schema, `defineStory`, gộp vào build; `UsesSection`, `FactsSection`, `SafetyNote`; móc câu trong thẻ xem nhanh và danh sách; lô 10 nguyên tố đầu | Build từ chối story sai schema hoặc thiếu nguồn; 10 nguyên tố hiển thị đủ; nguyên tố chưa có story không hiện mục trống                                                    |
| 6   | **40 nguyên tố ưu tiên**     | 3 lô tiếp theo; tìm kiếm theo công dụng; thẻ "Bạn có biết?"                                                             | `REQUIRED_STORIES` = 40; tìm "dien thoai", "muoi" ra kết quả đúng                                                                                                           |
| 7   | **Phần còn lại**             | 78 nguyên tố; icon đồ vật trên ô (tuỳ chọn); bản tiếng Anh cho nội dung                                                 | 118/118 có móc câu và công dụng; Lighthouse vẫn ≥ 90/95                                                                                                                     |

Bước 1–4 hoàn toàn là code và dữ liệu có sẵn, không phụ thuộc việc viết nội dung. Bước 5 trở đi là phần nội
dung, có thể làm song song với M2.

---

## 5. Kiểm thử

- **Unit (Vitest)**
  - `human-scale`: các mốc nhiệt độ, tỉ lệ khối lượng riêng, trường hợp `null`.
  - Tính lăng kính: phóng xạ đúng 37 nguyên tố (Tc, Pm và Z = 84–118); lỏng gồm Hg, Br.
  - `searchElements` tìm theo công dụng.
- **Toàn vẹn dữ liệu (`data.test.ts`)**
  - Mọi `photo` có giấy phép thuộc danh sách cho phép.
  - Mọi `fact` có `source`.
  - Các nguyên tố trong `REQUIRED_STORIES` có đủ trường.
  - `elements.json` lite < 60 KB.
- **E2E (Playwright)**
  - Hero có ảnh.
  - Góc học hoá đóng sẵn, mở ra thấy "Cấu hình electron".
  - `#hoc-hoa` mở sẵn.
  - Bấm lăng kính `body` thì O, C, H, N không bị làm mờ.
  - `?lens=phone` mở đúng lăng kính.
  - Danh sách mobile có ảnh.
  - Test cũ: chỉnh selector cho phần đã chuyển vào Góc học hoá.
- **Lighthouse**: đo lại sau bước 1 (ảnh) và bước 7.

---

## 6. Rủi ro và cách xử lý

| Rủi ro                                         | Cách xử lý                                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Dùng nhầm ảnh không đúng giấy phép             | Danh sách giấy phép cho phép + override tay; giấy phép lạ thì build lỗi; có trang credits    |
| Điều thú vị sai sự thật (AI "bịa")             | Bắt buộc link nguồn; người duyệt từng fact; ghi rõ trong PR là đã đối chiếu                   |
| Ảnh làm chậm trang                             | WebP 2 kích thước; `width`/`height` cố định (CLS = 0); lazy cho danh sách; đo Lighthouse     |
| Dữ liệu lite phình to                          | Chỉ đưa vào lite thứ trang chủ cần; test chặn ngưỡng 60 KB                                   |
| Nội dung tiếng Anh chậm hơn tiếng Việt         | `en` không bắt buộc; thiếu thì ẩn mục ở trang `/en/`                                         |
| Người học bị khó chịu vì phải bấm thêm 1 lần   | `#hoc-hoa` mở sẵn; nhớ trạng thái mở theo từng người xem; nút nhảy thẳng tới mục cần          |

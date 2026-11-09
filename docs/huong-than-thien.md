# Hướng "thân thiện": làm cho người tò mò cũng thấy thích

> Viết ngày 2026-11-09. Bối cảnh: bản M1 đẹp và đúng nhưng mang màu sách giáo khoa. Người bình thường vào xem
> vì tò mò ("vàng có gì đặc biệt?", "điện thoại làm từ gì?") sẽ gặp ngay cấu hình electron, sơ đồ ô lượng tử
> và năng lượng ion hoá, rồi rời đi. Tài liệu này chẩn đoán vấn đề, tóm tắt các hướng đã được chứng minh hiệu quả,
> và đề xuất thay đổi cụ thể. Chưa quan tâm tới animation.
> Kế hoạch implement chi tiết: [`ke-hoach-than-thien.md`](./ke-hoach-than-thien.md).

---

## 1. Chẩn đoán: vì sao bản hiện tại "học thuật"

| Chỗ                           | Hiện tại                                                                          | Người tò mò cảm thấy                                                     |
| ----------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Trang chủ                     | Lưới 118 ký hiệu tô màu theo loại; câu "Mọi thứ quanh ta bắt đầu từ đây"           | Câu mở đầu hứa hẹn "mọi thứ quanh ta" nhưng không có thứ gì quanh ta cả  |
| Thẻ xem nhanh khi rê chuột    | Mô hình Bohr, cấu hình electron, độ âm điện, khối lượng                           | Toàn thuật ngữ, không có lý do để bấm tiếp                               |
| Trang nguyên tố, mục đầu tiên | "01 Cấu tạo nguyên tử": cấu hình electron, số e độc thân, sơ đồ ô lượng tử        | Đây là thứ cần cho bài kiểm tra, không phải thứ khiến ai đó tò mò        |
| Con số                        | "7,874 g/cm³", "1811 K", "7,9 eV"                                                 | Không biết lớn hay nhỏ, không có gì để so                                |
| Mô tả                         | Một đoạn Wikipedia tiếng Anh ở cuối trang                                         | Phần "kể chuyện" duy nhất lại bằng tiếng Anh và nằm cuối cùng            |
| Hình ảnh                      | Không có ảnh thật nào                                                             | Không biết sắt, natri, brom trông ra sao                                 |

Tóm lại: thông tin đúng, nhưng **thứ tự ngược** (học thuật trước, đời sống sau, mà phần đời sống gần như chưa có)
và **thiếu ngữ cảnh** (con số không có so sánh, không có ảnh, không có câu chuyện).

---

## 2. Những gì đã hiệu quả ở nơi khác

1. **Gắn mỗi nguyên tố với một đồ vật quen thuộc.** Bảng tuần hoàn minh hoạ của Keith Enevoldsen
   (elements.wlonk.com) vẽ cho mỗi ô một công dụng: natri là lọ muối, neon là biển hiệu, nhôm là máy bay.
   Bảng này được hàng loạt báo đại chúng đăng lại (Mental Floss, IFLScience, Discover, TechRadar…), chính vì người
   không học hoá vẫn hiểu ngay. Science Museum Group (Anh) cũng có kết luận tương tự: gắn khoa học với ví dụ
   đời thường thì khách tham quan dễ "nhận ra" khoa học khi gặp lại ngoài đời.
2. **Ảnh thật, chụp đẹp.** The Elements của Theodore Gray (sách và app) thành công gần như chỉ nhờ ảnh các
   mẫu vật và đồ vật, mỗi nguyên tố kèm một câu chuyện ngắn. Ta không dùng được ảnh của Gray (bản quyền), nhưng
   **dữ liệu đang có đã kèm sẵn ảnh thật cho 118 nguyên tố** (images-of-elements.com, CC BY 3.0, có ghi công).
3. **Đặt nguyên tố vào thứ người đọc quan tâm.** Bảng của EuChemS (2019) chỉ ra khoảng 30 nguyên tố có trong
   một chiếc điện thoại và nguyên tố nào đang khan hiếm, rồi được báo chí đưa tin rộng rãi. Tương tự, "cơ thể bạn
   làm từ gì" (O ~65%, C ~18%, H ~10%, N ~3% khối lượng) là câu hỏi ai cũng tò mò.
4. **Đơn giản nhưng không dễ dãi.** Triển lãm Elements của Ulster Museum xếp đồ vật theo chủ đề quen thuộc
   ("sự sống", "màu sắc") thay vì theo nhóm/chu kỳ, và giữ nguyên tinh thần khoa học.

---

## 3. Nguyên tắc cho bản tiếp theo

1. **Đời sống trước, học thuật sau.** Mọi kiến thức hiện có vẫn giữ, nhưng chuyển xuống một mục "Góc học hoá",
   thu gọn mặc định.
2. **Mỗi nguyên tố có một câu "móc câu".** Một dòng tiếng Việt khiến người ta muốn đọc tiếp:
   - _Gali_: "Kim loại tan chảy trong lòng bàn tay bạn."
   - _Sắt_: "Có trong máu bạn và trong lõi Trái Đất."
3. **Con số phải có thứ để so.** Ví dụ:
   - "Nặng gấp 7,9 lần nước", "Nóng chảy ở 1538 °C, nóng hơn dung nham".
   - "Một chiếc nhẫn 3 g chứa khoảng 9 tỉ tỉ nguyên tử".
   - Phần lớn so sánh tính được tự động từ dữ liệu sẵn có.
4. **Câu hỏi trước, câu trả lời sau.** Tiêu đề viết dạng câu hỏi ("Vì sao vàng không bao giờ gỉ?") để tạo
   khoảng trống tò mò; câu trả lời ngắn, 2–3 câu.
5. **Mở nhiều cửa vào.** Người ta không tìm "nguyên tố số 26"; họ tìm "điện thoại", "cơ thể", "đắt nhất",
   "phóng xạ". Trang chủ cần các lối vào theo chủ đề.
6. **Tiếng Việt là chính.** Phần kể chuyện viết bằng tiếng Việt tự nhiên, không dịch máy từ Wikipedia.

---

## 4. Thay đổi đề xuất

### 4.1 Trang nguyên tố: sắp lại thứ tự

```
┌───────────────────────────────────────────────────────────┐
│ [ẢNH THẬT]   Gali · Ga · 31                                │
│              "Kim loại tan chảy trong lòng bàn tay bạn."   │
│              Kim loại · Rắn (nhưng chỉ đến 29,8 °C)        │
├───────────────────────────────────────────────────────────┤
│ BẠN GẶP NÓ Ở ĐÂU                                           │
│  💡 Đèn LED xanh   📱 Chip điện thoại   🌡 Nhiệt kế không thuỷ ngân│
├───────────────────────────────────────────────────────────┤
│ CÓ THỂ BẠN CHƯA BIẾT                                       │
│  ▸ Vì sao thìa gali "biến mất" trong cốc trà?              │
│  ▸ Nguyên tố được dự đoán trước khi tìm thấy               │
├───────────────────────────────────────────────────────────┤
│ NÓI CHO DỄ HÌNH DUNG                                       │
│  Nặng gấp 5,9 lần nước · Tan ở 29,8 °C (thấp hơn thân nhiệt)│
│  Hiếm cỡ nào: … · Giá: …                                   │
├───────────────────────────────────────────────────────────┤
│ AN TOÀN: ✅ Cầm được (nhưng làm bẩn tay, ăn mòn nhôm)     │
├───────────────────────────────────────────────────────────┤
│ ▸ GÓC HỌC HOÁ (thu gọn): cấu hình electron, Bohr,          │
│   ô lượng tử, bảng tính chất đầy đủ, vị trí trong bảng     │
└───────────────────────────────────────────────────────────┘
```

Cụ thể:

- **Hero**:
  - Ảnh thật lớn, kèm ghi công dưới ảnh.
  - Câu móc câu nằm ngay dưới tên.
  - Các nhãn đổi sang ngôn ngữ đời thường: "Khí", "Kim loại quý", "Phóng xạ", thay cho "Khối d · Chu kỳ 4".
- **Bạn gặp nó ở đâu**: 2–4 thẻ đồ vật (icon/emoji + một dòng).
- **Có thể bạn chưa biết**: 2–3 điều thú vị dạng hỏi–đáp, mở rộng khi bấm.
- **Nói cho dễ hình dung**: các con số kèm phép so sánh. Phần lớn sinh tự động:
  - khối lượng riêng so với nước;
  - nhiệt độ nóng chảy/sôi so với các mốc quen thuộc (thân nhiệt, nước sôi, lò nướng, dung nham, bề mặt Mặt Trời);
  - trạng thái ở nhiệt độ phòng;
  - tuổi phát hiện ("tìm ra cách đây 218 năm").
- **An toàn** bằng lời thường, 4 mức:
  - Vô hại
  - Cẩn thận
  - Độc
  - Phóng xạ
- **Góc học hoá**: toàn bộ nội dung M1 hiện có, thu gọn mặc định. Trang tĩnh vẫn render đầy đủ để giữ SEO.

### 4.2 Trang chủ: thêm lối vào theo chủ đề

- **Lăng kính (lenses)**: một hàng chip ngay trên bảng.
  - Bấm một chip thì làm nổi các nguyên tố liên quan, kèm một dòng giải thích.
  - Chạy được ở cả dạng bảng và dạng danh sách.

  | Lăng kính                     | Ví dụ nội dung                                                     | Nguồn dữ liệu                                        |
  | ----------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------- |
  | 🧍 Trong cơ thể bạn          | O 65%, C 18%, H 10%, N 3%… và các vi chất (Fe, Zn, I…)            | Bảng thành phần cơ thể người (Wikipedia, có nguồn)   |
  | 📱 Trong điện thoại          | ~30 nguyên tố; đánh dấu loại đang khan hiếm                        | Bảng EuChemS 2019                                    |
  | 🍳 Trong bếp nhà bạn         | Na, Cl (muối), I (muối i-ốt), Al (giấy bạc), Fe (chảo gang)…       | Tự biên soạn                                         |
  | 💍 Quý và đắt                | Au, Ag, Pt, Pd, Rh…                                                | Tự biên soạn, không ghi giá cụ thể (giá đổi liên tục)|
  | ☢️ Phóng xạ                  | Tc, Pm, Z ≥ 84                                                     | Tính từ dữ liệu (không có đồng vị bền)               |
  | 💧 Lỏng ở nhiệt độ phòng     | Hg, Br; gần lỏng: Ga, Cs, Rb, Fr                                   | Tính từ nhiệt độ nóng chảy                           |
  | 🧪 Chỉ có trong phòng thí nghiệm | Nguyên tố nhân tạo, tồn tại vài giây                          | Tính từ dữ liệu                                      |

- **Ô nguyên tố có biểu tượng đồ vật**: mỗi ô thêm một icon nhỏ (theo tinh thần bảng Enevoldsen), để nhìn lướt
  đã thấy "à, cái này là bóng đèn". Bật/tắt được, phòng khi quá rối.
- **Thẻ xem nhanh khi rê chuột**: thay độ âm điện/cấu hình electron bằng ảnh thật, câu móc câu và 2 công dụng.
- **"Bạn có biết?"**: một thẻ ở vùng trống phía trên bảng, mỗi lần vào là một điều thú vị khác. Chọn ngẫu
  nhiên phía client nên vẫn là trang tĩnh.

### 4.3 Ảnh

- Dùng URL ảnh trong dữ liệu Bowserinator (images-of-elements.com / Wikimedia Commons, phần lớn **CC BY 3.0**).
- Lúc build, tải về, nén sang WebP (~30 KB/ảnh, tổng ~3–4 MB), rồi tự host trong `public/`. Không hotlink.
- Ghi công từng ảnh. Script build kiểm tra trường `attribution`, ảnh nào không phải CC BY/CC BY-SA thì loại.
- Một số nguyên tố siêu nặng không có ảnh ("No Image Found"). Với các nguyên tố này, dùng một hình minh hoạ
  chung kèm câu "chưa ai từng thấy đủ lượng để chụp ảnh". Bản thân câu đó cũng là một điều thú vị.

---

## 5. Nội dung: phần tốn công nhất

Phần code nhỏ; khối lượng thật nằm ở **viết nội dung tiếng Việt cho 118 nguyên tố**.

**Schema** (đặt ở `packages/data/curated/stories/{slug}.ts` hoặc YAML, kiểm tra bằng Zod lúc build):

```ts
{
  hook: { vi, en },                         // 1 câu móc câu
  uses: [{ icon, vi, en }],                 // 2–4 đồ vật
  facts: [{ q: { vi, en }, a: { vi, en }, source }], // 2–3 điều thú vị, mỗi điều có link nguồn
  safety: 'harmless' | 'careful' | 'toxic' | 'radioactive',
  lenses: ['body', 'phone', 'kitchen', 'precious'],
}
```

**Thứ tự làm**:

1. **40 nguyên tố quen thuộc** (H→Zn, Ag, Sn, I, W, Pt, Au, Hg, Pb, U, Ra, Rn…) viết đầy đủ.
2. Các nguyên tố còn lại: chỉ cần câu móc câu, công dụng và mức an toàn.
3. Nhóm siêu nặng: một khuôn chung ("được tạo ra vài nguyên tử, tồn tại chưa tới một giây") cộng thêm chi tiết
   riêng: ai tạo ra, tên đặt theo ai/nơi nào.

**Cách viết**:

- Dùng AI soạn nháp. Mỗi điều thú vị phải có link nguồn (Wikipedia, RSC, PubChem) và được người kiểm tra lại.
  Test build bắt buộc mỗi `fact` có `source`.
- Câu ngắn, xưng "bạn".
- Tránh thuật ngữ. Nếu bắt buộc dùng thì giải thích ngay trong câu.

---

## 6. Lộ trình đề xuất (chen vào trước M2: "M1.5 Thân thiện")

| Bước | Việc                                                                                 | Giá trị với người dùng | Công sức |
| ---- | ------------------------------------------------------------------------------------ | ---------------------- | -------- |
| 1    | Pipeline ảnh (tải, nén, ghi công) + hero trang nguyên tố và thẻ xem nhanh có ảnh thật | Rất cao                | Thấp     |
| 2    | Sắp lại trang nguyên tố; dồn phần học thuật vào "Góc học hoá" thu gọn                 | Cao                    | Thấp     |
| 3    | "Nói cho dễ hình dung": so sánh tự động từ dữ liệu sẵn có                             | Cao                    | Thấp     |
| 4    | Lăng kính tính được từ dữ liệu (phóng xạ, lỏng, nhân tạo) + lăng kính cơ thể/điện thoại | Cao                  | Trung bình |
| 5    | Schema nội dung + 40 nguyên tố đầu (móc câu, công dụng, điều thú vị, an toàn)        | Rất cao                | **Cao**  |
| 6    | Icon đồ vật trên ô + thẻ "Bạn có biết?"                                              | Trung bình             | Trung bình |
| 7    | Nội dung cho 78 nguyên tố còn lại                                                    | Trung bình             | Cao      |

Bước 1–3 làm được ngay, không cần viết nội dung, và đã thay đổi rõ cảm giác khi vào trang.
Bước 5 là nơi sản phẩm thực sự khác biệt, nhưng tốn công nhất.

Các phần M2+ trong kế hoạch cũ (orbital 3D, cân bằng phương trình…) vẫn giữ, chỉ lùi lại sau.

---

## Nguồn tham khảo

- [Keith Enevoldsen: The Periodic Table in Pictures and Words (giới thiệu trên Mental Floss)](https://www.mentalfloss.com/article/502751/illustrated-periodic-table-shows-how-we-regularly-interact-each-element)
- [Interactive periodic table finally clues us in to what elements are used for (The Next Web)](https://thenextweb.com/science/2017/06/28/interactive-periodic-table-finally-clues-us-in-to-what-elements-are-used-for/)
- [Science Museum Group: Science engagement reflection tool, using everyday examples](https://learning.sciencemuseumgroup.org.uk/science-engagement-reflection-tool-using-everyday-examples)
- [Museums Association: Ulster Museum Elements (vox pop)](https://www.museumsassociation.org/museums-journal/opinion/2017/01/01022017-voxpop/)
- [The Elements by Theodore Gray (App Store)](https://apps.apple.com/app/elements-visual-exploration/id364147847)
- [Đại học St Andrews: Chemical elements which make up mobile phones placed on 'endangered list'](https://news.st-andrews.ac.uk/?p=18670)
- [Optica: An "endangered list" for chemical elements](https://www.optica-opn.org/home/industry/2019/january/an_endangered_list%E2%80%9D_for_chemical_elements)
- [Wikipedia: Composition of the human body](https://en.wikipedia.org/wiki/Composition_of_the_human_body)
- [Wikipedia: WikiProject Elements/Pictures](https://www.wikipedia.org/wiki/Wikipedia:WikiProject_Elements/Pictures)
- [Compound Interest: content usage guidelines (CC BY-NC-ND, không dùng làm phái sinh được)](https://www.compoundchem.com/content-usage-guidelines/)

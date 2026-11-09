# Ý tưởng sản phẩm: Bảng Tuần Hoàn Tương Tác (tên tạm: **Nguyên Tố**)

> Phiên bản: 0.1 · Ngày: 2026-11-09 · Trạng thái: ý tưởng / đề xuất

---

## 1. Tổng quan

Một website học và khám phá hoá học, lấy **bảng tuần hoàn tương tác** làm trang chính. Bấm vào một ô nguyên tố sẽ mở trang chi tiết có:

- ảnh thật của mẫu nguyên tố,
- mô hình nguyên tử (Bohr 2D có chuyển động và đám mây orbital 3D),
- mô hình phân tử / cấu trúc tinh thể 3D của đơn chất và các hợp chất tiêu biểu,
- dữ liệu, đồng vị, lịch sử, ứng dụng, an toàn.

Quanh bảng tuần hoàn là một bộ **công cụ hoá học** (cân bằng phương trình, tính khối lượng mol, trình dựng phân tử, phòng thí nghiệm ảo...) và **chế độ học** (quiz, flashcard, lộ trình theo chương trình SGK).

### 1.1 Vấn đề cần giải quyết

| Vấn đề                                                                                                       | Cách giải quyết                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Bảng tuần hoàn in trên giấy tĩnh, khó hình dung nguyên tử và phân tử                                         | Mô hình 3D xoay được, có hiệu ứng chuyển động                                        |
| Các trang tốt nhất (Ptable, periodic-table.io...) chủ yếu bằng tiếng Anh, chưa bám chương trình học Việt Nam | Ưu tiên tiếng Việt, gắn nội dung với chương trình Hoá 10–12 (chương trình GDPT 2018) |
| Công cụ (cân bằng PT, tính mol, tra hợp chất) nằm rải rác ở nhiều trang                                      | Gom về một nơi, các công cụ liên kết với nhau                                        |
| Học thuộc bảng tuần hoàn nhàm chán                                                                           | Có game hoá, quiz, chuỗi ngày học                                                    |

### 1.2 Đối tượng người dùng

1. **Học sinh THPT** (chính): ôn cấu hình electron, xu hướng tuần hoàn, cân bằng phương trình, chuẩn bị thi THPT.
2. **Giáo viên**: trình chiếu mô hình 3D trên lớp, tạo bộ quiz.
3. **Sinh viên** ngành hoá, dược, vật liệu: tra dữ liệu nhanh, xem cấu trúc tinh thể.
4. **Người yêu khoa học**: khám phá ảnh, câu chuyện, ứng dụng của nguyên tố.

### 1.3 Điểm khác biệt

- **Tiếng Việt trước** (có tiếng Anh), dùng tên IUPAC theo cách gọi trong SGK mới (ví dụ: _sodium / natri_, _potassium / kali_ — hiện cả hai tên).
- **Hình ảnh trực quan ở mọi bước**: nguyên tử → orbital → phân tử → tinh thể → ứng dụng ngoài đời.
- **Mọi thứ đều liên kết**: bấm "O" trong phương trình sẽ mở trang Oxygen; bấm một hợp chất trong trang Oxygen sẽ mở trình xem 3D và đưa nó vào máy tính khối lượng mol.
- **Dùng được khi không có mạng** (PWA): dữ liệu lõi đóng gói sẵn, mở được trong lớp học không có wifi.

---

## 2. Trang chính: Bảng tuần hoàn

### 2.1 Bố cục

- Bố cục chuẩn 18 cột, nhóm Lanthan/Actini tách xuống dưới. Có nút chuyển sang **bố cục 32 cột** (đặt f-block vào giữa bảng).
- Mỗi ô hiển thị: số hiệu, ký hiệu, tên (vi), khối lượng nguyên tử. Khi phóng to sẽ hiện thêm cấu hình electron rút gọn và độ âm điện.
- **Di chuột (hover)**: thẻ xem nhanh nổi lên với ảnh thu nhỏ và 4–5 thông số chính. Phía trên bảng có một vùng "xem trước" lớn, giống cách Ptable làm.
- **Bấm vào ô**: mở trang chi tiết (mục 3). Trên desktop dùng panel trượt từ bên phải, trên mobile dùng trang riêng. URL đổi theo, ví dụ `/element/fe`, để chia sẻ được.
- **Mobile**: bảng cuộn ngang được, có thể pinch-zoom; có thêm chế độ **danh sách** (lọc và tìm kiếm) để dùng trên màn hình nhỏ.

### 2.2 Chế độ tô màu (color modes)

Chuyển qua lại bằng thanh chọn ở trên bảng:

| Chế độ                  | Mô tả                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loại nguyên tố          | Kim loại kiềm, kiềm thổ, chuyển tiếp, hậu chuyển tiếp, á kim, phi kim, halogen, khí hiếm, Lanthan, Actini                                            |
| Khối s/p/d/f            | Tô theo phân lớp electron ngoài cùng                                                                                                                 |
| Trạng thái ở nhiệt độ T | Có **thanh trượt nhiệt độ** (0 K → 6000 K). Ô đổi màu rắn/lỏng/khí theo nhiệt độ nóng chảy và nhiệt độ sôi; có hiệu ứng chuyển cảnh                  |
| Bản đồ nhiệt xu hướng   | Độ âm điện, bán kính nguyên tử, năng lượng ion hoá thứ nhất, ái lực electron, mật độ, nhiệt độ nóng chảy/sôi... Dùng thang màu liên tục, có chú giải |
| Năm phát hiện           | Có **thanh trượt thời gian**: kéo từ thời cổ đại đến nay, các ô "xuất hiện" dần theo năm được phát hiện                                              |
| Độ phổ biến             | Trong vỏ Trái Đất, vũ trụ, cơ thể người, nước biển                                                                                                   |
| Nguồn gốc vũ trụ        | Big Bang, sao lùn, siêu tân sao, sao neutron va chạm, nhân tạo                                                                                       |
| Phóng xạ / độc tính     | Cảnh báo an toàn                                                                                                                                     |

**Chế độ 3D**: chiều cao mỗi ô bằng giá trị của thuộc tính đang chọn, tạo thành bảng tuần hoàn dạng "thành phố". Xu hướng tuần hoàn hiện ra rất rõ.

### 2.3 Tìm kiếm và lọc

- Ô tìm kiếm chung (phím tắt `/` hoặc `Ctrl+K`): tìm theo tên vi/en, ký hiệu, số hiệu, và cả **hợp chất** ("muối ăn", "NaCl", "aspirin").
- Bộ lọc: nhóm, chu kỳ, khối, trạng thái, khoảng giá trị (ví dụ "độ âm điện > 3").
- Ô không khớp bộ lọc sẽ mờ đi, không bị ẩn, để giữ nguyên bố cục bảng.

### 2.4 So sánh nhanh

Giữ `Shift` và bấm nhiều ô (tối đa 4), hoặc kéo thả vào "khay so sánh", để mở bảng so sánh song song kèm biểu đồ radar.

---

## 3. Trang chi tiết nguyên tố

Đầu trang (header) hiện lớn: ký hiệu, tên vi/en, số hiệu, khối lượng nguyên tử, ảnh mẫu, loại nguyên tố (theo màu), nút ★ yêu thích, nút chia sẻ, nút ← → để chuyển sang nguyên tố kế bên.

Nội dung chia thành các tab:

### 3.1 Tab "Tổng quan"

- Mô tả ngắn 2–3 câu bằng tiếng Việt và một "sự thật thú vị".
- Thẻ thông số: cấu hình electron, độ âm điện (Pauling), các số oxi hoá thường gặp, bán kính, năng lượng ion hoá, trạng thái ở 25 °C, nhiệt độ nóng chảy/sôi, mật độ, cấu trúc tinh thể.
- Vị trí trong bảng: bảng tuần hoàn thu nhỏ, đánh dấu ô hiện tại, có giải thích vì sao nguyên tố nằm ở chu kỳ và nhóm đó (gắn với cấu hình e).

### 3.2 Tab "Hình ảnh"

- **Ảnh mẫu thật** của nguyên tố (kim loại, tinh thể, khí phát sáng trong ống phóng điện).
- **Thư viện ảnh**: khoáng vật chứa nguyên tố, ứng dụng ngoài đời (ví dụ Ne là đèn neon, W là dây tóc bóng đèn, Si là tấm wafer).
- **Màu ngọn lửa** khi đốt (Li đỏ, Na vàng, K tím, Cu xanh lục...), làm bằng video hoặc hiệu ứng.
- **Phổ phát xạ / hấp thụ**: vạch phổ vẽ từ dữ liệu NIST, có thanh bước sóng và màu tương ứng. Rất hợp để minh hoạ bài cấu tạo nguyên tử.
- Ghi chú bản quyền dưới mỗi ảnh (xem mục 6).

### 3.3 Tab "Mô hình nguyên tử" ⭐ (tính năng nổi bật)

Bốn chế độ xem, chuyển bằng các nút:

1. **Mô hình Bohr (2D/2.5D)**
   - Hạt nhân (số p và n hiện bằng chấm hoặc con số) và các lớp vỏ K, L, M, N... với electron chuyển động quanh.
   - Nút "dựng nguyên tử": thêm electron từng cái một theo thứ tự điền.
   - Chọn đồng vị để xem số neutron thay đổi.

2. **Đám mây orbital 3D (mô hình cơ học lượng tử)**
   - Vẽ các orbital s, p, d, f bằng **đám mây điểm**. Điểm được lấy mẫu Monte Carlo từ |ψ|² của hàm sóng kiểu nguyên tử hydro, hoặc vẽ thành mặt đẳng trị (isosurface).
   - Bật/tắt từng orbital (1s, 2s, 2pₓ, 2p_y, 2p_z, 3d_z²...). Tô màu theo dấu (pha) của hàm sóng.
   - Ghi chú rõ đây là xấp xỉ: hàm sóng kiểu hydro, minh hoạ hình dạng chứ không phải lời giải chính xác cho nguyên tử nhiều electron.

3. **Sơ đồ ô lượng tử (orbital box diagram)**
   - Các ô vuông với mũi tên ↑↓ theo nguyên lý Pauli, quy tắc Hund và trật tự Aufbau.
   - Có **hoạt hoạ điền electron** từng bước, có giọng/chú thích giải thích từng quy tắc.
   - Đánh dấu và giải thích các ngoại lệ: Cr (3d⁵4s¹), Cu (3d¹⁰4s¹), Mo, Ag, Au...
   - Có sơ đồ đường chéo Klechkovsky (quy tắc n + l).

4. **Ion & số oxi hoá**
   - Chọn số oxi hoá (ví dụ Fe²⁺ / Fe³⁺) để xem electron bị bớt đi hay thêm vào, và vì sao Fe³⁺ bền (3d⁵ bán bão hoà).

### 3.4 Tab "Phân tử & Cấu trúc" ⭐

- **Dạng đơn chất**: mô hình 3D của dạng tồn tại tự nhiên:
  - Phân tử: H₂, N₂, O₂, **O₃**, Cl₂, P₄ (trắng), S₈ (vòng), các fullerene C₆₀.
  - **Dạng thù hình** để so sánh: kim cương / than chì / graphene / C₆₀ của carbon; P trắng / đỏ / đen; O₂ / O₃.
  - **Mạng tinh thể** của kim loại: lập phương tâm khối (Fe-α, Na), lập phương tâm mặt (Cu, Al, Au), lục phương (Mg, Zn). Có ô mạng cơ sở và nút "nhân rộng" 2×2×2, 3×3×3.
- **Hợp chất tiêu biểu** (mỗi nguyên tố 5–10 chất), ví dụ Na: NaCl (tinh thể), NaOH, NaHCO₃, Na₂CO₃.
  - Trình xem 3D có các kiểu hiển thị: que-bóng (ball-and-stick), que (stick), lấp đầy không gian (space-filling, van der Waals), dây.
  - Hiện góc liên kết, độ dài liên kết, có thể đo khoảng cách giữa hai nguyên tử khi bấm chọn.
  - Liên hệ **mô hình VSEPR**: nhãn hình học phân tử (thẳng, tam giác phẳng, tứ diện, chóp tam giác, chữ V...).
  - Mỗi hợp chất có thẻ: công thức, tên IUPAC/thông dụng, khối lượng mol, ứng dụng, link sang PubChem.
- Nút **"Mở trong Trình dựng phân tử"** (mục 4.3).

### 3.5 Tab "Đồng vị"

- Danh sách đồng vị: số khối, độ phổ biến tự nhiên, bền / phóng xạ, chu kỳ bán rã, kiểu phân rã.
- **Mô phỏng phân rã**: một khối hạt nhân phân rã theo thời gian, kèm đồ thị hàm mũ và thanh trượt thời gian (ví dụ C-14 trong định tuổi carbon).
- Vị trí trên **bản đồ hạt nhân** (bảng Segrè) thu nhỏ.

### 3.6 Tab "Lịch sử & Tên gọi"

- Người phát hiện, năm, nơi phát hiện, câu chuyện ngắn.
- Nguồn gốc tên gọi (ví dụ: _Hydrogen_ = "sinh ra nước"; _Helium_ từ _Helios_ là Mặt Trời).
- Đặt vào **dòng thời gian phát hiện** chung (mục 4.8).

### 3.7 Tab "Ứng dụng & Đời sống"

- Ứng dụng công nghiệp, y học, công nghệ.
- Vai trò sinh học: thiết yếu / vi lượng / độc hại; hàm lượng trong cơ thể người.
- Nguồn khai thác, các nước sản xuất chính, mức giá tham khảo (nếu có dữ liệu).
- **Liên hệ Việt Nam**: ví dụ bauxite (Al) ở Tây Nguyên, đất hiếm ở Lai Châu, titan ở ven biển miền Trung. Cần kiểm chứng nguồn trước khi đăng.

### 3.8 Tab "An toàn"

- Biểu tượng cảnh báo GHS, mức độc, phóng xạ, phản ứng nguy hiểm (ví dụ Na phản ứng mạnh với nước).
- Ghi chú rõ: _thông tin chỉ mang tính giáo dục, không thay thế tài liệu an toàn hoá chất (SDS)_.

### 3.9 Tab "Trong chương trình học"

- Bài học nào trong SGK Hoá 10/11/12 nhắc tới nguyên tố này, kèm các phản ứng cần nhớ.
- Bộ câu hỏi luyện tập ngắn ngay trong tab, nối với chế độ Học (mục 5).

---

## 4. Bộ công cụ hoá học

Tất cả công cụ nằm ở menu **Công cụ** và liên kết hai chiều với bảng tuần hoàn.

### 4.1 Cân bằng phương trình hoá học

- Nhập: `Fe + O2 -> Fe2O3` hoặc `KMnO4 + HCl = KCl + MnCl2 + Cl2 + H2O`.
- Thuật toán: lập ma trận số nguyên tử theo từng nguyên tố, tìm **không gian null** bằng khử Gauss trên **số hữu tỉ** (không dùng số thực dấu phẩy động), rồi quy về hệ số nguyên nhỏ nhất. Hỗ trợ ion (có điện tích) và phản ứng oxi hoá – khử.
- Hiện **từng bước giải** theo cả 2 cách: phương pháp đại số và phương pháp **thăng bằng electron** (cách được dạy trong SGK).
- Bấm vào chất trong phương trình để xem mô hình 3D và khối lượng mol.

### 4.2 Máy tính khối lượng mol & thành phần phần trăm

- Nhập công thức: `CuSO4·5H2O`, `Ca(OH)2`, `(NH4)3PO4`.
- Kết quả: M (g/mol), % khối lượng từng nguyên tố (biểu đồ tròn), số nguyên tử.
- Chuyển đổi gram ↔ mol ↔ số hạt ↔ thể tích khí (đktc / đkc theo quy ước SGK mới).
- **Tính toán hoá học (stoichiometry)**: chọn phương trình đã cân bằng, nhập lượng một chất để tính các chất còn lại, có tìm **chất hết / chất dư**.

### 4.3 Trình dựng phân tử (Molecule Builder)

- Kéo nguyên tử từ bảng tuần hoàn mini vào khung, nối liên kết đơn/đôi/ba.
- Tự kiểm tra hoá trị; tự tối ưu hình học 3D (dùng trường lực đơn giản hoặc gọi dịch vụ chuyển SMILES sang 3D).
- Nhận dạng chất vừa dựng ("Bạn vừa dựng: Ethanol C₂H₅OH") bằng cách tra PubChem theo SMILES/InChI.
- Hiện hình học VSEPR và cặp electron tự do.

### 4.4 Tra cứu hợp chất

- Tìm theo tên (vi/en), công thức, SMILES để lấy dữ liệu từ PubChem: cấu trúc 2D, mô hình 3D, khối lượng mol, tính chất, cảnh báo an toàn.
- Có bộ từ điển **tên tiếng Việt ↔ tên IUPAC** cho khoảng 500 chất phổ biến trong chương trình học.

### 4.5 Phòng thí nghiệm ảo (Virtual Lab)

- Chọn 2 chất trong kệ hoá chất rồi "đổ" vào ống nghiệm để xem hiện tượng mô phỏng: đổi màu, kết tủa, sủi bọt khí, toả nhiệt. Đi kèm phương trình và giải thích.
- Bắt đầu với một **bộ phản ứng được tuyển chọn** (khoảng 50–100 phản ứng trong SGK), không mô phỏng phản ứng tuỳ ý.
- Các thí nghiệm kinh điển: Na + H₂O, thử màu ngọn lửa, chỉ thị pH (quỳ tím, phenolphthalein), điện phân nước, Cu + AgNO₃ ("cây bạc").

### 4.6 Các bảng tra cứu bổ trợ

- **Bảng tính tan** (anion × cation), tô màu tan / ít tan / không tan.
- **Dãy hoạt động hoá học của kim loại** (dãy điện hoá), có mô phỏng "kim loại A có đẩy được kim loại B ra khỏi dung dịch muối không".
- **Thang pH** tương tác với các chất quen thuộc.
- **Bảng hằng số**: N_A, R, F, thế điện cực chuẩn...
- **Bảng ion thường gặp** (đa nguyên tử): SO₄²⁻, NO₃⁻, NH₄⁺, PO₄³⁻...

### 4.7 Đồ thị xu hướng tuần hoàn

- Đồ thị đường hoặc cột của một thuộc tính theo số hiệu nguyên tử (Z), thấy rõ tính tuần hoàn (ví dụ năng lượng ion hoá có đỉnh ở khí hiếm).
- Chọn 2 thuộc tính để vẽ **đồ thị tán xạ** (ví dụ bán kính và độ âm điện), mỗi điểm là một nguyên tố, tô màu theo nhóm.

### 4.8 Dòng thời gian phát hiện nguyên tố

- Trục thời gian từ thời cổ đại (Cu, Au, Fe...) đến 2010 (Ts, nguyên tố 117). Có các mốc: Lavoisier, Mendeleev (1869, các ô trống được dự đoán), Curie, các máy gia tốc.
- Phần đặc biệt: **"Bảng của Mendeleev"**, so sánh dự đoán của ông về eka-silicon với germanium thực tế.

### 4.9 Trợ lý AI hoá học (⛔ không làm ở bản hiện tại vì cần server; xem `ke-hoach-implement.md` mục 13)

- Hỏi đáp bằng tiếng Việt, có ngữ cảnh: đang xem nguyên tố hoặc phản ứng nào thì trợ lý biết điều đó.
- Giải thích từng bước bài tập, gợi ý thay vì đưa đáp án ngay (chế độ "gia sư").
- Kết quả tính toán phải lấy từ công cụ trong app (máy tính mol, cân bằng PT), không để mô hình ngôn ngữ tự tính, để tránh sai số.
- Có thể dùng Claude API (ví dụ `claude-sonnet-5-5` cho tốc độ và chi phí hợp lý).

---

## 5. Chế độ Học & Trò chơi

| Tính năng                        | Mô tả                                                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Quiz bảng tuần hoàn**          | Hiện ô trống, người chơi gõ hoặc kéo ký hiệu vào đúng vị trí; tính giờ và lưu kỷ lục cá nhân (bảng xếp hạng chung không làm ở bản hiện tại) |
| **Đoán nguyên tố**               | Đưa gợi ý dần ("Tôi là kim loại lỏng ở nhiệt độ phòng...")                                                                                  |
| **Flashcard lặp lại ngắt quãng** | Ký hiệu ↔ tên, cấu hình e, hoá trị; dùng thuật toán SM-2 hoặc FSRS                                                                          |
| **Thử thách cấu hình e**         | Điền mũi tên vào ô lượng tử cho một nguyên tố hoặc ion ngẫu nhiên                                                                           |
| **Thử thách cân bằng**           | Phương trình có độ khó tăng dần                                                                                                             |
| **Ghép đôi**                     | Nối nguyên tố với ứng dụng, ảnh mẫu với tên                                                                                                 |
| **Thẻ nguyên tố sưu tầm**        | Mỗi lần học xong một nguyên tố sẽ "mở khoá" một thẻ; mục tiêu là sưu tầm đủ 118 thẻ                                                         |
| **Chuỗi ngày học & huy hiệu**    | Gamification nhẹ, tạo động lực                                                                                                              |
| **Lộ trình theo SGK**            | Các bài: Cấu tạo nguyên tử → Bảng tuần hoàn → Liên kết hoá học → Phản ứng oxi hoá khử... Mỗi bài dùng lại mô hình 3D và công cụ của app     |
| **Chế độ giáo viên**             | Tạo bộ câu hỏi, chia sẻ qua link hoặc file (không có mã lớp hay tài khoản ở bản hiện tại), chế độ trình chiếu toàn màn hình với chữ to      |

> **Bản hiện tại là web tĩnh, không cần tài khoản.** Mọi tiến độ học lưu trên trình duyệt và có thể xuất/nhập ra file.

---

## 6. Nguồn dữ liệu & bản quyền

| Dữ liệu                                            | Nguồn đề xuất                                                                                                       | Ghi chú                                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thuộc tính nguyên tố (118)                         | **PubChem Periodic Table** (`https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON`)                         | Dữ liệu chính phủ Mỹ, dùng tự do; giới hạn 5 request/giây nên **tải về một lần lúc build**, không gọi khi người dùng truy cập                                 |
| Bổ sung (lớp vỏ, mô tả, toạ độ trên bảng, URL ảnh) | **Bowserinator/Periodic-Table-JSON** (GitHub)                                                                       | Phải kiểm tra file LICENSE trực tiếp (các nguồn ghi giấy phép khác nhau); có đoạn mô tả lấy từ Wikipedia (CC BY-SA)                                           |
| Hợp chất, cấu trúc 2D/3D (SDF)                     | **PubChem PUG-REST**: `/rest/pug/compound/cid/<CID>/record/SDF?record_type=3d`, `/compound/name/<tên>/property/...` | Gọi lúc chạy kèm cache; các hợp chất tiêu biểu thì tải sẵn lúc build                                                                                          |
| Cấu trúc tinh thể (CIF)                            | **Crystallography Open Database (COD)**, Materials Project                                                          | COD là dữ liệu mở                                                                                                                                             |
| Vạch phổ nguyên tử                                 | **NIST Atomic Spectra Database**                                                                                    | Tiền xử lý thành JSON gọn                                                                                                                                     |
| Đồng vị                                            | IAEA LiveChart of Nuclides / NUBASE                                                                                 | Tiền xử lý                                                                                                                                                    |
| Ảnh mẫu nguyên tố                                  | **images-of-elements.com** (CC BY 3.0, trừ khi ghi khác), **Wikimedia Commons**                                     | Bắt buộc ghi công và link về trang gốc; **kiểm tra giấy phép từng ảnh**. _Không_ dùng ảnh của Theodore Gray / periodictable.com (ảnh có bản quyền thương mại) |
| Nội dung tiếng Việt                                | Tự biên soạn, đối chiếu SGK                                                                                         | Cần người có chuyên môn rà soát                                                                                                                               |

Nguyên tắc: tất cả dữ liệu lõi được **đóng gói tĩnh** vào app (khoảng 1–3 MB JSON nén). Chỉ phần tra cứu hợp chất tuỳ ý mới cần internet.

---

## 7. Kiến trúc kỹ thuật đề xuất

### 7.1 Stack

| Lớp                              | Lựa chọn                                                                       | Lý do                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Framework                        | **Next.js (App Router) + TypeScript**, xuất trang tĩnh cho 118 trang nguyên tố | Tốt cho SEO (mỗi nguyên tố là một trang, người dùng tìm "cấu hình electron Fe" trên Google sẽ ra trang này), chia sẻ link dễ |
| UI                               | Tailwind CSS + Radix/shadcn                                                    | Nhanh, dễ làm accessibility                                                                                                  |
| Hoạt hoạ 2D                      | Framer Motion, SVG                                                             | Mô hình Bohr, sơ đồ ô lượng tử                                                                                               |
| 3D nguyên tử / orbital / bảng 3D | **Three.js** qua **react-three-fiber** + drei                                  | Đám mây điểm orbital, instanced mesh, hiệu năng tốt                                                                          |
| 3D phân tử / tinh thể            | **3Dmol.js** (đọc được SDF, PDB, MOL2, XYZ, CIF)                               | Đúng chuẩn hoá học, nạp thẳng SDF từ PubChem; cân nhắc **Mol\*** nếu cần nâng cao                                            |
| Vẽ cấu trúc 2D                   | RDKit.js (WASM) hoặc SmilesDrawer                                              | SMILES → cấu trúc 2D; RDKit còn kiểm tra hoá trị cho trình dựng phân tử                                                      |
| Biểu đồ                          | Observable Plot / Recharts / D3                                                | Đồ thị xu hướng, phổ, phân rã                                                                                                |
| Trạng thái                       | Zustand                                                                        | Nhẹ                                                                                                                          |
| Tìm kiếm                         | Fuse.js (tìm mờ, có xử lý dấu tiếng Việt)                                      | Chạy hoàn toàn trên trình duyệt                                                                                              |
| i18n                             | next-intl (vi mặc định, en)                                                    |                                                                                                                              |
| Offline                          | PWA (service worker), cache dữ liệu lõi và model 3D                            | Dùng được trong lớp học                                                                                                      |
| Backend                          | **Không có**: web hoàn toàn tĩnh                                               | Tiến độ học lưu bằng IndexedDB; PubChem cho phép CORS nên gọi thẳng từ trình duyệt                                           |
| Deploy                           | Static export → Cloudflare Pages / Netlify / GitHub Pages                      |                                                                                                                              |

### 7.2 Cấu trúc thư mục dự kiến

```
chemistry/
├── docs/                      # tài liệu (file này)
├── scripts/                   # pipeline dữ liệu: tải PubChem, NIST, COD → JSON
├── data/
│   ├── elements.json          # 118 nguyên tố (đã gộp và chuẩn hoá)
│   ├── elements.vi.json       # nội dung tiếng Việt
│   ├── compounds/             # SDF/JSON hợp chất tiêu biểu
│   ├── crystals/              # CIF đơn chất
│   ├── spectra/               # vạch phổ
│   └── reactions.json         # bộ phản ứng cho phòng thí nghiệm ảo
├── src/
│   ├── app/                   # routes: /, /element/[symbol], /tools/*, /learn/*
│   ├── components/
│   │   ├── periodic-table/    # Bảng, Ô, Chú giải, Bộ lọc, Thanh trượt
│   │   ├── atom/              # BohrModel, OrbitalCloud, OrbitalBoxDiagram
│   │   ├── molecule/          # MoleculeViewer (3Dmol), CrystalViewer
│   │   └── tools/             # Balancer, MolarMass, Builder...
│   ├── lib/
│   │   ├── chem/              # parser công thức, cân bằng PT, cấu hình e, hàm sóng orbital
│   │   └── pubchem.ts
│   └── styles/
└── public/images/elements/
```

### 7.3 Mô hình dữ liệu nguyên tố (rút gọn)

```ts
interface Element {
  z: number; // số hiệu
  symbol: string; // "Fe"
  name: { vi: string; en: string; viAlt?: string }; // "Sắt", "Iron"
  atomicMass: number;
  category: Category; // "transition-metal" ...
  block: "s" | "p" | "d" | "f";
  group: number | null;
  period: number;
  xpos: number;
  ypos: number; // vị trí trên lưới
  electronConfig: string; // "[Ar] 3d6 4s2"
  shells: number[]; // [2, 8, 14, 2]
  oxidationStates: number[];
  electronegativity?: number;
  atomicRadius?: number; // pm
  ionizationEnergies: number[]; // kJ/mol
  electronAffinity?: number;
  meltingPoint?: number;
  boilingPoint?: number; // K
  density?: number;
  phaseAtSTP: "solid" | "liquid" | "gas";
  crystalStructure?: string; // "bcc"
  discovery: { year?: number; by?: string; story?: { vi: string } };
  abundance: { crust?: number; universe?: number; human?: number };
  isotopes: Isotope[];
  images: { src: string; credit: string; license: string; sourceUrl: string }[];
  allotropes?: { name: string; structureFile: string }[];
  keyCompounds: { cid: number; formula: string; name: { vi: string } }[];
  curriculum?: { grade: 10 | 11 | 12; lesson: string }[];
}
```

### 7.4 Các thuật toán chính

- **Phân tích công thức**: parser đệ quy hỗ trợ ngoặc `()`, `[]`, dấu chấm hydrat `·` hoặc `.`, điện tích `^2+`.
- **Cân bằng phương trình**: ma trận nguyên tố × chất → không gian null trên số hữu tỉ (dùng BigInt fraction) → nhân với BCNN để ra hệ số nguyên. Báo lỗi nếu có nhiều nghiệm độc lập (phương trình chưa xác định duy nhất) hoặc không có nghiệm.
- **Cấu hình electron**: điền theo thứ tự Madelung, kèm bảng ngoại lệ đã biết; sinh ra cả dạng đầy đủ, dạng rút gọn khí hiếm và sơ đồ ô.
- **Orbital**: tính ψ(n, l, m) kiểu hydro (đa thức Laguerre liên kết × hàm cầu thực), lấy mẫu loại bỏ (rejection sampling) khoảng 20–50k điểm, chạy trong **Web Worker** để không làm đứng giao diện.
- **Trạng thái theo nhiệt độ**: so T với nhiệt độ nóng chảy và nhiệt độ sôi; nguyên tố thiếu dữ liệu thì hiện "chưa rõ".

### 7.5 Hiệu năng & khả năng tiếp cận

- Mỗi viewer 3D chỉ tải khi mở tab tương ứng (lazy-load). Trên máy yếu thì giảm số điểm và bóng đổ.
- Tôn trọng `prefers-reduced-motion`.
- Bảng tuần hoàn điều hướng được bằng bàn phím (phím mũi tên), có ARIA grid, đọc được bằng trình đọc màn hình.
- Không chỉ dựa vào màu: kèm ký hiệu hoặc hoa văn, dùng bảng màu an toàn cho người mù màu.
- Có giao diện sáng và tối.

---

## 8. Thiết kế giao diện (định hướng)

- **Phong cách**: sạch, hiện đại, "phòng thí nghiệm ban đêm". Nền tối dịu, ô nguyên tố phát sáng nhẹ theo màu nhóm. Có chế độ sáng cho in ấn và trình chiếu.
- **Font**: Inter / Be Vietnam Pro (hiển thị tiếng Việt tốt); số liệu dùng font monospace có chữ số đều độ rộng (tabular).
- **Chuyển cảnh**: khi bấm ô, ô "phóng to" thành header của trang chi tiết (shared-element transition).
- **Trang chủ** gồm: bảng tuần hoàn ở trung tâm; trên bảng là thanh chọn chế độ màu, thanh trượt và ô tìm kiếm; dưới bảng là "Nguyên tố của ngày", lối tắt tới công cụ, tiến độ học.

Phác thảo bố cục desktop:

```
┌──────────────────────────────────────────────────────────────┐
│ Logo   [🔍 Tìm nguyên tố, hợp chất...]   Công cụ  Học  vi/en ☾ │
├──────────────────────────────────────────────────────────────┤
│ Tô màu: [Loại ▾]  Nhiệt độ: ━━━●━━━ 298 K   [2D|3D] [18|32]  │
│ ┌────────────── vùng xem trước khi hover ──────────────┐     │
│ │  26  Fe  Sắt · Iron · 55.845 · [Ar]3d⁶4s²   [ảnh]    │     │
│ └──────────────────────────────────────────────────────┘     │
│ H                                                        He  │
│ Li Be                                   B  C  N  O  F  Ne    │
│ ...                     (bảng 118 ô)                         │
│        La ... Lu                                             │
│        Ac ... Lr                                             │
├──────────────────────────────────────────────────────────────┤
│ ⭐ Nguyên tố của ngày | ⚖️ Cân bằng PT | 🧪 Lab ảo | 📈 Xu hướng │
└──────────────────────────────────────────────────────────────┘
```

---

## 9. Lộ trình phát triển

### Giai đoạn 1: MVP (khoảng 4–6 tuần)

- [ ] Pipeline dữ liệu: PubChem + Bowserinator → `elements.json`, kèm script kiểm tra dữ liệu
- [ ] Bảng tuần hoàn 18 cột, hover, bấm mở chi tiết, URL riêng cho từng nguyên tố
- [ ] 4 chế độ màu: loại, khối, trạng thái có thanh nhiệt độ, bản đồ nhiệt độ âm điện
- [ ] Tìm kiếm có xử lý dấu tiếng Việt
- [ ] Trang chi tiết: Tổng quan, Hình ảnh (ảnh mẫu), Mô hình Bohr, sơ đồ ô lượng tử
- [ ] Trình xem phân tử 3Dmol cho đơn chất và 3–5 hợp chất mỗi nguyên tố (khoảng 30 nguyên tố phổ biến trước)
- [ ] Máy tính khối lượng mol
- [ ] Giao diện tiếng Việt, responsive, dark mode

### Giai đoạn 2: Hình ảnh hoá sâu (4–6 tuần)

- [ ] Đám mây orbital 3D (Web Worker)
- [ ] Cấu trúc tinh thể (CIF) và dạng thù hình
- [ ] Phổ phát xạ, màu ngọn lửa
- [ ] Tab Đồng vị và mô phỏng phân rã
- [ ] Cân bằng phương trình có từng bước giải (đại số và thăng bằng e)
- [ ] Đồ thị xu hướng, so sánh nguyên tố
- [ ] Bảng 3D "thành phố", thanh thời gian phát hiện
- [ ] PWA offline

### Giai đoạn 3: Học tập & cộng đồng (6–8 tuần)

- [ ] Quiz, flashcard SRS, thử thách cấu hình e
- [ ] Lộ trình theo SGK, tab "Trong chương trình học"
- [ ] Tiến độ (lưu cục bộ + xuất/nhập file), huy hiệu, thẻ sưu tầm
- [ ] Chế độ giáo viên (chia sẻ bộ câu hỏi qua link)
- ⛔ Tài khoản, lớp học, đồng bộ: không làm ở bản hiện tại

### Giai đoạn 4: Mở rộng

- [ ] Trình dựng phân tử (RDKit.js)
- [ ] Phòng thí nghiệm ảo (bộ phản ứng tuyển chọn)
- ⛔ Trợ lý AI hoá học: không làm ở bản hiện tại
- [ ] Bảng tính tan, dãy hoạt động kim loại, thang pH

---

## 10. Chỉ số thành công

- Thời gian trung bình mỗi phiên > 4 phút; trung bình > 3 nguyên tố được mở mỗi phiên.
- Tỉ lệ người dùng mở tab Mô hình nguyên tử hoặc Phân tử > 50% số lượt xem trang chi tiết.
- Lượt truy cập tự nhiên từ Google cho các từ khoá kiểu "cấu hình electron của ___", "cân bằng phương trình ___".
- Tỉ lệ quay lại trong 7 ngày (với chế độ Học).
- Lighthouse: Performance > 90 trên trang chủ, Accessibility > 95.

---

## 11. Rủi ro & cách giảm thiểu

| Rủi ro                                                                 | Giảm thiểu                                                                                                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Sai dữ liệu hoặc sai kiến thức (nhất là nội dung tiếng Việt, phản ứng) | Mỗi số liệu ghi nguồn; script tự so khớp giữa các nguồn dữ liệu; mời giáo viên hoá rà soát; có nút "Báo lỗi" trên mỗi trang   |
| Bản quyền hình ảnh                                                     | Chỉ dùng ảnh CC hoặc public domain, lưu metadata giấy phép từng ảnh, hiện ghi công; dùng ảnh tự chụp hoặc tự render nếu thiếu |
| Mô hình orbital và Bohr bị hiểu sai là "hình thật"                     | Có chú thích "mô hình minh hoạ", giải thích giới hạn của từng mô hình — đây cũng là một nội dung giáo dục tốt                 |
| Phụ thuộc PubChem (giới hạn tốc độ, lỗi mạng)                          | Tải sẵn lúc build, có proxy cache, có fallback offline                                                                        |
| 3D nặng trên điện thoại cấu hình thấp                                  | Lazy-load, giảm chất lượng tự động, có chế độ 2D thay thế                                                                     |
| Phạm vi quá rộng                                                       | Bám lộ trình theo giai đoạn; MVP tập trung vào bảng, trang chi tiết và mô hình                                                |
| AI trả lời sai                                                         | Tính toán dùng công cụ trong app; trả lời kèm nguồn; có cảnh báo                                                              |

---

## 12. Tham khảo & đối thủ

Các trang có thể học hỏi (không sao chép nội dung hay thiết kế):

- **Ptable** (ptable.com): chuẩn mực về dữ liệu, có nhiều chế độ xem, thanh nhiệt độ, đồng vị, hơn 38 ngôn ngữ.
- **periodic-table.io**: orbital 3D, công cụ phối trộn hợp chất.
- **Periodica, inperiod**: trực quan hoá xu hướng.
- **Atomic (mã nguồn mở)**, **pse-info.de**.
- **RSC Periodic Table**: nội dung lịch sử, ứng dụng, podcast rất tốt.
- **PhET (Đại học Colorado)**: mô phỏng "Build an Atom", "Molecule Shapes", "Balancing Chemical Equations" — tham khảo về sư phạm tương tác.

Điểm khác biệt của dự án này: **tiếng Việt và chương trình GDPT 2018, gộp hình ảnh hoá (nguyên tử → phân tử → tinh thể) với công cụ và học tập trong một trải nghiệm liên kết**.

### Tài liệu kỹ thuật

- PubChem PUG-REST: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest
- PubChem Periodic Table API (cookbook): https://ualibweb.github.io/UALIB_ScholarlyAPI_Cookbook/src/python/pubchem-periodic-table.html
- Bowserinator Periodic-Table-JSON: https://github.com/Bowserinator/Periodic-Table-JSON
- 3Dmol.js: https://3dmol.org/doc/tutorial-url.html
- Images of Elements (CC BY 3.0): https://images-of-elements.com/
- NIST Atomic Spectra Database: https://physics.nist.gov/asd
- Crystallography Open Database: https://www.crystallography.net/cod/

---

## 13. Câu hỏi mở cần quyết định

1. Tên sản phẩm và tên miền?
2. Thứ tự ưu tiên cuối cùng giữa 3D (mô hình) và tính năng học tập (quiz/SGK)?
3. ~~Có cần tài khoản ngay từ MVP không?~~ → **Đã chốt:** web tĩnh, không tài khoản, lưu cục bộ.
4. Mô hình bền vững: miễn phí hoàn toàn hay có quảng cáo? (chi phí host tĩnh gần như bằng 0)
5. Có cộng tác với giáo viên hoá để biên soạn và rà soát nội dung không?

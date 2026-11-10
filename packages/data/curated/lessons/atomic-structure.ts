import { defineLesson } from '../../src/lesson.ts';

/** Bộ SGK đối chiếu: Kết nối tri thức với cuộc sống, Hoá học 10; Chương 1, Bài 1–3. Bài đọc tự biên soạn, không thay cho nguyên văn SGK. Nguồn mục lục: https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html */
export default defineLesson({
  id: 'atomic-structure',
  grade: 10,
  order: 1,
  textbook: {
    vi: 'Hoá học 10 — Kết nối tri thức với cuộc sống. Chương 1: Cấu tạo nguyên tử; Bài 1–3.',
    en: 'Chemistry 10 (Kết nối tri thức với cuộc sống). Chapter 1: Atomic structure; Lessons 1–3.',
  },
  textbookSource: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
  textbookLessons: [
    {
      vi: 'Bài 1: Thành phần của nguyên tử',
      en: 'Lesson 1: Components of the atom',
    },
    {
      vi: 'Bài 2: Nguyên tố hoá học',
      en: 'Lesson 2: Chemical elements',
    },
    {
      vi: 'Bài 3: Cấu trúc lớp vỏ electron nguyên tử',
      en: 'Lesson 3: The electron-shell structure of atoms',
    },
  ],
  title: {
    vi: 'Đếm hạt và đọc cấu hình electron',
    en: 'Count particles and read electron configurations',
  },
  goals: [
    {
      vi: 'Phân biệt nguyên tố, đồng vị và ion.',
      en: 'Distinguish elements, isotopes and ions.',
    },
    {
      vi: 'Tính số proton, neutron và electron từ kí hiệu nguyên tử.',
      en: 'Find proton, neutron and electron counts from atomic notation.',
    },
    {
      vi: 'Đọc được cấu hình electron của các nguyên tố nhẹ.',
      en: 'Read electron configurations of light elements.',
    },
  ],
  readingMinutes: 6,
  blocks: [
    {
      type: 'text',
      md: {
        vi: '## Điều gì làm natri vẫn là natri?\nMuối ăn chứa natri, nhưng không có tính chất như miếng natri kim loại. Muốn phân biệt nguyên tố với chất, hãy bắt đầu từ nguyên tử. **Số proton quyết định nguyên tố**. Nguyên tử có 11 proton thuộc nguyên tố natri, dù nó nằm trong một hợp chất hay đã tạo ion. Số electron và số neutron có thể thay đổi mà chưa làm đổi nguyên tố.\nKhi đọc một mô hình, bạn cần tách ba câu hỏi: đang có nguyên tố nào, đang xét đồng vị nào, và tiểu phân có điện tích hay không? Ba câu hỏi này tương ứng với số proton, số neutron và sự chênh lệch proton–electron. Không thể dùng một con số duy nhất trả lời cả ba.',
        en: '## What keeps sodium sodium?\nTable salt contains sodium but does not behave like a piece of sodium metal. To distinguish an element from a substance, start with atoms. **Proton number determines elemental identity**. An atom with 11 protons belongs to sodium, whether it occurs in a compound or has become an ion. Changing its electrons or neutrons need not change the element.\nWhen reading a model, separate three questions: which element is present, which isotope is represented, and does the species carry charge? They depend on proton number, neutron number and the proton–electron imbalance, respectively. One number cannot answer all three. This distinction will keep later calculations from mixing up identity, mass and charge.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Hạt nhân và lớp vỏ\nProton mang điện dương, electron mang điện âm, neutron không mang điện. Proton và neutron nằm trong hạt nhân; electron thuộc lớp vỏ. Một nguyên tử trung hoà có số proton bằng số electron. Từ “trung hoà” nói về tổng điện tích bằng không, không nói rằng bên trong không có hạt mang điện.\nPhần lớn khối lượng nguyên tử tập trung ở hạt nhân. Khi tính số khối ở mức phổ thông, ta đếm proton và neutron, không cộng electron vào đó. Mô hình dùng các quả cầu giúp đếm hạt, nhưng kích thước và khoảng cách đã được đơn giản hoá. Đừng suy rằng hạt nhân chiếm phần lớn thể tích chỉ vì nó được vẽ đủ lớn để nhìn thấy.',
        en: '## Nucleus and electron cloud\nProtons carry positive charge, electrons negative charge, and neutrons are uncharged. Protons and neutrons occupy the nucleus; electrons belong to the surrounding cloud. A neutral atom has equal proton and electron numbers. “Neutral” means zero net charge, not an absence of charged particles inside it.\nMost atomic mass is concentrated in the nucleus. At school level, mass number counts protons and neutrons rather than adding electrons. A sphere-based model makes particles countable, but its distances and sizes are simplified. A visibly large nucleus on screen does not mean the nucleus occupies most of the atom’s volume. Use the picture to follow the counts while keeping its scale limitations in mind.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'atom-model',
      props: {
        element: 'Na',
      },
      caption: {
        vi: 'Đếm proton, neutron, electron của mẫu natri; phân biệt con số với kích thước hình vẽ.',
        en: 'Count sodium’s protons, neutrons and electrons; distinguish the numbers from the drawing’s scale.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Đọc A và Z theo đúng thứ tự\nKí hiệu ²³₁₁Na cho biết Z = 11 và A = 23. Z đếm proton. A đếm tổng proton và neutron, nên N = A − Z = 12. Nếu tiểu phân trung hoà thì có thêm 11 electron. Đó là ba phép suy luận khác nhau: đọc Z, lấy hiệu để tìm neutron, rồi dùng điều kiện trung hoà để tìm electron.\nMột cách tự kiểm là cộng lại 11 + 12 để được 23. Nếu bạn tìm được số neutron lớn hơn số khối hoặc cho rằng mất electron làm A giảm, đã có sự lẫn lộn giữa hạt nhân và lớp vỏ. Khi đề không nêu điện tích, hãy đọc kĩ xem nó gọi tiểu phân là nguyên tử hay ion trước khi áp dụng điều kiện trung hoà.',
        en: '## Read A and Z in the right order\nThe notation ²³₁₁Na gives Z = 11 and A = 23. Z counts protons. A counts protons plus neutrons, so N = A − Z = 12. If the species is neutral, it also has 11 electrons. These are three separate steps: read Z, subtract to obtain neutrons, then use neutrality to obtain electrons.\nCheck the result by adding 11 + 12 back to 23. A neutron count greater than the mass number, or an A value reduced by electron loss, signals confusion between nucleus and electron cloud. If no charge is shown, check whether the question describes an atom or an ion before assuming neutrality; do not silently change the meaning of the species.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: ['atom-structure-001', 'atom-structure-003', 'atom-structure-012'],
    },
    {
      type: 'text',
      md: {
        vi: '## Đồng vị không nằm ở ô nguyên tố khác\nHai nguyên tử cùng số proton nhưng khác số neutron là đồng vị. Ví dụ, ³⁵Cl và ³⁷Cl đều thuộc clo; số khối khác nhau không đưa chúng sang hai ô khác nhau trong bảng tuần hoàn. Với nguyên tử trung hoà của cả hai đồng vị, số electron vẫn bằng Z.\nKhối lượng nguyên tử trung bình là một đại lượng khác. Nó xét khối lượng và tỉ lệ của nhiều đồng vị. Trong bài toán giả định gồm 75% đồng vị có số khối 35 và 25% có số khối 37, lấy khối lượng bằng số khối thì trung bình là 35,5 u. Các tỉ lệ ở ví dụ này là dữ kiện luyện tính, không phải con số để thay cho bảng độ phổ biến tự nhiên. Giá trị trung bình cũng không mô tả một hạt nhân có nửa neutron.',
        en: '## Isotopes do not occupy different element cells\nAtoms with the same proton number but different neutron numbers are isotopes. For example, ³⁵Cl and ³⁷Cl are both chlorine. Different mass numbers do not move them into different periodic-table cells. Neutral atoms of either isotope still have Z electrons.\nAverage atomic weight is another quantity: it accounts for the masses and abundances of multiple isotopes. In a hypothetical exercise with 75% mass-35 and 25% mass-37 atoms, taking isotope masses as their mass numbers gives 35.5 u. Those percentages are exercise data, not replacements for a natural-abundance table. Nor does the average describe an individual nucleus containing half a neutron. Keep a population average separate from the integer particle counts of a particular isotope.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Ion đổi electron, không đổi nguyên tố\nNa tạo Na⁺ bằng cách nhường một electron. Tiểu phân vẫn có 11 proton, nhưng chỉ còn 10 electron, nên điện tích tổng là +1. Dấu cộng không có nghĩa đã thêm proton. Nếu thật sự thay đổi số proton, ta đang nói đến thay đổi nguyên tố, không còn là sự tạo ion thông thường.\nTương tự, Al³⁺ có ít hơn nguyên tử Al trung hoà ba electron. Với anion, chiều tính ngược lại: F⁻ có nhiều hơn nguyên tử F một electron. Hãy viết rõ “nhận” hay “nhường” trước khi tính; thao tác này giúp tránh cộng thêm electron chỉ vì thấy một con số dương cạnh kí hiệu. Số khối của đồng vị không thay đổi trong các quá trình trao đổi electron này.',
        en: '## Ions change electrons, not elemental identity\nSodium forms Na⁺ by losing one electron. It still has 11 protons, but now only 10 electrons, leaving net charge +1. The plus sign does not mean a proton was added. Changing the proton number would change the element rather than form an ordinary ion.\nSimilarly, Al³⁺ has three fewer electrons than neutral aluminium. For anions the direction reverses: F⁻ has one more electron than a neutral fluorine atom. Write “gain” or “loss” explicitly before calculating. This prevents the common mistake of adding electrons just because a positive numeral appears beside the symbol. The isotope’s mass number remains unchanged in these electron-transfer processes because its nucleus has not changed.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Lớp electron khác orbital\nMột lớp electron được gắn với số lượng tử chính. Trong một lớp có các phân lớp như s, p; mỗi phân lớp lại chứa orbital. Một orbital chứa tối đa hai electron với spin ngược nhau. Phân lớp s có một orbital nên chứa tối đa hai electron; phân lớp p có ba orbital nên chứa tối đa sáu.\nCác vòng trên mô hình nguyên tử là cách minh hoạ lớp electron, không phải ảnh chụp đường đi của từng electron. Khi chuyển sang sơ đồ ô orbital, bạn đang dùng một cách biểu diễn khác để thấy số chỗ có thể được chiếm và cách ghép đôi electron. Đừng lấy số vòng trong mô hình làm số orbital, cũng đừng lấy sức chứa của cả phân lớp p gán cho một orbital riêng lẻ.',
        en: '## Shells are not orbitals\nAn electron shell is associated with a principal quantum number. It contains subshells such as s and p, which in turn contain orbitals. One orbital holds at most two electrons with opposite spins. An s subshell has one orbital and holds two electrons; a p subshell has three orbitals and holds six.\nThe rings in an atomic model illustrate shells; they are not photographs of individual electron paths. An orbital-box diagram is another representation, useful for seeing available states and electron pairing. Do not equate the ring count with the number of orbitals, or assign the capacity of an entire p subshell to one orbital. Each model highlights selected features rather than depicting the atom exactly as it looks.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'electron-config',
      props: {
        element: 'Na',
      },
      caption: {
        vi: 'Tách cấu hình natri thành các phân lớp rồi cộng số electron.',
        en: 'Split sodium’s configuration into subshells, then add the electron counts.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Điền electron rồi kiểm tổng\nỞ trạng thái cơ bản, electron được phân bố theo các quy tắc về mức năng lượng, sức chứa orbital và spin. Với natri, cấu hình 1s² 2s² 2p⁶ 3s¹ có tổng 11 electron. Số lớn nhất trước tên phân lớp là 3, nên nguyên tử có electron ở ba lớp. Không phải mọi lớp đã xuất hiện đều phải được điền đến sức chứa tối đa mới có lớp tiếp theo.\nQuy tắc Hund cho biết electron đi vào các orbital cùng mức năng lượng riêng rẽ với spin song song trước khi ghép đôi. Nguyên lí Pauli giới hạn mỗi orbital. Hai quy tắc làm hai việc khác nhau. Cách điền đơn giản cũng có ngoại lệ ở một số nguyên tố; bài này dùng nguyên tố nhẹ để tập đọc chắc trước khi xét những trường hợp phức tạp hơn.',
        en: '## Fill the states, then check the total\nGround-state electron arrangements follow rules about energy, orbital capacity and spin. Sodium’s 1s² 2s² 2p⁶ 3s¹ contains 11 electrons. The highest principal number is 3, showing three occupied shells. The appearance of a new shell does not imply that every previously occupied shell must already hold its maximum possible number of electrons.\nHund’s rule describes separate occupation of equal-energy orbitals with parallel spins before pairing. Pauli’s principle limits occupancy within each orbital. These rules answer different questions. Simple filling patterns also have exceptions in some elements. Here the lighter elements let you practise reliable reading before tackling more complex cases; the counting check remains useful even when a configuration contains an exception.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'electron-config',
      props: {
        element: 'Mg',
      },
      caption: {
        vi: 'So cấu hình Mg với Na: electron thêm vào đâu, và số lớp có đổi không?',
        en: 'Compare Mg with Na: where does the extra electron go, and does the shell count change?',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Giải ngược từ thông tin về tiểu phân\nNếu đề cho 13 proton, 14 neutron và 10 electron, hãy nhận dạng nguyên tố trước: Z = 13 là Al. Sau đó A = 27 và điện tích là 13 − 10 = +3. Kết quả là ²⁷Al³⁺. Không nên bắt đầu bằng việc đoán tên ion theo số electron, vì nhiều tiểu phân khác nhau có cùng số electron.\nNa⁺ và Mg²⁺ là một ví dụ: cả hai có thể có 10 electron, nhưng hạt nhân khác nhau nên vẫn là hai nguyên tố. Khi hoàn tất một bài đếm hạt, tự kiểm ba quan hệ: Z bằng số proton; A bằng proton cộng neutron; điện tích bằng số proton trừ số electron. Mỗi quan hệ kiểm một khía cạnh và cùng nhau giúp phát hiện những đáp án có vẻ hợp lí nhưng gán sai nguyên tố.',
        en: '## Work backward from particle information\nSuppose a species has 13 protons, 14 neutrons and 10 electrons. Identify the element first: Z = 13 means Al. Then A = 27, while its charge is 13 − 10 = +3, giving ²⁷Al³⁺. Do not begin by guessing an element from electron count, because different species can share the same number of electrons.\nNa⁺ and Mg²⁺ illustrate the problem: both can have 10 electrons, but their different nuclei still identify different elements. Finish a particle-count exercise with three checks: Z equals proton number; A equals protons plus neutrons; charge equals protons minus electrons. Each checks a separate feature. Together they expose answers that look numerically plausible but identify the wrong element or isotope.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'tip',
      md: {
        vi: 'Số khối thuộc một đồng vị; khối lượng nguyên tử trung bình thuộc một tập hợp đồng vị. Mô hình nguyên tử trong app dùng một đồng vị đại diện.',
        en: 'Mass number belongs to an isotope; average atomic weight describes an isotope population. The app’s atom model uses a representative isotope.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: ['atom-structure-013', 'atom-structure-017', 'atom-structure-018', 'atom-structure-020'],
    },
  ],
  sources: [
    'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    'https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html',
  ],
});

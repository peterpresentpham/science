import { defineLesson } from '../../src/lesson.ts';

/** Bộ SGK đối chiếu: Kết nối tri thức với cuộc sống, Hoá học 10; Chương 2, Bài 5–8. Bài đọc tự biên soạn, không thay cho nguyên văn SGK. Nguồn mục lục: https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html */
// Tên Bài 7 theo mục lục SGK; mục lục SGV trên thư viện NXB lược chữ “một số”.
export default defineLesson({
  id: 'periodic-trends',
  grade: 10,
  order: 2,
  textbook: {
    vi: 'Hoá học 10 — Kết nối tri thức với cuộc sống. Chương 2: Bảng tuần hoàn các nguyên tố hoá học và định luật tuần hoàn; Bài 5–8.',
    en: 'Chemistry 10 (Kết nối tri thức với cuộc sống). Chapter 2: The periodic table and the periodic law; Lessons 5–8.',
  },
  textbookSource: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
  textbookLessons: [
    {
      vi: 'Bài 5: Cấu tạo của bảng tuần hoàn các nguyên tố hoá học',
      en: 'Lesson 5: Structure of the periodic table',
    },
    {
      vi: 'Bài 6: Xu hướng biến đổi một số tính chất của nguyên tử các nguyên tố trong một chu kì và trong một nhóm',
      en: 'Lesson 6: Trends in atomic properties across a period and down a group',
    },
    {
      vi: 'Bài 7: Xu hướng biến đổi thành phần và một số tính chất của hợp chất trong một chu kì',
      en: 'Lesson 7: Trends in compound composition and properties across a period',
    },
    {
      vi: 'Bài 8: Định luật tuần hoàn, ý nghĩa của bảng tuần hoàn các nguyên tố hoá học',
      en: 'Lesson 8: The periodic law and significance of the periodic table',
    },
  ],
  title: {
    vi: 'Đọc bảng tuần hoàn để dự đoán có căn cứ',
    en: 'Use the periodic table to make reasoned predictions',
  },
  goals: [
    {
      vi: 'Liên hệ chu kì, nhóm với cấu hình electron của nguyên tố nhóm chính.',
      en: 'Relate main-group periods and groups to electron configurations.',
    },
    {
      vi: 'Giải thích xu hướng bán kính, độ âm điện và năng lượng ion hoá.',
      en: 'Explain trends in radius, electronegativity and ionisation energy.',
    },
    {
      vi: 'Nêu phạm vi và ngoại lệ khi dùng một xu hướng.',
      en: 'State the scope and exceptions of a trend.',
    },
  ],
  readingMinutes: 6,
  blocks: [
    {
      type: 'text',
      md: {
        vi: '## Một tấm bản đồ theo số proton\nBảng tuần hoàn hiện đại xếp nguyên tố theo số hiệu nguyên tử Z tăng dần. Mỗi ô đại diện một nguyên tố, không phải một đồng vị hay một hợp chất cụ thể. Các đồng vị của clo cùng ở ô Cl; Na kim loại và natri có trong muối vẫn liên hệ với cùng ô Na.\nCách xếp này khác việc chỉ sắp theo khối lượng nguyên tử. Có những cặp nguyên tố mà thứ tự khối lượng không tăng giống thứ tự Z. Điều quyết định vị trí là điện tích hạt nhân, còn sự lặp lại cấu hình electron giúp giải thích tính tuần hoàn. Khi mở bảng, trước hết xác định hàng, cột và Z; sau đó mới dùng các màu hoặc con số tính chất để so sánh. Màu là một cách biểu diễn dữ liệu, không thay cho tiêu chí sắp xếp.',
        en: '## A map ordered by proton number\nThe modern periodic table orders elements by increasing atomic number Z. A cell represents an element rather than a particular isotope or compound. Chlorine isotopes share the Cl cell; sodium metal and sodium in salt still connect to the same Na cell.\nThis differs from simply sorting by average atomic weight. Some neighbouring elements do not increase in weight in the same order as Z. Nuclear charge determines their position, while recurring electron arrangements help explain periodic properties. On opening the table, locate the row, column and Z first, then compare its colours or property values. Colour is a representation of data, not the rule that determines where an element belongs. Keeping those jobs separate makes the map easier to read.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Hàng và cột nói về những gì?\nChu kì là hàng ngang; nhóm là cột dọc. Với các nguyên tố nhẹ ở trạng thái cơ bản, số lớp electron đang được chiếm giúp nhận ra chu kì. Natri có phân bố lớp 2, 8, 1 nên thuộc chu kì 3. Magie cũng có ba lớp, dù có thêm một electron.\nCác nguyên tố nhóm chính cùng nhóm thường có cấu hình electron hoá trị tương tự, nhờ đó có những nét giống nhau về hoá học. Li, Na và K đều có một electron s ngoài cùng. Tuy vậy, cùng nhóm không có nghĩa mọi tính chất hay tốc độ phản ứng bằng nhau. Đừng dùng số electron lớp ngoài cùng như một công thức xác định nhóm cho mọi nguyên tố chuyển tiếp; mối liên hệ ở khối d cần được xét cẩn thận hơn.',
        en: '## What rows and columns tell you\nA period is a horizontal row and a group a vertical column. For light ground-state atoms, the occupied-shell count helps identify the period. Sodium’s occupancy 2, 8, 1 places it in period 3. Magnesium also occupies three shells despite having one more electron.\nMain-group elements in a column usually have similar valence-electron patterns, which helps explain related chemistry. Li, Na and K each have one outer s electron. Sharing a group does not make every property or reaction rate identical, however. Nor should outer-shell counting be treated as a universal group-number formula for transition elements: the d block needs a more careful account. Start with the main-group pattern and recognise the limits of the shortcut rather than extending it automatically.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'table-highlight',
      props: {
        elements: ['Li', 'Na', 'K'],
      },
      caption: {
        vi: 'So ba kim loại kiềm: cùng cột nhưng số lớp electron tăng dần.',
        en: 'Compare three alkali metals: the same column, but increasing occupied-shell counts.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: ['periodic-table-001', 'periodic-table-002', 'periodic-table-008'],
    },
    {
      type: 'text',
      md: {
        vi: '## Đọc đúng cách đánh số nhóm\nTrong cách đánh số hiện đại của IUPAC, nhóm chạy từ 1 đến 18. Cách gọi IA, IIA vẫn gặp trong chương trình khi nói về kim loại kiềm và kiềm thổ; chúng tương ứng nhóm 1 và 2. Với halogen, tên nhóm VIIA trong cách gọi cũ tương ứng nhóm 17, không phải nhóm 7 của hệ số liên tục.\nMột ngoại lệ dễ gây nhầm nằm ngay trên bảng: H ở nhóm 1 nhưng không được xếp là kim loại kiềm. He có hai electron nhưng nằm với khí hiếm ở nhóm 18. Những ví dụ này nhắc rằng bảng được xây để phản ánh cấu hình và tính chất, không phải một mẹo đếm duy nhất. Khi đọc tài liệu, hãy xem tác giả dùng hệ nhóm nào trước khi chuyển con số thành tên họ nguyên tố.',
        en: '## Read the group-numbering system\nIUPAC’s modern numbering runs from 1 to 18. Older IA and IIA labels still appear when the curriculum discusses alkali and alkaline-earth metals; they correspond to groups 1 and 2. The older VIIA label for halogens corresponds to group 17, not group 7 in the consecutive system.\nAn important exception is visible immediately: hydrogen is placed above group 1 but is not an alkali metal. Helium has two electrons yet belongs with the noble gases in group 18. These examples show why the table reflects both configurations and properties rather than one universal counting trick. Check which numbering system a source uses before translating a number into a chemical family. Otherwise two perfectly reasonable sources can appear to contradict one another.',
      },
      source: 'https://iupac.org/what-we-do/periodic-table-of-elements/',
    },
    {
      type: 'widget',
      widget: 'table-highlight',
      props: {
        group: 1,
      },
      caption: {
        vi: 'Nhóm 1 có H ở phía trên; chỉ các kim loại trong nhóm này được gọi là kim loại kiềm.',
        en: 'Group 1 includes H at the top; the metals in this group are the alkali metals.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Vì sao kích thước nguyên tử có xu hướng lặp lại?\nĐi xuống một nhóm, nguyên tử có thêm lớp electron. Bán kính nhìn chung tăng dù hạt nhân cũng có thêm proton, vì khoảng cách và sự che chắn của các electron bên trong cùng thay đổi. Trong một chu kì nhóm chính, electron được thêm vào cùng lớp chính trong khi điện tích hạt nhân tăng, nên bán kính nhìn chung giảm.\nĐây là một xu hướng, không phải quy tắc mọi bước đo đều giảm đúng một lượng. Bán kính nguyên tử cũng có nhiều định nghĩa dựa trên cách các nguyên tử tiếp cận nhau. Khi xem đồ thị, đọc chú giải xem đó là loại bán kính nào, và không so trực tiếp một bán kính nguyên tử với một bán kính ion như thể chúng là cùng đại lượng. Dữ liệu và mô hình phải được đọc cùng phạm vi của chúng.',
        en: '## Why atomic size follows a pattern\nGoing down a group adds occupied electron shells. Atomic radius generally increases even though the nucleus also gains protons, because distance and shielding change together. Across a main-group period, electrons enter the same principal shell while nuclear charge rises, so radius generally decreases.\nThis is a trend, not a promise that each measured step falls by the same amount. Atomic radius also has several definitions based on how atoms approach one another. Read a graph’s legend to identify the radius being plotted, and do not compare an atomic radius directly with an ionic radius as though they were identical quantities. Both the data and the model have a scope. The general pattern is most useful when you know what is actually being measured and compared.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'trend',
      props: {
        property: 'atomicRadius',
      },
      caption: {
        vi: 'Đọc chú giải loại bán kính rồi tìm xu hướng theo nhóm và chu kì.',
        en: 'Read the radius definition in the legend, then examine group and period trends.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Độ âm điện không phải mọi cách “hút electron”\nĐộ âm điện mô tả xu hướng một nguyên tử hút electron trong liên kết. Năng lượng ion hoá thứ nhất lại là năng lượng cần để tách electron đầu tiên khỏi nguyên tử khí trung hoà. Ái lực electron nói về biến đổi năng lượng khi thêm electron. Ba tên liên quan đến electron nhưng không thể đổi chỗ cho nhau.\nTrong nhiều dãy nhóm chính, độ âm điện tăng từ trái sang phải và giảm khi đi xuống nhóm. Flo là một ví dụ nổi bật về độ âm điện lớn. Với khí hiếm hoặc dữ liệu thiếu, đừng tự coi giá trị trống là bằng không. Một đồ thị hữu ích phải giúp bạn thấy cả xu hướng lẫn khoảng chưa có dữ liệu, thay vì buộc mọi nguyên tố có một con số chỉ để lấp đầy đường vẽ.',
        en: '## Electronegativity is not every kind of electron attraction\nElectronegativity describes an atom’s tendency to attract electrons in a bond. First ionisation energy is the energy needed to remove the first electron from a neutral gaseous atom. Electron affinity concerns the energy change when an electron is added. All three involve electrons, but their names and meanings are not interchangeable.\nFor many main-group sequences, electronegativity increases across a period and decreases down a group. Fluorine is a prominent high-electronegativity example. For noble gases or missing entries, never treat a blank value as zero. A useful graph displays both a trend and missing information rather than assigning every element a number simply to complete a line. Check the property and units before explaining the shape of the plotted curve.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'trend',
      props: {
        property: 'electronegativity',
      },
      caption: {
        vi: 'Phân biệt giá trị thiếu với giá trị nhỏ; so F, Cl và Br.',
        en: 'Distinguish missing values from low values, then compare F, Cl and Br.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Xu hướng không có nghĩa không có ngoại lệ\nTách electron thường khó hơn khi đi từ trái sang phải trong một chu kì, nhưng cấu trúc phân lớp và cách ghép đôi electron có thể tạo ngoại lệ. Vì vậy câu “năng lượng ion hoá luôn tăng ở mọi bước” mạnh hơn điều dữ liệu cho phép. So một vài ô không đủ để suy ra toàn bộ bảng có dạng đường thẳng.\nNgược lại, đừng vì thấy một ngoại lệ mà bỏ luôn xu hướng. Cách đọc tốt hơn là nêu quy luật chung, giới hạn dãy đang xét, rồi kiểm tra các chỗ lệch bằng cấu hình electron. Trong các nguyên tố Na, Mg và Ar, Ar có năng lượng ion hoá thứ nhất cao hơn. Kết luận này không có nghĩa mọi khí hiếm đều cao hơn mọi nguyên tố khác ở tất cả các chu kì hoặc các lần ion hoá tiếp theo.',
        en: '## A trend can have exceptions\nRemoving an electron generally becomes harder across a period, but subshell structure and electron pairing create exceptions. Thus “ionisation energy rises at every step” says more than the evidence supports. A few neighbouring entries are not enough to conclude that the entire table follows a straight line.\nAn exception does not make the broader trend useless either. State the general pattern, identify the sequence being compared, and inspect deviations using electron configurations. Among Na, Mg and Ar, Ar has the highest first ionisation energy. That limited comparison does not mean every noble gas exceeds every other element across all periods or all successive ionisations. A good explanation keeps its claim no broader than the property, data and comparison actually examined.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Từ nguyên tử đến tính chất hợp chất\nTrong một chu kì nhóm chính, tính kim loại thường giảm và tính phi kim thường tăng. Sự thay đổi cũng liên hệ với các oxit và hiđroxit tương ứng. Chẳng hạn, oxit của natri có tính bazơ, còn một số oxit phi kim thể hiện tính axit; Al₂O₃ là ví dụ cần xét tính lưỡng tính, không ép vào hai nhãn đơn giản.\nKhông được suy rằng cứ chứa Na thì một chất phải mềm và phản ứng với nước như Na kim loại. Bảng cho xu hướng của nguyên tố, còn tính chất của hợp chất phụ thuộc liên kết và thành phần. Khi dự đoán một phản ứng, hãy gọi đúng chất, công thức và điều kiện, rồi dùng vị trí nguyên tố như một gợi ý. Đây là cầu nối sang bài liên kết, không phải một cách bỏ qua việc xét cấu tạo chất.',
        en: '## From atoms to compound properties\nAcross a main-group period, metallic character generally decreases and nonmetallic character increases. Related changes appear in oxides and hydroxides. Sodium oxide is basic, whereas some nonmetal oxides are acidic. Al₂O₃ requires the additional idea of amphoterism rather than being forced into only two simple labels.\nThis does not mean any sodium-containing material must be soft and react with water like sodium metal. The table describes elemental trends; a compound’s properties also depend on bonding and composition. When predicting a reaction, identify the actual substance, formula and conditions, then use periodic position as a guide. This is a bridge toward understanding bonding, not a way to avoid examining what the substance is made of or how its atoms are arranged.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Dùng nhiều dấu hiệu để kiểm tra một dự đoán\nGiả sử X thuộc chu kì 3, nhóm 2 và có lớp ngoài cùng 3s². Ba dữ kiện cùng dẫn đến Mg. Nếu một dữ kiện dẫn sang nguyên tố khác, cần đọc lại cách đánh số nhóm hoặc kiểm tổng electron. Dùng nhiều dấu hiệu độc lập giúp bạn kiểm tra kết quả thay vì chỉ học thuộc vị trí ô.\nMột tình huống khác là so Na⁺ với Mg²⁺. Cả hai có 10 electron, nhưng Mg có nhiều proton hơn nên kéo lớp vỏ mạnh hơn; bán kính Mg²⁺ nhỏ hơn trong cặp này. Không dùng ngay xu hướng nguyên tử trung hoà để kết luận cho ion. Sau mỗi dự đoán, nêu rõ đang so nguyên tử hay ion, cùng nhóm hay cùng chu kì, và đại lượng nào trên đồ thị thực sự hỗ trợ lời giải.',
        en: '## Cross-check a prediction with several clues\nSuppose X is in period 3, group 2 and has an outer 3s² configuration. All three clues identify Mg. If one clue points elsewhere, revisit the group-numbering convention or the electron total. Independent clues let you check an answer rather than merely recall the position of a square.\nNow compare Na⁺ with Mg²⁺. Both have 10 electrons, but Mg has more protons and pulls that shared-size electron population more strongly; Mg²⁺ is smaller in this pair. Do not automatically transfer a neutral-atom trend to ions. After making a prediction, specify whether you compare atoms or ions, a group or a period, and which plotted property actually supports the explanation. That precision turns a memorised pattern into a useful reasoning tool.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'tip',
      md: {
        vi: 'Dữ liệu thiếu không phải số 0. Xu hướng chung cũng không phải cam kết mọi cặp nguyên tố liên tiếp đều biến đổi đơn điệu.',
        en: 'Missing data are not zeros. A general trend is not a guarantee of monotonic change between every neighbouring pair.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: [
        'periodic-table-009',
        'periodic-table-013',
        'periodic-table-016',
        'periodic-table-017',
        'periodic-table-019',
      ],
    },
  ],
  sources: [
    'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    'https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html',
    'https://iupac.org/what-we-do/periodic-table-of-elements/',
  ],
});

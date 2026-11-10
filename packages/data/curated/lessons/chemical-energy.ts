import { defineLesson } from '../../src/lesson.ts';

/** Bộ SGK đối chiếu: Kết nối tri thức với cuộc sống, Hoá học 10; Chương 5, Bài 17. Bài đọc tự biên soạn, không thay cho nguyên văn SGK. Nguồn mục lục: https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html */
export default defineLesson({
  id: 'chemical-energy',
  grade: 10,
  order: 5,
  textbook: {
    vi: 'Hoá học 10 — Kết nối tri thức với cuộc sống. Chương 5: Năng lượng hoá học; Bài 17.',
    en: 'Chemistry 10 (Kết nối tri thức với cuộc sống). Chapter 5: Chemical energy; Lessons 17.',
  },
  textbookSource: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
  textbookLessons: [
    {
      vi: 'Bài 17: Biến thiên enthalpy trong các phản ứng hoá học',
      en: 'Lesson 17: Enthalpy changes in chemical reactions',
    },
  ],
  title: {
    vi: 'Theo dấu nhiệt trong phản ứng',
    en: 'Follow heat through a reaction',
  },
  goals: [
    {
      vi: 'Phân biệt dấu ΔH của hệ với chiều truyền nhiệt.',
      en: 'Relate the sign of system ΔH to heat transfer.',
    },
    {
      vi: 'Đọc đúng điều kiện, trạng thái và hệ số của dữ kiện nhiệt.',
      en: 'Read conditions, states and coefficients in thermal data.',
    },
    {
      vi: 'Đổi lượng chất để tính nhiệt và phân biệt ΔH với năng lượng hoạt hoá.',
      en: 'Scale heat with reaction amount and distinguish ΔH from activation energy.',
    },
  ],
  readingMinutes: 6,
  blocks: [
    {
      type: 'text',
      md: {
        vi: '## Nhiệt đi về phía nào?\nKhi xét một phản ứng, trước hết hãy chọn **hệ**: phần vật chất ta đang theo dõi. Mọi thứ bên ngoài là môi trường. Nếu hệ truyền nhiệt ra môi trường, phản ứng toả nhiệt và biến thiên enthalpy ΔH âm. Nếu hệ nhận nhiệt từ môi trường, phản ứng thu nhiệt và ΔH dương. Dấu được chọn theo hệ, không theo cảm giác của người chạm vào bình.\nỞ áp suất không đổi, khi chỉ có công giãn nở, nhiệt trao đổi bằng biến thiên enthalpy. Đó là điều kiện nối một phép đo nhiệt với đại lượng ΔH trong bài học. Một bình nóng lên có thể gợi ý hệ phản ứng đang toả nhiệt, nhưng muốn tính cần biết phần nào hấp thụ nhiệt và bao nhiêu nhiệt thất thoát. Đừng biến một quan sát định tính thành số liệu chính xác khi chưa có mô hình đo.',
        en: '## Which way does heat move?\nFirst choose the **system**: the matter whose change you are studying. Everything outside it is the surroundings. If the system transfers heat to the surroundings, the reaction is exothermic and its enthalpy change ΔH is negative. If it receives heat, it is endothermic and ΔH is positive. Signs follow the system rather than the sensation of someone touching a container.\nAt constant pressure, with only expansion work, heat transferred equals the enthalpy change. These conditions connect a heat measurement to ΔH. A warming container can suggest an exothermic reaction, but a calculation must identify what absorbs heat and account for heat loss. A qualitative observation alone does not supply an accurate numerical measurement.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Một giá trị cần có điều kiện đi kèm\nBiến thiên enthalpy không chỉ gắn với tên chất. Cần ghi phương trình, hệ số, trạng thái rắn, lỏng, khí hoặc dung dịch và nhiệt độ. Tạo ra nước lỏng khác với tạo ra hơi nước: sự chuyển trạng thái cũng trao đổi năng lượng. Bỏ qua kí hiệu trạng thái có thể khiến hai đáp số nhìn như mâu thuẫn dù chúng mô tả hai quá trình khác nhau.\nTrong cách dùng ở bài này, trạng thái chuẩn gắn với áp suất 1 bar; các bảng thường cho giá trị ở 298 K. Chữ “chuẩn” không có nghĩa mọi giá trị đều bắt buộc ở cùng một nhiệt độ, nên vẫn phải đọc điều kiện của bảng. Khi so sánh hai nhiên liệu, cũng cần cùng cơ sở: trên một mol hay trên một gam, sản phẩm nào và trạng thái nào. Một số âm lớn hơn về độ lớn chưa tự động trả lời mọi câu hỏi so sánh.',
        en: '## A value needs its conditions\nAn enthalpy change belongs to more than a list of substance names. Specify the equation, coefficients, physical states and temperature. Producing liquid water differs from producing water vapour because a phase change also exchanges energy. Omitting state labels can make two results appear inconsistent even though they describe different processes.\nThe standard-state convention used here refers to a pressure of 1 bar; tables commonly report values at 298 K. “Standard” does not require every listed value to have the same temperature, so read the conditions. Fuel comparisons also need a shared basis: per mole or per gram, with which products and in which states. A larger negative magnitude alone cannot answer every comparison. Define what quantity is being compared before ranking values.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Tạo thành một mol từ đâu?\nEnthalpy tạo thành chuẩn là biến thiên enthalpy khi tạo thành **một mol** chất từ các đơn chất bền ở trạng thái chuẩn tại nhiệt độ xét. Với nước lỏng, lượng sản phẩm làm chuẩn là một mol H₂O, vì vậy hệ số O₂ có thể là một phần hai. Phương trình nhiệt hoá học không bắt buộc chỉ dùng hệ số nguyên.\nĐơn chất ở dạng bền chuẩn được quy ước có enthalpy tạo thành chuẩn bằng 0. Quy ước ấy không nói chúng không có năng lượng. Cũng không được đặt mọi dạng thù hình của một nguyên tố bằng 0 cùng lúc: dạng chuẩn phải được xác định. Khi dùng bảng, đọc cả công thức và trạng thái, rồi nhân từng giá trị với hệ số trong phương trình phản ứng cần tính. Bỏ hệ số hoặc nhầm dạng chất đều làm sai tổng dù phép cộng thực hiện đúng.',
        en: '## Forming one mole, from what?\nA standard formation enthalpy describes forming **one mole** of a substance from elements in their stable standard states at the stated temperature. For liquid water, the reference product amount is one mole of H₂O, so the oxygen coefficient can be one half. Thermochemical equations need not always use whole-number coefficients.\nAn element in its stable standard form has a standard formation enthalpy of zero by convention. That does not mean it contains no energy. Nor should all allotropes of an element receive zero simultaneously: identify the reference form. When using a table, read both formula and state, then multiply each value by its coefficient in the target equation. Omitting coefficients or choosing the wrong form changes the result even if the subsequent arithmetic is flawless.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: ['energy-001', 'energy-007', 'energy-015'],
    },
    {
      type: 'text',
      md: {
        vi: '## Phá liên kết và tạo liên kết là hai chiều khác nhau\nPhá một liên kết cần cung cấp năng lượng; tạo liên kết giải phóng năng lượng. Phản ứng có thể gồm cả hai quá trình. Muốn dự đoán tổng thu hay toả nhiệt, cần so tổng năng lượng để phá các liên kết ban đầu với tổng năng lượng giải phóng khi hình thành liên kết mới, chứ không chỉ đếm số liên kết hoặc nhìn có chất cháy.\nCách ước lượng bằng năng lượng liên kết thường dùng cho các chất khí và giá trị trung bình, nên không phải đáp án chính xác cho mọi trạng thái hay phân tử. Đặc biệt, câu “phá liên kết giải phóng năng lượng” đã đảo ngược dấu của một bước riêng. Với phản ứng toả nhiệt, năng lượng giải phóng khi tạo các liên kết sản phẩm lớn hơn năng lượng đã dùng cho những bước phá liên kết; sự chênh lệch mới quyết định kết quả chung.',
        en: '## Breaking and forming bonds have opposite energy effects\nBreaking a bond requires energy; forming one releases energy. A reaction can involve both processes. To estimate whether it absorbs or releases energy overall, compare the total needed to break initial bonds with the total released by forming new ones. Counting bonds alone, or noticing combustion, does not replace that accounting.\nEstimates based on mean bond energies normally concern gaseous species and averaged values, so they are not exact answers for every state or molecule. In particular, “breaking a bond releases energy” reverses the sign of an individual step. In an exothermic reaction, formation of product bonds releases more energy than the bond-breaking steps require. The difference determines the net effect; neither step by itself describes the entire reaction.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Toả nhiệt không đồng nghĩa với tự bắt đầu ngay\nMột hỗn hợp có phản ứng toả nhiệt vẫn có thể cần mồi lửa hoặc một tác động ban đầu. Muốn phản ứng xảy ra, các tiểu phân phải đi qua một quá trình có rào cản năng lượng. Năng lượng hoạt hoá liên quan đến rào cản ấy, còn ΔH so sánh trạng thái đầu và trạng thái cuối. Hai đại lượng trả lời hai câu hỏi khác nhau.\nVì vậy không thể lấy dấu ΔH để suy ra ngay phản ứng nhanh hay chậm. Chất xúc tác tạo con đường phản ứng khác với năng lượng hoạt hoá thấp hơn, nhưng không đổi chênh lệch enthalpy giữa cùng các chất đầu và sản phẩm. Một phép tính nhiệt lượng cũng không cho thời gian để giải phóng lượng nhiệt ấy. Khi đọc đề, tách câu hỏi “thu hay toả bao nhiêu nhiệt” khỏi câu hỏi “diễn ra nhanh đến mức nào” trước khi chọn công thức.',
        en: '## Exothermic does not mean an immediate start\nA mixture undergoing an exothermic reaction may still need ignition or another initial trigger. Reacting particles must follow a pathway with an energy barrier. Activation energy concerns that barrier, whereas ΔH compares the initial and final states. The two quantities answer different questions.\nConsequently, the sign of ΔH does not directly tell you whether a reaction is fast or slow. A catalyst provides an alternative pathway with a lower activation energy without changing the enthalpy difference between the same reactants and products. A heat calculation also does not predict how long that heat takes to be released. Separate “how much heat is absorbed or released?” from “how quickly does it happen?” before choosing a method or interpreting a result.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'balance',
      props: {
        equation: 'CH4 + O2 -> CO2 + H2O',
      },
      caption: {
        vi: 'Cân bằng để có tỉ lệ 1 : 2 : 1 : 2; trạng thái nước sẽ được xét riêng khi tính nhiệt.',
        en: 'Balance to obtain 1 : 2 : 1 : 2; consider the water phase separately for heat calculations.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Hệ số đổi thì lượng nhiệt cũng đổi\nVới CH₄ khí cháy hoàn toàn tạo CO₂ khí và H₂O lỏng, bảng tham khảo cho enthalpy cháy chuẩn khoảng −890,8 kJ trên một mol CH₄ ở 25 °C. Nếu lấy tròn −890 kJ cho bài tập, cần ghi đó là dữ kiện làm tròn. Hai mol CH₄ phản ứng theo cùng điều kiện ứng với −1780 kJ; nửa mol ứng với −445 kJ.\nNếu nhân toàn bộ phương trình lên hai lần, ΔH đi kèm cũng nhân hai. Nếu đảo chiều, ΔH đổi dấu. Đừng đổi hệ số rồi giữ nguyên con số nhiệt như thể nó chỉ là nhãn của tên phản ứng. “Hệ có ΔH = −445 kJ” và “môi trường nhận 445 kJ nhiệt” dùng hai cách diễn đạt khác nhau: dấu âm thuộc hệ, còn lượng nhiệt toả ra thường được nói bằng độ lớn dương.',
        en: '## Scaling coefficients scales the heat\nFor complete combustion of gaseous CH₄ to gaseous CO₂ and liquid H₂O, a reference table gives a standard combustion enthalpy near −890.8 kJ per mole of CH₄ at 25 °C. A classroom exercise using −890 kJ should identify it as a rounded input. Under the same conditions, two moles correspond to −1780 kJ and half a mole to −445 kJ.\nDoubling the whole equation doubles its associated ΔH; reversing it changes the sign. Do not change coefficients while retaining a heat value as though it were merely a reaction name. “The system has ΔH = −445 kJ” and “the surroundings receive 445 kJ of heat” describe the same transfer from different viewpoints. Released heat is often reported as a positive magnitude.',
      },
      source: 'https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy',
    },
    {
      type: 'widget',
      widget: 'molar-mass',
      props: {
        formula: 'CH4',
      },
      caption: {
        vi: 'Khối lượng mol giúp đổi khối lượng CH₄ thành số mol trước khi dùng nhiệt phản ứng.',
        en: 'Use molar mass to convert a methane mass into moles before applying reaction heat.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Từ gam sang mol rồi mới sang nhiệt\nMột bài toán nhiệt có thể bắt đầu bằng khối lượng. Khi ấy, tính số mol bằng khối lượng chia khối lượng mol, rồi đối chiếu với hệ số phản ứng. Nếu đề cho nhiều chất đầu, phải tìm chất giới hạn: lượng nhiệt dự đoán gắn với lượng thực sự phản ứng, không phải mọi chất đều phản ứng hết chỉ vì chúng đã được cân vào bình.\nHãy ghi đơn vị ở từng bước để nhìn thấy g/mol dùng để đổi đơn vị, còn kJ ứng với lượng phản ứng đã xác định. Cũng cần phân biệt dự đoán lí tưởng với nhiệt hữu ích đo được ở dụng cụ. Bài tập giả định phản ứng hoàn toàn và truyền nhiệt theo mô hình đã nêu; một thiết bị thực có thể mất nhiệt ra ngoài. Không có hiệu suất hoặc dữ kiện đo thì không tự thêm một tỉ lệ tổn thất để làm kết quả trông thực tế hơn.',
        en: '## Convert grams to moles before calculating heat\nA heat problem may begin with mass. Divide by molar mass to obtain moles, then compare with the reaction coefficients. If several reactants are supplied, identify the limiting reactant: predicted heat belongs to the amount that actually reacts. Weighing substances into a vessel does not guarantee that all are consumed.\nKeep units visible at each step. Grams per mole convert mass into amount, while kilojoules correspond to a specified reaction amount. Distinguish an ideal prediction from useful heat measured in an apparatus. A classroom model may assume complete reaction and a stated heat-transfer arrangement; a real device can lose heat to the environment. Without an efficiency or measurement, do not invent a loss percentage merely to make the result sound more realistic.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Đi đường khác, cùng đầu và cuối\nEnthalpy là hàm trạng thái. Khi trạng thái đầu và cuối giống nhau, tổng biến thiên enthalpy không phụ thuộc vào cách chia quá trình thành các bước. Đó là cơ sở của định luật Hess: có thể cộng các phương trình nhiệt hoá học phù hợp để suy ra nhiệt của phản ứng cần tìm.\nKhi cộng, chỉ triệt tiêu đúng cùng một chất ở cùng trạng thái; H₂O lỏng không tự triệt tiêu với H₂O khí. Các hệ số và ΔH phải được nhân, chia hoặc đổi dấu cùng nhau. Cách này không khẳng định mọi bước viết ra là con đường phản ứng thực xảy ra trong bình. Nó cho phép nối các dữ liệu nhiệt đáng tin bằng bảo toàn năng lượng. Trước khi chốt kết quả, kiểm lại phương trình tổng, điều kiện, đơn vị và dấu; đó cũng là cách phát hiện một đáp số đúng số học nhưng đang trả lời nhầm quá trình.',
        en: "## Different routes, the same endpoints\nEnthalpy is a state function. If initial and final states are identical, the overall enthalpy change does not depend on how a process is divided into steps. This is the basis of Hess's law: suitable thermochemical equations can be added to obtain the heat of a target reaction.\nCancel only identical species in identical states; liquid H₂O does not simply cancel gaseous H₂O. Multiply, divide or reverse coefficients and ΔH together. This method does not claim that every written step is the actual mechanism inside a vessel. It combines reliable thermal data using energy conservation. Before accepting a result, check the net equation, conditions, units and sign. Those checks can reveal an arithmetically correct number that answers a different physical process from the one requested.",
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'tip',
      md: {
        vi: 'Ghi trạng thái và điều kiện trước khi dùng ΔH. Cân bằng nguyên tử là bước cần thiết; nó chưa quyết định giá trị nhiệt của phản ứng.',
        en: 'Record states and conditions before using ΔH. Atom balance is necessary but does not determine the reaction enthalpy.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: ['energy-016', 'energy-017', 'energy-018', 'energy-019', 'energy-020'],
    },
  ],
  sources: [
    'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    'https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html',
    'https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy',
  ],
});

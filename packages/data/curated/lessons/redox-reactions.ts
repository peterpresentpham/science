import { defineLesson } from '../../src/lesson.ts';

/** Bộ SGK đối chiếu: Kết nối tri thức với cuộc sống, Hoá học 10; Chương 4, Bài 15. Bài đọc tự biên soạn, không thay cho nguyên văn SGK. Nguồn mục lục: https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html */
export default defineLesson({
  id: 'redox-reactions',
  grade: 10,
  order: 4,
  textbook: {
    vi: 'Hoá học 10 — Kết nối tri thức với cuộc sống. Chương 4: Phản ứng oxi hoá - khử; Bài 15.',
    en: 'Chemistry 10 (Kết nối tri thức với cuộc sống). Chapter 4: Oxidation–reduction reactions; Lessons 15.',
  },
  textbookSource: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
  textbookLessons: [
    {
      vi: 'Bài 15: Phản ứng oxi hoá - khử',
      en: 'Lesson 15: Oxidation–reduction reactions',
    },
  ],
  title: {
    vi: 'Theo dõi electron để hiểu phản ứng',
    en: 'Track electrons to understand reactions',
  },
  goals: [
    {
      vi: 'Gán số oxi hoá với quy tắc và ngoại lệ phù hợp.',
      en: 'Assign oxidation states using suitable rules and exceptions.',
    },
    {
      vi: 'Xác định chất oxi hoá, chất khử và kiểm hệ số.',
      en: 'Identify oxidants and reductants and check coefficients.',
    },
    {
      vi: 'Dùng tỉ lệ mol để tìm chất giới hạn và lượng sản phẩm.',
      en: 'Use molar ratios to find limiting reactants and product amounts.',
    },
  ],
  readingMinutes: 6,
  blocks: [
    {
      type: 'text',
      md: {
        vi: '## Không cần có O mới là oxi hoá – khử\nKhi sắt phản ứng với dung dịch đồng(II) sunfat trong điều kiện phù hợp, đồng kim loại có thể xuất hiện và sắt đi vào dung dịch dưới dạng Fe²⁺. Ta mô tả sự chuyển đổi bằng electron: sắt nhường, ion đồng nhận. Nhận diện này quan trọng hơn việc chỉ nhìn màu hay tìm chữ O trong công thức.\nTên “oxi hoá” có nguồn gốc lịch sử, nhưng khái niệm dùng rộng hơn phản ứng với oxi. H₂ phản ứng với Cl₂ cũng là oxi hoá – khử dù không có nguyên tố O. Ngược lại, một phản ứng có nhiều chất chứa O vẫn có thể không làm đổi số oxi hoá nào. Muốn phân loại, cần theo dõi các nguyên tố trước và sau phản ứng, chứ không chọn theo vẻ ngoài hoặc một chữ trong tên.',
        en: '## Redox does not require oxygen\nWhen iron reacts with copper(II) sulfate solution under suitable conditions, copper metal can appear while iron enters solution as Fe²⁺. Electron accounting describes the change: iron donates electrons and copper ions accept them. That identification matters more than simply noticing a colour change or an O in a formula.\nThe historical word “oxidation” now covers more than reaction with oxygen. Hydrogen reacting with chlorine is redox despite containing no oxygen. Conversely, a reaction involving many oxygen-containing substances may leave every oxidation state unchanged. Follow elements before and after the reaction to classify it rather than choosing from appearance or a familiar word. This method gives a consistent test across both obvious metal reactions and less visually dramatic changes in molecules.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Số oxi hoá là một công cụ ghi sổ\nSố oxi hoá giúp theo dõi electron theo một quy ước. Với đơn chất, giá trị bằng 0; với ion đơn nguyên tử, nó bằng điện tích ion. Tổng số oxi hoá trong phân tử trung hoà bằng 0, còn trong ion đa nguyên tử bằng điện tích toàn ion. Hãy áp dụng tổng điện tích cho đúng loại tiểu phân trước khi giải số chưa biết.\nTrong các ví dụ thường gặp, H là +1 và O là −2, nhưng phải nhớ ngoại lệ. H trong hiđrua kim loại như NaH là −1; O trong peoxit như H₂O₂ là −1. Flo thường là −1 trong hợp chất. Những giá trị này không nói rằng mọi nguyên tử trong liên kết cộng hoá trị thật sự mang một điện tích nguyên tương ứng; chúng là quy ước nhất quán để nhận ra và cân đối sự biến đổi.',
        en: '## Oxidation states are an accounting tool\nOxidation states track electrons by convention. An elemental substance has state zero; a monatomic ion has an oxidation state equal to its charge. The sum is zero in a neutral molecule and equals the total charge in a polyatomic ion. Identify the kind of species before solving for an unknown state.\nIn familiar examples H is +1 and O −2, but exceptions matter. Hydrogen in a metal hydride such as NaH is −1, and oxygen in a peroxide such as H₂O₂ is −1. Fluorine is normally −1 in compounds. These assignments do not claim that every covalently bonded atom physically carries the corresponding integer charge. They provide a consistent bookkeeping convention for detecting and balancing chemical changes.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Làm một phép tính rồi tự kiểm\nTrong KMnO₄, K là +1 và bốn O có tổng −8. Để cả công thức trung hoà, Mn phải là +7. Trong SO₄²⁻, tổng phải bằng −2, không phải 0: S cộng bốn lần −2 bằng −2, nên S là +6. Sai lầm hay gặp là quên điện tích viết ngoài ngoặc hoặc lấy chỉ số dưới làm số oxi hoá.\nMột mẹo kiểm tra có cơ sở là thế giá trị vừa tìm trở lại tổng. Với Mn = +7, ta có +1 + 7 − 8 = 0. Khi tìm số oxi hoá trung bình cho một công thức có nhiều nguyên tử cùng nguyên tố, cần cẩn thận: giá trị trung bình chưa chắc có nghĩa mọi vị trí nguyên tử đều giống nhau. Ở bài này, các ví dụ đơn giản giúp luyện quy tắc trước khi gặp hợp chất phức tạp.',
        en: '## Calculate, then substitute back\nIn KMnO₄, K contributes +1 and four O atoms total −8. Neutrality therefore requires Mn = +7. In SO₄²⁻ the sum must be −2, not zero: S plus four times −2 equals −2, so sulfur is +6. Common mistakes include forgetting an external charge or treating a formula subscript as an oxidation state.\nSubstitute an answer back into the sum to check it. For Mn = +7, +1 + 7 − 8 = 0. When a formula contains several atoms of one element, also distinguish an average assignment from a statement that every atomic site is identical. This lesson uses straightforward cases to build the accounting habit before compounds with more complicated structures require extra interpretation.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Gọi tên vai trò từ việc cho hay nhận electron\nOxi hoá là nhường electron, làm số oxi hoá tăng; khử là nhận electron, làm số oxi hoá giảm. **Chất khử bị oxi hoá**, vì nó đưa electron cho chất khác. **Chất oxi hoá bị khử**, vì nó nhận electron. Tên vai trò nói về tác dụng lên đối tác, không phải quá trình mà bản thân chất mang tên đang trải qua.\nTrong hệ Fe và Cu²⁺, Fe từ 0 lên +2 nên là chất khử. Cu²⁺ từ +2 xuống 0 nên là chất oxi hoá. Sulfate đi kèm không vì có O mà tự động nhận vai trò chất oxi hoá. Hãy chỉ rõ nguyên tố nào đổi số oxi hoá và nằm trong chất nào. Cách viết “đồng bị khử” còn thiếu rõ ràng nếu không phân biệt ion Cu²⁺ ban đầu với đồng kim loại sản phẩm.',
        en: '## Name the roles from electron gain and loss\nOxidation loses electrons and increases oxidation state; reduction gains electrons and decreases it. **The reducing agent is oxidised**, because it supplies electrons to another species. **The oxidising agent is reduced**, because it receives them. The role describes its effect on the reaction partner rather than the process its own name might seem to suggest.\nFor Fe and Cu²⁺, Fe changes from 0 to +2 and is the reductant. Cu²⁺ changes from +2 to 0 and is the oxidant. Accompanying sulfate does not become the oxidant simply because it contains O. State which element changes and which species contains it. “Copper is reduced” is ambiguous unless you distinguish the initial Cu²⁺ ion from the copper-metal product.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'balance',
      props: {
        equation: 'Fe + CuSO4 -> FeSO4 + Cu',
      },
      caption: {
        vi: 'Xác định Fe nhường electron và Cu²⁺ nhận electron trước khi xem hệ số.',
        en: 'Identify Fe as electron donor and Cu²⁺ as acceptor before inspecting coefficients.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: ['redox-003', 'redox-004', 'redox-010'],
    },
    {
      type: 'text',
      md: {
        vi: '## Cân bằng electron không thay cho bảo toàn nguyên tử\nKhi Fe tạo Fe₂O₃, Fe tăng từ 0 lên +3; O giảm từ 0 xuống −2. Mỗi Fe nhường ba electron, mỗi nguyên tử O nhận hai. Chọn bội chung là sáu giúp tìm tỉ lệ electron, nhưng vẫn cần nhớ oxi tham gia dưới dạng O₂ và sản phẩm có hai Fe trong mỗi đơn vị công thức.\nKết quả hệ số nguyên tối giản là 4 Fe, 3 O₂ và 2 Fe₂O₃. Bạn có thể kiểm bốn Fe và sáu O ở mỗi vế. Nếu chỉ cân electron rồi quên cấu tạo phân tử, rất dễ viết hệ số O sai một nửa. Nếu chỉ cân nguyên tử, kết quả số học có thể đúng nhưng phần giải thích vai trò chưa chắc đã rõ. Dùng hai cách kiểm bổ sung cho nhau thay vì xem một cách là lí do bỏ qua cách kia.',
        en: '## Electron balance does not replace atom balance\nWhen Fe forms Fe₂O₃, Fe changes from 0 to +3 while O changes from 0 to −2. Each Fe loses three electrons and each O atom gains two. A common electron multiple helps establish the relationship, but oxygen enters as O₂ and the product contains two Fe per formula unit.\nThe smallest whole-number coefficients are 4 Fe, 3 O₂ and 2 Fe₂O₃. Count four Fe and six O on each side. Balancing electrons while forgetting molecular composition can produce an oxygen coefficient off by a factor of two. Atom balancing alone may give correct numbers without explaining the roles clearly. Use the two checks together rather than treating either as permission to skip the other: one tracks the transfer model, and the other verifies material conservation.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'balance',
      props: {
        equation: 'Fe + O2 -> Fe2O3',
      },
      caption: {
        vi: 'Kiểm cả electron trong lập luận và số nguyên tử ở mỗi vế của kết quả.',
        en: 'Check electron accounting in the explanation and atom counts in the result.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Có phương trình cân bằng chưa chắc đã có phản ứng thực tế\nCông cụ cân bằng tìm hệ số bảo toàn nguyên tố và điện tích cho các chất đã nhập. Nó không tự chứng minh rằng đúng các sản phẩm ấy hình thành ở mọi nhiệt độ, nồng độ hay môi trường. Cùng một chất oxi hoá có thể cho sản phẩm khử khác khi điều kiện đổi.\nVì vậy trình tự hợp lí là xác định phản ứng và sản phẩm theo kiến thức hoặc dữ kiện, ghi công thức đúng, rồi mới cân bằng. Không sửa chỉ số trong công thức để chữa lỗi hệ số, vì làm vậy đã đổi chất. Sau khi có kết quả, kiểm tổng điện tích nếu có ion và kiểm xem tất cả chất đều thực sự tham gia. Với phương trình còn thiếu điều kiện hoặc chưa xác định sản phẩm, câu trả lời đúng có thể là cần thêm thông tin thay vì ép công cụ tạo một hàng số.',
        en: '## Balanced does not automatically mean chemically feasible\nA balancer finds coefficients conserving elements and charge for the species entered. It does not prove that those exact products form at every temperature, concentration or medium. The same oxidant can give different reduction products when conditions change.\nFirst establish the reaction and products from chemistry or the stated evidence, write correct formulas, and then balance. Do not repair coefficients by changing formula subscripts, because that changes the substances. Afterwards check total charge for ionic equations and whether all listed species actually participate. If products or conditions are unspecified, the appropriate conclusion may be that more information is needed. Forcing a numerical result is not a substitute for identifying a chemically meaningful problem; the calculation checks a model that must first be chosen sensibly.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Một chất có thể mang cả hai vai trò\nTrong sự phân huỷ H₂O₂ thành H₂O và O₂, O ban đầu có số oxi hoá −1. Một phần O đi xuống −2 trong nước, phần khác lên 0 trong O₂. Cùng một chất vì thế có thể vừa nhận vừa nhường electron theo cách ghi sổ, được gọi là tự oxi hoá – khử.\nNgược lại, phản ứng trung hoà HCl với NaOH không làm đổi các số oxi hoá. Có nước tạo thành không đủ để gọi là khử; thấy chất có O cũng không đủ để gọi là oxi hoá. Một phép thử nhanh là lập hai cột trước và sau cho các nguyên tố đáng chú ý, rồi tìm sự tăng và giảm đi kèm. Nếu không có số nào đổi, cần xem lại việc gán loại phản ứng, dù quan sát vẫn có thể thấy nhiệt độ hoặc trạng thái vật chất thay đổi.',
        en: '## One substance can have both roles\nIn H₂O₂ decomposition to H₂O and O₂, oxygen starts at −1. Some oxygen ends at −2 in water while another portion rises to zero in O₂. The same starting substance can therefore accept and donate electrons in the accounting description: disproportionation.\nBy contrast, neutralising HCl with NaOH leaves oxidation states unchanged. Water formation does not by itself mean reduction, and oxygen content does not establish oxidation. A quick check is to set up before-and-after columns for the relevant elements and look for linked increases and decreases. If none change, reconsider the redox classification even if temperature or physical appearance changes. Observable change establishes that something happened, but oxidation-state accounting determines whether that change belongs to the redox category.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'balance',
      props: {
        equation: 'H2O2 -> H2O + O2',
      },
      caption: {
        vi: 'Theo dõi O từ −1 sang hai mức khác nhau; sau đó kiểm hệ số.',
        en: 'Track O from −1 to two different states, then check coefficients.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Dùng hệ số để tính lượng, không chỉ để hoàn thành dòng chữ\nTrong phản ứng Fe với CuSO₄, tỉ lệ mol Fe : CuSO₄ : Cu là 1 : 1 : 1. Với bài toán giả định có 0,10 mol Fe và 0,15 mol CuSO₄, Fe giới hạn lượng phản ứng. Nếu phản ứng hoàn toàn theo mô hình, tạo 0,10 mol Cu và còn dư 0,05 mol CuSO₄.\nKhông lấy số gam của hai chất so trực tiếp với nhau để tìm chất hết; cần đổi sang mol rồi chia cho hệ số. Cũng không dùng lượng chất dư ban đầu làm lượng sản phẩm. Khi trả lời, ghi rõ điều kiện “phản ứng hoàn toàn theo phương trình đã cho” và đơn vị của kết quả. Một lời giải đầy đủ nối được bốn bước: nhận ra trao đổi electron, xác định đúng chất, cân bằng và dùng tỉ lệ mol để diễn giải lượng vật chất.',
        en: '## Use coefficients to calculate amounts\nFor Fe with CuSO₄, the molar ratio Fe : CuSO₄ : Cu is 1 : 1 : 1. In a hypothetical exercise with 0.10 mol Fe and 0.15 mol CuSO₄, iron limits the reaction. Complete reaction under the stated model produces 0.10 mol Cu and leaves 0.05 mol CuSO₄.\nDo not compare reactant masses directly to identify the limiting reagent: convert to moles and account for coefficients. Do not substitute the initial excess-reactant amount for product yield either. State the assumption of complete reaction according to the equation, and give units. A complete explanation connects four steps: recognise electron transfer, identify the correct species, balance the equation, then interpret the material amounts using its molar ratios. Each step answers a different question and constrains the next.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'tip',
      md: {
        vi: '“Chất khử bị oxi hoá; chất oxi hoá bị khử.” Khi quên, viết rõ chất cho electron và chất nhận electron thay vì học thuộc hai tên rời nhau.',
        en: '“The reductant is oxidised; the oxidant is reduced.” If unsure, identify the electron donor and acceptor rather than recalling the two names separately.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: ['redox-016', 'redox-017', 'redox-018', 'redox-019', 'redox-020'],
    },
  ],
  sources: [
    'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    'https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html',
  ],
});

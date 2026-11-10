import { defineLesson } from '../../src/lesson.ts';

/** Bộ SGK đối chiếu: Kết nối tri thức với cuộc sống, Hoá học 10; Chương 3, Bài 10–13. Bài đọc tự biên soạn, không thay cho nguyên văn SGK. Nguồn mục lục: https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html */
export default defineLesson({
  id: 'chemical-bonding',
  grade: 10,
  order: 3,
  textbook: {
    vi: 'Hoá học 10 — Kết nối tri thức với cuộc sống. Chương 3: Liên kết hoá học; Bài 10–13.',
    en: 'Chemistry 10 (Kết nối tri thức với cuộc sống). Chapter 3: Chemical bonding; Lessons 10–13.',
  },
  textbookSource: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
  textbookLessons: [
    {
      vi: 'Bài 10: Quy tắc octet',
      en: 'Lesson 10: The octet rule',
    },
    {
      vi: 'Bài 11: Liên kết ion',
      en: 'Lesson 11: Ionic bonding',
    },
    {
      vi: 'Bài 12: Liên kết cộng hoá trị',
      en: 'Lesson 12: Covalent bonding',
    },
    {
      vi: 'Bài 13: Liên kết hydrogen và tương tác Van der Waals',
      en: 'Lesson 13: Hydrogen bonding and van der Waals interactions',
    },
  ],
  title: {
    vi: 'Từ liên kết đến tính chất của chất',
    en: 'Connect bonding with material properties',
  },
  goals: [
    {
      vi: 'Phân biệt liên kết ion, cộng hoá trị và mạng tinh thể.',
      en: 'Distinguish ionic and covalent bonding and crystal networks.',
    },
    {
      vi: 'Dùng cả liên kết và hình dạng khi xét phân cực.',
      en: 'Use both bond polarity and geometry to judge molecular polarity.',
    },
    {
      vi: 'Phân biệt liên kết trong phân tử với tương tác giữa phân tử.',
      en: 'Distinguish intramolecular bonds from intermolecular interactions.',
    },
  ],
  readingMinutes: 6,
  blocks: [
    {
      type: 'text',
      md: {
        vi: '## Cùng nguyên tố chưa chắc cùng chất\nNatri kim loại và muối ăn đều liên quan đến Na, nhưng khác nhau rõ rệt. Trong kim loại, electron hoá trị có thể chuyển động trong mạng. Trong NaCl rắn, các ion Na⁺ và Cl⁻ sắp xếp thành tinh thể. Gọi đúng tiểu phân và cách chúng liên kết là bước đầu để giải thích tính chất của chất.\nBài này dùng ba câu hỏi làm mạch đọc: electron được chuyển hay dùng chung, các tiểu phân sắp xếp thế nào, và lực nào bị thay đổi khi chất nóng chảy hoặc sôi? Một câu trả lời đúng ở cấp độ này chưa chắc dùng được ở cấp độ khác. Chẳng hạn, liên kết phân cực trong phân tử không tự động làm toàn phân tử phân cực; ion trong tinh thể cũng không đồng nghĩa chúng đang chuyển động tự do.',
        en: '## The same element does not mean the same substance\nSodium metal and table salt both involve Na, yet behave very differently. In a metal, valence electrons can move through a lattice. In solid NaCl, Na⁺ and Cl⁻ ions form a crystal. Naming the particles and their arrangement is the starting point for explaining substance properties.\nThree questions organise this lesson: are electrons transferred or shared, how are the resulting species arranged, and which interactions change when a material melts or boils? An answer at one structural level need not apply at another. Polar bonds do not automatically make a whole molecule polar, for example. Nor does the presence of ions in a crystal mean those ions are already free to travel through it and carry a current.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Từ nguyên tử đến ion\nKhi Na nhường electron và Cl nhận electron, ta có thể mô tả các ion Na⁺ và Cl⁻ với lớp electron ngoài cùng bền hơn trong mô hình phổ thông. Lực hút giữa điện tích trái dấu giúp các ion liên kết. Đừng diễn đạt như thể nguyên tử có ý muốn tìm đủ tám electron; quy tắc octet là một xu hướng mô tả nhiều cấu hình bền, không phải động cơ của hạt.\nOctet không áp dụng tuyệt đối cho mọi chất. Hiđro thường gắn với lớp có hai electron, còn một số phân tử khác có cấu trúc vượt ngoài mô hình đơn giản. Trước hết hãy dùng quy tắc với các ví dụ nhẹ quen thuộc, đồng thời kiểm tra số electron thực có. Không được tự thêm electron vào hình Lewis chỉ để ép hình vẽ trông vừa tám.',
        en: '## From atoms to ions\nWhen Na loses an electron and Cl gains one, Na⁺ and Cl⁻ can be described with more stable outer-shell arrangements in the school model. Opposite charges attract, helping hold the ionic material together. Avoid saying that atoms have a desire to obtain eight electrons: the octet rule summarises many stable configurations rather than giving particles an intention.\nThe rule is not universal. Hydrogen typically reaches a two-electron shell, and some other molecules fall outside the simplest octet model. Begin with familiar light-element examples while checking the actual available electron total. Do not invent extra electrons in a Lewis diagram simply to make every atom appear to have eight. Electron accounting must remain consistent with both composition and total charge.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'table-highlight',
      props: {
        elements: ['Na', 'Cl', 'Mg', 'O'],
      },
      caption: {
        vi: 'Liên hệ vị trí nguyên tố với những ion thường gặp, nhưng vẫn kiểm tra điện tích của hợp chất.',
        en: 'Connect periodic position with common ions while still checking compound charge.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Công thức tinh thể là tỉ lệ, không phải một phân tử nhỏ\nVới Mg²⁺ và Cl⁻, cần hai ion clorua cho mỗi ion magie để tổng điện tích bằng không. Đó là lí do công thức MgCl₂ có chỉ số 2. Tương tự, hai Al³⁺ cân bằng ba O²⁻ cho tỉ lệ Al₂O₃. Chỉ số đếm nguyên tử hay ion tương ứng, không đếm số proton trong hạt nhân.\nTinh thể ion là mạng mở rộng. Viết NaCl không có nghĩa chất rắn gồm các cặp phân tử NaCl tách rời như mô hình phân tử nước. Trong trạng thái rắn, ion bị giữ quanh vị trí mạng nên không dễ dịch chuyển xuyên qua tinh thể. Khi nóng chảy, các ion có thể chuyển động và mang dòng điện. Sự khác nhau này giải thích vì sao cần ghi cả trạng thái khi nói một chất “dẫn điện”.',
        en: '## A crystal formula is a ratio, not a little molecule\nFor Mg²⁺ and Cl⁻, two chloride ions are needed per magnesium ion to make the total charge zero. That produces MgCl₂. Similarly, two Al³⁺ balance three O²⁻, giving Al₂O₃. Subscripts count the corresponding atoms or ions, not the protons inside their nuclei.\nAn ionic crystal is an extended lattice. Writing NaCl does not mean that its solid consists of separate NaCl pairs resembling water molecules. In the solid, ions remain near lattice positions and cannot readily travel across the crystal. After melting, the ions become mobile and can carry current. This contrast explains why the physical state must be specified when saying that a material conducts electricity: having charged particles and having mobile charged particles are different conditions.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: ['chemical-bond-003', 'chemical-bond-009', 'chemical-bond-012'],
    },
    {
      type: 'text',
      md: {
        vi: '## Liên kết cộng hoá trị và các cặp electron\nTrong mô hình Lewis, một liên kết đơn biểu diễn một cặp electron chung, liên kết đôi hai cặp và liên kết ba ba cặp. H₂ có một liên kết đơn; O₂ được mô tả bằng liên kết đôi; N₂ bằng liên kết ba. Các cặp electron không tham gia liên kết vẫn phải được tính trong tổng electron, nhưng không được đếm thành liên kết mới.\nBắt đầu một sơ đồ bằng cách cộng electron hoá trị, điều chỉnh theo điện tích của tiểu phân rồi mới phân bố. Dấu âm nghĩa là có thêm electron, dấu dương nghĩa là bớt đi. Mô hình không phải ảnh chụp electron đứng giữa hai quả cầu. Nó là công cụ ghi sổ về cấu tạo và giúp đặt câu hỏi: còn đủ electron không, mỗi nguyên tử đã được đếm đúng chưa, và điện tích tổng có khớp không?',
        en: '## Covalent bonds and electron pairs\nIn a Lewis model, a single bond represents one shared pair, a double bond two pairs and a triple bond three pairs. H₂ has a single bond; O₂ is drawn with a double bond; N₂ with a triple bond. Lone pairs still count toward the electron total but must not be counted as extra bonds.\nStart a diagram by adding valence electrons and adjusting for the species’ charge before distributing them. A negative charge adds electrons; a positive charge removes them. The model is not a photograph of electrons standing between two spheres. It is an accounting tool for structure, prompting checks on available electrons, each atom’s count and consistency with the total charge. These checks matter more than making a diagram look symmetrical.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Một liên kết có thể chia electron không đều\nHai nguyên tử giống nhau trong H₂ hút cặp electron chung như nhau theo đối xứng. Trong HCl, Cl có độ âm điện lớn hơn nên mật độ electron liên kết lệch về phía Cl. Liên kết vẫn là cộng hoá trị, nhưng có phân cực. Dấu điện tích riêng phần khác với việc tuyên bố một phân tử đã tách hoàn toàn thành các ion.\nChênh lệch độ âm điện là gợi ý hữu ích để phân loại liên kết. Các ngưỡng dùng trong sách là quy ước gần đúng, không phải đường biên tự nhiên tuyệt đối. Khi giải bài, trước hết xem quy ước của đề và loại chất đang xét. Đừng thay khái niệm độ âm điện bằng số hiệu nguyên tử, và cũng không kết luận liên kết cộng hoá trị luôn chia electron đều chỉ vì có chữ “dùng chung”.',
        en: '## Sharing can be unequal\nThe identical atoms in H₂ attract their shared electrons equally by symmetry. In HCl, Cl is more electronegative, so bonding electron density is biased toward chlorine. The bond remains covalent but is polar. Partial-charge symbols differ from claiming that an individual molecule has separated completely into ions.\nAn electronegativity difference is a useful classification guide. Thresholds used in a textbook are approximations, not perfectly sharp natural boundaries. When solving an exercise, check its stated convention and the kind of material involved. Do not replace electronegativity with atomic number, or assume that every covalent bond shares electrons equally merely because it is described as shared. The type of sharing and the overall structure both remain important to the explanation.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Hình dạng quyết định các moment có triệt tiêu không\nNước có các liên kết O–H phân cực và dạng phân tử gấp khúc, nên tác dụng của các liên kết không triệt tiêu nhau. CO₂ lại có dạng thẳng đối xứng. Hai liên kết C=O phân cực có thể triệt tiêu theo hai hướng ngược nhau, làm toàn phân tử không phân cực trong mô hình này.\nVì thế, muốn kết luận về phân cực phân tử, cần cả thông tin liên kết lẫn hình học. Hãy dùng mô hình 3D để nhận ra các hướng sắp xếp, thay vì chỉ đếm số quả cầu. Kích thước quả cầu và thanh nối được chọn để dễ quan sát, không phải mọi kích thước đều đúng tỉ lệ. Từ mô hình, bạn có thể kiểm một lời giải về tính đối xứng; không nên lấy một góc nhìn phẳng bất kì làm bằng chứng rằng phân tử thật sự phẳng hoặc thẳng.',
        en: '## Shape determines whether dipoles cancel\nWater has polar O–H bonds and a bent molecular shape, so their effects do not cancel. CO₂ instead has a symmetric linear shape. Its two polar C=O bonds point in opposite directions and can cancel, leaving the molecule nonpolar in this model.\nA conclusion about molecular polarity therefore requires both bonding and geometry. Use a 3D model to inspect directions rather than merely count spheres. Sphere sizes and bond sticks are selected for visibility; not every dimension is shown at its physical scale. The model can test an explanation involving symmetry, but an arbitrary flat view is not proof that the real molecule is flat or linear. Rotate the model before interpreting what a particular two-dimensional view appears to show.',
      },
      source: 'https://openstax.org/books/chemistry-2e/pages/7-6-molecular-structure-and-polarity',
    },
    {
      type: 'widget',
      widget: 'structure-3d',
      props: {
        cid: 962,
      },
      caption: {
        vi: 'Quan sát dạng gấp khúc của H₂O; phân biệt hình dạng với công thức chỉ cho số nguyên tử.',
        en: 'Inspect H₂O’s bent shape; a formula alone gives atom counts, not geometry.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'widget',
      widget: 'structure-3d',
      props: {
        cid: 280,
      },
      caption: {
        vi: 'So tính đối xứng của CO₂ với H₂O trước khi kết luận về phân cực toàn phân tử.',
        en: 'Compare CO₂’s symmetry with H₂O before judging overall molecular polarity.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Giữa các phân tử còn có tương tác\nSôi một chất phân tử thường làm các phân tử rời xa nhau, không có nghĩa mọi liên kết cộng hoá trị bên trong đều bị phá. Các tương tác giữa phân tử như lực phân tán và liên kết hydrogen vì thế rất quan trọng với nhiệt độ sôi. Cần gọi rõ đang bàn lực giữa những phân tử hay liên kết trong một phân tử.\nTrong mô hình phổ thông, H liên kết với N, O hoặc F có thể tham gia liên kết hydrogen với cặp electron thích hợp ở tiểu phân bên cạnh. H₂O và NH₃ là các ví dụ quen thuộc. Không phải chất nào có chữ H trong công thức cũng có tương tác này đáng kể. CH₄ không được xếp cùng trường hợp với nước. Tương tác yếu hơn liên kết cộng hoá trị vẫn có thể tạo khác biệt lớn khi nhiều phân tử cùng tham gia.',
        en: '## Molecules also interact with one another\nBoiling a molecular substance usually separates its molecules rather than breaking every covalent bond inside them. Intermolecular attractions, including dispersion forces and hydrogen bonding, therefore matter greatly for boiling behaviour. Always specify whether you mean an attraction between molecules or a bond within one molecule.\nIn the school model, H bonded to N, O or F can participate in hydrogen bonding with a suitable electron pair on a neighbouring species. Water and ammonia are familiar examples. Merely having an H in the formula is not enough; methane is not classified with water in this respect. An interaction weaker than a covalent bond can still produce a major difference when many molecules participate. Comparing physical behaviour requires identifying the relevant interaction rather than counting formula letters alone.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'text',
      md: {
        vi: '## Không phải mọi chất cộng hoá trị đều gồm phân tử riêng\nKim cương và than chì đều là cacbon nhưng có mạng liên kết khác nhau. Kim cương có mạng cộng hoá trị mở rộng; than chì có cấu trúc lớp với electron có thể tham gia dẫn điện trong lớp. Hai vật liệu không phải đồng vị khác nhau và không biến thành hai nguyên tố chỉ vì khác độ cứng hay khả năng dẫn điện.\nKhi xem cấu trúc, hãy nối câu chuyện từ nguyên tử đến tính chất theo từng bước: nhận ra tiểu phân, xem cách liên kết, xác định phần nào có thể chuyển động hay trượt, rồi mới giải thích quan sát. Một câu trả lời như “có electron nên dẫn điện” chưa đủ, vì mọi chất đều có electron. Điều cần biết là các hạt mang điện có di chuyển được trong điều kiện đang xét hay không. Cấu trúc giúp biến sự liên hệ chung chung thành một lời giải có cơ sở.',
        en: '## Covalent materials need not be separate molecules\nDiamond and graphite are both carbon but have different bonding networks. Diamond has an extended covalent network. Graphite has layered bonding with electrons that can contribute to conduction within a layer. They are not different isotopes, nor different elements merely because hardness and conductivity differ.\nConnect structure to properties step by step: identify the species, examine the bonding, decide what can move or slide, then explain the observation. “It has electrons, therefore it conducts” is insufficient because every material contains electrons. The relevant question is whether charge carriers can move under the stated conditions. Structure turns a vague association into an explanation that can be checked against a model, rather than a label memorised separately from the material’s behaviour.',
      },
      source: 'https://periodic-table.rsc.org/element/6/carbon',
    },
    {
      type: 'widget',
      widget: 'structure-3d',
      props: {
        element: 'C',
      },
      caption: {
        vi: 'So mạng của kim cương và cấu trúc lớp của than chì.',
        en: 'Compare diamond’s network with graphite’s layered structure.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'tip',
      md: {
        vi: 'Phân cực liên kết khác phân cực phân tử. Có hạt mang điện cũng khác với có hạt mang điện chuyển động tự do.',
        en: 'Bond polarity differs from molecular polarity. Having charged particles differs from having mobile charge carriers.',
      },
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
    {
      type: 'quiz',
      ids: [
        'chemical-bond-011',
        'chemical-bond-016',
        'chemical-bond-017',
        'chemical-bond-018',
        'chemical-bond-020',
      ],
    },
  ],
  sources: [
    'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    'https://www.sgkvn.com/lop-10-13/ket-noi-tri-thuc-voi-cuoc-song-3/hoa-hoc-10-3643.html',
    'https://openstax.org/books/chemistry-2e/pages/7-6-molecular-structure-and-polarity',
    'https://periodic-table.rsc.org/element/6/carbon',
  ],
});

import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'energy',
  title: {
    vi: 'Năng lượng hoá học',
    en: 'Chemical energy',
  },
  questions: [
    {
      id: 'energy-001',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Phản ứng toả nhiệt có dấu ΔH như thế nào theo quy ước nhiệt của hệ?',
        en: 'What is the sign of ΔH for an exothermic reaction, using the system’s heat convention?',
      },
      explain: {
        vi: 'Hệ truyền nhiệt ra môi trường nên enthalpy sản phẩm thấp hơn chất đầu.',
        en: 'The system releases heat to the surroundings, leaving products at lower enthalpy than reactants.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Âm',
          en: 'Negative',
        },
        {
          vi: 'Dương',
          en: 'Positive',
        },
        {
          vi: 'Luôn bằng 0',
          en: 'Always zero',
        },
        {
          vi: 'Luôn bằng năng lượng hoạt hoá',
          en: 'Always equal to activation energy',
        },
      ],
      answer: 0,
    },
    {
      id: 'energy-002',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Phản ứng thu nhiệt có đặc điểm nào?',
        en: 'What characterises an endothermic reaction?',
      },
      explain: {
        vi: 'Thu nhiệt nói về trao đổi năng lượng, không trực tiếp nói về tốc độ hay khả năng tự xảy ra.',
        en: 'Endothermic describes energy transfer, not directly reaction speed or spontaneity.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Hệ nhường nhiệt, ΔH < 0',
          en: 'The system releases heat, ΔH < 0',
        },
        {
          vi: 'Không đổi năng lượng',
          en: 'Energy is unchanged',
        },
        {
          vi: 'Luôn xảy ra nhanh',
          en: 'It always occurs rapidly',
        },
        {
          vi: 'Hệ nhận nhiệt, ΔH > 0',
          en: 'The system absorbs heat, ΔH > 0',
        },
      ],
      answer: 3,
    },
    {
      id: 'energy-003',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Khi hệ phản ứng toả nhiệt vào cốc nước bao quanh, nước thường biến đổi thế nào nếu tổn thất nhiệt nhỏ?',
        en: 'If a reaction releases heat to surrounding water with little heat loss, what usually happens to the water?',
      },
      explain: {
        vi: 'Hệ phản ứng toả nhiệt, nước xung quanh nhận nhiệt nên thường nóng lên nếu tổn thất nhỏ. Dấu âm của hệ không phải dấu giảm nhiệt độ nước; bảo toàn năng lượng cho phép nhiệt chuyển từ hệ sang môi trường.',
        en: 'Heat released by the reaction warms the surrounding water when losses are small. Negative system ΔH does not imply falling water temperature; energy conservation permits transfer to the surroundings.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nhiệt độ giảm vì ΔH của hệ âm',
          en: 'Its temperature falls because system ΔH is negative',
        },
        {
          vi: 'Nhiệt độ không đổi vì năng lượng được bảo toàn',
          en: 'Its temperature stays fixed because energy is conserved',
        },
        {
          vi: 'Nhiệt độ tăng',
          en: 'Its temperature rises',
        },
        {
          vi: 'Chỉ hệ phản ứng tăng nhiệt độ, nước không thể nhận nhiệt',
          en: 'Only the reaction system can warm; water cannot receive heat',
        },
      ],
      answer: 2,
    },
    {
      id: 'energy-004',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Áp suất chuẩn dùng phổ biến cho dữ liệu nhiệt hoá học hiện nay là bao nhiêu?',
        en: 'What pressure is commonly used as the thermochemical standard pressure?',
      },
      explain: {
        vi: 'Điều kiện chuẩn dùng 1 bar; không thay tự động bằng 1 atm. Nhiệt độ tra dữ liệu cũng phải được ghi rõ.',
        en: 'Standard pressure is 1 bar, not automatically 1 atm. The temperature of the data must also be specified.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Luôn 1 atm',
          en: 'Always 1 atm',
        },
        {
          vi: '1 bar',
          en: '1 bar',
        },
        {
          vi: '1 Pa',
          en: '1 Pa',
        },
        {
          vi: '1 mmHg',
          en: '1 mmHg',
        },
      ],
      answer: 1,
    },
    {
      id: 'energy-005',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Enthalpy tạo thành chuẩn của hợp chất được quy cho lượng chất nào?',
        en: 'What quantity of compound defines its standard enthalpy of formation?',
      },
      explain: {
        vi: 'Đại lượng được quy cho tạo thành 1 mol chất từ các đơn chất ở trạng thái chuẩn bền tương ứng.',
        en: 'It refers to forming one mole from the elements in their appropriate stable standard states.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '1 mol hợp chất',
          en: 'One mole of compound',
        },
        {
          vi: '1 gam hợp chất',
          en: 'One gram of compound',
        },
        {
          vi: '1 phân tử duy nhất',
          en: 'One individual molecule',
        },
        {
          vi: 'Một lượng tuỳ ý không cần nêu',
          en: 'Any unspecified quantity',
        },
      ],
      answer: 0,
    },
    {
      id: 'energy-006',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Enthalpy tạo thành chuẩn của O₂ khí ở trạng thái chuẩn bền được quy ước bằng bao nhiêu?',
        en: 'What standard formation enthalpy is assigned to gaseous O₂ in its stable standard state?',
      },
      explain: {
        vi: 'Mốc 0 dành cho đơn chất ở trạng thái chuẩn bền; không nói rằng phá liên kết O=O không cần năng lượng.',
        en: 'Zero is the reference for an element’s stable standard state, not a claim that breaking O=O takes no energy.',
      },
      elements: ['O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Luôn dương',
          en: 'Always positive',
        },
        {
          vi: 'Luôn âm',
          en: 'Always negative',
        },
        {
          vi: 'Bằng năng lượng liên kết O=O',
          en: 'The O=O bond energy',
        },
        {
          vi: '0',
          en: 'Zero',
        },
      ],
      answer: 3,
    },
    {
      id: 'energy-007',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Một nhiên liệu cần mồi lửa nhưng cháy toả nhiệt. Hai điều này có mâu thuẫn không?',
        en: 'A fuel needs ignition but burns exothermically. Is that contradictory?',
      },
      explain: {
        vi: 'Cần mồi lửa để vượt rào cản hoạt hoá ban đầu, còn ΔH âm nói về chênh lệch enthalpy đầu–cuối. Mồi lửa không tự đổi dấu ΔH; toả nhiệt cũng không có nghĩa không có rào cản.',
        en: 'Ignition crosses an initial activation barrier; negative ΔH compares endpoints. Ignition does not itself reverse ΔH, and an exothermic reaction can still have a barrier.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Có, cần mồi lửa chứng tỏ tổng phản ứng thu nhiệt',
          en: 'Yes, ignition proves the overall reaction is endothermic',
        },
        {
          vi: 'Có, ΔH âm có nghĩa năng lượng hoạt hoá bằng 0',
          en: 'Yes, negative ΔH means zero activation energy',
        },
        {
          vi: 'Không, cần vượt rào cản hoạt hoá ban đầu',
          en: 'No, an initial activation barrier must be crossed',
        },
        {
          vi: 'Không, mồi lửa làm ΔH đổi từ dương sang âm',
          en: 'No, ignition changes ΔH from positive to negative',
        },
      ],
      answer: 2,
    },
    {
      id: 'energy-008',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Phá một liên kết hoá học riêng rẽ cần trao đổi năng lượng thế nào?',
        en: 'What energy transfer is required to break an individual chemical bond?',
      },
      explain: {
        vi: 'Phá một liên kết cần năng lượng dù liên kết phân cực hay không. Dấu nhiệt của toàn phản ứng còn phụ thuộc năng lượng giải phóng khi tạo liên kết mới; không thể gán dấu toàn phản ứng cho riêng bước phá liên kết.',
        en: 'Breaking a bond requires energy whether polar or nonpolar. Net reaction heat also includes bond formation, so the overall sign cannot be assigned to the breaking step alone.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Luôn giải phóng năng lượng',
          en: 'Energy is always released',
        },
        {
          vi: 'Cần cung cấp năng lượng',
          en: 'Energy must be supplied',
        },
        {
          vi: 'Không cần năng lượng nếu liên kết cộng hoá trị không phân cực',
          en: 'Nonpolar covalent bonds need no breaking energy',
        },
        {
          vi: 'Chỉ cần năng lượng khi phản ứng tổng thu nhiệt',
          en: 'Energy is needed only if the overall reaction is endothermic',
        },
      ],
      answer: 1,
    },
    {
      id: 'energy-009',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Khi hình thành liên kết bền từ các nguyên tử đã tách rời, năng lượng thường biến đổi thế nào?',
        en: 'When a stable bond forms from separated atoms, what generally happens energetically?',
      },
      explain: {
        vi: 'Tạo liên kết bền làm giảm năng lượng so với các nguyên tử tách rời nên giải phóng năng lượng. Bảo toàn nguyên tử không đồng nghĩa năng lượng không đổi; hệ số chỉ quy định lượng, không tự quyết định dấu.',
        en: 'Stable bond formation lowers energy relative to separated atoms and releases it. Conserved atoms do not imply unchanged energy; coefficients specify amounts rather than determining the sign.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Năng lượng được giải phóng',
          en: 'Energy is released',
        },
        {
          vi: 'Năng lượng được hấp thụ như khi phá liên kết',
          en: 'Energy is absorbed as in bond breaking',
        },
        {
          vi: 'Không trao đổi năng lượng vì số nguyên tử không đổi',
          en: 'No energy changes because atom counts are conserved',
        },
        {
          vi: 'Dấu năng lượng chỉ phụ thuộc hệ số phương trình',
          en: 'The sign depends only on equation coefficients',
        },
      ],
      answer: 0,
    },
    {
      id: 'energy-010',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Đảo chiều một phương trình nhiệt hoá học thì ΔH thay đổi thế nào?',
        en: 'What happens to ΔH when a thermochemical equation is reversed?',
      },
      explain: {
        vi: 'Chất đầu và sản phẩm đổi chỗ nên hiệu enthalpy đổi dấu.',
        en: 'Reactants and products swap, reversing the enthalpy difference.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Giữ nguyên dấu và độ lớn',
          en: 'Both sign and magnitude stay the same',
        },
        {
          vi: 'Luôn thành 0',
          en: 'It always becomes zero',
        },
        {
          vi: 'Chỉ nhân 2',
          en: 'It is simply doubled',
        },
        {
          vi: 'Đổi dấu, giữ độ lớn',
          en: 'Its sign reverses, magnitude stays the same',
        },
      ],
      answer: 3,
    },
    {
      id: 'energy-011',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Nhân toàn bộ hệ số phương trình nhiệt hoá học với 2 thì ΔH tương ứng ra sao?',
        en: 'If all coefficients of a thermochemical equation are doubled, what happens to its corresponding ΔH?',
      },
      explain: {
        vi: 'ΔH đi kèm lượng phản ứng như phương trình viết; đổi lượng phản ứng thì đổi nhiệt theo cùng tỉ lệ.',
        en: 'ΔH corresponds to the reaction amount as written, so scaling that amount scales the heat.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Không đổi trong mọi cách viết',
          en: 'It is always unchanged',
        },
        {
          vi: 'Đổi dấu nhưng không đổi độ lớn',
          en: 'Only its sign reverses',
        },
        {
          vi: 'Nhân 2',
          en: 'It doubles',
        },
        {
          vi: 'Chia 2',
          en: 'It halves',
        },
      ],
      answer: 2,
    },
    {
      id: 'energy-012',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Điểm khác giữa năng lượng hoạt hoá và ΔH là gì?',
        en: 'How do activation energy and ΔH differ?',
      },
      explain: {
        vi: 'Năng lượng hoạt hoá liên quan rào cản của đường phản ứng; ΔH so sánh hai trạng thái đầu–cuối. Không thể suy dấu hoặc độ lớn của rào cản chỉ từ ΔH.',
        en: 'Activation energy concerns a pathway barrier, while ΔH compares endpoints. Its sign or magnitude cannot be inferred simply from ΔH.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Hai tên luôn chỉ cùng một đại lượng',
          en: 'They always denote the same quantity',
        },
        {
          vi: 'Một đại lượng là rào cản, một đại lượng là chênh enthalpy đầu–cuối',
          en: 'One is a barrier; the other is the endpoint enthalpy difference',
        },
        {
          vi: 'ΔH âm có nghĩa năng lượng hoạt hoá âm',
          en: 'Negative ΔH means negative activation energy',
        },
        {
          vi: 'Năng lượng hoạt hoá bằng độ lớn ΔH trong mọi phản ứng',
          en: 'Activation energy always equals the magnitude of ΔH',
        },
      ],
      answer: 1,
    },
    {
      id: 'energy-013',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Xúc tác có làm thay đổi ΔH của cùng một phản ứng giữa cùng các trạng thái đầu–cuối không?',
        en: 'Does a catalyst alter ΔH for a reaction with the same initial and final states?',
      },
      explain: {
        vi: 'Xúc tác đổi con đường và rào cản hoạt hoá, không đổi chênh enthalpy giữa cùng trạng thái đầu–cuối. Giảm năng lượng hoạt hoá không phải giảm ΔH hay biến nó thành 0.',
        en: 'A catalyst changes the route and activation barrier, not the enthalpy difference between identical endpoints. Lower activation energy does not lower ΔH or set it to zero.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Không',
          en: 'No',
        },
        {
          vi: 'Luôn làm ΔH âm hơn',
          en: 'It always makes ΔH more negative',
        },
        {
          vi: 'Luôn làm ΔH bằng 0',
          en: 'It always sets ΔH to zero',
        },
        {
          vi: 'Giảm ΔH đúng bằng phần năng lượng hoạt hoá đã giảm',
          en: 'It lowers ΔH by the activation-energy reduction',
        },
      ],
      answer: 0,
    },
    {
      id: 'energy-014',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Định luật Hess cho phép làm gì?',
        en: 'What does Hess’s law allow?',
      },
      explain: {
        vi: 'Enthalpy là hàm trạng thái; phải cộng phương trình, hệ số và dấu một cách nhất quán.',
        en: 'Enthalpy is a state function, but equations, coefficients and signs must be combined consistently.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cộng ΔH bất kể phương trình có khớp hay không',
          en: 'Add ΔH values regardless of equation matching',
        },
        {
          vi: 'Bỏ qua trạng thái chất',
          en: 'Ignore physical states',
        },
        {
          vi: 'Suy mọi phản ứng đều toả nhiệt',
          en: 'Conclude all reactions are exothermic',
        },
        {
          vi: 'Cộng các ΔH khi cộng các bước phản ứng phù hợp',
          en: 'Add ΔH values for correctly combined reaction steps',
        },
      ],
      answer: 3,
    },
    {
      id: 'energy-015',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Ước tính ΔH từ năng lượng liên kết dùng hiệu nào?',
        en: 'Which difference estimates ΔH from bond energies?',
      },
      explain: {
        vi: 'Phá liên kết cần vào, tạo liên kết cho ra. Năng lượng liên kết trung bình cho phép ước tính, thường cho các chất khí.',
        en: 'Breaking consumes energy and formation releases it. Average bond energies provide an estimate, typically for gas-phase species.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Tổng hai phần luôn âm',
          en: 'Their sum is always negative',
        },
        {
          vi: 'Chỉ lấy số liên kết sản phẩm',
          en: 'Only the number of product bonds',
        },
        {
          vi: 'Năng lượng phá liên kết − năng lượng tạo liên kết',
          en: 'Bond-breaking energy − bond-forming energy',
        },
        {
          vi: 'Năng lượng tạo liên kết − năng lượng phá liên kết',
          en: 'Bond-forming energy − bond-breaking energy',
        },
      ],
      answer: 2,
    },
    {
      id: 'energy-016',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Chọn các phát biểu đúng về nhiệt phản ứng.',
        en: 'Select the correct statements about reaction heat.',
      },
      explain: {
        vi: 'Cần tách nhiệt động học khỏi tốc độ. Xúc tác thay đổi con đường, không thay đổi cùng hai trạng thái đầu–cuối.',
        en: 'Separate thermodynamics from kinetics. A catalyst changes the route, not the same pair of endpoint states.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'ΔH phụ thuộc trạng thái đầu và cuối',
          en: 'ΔH depends on the initial and final states',
        },
        {
          vi: 'Toả nhiệt đồng nghĩa luôn xảy ra ngay lập tức',
          en: 'Exothermic means immediate reaction',
        },
        {
          vi: 'Đổi chiều phản ứng làm đổi dấu ΔH',
          en: 'Reversing a reaction reverses ΔH’s sign',
        },
        {
          vi: 'Xúc tác làm đổi chênh enthalpy đầu–cuối',
          en: 'A catalyst changes the endpoint enthalpy difference',
        },
      ],
      answer: [0, 2],
    },
    {
      id: 'energy-017',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Cho CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l), lấy tròn ΔH = −890 kJ theo phương trình. Đốt hoàn toàn 0,50 mol CH₄ với O₂ dư, ΔH của lượng phản ứng là bao nhiêu kJ?',
        en: 'For CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l), use rounded ΔH = −890 kJ as written. What is ΔH in kJ for complete combustion of 0.50 mol CH₄ in excess O₂?',
      },
      explain: {
        vi: 'Lượng CH₄ bằng nửa hệ số mol của phương trình nên ΔH = 0,50 × (−890) = −445 kJ; dấu âm chỉ nhiệt truyền ra.',
        en: 'The methane amount is half the reaction as written, so ΔH = 0.50 × (−890) = −445 kJ. The negative sign denotes released heat.',
      },
      elements: ['C', 'H', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy',
      equations: ['CH4 + O2 -> CO2 + H2O'],
      type: 'number',
      answer: -445,
      tolerance: 1e-9,
      calculation: {
        kind: 'reaction-heat',
        equation: 'CH4 + O2 -> CO2 + H2O',
        givenMol: [0.5, null],
        deltaH: -890,
      },
      unit: 'kJ',
    },
    {
      id: 'energy-018',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Lấy C = 12, H = 1. Một mol nhiên liệu CH₄ có khối lượng bao nhiêu gam?',
        en: 'Using C = 12 and H = 1, what is the mass in grams of one mole of CH₄ fuel?',
      },
      explain: {
        vi: 'M(CH₄) = 12 + 4 × 1 = 16 g/mol; một mol có khối lượng 16 g theo dữ kiện.',
        en: 'M(CH₄) = 12 + 4 × 1 = 16 g/mol, so one mole weighs 16 g using the stated data.',
      },
      elements: ['C', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'number',
      answer: 16,
      tolerance: 0,
      calculation: {
        kind: 'molar-mass',
        formula: 'CH4',
        masses: {
          C: 12,
          H: 1,
        },
      },
      unit: 'g',
    },
    {
      id: 'energy-019',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Một phản ứng giả định có ΔH = +100 kJ cho 1 mol phản ứng như viết. Khi xảy ra gấp đôi lượng đó, hệ trao đổi nhiệt thế nào?',
        en: 'A hypothetical reaction has ΔH = +100 kJ per mole of reaction as written. What heat transfer occurs for twice that amount?',
      },
      explain: {
        vi: 'Theo dữ kiện giả định, ΔH = 2 × 100 = +200 kJ. Dấu dương chỉ hệ nhận nhiệt, không phải nhường nhiệt.',
        en: 'For the hypothetical data, ΔH = 2 × 100 = +200 kJ. A positive sign means absorption by the system.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nhận 50 kJ',
          en: 'Absorbs 50 kJ',
        },
        {
          vi: 'Không trao đổi nhiệt',
          en: 'Transfers no heat',
        },
        {
          vi: 'Nhận 200 kJ',
          en: 'Absorbs 200 kJ',
        },
        {
          vi: 'Nhường 200 kJ',
          en: 'Releases 200 kJ',
        },
      ],
      answer: 2,
    },
    {
      id: 'energy-020',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Hai phép đo cùng phản ứng nhưng tạo H₂O(l) và H₂O(g). Có thể mặc nhiên dùng cùng ΔH không?',
        en: 'Two reaction measurements produce H₂O(l) and H₂O(g), respectively. May the same ΔH be assumed?',
      },
      explain: {
        vi: 'Trạng thái lỏng và khí có enthalpy khác nhau. Cùng công thức và cùng số nguyên tử chưa đủ: phải ghi trạng thái và điều kiện trước khi dùng một giá trị ΔH.',
        en: 'Liquid and gas have different enthalpies. Matching formulas and atom counts is insufficient; physical states and conditions must match before using ΔH.',
      },
      elements: ['H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Có, vì cùng công thức H₂O là đủ',
          en: 'Yes, the same H₂O formula is enough',
        },
        {
          vi: 'Không, trạng thái của sản phẩm khác nhau',
          en: 'No, the product states differ',
        },
        {
          vi: 'Có, vì trạng thái không ảnh hưởng enthalpy',
          en: 'Yes, physical state does not affect enthalpy',
        },
        {
          vi: 'Có, nếu chỉ cân bằng đúng số nguyên tử',
          en: 'Yes, if atom counts are balanced',
        },
      ],
      answer: 1,
    },
  ],
});

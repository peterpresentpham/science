import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'nitrogen-sulfur',
  title: {
    vi: 'Nitrogen và sulfur',
    en: 'Nitrogen and sulfur',
  },
  questions: [
    {
      id: 'nitrogen-sulfur-001',
      grade: 11,
      difficulty: 1,
      q: {
        vi: 'Vì sao N₂ khá kém hoạt động ở điều kiện thường?',
        en: 'Why is N₂ relatively unreactive under ordinary conditions?',
      },
      explain: {
        vi: 'Liên kết ba bền làm N₂ khó phản ứng ở điều kiện thường. Nó không là khí hiếm, không có liên kết đơn và vẫn phản ứng được khi có điều kiện thích hợp.',
        en: 'A strong triple bond limits ordinary-condition reactivity. N₂ is not a noble gas or singly bonded molecule and can react under suitable conditions.',
      },
      elements: ['N'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Liên kết ba N≡N bền',
          en: 'Its N≡N triple bond is strong',
        },
        {
          vi: 'N₂ không có electron độc thân nên không thể phản ứng ở mọi điều kiện',
          en: 'N₂ has no unpaired electrons and can never react',
        },
        {
          vi: 'N₂ có liên kết đơn không phân cực yếu',
          en: 'N₂ has a weak nonpolar single bond',
        },
        {
          vi: 'N₂ là khí hiếm vì có lớp ngoài cùng bền',
          en: 'N₂ is a noble gas because its outer shell is stable',
        },
      ],
      answer: 0,
    },
    {
      id: 'nitrogen-sulfur-002',
      grade: 11,
      difficulty: 1,
      q: {
        vi: 'Dung dịch NH₃ trong nước thể hiện tính chất nào?',
        en: 'What acid–base behaviour does aqueous NH₃ show?',
      },
      explain: {
        vi: 'NH₃ nhận proton từ nước theo cân bằng, không phân li hoàn toàn như bazơ mạnh.',
        en: 'NH₃ accepts a proton from water in an equilibrium, unlike a fully ionised strong base.',
      },
      elements: ['N', 'H', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Axit mạnh',
          en: 'A strong acid',
        },
        {
          vi: 'Luôn trung tính',
          en: 'Always neutral',
        },
        {
          vi: 'Bazơ mạnh phân li hoàn toàn',
          en: 'A completely ionised strong base',
        },
        {
          vi: 'Bazơ yếu',
          en: 'A weak base',
        },
      ],
      answer: 3,
    },
    {
      id: 'nitrogen-sulfur-003',
      grade: 11,
      difficulty: 1,
      q: {
        vi: 'Công thức ion amoni là gì?',
        en: 'What is the ammonium ion formula?',
      },
      explain: {
        vi: 'NH₄⁺ hình thành khi NH₃ nhận H⁺. NO₃⁻ là ion nitrat.',
        en: 'NH₄⁺ forms when NH₃ gains H⁺; NO₃⁻ is nitrate.',
      },
      elements: ['N', 'H'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'NO₃⁻',
          en: 'NO₃⁻',
        },
        {
          vi: 'NH₂⁻',
          en: 'NH₂⁻',
        },
        {
          vi: 'NH₄⁺',
          en: 'NH₄⁺',
        },
        {
          vi: 'NH₃',
          en: 'NH₃',
        },
      ],
      answer: 2,
    },
    {
      id: 'nitrogen-sulfur-004',
      grade: 11,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá của N trong NH₃ là bao nhiêu?',
        en: 'What is N’s oxidation state in NH₃?',
      },
      explain: {
        vi: 'Ba H có tổng +3 nên N là −3 trong phân tử trung hoà.',
        en: 'Three H atoms total +3, requiring N to be −3 in the neutral molecule.',
      },
      elements: ['N', 'H'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '−1',
          en: '−1',
        },
        {
          vi: '−3',
          en: '−3',
        },
        {
          vi: '+3',
          en: '+3',
        },
        {
          vi: '0',
          en: '0',
        },
      ],
      answer: 1,
    },
    {
      id: 'nitrogen-sulfur-005',
      grade: 11,
      difficulty: 1,
      q: {
        vi: 'HNO₃ ngoài tính axit còn thường có tính chất nào?',
        en: 'Besides acidity, what property is characteristic of HNO₃?',
      },
      explain: {
        vi: 'N ở số oxi hoá +5 có thể bị khử. Không áp dụng máy móc quy tắc mọi axit gặp kim loại đều tạo H₂.',
        en: 'Nitrogen at +5 can be reduced. The rule that acids plus metals always yield H₂ is not generally applicable.',
      },
      elements: ['H', 'N', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Tính oxi hoá',
          en: 'Oxidising ability',
        },
        {
          vi: 'Luôn chỉ tính khử',
          en: 'Exclusively reducing behaviour',
        },
        {
          vi: 'Tính bazơ',
          en: 'Basicity',
        },
        {
          vi: 'Luôn trơ với kim loại',
          en: 'Universal inertness toward metals',
        },
      ],
      answer: 0,
    },
    {
      id: 'nitrogen-sulfur-006',
      grade: 11,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá của S trong đơn chất lưu huỳnh là bao nhiêu?',
        en: 'What is S’s oxidation state in elemental sulfur?',
      },
      explain: {
        vi: 'Mọi nguyên tố trong đơn chất có số oxi hoá 0, dù đơn chất có thể gồm phân tử nhiều nguyên tử.',
        en: 'An element in its elemental form has oxidation state zero, even in a multi-atom molecule.',
      },
      elements: ['S'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-10-occurrence-preparation-and-properties-of-sulfur',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '−2',
          en: '−2',
        },
        {
          vi: '+4',
          en: '+4',
        },
        {
          vi: '+6',
          en: '+6',
        },
        {
          vi: '0',
          en: '0',
        },
      ],
      answer: 3,
    },
    {
      id: 'nitrogen-sulfur-007',
      grade: 11,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá của S trong SO₂ là bao nhiêu?',
        en: 'What is S’s oxidation state in SO₂?',
      },
      explain: {
        vi: 'Hai O có tổng −4 nên S là +4.',
        en: 'Two O atoms total −4, so S is +4.',
      },
      elements: ['S', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-10-occurrence-preparation-and-properties-of-sulfur',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '+6',
          en: '+6',
        },
        {
          vi: '0',
          en: '0',
        },
        {
          vi: '+4',
          en: '+4',
        },
        {
          vi: '−2',
          en: '−2',
        },
      ],
      answer: 2,
    },
    {
      id: 'nitrogen-sulfur-008',
      grade: 11,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá của S trong H₂SO₄ là bao nhiêu?',
        en: 'What is S’s oxidation state in H₂SO₄?',
      },
      explain: {
        vi: 'Hai H là +2, bốn O là −8; S phải là +6 để tổng bằng 0.',
        en: 'Two H contribute +2 and four O −8, requiring S to be +6.',
      },
      elements: ['H', 'S', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-10-occurrence-preparation-and-properties-of-sulfur',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '0',
          en: '0',
        },
        {
          vi: '+6',
          en: '+6',
        },
        {
          vi: '+4',
          en: '+4',
        },
        {
          vi: '−2',
          en: '−2',
        },
      ],
      answer: 1,
    },
    {
      id: 'nitrogen-sulfur-009',
      grade: 11,
      difficulty: 2,
      q: {
        vi: 'Khi NH₃ gặp HCl tạo NH₄Cl, bản chất chính của biến đổi là gì?',
        en: 'What is the main chemical change when NH₃ and HCl form NH₄Cl?',
      },
      explain: {
        vi: 'NH₃ nhận H⁺ tạo NH₄⁺, kết hợp Cl⁻ thành NH₄Cl. Số oxi hoá N vẫn −3 và Cl vẫn −1; tăng từ −1 lên 0 cũng không phải khử. Đây là biến đổi axit–bazơ, không chỉ hoà tan.',
        en: 'NH₃ accepts H⁺ to form NH₄⁺, paired with Cl⁻. N stays −3 and Cl stays −1; a rise from −1 to zero would not be reduction either. This is acid–base chemistry, not mere dissolution.',
      },
      elements: ['N', 'H', 'Cl'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: ['NH3 + HCl -> NH4Cl'],
      type: 'single',
      options: [
        {
          vi: 'NH₃ nhận proton',
          en: 'NH₃ accepts a proton',
        },
        {
          vi: 'N trong NH₃ bị oxi hoá từ −3 lên +5',
          en: 'N in NH₃ is oxidised from −3 to +5',
        },
        {
          vi: 'Cl trong HCl bị khử từ −1 xuống 0',
          en: 'Cl in HCl is reduced from −1 to zero',
        },
        {
          vi: 'NH₃ chỉ hoà tan mà không nhận H⁺',
          en: 'NH₃ only dissolves without accepting H⁺',
        },
      ],
      answer: 0,
    },
    {
      id: 'nitrogen-sulfur-010',
      grade: 11,
      difficulty: 2,
      q: {
        vi: 'Trong NO₃⁻, số oxi hoá của N là bao nhiêu?',
        en: 'What is N’s oxidation state in NO₃⁻?',
      },
      explain: {
        vi: 'N + 3 × (−2) = −1, nên N = +5; không đặt tổng bằng 0 cho ion này.',
        en: 'N + 3 × (−2) = −1, so N = +5. This ion’s oxidation-state sum is not zero.',
      },
      elements: ['N', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '+6',
          en: '+6',
        },
        {
          vi: '+3',
          en: '+3',
        },
        {
          vi: '−1',
          en: '−1',
        },
        {
          vi: '+5',
          en: '+5',
        },
      ],
      answer: 3,
    },
    {
      id: 'nitrogen-sulfur-011',
      grade: 11,
      difficulty: 2,
      q: {
        vi: 'Dấu hiệu nào phù hợp khi ion NH₄⁺ gặp OH⁻ và được làm ấm trong phòng thí nghiệm?',
        en: 'What is consistent with warming NH₄⁺ with OH⁻ in a laboratory?',
      },
      explain: {
        vi: 'NH₄⁺ gặp OH⁻ giải phóng NH₃ khi làm ấm; NH₃ làm quỳ đỏ ẩm hoá xanh do tính bazơ. Không dùng quỳ khô để thay cho quỳ ẩm và không suy có H₂ chỉ vì ion chứa H.',
        en: 'Warming NH₄⁺ with OH⁻ releases basic NH₃, which turns moist red litmus blue. Dry litmus is not equivalent, and hydrogen content alone does not imply H₂ formation.',
      },
      elements: ['N', 'H', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: ['NH4^+ + OH^- -> NH3 + H2O'],
      type: 'single',
      options: [
        {
          vi: 'Tạo NH₃ làm quỳ đỏ ẩm hoá đỏ hơn',
          en: 'NH₃ forms and makes moist red litmus redder',
        },
        {
          vi: 'Tạo NH₃ nhưng quỳ chỉ đổi màu khi khô',
          en: 'NH₃ forms but litmus changes only when dry',
        },
        {
          vi: 'Tạo NH₃ làm giấy quỳ đỏ ẩm hoá xanh',
          en: 'NH₃ forms and turns moist red litmus blue',
        },
        {
          vi: 'Tạo H₂ vì NH₄⁺ chứa H',
          en: 'H₂ forms because NH₄⁺ contains H',
        },
      ],
      answer: 2,
    },
    {
      id: 'nitrogen-sulfur-012',
      grade: 11,
      difficulty: 2,
      q: {
        vi: 'Fe phản ứng với H₂SO₄ loãng thường tạo khí nào?',
        en: 'What gas is normally formed by Fe with dilute H₂SO₄?',
      },
      explain: {
        vi: 'Với axit loãng không có tác nhân oxi hoá khác, Fe khử H⁺ thành H₂. Điều kiện khác có thể cho sản phẩm khác.',
        en: 'With dilute acid and no other oxidant, Fe reduces H⁺ to H₂. Different conditions may give different products.',
      },
      elements: ['Fe', 'H', 'S', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-10-occurrence-preparation-and-properties-of-sulfur',
      equations: ['Fe + H2SO4 -> FeSO4 + H2'],
      type: 'single',
      options: [
        {
          vi: 'N₂',
          en: 'N₂',
        },
        {
          vi: 'H₂',
          en: 'H₂',
        },
        {
          vi: 'SO₂ trong mọi trường hợp',
          en: 'SO₂ in every case',
        },
        {
          vi: 'O₂',
          en: 'O₂',
        },
      ],
      answer: 1,
    },
    {
      id: 'nitrogen-sulfur-013',
      grade: 11,
      difficulty: 2,
      q: {
        vi: 'Cu tác dụng với H₂SO₄ đặc, nóng theo Cu + H2SO4 -> CuSO4 + SO2 + H2O. Khí tạo ra là gì?',
        en: 'For Cu with hot concentrated H₂SO₄, Cu + H2SO4 -> CuSO4 + SO2 + H2O, which gas forms?',
      },
      explain: {
        vi: 'S trong axit bị khử từ +6 xuống +4, tạo SO₂. Không dùng quy tắc tạo H₂ của axit loãng cho trường hợp này.',
        en: 'Sulfur is reduced from +6 to +4, giving SO₂. The dilute-acid hydrogen rule does not apply.',
      },
      elements: ['Cu', 'H', 'S', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-10-occurrence-preparation-and-properties-of-sulfur',
      equations: ['Cu + H2SO4 -> CuSO4 + SO2 + H2O'],
      type: 'single',
      options: [
        {
          vi: 'SO₂',
          en: 'SO₂',
        },
        {
          vi: 'H₂',
          en: 'H₂',
        },
        {
          vi: 'O₂',
          en: 'O₂',
        },
        {
          vi: 'N₂',
          en: 'N₂',
        },
      ],
      answer: 0,
    },
    {
      id: 'nitrogen-sulfur-014',
      grade: 11,
      difficulty: 2,
      q: {
        vi: 'Ion nào tạo kết tủa trắng rất ít tan với SO₄²⁻ trong môi trường axit thích hợp?',
        en: 'Which ion forms a very sparingly soluble white sulfate precipitate in a suitable acidic medium?',
      },
      explain: {
        vi: 'BaSO₄ rất ít tan; muối sulfate của Na⁺, K⁺ và NH₄⁺ tan trong phép thử thông thường.',
        en: 'BaSO₄ is very sparingly soluble; ordinary Na⁺, K⁺ and NH₄⁺ sulfates are soluble.',
      },
      elements: ['Ba', 'S', 'O', 'Na', 'K', 'N', 'H'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-10-occurrence-preparation-and-properties-of-sulfur',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Na⁺',
          en: 'Na⁺',
        },
        {
          vi: 'K⁺',
          en: 'K⁺',
        },
        {
          vi: 'NH₄⁺',
          en: 'NH₄⁺',
        },
        {
          vi: 'Ba²⁺',
          en: 'Ba²⁺',
        },
      ],
      answer: 3,
    },
    {
      id: 'nitrogen-sulfur-015',
      grade: 11,
      difficulty: 2,
      q: {
        vi: 'Trong phản ứng N2 + H2 -> NH3, chất nào bị khử?',
        en: 'In N2 + H2 -> NH3, which reactant is reduced?',
      },
      explain: {
        vi: 'N từ 0 xuống −3 nên bị khử; H từ 0 lên +1 nên bị oxi hoá.',
        en: 'N goes from 0 to −3 and is reduced; H goes from 0 to +1 and is oxidised.',
      },
      elements: ['N', 'H'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: ['N2 + H2 -> NH3'],
      type: 'single',
      options: [
        {
          vi: 'Cả hai đều bị oxi hoá',
          en: 'Both are oxidised',
        },
        {
          vi: 'Không có số oxi hoá thay đổi',
          en: 'No oxidation states change',
        },
        {
          vi: 'N₂',
          en: 'N₂',
        },
        {
          vi: 'H₂',
          en: 'H₂',
        },
      ],
      answer: 2,
    },
    {
      id: 'nitrogen-sulfur-016',
      grade: 11,
      difficulty: 2,
      q: {
        vi: 'Trong cân bằng tổng hợp NH₃, xúc tác sắt làm gì?',
        en: 'What does an iron catalyst do in ammonia synthesis equilibrium?',
      },
      explain: {
        vi: 'Xúc tác tăng tốc cả hai chiều và không đổi thành phần cân bằng tại cùng nhiệt độ.',
        en: 'A catalyst accelerates both directions without changing equilibrium composition at a fixed temperature.',
      },
      elements: ['Fe', 'N', 'H'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Làm thay đổi hệ số phương trình',
          en: 'Changes stoichiometric coefficients',
        },
        {
          vi: 'Giúp đạt cân bằng nhanh hơn',
          en: 'Helps equilibrium be reached faster',
        },
        {
          vi: 'Tự làm tăng hằng số cân bằng ở cùng nhiệt độ',
          en: 'Increases the equilibrium constant at fixed temperature',
        },
        {
          vi: 'Chỉ tăng tốc chiều thuận',
          en: 'Accelerates only the forward reaction',
        },
      ],
      answer: 1,
    },
    {
      id: 'nitrogen-sulfur-017',
      grade: 11,
      difficulty: 3,
      q: {
        vi: 'Ở cùng nhiệt độ, tăng áp suất bằng cách giảm thể tích cân bằng N2 + H2 -> NH3 thường làm cân bằng chuyển theo chiều nào?',
        en: 'At fixed temperature, compressing the N2 + H2 -> NH3 equilibrium generally favours which direction?',
      },
      explain: {
        vi: 'Phương trình cân bằng có 4 mol khí chất đầu tạo 2 mol NH₃. Giảm thể tích ở cùng nhiệt độ ưu tiên phía ít mol khí hơn. Bảo toàn nguyên tử không loại bỏ chuyển dịch; xúc tác không giữ cố định thành phần khi điều kiện đổi.',
        en: 'Four reactant gas moles form two NH₃ moles, so compression favours the lower-mole side. Atom conservation does not prevent a shift; a catalyst does not fix composition when conditions change.',
      },
      elements: ['N', 'H'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: ['N2 + H2 -> NH3'],
      type: 'single',
      options: [
        {
          vi: 'Tạo NH₃ vì tổng mol khí giảm',
          en: 'Toward NH₃ because gas-mole count decreases',
        },
        {
          vi: 'Tạo N₂ và H₂ vì số mol khí lớn hơn',
          en: 'Towards N₂ and H₂ because they have more gas moles',
        },
        {
          vi: 'Không đổi vì số nguyên tử được bảo toàn',
          en: 'No shift because atoms are conserved',
        },
        {
          vi: 'Không đổi vì xúc tác giữ cố định thành phần cân bằng',
          en: 'No shift because a catalyst fixes equilibrium composition',
        },
      ],
      answer: 0,
    },
    {
      id: 'nitrogen-sulfur-018',
      grade: 11,
      difficulty: 3,
      q: {
        vi: 'Lấy H = 1, N = 14, O = 16. Khối lượng mol NH₄NO₃ là bao nhiêu g/mol?',
        en: 'Using H = 1, N = 14 and O = 16, what is NH₄NO₃’s molar mass in g/mol?',
      },
      explain: {
        vi: 'Có hai N, bốn H và ba O: 2 × 14 + 4 × 1 + 3 × 16 = 80 g/mol.',
        en: 'There are two N, four H and three O: 2 × 14 + 4 × 1 + 3 × 16 = 80 g/mol.',
      },
      elements: ['N', 'H', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: [],
      type: 'number',
      answer: 80,
      tolerance: 0,
      calculation: {
        kind: 'molar-mass',
        formula: 'NH4NO3',
        masses: {
          H: 1,
          N: 14,
          O: 16,
        },
      },
      unit: 'g/mol',
    },
    {
      id: 'nitrogen-sulfur-019',
      grade: 11,
      difficulty: 3,
      q: {
        vi: 'Cân bằng Cu + HNO3 -> Cu(NO3)2 + NO + H2O cho axit loãng. Hệ số HNO₃ tối giản là bao nhiêu?',
        en: 'Balance Cu + HNO3 -> Cu(NO3)2 + NO + H2O for dilute acid. What is the smallest HNO₃ coefficient?',
      },
      explain: {
        vi: 'Tỉ lệ tối giản là 3 : 8 : 3 : 2 : 4. Cần đủ nitơ cho cả muối và khí NO.',
        en: 'The smallest ratio is 3 : 8 : 3 : 2 : 4. Nitrogen must supply both nitrate salt and NO.',
      },
      elements: ['Cu', 'H', 'N', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      equations: ['Cu + HNO3 -> Cu(NO3)2 + NO + H2O'],
      type: 'number',
      answer: 8,
      tolerance: 0,
      calculation: {
        kind: 'coefficient',
        equation: 'Cu + HNO3 -> Cu(NO3)2 + NO + H2O',
        species: 1,
      },
    },
    {
      id: 'nitrogen-sulfur-020',
      grade: 11,
      difficulty: 3,
      q: {
        vi: 'Những khí nào là tác nhân chính liên quan đến mưa axit trong các lựa chọn sau?',
        en: 'Which listed gases are major contributors associated with acid rain?',
      },
      explain: {
        vi: 'SO₂ và các oxide nitrogen như NO₂ có thể tạo axit trong khí quyển. N₂ và O₂ không được xếp như các tiền chất axit trực tiếp này.',
        en: 'SO₂ and nitrogen oxides such as NO₂ can form atmospheric acids. N₂ and O₂ are not these direct acid precursors.',
      },
      elements: ['S', 'O', 'N'],
      source: 'https://www.epa.gov/acidrain/what-acid-rain',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'SO₂',
          en: 'SO₂',
        },
        {
          vi: 'NO₂',
          en: 'NO₂',
        },
        {
          vi: 'N₂',
          en: 'N₂',
        },
        {
          vi: 'O₂',
          en: 'O₂',
        },
      ],
      answer: [0, 1],
    },
  ],
});

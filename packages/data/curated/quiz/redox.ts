import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'redox',
  title: {
    vi: 'Phản ứng oxi hoá – khử',
    en: 'Redox reactions',
  },
  questions: [
    {
      id: 'redox-001',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Oxi hoá ứng với biến đổi nào?',
        en: 'Which change is oxidation?',
      },
      explain: {
        vi: 'Oxi hoá là nhường electron và tăng số oxi hoá. Nhận electron là khử; hai lựa chọn còn lại ghép sai chiều trao đổi electron với chiều biến đổi số oxi hoá.',
        en: 'Oxidation loses electrons and raises oxidation state. Electron gain is reduction; the other pairs mismatch electron transfer with oxidation-state direction.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nhường electron, số oxi hoá tăng',
          en: 'Electron loss and increased oxidation state',
        },
        {
          vi: 'Nhận electron, số oxi hoá giảm',
          en: 'Gain of electrons and a decrease in oxidation state',
        },
        {
          vi: 'Nhường electron, số oxi hoá giảm',
          en: 'Loss of electrons and a decrease in oxidation state',
        },
        {
          vi: 'Nhận electron, số oxi hoá tăng',
          en: 'Gain of electrons and an increase in oxidation state',
        },
      ],
      answer: 0,
    },
    {
      id: 'redox-002',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Khử ứng với biến đổi nào?',
        en: 'Which change is reduction?',
      },
      explain: {
        vi: 'Khử là nhận electron và giảm số oxi hoá. Nhường electron và tăng số oxi hoá là oxi hoá; hai cách ghép còn lại không nhất quán.',
        en: 'Reduction gains electrons and lowers oxidation state. Electron loss with increasing state is oxidation; the other pairings are inconsistent.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nhường electron, số oxi hoá tăng',
          en: 'Loss of electrons and an increase in oxidation state',
        },
        {
          vi: 'Nhận electron, số oxi hoá tăng',
          en: 'Gain of electrons and an increase in oxidation state',
        },
        {
          vi: 'Nhường electron, số oxi hoá giảm',
          en: 'Loss of electrons and a decrease in oxidation state',
        },
        {
          vi: 'Nhận electron, số oxi hoá giảm',
          en: 'Electron gain and decreased oxidation state',
        },
      ],
      answer: 3,
    },
    {
      id: 'redox-003',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Chất khử đóng vai trò nào?',
        en: 'What does a reducing agent do?',
      },
      explain: {
        vi: 'Tên chất khử nói về tác dụng lên chất khác; chính nó nhường electron và bị oxi hoá.',
        en: 'A reducing agent reduces another species by donating electrons, and is itself oxidised.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Luôn chứa oxi',
          en: 'Always contains oxygen',
        },
        {
          vi: 'Không đổi số oxi hoá trong mọi phản ứng',
          en: 'Always keeps every oxidation state unchanged',
        },
        {
          vi: 'Cho electron và bị oxi hoá',
          en: 'Donates electrons and is oxidised',
        },
        {
          vi: 'Nhận electron và bị khử',
          en: 'Accepts electrons and is reduced',
        },
      ],
      answer: 2,
    },
    {
      id: 'redox-004',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Chất oxi hoá đóng vai trò nào?',
        en: 'What does an oxidising agent do?',
      },
      explain: {
        vi: 'Nhiều chất không chứa oxi vẫn là chất oxi hoá, như Cl₂. Vai trò được xác định bằng trao đổi electron.',
        en: 'An oxidant need not contain oxygen: Cl₂ is an example. Electron transfer determines the role.',
      },
      elements: ['Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Chỉ làm xúc tác',
          en: 'Only acts as a catalyst',
        },
        {
          vi: 'Nhận electron và bị khử',
          en: 'Accepts electrons and is reduced',
        },
        {
          vi: 'Cho electron và bị oxi hoá',
          en: 'Donates electrons and is oxidised',
        },
        {
          vi: 'Luôn là khí O₂',
          en: 'Is always O₂ gas',
        },
      ],
      answer: 1,
    },
    {
      id: 'redox-005',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá của O trong O₂ là bao nhiêu?',
        en: 'What is oxygen’s oxidation state in O₂?',
      },
      explain: {
        vi: 'Trong đơn chất, số oxi hoá bằng 0. Không áp dụng quy tắc O thường −2 của hợp chất cho O₂.',
        en: 'An element in its elemental form has oxidation state zero. The common −2 rule for compounds does not apply to O₂.',
      },
      elements: ['O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '0',
          en: '0',
        },
        {
          vi: '−2',
          en: '−2',
        },
        {
          vi: '+2',
          en: '+2',
        },
        {
          vi: '−1',
          en: '−1',
        },
      ],
      answer: 0,
    },
    {
      id: 'redox-006',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá của O trong H₂O là bao nhiêu?',
        en: 'What is oxygen’s oxidation state in H₂O?',
      },
      explain: {
        vi: 'Hai H có tổng +2, nên O là −2 để tổng của phân tử trung hoà bằng 0.',
        en: 'The two H atoms total +2, so O must be −2 for a neutral molecule.',
      },
      elements: ['H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '0',
          en: '0',
        },
        {
          vi: '−1',
          en: '−1',
        },
        {
          vi: '+2',
          en: '+2',
        },
        {
          vi: '−2',
          en: '−2',
        },
      ],
      answer: 3,
    },
    {
      id: 'redox-007',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá của H trong hiđrua kim loại NaH là bao nhiêu?',
        en: 'What is hydrogen’s oxidation state in the metal hydride NaH?',
      },
      explain: {
        vi: 'Na là +1 nên H là −1. H không luôn mang số oxi hoá +1 trong mọi hợp chất.',
        en: 'Na is +1, requiring H to be −1. Hydrogen is not +1 in every compound.',
      },
      elements: ['Na', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '0',
          en: '0',
        },
        {
          vi: '+2',
          en: '+2',
        },
        {
          vi: '−1',
          en: '−1',
        },
        {
          vi: '+1',
          en: '+1',
        },
      ],
      answer: 2,
    },
    {
      id: 'redox-008',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Tổng số oxi hoá trong một ion đa nguyên tử bằng gì?',
        en: 'What does the oxidation-state sum equal in a polyatomic ion?',
      },
      explain: {
        vi: 'Tổng bằng điện tích ion, giữ nguyên dấu. Chỉ phân tử trung hoà mới có tổng 0; cần cộng phần đóng góp của mọi nguyên tử, không chọn nguyên tố có nhiều nhất.',
        en: 'The sum equals the ion charge with its sign. Zero applies to neutral molecules; every atom contributes rather than only the most numerous element.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Luôn bằng 0 như phân tử trung hoà',
          en: 'Always zero as in a neutral molecule',
        },
        {
          vi: 'Điện tích của ion',
          en: 'The ion’s charge',
        },
        {
          vi: 'Điện tích của ion nhưng đổi dấu',
          en: 'The opposite of the ion charge',
        },
        {
          vi: 'Số oxi hoá của nguyên tử có nhiều nhất',
          en: 'The oxidation state of the most abundant atom',
        },
      ],
      answer: 1,
    },
    {
      id: 'redox-009',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Fe chuyển từ số oxi hoá 0 lên +3 thì đã làm gì?',
        en: 'What happens when Fe changes from oxidation state 0 to +3?',
      },
      explain: {
        vi: 'Tăng từ 0 lên +3 ứng với nhường ba electron. Nhận electron làm số oxi hoá giảm, còn nhường một chỉ đưa Fe từ 0 lên +1 trong cách ghi sổ này.',
        en: 'A rise from zero to +3 corresponds to losing three electrons. Gain lowers oxidation state, while losing one would raise it only to +1 in this accounting.',
      },
      elements: ['Fe'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nhường 3 electron',
          en: 'Loses three electrons',
        },
        {
          vi: 'Nhận 3 electron',
          en: 'Gained three electrons',
        },
        {
          vi: 'Nhường 1 electron',
          en: 'Lost one electron',
        },
        {
          vi: 'Nhận 1 electron',
          en: 'Gained one electron',
        },
      ],
      answer: 0,
    },
    {
      id: 'redox-010',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Trong Fe + CuSO4 -> FeSO4 + Cu, chất khử là gì?',
        en: 'In Fe + CuSO4 -> FeSO4 + Cu, what is the reducing agent?',
      },
      explain: {
        vi: 'Fe từ 0 lên +2 nên nhường electron. Cu²⁺ nhận electron thành Cu, còn sulfate không đổi số oxi hoá.',
        en: 'Fe goes from 0 to +2 and donates electrons. Cu²⁺ accepts them; sulfate keeps its oxidation states.',
      },
      elements: ['Fe', 'Cu', 'S', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['Fe + CuSO4 -> FeSO4 + Cu'],
      type: 'single',
      options: [
        {
          vi: 'Cu²⁺ trong CuSO₄',
          en: 'Cu²⁺ in CuSO₄',
        },
        {
          vi: 'SO₄²⁻',
          en: 'SO₄²⁻',
        },
        {
          vi: 'Cu tạo thành',
          en: 'The Cu product',
        },
        {
          vi: 'Fe',
          en: 'Fe',
        },
      ],
      answer: 3,
    },
    {
      id: 'redox-011',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Trong H2 + Cl2 -> HCl, chất oxi hoá là gì?',
        en: 'In H2 + Cl2 -> HCl, which reactant is the oxidant?',
      },
      explain: {
        vi: 'Cl từ 0 xuống −1 nên nhận electron; H từ 0 lên +1 nên bị oxi hoá.',
        en: 'Cl changes from 0 to −1 and gains electrons; H changes from 0 to +1 and is oxidised.',
      },
      elements: ['H', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['H2 + Cl2 -> HCl'],
      type: 'single',
      options: [
        {
          vi: 'HCl',
          en: 'HCl',
        },
        {
          vi: 'Cả H₂ và Cl₂ đều chỉ là chất khử',
          en: 'Both H₂ and Cl₂ are only reductants',
        },
        {
          vi: 'Cl₂',
          en: 'Cl₂',
        },
        {
          vi: 'H₂',
          en: 'H₂',
        },
      ],
      answer: 2,
    },
    {
      id: 'redox-012',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Số oxi hoá của Mn trong KMnO₄ là bao nhiêu?',
        en: 'What is Mn’s oxidation state in KMnO₄?',
      },
      explain: {
        vi: 'K là +1 và bốn O có tổng −8, nên Mn phải là +7.',
        en: 'K contributes +1 and four O atoms −8, requiring Mn to be +7.',
      },
      elements: ['K', 'Mn', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '−7',
          en: '−7',
        },
        {
          vi: '+7',
          en: '+7',
        },
        {
          vi: '+4',
          en: '+4',
        },
        {
          vi: '+2',
          en: '+2',
        },
      ],
      answer: 1,
    },
    {
      id: 'redox-013',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Số oxi hoá của O trong peoxit H₂O₂ là bao nhiêu?',
        en: 'What is oxygen’s oxidation state in peroxide H₂O₂?',
      },
      explain: {
        vi: 'Hai H có tổng +2; hai O phải có tổng −2 nên mỗi O là −1. Đây là ngoại lệ peoxit.',
        en: 'Two H atoms total +2, so two O atoms total −2: each O is −1, the peroxide exception.',
      },
      elements: ['H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '−1',
          en: '−1',
        },
        {
          vi: '−2',
          en: '−2',
        },
        {
          vi: '0',
          en: '0',
        },
        {
          vi: '+1',
          en: '+1',
        },
      ],
      answer: 0,
    },
    {
      id: 'redox-014',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Phản ứng HCl + NaOH -> NaCl + H2O có phải oxi hoá – khử không?',
        en: 'Is HCl + NaOH -> NaCl + H2O a redox reaction?',
      },
      explain: {
        vi: 'Đây là phản ứng trung hoà; sự có mặt của axit hoặc nước không đủ để kết luận có trao đổi electron.',
        en: 'This is neutralisation. The presence of acid or water does not establish electron transfer.',
      },
      elements: ['H', 'Cl', 'Na', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['HCl + NaOH -> NaCl + H2O'],
      type: 'single',
      options: [
        {
          vi: 'Có, vì có axit',
          en: 'Yes, because acid is present',
        },
        {
          vi: 'Có, vì có nước tạo thành',
          en: 'Yes, because water forms',
        },
        {
          vi: 'Có, vì Na luôn nhường electron trong mọi hợp chất',
          en: 'Yes, because Na always donates electrons in every compound',
        },
        {
          vi: 'Không, không có số oxi hoá thay đổi',
          en: 'No, no oxidation states change',
        },
      ],
      answer: 3,
    },
    {
      id: 'redox-015',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Chọn các phát biểu đúng về phản ứng oxi hoá – khử.',
        en: 'Select the correct redox statements.',
      },
      explain: {
        vi: 'Electron được bảo toàn và oxi hoá làm tăng số oxi hoá. Kết tủa hay sự có mặt của O không tự quyết định loại phản ứng.',
        en: 'Electron balance holds and oxidation increases oxidation state. Precipitation or oxygen content alone does not classify a reaction.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'Số electron cho bằng số electron nhận',
          en: 'Electrons lost equal electrons gained',
        },
        {
          vi: 'Chất oxi hoá luôn chứa O',
          en: 'Oxidants always contain O',
        },
        {
          vi: 'Số oxi hoá tăng khi bị oxi hoá',
          en: 'Oxidation increases oxidation state',
        },
        {
          vi: 'Mọi phản ứng tạo kết tủa đều là oxi hoá – khử',
          en: 'Every precipitation is redox',
        },
      ],
      answer: [0, 2],
    },
    {
      id: 'redox-016',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Khi cân bằng Al + O2 -> Al2O3 với hệ số nguyên tối giản, hệ số của Al là bao nhiêu?',
        en: 'When Al + O2 -> Al2O3 is balanced in smallest whole numbers, what is Al’s coefficient?',
      },
      explain: {
        vi: 'Phương trình cân bằng có hệ số 4 : 3 : 2, bảo toàn cả Al và O.',
        en: 'The balanced ratio is 4 : 3 : 2, conserving both Al and O.',
      },
      elements: ['Al', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['Al + O2 -> Al2O3'],
      type: 'number',
      answer: 4,
      tolerance: 0,
      calculation: {
        kind: 'coefficient',
        equation: 'Al + O2 -> Al2O3',
        species: 0,
      },
    },
    {
      id: 'redox-017',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Cân bằng MnO4^- + Fe^2+ + H^+ -> Mn^2+ + Fe^3+ + H2O trong axit. Hệ số H⁺ tối giản là bao nhiêu?',
        en: 'Balance MnO4^- + Fe^2+ + H^+ -> Mn^2+ + Fe^3+ + H2O in acid. What is the smallest H⁺ coefficient?',
      },
      explain: {
        vi: 'Bốn O tạo bốn H₂O, cần 8 H⁺. Năm Fe²⁺ cung cấp 5 electron cho Mn từ +7 xuống +2.',
        en: 'Four O atoms form four H₂O, requiring 8 H⁺. Five Fe²⁺ supply the five electrons for Mn(+7) to Mn(+2).',
      },
      elements: ['Mn', 'O', 'Fe', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['MnO4^- + Fe^2+ + H^+ -> Mn^2+ + Fe^3+ + H2O'],
      type: 'number',
      answer: 8,
      tolerance: 0,
      calculation: {
        kind: 'coefficient',
        equation: 'MnO4^- + Fe^2+ + H^+ -> Mn^2+ + Fe^3+ + H2O',
        species: 2,
      },
    },
    {
      id: 'redox-018',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Trong H2O2 -> H2O + O2, H₂O₂ có vai trò nào?',
        en: 'In H2O2 -> H2O + O2, what role does H₂O₂ play?',
      },
      explain: {
        vi: 'O từ −1 vừa xuống −2 trong nước vừa lên 0 trong O₂; cùng chất có hai vai trò.',
        en: 'O changes from −1 to −2 in water and to 0 in O₂, so the substance has both roles.',
      },
      elements: ['H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['H2O2 -> H2O + O2'],
      type: 'single',
      options: [
        {
          vi: 'Chỉ chất khử',
          en: 'Only reductant',
        },
        {
          vi: 'Chỉ chất oxi hoá',
          en: 'Only oxidant',
        },
        {
          vi: 'Không có vai trò oxi hoá – khử',
          en: 'No redox role',
        },
        {
          vi: 'Vừa chất oxi hoá vừa chất khử',
          en: 'Both oxidant and reductant',
        },
      ],
      answer: 3,
    },
    {
      id: 'redox-019',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Trong Cl2 + NaOH -> NaCl + NaClO + H2O (lạnh), số oxi hoá của Cl thay đổi thế nào?',
        en: 'In Cl2 + NaOH -> NaCl + NaClO + H2O under cold conditions, how does Cl’s oxidation state change?',
      },
      explain: {
        vi: 'Cl trong NaCl là −1, trong NaClO là +1. Đây là phản ứng tự oxi hoá – khử.',
        en: 'Cl is −1 in NaCl and +1 in NaClO, a disproportionation reaction.',
      },
      elements: ['Cl', 'Na', 'O', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['Cl2 + NaOH -> NaCl + NaClO + H2O'],
      type: 'single',
      options: [
        {
          vi: 'Chỉ từ 0 thành −1',
          en: 'Only from 0 to −1',
        },
        {
          vi: 'Không đổi trong cả hai muối',
          en: 'Unchanged in both salts',
        },
        {
          vi: 'Từ 0 thành −1 và +1',
          en: 'From 0 to −1 and +1',
        },
        {
          vi: 'Từ −1 thành 0 và +1',
          en: 'From −1 to 0 and +1',
        },
      ],
      answer: 2,
    },
    {
      id: 'redox-020',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Cho 0,10 mol Fe và 0,15 mol CuSO₄ phản ứng hoàn toàn theo Fe + CuSO4 -> FeSO4 + Cu. Tạo bao nhiêu mol Cu?',
        en: 'Allow 0.10 mol Fe and 0.15 mol CuSO₄ to react completely by Fe + CuSO4 -> FeSO4 + Cu. How many moles of Cu form?',
      },
      explain: {
        vi: 'Tỉ lệ mol là 1 : 1. Fe hết trước nên tạo 0,10 mol Cu; không dùng lượng CuSO₄ ban đầu làm lượng Cu.',
        en: 'The ratio is 1 : 1. Iron limits the reaction, producing 0.10 mol Cu rather than 0.15 mol.',
      },
      elements: ['Fe', 'Cu', 'S', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['Fe + CuSO4 -> FeSO4 + Cu'],
      type: 'number',
      answer: 0.1,
      tolerance: 1e-9,
      calculation: {
        kind: 'stoichiometry',
        equation: 'Fe + CuSO4 -> FeSO4 + Cu',
        givenMol: [0.1, 0.15],
        species: 3,
      },
      unit: 'mol',
    },
  ],
});

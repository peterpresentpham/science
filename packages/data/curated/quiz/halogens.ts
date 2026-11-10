import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'halogens',
  title: {
    vi: 'Nhóm halogen',
    en: 'The halogens',
  },
  questions: [
    {
      id: 'halogens-001',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Các halogen thuộc nhóm nào theo cách đánh số 1–18?',
        en: 'Which group contains the halogens in the 1–18 numbering system?',
      },
      explain: {
        vi: 'Halogen thuộc nhóm 17; nhóm 18 là khí hiếm. Số 7 nhắc số electron hoá trị của các halogen quen thuộc.',
        en: 'Halogens are in group 17; group 18 contains noble gases. Seven refers to their usual valence-electron count.',
      },
      elements: ['F', 'Cl', 'Br', 'I'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '17',
          en: '17',
        },
        {
          vi: '7',
          en: '7',
        },
        {
          vi: '18',
          en: '18',
        },
        {
          vi: '16',
          en: '16',
        },
      ],
      answer: 0,
    },
    {
      id: 'halogens-002',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Nguyên tử halogen quen thuộc có bao nhiêu electron lớp ngoài cùng?',
        en: 'How many outer-shell electrons do the familiar halogens have?',
      },
      explain: {
        vi: 'Các nguyên tố này có cấu hình lớp ngoài cùng ns²np⁵, tổng cộng 7 electron.',
        en: 'Their outer configuration ns²np⁵ contains seven electrons.',
      },
      elements: ['F', 'Cl', 'Br', 'I'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '1',
          en: '1',
        },
        {
          vi: '8',
          en: '8',
        },
        {
          vi: '17',
          en: '17',
        },
        {
          vi: '7',
          en: '7',
        },
      ],
      answer: 3,
    },
    {
      id: 'halogens-003',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Dạng đơn chất thông thường của clo có công thức nào?',
        en: 'What is the usual elemental formula of chlorine?',
      },
      explain: {
        vi: 'Đơn chất là phân tử hai nguyên tử Cl₂. Cl⁻ là ion clorua; Cl₂O là hợp chất.',
        en: 'Elemental chlorine is diatomic Cl₂. Cl⁻ is chloride and Cl₂O is a compound.',
      },
      elements: ['Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cl⁻',
          en: 'Cl⁻',
        },
        {
          vi: 'Cl₂O',
          en: 'Cl₂O',
        },
        {
          vi: 'Cl₂',
          en: 'Cl₂',
        },
        {
          vi: 'Cl',
          en: 'Cl',
        },
      ],
      answer: 2,
    },
    {
      id: 'halogens-004',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Trong F₂, Cl₂, Br₂, I₂, nguyên tố nào có đơn chất lỏng ở nhiệt độ phòng?',
        en: 'Among F₂, Cl₂, Br₂ and I₂, which element is liquid at room temperature?',
      },
      explain: {
        vi: 'Brom là chất lỏng; flo và clo là khí, iot là chất rắn ở điều kiện phòng thông thường.',
        en: 'Bromine is liquid, fluorine and chlorine are gases, and iodine is solid under ordinary room conditions.',
      },
      elements: ['F', 'Cl', 'Br', 'I'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'element',
      answer: 'Br',
    },
    {
      id: 'halogens-005',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Ion halide thông thường có điện tích nào?',
        en: 'What charge do ordinary halide ions have?',
      },
      explain: {
        vi: 'Nguyên tử halogen nhận một electron tạo ion X⁻. Không nhầm với số oxi hoá 0 của đơn chất X₂.',
        en: 'A halogen atom gains one electron to form X⁻, unlike elemental X₂, where the oxidation state is zero.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '−1',
          en: '−1',
        },
        {
          vi: '+1',
          en: '+1',
        },
        {
          vi: '−2',
          en: '−2',
        },
        {
          vi: '0',
          en: '0',
        },
      ],
      answer: 0,
    },
    {
      id: 'halogens-006',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Trong F₂, Cl₂, Br₂, I₂, chất oxi hoá mạnh nhất là chất nào?',
        en: 'Which is the strongest oxidant among F₂, Cl₂, Br₂ and I₂?',
      },
      explain: {
        vi: 'Khả năng oxi hoá của đơn chất halogen giảm nhìn chung từ F₂ xuống I₂.',
        en: 'The oxidising ability of the elemental halogens generally decreases from F₂ to I₂.',
      },
      elements: ['F', 'Cl', 'Br', 'I'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cl₂',
          en: 'Cl₂',
        },
        {
          vi: 'Br₂',
          en: 'Br₂',
        },
        {
          vi: 'I₂',
          en: 'I₂',
        },
        {
          vi: 'F₂',
          en: 'F₂',
        },
      ],
      answer: 3,
    },
    {
      id: 'halogens-007',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá của flo trong các hợp chất thông thường là bao nhiêu?',
        en: 'What is fluorine’s oxidation state in ordinary compounds?',
      },
      explain: {
        vi: 'Flo có độ âm điện lớn nhất nên trong hợp chất thường mang số oxi hoá −1. Giá trị 0 áp dụng cho F₂.',
        en: 'Fluorine’s very high electronegativity gives it oxidation state −1 in compounds; zero applies to F₂.',
      },
      elements: ['F'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '0',
          en: '0',
        },
        {
          vi: '+7',
          en: '+7',
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
      id: 'halogens-008',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Muối nào tạo kết tủa trắng AgCl với ion Ag⁺?',
        en: 'Which salt supplies ions that form white AgCl with Ag⁺?',
      },
      explain: {
        vi: 'Cl⁻ tạo AgCl trắng; fluoride không tạo kết tủa AgF trong phép thử thông thường. Không dùng màu của muối ban đầu để đoán.',
        en: 'Chloride forms white AgCl; fluoride does not precipitate as AgF in this usual test. The original salt’s colour is not the criterion.',
      },
      elements: ['Na', 'Cl', 'Ag', 'F'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Na₂SO₄',
          en: 'Na₂SO₄',
        },
        {
          vi: 'NaCl',
          en: 'NaCl',
        },
        {
          vi: 'NaF',
          en: 'NaF',
        },
        {
          vi: 'NaNO₃',
          en: 'NaNO₃',
        },
      ],
      answer: 1,
    },
    {
      id: 'halogens-009',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Cl₂ được dẫn vào dung dịch NaBr theo Cl2 + NaBr -> NaCl + Br2. Điều gì xảy ra?',
        en: 'For Cl2 + NaBr -> NaCl + Br2 in solution, what occurs?',
      },
      explain: {
        vi: 'Br⁻ từ −1 lên 0 nên bị oxi hoá thành Br₂; Cl₂ từ 0 xuống −1 nên bị khử. Phản ứng thế này vẫn là oxi hoá – khử, không phải đi theo chiều ngược đã nêu.',
        en: 'Br⁻ rises from −1 to zero and is oxidised; Cl₂ falls from zero to −1 and is reduced. Displacement here is still redox, not the reverse process.',
      },
      elements: ['Cl', 'Na', 'Br'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['Cl2 + NaBr -> NaCl + Br2'],
      type: 'single',
      options: [
        {
          vi: 'Br⁻ bị oxi hoá thành Br₂',
          en: 'Br⁻ is oxidised to Br₂',
        },
        {
          vi: 'Br₂ bị khử thành Br⁻',
          en: 'Br₂ is reduced to Br⁻',
        },
        {
          vi: 'Cl₂ bị oxi hoá thành Cl⁻',
          en: 'Cl₂ is oxidised to Cl⁻',
        },
        {
          vi: 'Không có số oxi hoá thay đổi vì chỉ là phản ứng thế',
          en: 'Oxidation states do not change because it is a displacement',
        },
      ],
      answer: 0,
    },
    {
      id: 'halogens-010',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Vì sao Br₂ không đẩy được Cl₂ khỏi dung dịch NaCl theo phản ứng thế halogen thông thường?',
        en: 'Why does Br₂ not displace Cl₂ from NaCl solution in the usual halogen displacement model?',
      },
      explain: {
        vi: 'Cl₂ có tính oxi hoá mạnh hơn Br₂ nên chiều thế thông thường là Cl₂ oxi hoá Br⁻, không phải ngược lại. Cùng nhóm không có nghĩa bằng nhau, và không dùng khối lượng phân tử thay cho xu hướng oxi hoá.',
        en: 'Cl₂ is the stronger oxidant, so it oxidises Br⁻ rather than the reverse displacement. A common group does not mean equal strength, and molecular mass is not a substitute for the trend.',
      },
      elements: ['Br', 'Cl', 'Na'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Br₂ là chất oxi hoá mạnh hơn Cl₂',
          en: 'Br₂ is a stronger oxidant than Cl₂',
        },
        {
          vi: 'Br₂ và Cl₂ có tính oxi hoá bằng nhau vì cùng nhóm',
          en: 'Their oxidising powers are equal because they share a group',
        },
        {
          vi: 'Khối lượng phân tử lớn hơn luôn làm tính oxi hoá mạnh hơn',
          en: 'Higher molecular mass always means stronger oxidation',
        },
        {
          vi: 'Br₂ có tính oxi hoá yếu hơn Cl₂',
          en: 'Br₂ is a weaker oxidant than Cl₂',
        },
      ],
      answer: 3,
    },
    {
      id: 'halogens-011',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'So với HCl trong nước, HF được phân loại thế nào về tính axit?',
        en: 'How is HF classified as an aqueous acid compared with HCl?',
      },
      explain: {
        vi: 'HF là axit yếu, vẫn phân li một phần; HCl là axit mạnh trong nước. Độ mạnh axit không suy ra chỉ từ độ âm điện hay chỉ từ sự có mặt của H.',
        en: 'HF is weak and ionises partially; HCl is strong in water. Electronegativity alone, or merely containing hydrogen, does not determine acid strength.',
      },
      elements: ['H', 'F', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'HF mạnh hơn vì F có độ âm điện lớn hơn',
          en: 'HF is stronger because F is more electronegative',
        },
        {
          vi: 'Cả hai đều là axit mạnh vì đều chứa H',
          en: 'Both are strong acids because both contain H',
        },
        {
          vi: 'HF là axit yếu, HCl là axit mạnh',
          en: 'HF is weak and HCl is strong',
        },
        {
          vi: 'HF không phân li một phần nào trong nước',
          en: 'HF does not ionise at all in water',
        },
      ],
      answer: 2,
    },
    {
      id: 'halogens-012',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Kết tủa AgI trong phép thử halide có màu nào?',
        en: 'What colour is AgI in the halide test?',
      },
      explain: {
        vi: 'AgI vàng; AgCl trắng và AgBr vàng nhạt. Màu khí halogen không phải màu kết tủa muối bạc.',
        en: 'AgI is yellow, AgCl white and AgBr pale cream. Halogen vapour colour is not the silver-halide precipitate colour.',
      },
      elements: ['Ag', 'I'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Xanh lam',
          en: 'Blue',
        },
        {
          vi: 'Vàng',
          en: 'Yellow',
        },
        {
          vi: 'Trắng',
          en: 'White',
        },
        {
          vi: 'Đỏ nâu',
          en: 'Reddish brown',
        },
      ],
      answer: 1,
    },
    {
      id: 'halogens-013',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Nhiệt độ sôi của Cl₂, Br₂, I₂ nhìn chung tăng theo chiều nào?',
        en: 'In which direction do boiling points generally increase for Cl₂, Br₂ and I₂?',
      },
      explain: {
        vi: 'Từ Cl₂ đến I₂, tương tác phân tán giữa các phân tử nhìn chung tăng nên nhiệt độ sôi tăng. Cùng nhóm không có nghĩa bằng nhau; thứ tự đảo hoặc đổi chỗ Br₂ và Cl₂ không phù hợp xu hướng.',
        en: 'Dispersion interactions generally strengthen from Cl₂ to I₂, raising boiling points. Sharing a group does not equalise them; the reversed or swapped orders do not match the trend.',
      },
      elements: ['Cl', 'Br', 'I'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cl₂ → Br₂ → I₂',
          en: 'Cl₂ → Br₂ → I₂',
        },
        {
          vi: 'I₂ → Br₂ → Cl₂',
          en: 'I₂ → Br₂ → Cl₂',
        },
        {
          vi: 'Cả ba bằng nhau vì cùng nhóm',
          en: 'All equal because they share a group',
        },
        {
          vi: 'Br₂ → Cl₂ → I₂',
          en: 'Br₂ → Cl₂ → I₂',
        },
      ],
      answer: 0,
    },
    {
      id: 'halogens-014',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Trong NaClO, số oxi hoá của Cl là bao nhiêu?',
        en: 'What is Cl’s oxidation state in NaClO?',
      },
      explain: {
        vi: 'Na là +1 và O là −2 nên Cl phải là +1. Không gán −1 cho mọi hợp chất chứa clo.',
        en: 'Na is +1 and O −2, requiring Cl to be +1. Chlorine is not −1 in every compound.',
      },
      elements: ['Na', 'Cl', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '−1',
          en: '−1',
        },
        {
          vi: '0',
          en: '0',
        },
        {
          vi: '+5',
          en: '+5',
        },
        {
          vi: '+1',
          en: '+1',
        },
      ],
      answer: 3,
    },
    {
      id: 'halogens-015',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Vì sao không dùng F₂ để minh hoạ đơn giản việc đẩy Cl₂ khỏi dung dịch muối ăn?',
        en: 'Why is F₂ unsuitable for a simple demonstration of displacing Cl₂ from aqueous salt?',
      },
      explain: {
        vi: 'F₂ phản ứng mạnh với nước, nên không thể bỏ qua dung môi để dùng mô hình thế đơn giản. Nó là chất oxi hoá mạnh; tạo F⁻ từ F₂ cũng là quá trình khử, không phải không có redox.',
        en: 'F₂ reacts vigorously with water, so the solvent cannot be ignored in a simple displacement model. It is a strong oxidant, and conversion from F₂ to F⁻ is reduction.',
      },
      elements: ['F', 'Cl', 'H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'F₂ yếu hơn Cl₂ nên không oxi hoá được Cl⁻',
          en: 'F₂ is weaker than Cl₂ and cannot oxidise Cl⁻',
        },
        {
          vi: 'F₂ không tan nên không phản ứng được với nước',
          en: 'F₂ is insoluble and cannot react with water',
        },
        {
          vi: 'F₂ phản ứng mạnh với nước',
          en: 'F₂ reacts strongly with water',
        },
        {
          vi: 'F₂ luôn chỉ tạo F⁻ mà không có phản ứng oxi hoá – khử',
          en: 'F₂ forms F⁻ without any redox change',
        },
      ],
      answer: 2,
    },
    {
      id: 'halogens-016',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Chọn các mô tả đúng về halogen và halide.',
        en: 'Select the correct descriptions of halogens and halides.',
      },
      explain: {
        vi: 'Phân biệt đơn chất X₂ với ion X⁻. Hai nhận định về phản ứng thế và AgCl đúng; hai nhận định còn lại nhầm tiểu phân hoặc số oxi hoá.',
        en: 'Distinguish X₂ from X⁻. The displacement and AgCl statements are correct; the others confuse species or oxidation states.',
      },
      elements: ['Cl', 'Br', 'I', 'Ag', 'F'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'Cl₂ có thể oxi hoá Br⁻',
          en: 'Cl₂ can oxidise Br⁻',
        },
        {
          vi: 'I⁻ và I₂ là cùng một tiểu phân',
          en: 'I⁻ and I₂ are the same species',
        },
        {
          vi: 'AgCl là kết tủa trắng trong phép thử thông thường',
          en: 'AgCl is a white precipitate in the usual test',
        },
        {
          vi: 'Flo luôn có số oxi hoá +1 trong hợp chất',
          en: 'Fluorine is always +1 in compounds',
        },
      ],
      answer: [0, 2],
    },
    {
      id: 'halogens-017',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'X thuộc nhóm 17, chu kì 4; đơn chất là chất lỏng nâu đỏ. X là gì?',
        en: 'X is in group 17, period 4; its element is a reddish-brown liquid. What is X?',
      },
      explain: {
        vi: 'Vị trí nhóm 17, chu kì 4 xác định brom; trạng thái và màu củng cố kết luận.',
        en: 'Group 17 and period 4 identify bromine; its state and colour support the conclusion.',
      },
      elements: ['Br'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'element',
      answer: 'Br',
    },
    {
      id: 'halogens-018',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Cân bằng Cl2 + KI -> KCl + I2. Hệ số nguyên tối giản của KI là bao nhiêu?',
        en: 'Balance Cl2 + KI -> KCl + I2. What is KI’s smallest whole-number coefficient?',
      },
      explain: {
        vi: 'Cần hai I⁻ để tạo I₂ và hai KCl để bảo toàn K, nên tỉ lệ 1 : 2 : 2 : 1.',
        en: 'Two I⁻ form I₂ and two KCl conserve K, giving 1 : 2 : 2 : 1.',
      },
      elements: ['Cl', 'K', 'I'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['Cl2 + KI -> KCl + I2'],
      type: 'number',
      answer: 2,
      tolerance: 0,
      calculation: {
        kind: 'coefficient',
        equation: 'Cl2 + KI -> KCl + I2',
        species: 1,
      },
    },
    {
      id: 'halogens-019',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Giả sử 0,10 mol Cl₂ phản ứng hoàn toàn với 0,15 mol NaBr theo Cl2 + NaBr -> NaCl + Br2. Tạo bao nhiêu mol Br₂?',
        en: 'Assume 0.10 mol Cl₂ reacts with 0.15 mol NaBr by Cl2 + NaBr -> NaCl + Br2. How many moles of Br₂ form?',
      },
      explain: {
        vi: 'Phương trình có tỉ lệ Cl₂ : NaBr : Br₂ = 1 : 2 : 1. NaBr giới hạn, nên tạo 0,15/2 = 0,075 mol Br₂.',
        en: 'The ratio Cl₂ : NaBr : Br₂ is 1 : 2 : 1. NaBr limits the yield to 0.15/2 = 0.075 mol Br₂.',
      },
      elements: ['Cl', 'Na', 'Br'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: ['Cl2 + NaBr -> NaCl + Br2'],
      type: 'number',
      answer: 0.075,
      tolerance: 1e-9,
      calculation: {
        kind: 'stoichiometry',
        equation: 'Cl2 + NaBr -> NaCl + Br2',
        givenMol: [0.1, 0.15],
        species: 3,
      },
      unit: 'mol',
    },
    {
      id: 'halogens-020',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Trong phép thử Cl⁻ bằng AgNO₃, vì sao tránh axit hoá mẫu bằng HCl?',
        en: 'Why should HCl not be used to acidify a sample for a chloride test with AgNO₃?',
      },
      explain: {
        vi: 'HCl đưa thêm Cl⁻ nên có thể tạo kết tủa từ thuốc thử chứ không từ mẫu ban đầu. Không phải mọi axit đều chứa chloride; AgCl vẫn kết tủa trong môi trường axit phù hợp và HCl không đóng vai trò như NH₃.',
        en: 'HCl introduces chloride and can create a reagent-derived precipitate. Not all acids contain chloride; AgCl forms in suitable acidic media, and HCl does not act like ammonia.',
      },
      elements: ['H', 'Cl', 'Ag', 'N', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'HCl làm AgCl tan hoàn toàn như NH₃',
          en: 'HCl dissolves AgCl completely like NH₃',
        },
        {
          vi: 'HCl đưa thêm Cl⁻ vào mẫu',
          en: 'It introduces extra Cl⁻',
        },
        {
          vi: 'Axit nào cũng đưa thêm Cl⁻ vào mẫu',
          en: 'Every acid adds Cl⁻ to the sample',
        },
        {
          vi: 'AgNO₃ chỉ kết tủa khi môi trường trung tính',
          en: 'AgNO₃ precipitates only at neutral pH',
        },
      ],
      answer: 1,
    },
  ],
});

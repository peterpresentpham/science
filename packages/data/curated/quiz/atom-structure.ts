import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'atom-structure',
  title: {
    vi: 'Cấu tạo nguyên tử',
    en: 'Atomic structure',
  },
  questions: [
    {
      id: 'atom-structure-001',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Hạt nào mang điện tích dương trong nguyên tử?',
        en: 'Which atomic particle has a positive charge?',
      },
      explain: {
        vi: 'Proton mang điện dương; electron mang điện âm, còn neutron không mang điện.',
        en: 'Protons are positive, electrons negative and neutrons uncharged.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Proton',
          en: 'Proton',
        },
        {
          vi: 'Neutron',
          en: 'Neutron',
        },
        {
          vi: 'Electron',
          en: 'Electron',
        },
        {
          vi: 'Cả electron và neutron',
          en: 'Both electrons and neutrons',
        },
      ],
      answer: 0,
    },
    {
      id: 'atom-structure-002',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Hạt nhân của một nguyên tử thông thường gồm những hạt nào?',
        en: 'Which particles make up an ordinary atomic nucleus?',
      },
      explain: {
        vi: 'Electron thuộc lớp vỏ; hạt nhân gồm proton và neutron. Hạt nhân hiđro-1 là trường hợp không có neutron.',
        en: 'Electrons belong to the electron cloud. Nuclei contain protons and neutrons, except hydrogen-1, which has no neutron.',
      },
      elements: ['H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Proton và electron',
          en: 'Protons and electrons',
        },
        {
          vi: 'Electron và neutron',
          en: 'Electrons and neutrons',
        },
        {
          vi: 'Chỉ electron',
          en: 'Electrons only',
        },
        {
          vi: 'Proton và neutron',
          en: 'Protons and neutrons',
        },
      ],
      answer: 3,
    },
    {
      id: 'atom-structure-003',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Số khối A được tính như thế nào?',
        en: 'How is the mass number A calculated?',
      },
      explain: {
        vi: 'A đếm nucleon của một đồng vị cụ thể. Nó không phải khối lượng nguyên tử trung bình của hỗn hợp đồng vị.',
        en: 'A counts nucleons in a particular isotope, rather than the average atomic weight of an isotope mixture.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Số neutron − số proton',
          en: 'Neutrons − protons',
        },
        {
          vi: 'Khối lượng nguyên tử làm tròn trong mọi trường hợp',
          en: 'Always the rounded atomic weight',
        },
        {
          vi: 'Số proton + số neutron',
          en: 'Protons + neutrons',
        },
        {
          vi: 'Số proton + số electron',
          en: 'Protons + electrons',
        },
      ],
      answer: 2,
    },
    {
      id: 'atom-structure-004',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Đại lượng nào xác định một nguyên tố hoá học?',
        en: 'Which quantity determines an element’s identity?',
      },
      explain: {
        vi: 'Các nguyên tử cùng nguyên tố có cùng số proton, dù khác neutron hay điện tích ion.',
        en: 'Atoms of one element share a proton number, even if neutron counts or ionic charges differ.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Số electron của ion',
          en: 'An ion’s electron number',
        },
        {
          vi: 'Số proton',
          en: 'Proton number',
        },
        {
          vi: 'Số neutron',
          en: 'Neutron number',
        },
        {
          vi: 'Số khối',
          en: 'Mass number',
        },
      ],
      answer: 1,
    },
    {
      id: 'atom-structure-005',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Hai đồng vị của cùng một nguyên tố khác nhau ở điểm nào?',
        en: 'How do two isotopes of one element differ?',
      },
      explain: {
        vi: 'Đồng vị có cùng Z nhưng khác số neutron nên khác số khối.',
        en: 'Isotopes have the same Z but different neutron counts and hence different mass numbers.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Số neutron',
          en: 'Neutron number',
        },
        {
          vi: 'Số proton',
          en: 'Proton number',
        },
        {
          vi: 'Điện tích proton',
          en: 'Proton charge',
        },
        {
          vi: 'Ký hiệu nguyên tố',
          en: 'Element symbol',
        },
      ],
      answer: 0,
    },
    {
      id: 'atom-structure-006',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Nguyên tử trung hoà có cấu hình 1s² 2s² 2p⁶ 3s¹ là nguyên tố nào?',
        en: 'Which neutral atom has configuration 1s² 2s² 2p⁶ 3s¹?',
      },
      explain: {
        vi: 'Tổng có 11 electron nên Z = 11, tức natri.',
        en: 'There are 11 electrons, so Z = 11: sodium.',
      },
      elements: ['Na'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'element',
      answer: 'Na',
    },
    {
      id: 'atom-structure-007',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Một orbital nguyên tử chứa tối đa bao nhiêu electron?',
        en: 'What is the maximum number of electrons in one atomic orbital?',
      },
      explain: {
        vi: 'Hai electron trong cùng orbital phải có spin ngược nhau. 6 và 10 là sức chứa của cả phân lớp p và d.',
        en: 'An orbital holds two opposite-spin electrons. Six and ten are capacities of whole p and d subshells.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '8',
          en: '8',
        },
        {
          vi: '10',
          en: '10',
        },
        {
          vi: '2',
          en: '2',
        },
        {
          vi: '6',
          en: '6',
        },
      ],
      answer: 2,
    },
    {
      id: 'atom-structure-008',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Neutron có điện tích như thế nào?',
        en: 'What is the charge of a neutron?',
      },
      explain: {
        vi: 'Neutron trung hoà điện; đồng vị làm thay đổi số neutron chứ không đổi điện tích của từng neutron.',
        en: 'A neutron is uncharged. Isotopes differ in neutron number, not in the charge of each neutron.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Phụ thuộc đồng vị',
          en: 'Dependent on the isotope',
        },
        {
          vi: 'Bằng 0',
          en: 'Zero',
        },
        {
          vi: 'Dương như proton',
          en: 'Positive like a proton',
        },
        {
          vi: 'Âm như electron',
          en: 'Negative like an electron',
        },
      ],
      answer: 1,
    },
    {
      id: 'atom-structure-009',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Na tạo Na⁺ bằng cách nào?',
        en: 'How does Na form Na⁺?',
      },
      explain: {
        vi: 'Ion dương hình thành khi mất electron. Đổi số proton sẽ biến thành nguyên tố khác.',
        en: 'A positive ion forms by losing electrons. Changing proton number would change the element.',
      },
      elements: ['Na'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nhường 1 electron',
          en: 'Losing one electron',
        },
        {
          vi: 'Nhận 1 electron',
          en: 'Gaining one electron',
        },
        {
          vi: 'Mất 1 proton',
          en: 'Losing one proton',
        },
        {
          vi: 'Nhận 1 neutron',
          en: 'Gaining one neutron',
        },
      ],
      answer: 0,
    },
    {
      id: 'atom-structure-010',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Nguyên tử X trung hoà có 12 proton. Ion X²⁺ có bao nhiêu electron?',
        en: 'Neutral X has 12 protons. How many electrons does X²⁺ have?',
      },
      explain: {
        vi: 'Nguyên tử trung hoà có 12 electron; mất 2 electron còn 10. Điện tích +2 không có nghĩa ion chỉ có 2 electron.',
        en: 'The neutral atom has 12 electrons and loses two, leaving ten. A +2 charge does not mean only two electrons remain.',
      },
      elements: ['Mg'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '12',
          en: '12',
        },
        {
          vi: '14',
          en: '14',
        },
        {
          vi: '2',
          en: '2',
        },
        {
          vi: '10',
          en: '10',
        },
      ],
      answer: 3,
    },
    {
      id: 'atom-structure-011',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Cấu hình lớp 2, 8, 1 có bao nhiêu lớp electron đang được chiếm?',
        en: 'How many occupied electron shells are shown by 2, 8, 1?',
      },
      explain: {
        vi: 'Có ba số ứng với ba lớp; 11 là tổng electron, không phải số lớp.',
        en: 'Three entries represent three occupied shells. Eleven is the total electron count.',
      },
      elements: ['Na'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '8',
          en: '8',
        },
        {
          vi: '11',
          en: '11',
        },
        {
          vi: '3',
          en: '3',
        },
        {
          vi: '1',
          en: '1',
        },
      ],
      answer: 2,
    },
    {
      id: 'atom-structure-012',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Đồng vị đại diện ²³Na có Z = 11. Hạt nhân có bao nhiêu neutron?',
        en: 'Representative isotope ²³Na has Z = 11. How many neutrons are in its nucleus?',
      },
      explain: {
        vi: 'N = A − Z = 23 − 11 = 12. Không cộng thêm electron vào số khối.',
        en: 'N = A − Z = 23 − 11 = 12. Electrons do not contribute to the mass number.',
      },
      elements: ['Na'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'number',
      answer: 12,
      tolerance: 0,
      calculation: {
        kind: 'nucleon-count',
        z: 11,
        field: 'neutrons',
      },
    },
    {
      id: 'atom-structure-013',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Chọn các tiểu phân có 10 electron.',
        en: 'Select the species with 10 electrons.',
      },
      explain: {
        vi: 'Na⁺ có 11 − 1 = 10; F⁻ có 9 + 1 = 10. Mg⁺ có 11 và O⁻ có 9 electron.',
        en: 'Na⁺ has 11 − 1 = 10 and F⁻ has 9 + 1 = 10. Mg⁺ has 11 electrons and O⁻ has nine.',
      },
      elements: ['Na', 'Mg', 'F', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'Na⁺',
          en: 'Na⁺',
        },
        {
          vi: 'Mg⁺',
          en: 'Mg⁺',
        },
        {
          vi: 'F⁻',
          en: 'F⁻',
        },
        {
          vi: 'O⁻',
          en: 'O⁻',
        },
      ],
      answer: [0, 2],
    },
    {
      id: 'atom-structure-014',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Vì sao khối lượng nguyên tử trung bình thường không là số nguyên?',
        en: 'Why is an average atomic weight often not an integer?',
      },
      explain: {
        vi: 'Khối lượng nguyên tử trung bình là trung bình có trọng số theo thành phần đồng vị; không cộng các số khối, không chỉ chọn đồng vị nhẹ và không bỏ qua tỉ lệ.',
        en: 'Atomic weight is an abundance-weighted mean, not a sum, the lightest mass number or an unweighted mean.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Là trung bình cộng không xét tỉ lệ đồng vị',
          en: 'It is an unweighted mean of isotope masses',
        },
        {
          vi: 'Luôn bằng số khối của đồng vị nhẹ nhất',
          en: 'It always equals the lightest isotope’s mass number',
        },
        {
          vi: 'Là tổng số khối của mọi đồng vị',
          en: 'It is the sum of all isotope mass numbers',
        },
        {
          vi: 'Là trung bình có tính tỉ lệ đồng vị',
          en: 'It is an isotope-abundance-weighted mean',
        },
      ],
      answer: 3,
    },
    {
      id: 'atom-structure-015',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Cách phân bố nào vượt sức chứa phân lớp?',
        en: 'Which occupancy exceeds a subshell’s capacity?',
      },
      explain: {
        vi: 'Phân lớp p có ba orbital, tối đa 6 electron. Các phân bố còn lại không vượt sức chứa tương ứng.',
        en: 'A p subshell has three orbitals and holds at most six electrons. The other occupancies fit their capacities.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '3s²',
          en: '3s²',
        },
        {
          vi: '3d¹⁰',
          en: '3d¹⁰',
        },
        {
          vi: '2p⁷',
          en: '2p⁷',
        },
        {
          vi: '2p⁶',
          en: '2p⁶',
        },
      ],
      answer: 2,
    },
    {
      id: 'atom-structure-016',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Hai electron 2p của cacbon ở trạng thái cơ bản được điền thế nào?',
        en: 'How are carbon’s two 2p electrons arranged in the ground state?',
      },
      explain: {
        vi: 'Theo Hund, electron chiếm orbital cùng mức năng lượng riêng rẽ với spin song song trước khi ghép đôi.',
        en: 'Hund’s rule favours separate degenerate orbitals with parallel spins before pairing.',
      },
      elements: ['C'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Hai orbital khác nhau, bắt buộc spin ngược nhau',
          en: 'Separate orbitals, necessarily opposite spins',
        },
        {
          vi: 'Hai orbital khác nhau, spin song song',
          en: 'Separate orbitals with parallel spins',
        },
        {
          vi: 'Cùng một orbital, spin song song',
          en: 'One orbital with parallel spins',
        },
        {
          vi: 'Cùng một orbital trước khi điền orbital khác',
          en: 'Paired before another orbital is occupied',
        },
      ],
      answer: 1,
    },
    {
      id: 'atom-structure-017',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Tiểu phân có 13 proton, 14 neutron và 10 electron là gì?',
        en: 'What species has 13 protons, 14 neutrons and 10 electrons?',
      },
      explain: {
        vi: 'Z = 13 cho Al; A = 13 + 14 = 27; thiếu 3 electron nên điện tích +3.',
        en: 'Z = 13 identifies Al; A = 27; three fewer electrons than protons give charge +3.',
      },
      elements: ['Al', 'Mg', 'Na'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '²⁷Al³⁺',
          en: '²⁷Al³⁺',
        },
        {
          vi: '²⁴Mg²⁺',
          en: '²⁴Mg²⁺',
        },
        {
          vi: '²⁷Al³⁻',
          en: '²⁷Al³⁻',
        },
        {
          vi: '²³Na⁺',
          en: '²³Na⁺',
        },
      ],
      answer: 0,
    },
    {
      id: 'atom-structure-018',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Giả sử clo chỉ gồm 75% ³⁵Cl và 25% ³⁷Cl theo số nguyên tử. Lấy khối lượng đồng vị bằng số khối, giá trị trung bình là bao nhiêu?',
        en: 'Assume chlorine contains 75% ³⁵Cl and 25% ³⁷Cl by atom count, with isotope masses equal to mass numbers. What is the mean?',
      },
      explain: {
        vi: 'Theo giả thiết: 35 × 0,75 + 37 × 0,25 = 35,5 u. 36 u chỉ đúng nếu hai đồng vị có tỉ lệ bằng nhau.',
        en: 'Under the stated assumptions, 35 × 0.75 + 37 × 0.25 = 35.5 u. A mean of 36 u would require equal abundances.',
      },
      elements: ['Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '36 u',
          en: '36 u',
        },
        {
          vi: '35,75 u',
          en: '35.75 u',
        },
        {
          vi: '37 u',
          en: '37 u',
        },
        {
          vi: '35,5 u',
          en: '35.5 u',
        },
      ],
      answer: 3,
    },
    {
      id: 'atom-structure-019',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'X trung hoà ở trạng thái cơ bản có lớp ngoài cùng 3s² và không có electron 3p. X là nguyên tố nào?',
        en: 'Ground-state neutral X has an outermost shell containing 3s² and no 3p electrons. Which element is X?',
      },
      explain: {
        vi: 'Cấu hình cơ bản là [Ne]3s², tương ứng Z = 12. Không nhầm với Al có thêm 3p¹.',
        en: 'The ground-state configuration is [Ne]3s², with Z = 12. Aluminium additionally has 3p¹.',
      },
      elements: ['Mg', 'Al'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'element',
      answer: 'Mg',
    },
    {
      id: 'atom-structure-020',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Al có Z = 13. Khi tạo ion Al³⁺ mà hạt nhân không đổi, ion còn bao nhiêu electron?',
        en: 'Al has Z = 13. When it forms Al³⁺ without changing its nucleus, how many electrons remain?',
      },
      explain: {
        vi: 'Al trung hoà có 13 electron. Nhường 3 electron thì còn 10, không phải 16.',
        en: 'Neutral Al has 13 electrons. Losing three leaves ten, not sixteen.',
      },
      elements: ['Al'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'number',
      answer: 10,
      tolerance: 0,
      calculation: {
        kind: 'electron-count',
        z: 13,
        charge: 3,
      },
    },
  ],
});

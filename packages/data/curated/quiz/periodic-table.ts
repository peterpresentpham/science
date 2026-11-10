import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'periodic-table',
  title: {
    vi: 'Bảng tuần hoàn và xu hướng',
    en: 'The periodic table and trends',
  },
  questions: [
    {
      id: 'periodic-table-001',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Bảng tuần hoàn hiện đại xếp nguyên tố theo đại lượng tăng dần nào?',
        en: 'What increases in the modern periodic table’s ordering?',
      },
      explain: {
        vi: 'Thứ tự hiện đại theo số proton, không theo số neutron hay bắt buộc theo khối lượng.',
        en: 'Modern ordering follows proton number, not neutron count or an invariably increasing atomic weight.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Số hiệu nguyên tử Z',
          en: 'Atomic number Z',
        },
        {
          vi: 'Khối lượng riêng',
          en: 'Density',
        },
        {
          vi: 'Số neutron',
          en: 'Neutron number',
        },
        {
          vi: 'Khối lượng nguyên tử trong mọi trường hợp',
          en: 'Atomic weight in every case',
        },
      ],
      answer: 0,
    },
    {
      id: 'periodic-table-002',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Một nhóm trong bảng tuần hoàn có hướng nào?',
        en: 'Which direction does a periodic-table group run?',
      },
      explain: {
        vi: 'Nhóm là cột; chu kì là hàng.',
        en: 'Groups are columns; periods are rows.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Theo hàng',
          en: 'Horizontally',
        },
        {
          vi: 'Theo đường chéo',
          en: 'Diagonally',
        },
        {
          vi: 'Tuỳ nguyên tố',
          en: 'It depends on the element',
        },
        {
          vi: 'Theo cột',
          en: 'Vertically',
        },
      ],
      answer: 3,
    },
    {
      id: 'periodic-table-003',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Một chu kì trong bảng tuần hoàn có hướng nào?',
        en: 'Which direction does a period run?',
      },
      explain: {
        vi: 'Chu kì là hàng ngang, không chỉ một khối nguyên tố.',
        en: 'A period is a horizontal row spanning more than one block.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Theo đường chéo',
          en: 'Diagonally',
        },
        {
          vi: 'Chỉ ở khối d',
          en: 'Only through the d block',
        },
        {
          vi: 'Theo hàng',
          en: 'Horizontally',
        },
        {
          vi: 'Theo cột',
          en: 'Vertically',
        },
      ],
      answer: 2,
    },
    {
      id: 'periodic-table-004',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Nguyên tố nào kết thúc chu kì 3?',
        en: 'Which element ends period 3?',
      },
      explain: {
        vi: 'Chu kì 3 đi từ Na đến khí hiếm Ar. Ne kết thúc chu kì 2, Kr kết thúc chu kì 4.',
        en: 'Period 3 runs from Na to Ar. Ne ends period 2 and Kr ends period 4.',
      },
      elements: ['Ar', 'Ne', 'Kr', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cl',
          en: 'Cl',
        },
        {
          vi: 'Ar',
          en: 'Ar',
        },
        {
          vi: 'Ne',
          en: 'Ne',
        },
        {
          vi: 'Kr',
          en: 'Kr',
        },
      ],
      answer: 1,
    },
    {
      id: 'periodic-table-005',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Trong các nguyên tố sau, nguyên tố nào là kim loại kiềm?',
        en: 'Which of these elements is an alkali metal?',
      },
      explain: {
        vi: 'Na thuộc nhóm kim loại kiềm. H nằm trên nhóm 1 nhưng không được xếp là kim loại kiềm.',
        en: 'Na is an alkali metal. Hydrogen sits above group 1 but is not classified as an alkali metal.',
      },
      elements: ['Na', 'Mg', 'Al', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Na',
          en: 'Na',
        },
        {
          vi: 'Mg',
          en: 'Mg',
        },
        {
          vi: 'Al',
          en: 'Al',
        },
        {
          vi: 'H',
          en: 'H',
        },
      ],
      answer: 0,
    },
    {
      id: 'periodic-table-006',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Mg có electron ngoài cùng ở phân lớp 3s. Mg thuộc khối nào?',
        en: 'Mg’s outer electrons occupy 3s. Which block contains Mg?',
      },
      explain: {
        vi: 'Khối s gắn với việc điền phân lớp s; không lấy số 3 làm tên khối.',
        en: 'The s block corresponds to filling s subshells; the principal shell number is not the block name.',
      },
      elements: ['Mg'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'p',
          en: 'p',
        },
        {
          vi: 'd',
          en: 'd',
        },
        {
          vi: 'f',
          en: 'f',
        },
        {
          vi: 's',
          en: 's',
        },
      ],
      answer: 3,
    },
    {
      id: 'periodic-table-007',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Theo hệ IUPAC, các nhóm được đánh số thế nào?',
        en: 'How are groups numbered in the IUPAC system?',
      },
      explain: {
        vi: '118 là số nguyên tố hiện có trong bảng của dự án, không phải số nhóm.',
        en: 'The project’s table contains 118 elements, not 118 groups.',
      },
      elements: [],
      source: 'https://iupac.org/what-we-do/periodic-table-of-elements/',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '1 đến 7',
          en: '1 to 7',
        },
        {
          vi: '1 đến 118',
          en: '1 to 118',
        },
        {
          vi: '1 đến 18',
          en: '1 to 18',
        },
        {
          vi: '1 đến 8',
          en: '1 to 8',
        },
      ],
      answer: 2,
    },
    {
      id: 'periodic-table-008',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Vì sao các nguyên tố nhóm chính cùng nhóm thường có tính chất gần nhau?',
        en: 'Why do main-group elements in one group often have similar properties?',
      },
      explain: {
        vi: 'Cùng nhóm thường có cấu hình hoá trị tương tự; cùng số lớp là đặc điểm của một chu kì.',
        en: 'A group shares similar valence patterns; an equal shell count is associated with a period.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Có khối lượng nguyên tử bằng nhau',
          en: 'Equal atomic weights',
        },
        {
          vi: 'Cấu hình electron hoá trị tương tự',
          en: 'Similar valence-electron configurations',
        },
        {
          vi: 'Có cùng số neutron',
          en: 'Equal neutron numbers',
        },
        {
          vi: 'Có cùng số lớp electron',
          en: 'Equal occupied-shell counts',
        },
      ],
      answer: 1,
    },
    {
      id: 'periodic-table-009',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Trong chu kì 3, bán kính nguyên tử nhìn chung biến đổi thế nào từ Na đến Cl?',
        en: 'Across period 3 from Na to Cl, what is the general atomic-radius trend?',
      },
      explain: {
        vi: 'Trong chu kì, điện tích hạt nhân tăng trong khi số lớp chính không đổi, nên bán kính nhìn chung giảm. Không xét riêng số electron hay neutron; cùng số lớp cũng không làm bán kính bằng nhau.',
        en: 'Across a period, increasing nuclear charge with the same principal shell count generally reduces radius. Electron or neutron count alone is insufficient, and equal shell counts do not imply equal radii.',
      },
      elements: ['Na', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Giảm',
          en: 'Decreases',
        },
        {
          vi: 'Tăng vì số electron tăng',
          en: 'It increases because electron count rises',
        },
        {
          vi: 'Không đổi vì cùng số lớp electron',
          en: 'It stays fixed because shell count is unchanged',
        },
        {
          vi: 'Tăng rồi giảm chỉ theo số neutron',
          en: 'It rises then falls solely with neutron count',
        },
      ],
      answer: 0,
    },
    {
      id: 'periodic-table-010',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Trong dãy Li, Na, K, bán kính nguyên tử nhìn chung thay đổi thế nào?',
        en: 'How does atomic radius generally change through Li, Na, K?',
      },
      explain: {
        vi: 'Đi xuống Li → Na → K, có thêm lớp electron nên bán kính nhìn chung tăng. Không dùng điện tích hạt nhân hoặc số electron hoá trị riêng lẻ để bỏ qua tác động thêm lớp.',
        en: 'Additional electron shells generally increase radius down Li → Na → K. Nuclear charge or a shared valence count alone does not override the added-shell effect.',
      },
      elements: ['Li', 'Na', 'K'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Giảm vì điện tích hạt nhân tăng',
          en: 'It decreases as nuclear charge rises',
        },
        {
          vi: 'Bằng nhau vì đều có một electron hoá trị',
          en: 'Equal because all have one valence electron',
        },
        {
          vi: 'Li < K < Na',
          en: 'Li < K < Na',
        },
        {
          vi: 'Tăng',
          en: 'Increases',
        },
      ],
      answer: 3,
    },
    {
      id: 'periodic-table-011',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Trong F, Cl và Br, nguyên tố nào có độ âm điện lớn nhất?',
        en: 'Which has the greatest electronegativity: F, Cl or Br?',
      },
      explain: {
        vi: 'Độ âm điện giảm nhìn chung khi đi xuống nhóm halogen; F lớn nhất trong ba nguyên tố này.',
        en: 'Electronegativity generally decreases down the halogens; F is highest among these three.',
      },
      elements: ['F', 'Cl', 'Br'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'element',
      answer: 'F',
    },
    {
      id: 'periodic-table-012',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'X có phân bố lớp 2, 8, 7. X thuộc nhóm chính nào?',
        en: 'X has shell occupancy 2, 8, 7. Which main group contains it?',
      },
      explain: {
        vi: 'Bảy electron lớp ngoài cùng ứng với nhóm 17. Ba lớp cho chu kì 3, không phải nhóm 3.',
        en: 'Seven outer-shell electrons correspond to group 17. Three occupied shells identify period 3, not group 3.',
      },
      elements: ['Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '18',
          en: '18',
        },
        {
          vi: '17',
          en: '17',
        },
        {
          vi: '7',
          en: '7',
        },
        {
          vi: '3',
          en: '3',
        },
      ],
      answer: 1,
    },
    {
      id: 'periodic-table-013',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Na⁺ và Mg²⁺ đều có 10 electron. Ion nào có bán kính nhỏ hơn?',
        en: 'Na⁺ and Mg²⁺ each have 10 electrons. Which ion is smaller?',
      },
      explain: {
        vi: 'Với dãy đẳng electron, hạt nhân Mg có nhiều proton hơn nên hút lớp vỏ mạnh hơn.',
        en: 'In this isoelectronic pair, Mg has more protons and attracts the electron cloud more strongly.',
      },
      elements: ['Na', 'Mg'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Mg²⁺',
          en: 'Mg²⁺',
        },
        {
          vi: 'Na⁺',
          en: 'Na⁺',
        },
        {
          vi: 'Bằng nhau vì cùng số electron',
          en: 'Equal because electron counts match',
        },
        {
          vi: 'Không xác định được vì khác điện tích',
          en: 'Impossible to compare because charges differ',
        },
      ],
      answer: 0,
    },
    {
      id: 'periodic-table-014',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Từ Na đến Cl trong chu kì 3, tính kim loại nhìn chung thay đổi thế nào?',
        en: 'From Na to Cl across period 3, how does metallic character generally change?',
      },
      explain: {
        vi: 'Từ Na đến Cl, xu hướng nhường electron giảm nên tính kim loại nhìn chung giảm. Cùng số lớp không làm tính chất bằng nhau; tăng số proton hoặc electron hoá trị không có nghĩa tính kim loại tăng.',
        en: 'Electron loss becomes less favourable from Na to Cl, so metallic character generally decreases. Equal shell counts do not equalise properties; more protons or valence electrons do not imply greater metallic character.',
      },
      elements: ['Na', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Tăng vì số proton tăng',
          en: 'It increases because proton count rises',
        },
        {
          vi: 'Không đổi vì cùng số lớp electron',
          en: 'Unchanged because shell count is the same',
        },
        {
          vi: 'Tăng vì số electron lớp ngoài cùng tăng',
          en: 'It increases because valence-electron count rises',
        },
        {
          vi: 'Giảm',
          en: 'Decreases',
        },
      ],
      answer: 3,
    },
    {
      id: 'periodic-table-015',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Trong Na, Mg, Ar, nguyên tố nào thường khó tách electron đầu tiên nhất?',
        en: 'Among Na, Mg and Ar, which is hardest to remove a first electron from?',
      },
      explain: {
        vi: 'Ar có lớp vỏ ngoài bền kiểu khí hiếm và năng lượng ion hoá thứ nhất cao nhất trong ba chất.',
        en: 'Argon’s closed outer shell gives it the highest first ionisation energy of the three.',
      },
      elements: ['Na', 'Mg', 'Ar'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Mg',
          en: 'Mg',
        },
        {
          vi: 'Cả ba như nhau',
          en: 'All three equally',
        },
        {
          vi: 'Ar',
          en: 'Ar',
        },
        {
          vi: 'Na',
          en: 'Na',
        },
      ],
      answer: 2,
    },
    {
      id: 'periodic-table-016',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Chọn các xu hướng chung đúng cho các nguyên tố nhóm chính.',
        en: 'Select the correct general main-group trends.',
      },
      explain: {
        vi: 'Xu hướng bán kính và tính kim loại đúng như mô tả. Đồng vị chung Z nên chung một ô; độ âm điện thường giảm xuống nhóm.',
        en: 'Radius and metallic-character trends are stated correctly. Isotopes share one cell, and electronegativity usually decreases down a group.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'Bán kính tăng khi đi xuống nhóm',
          en: 'Radius increases down a group',
        },
        {
          vi: 'Độ âm điện luôn tăng khi đi xuống nhóm',
          en: 'Electronegativity always increases down a group',
        },
        {
          vi: 'Tính kim loại thường giảm từ trái sang phải một chu kì',
          en: 'Metallic character generally decreases across a period',
        },
        {
          vi: 'Các đồng vị nằm ở các ô khác nhau',
          en: 'Isotopes occupy different element cells',
        },
      ],
      answer: [0, 2],
    },
    {
      id: 'periodic-table-017',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Co có khối lượng nguyên tử trung bình lớn hơn Ni một chút. Vì sao Co vẫn đứng trước Ni?',
        en: 'Co’s average atomic weight slightly exceeds Ni’s. Why does Co still precede Ni?',
      },
      explain: {
        vi: 'Bảng hiện đại xếp theo Z: Co có Z = 27, Ni có Z = 28. Khối lượng trung bình không bắt buộc tăng ở mọi bước; đồng vị cũng không được xếp thành những ô riêng theo nặng nhẹ.',
        en: 'Modern ordering uses Z: Co is 27 and Ni 28. Mean atomic weights need not increase at every step, and isotopes are not placed in separate heavy-to-light boxes.',
      },
      elements: ['Co', 'Ni'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Co có Z nhỏ hơn',
          en: 'Co has lower Z',
        },
        {
          vi: 'Bảng hiện đại vẫn ưu tiên khối lượng nguyên tử hơn Z',
          en: 'The modern table still prioritises atomic weight over Z',
        },
        {
          vi: 'Các đồng vị nặng được xếp trước các đồng vị nhẹ',
          en: 'Heavier isotopes are placed before lighter ones',
        },
        {
          vi: 'Ni phải đứng trước, đây là lỗi của bảng',
          en: 'Ni should be first; the table is mistaken',
        },
      ],
      answer: 0,
    },
    {
      id: 'periodic-table-018',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Một nguyên tử ở chu kì 3, có lớp ngoài cùng 3s² và thuộc nhóm 2. Chọn nguyên tố đó.',
        en: 'An atom is in period 3, has outer configuration 3s² and belongs to group 2. Select it.',
      },
      explain: {
        vi: 'Ba lớp electron và hai electron s ngoài cùng xác định Mg trong các nguyên tố nhóm chính của chu kì 3.',
        en: 'Three shells and two outer s electrons identify Mg in period 3.',
      },
      elements: ['Mg'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'element',
      answer: 'Mg',
    },
    {
      id: 'periodic-table-019',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Vì sao không nên nói “năng lượng ion hoá tăng tuyệt đối ở mọi bước từ trái sang phải”?',
        en: 'Why is “ionisation energy increases at every single step across a period” too strong?',
      },
      explain: {
        vi: 'Xu hướng tăng có ngoại lệ do phân lớp, che chắn và ghép đôi electron. Không thể coi mọi electron như nhau hay thay xu hướng bằng quy tắc tăng hoặc giảm tuyệt đối ở từng bước.',
        en: 'Subshells, shielding and electron pairing produce exceptions to the general increase. Electrons are not all equivalent, and neither an absolute increase nor decrease works at every step.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cùng chu kì nên mọi nguyên tố có cùng năng lượng ion hoá',
          en: 'All elements in a period have identical ionisation energy',
        },
        {
          vi: 'Tăng số electron luôn làm năng lượng ion hoá giảm ở mọi bước',
          en: 'Adding electrons always lowers ionisation energy at every step',
        },
        {
          vi: 'Có ngoại lệ do phân lớp và ghép đôi electron',
          en: 'Subshell and pairing effects cause exceptions',
        },
        {
          vi: 'Mọi electron đều chịu lực hút hạt nhân như nhau',
          en: 'All electrons experience identical nuclear attraction',
        },
      ],
      answer: 2,
    },
    {
      id: 'periodic-table-020',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'X thuộc nhóm 1, chu kì 4 và có Z = 19. Ion X⁺ còn bao nhiêu electron?',
        en: 'X is in group 1, period 4 and has Z = 19. How many electrons remain in X⁺?',
      },
      explain: {
        vi: 'X là K. Nguyên tử có 19 electron, mất một còn 18; không đổi số proton.',
        en: 'X is K. A neutral atom has 19 electrons and loses one, leaving 18 without changing proton number.',
      },
      elements: ['K'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'number',
      answer: 18,
      tolerance: 0,
      calculation: {
        kind: 'electron-count',
        z: 19,
        charge: 1,
      },
    },
  ],
});

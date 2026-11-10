import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'metals',
  title: {
    vi: 'Kim loại và hợp chất tiêu biểu',
    en: 'Metals and representative compounds',
  },
  questions: [
    {
      id: 'metals-001',
      grade: 12,
      difficulty: 1,
      q: {
        vi: 'Mô hình liên kết kim loại gồm những thành phần chính nào?',
        en: 'What are the main components in a simple metallic-bonding model?',
      },
      explain: {
        vi: 'Mô hình kim loại gồm ion dương và electron giải toả. Không phải mạng cation–anion như muối, không gồm phân tử tách rời và không chỉ có cặp electron định xứ giữa hai nguyên tử.',
        en: 'The metallic model uses positive ions and delocalised electrons, rather than a salt-like cation–anion lattice, separate molecules or only localised two-atom electron pairs.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Ion dương kim loại và electron giải toả',
          en: 'Positive metal ions and delocalised electrons',
        },
        {
          vi: 'Các phân tử kim loại riêng rẽ hút nhau bằng lực phân tán',
          en: 'Separate metal molecules held by dispersion forces',
        },
        {
          vi: 'Ion dương và ion âm kim loại xen kẽ',
          en: 'Alternating positive and negative metal ions',
        },
        {
          vi: 'Mỗi cặp nguyên tử chỉ dùng chung một cặp electron định xứ',
          en: 'One localised shared pair between each atomic pair',
        },
      ],
      answer: 0,
    },
    {
      id: 'metals-002',
      grade: 12,
      difficulty: 1,
      q: {
        vi: 'Hạt tải điện chủ yếu trong dây kim loại là gì?',
        en: 'What mainly carries charge in a metal wire?',
      },
      explain: {
        vi: 'Trong dây kim loại rắn, electron dẫn chuyển động còn các tâm ion dao động quanh vị trí mạng. Không có mạng ion âm kim loại như muối và không cần nóng chảy để có hạt tải điện.',
        en: 'In a solid metal, conduction electrons move while ion cores vibrate around lattice sites. There is no salt-like negative-ion lattice, and melting is not required for charge carriers.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Ion dương kim loại chuyển động dọc dây',
          en: 'Positive metal ions travelling along the wire',
        },
        {
          vi: 'Cả ion dương và ion âm kim loại',
          en: 'Both positive and negative metal ions',
        },
        {
          vi: 'Electron chỉ xuất hiện khi kim loại nóng chảy',
          en: 'Electrons that appear only upon melting',
        },
        {
          vi: 'Electron',
          en: 'Electrons',
        },
      ],
      answer: 3,
    },
    {
      id: 'metals-003',
      grade: 12,
      difficulty: 1,
      q: {
        vi: 'Khi kim loại M tạo cation Mⁿ⁺, kim loại đã làm gì?',
        en: 'What happens when metal M forms Mⁿ⁺?',
      },
      explain: {
        vi: 'Cation Mⁿ⁺ hình thành khi mất n electron. Nhận electron làm điện tích âm hơn; mất proton đổi nguyên tố, còn đổi neutron không tự tạo điện tích dương.',
        en: 'Losing n electrons forms Mⁿ⁺. Electron gain makes charge more negative; proton loss changes the element, and neutron loss does not itself create positive charge.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nhận n electron',
          en: 'Gained n electrons',
        },
        {
          vi: 'Nhường n proton',
          en: 'Lost n protons',
        },
        {
          vi: 'Nhường n electron',
          en: 'Loses n electrons',
        },
        {
          vi: 'Chỉ giảm số neutron nhưng giữ số electron',
          en: 'Only lost neutrons while retaining electrons',
        },
      ],
      answer: 2,
    },
    {
      id: 'metals-004',
      grade: 12,
      difficulty: 1,
      q: {
        vi: 'Kim loại nào trong Na, Al, Hg, Fe là chất lỏng ở nhiệt độ phòng?',
        en: 'Which of Na, Al, Hg and Fe is liquid at room temperature?',
      },
      explain: {
        vi: 'Thuỷ ngân là kim loại lỏng ở điều kiện phòng thông thường; ba kim loại còn lại là rắn.',
        en: 'Mercury is liquid under ordinary room conditions, unlike the other three metals.',
      },
      elements: ['Na', 'Al', 'Hg', 'Fe'],
      source: 'https://periodic-table.rsc.org/element/80/mercury',
      equations: [],
      type: 'element',
      answer: 'Hg',
    },
    {
      id: 'metals-005',
      grade: 12,
      difficulty: 1,
      q: {
        vi: 'Trong phản ứng Fe + CuSO4 -> FeSO4 + Cu, kim loại nào khử được ion của kim loại kia?',
        en: 'In Fe + CuSO4 -> FeSO4 + Cu, which metal reduces the other metal’s ions?',
      },
      explain: {
        vi: 'Fe hoạt động hơn Cu trong mô hình này và bị oxi hoá thành Fe²⁺.',
        en: 'Iron is more reactive in this model and is oxidised to Fe²⁺.',
      },
      elements: ['Fe', 'Cu', 'S', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: ['Fe + CuSO4 -> FeSO4 + Cu'],
      type: 'single',
      options: [
        {
          vi: 'Fe khử Cu²⁺',
          en: 'Fe reduces Cu²⁺',
        },
        {
          vi: 'Cu khử Fe²⁺ trong chiều viết',
          en: 'Cu reduces Fe²⁺ in the written direction',
        },
        {
          vi: 'Fe khử SO₄²⁻ thành S',
          en: 'Fe reduces SO₄²⁻ to S',
        },
        {
          vi: 'Cả hai kim loại đều bị khử',
          en: 'Both metals are reduced',
        },
      ],
      answer: 0,
    },
    {
      id: 'metals-006',
      grade: 12,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá đặc trưng của kim loại nhóm IA trong hợp chất là gì?',
        en: 'What is the characteristic oxidation state of group IA metals in compounds?',
      },
      explain: {
        vi: 'Kim loại kiềm thường nhường một electron hoá trị; số oxi hoá 0 thuộc đơn chất.',
        en: 'Alkali metals commonly lose one valence electron; oxidation state zero belongs to the element.',
      },
      elements: ['Li', 'Na', 'K'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '+2',
          en: '+2',
        },
        {
          vi: '−1',
          en: '−1',
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
      answer: 3,
    },
    {
      id: 'metals-007',
      grade: 12,
      difficulty: 1,
      q: {
        vi: 'Số oxi hoá đặc trưng của Mg và Ca trong hợp chất là gì?',
        en: 'What is the characteristic oxidation state of Mg and Ca in compounds?',
      },
      explain: {
        vi: 'Kim loại nhóm IIA thường tạo cation điện tích +2 bằng cách nhường hai electron hoá trị.',
        en: 'Group IIA metals commonly lose two valence electrons to form +2 cations.',
      },
      elements: ['Mg', 'Ca'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '−2',
          en: '−2',
        },
        {
          vi: '0',
          en: '0',
        },
        {
          vi: '+2',
          en: '+2',
        },
        {
          vi: '+1',
          en: '+1',
        },
      ],
      answer: 2,
    },
    {
      id: 'metals-008',
      grade: 12,
      difficulty: 1,
      q: {
        vi: 'Nung CaCO₃ đủ mạnh, sản phẩm chính là gì?',
        en: 'What are the main products when CaCO₃ is strongly heated?',
      },
      explain: {
        vi: 'Đá vôi phân huỷ thành vôi sống và CO₂; nung không tự biến hợp chất này thành canxi kim loại.',
        en: 'Limestone decomposes to quicklime and CO₂; heating does not directly yield calcium metal.',
      },
      elements: ['Ca', 'C', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: ['CaCO3 -> CaO + CO2'],
      type: 'single',
      options: [
        {
          vi: 'CaCl₂ và CO₂',
          en: 'CaCl₂ and CO₂',
        },
        {
          vi: 'CaO và CO₂',
          en: 'CaO and CO₂',
        },
        {
          vi: 'Ca và O₂',
          en: 'Ca and O₂',
        },
        {
          vi: 'Ca(OH)₂ và H₂',
          en: 'Ca(OH)₂ and H₂',
        },
      ],
      answer: 1,
    },
    {
      id: 'metals-009',
      grade: 12,
      difficulty: 2,
      q: {
        vi: 'Cu có phản ứng giải phóng H₂ với HCl loãng đã loại oxi và không có chất oxi hoá khác không?',
        en: 'Does Cu release H₂ from deaerated dilute HCl with no other oxidant?',
      },
      explain: {
        vi: 'Cu đứng sau H nên không khử H⁺ trong điều kiện nêu. Oxi hoà tan hoặc chất oxi hoá khác có thể thay đổi tình huống.',
        en: 'Copper is below hydrogen and does not reduce H⁺ under the stated conditions. Dissolved oxygen or another oxidant can change the situation.',
      },
      elements: ['Cu', 'H', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Không theo mô hình dãy hoạt động thông thường',
          en: 'No, under the usual reactivity model',
        },
        {
          vi: 'Có, vì mọi kim loại gặp axit đều tạo H₂',
          en: 'Yes, all metals give H₂ with acids',
        },
        {
          vi: 'Có, vì Cu đứng trước H',
          en: 'Yes, Cu is above H',
        },
        {
          vi: 'Luôn tạo Cl₂ thay H₂',
          en: 'It always forms Cl₂ instead',
        },
      ],
      answer: 0,
    },
    {
      id: 'metals-010',
      grade: 12,
      difficulty: 2,
      q: {
        vi: 'Khi Fe tạo Fe²⁺ từ cấu hình [Ar]3d⁶4s², electron bị lấy khỏi phân lớp nào trước?',
        en: 'When Fe forms Fe²⁺ from [Ar]3d⁶4s², which subshell loses electrons first?',
      },
      explain: {
        vi: 'Hai electron 4s bị tách trước nên Fe²⁺ có [Ar]3d⁶. Không chỉ đảo ngược thứ tự điền electron một cách máy móc.',
        en: 'The two 4s electrons are removed first, giving [Ar]3d⁶. Ion formation is not a mechanical reversal of filling order.',
      },
      elements: ['Fe'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '3d',
          en: '3d',
        },
        {
          vi: '3p',
          en: '3p',
        },
        {
          vi: '1s',
          en: '1s',
        },
        {
          vi: '4s',
          en: '4s',
        },
      ],
      answer: 3,
    },
    {
      id: 'metals-011',
      grade: 12,
      difficulty: 2,
      q: {
        vi: 'Các ion nào gây độ cứng của nước theo mô hình phổ thông?',
        en: 'Which ions cause water hardness in the school model?',
      },
      explain: {
        vi: 'Độ cứng gắn với Ca²⁺, Mg²⁺, không phải mọi ion hoà tan đều được tính như nhau.',
        en: 'Hardness is associated with Ca²⁺ and Mg²⁺, rather than treating all dissolved ions alike.',
      },
      elements: ['Ca', 'Mg'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cl⁻ và NO₃⁻',
          en: 'Cl⁻ and NO₃⁻',
        },
        {
          vi: 'H⁺ và OH⁻',
          en: 'H⁺ and OH⁻',
        },
        {
          vi: 'Ca²⁺ và Mg²⁺',
          en: 'Ca²⁺ and Mg²⁺',
        },
        {
          vi: 'Na⁺ và K⁺',
          en: 'Na⁺ and K⁺',
        },
      ],
      answer: 2,
    },
    {
      id: 'metals-012',
      grade: 12,
      difficulty: 2,
      q: {
        vi: 'Muốn sản xuất Na kim loại bằng điện phân, chọn môi trường nào?',
        en: 'Which electrolyte environment is used to produce sodium metal by electrolysis?',
      },
      explain: {
        vi: 'Trong dung dịch nước, nước dễ bị khử tạo H₂ thay vì thu Na bền. Sản xuất kim loại cần hệ nóng chảy phù hợp.',
        en: 'In water, reduction produces H₂ rather than stable sodium metal. A suitable molten system is needed.',
      },
      elements: ['Na', 'Cl', 'H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Dung dịch HCl loãng',
          en: 'Dilute aqueous HCl',
        },
        {
          vi: 'NaCl nóng chảy thích hợp',
          en: 'Suitable molten NaCl',
        },
        {
          vi: 'Dung dịch NaCl thông thường',
          en: 'Ordinary aqueous NaCl',
        },
        {
          vi: 'Nước tinh khiết',
          en: 'Pure water',
        },
      ],
      answer: 1,
    },
    {
      id: 'metals-013',
      grade: 12,
      difficulty: 2,
      q: {
        vi: 'Trong Li, Na, K, khả năng phản ứng với nước nhìn chung tăng theo chiều nào?',
        en: 'Among Li, Na and K, in which direction does reaction with water generally become more vigorous?',
      },
      explain: {
        vi: 'Trong dãy này, tính phản ứng với nước nhìn chung tăng Li → Na → K. Cùng một electron hoá trị không làm độ hoạt động giống nhau; hai thứ tự khác không phù hợp xu hướng đi xuống nhóm.',
        en: 'The usual water-reactivity trend is Li → Na → K. One valence electron does not give identical reactivity, and the alternative orders do not match the down-group trend.',
      },
      elements: ['Li', 'Na', 'K'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Li → Na → K',
          en: 'Li → Na → K',
        },
        {
          vi: 'K → Na → Li',
          en: 'K → Na → Li',
        },
        {
          vi: 'Li → K → Na',
          en: 'Li → K → Na',
        },
        {
          vi: 'Bằng nhau vì đều có một electron hoá trị',
          en: 'Equal because each has one valence electron',
        },
      ],
      answer: 0,
    },
    {
      id: 'metals-014',
      grade: 12,
      difficulty: 2,
      q: {
        vi: 'Nước vôi trong gặp lượng CO₂ vừa đủ trở nên đục chủ yếu do chất nào?',
        en: 'What mainly makes limewater cloudy with a suitable amount of CO₂?',
      },
      explain: {
        vi: 'Ca(OH)₂ phản ứng với CO₂ tạo CaCO₃ ít tan. Khi CO₂ dư nhiều, hiện tượng có thể thay đổi do tạo bicarbonate tan.',
        en: 'Ca(OH)₂ reacts with CO₂ to form sparingly soluble CaCO₃; substantial excess CO₂ can later form soluble bicarbonate.',
      },
      elements: ['Ca', 'C', 'H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: ['Ca(OH)2 + CO2 -> CaCO3 + H2O'],
      type: 'single',
      options: [
        {
          vi: 'Ca kim loại',
          en: 'Calcium metal',
        },
        {
          vi: 'CaCl₂ kết tủa',
          en: 'CaCl₂ precipitate',
        },
        {
          vi: 'O₂ tạo bọt',
          en: 'O₂ bubbles',
        },
        {
          vi: 'CaCO₃ kết tủa',
          en: 'CaCO₃ precipitate',
        },
      ],
      answer: 3,
    },
    {
      id: 'metals-015',
      grade: 12,
      difficulty: 2,
      q: {
        vi: 'Vì sao nhôm có thể bền trong không khí dù là kim loại hoạt động?',
        en: 'Why can aluminium remain durable in air despite being reactive?',
      },
      explain: {
        vi: 'Nhôm hoạt động nhưng tạo lớp oxit bám chắc bảo vệ. Không phải nó không phản ứng với O₂ hay kém hoạt động hơn Cu; lớp bảo vệ cũng không bền trong mọi môi trường axit, bazơ.',
        en: 'Reactive aluminium forms an adherent protective oxide. It does react with oxygen and is above Cu in the activity series; the film is not resistant to every acid or base.',
      },
      elements: ['Al', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Nhôm hoàn toàn không phản ứng với oxi',
          en: 'Aluminium never reacts with oxygen',
        },
        {
          vi: 'Nhôm đứng sau Cu trong dãy hoạt động',
          en: 'Aluminium lies below copper in the activity series',
        },
        {
          vi: 'Lớp oxit bám chắc bảo vệ bề mặt',
          en: 'An adherent oxide film protects its surface',
        },
        {
          vi: 'Màng oxit làm nhôm bền với mọi axit và bazơ',
          en: 'Its oxide makes it resistant to every acid and base',
        },
      ],
      answer: 2,
    },
    {
      id: 'metals-016',
      grade: 12,
      difficulty: 2,
      q: {
        vi: 'Chọn các kết luận đúng trong mô hình dãy hoạt động kim loại.',
        en: 'Select the correct conclusions in the metal reactivity model.',
      },
      explain: {
        vi: 'Zn và Fe hoạt động hơn Cu. Kim loại kiềm phản ứng mạnh với nước nên không áp dụng máy móc quy tắc thế trong dung dịch.',
        en: 'Zn and Fe are more reactive than Cu. Alkali metals react with water, so solution displacement rules cannot be applied mechanically.',
      },
      elements: ['Zn', 'Cu', 'Mg', 'Fe', 'Na'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'Zn có thể khử Cu²⁺ trong điều kiện phù hợp',
          en: 'Zn can reduce Cu²⁺ under suitable conditions',
        },
        {
          vi: 'Cu khử được Mg²⁺ trong dung dịch muối thông thường',
          en: 'Cu reduces Mg²⁺ in ordinary salt solution',
        },
        {
          vi: 'Fe có thể khử Cu²⁺',
          en: 'Fe can reduce Cu²⁺',
        },
        {
          vi: 'Na cho vào nước chỉ đẩy mọi kim loại khỏi muối mà không phản ứng với nước',
          en: 'Na in water displaces every metal without reacting with water',
        },
      ],
      answer: [0, 2],
    },
    {
      id: 'metals-017',
      grade: 12,
      difficulty: 3,
      q: {
        vi: 'Lấy Mg = 24, O = 16. Khối lượng mol MgO là bao nhiêu g/mol?',
        en: 'Using Mg = 24 and O = 16, what is MgO’s molar mass in g/mol?',
      },
      explain: {
        vi: 'Một Mg và một O cho 24 + 16 = 40 g/mol. Không nhân đôi vì Mg có số oxi hoá +2.',
        en: 'One Mg and one O give 24 + 16 = 40 g/mol. Oxidation state +2 does not double the number of Mg atoms.',
      },
      elements: ['Mg', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'number',
      answer: 40,
      tolerance: 0,
      calculation: {
        kind: 'molar-mass',
        formula: 'MgO',
        masses: {
          Mg: 24,
          O: 16,
        },
      },
      unit: 'g/mol',
    },
    {
      id: 'metals-018',
      grade: 12,
      difficulty: 3,
      q: {
        vi: 'Cho 0,10 mol CaCO₃ và 0,15 mol HCl theo CaCO3 + HCl -> CaCl2 + CO2 + H2O. Tạo tối đa bao nhiêu mol CO₂?',
        en: 'React 0.10 mol CaCO₃ with 0.15 mol HCl by CaCO3 + HCl -> CaCl2 + CO2 + H2O. What is the maximum CO₂ amount?',
      },
      explain: {
        vi: 'Cần 2 mol HCl cho 1 mol CaCO₃. HCl giới hạn nên tạo 0,15/2 = 0,075 mol CO₂.',
        en: 'Two HCl are required per CaCO₃. HCl limits the product to 0.15/2 = 0.075 mol CO₂.',
      },
      elements: ['Ca', 'C', 'O', 'H', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: ['CaCO3 + HCl -> CaCl2 + CO2 + H2O'],
      type: 'number',
      answer: 0.075,
      tolerance: 1e-9,
      calculation: {
        kind: 'stoichiometry',
        equation: 'CaCO3 + HCl -> CaCl2 + CO2 + H2O',
        givenMol: [0.1, 0.15],
        species: 3,
      },
      unit: 'mol',
    },
    {
      id: 'metals-019',
      grade: 12,
      difficulty: 3,
      q: {
        vi: 'Theo định nghĩa có phân lớp d chưa đầy ở nguyên tử hoặc cation, vì sao Cu được xem là kim loại chuyển tiếp?',
        en: 'Under the definition involving an incomplete d subshell in an atom or cation, why is Cu a transition metal?',
      },
      explain: {
        vi: 'Cu²⁺ có cấu hình 3d⁹, đáp ứng điều kiện cation có phân lớp d chưa đầy. Chỉ có d¹⁰ hay số oxi hoá +2 chưa đủ theo định nghĩa; electron tạo Cu²⁺ không lấy từ 3p trước.',
        en: 'Cu²⁺ has 3d⁹, meeting the incomplete-d-subshell criterion. A filled d shell or +2 charge alone is insufficient, and Cu²⁺ does not form by removing 3p electrons first.',
      },
      elements: ['Cu'],
      source: 'https://goldbook.iupac.org/terms/view/T06456',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Chỉ cần cấu hình nguyên tử có 3d¹⁰ là đủ cho mọi nguyên tố',
          en: 'Any atom with 3d¹⁰ automatically qualifies',
        },
        {
          vi: 'Cu²⁺ mất electron từ lớp 3p trước nên là chuyển tiếp',
          en: 'Cu²⁺ loses 3p electrons first and therefore qualifies',
        },
        {
          vi: 'Cu²⁺ có phân lớp 3d chưa đầy',
          en: 'Cu²⁺ has an incomplete 3d subshell',
        },
        {
          vi: 'Chỉ cần Cu có số oxi hoá +2 là đủ theo định nghĩa',
          en: 'An oxidation state of +2 alone meets the definition',
        },
      ],
      answer: 2,
    },
    {
      id: 'metals-020',
      grade: 12,
      difficulty: 3,
      q: {
        vi: 'Fe có Z = 26. Ion Fe³⁺ còn bao nhiêu electron?',
        en: 'Fe has Z = 26. How many electrons are in Fe³⁺?',
      },
      explain: {
        vi: 'Fe trung hoà có 26 electron; ion +3 đã nhường 3 nên còn 23. Không thay đổi số proton để tạo ion.',
        en: 'Neutral Fe has 26 electrons; losing three leaves 23. Ion formation does not change proton number.',
      },
      elements: ['Fe'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      equations: [],
      type: 'number',
      answer: 23,
      tolerance: 0,
      calculation: {
        kind: 'electron-count',
        z: 26,
        charge: 3,
      },
    },
  ],
});

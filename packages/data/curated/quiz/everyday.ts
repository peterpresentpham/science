import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'everyday',
  title: {
    vi: 'Hoá học trong đời sống',
    en: 'Chemistry in everyday life',
  },
  questions: [
    {
      id: 'everyday-001',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Muối ăn tinh khiết là chất nào?',
        en: 'What is pure table salt?',
      },
      explain: {
        vi: 'NaCl là hợp chất có tính chất khác hẳn Na và Cl₂. Không suy tính chất hợp chất bằng cách cộng tính chất đơn chất.',
        en: 'NaCl is a compound with properties unlike sodium and chlorine. Compound properties are not a sum of elemental properties.',
      },
      elements: ['Na', 'Cl'],
      source: 'https://periodic-table.rsc.org/element/11/sodium',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'NaCl',
          en: 'NaCl',
        },
        {
          vi: 'Na kim loại',
          en: 'Sodium metal',
        },
        {
          vi: 'Cl₂',
          en: 'Cl₂',
        },
        {
          vi: 'NaOH',
          en: 'NaOH',
        },
      ],
      answer: 0,
    },
    {
      id: 'everyday-002',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Đặc điểm nào giúp nhôm làm được lá mỏng bọc thực phẩm?',
        en: 'Which property helps aluminium form thin food-wrapping foil?',
      },
      explain: {
        vi: 'Dát mỏng cho phép tạo lá nhôm. Dẫn điện là tính chất khác; nhôm không tan hoàn toàn trong nước thông thường, và màng oxit không bảo đảm bền với mọi axit hay thực phẩm.',
        en: 'Malleability allows thin foil. Conductivity is a different property; aluminium does not simply dissolve in ordinary water, and its oxide film is not immunity to every acid or food.',
      },
      elements: ['Al'],
      source: 'https://periodic-table.rsc.org/element/13/aluminium',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Tính dẫn điện',
          en: 'Electrical conductivity',
        },
        {
          vi: 'Khả năng tan hoàn toàn trong nước',
          en: 'Complete solubility in water',
        },
        {
          vi: 'Lớp oxit làm nhôm không bao giờ bị axit tác động',
          en: 'An oxide film that makes aluminium immune to every acid',
        },
        {
          vi: 'Tính dát mỏng',
          en: 'Malleability',
        },
      ],
      answer: 3,
    },
    {
      id: 'everyday-003',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Kim cương và than chì có quan hệ nào?',
        en: 'How are diamond and graphite related?',
      },
      explain: {
        vi: 'Cả hai gồm C nhưng cách liên kết và sắp xếp khác nhau; đồng vị nói về số neutron, không phải mạng tinh thể.',
        en: 'Both contain C with different bonding and arrangements. Isotopes concern neutron number, not crystal structure.',
      },
      elements: ['C'],
      source: 'https://periodic-table.rsc.org/element/6/carbon',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Một chất là nguyên tố, chất kia là hợp chất',
          en: 'One is an element, the other a compound',
        },
        {
          vi: 'Hai nguyên tố khác nhau',
          en: 'Two different elements',
        },
        {
          vi: 'Hai dạng thù hình của cacbon',
          en: 'Two carbon allotropes',
        },
        {
          vi: 'Hai đồng vị của cacbon',
          en: 'Two carbon isotopes',
        },
      ],
      answer: 2,
    },
    {
      id: 'everyday-004',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Tính chất nào giải thích việc dùng đồng làm dây điện?',
        en: 'Which property helps explain copper’s use in electrical wiring?',
      },
      explain: {
        vi: 'Đồng dẫn điện tốt nhờ electron trong kim loại. Không phải kim loại nhẹ nhất, không là chất cách điện; dòng điện trong dây không phải dòng Cu²⁺ di chuyển dọc mạng.',
        en: 'Copper conducts through electrons in the metal. It is not the lightest metal or an insulator, and current in a wire is not Cu²⁺ ions travelling along the lattice.',
      },
      elements: ['Cu'],
      source: 'https://periodic-table.rsc.org/element/29/copper',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Khối lượng riêng nhỏ nhất trong các kim loại',
          en: 'The lowest density among metals',
        },
        {
          vi: 'Dẫn điện tốt',
          en: 'Good electrical conductivity',
        },
        {
          vi: 'Tính cách điện tốt khi ở trạng thái rắn',
          en: 'Good electrical insulation in the solid',
        },
        {
          vi: 'Chỉ các ion Cu²⁺ chuyển động dọc dây',
          en: 'Only Cu²⁺ ions move along the wire',
        },
      ],
      answer: 1,
    },
    {
      id: 'everyday-005',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Lớp kẽm mạ trên thép có mục đích chính gì?',
        en: 'What is the main purpose of zinc coating on steel?',
      },
      explain: {
        vi: 'Lớp kẽm ngăn tiếp xúc môi trường và có thể bảo vệ điện hoá cho sắt. Kẽm hoạt động hơn sắt, không chỉ là lớp màu; tăng dẫn điện không phải mục đích chính của mạ bảo vệ.',
        en: 'Zinc provides a barrier and can protect iron electrochemically. It is more reactive than iron; the coating is not merely decorative or primarily for higher conductivity.',
      },
      elements: ['Zn', 'Fe'],
      source: 'https://periodic-table.rsc.org/element/30/zinc',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Hạn chế ăn mòn thép',
          en: 'To limit steel corrosion',
        },
        {
          vi: 'Tăng khả năng sắt dẫn điện là mục đích chính',
          en: 'Primarily to increase iron conductivity',
        },
        {
          vi: 'Chỉ che màu gỉ, không ngăn ăn mòn',
          en: 'Only to hide rust without preventing corrosion',
        },
        {
          vi: 'Kẽm kém hoạt động hơn sắt nên luôn trơ',
          en: 'Zinc is less reactive than iron and always inert',
        },
      ],
      answer: 0,
    },
    {
      id: 'everyday-006',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Nguyên tố nào được dùng trong lưu hoá cao su?',
        en: 'Which element is used in rubber vulcanisation?',
      },
      explain: {
        vi: 'Lưu huỳnh tạo liên kết nối giữa các mạch polymer trong cao su lưu hoá.',
        en: 'Sulfur creates crosslinks between polymer chains in vulcanised rubber.',
      },
      elements: ['S'],
      source: 'https://periodic-table.rsc.org/element/16/sulfur',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Neon',
          en: 'Neon',
        },
        {
          vi: 'Bạc',
          en: 'Silver',
        },
        {
          vi: 'Thuỷ ngân',
          en: 'Mercury',
        },
        {
          vi: 'Lưu huỳnh',
          en: 'Sulfur',
        },
      ],
      answer: 3,
    },
    {
      id: 'everyday-007',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Nguyên tố nào có vai trò nổi bật trong chip bán dẫn: Si, Na, Ca hay Hg?',
        en: 'Which element is prominent in semiconductor chips: Si, Na, Ca or Hg?',
      },
      explain: {
        vi: 'Silic tinh khiết và được pha tạp có kiểm soát là vật liệu bán dẫn quan trọng.',
        en: 'High-purity silicon with controlled doping is an important semiconductor material.',
      },
      elements: ['Si', 'Na', 'Ca', 'Hg'],
      source: 'https://periodic-table.rsc.org/element/14/silicon',
      equations: [],
      type: 'element',
      answer: 'Si',
    },
    {
      id: 'everyday-008',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Vì sao không nên coi thuỷ ngân trong nhiệt kế vỡ là chất vô hại?',
        en: 'Why should mercury from a broken thermometer not be regarded as harmless?',
      },
      explain: {
        vi: 'Thuỷ ngân kim loại có thể tạo hơi độc. Không có mùi không chứng minh không có hơi, và chất lỏng vẫn có thể bay hơi; độc tính không chỉ giới hạn ở các muối.',
        en: 'Metallic mercury can produce toxic vapour. Lack of smell does not prove its absence, liquids can evaporate, and toxicity is not restricted to salts.',
      },
      elements: ['Hg'],
      source: 'https://periodic-table.rsc.org/element/80/mercury',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Chỉ muối thuỷ ngân mới có độc tính, đơn chất luôn vô hại',
          en: 'Only mercury salts are toxic; the element is always harmless',
        },
        {
          vi: 'Thuỷ ngân và hơi của nó có độc tính',
          en: 'Mercury and its vapour are toxic',
        },
        {
          vi: 'Không có mùi nghĩa là không có hơi thuỷ ngân',
          en: 'No smell means no mercury vapour',
        },
        {
          vi: 'Thuỷ ngân ở dạng lỏng không thể bay hơi',
          en: 'Liquid mercury cannot evaporate',
        },
      ],
      answer: 1,
    },
    {
      id: 'everyday-009',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Trong kem đánh răng chứa fluoride, thành phần liên quan đến flo là gì?',
        en: 'What fluorine-related material is used in fluoride toothpaste?',
      },
      explain: {
        vi: 'Fluoride là ion F⁻ trong hợp chất, khác khí F₂ có tính phản ứng mạnh. Cũng không phải F⁺ hay các nguyên tử trung hoà riêng rẽ; cùng nguyên tố không đồng nghĩa cùng dạng chất.',
        en: 'Fluoride is F⁻ in compounds, distinct from reactive F₂ gas, F⁺ or isolated neutral atoms. An element’s different chemical forms have different properties.',
      },
      elements: ['F'],
      source: 'https://periodic-table.rsc.org/element/9/fluorine',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Hợp chất chứa ion fluoride',
          en: 'A compound supplying fluoride ions',
        },
        {
          vi: 'Khí F₂ tự do',
          en: 'Free F₂ gas',
        },
        {
          vi: 'Ion F⁺',
          en: 'F⁺ ions',
        },
        {
          vi: 'Chỉ nguyên tử F trung hoà tách rời',
          en: 'Only isolated neutral F atoms',
        },
      ],
      answer: 0,
    },
    {
      id: 'everyday-010',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Oxi trong bình y tế liên quan thế nào đến sự cháy?',
        en: 'How does oxygen in a medical cylinder relate to combustion?',
      },
      explain: {
        vi: 'O₂ là chất oxi hoá giúp nhiều nhiên liệu cháy; không đồng nhất chất hỗ trợ cháy với nhiên liệu.',
        en: 'O₂ is an oxidant supporting many fuels. A combustion-supporting substance is not the same as a fuel.',
      },
      elements: ['O'],
      source: 'https://periodic-table.rsc.org/element/8/oxygen',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Là nhiên liệu cháy giống khí metan',
          en: 'Burns as a fuel like methane',
        },
        {
          vi: 'Luôn dập mọi ngọn lửa',
          en: 'Always extinguishes flames',
        },
        {
          vi: 'Không ảnh hưởng sự cháy',
          en: 'Has no effect on combustion',
        },
        {
          vi: 'Hỗ trợ sự cháy nhưng bản thân không phải nhiên liệu thông thường',
          en: 'Supports combustion but is not an ordinary fuel',
        },
      ],
      answer: 3,
    },
    {
      id: 'everyday-011',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Nitơ lỏng được dùng làm chất làm lạnh chủ yếu vì đặc điểm nào?',
        en: 'Why is liquid nitrogen useful as a coolant?',
      },
      explain: {
        vi: 'Nitơ lỏng hấp thụ nhiệt khi nóng lên và hoá hơi. Không phải chất nào bay hơi cũng có mức nhiệt độ như nhau.',
        en: 'Liquid nitrogen absorbs heat as it warms and vaporises. Different liquids have different boiling temperatures.',
      },
      elements: ['N'],
      source: 'https://periodic-table.rsc.org/element/7/nitrogen',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Không thể bay hơi',
          en: 'It cannot evaporate',
        },
        {
          vi: 'Là khí độc tạo lạnh',
          en: 'It is a toxic gas that produces cold',
        },
        {
          vi: 'Nhiệt độ sôi rất thấp',
          en: 'Its very low boiling point',
        },
        {
          vi: 'Có nhiệt độ sôi cao hơn nước',
          en: 'A boiling point above water’s',
        },
      ],
      answer: 2,
    },
    {
      id: 'everyday-012',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Tên “pin lithium-ion” có nghĩa đúng nhất là gì?',
        en: 'What does “lithium-ion battery” most accurately refer to?',
      },
      explain: {
        vi: 'Phải phân biệt pin lithium-ion với mọi loại pin dùng liti; tên gọi không nói rằng toàn bộ pin là kim loại liti.',
        en: 'Lithium-ion cells must be distinguished from all lithium-based batteries. The name does not mean the entire cell is lithium metal.',
      },
      elements: ['Li'],
      source: 'https://www.nobelprize.org/prizes/chemistry/2019/press-release/',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Pin không có phản ứng hoá học',
          en: 'The battery involves no chemical reactions',
        },
        {
          vi: 'Ion liti tham gia vận chuyển điện tích giữa vật liệu điện cực',
          en: 'Lithium ions move charge between electrode materials',
        },
        {
          vi: 'Trong pin chỉ có liti kim loại nguyên chất',
          en: 'The cell contains only pure lithium metal',
        },
        {
          vi: 'Mọi pin chứa liti đều có cấu tạo giống nhau',
          en: 'Every lithium battery has the same construction',
        },
      ],
      answer: 1,
    },
    {
      id: 'everyday-013',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Khi magie cháy trong oxi theo Mg + O2 -> MgO, chất rắn trắng tạo thành chủ yếu là gì?',
        en: 'When magnesium burns in oxygen by Mg + O2 -> MgO, what is the main white solid?',
      },
      explain: {
        vi: 'Phản ứng đã cho tạo MgO trắng. Mg(OH)₂ cần nguồn H; không giữ nguyên phân tử O₂ để suy ra MgO₂. Mg kim loại còn dư không phải sản phẩm oxit của phương trình.',
        en: 'The stated reaction produces white MgO. Mg(OH)₂ needs hydrogen, and retaining O₂ as a unit does not justify MgO₂. Remaining metal is not the oxide product.',
      },
      elements: ['Mg', 'O'],
      source: 'https://periodic-table.rsc.org/element/12/magnesium',
      equations: ['Mg + O2 -> MgO'],
      type: 'single',
      options: [
        {
          vi: 'MgO',
          en: 'MgO',
        },
        {
          vi: 'Mg còn lại không phản ứng',
          en: 'Unreacted Mg',
        },
        {
          vi: 'Mg(OH)₂ chỉ do kết hợp trực tiếp Mg với O₂',
          en: 'Mg(OH)₂ from directly combining only Mg and O₂',
        },
        {
          vi: 'MgO₂ theo tỉ lệ 1 : 1 của Mg và O₂',
          en: 'MgO₂ from a 1:1 Mg-to-O₂ ratio',
        },
      ],
      answer: 0,
    },
    {
      id: 'everyday-014',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Vì sao không đánh đồng BaSO₄ dùng làm chất cản quang y tế với mọi muối bari?',
        en: 'Why should medical contrast BaSO₄ not be equated with every barium salt?',
      },
      explain: {
        vi: 'BaSO₄ rất ít tan nên không thể đồng nhất với các muối bari tan. Khác biệt độ tan quan trọng với mức tiếp xúc; điều này không cho phép kết luận mọi muối hay mọi lượng dùng đều an toàn.',
        en: 'BaSO₄ is very sparingly soluble and differs from soluble barium salts. Solubility affects exposure; it does not justify claiming that all salts or all amounts are safe.',
      },
      elements: ['Ba', 'S', 'O'],
      source: 'https://periodic-table.rsc.org/element/56/barium',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Mọi muối bari đều có cùng độ tan và độc tính',
          en: 'All barium salts share solubility and toxicity',
        },
        {
          vi: 'BaSO₄ tan hoàn toàn như BaCl₂',
          en: 'BaSO₄ dissolves completely like BaCl₂',
        },
        {
          vi: 'BaSO₄ không phân li khi tan nên mọi lượng dùng đều vô hại',
          en: 'BaSO₄ never dissociates, so any amount is harmless',
        },
        {
          vi: 'BaSO₄ rất ít tan; nhiều muối bari tan có độc tính khác',
          en: 'BaSO₄ is very insoluble; many soluble barium salts have different toxicity',
        },
      ],
      answer: 3,
    },
    {
      id: 'everyday-015',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Ở diêm an toàn, photpho đỏ thường nằm ở đâu?',
        en: 'Where is red phosphorus normally located in a safety match system?',
      },
      explain: {
        vi: 'Ở diêm an toàn thông thường, photpho đỏ nằm trên bề mặt quẹt. Không đồng nhất cách bố trí này với các loại diêm khác, với phần gỗ hoặc với sản phẩm sinh ra sau cháy.',
        en: 'In an ordinary safety match, red phosphorus is on the striking surface. Do not confuse this arrangement with other match types, the wooden stick or combustion products.',
      },
      elements: ['P'],
      source: 'https://periodic-table.rsc.org/element/15/phosphorus',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Trộn vào toàn bộ gỗ của que diêm',
          en: 'Mixed throughout the wooden stick',
        },
        {
          vi: 'Trong đầu diêm thay vì mặt quẹt ở diêm an toàn thông thường',
          en: 'In the match head rather than the striker of an ordinary safety match',
        },
        {
          vi: 'Trên bề mặt quẹt của hộp',
          en: 'On the striking surface of the box',
        },
        {
          vi: 'Chỉ được tạo ra sau khi que diêm cháy',
          en: 'Formed only after the match burns',
        },
      ],
      answer: 2,
    },
    {
      id: 'everyday-016',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Crom giúp thép không gỉ chống ăn mòn chủ yếu bằng cơ chế nào?',
        en: 'How does chromium mainly help stainless steel resist corrosion?',
      },
      explain: {
        vi: 'Lớp thụ động giàu oxit crom giúp hạn chế ăn mòn. Thép vẫn có thể bị ăn mòn trong điều kiện phù hợp; cơ chế không phải loại hết sắt hay giữ bề mặt hoàn toàn không có oxit.',
        en: 'A chromium-rich passive oxide film limits corrosion. Steel can still corrode under suitable conditions; protection does not come from removing iron or keeping an oxide-free surface.',
      },
      elements: ['Cr', 'Fe', 'O'],
      source: 'https://periodic-table.rsc.org/element/24/chromium',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Crom hoàn toàn ngăn thép tiếp xúc mọi hoá chất',
          en: 'Chromium makes steel immune to every chemical',
        },
        {
          vi: 'Tạo lớp bảo vệ giàu oxit crom',
          en: 'Forms a protective chromium-rich oxide film',
        },
        {
          vi: 'Chỉ pha loãng sắt nên không còn khả năng bị oxi hoá',
          en: 'It only dilutes iron until oxidation is impossible',
        },
        {
          vi: 'Crom luôn giữ bề mặt ở dạng kim loại không có oxit',
          en: 'It always keeps the surface oxide-free',
        },
      ],
      answer: 1,
    },
    {
      id: 'everyday-017',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Lấy Ca = 40, C = 12, O = 16. Khối lượng mol CaCO₃ là bao nhiêu g/mol?',
        en: 'Using Ca = 40, C = 12 and O = 16, what is CaCO₃’s molar mass in g/mol?',
      },
      explain: {
        vi: 'Cộng 40 + 12 + 3 × 16 = 100 g/mol. Chỉ số 3 chỉ nhân phần oxi.',
        en: 'Add 40 + 12 + 3 × 16 = 100 g/mol. The subscript 3 applies only to oxygen.',
      },
      elements: ['Ca', 'C', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/Calcium-carbonate',
      equations: [],
      type: 'number',
      answer: 100,
      tolerance: 0,
      calculation: {
        kind: 'molar-mass',
        formula: 'CaCO3',
        masses: {
          Ca: 40,
          C: 12,
          O: 16,
        },
      },
      unit: 'g/mol',
    },
    {
      id: 'everyday-018',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Một đơn vị công thức baking soda NaHCO₃ chứa bao nhiêu nguyên tử O tương ứng?',
        en: 'How many O atoms correspond to one formula unit of baking soda, NaHCO₃?',
      },
      explain: {
        vi: 'Chỉ số 3 đứng sau O; Na, H và C mỗi nguyên tố có chỉ số ngầm định là 1.',
        en: 'The 3 subscript belongs to O; Na, H and C each have an implied subscript of one.',
      },
      elements: ['Na', 'H', 'C', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/Sodium-bicarbonate',
      equations: [],
      type: 'number',
      answer: 3,
      tolerance: 0,
      calculation: {
        kind: 'atom-count',
        formula: 'NaHCO3',
        element: 'O',
      },
    },
    {
      id: 'everyday-019',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Một mái đồng chuyển xanh sau thời gian dài. Cách giải thích phù hợp là gì?',
        en: 'A copper roof turns green over time. Which explanation fits?',
      },
      explain: {
        vi: 'Lớp màu hình thành từ các hợp chất đồng khi bề mặt tương tác môi trường; thành phần phụ thuộc điều kiện. Không phải màu vốn có của Cu, không cần nóng chảy và không thể mặc định mọi lớp xanh là CuO.',
        en: 'Environmental reaction forms copper compounds whose composition depends on conditions. Green is not elemental copper’s colour, does not require melting and cannot always be assigned to pure CuO.',
      },
      elements: ['Cu'],
      source: 'https://periodic-table.rsc.org/element/29/copper',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Đồng nguyên chất vốn luôn xanh',
          en: 'Pure copper is always green',
        },
        {
          vi: 'Đồng chỉ nóng chảy rồi đông lại thành màu xanh',
          en: 'Copper merely melts and freezes green',
        },
        {
          vi: 'Bề mặt tạo các hợp chất đồng mới khi tương tác môi trường',
          en: 'New copper compounds form on the surface in the environment',
        },
        {
          vi: 'Màu xanh luôn là CuO nguyên chất',
          en: 'The green layer is always pure CuO',
        },
      ],
      answer: 2,
    },
    {
      id: 'everyday-020',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Chọn các nhận định đúng khi liên hệ hoá học với đồ dùng.',
        en: 'Select the correct statements about everyday chemistry.',
      },
      explain: {
        vi: 'Cần xét chất cụ thể, trạng thái và điều kiện. Nguồn gốc tự nhiên hay việc có chung nguyên tố không đủ quyết định tính chất hoặc độc tính.',
        en: 'Specific substance, form and conditions matter. Natural origin or a shared element does not determine properties or toxicity.',
      },
      elements: ['Na', 'C', 'H', 'O'],
      source: 'https://pubchem.ncbi.nlm.nih.gov/compound/Sodium-bicarbonate',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'Muối ăn là hợp chất, không phải Na kim loại',
          en: 'Table salt is a compound, not sodium metal',
        },
        {
          vi: 'Baking soda có thể tạo CO₂ khi gặp axit phù hợp',
          en: 'Baking soda can release CO₂ with a suitable acid',
        },
        {
          vi: 'Mọi chất có nguồn gốc tự nhiên đều không độc',
          en: 'Every natural substance is non-toxic',
        },
        {
          vi: 'Đồ chứa cùng nguyên tố luôn có tính chất như nhau',
          en: 'All materials containing one element have identical properties',
        },
      ],
      answer: [0, 1],
    },
  ],
});

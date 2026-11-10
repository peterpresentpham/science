import { defineQuiz } from '../../src/quiz.ts';

/** Câu hỏi tự biên soạn theo GDPT 2018; nguồn SGV Kết nối tri thức, giải thích sau đáp án. */
export default defineQuiz({
  id: 'chemical-bond',
  title: {
    vi: 'Liên kết hoá học',
    en: 'Chemical bonding',
  },
  questions: [
    {
      id: 'chemical-bond-001',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Liên kết ion là lực hút giữa các tiểu phân nào?',
        en: 'Which species attract each other in ionic bonding?',
      },
      explain: {
        vi: 'Liên kết ion là lực hút tĩnh điện giữa ion trái dấu. Ion cùng dấu đẩy nhau; dùng chung electron gắn với liên kết cộng hoá trị, còn electron giải toả trong mạng kim loại thuộc mô hình liên kết kim loại.',
        en: 'Ionic bonding attracts opposite charges; like charges repel. Shared pairs describe covalent bonding, while delocalised electrons in a metal lattice belong to metallic bonding.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Các ion trái dấu',
          en: 'Oppositely charged ions',
        },
        {
          vi: 'Các ion cùng dấu',
          en: 'Like-charged ions',
        },
        {
          vi: 'Các hạt nhân và cặp electron dùng chung',
          en: 'Nuclei and shared electron pairs',
        },
        {
          vi: 'Ion dương kim loại và electron giải toả',
          en: 'Positive metal ions and delocalised electrons',
        },
      ],
      answer: 0,
    },
    {
      id: 'chemical-bond-002',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Liên kết cộng hoá trị hình thành chủ yếu bằng cách nào?',
        en: 'How does a covalent bond mainly form?',
      },
      explain: {
        vi: 'Liên kết cộng hoá trị dùng chung electron giữa nguyên tử. Chuyển electron và hút ion thuộc mô hình ion; không phải dùng chung proton hay chỉ là lực giữa các phân tử.',
        en: 'Covalent bonding shares electrons between atoms. Electron transfer and ion attraction describe the ionic model; protons are not shared, and intermolecular attraction is a different level of interaction.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Chỉ chuyển electron rồi hút nhau giữa ion',
          en: 'Only electron transfer followed by ion attraction',
        },
        {
          vi: 'Dùng chung proton giữa các hạt nhân',
          en: 'Sharing protons between nuclei',
        },
        {
          vi: 'Chỉ hút nhau giữa các phân tử đã bền',
          en: 'Only attraction between already stable molecules',
        },
        {
          vi: 'Dùng chung electron',
          en: 'Sharing electrons',
        },
      ],
      answer: 3,
    },
    {
      id: 'chemical-bond-003',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Mô tả nào phù hợp với NaCl rắn?',
        en: 'Which description fits solid NaCl?',
      },
      explain: {
        vi: 'NaCl rắn là mạng ion Na⁺ và Cl⁻, không phải tập hợp các phân tử tách rời. Các ion mang điện tích một đơn vị, không phải hai; đơn chất Na và Cl₂ cũng không còn giữ nguyên trong muối.',
        en: 'Solid NaCl forms a Na⁺/Cl⁻ lattice rather than separate molecules. The ions have unit charges, not double charges; sodium metal and chlorine molecules do not remain as such in the salt.',
      },
      elements: ['Na', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Các phân tử NaCl riêng rẽ như H₂O',
          en: 'Separate NaCl molecules like H₂O',
        },
        {
          vi: 'Mạng Na trung hoà xen các phân tử Cl₂',
          en: 'Neutral Na atoms alternating with Cl₂ molecules',
        },
        {
          vi: 'Mạng gồm Na⁺ và Cl⁻',
          en: 'A lattice of Na⁺ and Cl⁻',
        },
        {
          vi: 'Mạng ion Na²⁺ và Cl²⁻',
          en: 'A lattice of Na²⁺ and Cl²⁻ ions',
        },
      ],
      answer: 2,
    },
    {
      id: 'chemical-bond-004',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Liên kết trong H₂ được phân loại thế nào?',
        en: 'How is the bond in H₂ classified?',
      },
      explain: {
        vi: 'Hai nguyên tử H có độ âm điện như nhau nên cặp electron được chia đều theo đối xứng.',
        en: 'The identical H atoms have equal electronegativity, giving symmetric electron sharing.',
      },
      elements: ['H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Liên kết hydrogen',
          en: 'Hydrogen bonding',
        },
        {
          vi: 'Cộng hoá trị không phân cực',
          en: 'Nonpolar covalent',
        },
        {
          vi: 'Cộng hoá trị phân cực',
          en: 'Polar covalent',
        },
        {
          vi: 'Ion',
          en: 'Ionic',
        },
      ],
      answer: 1,
    },
    {
      id: 'chemical-bond-005',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Liên kết H–Cl thuộc loại nào?',
        en: 'What kind of bond is H–Cl?',
      },
      explain: {
        vi: 'Cl hút cặp electron chung mạnh hơn H. Đây vẫn là liên kết trong phân tử, không phải liên kết hydrogen giữa các phân tử.',
        en: 'Cl attracts the shared electrons more strongly than H. This is an intramolecular bond, not intermolecular hydrogen bonding.',
      },
      elements: ['H', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cộng hoá trị phân cực',
          en: 'Polar covalent',
        },
        {
          vi: 'Cộng hoá trị không phân cực',
          en: 'Nonpolar covalent',
        },
        {
          vi: 'Kim loại',
          en: 'Metallic',
        },
        {
          vi: 'Hydrogen giữa hai phân tử',
          en: 'Intermolecular hydrogen bonding',
        },
      ],
      answer: 0,
    },
    {
      id: 'chemical-bond-006',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Mô hình Lewis đơn giản của O₂ có bao nhiêu cặp electron liên kết?',
        en: 'How many bonding electron pairs occur in a simple Lewis model of O₂?',
      },
      explain: {
        vi: 'Liên kết đôi O=O có hai cặp electron liên kết. Cặp electron không liên kết không được cộng vào số này.',
        en: 'The O=O double bond has two bonding pairs; lone pairs are not included.',
      },
      elements: ['O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: '1',
          en: '1',
        },
        {
          vi: '3',
          en: '3',
        },
        {
          vi: '4',
          en: '4',
        },
        {
          vi: '2',
          en: '2',
        },
      ],
      answer: 3,
    },
    {
      id: 'chemical-bond-007',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Trong mô hình Lewis của N₂, hai nguyên tử nối với nhau bằng liên kết nào?',
        en: 'In a Lewis model of N₂, what joins the atoms?',
      },
      explain: {
        vi: 'N≡N biểu diễn ba cặp electron chung. Không đếm các cặp electron riêng là liên kết.',
        en: 'N≡N represents three shared pairs. Lone pairs are not additional bonds.',
      },
      elements: ['N'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Liên kết đôi',
          en: 'A double bond',
        },
        {
          vi: 'Liên kết ion',
          en: 'An ionic bond',
        },
        {
          vi: 'Liên kết ba',
          en: 'A triple bond',
        },
        {
          vi: 'Liên kết đơn',
          en: 'A single bond',
        },
      ],
      answer: 2,
    },
    {
      id: 'chemical-bond-008',
      grade: 10,
      difficulty: 1,
      q: {
        vi: 'Quy tắc octet mô tả xu hướng nào?',
        en: 'What tendency does the octet rule describe?',
      },
      explain: {
        vi: 'Octet nói về xu hướng có tám electron lớp ngoài cùng trong nhiều trường hợp, không phải tổng electron hay số electron phải nhận. Có ngoại lệ như H đạt hai electron, nên không phải luật tuyệt đối.',
        en: 'The octet rule concerns eight valence-shell electrons in many cases, not total electrons or eight added electrons. Exceptions such as hydrogen’s duet prevent an absolute rule.',
      },
      elements: ['H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Mọi nguyên tử đều cần nhận thêm 8 electron',
          en: 'Every atom must gain eight more electrons',
        },
        {
          vi: 'Đạt lớp ngoài cùng 8 electron trong nhiều trường hợp',
          en: 'An eight-electron valence shell in many cases',
        },
        {
          vi: 'Mọi nguyên tử đều có tổng cộng 8 electron',
          en: 'Every atom has eight electrons in total',
        },
        {
          vi: 'Không nguyên tử nào có thể vượt hoặc thiếu octet',
          en: 'No atom can exceed or fall short of an octet',
        },
      ],
      answer: 1,
    },
    {
      id: 'chemical-bond-009',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Vì sao công thức magie clorua là MgCl₂?',
        en: 'Why is magnesium chloride written MgCl₂?',
      },
      explain: {
        vi: 'Mg²⁺ cần hai Cl⁻ để tổng điện tích bằng 0. Chỉ số 2 đếm ion chloride trong đơn vị công thức, không phải electron; tỉ lệ ion do điện tích chứ không do khối lượng nguyên tử.',
        en: 'One Mg²⁺ needs two Cl⁻ for neutrality. The subscript counts chloride ions, not electrons, and charge balance rather than atomic mass determines the ratio.',
      },
      elements: ['Mg', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Một Mg²⁺ cần hai Cl⁻ để trung hoà điện',
          en: 'One Mg²⁺ needs two Cl⁻ for charge neutrality',
        },
        {
          vi: 'Mỗi ion Cl⁻ mang điện tích −2',
          en: 'Each Cl⁻ has charge −2',
        },
        {
          vi: 'Chỉ số 2 là số electron Mg còn lại',
          en: 'The subscript 2 counts electrons left in Mg',
        },
        {
          vi: 'Tỉ lệ phải chọn theo khối lượng hai nguyên tố',
          en: 'The ratio must follow the elements’ masses',
        },
      ],
      answer: 0,
    },
    {
      id: 'chemical-bond-010',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Vì sao phân tử H₂O có tính phân cực?',
        en: 'Why is an H₂O molecule polar?',
      },
      explain: {
        vi: 'Hình gấp khúc làm các moment liên kết không triệt tiêu. Không thể suy độ phân cực phân tử chỉ từ việc có H.',
        en: 'The bent geometry prevents bond dipoles from cancelling. Merely containing H does not establish molecular polarity.',
      },
      elements: ['H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Mọi phân tử có H đều phân cực',
          en: 'Every H-containing molecule is polar',
        },
        {
          vi: 'Nước gồm ion H⁺ và O²⁻ rời rạc',
          en: 'Water consists of separate H⁺ and O²⁻ ions',
        },
        {
          vi: 'Hai liên kết phân cực luôn triệt tiêu nhau',
          en: 'Two polar bonds always cancel',
        },
        {
          vi: 'Liên kết O–H phân cực và phân tử gấp khúc',
          en: 'Polar O–H bonds and a bent shape',
        },
      ],
      answer: 3,
    },
    {
      id: 'chemical-bond-011',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'CO₂ có hai liên kết C=O phân cực. Vì sao phân tử không phân cực?',
        en: 'CO₂ has two polar C=O bonds. Why is the molecule nonpolar?',
      },
      explain: {
        vi: 'Phân cực liên kết và phân cực toàn phân tử là hai việc khác nhau; cần xét cả hình học.',
        en: 'Bond polarity and overall molecular polarity differ; molecular geometry must also be considered.',
      },
      elements: ['C', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/7-6-molecular-structure-and-polarity',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Liên kết đôi luôn không phân cực',
          en: 'Double bonds are always nonpolar',
        },
        {
          vi: 'CO₂ là tinh thể ion',
          en: 'CO₂ is an ionic crystal',
        },
        {
          vi: 'Dạng thẳng đối xứng làm các moment triệt tiêu',
          en: 'Its symmetric linear shape cancels the dipoles',
        },
        {
          vi: 'C và O có độ âm điện bằng nhau',
          en: 'C and O have equal electronegativity',
        },
      ],
      answer: 2,
    },
    {
      id: 'chemical-bond-012',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Vì sao NaCl nóng chảy dẫn điện còn tinh thể rắn không dẫn tốt?',
        en: 'Why does molten NaCl conduct while the solid crystal does not conduct well?',
      },
      explain: {
        vi: 'NaCl có ion ở cả hai trạng thái. Trong tinh thể, ion bị giữ tại vị trí mạng; khi nóng chảy chúng chuyển động và tải điện. Nóng chảy không phải sự khử Na⁺, và hạt tải điện ở đây là ion chứ không phải electron tự do như trong kim loại.',
        en: 'Ions exist in both states but are fixed in the crystal and mobile in the melt. Melting does not reduce Na⁺, and ions rather than metal-like free electrons carry charge.',
      },
      elements: ['Na', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Chỉ khi nóng chảy NaCl mới có ion',
          en: 'NaCl contains ions only after melting',
        },
        {
          vi: 'Ion trong chất lỏng có thể chuyển động',
          en: 'Ions become mobile in the liquid',
        },
        {
          vi: 'Electron tự do là hạt tải điện chính trong cả hai trạng thái',
          en: 'Free electrons carry charge in both states',
        },
        {
          vi: 'Nóng chảy làm Na⁺ thành Na kim loại',
          en: 'Melting converts Na⁺ into sodium metal',
        },
      ],
      answer: 1,
    },
    {
      id: 'chemical-bond-013',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Kim cương được mô tả đúng nhất bằng mô hình nào?',
        en: 'Which model best describes diamond?',
      },
      explain: {
        vi: 'Kim cương là mạng cộng hoá trị ba chiều mở rộng. Nó không gồm phân tử C₄ hay cặp ion cacbon, và cấu trúc lớp là đặc trưng của than chì chứ không phải kim cương.',
        en: 'Diamond has an extended three-dimensional covalent network, not C₄ molecules or carbon ions. A layered structure describes graphite instead.',
      },
      elements: ['C'],
      source: 'https://periodic-table.rsc.org/element/6/carbon',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Mạng cộng hoá trị mở rộng',
          en: 'An extended covalent network',
        },
        {
          vi: 'Các phân tử C₄ tách rời',
          en: 'Separate C₄ molecules',
        },
        {
          vi: 'Mạng ion C⁴⁺ và C⁴⁻',
          en: 'A C⁴⁺/C⁴⁻ ionic lattice',
        },
        {
          vi: 'Các lớp phẳng liên kết yếu với nhau như than chì',
          en: 'Weakly connected planar layers as in graphite',
        },
      ],
      answer: 0,
    },
    {
      id: 'chemical-bond-014',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Than chì dẫn điện được liên hệ với đặc điểm nào?',
        en: 'Which feature helps explain graphite’s electrical conductivity?',
      },
      explain: {
        vi: 'Than chì có electron giải toả có thể chuyển động trong các lớp. Không cần nóng chảy; hạt tải điện không phải C⁴⁺. Mô hình bốn liên kết trong mạng ba chiều phù hợp kim cương hơn.',
        en: 'Graphite has delocalised electrons mobile within its layers without melting. C⁴⁺ ions are not the carriers; a four-bond three-dimensional network describes diamond.',
      },
      elements: ['C'],
      source: 'https://periodic-table.rsc.org/element/6/carbon',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Các ion C⁴⁺ di chuyển tự do trong tinh thể',
          en: 'C⁴⁺ ions move freely through the crystal',
        },
        {
          vi: 'Mỗi nguyên tử C tạo bốn liên kết như kim cương',
          en: 'Every C forms four bonds as in diamond',
        },
        {
          vi: 'Electron chỉ chuyển động được khi than chì nóng chảy',
          en: 'Electrons move only after graphite melts',
        },
        {
          vi: 'Electron có thể chuyển động trong các lớp',
          en: 'Mobile electrons within its layers',
        },
      ],
      answer: 3,
    },
    {
      id: 'chemical-bond-015',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Loại tương tác nào góp phần làm nhiệt độ sôi của HF cao hơn HCl?',
        en: 'Which interaction helps HF boil at a higher temperature than HCl?',
      },
      explain: {
        vi: 'HF có thể tạo liên kết hydrogen giữa các phân tử. Không nhầm tương tác này với liên kết H–F bên trong phân tử.',
        en: 'HF forms intermolecular hydrogen bonds, which must be distinguished from its intramolecular H–F bond.',
      },
      elements: ['H', 'F', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Hạt nhân F nặng hơn hạt nhân Cl',
          en: 'F nuclei are heavier than Cl nuclei',
        },
        {
          vi: 'HF không có liên kết cộng hoá trị',
          en: 'HF has no covalent bond',
        },
        {
          vi: 'Liên kết hydrogen giữa các phân tử HF',
          en: 'Hydrogen bonding between HF molecules',
        },
        {
          vi: 'Liên kết ion H⁺–F⁻ trong mọi phân tử',
          en: 'An ionic H⁺–F⁻ bond in every molecule',
        },
      ],
      answer: 2,
    },
    {
      id: 'chemical-bond-016',
      grade: 10,
      difficulty: 2,
      q: {
        vi: 'Những chất nào tạo liên kết hydrogen đáng kể giữa các phân tử cùng loại?',
        en: 'Which substances form significant hydrogen bonding between their own molecules?',
      },
      explain: {
        vi: 'H liên kết với O hoặc N cho phép H₂O và NH₃ tạo tương tác hydrogen. CH₄ và HCl không đáp ứng mô hình phổ thông này.',
        en: 'H bonded to O or N enables hydrogen bonding in water and ammonia. CH₄ and HCl do not meet this school-level model.',
      },
      elements: ['H', 'O', 'N', 'C', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'multi',
      options: [
        {
          vi: 'H₂O',
          en: 'H₂O',
        },
        {
          vi: 'CH₄',
          en: 'CH₄',
        },
        {
          vi: 'NH₃',
          en: 'NH₃',
        },
        {
          vi: 'HCl',
          en: 'HCl',
        },
      ],
      answer: [0, 2],
    },
    {
      id: 'chemical-bond-017',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Một phân tử AB₂ có hai liên kết phân cực bằng nhau. Cần biết thêm gì để kết luận phân cực toàn phân tử?',
        en: 'An AB₂ molecule has two equally polar bonds. What else is needed to decide its overall polarity?',
      },
      explain: {
        vi: 'Đã biết các liên kết phân cực nhưng vẫn cần hình học để cộng các moment. Hai liên kết giống nhau có thể triệt tiêu ở dạng thẳng đối xứng nhưng không ở dạng gấp khúc; các con số riêng lẻ không cho hướng.',
        en: 'Geometry determines how bond dipoles add: equal dipoles can cancel in a symmetric linear molecule but not a bent one. Electronegativity or electron counts alone do not give their directions.',
      },
      elements: [],
      source: 'https://openstax.org/books/chemistry-2e/pages/7-6-molecular-structure-and-polarity',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Hình học phân tử',
          en: 'Molecular geometry',
        },
        {
          vi: 'Chỉ hiệu độ âm điện của A và B',
          en: 'Only the electronegativity difference',
        },
        {
          vi: 'Chỉ số cặp electron trong mỗi liên kết',
          en: 'Only electron-pair counts in each bond',
        },
        {
          vi: 'Chỉ tổng số electron trong phân tử',
          en: 'Only the molecule’s total electron count',
        },
      ],
      answer: 0,
    },
    {
      id: 'chemical-bond-018',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Trong HCl, nói “Cl hút electron mạnh hơn” có nghĩa đúng nhất là gì?',
        en: 'In HCl, what does “Cl attracts electrons more strongly” mean?',
      },
      explain: {
        vi: 'Cl có độ âm điện lớn hơn nên mật độ electron chung lệch về Cl, vẫn là liên kết cộng hoá trị phân cực. Không chia đều như H₂, không coi HCl phân tử là sự chuyển hoàn toàn electron, và độ âm điện nói về electron liên kết.',
        en: 'Greater chlorine electronegativity shifts the shared pair towards Cl. Sharing is unequal but not a complete transfer in molecular HCl; electronegativity concerns bonding electrons.',
      },
      elements: ['H', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Cặp electron chuyển hẳn sang Cl trong mọi phân tử HCl',
          en: 'The pair transfers completely to Cl in every HCl molecule',
        },
        {
          vi: 'Cặp electron luôn nằm chính giữa H và Cl',
          en: 'The pair always lies midway between H and Cl',
        },
        {
          vi: 'Cl chỉ hút electron không tham gia liên kết',
          en: 'Cl attracts only electrons outside the bond',
        },
        {
          vi: 'Mật độ cặp electron chung lệch về Cl',
          en: 'Shared-electron density is biased toward Cl',
        },
      ],
      answer: 3,
    },
    {
      id: 'chemical-bond-019',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Một đơn vị công thức MgCl₂ có bao nhiêu nguyên tử clo tương ứng?',
        en: 'How many chlorine atoms correspond to one MgCl₂ formula unit?',
      },
      explain: {
        vi: 'Chỉ số 2 cho hai Cl ứng với một Mg. Trong tinh thể ion, đây là tỉ lệ công thức, không phải một phân tử độc lập.',
        en: 'The subscript gives two Cl per Mg. In an ionic solid this is a formula ratio, not a separate molecule.',
      },
      elements: ['Mg', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'number',
      answer: 2,
      tolerance: 0,
      calculation: {
        kind: 'atom-count',
        formula: 'MgCl2',
        element: 'Cl',
      },
    },
    {
      id: 'chemical-bond-020',
      grade: 10,
      difficulty: 3,
      q: {
        vi: 'Trong một phản ứng, phá vỡ liên kết ở chất đầu cần năng lượng. Năng lượng toả ra đến từ đâu?',
        en: 'Breaking reactant bonds requires energy. Where does released reaction energy come from?',
      },
      explain: {
        vi: 'Phá liên kết cần năng lượng, tạo liên kết giải phóng năng lượng. Phản ứng toả nhiệt khi phần giải phóng lớn hơn phần cần vào; phải xét năng lượng từng loại liên kết chứ không chỉ đếm số lượng.',
        en: 'Breaking costs energy and forming bonds releases it. Net release requires the latter to exceed the former; bond strengths matter, not merely counts.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      equations: [],
      type: 'single',
      options: [
        {
          vi: 'Mọi liên kết ở chất đầu bị phá đều giải phóng nhiệt',
          en: 'Breaking every reactant bond releases heat',
        },
        {
          vi: 'Hình thành liên kết sản phẩm giải phóng nhiều năng lượng hơn phần đã dùng',
          en: 'Product bond formation releases more energy than was consumed',
        },
        {
          vi: 'Chỉ cần tổng số liên kết sản phẩm nhiều hơn là đủ',
          en: 'More product bonds alone always guarantees heat release',
        },
        {
          vi: 'Phá và tạo liên kết đều cần năng lượng nên không thể toả nhiệt',
          en: 'Breaking and forming bonds both require energy, so heat release is impossible',
        },
      ],
      answer: 1,
    },
  ],
});

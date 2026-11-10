import { defineTimeline } from '../src/timeline.ts';

/** Các mốc ngoài lần phát hiện từng nguyên tố; năm là năm sự kiện, không phải năm trao giải trừ khi tiêu đề nói về giải thưởng. */
export default defineTimeline([
  {
    id: 'lavoisier-classification',
    year: 1789,
    title: {
      vi: 'Lavoisier phân loại nguyên tố',
      en: 'Lavoisier classifies elements',
    },
    text: {
      vi: 'Ông nhóm các chất được xem là nguyên tố theo tính chất, một bước trước hệ thống tuần hoàn.',
      en: 'He grouped substances regarded as elements by their properties, a step toward periodic classification.',
    },
    kind: 'table',
    source: 'https://periodic-table.rsc.org/history/about',
    elements: [],
  },
  {
    id: 'dalton-atomic-theory',
    year: 1803,
    title: {
      vi: 'Dalton trình bày ý tưởng nguyên tử',
      en: 'Dalton presents his atomic theory',
    },
    text: {
      vi: 'Dalton gắn thành phần chất với các nguyên tử và khối lượng tương đối của chúng.',
      en: 'Dalton connected chemical composition with atoms and their relative masses.',
    },
    kind: 'theory',
    source:
      'https://royalsociety.org/about-us/who-we-are/diversity-inclusion/case-studies/scientists-with-disabilities/john-dalton/',
    elements: [],
  },
  {
    id: 'avogadro-hypothesis',
    year: 1811,
    title: {
      vi: 'Giả thuyết Avogadro',
      en: 'Avogadro’s hypothesis',
    },
    text: {
      vi: 'Các thể tích khí bằng nhau ở cùng nhiệt độ, áp suất có cùng số phân tử. Ý tưởng giúp phân biệt nguyên tử với phân tử.',
      en: 'Equal gas volumes at the same temperature and pressure contain equal numbers of molecules, helping separate atoms from molecules.',
    },
    kind: 'theory',
    source:
      'https://www.nist.gov/si-redefinition/kilogram/kilogram-silicon-spheres-and-international-avogadro-project',
    elements: [],
  },
  {
    id: 'dobereiner-triads',
    year: 1829,
    title: {
      vi: 'Các bộ ba Döbereiner',
      en: 'Döbereiner’s triads',
    },
    text: {
      vi: 'Những nhóm như Li–Na–K cho thấy tính chất các nguyên tố có thể liên hệ với nhau.',
      en: 'Groups such as Li–Na–K revealed relationships between elemental properties.',
    },
    kind: 'table',
    source: 'https://periodic-table.rsc.org/history/about',
    elements: ['Li', 'Na', 'K'],
  },
  {
    id: 'karlsruhe-congress',
    year: 1860,
    title: {
      vi: 'Hội nghị Karlsruhe',
      en: 'The Karlsruhe congress',
    },
    text: {
      vi: 'Việc làm rõ khối lượng nguyên tử giúp các nhà hoá học so sánh nguyên tố trên cơ sở nhất quán hơn.',
      en: 'Clarifying atomic weights gave chemists a more consistent basis for comparing elements.',
    },
    kind: 'theory',
    source: 'https://periodic-table.rsc.org/history/about',
    elements: [],
  },
  {
    id: 'telluric-screw',
    year: 1862,
    title: {
      vi: 'Sắp nguyên tố trên hình trụ',
      en: 'The telluric screw',
    },
    text: {
      vi: 'De Chancourtois xếp nguyên tố theo khối lượng nguyên tử trên một hình trụ, để lộ các tính chất lặp lại.',
      en: 'De Chancourtois arranged atomic weights around a cylinder, revealing recurring properties.',
    },
    kind: 'table',
    source: 'https://periodic-table.rsc.org/history/about',
    elements: [],
  },
  {
    id: 'newlands-octaves',
    year: 1865,
    title: {
      vi: 'Định luật quãng tám',
      en: 'The law of octaves',
    },
    text: {
      vi: 'Newlands nhận ra tính chất lặp lại khi xếp nguyên tố theo khối lượng. Cách xếp chưa dành chỗ cho nguyên tố chưa biết.',
      en: 'Newlands noticed recurring properties in an atomic-weight sequence, but left no gaps for unknown elements.',
    },
    kind: 'table',
    source: 'https://periodic-table.rsc.org/history/about',
    elements: [],
  },
  {
    id: 'mendeleev-table',
    year: 1869,
    title: {
      vi: 'Bảng tuần hoàn Mendeleev',
      en: 'Mendeleev’s periodic table',
    },
    text: {
      vi: 'Mendeleev để ô trống và dự đoán tính chất nguyên tố chưa biết, thay vì ép mọi chất vào một thứ tự cứng nhắc.',
      en: 'Mendeleev left gaps and predicted unknown elements instead of forcing every entry into a rigid sequence.',
    },
    kind: 'table',
    source: 'https://periodic-table.rsc.org/history/about',
    elements: ['Ga', 'Ge', 'Sc'],
  },
  {
    id: 'meyer-periodicity',
    year: 1870,
    title: {
      vi: 'Meyer công bố hệ thống tuần hoàn',
      en: 'Meyer publishes a periodic system',
    },
    text: {
      vi: 'Bảng và đồ thị thể tích nguyên tử của Meyer làm rõ sự biến đổi tuần hoàn của tính chất.',
      en: 'Meyer’s table and atomic-volume graph clarified periodic changes in properties.',
    },
    kind: 'table',
    source: 'https://periodic-table.rsc.org/history/about',
    elements: [],
  },
  {
    id: 'hall-aluminium',
    year: 1886,
    title: {
      vi: 'Điện phân nhôm trong criolit',
      en: 'Aluminium electrolysis in cryolite',
    },
    text: {
      vi: 'Quy trình Hall giúp nhôm từ kim loại hiếm trở thành vật liệu sản xuất quy mô lớn.',
      en: 'Hall’s process helped transform aluminium from a scarce metal into a mass-produced material.',
    },
    kind: 'industry',
    source: 'https://www.acs.org/education/whatischemistry/landmarks/aluminumprocess.html',
    elements: ['Al'],
  },
  {
    id: 'dow-bromine',
    year: 1891,
    title: {
      vi: 'Điện hoá đi vào sản xuất brom',
      en: 'Electrochemistry produces bromine',
    },
    text: {
      vi: 'Dow dùng điện hoá để thu brom từ nước muối, một ví dụ kết nối thí nghiệm với sản xuất.',
      en: 'Dow used electrochemistry to recover bromine from brine, linking laboratory chemistry with manufacturing.',
    },
    kind: 'industry',
    source: 'https://www.acs.org/education/whatischemistry/landmarks/bromineproduction.html',
    elements: ['Br'],
  },
  {
    id: 'willson-carbide',
    year: 1892,
    title: {
      vi: 'Lò hồ quang và canxi cacbua',
      en: 'The electric arc and calcium carbide',
    },
    text: {
      vi: 'Willson tìm ra cách sản xuất canxi cacbua; chất này tạo axetilen khi phản ứng với nước.',
      en: 'Willson developed calcium carbide production; the compound yields acetylene on reaction with water.',
    },
    kind: 'industry',
    source: 'https://www.acs.org/education/whatischemistry/landmarks/calciumcarbideacetylene.html',
    elements: ['Ca', 'C'],
  },
  {
    id: 'rontgen-xrays',
    year: 1895,
    title: {
      vi: 'Röntgen phát hiện tia X',
      en: 'Röntgen discovers X-rays',
    },
    text: {
      vi: 'Một loại bức xạ mới cho phép quan sát bên trong vật thể và về sau góp phần nghiên cứu cấu trúc vật chất.',
      en: 'A new radiation enabled views inside objects and later helped investigate the structure of matter.',
    },
    kind: 'discovery-method',
    source: 'https://www.nobelprize.org/prizes/physics/1901/rontgen/facts/',
    elements: [],
  },
  {
    id: 'becquerel-radioactivity',
    year: 1896,
    title: {
      vi: 'Becquerel nhận ra phóng xạ',
      en: 'Becquerel identifies radioactivity',
    },
    text: {
      vi: 'Muối urani phát bức xạ mà không cần chiếu sáng trước, mở ra nghiên cứu sự biến đổi của hạt nhân.',
      en: 'Uranium salts emitted radiation without prior illumination, opening a route toward studying nuclear change.',
    },
    kind: 'discovery-method',
    source: 'https://www.nobelprize.org/prizes/physics/1903/becquerel/facts/',
    elements: ['U'],
  },
  {
    id: 'thomson-electron',
    year: 1897,
    title: {
      vi: 'Tia âm cực hé lộ electron',
      en: 'Cathode rays reveal electrons',
    },
    text: {
      vi: 'Thomson cho thấy tia âm cực chứa hạt mang điện âm: nguyên tử không phải khối không thể chia nhỏ.',
      en: 'Thomson showed that cathode rays contain negatively charged particles: atoms were not indivisible blocks.',
    },
    kind: 'atom-model',
    source: 'https://www.nobelprize.org/prizes/physics/1906/thomson/facts/',
    elements: [],
  },
  {
    id: 'planck-quanta',
    year: 1900,
    title: {
      vi: 'Planck và lượng tử năng lượng',
      en: 'Planck and energy quanta',
    },
    text: {
      vi: 'Planck giải thích bức xạ bằng các phần năng lượng rời rạc, đặt nền cho lí thuyết lượng tử.',
      en: 'Planck explained radiation using discrete energy portions, laying groundwork for quantum theory.',
    },
    kind: 'theory',
    source: 'https://www.nobelprize.org/prizes/physics/1918/planck/facts/',
    elements: [],
  },
  {
    id: 'einstein-light-quanta',
    year: 1905,
    title: {
      vi: 'Ánh sáng cũng có tính hạt',
      en: 'Light also has particle properties',
    },
    text: {
      vi: 'Einstein dùng lượng tử ánh sáng để giải thích hiệu ứng quang điện.',
      en: 'Einstein used light quanta to explain the photoelectric effect.',
    },
    kind: 'theory',
    source: 'https://www.nobelprize.org/prizes/physics/1921/einstein/facts/',
    elements: [],
  },
  {
    id: 'haber-ammonia',
    year: 1909,
    title: {
      vi: 'Tổng hợp amoniac trong phòng thí nghiệm',
      en: 'Laboratory ammonia synthesis',
    },
    text: {
      vi: 'Haber trình diễn tổng hợp NH₃ từ N₂ và H₂, bước quan trọng trước sản xuất phân đạm quy mô lớn.',
      en: 'Haber demonstrated NH₃ synthesis from N₂ and H₂, a key step toward large-scale nitrogen fertiliser production.',
    },
    kind: 'industry',
    source: 'https://pubsapp.acs.org/subscribe/archive/tcaw/10/i02/html/02chemch.html',
    elements: ['N', 'H'],
  },
  {
    id: 'rutherford-nucleus',
    year: 1911,
    title: {
      vi: 'Mô hình nguyên tử có hạt nhân',
      en: 'The nuclear atom',
    },
    text: {
      vi: 'Rutherford đề xuất điện tích dương tập trung trong hạt nhân nhỏ, thay vì phân bố khắp nguyên tử.',
      en: 'Rutherford proposed that positive charge is concentrated in a tiny nucleus rather than spread through the atom.',
    },
    kind: 'atom-model',
    source: 'https://www.nobelprize.org/prizes/chemistry/1908/rutherford/facts/',
    elements: [],
  },
  {
    id: 'bohr-hydrogen',
    year: 1913,
    title: {
      vi: 'Bohr giải thích phổ hiđro',
      en: 'Bohr explains hydrogen’s spectrum',
    },
    text: {
      vi: 'Các mức năng lượng rời rạc giúp giải thích vì sao nguyên tử hiđro chỉ phát một số bước sóng nhất định.',
      en: 'Discrete energy levels explained why hydrogen atoms emit only particular wavelengths.',
    },
    kind: 'atom-model',
    source: 'https://www.nobelprize.org/prizes/physics/1922/bohr/facts/',
    elements: ['H'],
  },
  {
    id: 'bosch-ammonia-plant',
    year: 1913,
    title: {
      vi: 'Amoniac đi vào nhà máy',
      en: 'Ammonia reaches the factory',
    },
    text: {
      vi: 'Nhà máy Oppau của BASF đưa quy trình Haber–Bosch vào vận hành công nghiệp.',
      en: 'BASF’s Oppau plant brought Haber–Bosch ammonia synthesis into industrial operation.',
    },
    kind: 'industry',
    source: 'https://pubsapp.acs.org/subscribe/archive/tcaw/10/i02/html/02chemch.html',
    elements: ['N', 'H'],
  },
  {
    id: 'moseley-atomic-number',
    year: 1913,
    title: {
      vi: 'Số hiệu nguyên tử thay khối lượng',
      en: 'Atomic number replaces atomic weight',
    },
    text: {
      vi: 'Moseley dùng phổ tia X để làm rõ thứ tự nguyên tố theo điện tích hạt nhân.',
      en: 'Moseley used X-ray spectra to establish elemental order by nuclear charge.',
    },
    kind: 'table',
    source: 'https://periodic-table.rsc.org/history/about',
    elements: [],
  },
  {
    id: 'aston-mass-spectrograph',
    year: 1919,
    title: {
      vi: 'Khối phổ phân biệt đồng vị',
      en: 'Mass spectrography separates isotopes',
    },
    text: {
      vi: 'Máy khối phổ của Aston phân biệt nguyên tử theo khối lượng, giúp nghiên cứu các đồng vị.',
      en: 'Aston’s mass spectrograph separated atoms by mass, helping reveal isotopes.',
    },
    kind: 'discovery-method',
    source:
      'https://collection.sciencemuseumgroup.org.uk/objects/co5659/astons-first-mass-spectrograph-c-1919-mass-spectrograph',
    elements: [],
  },
  {
    id: 'pauli-exclusion',
    year: 1925,
    title: {
      vi: 'Nguyên lí Pauli',
      en: 'The Pauli exclusion principle',
    },
    text: {
      vi: 'Không có hai electron trong một nguyên tử có cùng toàn bộ số lượng tử; quy tắc này chi phối cách điền electron.',
      en: 'No two electrons in an atom have identical sets of quantum numbers, constraining electron arrangements.',
    },
    kind: 'theory',
    source: 'https://www.nobelprize.org/prizes/physics/1945/pauli/facts/',
    elements: [],
  },
  {
    id: 'schrodinger-wave-mechanics',
    year: 1926,
    title: {
      vi: 'Cơ học sóng của Schrödinger',
      en: 'Schrödinger’s wave mechanics',
    },
    text: {
      vi: 'Mô tả electron bằng hàm sóng thay đổi cách hình dung cấu trúc nguyên tử so với các quỹ đạo cổ điển.',
      en: 'Wave functions changed the description of electrons beyond classical orbital paths.',
    },
    kind: 'atom-model',
    source: 'https://journals.aps.org/pr/abstract/10.1103/PhysRev.28.1049',
    elements: [],
  },
  {
    id: 'heisenberg-uncertainty',
    year: 1927,
    title: {
      vi: 'Hệ thức bất định',
      en: 'The uncertainty relation',
    },
    text: {
      vi: 'Vị trí và động lượng không thể cùng xác định tuỳ ý chính xác; đây là giới hạn của mô tả lượng tử.',
      en: 'Position and momentum cannot both be specified with arbitrary precision, a limit built into quantum descriptions.',
    },
    kind: 'theory',
    source: 'https://www.aps.org/apsnews/2008/02/1927-heisenberg-uncertainty-principle',
    elements: [],
  },
  {
    id: 'chadwick-neutron',
    year: 1932,
    title: {
      vi: 'Neutron làm rõ cấu tạo hạt nhân',
      en: 'The neutron clarifies nuclei',
    },
    text: {
      vi: 'Chadwick xác định neutron, giúp giải thích đồng vị có cùng số proton nhưng khác khối lượng.',
      en: 'Chadwick identified the neutron, helping explain isotopes with the same proton number but different masses.',
    },
    kind: 'atom-model',
    source: 'https://www.nobelprize.org/prizes/physics/1935/chadwick/facts/',
    elements: [],
  },
  {
    id: 'artificial-radioactivity',
    year: 1934,
    title: {
      vi: 'Tạo phóng xạ nhân tạo',
      en: 'Producing artificial radioactivity',
    },
    text: {
      vi: 'Joliot-Curie tạo hạt nhân phóng xạ trong phản ứng hạt nhân, trong đó có một đồng vị photpho.',
      en: 'The Joliot-Curies produced radioactive nuclei in nuclear reactions, including a phosphorus isotope.',
    },
    kind: 'discovery-method',
    source: 'https://www.nobelprize.org/prizes/chemistry/1935/joliot-fred/facts/',
    elements: ['P', 'Al'],
  },
  {
    id: 'nuclear-fission',
    year: 1938,
    title: {
      vi: 'Bari là manh mối phân hạch',
      en: 'Barium provides a fission clue',
    },
    text: {
      vi: 'Hahn và Strassmann nhận ra bari trong sản phẩm của urani bị bắn phá bằng neutron.',
      en: 'Hahn and Strassmann identified barium among the products of neutron-irradiated uranium.',
    },
    kind: 'discovery-method',
    source: 'https://www.mpic.de/4469988/die-entdeckung-der-kernspaltung',
    elements: ['Ba', 'U'],
  },
  {
    id: 'ptfe-discovery',
    year: 1938,
    title: {
      vi: 'PTFE từ một quan sát bất ngờ',
      en: 'PTFE from an unexpected observation',
    },
    text: {
      vi: 'Plunkett phát hiện polymer chứa flo sau này được gọi là Teflon.',
      en: 'Plunkett discovered the fluoropolymer later branded Teflon.',
    },
    kind: 'industry',
    source: 'https://www.teflon.com/en/news-events/history',
    elements: ['F', 'C'],
  },
  {
    id: 'actinide-concept',
    year: 1944,
    title: {
      vi: 'Seaborg đề xuất dãy actini',
      en: 'Seaborg proposes the actinide series',
    },
    text: {
      vi: 'Cách sắp xếp mới giải thích vị trí của nhiều nguyên tố nặng trong bảng tuần hoàn.',
      en: 'The new arrangement explained the placement of many heavy elements in the periodic table.',
    },
    kind: 'table',
    source: 'https://seaborg.llnl.gov/about-us',
    elements: ['Ac', 'U', 'Pu'],
  },
  {
    id: 'silicon-solar-cell',
    year: 1954,
    title: {
      vi: 'Pin mặt trời silic thực dụng',
      en: 'A practical silicon solar cell',
    },
    text: {
      vi: 'Bell Labs trình diễn pin mặt trời silic, mở đường cho ứng dụng quang điện.',
      en: 'Bell Labs demonstrated a practical silicon solar cell, advancing photovoltaic applications.',
    },
    kind: 'industry',
    source: 'https://www.aps.org/apsnews/2009/04/bell-labs-silicon-solar-cell',
    elements: ['Si'],
  },
  {
    id: 'boranes-nobel',
    year: 1976,
    title: {
      vi: 'Cấu trúc boran được ghi nhận',
      en: 'Borane structures recognised',
    },
    text: {
      vi: 'Nobel Hoá học trao cho Lipscomb vì nghiên cứu cấu trúc boran làm sáng tỏ liên kết hoá học.',
      en: 'The Chemistry Nobel recognised Lipscomb’s borane studies and their insight into chemical bonding.',
    },
    kind: 'theory',
    source: 'https://www.nobelprize.org/prizes/chemistry/1976/summary/',
    elements: ['B', 'H'],
  },
  {
    id: 'boron-phosphorus-reagents',
    year: 1979,
    title: {
      vi: 'Bo và photpho trong tổng hợp hữu cơ',
      en: 'Boron and phosphorus in organic synthesis',
    },
    text: {
      vi: 'Brown và Wittig nhận Nobel cho việc phát triển thuốc thử hữu ích chứa bo và photpho.',
      en: 'Brown and Wittig received the Nobel Prize for developing useful boron and phosphorus reagents.',
    },
    kind: 'industry',
    source: 'https://www.nobelprize.org/prizes/chemistry/1979/summary/',
    elements: ['B', 'P'],
  },
  {
    id: 'fullerene-c60',
    year: 1985,
    title: {
      vi: 'Nhận ra phân tử C₆₀',
      en: 'Identifying the C₆₀ molecule',
    },
    text: {
      vi: 'Một dạng cấu trúc mới của cacbon làm phong phú hiểu biết ngoài kim cương và than chì.',
      en: 'A new carbon structure expanded understanding beyond diamond and graphite.',
    },
    kind: 'discovery-method',
    source: 'https://www.nobelprize.org/prizes/chemistry/1996/summary/',
    elements: ['C'],
  },
  {
    id: 'iupac-groups',
    year: 1988,
    title: {
      vi: 'Nhóm được đánh số 1–18',
      en: 'Groups numbered 1–18',
    },
    text: {
      vi: 'IUPAC khuyến nghị đánh số nhóm liên tục để tránh nhầm giữa các hệ A/B.',
      en: 'IUPAC recommended consecutive group numbers to avoid conflicting A/B systems.',
    },
    kind: 'table',
    source: 'https://iupac.org/what-we-do/periodic-table-of-elements/',
    elements: [],
  },
  {
    id: 'transfermium-names',
    year: 1997,
    title: {
      vi: 'Thống nhất tên nguyên tố nặng',
      en: 'Heavy-element names agreed',
    },
    text: {
      vi: 'IUPAC phê chuẩn các khuyến nghị cuối về tên các nguyên tố 101–109.',
      en: 'IUPAC approved final recommendations for the names of elements 101–109.',
    },
    kind: 'naming',
    source: 'https://publications.iupac.org/news/archives/1997/august97.html',
    elements: ['Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt'],
  },
  {
    id: 'flerovium-livermorium',
    year: 2012,
    title: {
      vi: 'Tên flerovium và livermorium',
      en: 'The names flerovium and livermorium',
    },
    text: {
      vi: 'Tên và ký hiệu Fl, Lv được IUPAC chính thức khuyến nghị cho nguyên tố 114 và 116.',
      en: 'IUPAC formally recommended Fl and Lv for elements 114 and 116.',
    },
    kind: 'naming',
    source: 'https://publications.iupac.org/pac/84/7/1669/index.html',
    elements: ['Fl', 'Lv'],
  },
  {
    id: 'four-new-names',
    year: 2016,
    title: {
      vi: 'Bốn tên hoàn thiện chu kì 7',
      en: 'Four names complete period 7',
    },
    text: {
      vi: 'IUPAC phê chuẩn nihonium, moscovium, tennessine và oganesson.',
      en: 'IUPAC approved nihonium, moscovium, tennessine and oganesson.',
    },
    kind: 'naming',
    source: 'https://iupac.org/iupac-announces-the-names-of-the-elements-113-115-117-and-118/',
    elements: ['Nh', 'Mc', 'Ts', 'Og'],
  },
  {
    id: 'iypt-celebration',
    year: 2019,
    title: {
      vi: 'Năm Quốc tế Bảng tuần hoàn',
      en: 'International Year of the Periodic Table',
    },
    text: {
      vi: 'Các hoạt động quốc tế kỉ niệm vai trò của bảng tuần hoàn, 150 năm sau bảng Mendeleev.',
      en: 'International events celebrated the periodic table, 150 years after Mendeleev’s table.',
    },
    kind: 'table',
    source:
      'https://iupac.org/united-nations-proclaims-international-year-periodic-table-chemical-elements/',
    elements: [],
  },
  {
    id: 'lithium-ion-nobel',
    year: 2019,
    title: {
      vi: 'Pin lithium-ion được trao Nobel',
      en: 'Lithium-ion batteries recognised',
    },
    text: {
      vi: 'Whittingham, Goodenough và Yoshino nhận Nobel cho phát triển pin lithium-ion.',
      en: 'Whittingham, Goodenough and Yoshino received the Nobel Prize for developing lithium-ion batteries.',
    },
    kind: 'industry',
    source: 'https://www.nobelprize.org/prizes/chemistry/2019/summary/',
    elements: ['Li'],
  },
  {
    id: 'si-mole-redefinition',
    year: 2019,
    title: {
      vi: 'Mol gắn với hằng số chính xác',
      en: 'The mole gains an exact constant',
    },
    text: {
      vi: 'Định nghĩa SI mới cố định hằng số Avogadro bằng 6,02214076 × 10²³ mol⁻¹.',
      en: 'The revised SI fixed the Avogadro constant at exactly 6.02214076 × 10²³ mol⁻¹.',
    },
    kind: 'theory',
    source: 'https://www.bipm.org/en/measurement-units/',
    elements: [],
  },
]);

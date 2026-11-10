import { defineDeck } from '../../src/flashcard.ts';

/** Đối chiếu phạm vi Kết nối tri thức với cuộc sống, GDPT 2018. Nội dung tự biên soạn; quy tắc được ghi kèm phạm vi và ngoại lệ cần thiết. */
export default defineDeck({
  id: 'oxidation-states',
  title: {
    vi: 'Số oxi hoá tiêu biểu',
    en: 'Representative oxidation states',
  },
  description: {
    vi: 'Các mức thường gặp của 30 nguyên tố ưu tiên; ví dụ không phải danh sách đầy đủ mọi hợp chất.',
    en: 'Common states for 30 priority elements; examples are not exhaustive.',
  },
  grade: [10, 11, 12],
  cards: [
    {
      id: 'oxidation-states-001',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của hiđro trong hợp chất?',
        en: 'What are some representative oxidation states of hydrogen in compounds?',
      },
      back: {
        vi: 'Thường +1; trong hiđrua kim loại như NaH là −1.',
        en: 'Usually +1; −1 in metal hydrides such as NaH.',
      },
      elements: ['H'],
      source: 'https://periodic-table.rsc.org/element/1/hydrogen',
    },
    {
      id: 'oxidation-states-002',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của liti trong hợp chất?',
        en: 'What are some representative oxidation states of lithium in compounds?',
      },
      back: {
        vi: '+1 trong các muối và hợp chất thường gặp. Li kim loại có số oxi hoá 0.',
        en: '+1 in common salts and compounds. Lithium metal has oxidation state zero.',
      },
      elements: ['Li'],
      source: 'https://periodic-table.rsc.org/element/3/lithium',
    },
    {
      id: 'oxidation-states-003',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của bo trong hợp chất?',
        en: 'What are some representative oxidation states of boron in compounds?',
      },
      back: {
        vi: '+3 trong nhiều hợp chất, ví dụ B₂O₃.',
        en: '+3 in many compounds, for example B₂O₃.',
      },
      elements: ['B'],
      source: 'https://periodic-table.rsc.org/element/5/boron',
    },
    {
      id: 'oxidation-states-004',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của cacbon trong hợp chất?',
        en: 'What are some representative oxidation states of carbon in compounds?',
      },
      back: {
        vi: '−4 trong CH₄, +2 trong CO, +4 trong CO₂. Không gán cùng số cho mọi dạng cacbon.',
        en: '−4 in CH₄, +2 in CO and +4 in CO₂. Carbon does not have one fixed state in every compound.',
      },
      elements: ['C'],
      source: 'https://periodic-table.rsc.org/element/6/carbon',
    },
    {
      id: 'oxidation-states-005',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của nitơ trong hợp chất?',
        en: 'What are some representative oxidation states of nitrogen in compounds?',
      },
      back: {
        vi: '−3 trong NH₃, +2 trong NO, +4 trong NO₂, +5 trong HNO₃; còn có các mức khác.',
        en: '−3 in NH₃, +2 in NO, +4 in NO₂ and +5 in HNO₃, with other states also possible.',
      },
      elements: ['N'],
      source: 'https://periodic-table.rsc.org/element/7/nitrogen',
    },
    {
      id: 'oxidation-states-006',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của oxi trong hợp chất?',
        en: 'What are some representative oxidation states of oxygen in compounds?',
      },
      back: {
        vi: 'Thường −2; trong peoxit như H₂O₂ là −1. O₂ là đơn chất nên số oxi hoá 0.',
        en: 'Usually −2; −1 in peroxides such as H₂O₂. Elemental O₂ has oxidation state zero.',
      },
      elements: ['O'],
      source: 'https://periodic-table.rsc.org/element/8/oxygen',
    },
    {
      id: 'oxidation-states-007',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của flo trong hợp chất?',
        en: 'What are some representative oxidation states of fluorine in compounds?',
      },
      back: {
        vi: '−1 trong hợp chất thông thường; F₂ có số oxi hoá 0.',
        en: '−1 in ordinary compounds; F₂ has oxidation state zero.',
      },
      elements: ['F'],
      source: 'https://periodic-table.rsc.org/element/9/fluorine',
    },
    {
      id: 'oxidation-states-008',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của natri trong hợp chất?',
        en: 'What are some representative oxidation states of sodium in compounds?',
      },
      back: {
        vi: '+1 trong các hợp chất thường gặp, ví dụ NaCl và NaOH.',
        en: '+1 in common compounds such as NaCl and NaOH.',
      },
      elements: ['Na'],
      source: 'https://periodic-table.rsc.org/element/11/sodium',
    },
    {
      id: 'oxidation-states-009',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của magie trong hợp chất?',
        en: 'What are some representative oxidation states of magnesium in compounds?',
      },
      back: {
        vi: '+2 trong các hợp chất thường gặp, ví dụ MgO và MgCl₂.',
        en: '+2 in common compounds such as MgO and MgCl₂.',
      },
      elements: ['Mg'],
      source: 'https://periodic-table.rsc.org/element/12/magnesium',
    },
    {
      id: 'oxidation-states-010',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của nhôm trong hợp chất?',
        en: 'What are some representative oxidation states of aluminum in compounds?',
      },
      back: {
        vi: '+3 trong các hợp chất thường gặp, ví dụ Al₂O₃ và AlCl₃.',
        en: '+3 in common compounds such as Al₂O₃ and AlCl₃.',
      },
      elements: ['Al'],
      source: 'https://periodic-table.rsc.org/element/13/aluminium',
    },
    {
      id: 'oxidation-states-011',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của silic trong hợp chất?',
        en: 'What are some representative oxidation states of silicon in compounds?',
      },
      back: {
        vi: '+4 là mức tiêu biểu, như trong SiO₂; đây không phải khẳng định silic chỉ có một mức.',
        en: '+4 is representative, as in SiO₂; this does not mean silicon has only one possible state.',
      },
      elements: ['Si'],
      source: 'https://periodic-table.rsc.org/element/14/silicon',
    },
    {
      id: 'oxidation-states-012',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của photpho trong hợp chất?',
        en: 'What are some representative oxidation states of phosphorus in compounds?',
      },
      back: {
        vi: '−3 trong PH₃, +3 trong PCl₃, +5 trong H₃PO₄ theo quy ước phổ thông.',
        en: '−3 in PH₃, +3 in PCl₃ and +5 in H₃PO₄ in the school convention.',
      },
      elements: ['P'],
      source: 'https://periodic-table.rsc.org/element/15/phosphorus',
    },
    {
      id: 'oxidation-states-013',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của lưu huỳnh trong hợp chất?',
        en: 'What are some representative oxidation states of sulfur in compounds?',
      },
      back: {
        vi: '−2 trong H₂S, +4 trong SO₂, +6 trong H₂SO₄. Lưu huỳnh đơn chất có số oxi hoá 0.',
        en: '−2 in H₂S, +4 in SO₂ and +6 in H₂SO₄. Elemental sulfur has oxidation state zero.',
      },
      elements: ['S'],
      source: 'https://periodic-table.rsc.org/element/16/sulfur',
    },
    {
      id: 'oxidation-states-014',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của clo trong hợp chất?',
        en: 'What are some representative oxidation states of chlorine in compounds?',
      },
      back: {
        vi: '−1 trong chloride, +1 trong NaClO, +5 trong KClO₃; còn có +7 trong hợp chất phù hợp.',
        en: '−1 in chlorides, +1 in NaClO and +5 in KClO₃; +7 also occurs in suitable compounds.',
      },
      elements: ['Cl'],
      source: 'https://periodic-table.rsc.org/element/17/chlorine',
    },
    {
      id: 'oxidation-states-015',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của kali trong hợp chất?',
        en: 'What are some representative oxidation states of potassium in compounds?',
      },
      back: {
        vi: '+1 trong các hợp chất thường gặp, ví dụ KCl và KOH.',
        en: '+1 in common compounds such as KCl and KOH.',
      },
      elements: ['K'],
      source: 'https://periodic-table.rsc.org/element/19/potassium',
    },
    {
      id: 'oxidation-states-016',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của canxi trong hợp chất?',
        en: 'What are some representative oxidation states of calcium in compounds?',
      },
      back: {
        vi: '+2 trong các hợp chất thường gặp, ví dụ CaO và CaCO₃.',
        en: '+2 in common compounds such as CaO and CaCO₃.',
      },
      elements: ['Ca'],
      source: 'https://periodic-table.rsc.org/element/20/calcium',
    },
    {
      id: 'oxidation-states-017',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của crom trong hợp chất?',
        en: 'What are some representative oxidation states of chromium in compounds?',
      },
      back: {
        vi: '+3 trong Cr₂O₃; +6 trong CrO₃ và các ion chromate, dichromate.',
        en: '+3 in Cr₂O₃; +6 in CrO₃, chromate and dichromate ions.',
      },
      elements: ['Cr'],
      source: 'https://periodic-table.rsc.org/element/24/chromium',
    },
    {
      id: 'oxidation-states-018',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của mangan trong hợp chất?',
        en: 'What are some representative oxidation states of manganese in compounds?',
      },
      back: {
        vi: '+2 trong MnCl₂, +4 trong MnO₂, +7 trong KMnO₄; không phải chỉ có các mức này.',
        en: '+2 in MnCl₂, +4 in MnO₂ and +7 in KMnO₄; these are not the only states.',
      },
      elements: ['Mn'],
      source: 'https://periodic-table.rsc.org/element/25/manganese',
    },
    {
      id: 'oxidation-states-019',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của sắt trong hợp chất?',
        en: 'What are some representative oxidation states of iron in compounds?',
      },
      back: {
        vi: '+2 trong FeCl₂, +3 trong FeCl₃. Phải đọc chỉ số và điện tích trước khi gán số oxi hoá.',
        en: '+2 in FeCl₂ and +3 in FeCl₃. Read subscripts and charges before assigning a state.',
      },
      elements: ['Fe'],
      source: 'https://periodic-table.rsc.org/element/26/iron',
    },
    {
      id: 'oxidation-states-020',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của niken trong hợp chất?',
        en: 'What are some representative oxidation states of nickel in compounds?',
      },
      back: {
        vi: '+2 là mức rất thường gặp, như trong NiCl₂ và Ni(OH)₂.',
        en: '+2 is very common, as in NiCl₂ and Ni(OH)₂.',
      },
      elements: ['Ni'],
      source: 'https://periodic-table.rsc.org/element/28/nickel',
    },
    {
      id: 'oxidation-states-021',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của đồng trong hợp chất?',
        en: 'What are some representative oxidation states of copper in compounds?',
      },
      back: {
        vi: '+1 trong Cu₂O, +2 trong CuO và CuSO₄. Không gán mặc định +2 cho mọi hợp chất.',
        en: '+1 in Cu₂O; +2 in CuO and CuSO₄. Do not automatically assign +2 to every copper compound.',
      },
      elements: ['Cu'],
      source: 'https://periodic-table.rsc.org/element/29/copper',
    },
    {
      id: 'oxidation-states-022',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của kẽm trong hợp chất?',
        en: 'What are some representative oxidation states of zinc in compounds?',
      },
      back: {
        vi: '+2 trong các hợp chất thường gặp, như ZnO và ZnSO₄.',
        en: '+2 in common compounds such as ZnO and ZnSO₄.',
      },
      elements: ['Zn'],
      source: 'https://periodic-table.rsc.org/element/30/zinc',
    },
    {
      id: 'oxidation-states-023',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của brom trong hợp chất?',
        en: 'What are some representative oxidation states of bromine in compounds?',
      },
      back: {
        vi: '−1 trong bromide; có các số oxi hoá dương trong hợp chất với oxi. Br₂ có số oxi hoá 0.',
        en: '−1 in bromides, with positive states in oxygen compounds. Br₂ has oxidation state zero.',
      },
      elements: ['Br'],
      source: 'https://periodic-table.rsc.org/element/35/bromine',
    },
    {
      id: 'oxidation-states-024',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của bạc trong hợp chất?',
        en: 'What are some representative oxidation states of silver in compounds?',
      },
      back: {
        vi: '+1 trong AgNO₃ và AgCl là mức thường gặp.',
        en: '+1 in AgNO₃ and AgCl is the common state.',
      },
      elements: ['Ag'],
      source: 'https://periodic-table.rsc.org/element/47/silver',
    },
    {
      id: 'oxidation-states-025',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của thiếc trong hợp chất?',
        en: 'What are some representative oxidation states of tin in compounds?',
      },
      back: {
        vi: '+2 trong SnCl₂; +4 trong SnO₂ và SnCl₄.',
        en: '+2 in SnCl₂; +4 in SnO₂ and SnCl₄.',
      },
      elements: ['Sn'],
      source: 'https://periodic-table.rsc.org/element/50/tin',
    },
    {
      id: 'oxidation-states-026',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của iot trong hợp chất?',
        en: 'What are some representative oxidation states of iodine in compounds?',
      },
      back: {
        vi: '−1 trong iodide; có các số oxi hoá dương trong hợp chất với oxi. I₂ có số oxi hoá 0.',
        en: '−1 in iodides, with positive states in oxygen compounds. I₂ has oxidation state zero.',
      },
      elements: ['I'],
      source: 'https://periodic-table.rsc.org/element/53/iodine',
    },
    {
      id: 'oxidation-states-027',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của bari trong hợp chất?',
        en: 'What are some representative oxidation states of barium in compounds?',
      },
      back: {
        vi: '+2 trong các hợp chất thường gặp, như BaCl₂ và BaSO₄.',
        en: '+2 in common compounds such as BaCl₂ and BaSO₄.',
      },
      elements: ['Ba'],
      source: 'https://periodic-table.rsc.org/element/56/barium',
    },
    {
      id: 'oxidation-states-028',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của vàng trong hợp chất?',
        en: 'What are some representative oxidation states of gold in compounds?',
      },
      back: {
        vi: '+1 và +3 là các mức tiêu biểu, như AuCl và AuCl₃.',
        en: '+1 and +3 are representative states, as in AuCl and AuCl₃.',
      },
      elements: ['Au'],
      source: 'https://periodic-table.rsc.org/element/79/gold',
    },
    {
      id: 'oxidation-states-029',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của thuỷ ngân trong hợp chất?',
        en: 'What are some representative oxidation states of mercury in compounds?',
      },
      back: {
        vi: '+1 trong ion Hg₂²⁺: hai Hg cùng chia tổng +2. +2 trong HgCl₂.',
        en: '+1 per Hg in Hg₂²⁺, whose total charge is +2; +2 in HgCl₂.',
      },
      elements: ['Hg'],
      source: 'https://periodic-table.rsc.org/element/80/mercury',
    },
    {
      id: 'oxidation-states-030',
      front: {
        vi: 'Một số số oxi hoá tiêu biểu của chì trong hợp chất?',
        en: 'What are some representative oxidation states of lead in compounds?',
      },
      back: {
        vi: '+2 trong PbO, +4 trong PbO₂. Chì đơn chất có số oxi hoá 0.',
        en: '+2 in PbO and +4 in PbO₂. Elemental lead has oxidation state zero.',
      },
      elements: ['Pb'],
      source: 'https://periodic-table.rsc.org/element/82/lead',
    },
  ],
});

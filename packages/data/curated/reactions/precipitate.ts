import { defineReactions } from '../../src/reaction';
import { aq, C, color, COLORLESS, sp } from './helpers';

/** Phản ứng tạo kết tủa (và kết tủa tan/đổi màu). */
export const PRECIPITATE = defineReactions([
  {
    id: 'agno3-nacl',
    title: {
      vi: 'Bạc nitrat + natri clorua: kết tủa trắng AgCl',
      en: 'Silver nitrate + sodium chloride: white AgCl precipitate',
    },
    equation: 'AgNO3 + NaCl -> AgCl + NaNO3',
    ionic: 'Ag+ + Cl- -> AgCl',
    category: ['precipitate'],
    grade: 10,
    reactants: [aq('AgNO3', { concentration: '0,1 M' }), aq('NaCl', { concentration: '0,1 M' })],
    products: [sp('AgCl', 's', { color: C.white }), aq('NaNO3')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'AgCl', color: C.white, texture: 'curdy', settles: true },
      heat: 'none',
      durationSec: 5,
      summary: {
        vi: 'Nhỏ dung dịch AgNO₃ vào dung dịch NaCl thấy xuất hiện kết tủa trắng dạng sữa vón cục, lắng dần xuống đáy.',
        en: 'Adding AgNO₃ solution to NaCl solution gives a white curdy precipitate that slowly settles.',
      },
    },
    explain: {
      vi: 'Ion Ag⁺ kết hợp với ion Cl⁻ tạo muối AgCl không tan trong nước. Đây là cách nhận biết ion clorua. Để ngoài ánh sáng, AgCl dần hoá xám vì bị phân huỷ thành bạc.',
      en: 'Ag⁺ and Cl⁻ combine into AgCl, which is insoluble in water. This is the standard test for chloride ions. In light AgCl slowly turns grey as silver forms.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'AgNO₃ làm đen da và quần áo, mắt cần tránh. Đeo găng, kính; chất thải chứa bạc không đổ xuống cống.',
        en: 'AgNO₃ stains skin and clothes black and must be kept from eyes. Wear gloves and goggles; collect silver waste.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Silver_chloride',
  },
  {
    id: 'agno3-nabr',
    title: {
      vi: 'Bạc nitrat + natri bromua: kết tủa vàng nhạt AgBr',
      en: 'Silver nitrate + sodium bromide: pale yellow AgBr precipitate',
    },
    equation: 'AgNO3 + NaBr -> AgBr + NaNO3',
    ionic: 'Ag+ + Br- -> AgBr',
    category: ['precipitate'],
    grade: 10,
    reactants: [aq('AgNO3', { concentration: '0,1 M' }), aq('NaBr', { concentration: '0,1 M' })],
    products: [sp('AgBr', 's', { color: C.agBr }), aq('NaNO3')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'AgBr', color: C.agBr, texture: 'curdy', settles: true },
      heat: 'none',
      durationSec: 5,
      summary: {
        vi: 'Xuất hiện kết tủa màu vàng nhạt vón cục (màu kem), lắng xuống đáy ống.',
        en: 'A pale yellow (cream) curdy precipitate forms and settles.',
      },
    },
    explain: {
      vi: 'AgBr không tan trong nước nên tách ra khi Ag⁺ gặp Br⁻. Màu vàng nhạt giúp phân biệt với AgCl (trắng) và AgI (vàng đậm).',
      en: 'AgBr is insoluble, so it separates when Ag⁺ meets Br⁻. Its pale yellow colour distinguishes it from white AgCl and deeper yellow AgI.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Như AgNO₃: làm đen da, quần áo. Đeo găng và kính.',
        en: 'Like AgNO₃: stains skin and clothes. Wear gloves and goggles.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Silver_bromide',
  },
  {
    id: 'agno3-ki',
    title: {
      vi: 'Bạc nitrat + kali iotua: kết tủa vàng AgI',
      en: 'Silver nitrate + potassium iodide: yellow AgI precipitate',
    },
    equation: 'AgNO3 + KI -> AgI + KNO3',
    ionic: 'Ag+ + I- -> AgI',
    category: ['precipitate'],
    grade: 10,
    reactants: [aq('AgNO3', { concentration: '0,1 M' }), aq('KI', { concentration: '0,1 M' })],
    products: [sp('AgI', 's', { color: C.agI }), aq('KNO3')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'AgI', color: C.agI, texture: 'curdy', settles: true },
      heat: 'none',
      durationSec: 5,
      summary: {
        vi: 'Xuất hiện kết tủa màu vàng đậm, vón cục, lắng xuống đáy.',
        en: 'A deep yellow curdy precipitate forms and settles.',
      },
    },
    explain: {
      vi: 'AgI là muối bạc ít tan nhất trong ba muối halogenua (Cl, Br, I). Dãy màu trắng → vàng nhạt → vàng giúp nhận biết ion halogenua.',
      en: 'AgI is the least soluble of the three silver halides. The white → pale yellow → yellow sequence identifies the halide ion.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Đeo găng, kính; AgNO₃ làm đen da.',
        en: 'Wear gloves and goggles; AgNO₃ stains skin.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Silver_iodide',
  },
  {
    id: 'bacl2-na2so4',
    title: {
      vi: 'Bari clorua + natri sunfat: kết tủa trắng BaSO₄',
      en: 'Barium chloride + sodium sulfate: white BaSO₄ precipitate',
    },
    equation: 'BaCl2 + Na2SO4 -> BaSO4 + 2NaCl',
    ionic: 'Ba2+ + SO4^2- -> BaSO4',
    category: ['precipitate'],
    grade: 10,
    reactants: [aq('BaCl2', { concentration: '0,1 M' }), aq('Na2SO4', { concentration: '0,1 M' })],
    products: [sp('BaSO4', 's', { color: C.white }), aq('NaCl')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'BaSO4', color: C.white, texture: 'fine', settles: true },
      heat: 'none',
      durationSec: 4,
      summary: {
        vi: 'Xuất hiện ngay kết tủa trắng mịn làm đục dung dịch, sau đó lắng xuống. Kết tủa không tan khi thêm axit.',
        en: 'A fine white precipitate clouds the solution at once, then settles. It does not dissolve in acid.',
      },
    },
    explain: {
      vi: 'Ba²⁺ kết hợp SO₄²⁻ tạo BaSO₄ gần như không tan, kể cả trong axit. Vì vậy phản ứng được dùng để nhận biết ion sunfat.',
      en: 'Ba²⁺ and SO₄²⁻ form BaSO₄, almost insoluble even in acid, which makes this the test for sulfate ions.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Muối bari tan (BaCl₂) độc, không để vào miệng; rửa tay sau khi làm.',
        en: 'Soluble barium salts (BaCl₂) are toxic; keep out of the mouth and wash hands afterwards.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Barium_sulfate',
  },
  {
    id: 'cuso4-naoh',
    title: {
      vi: 'Đồng(II) sunfat + natri hiđroxit: kết tủa xanh lam Cu(OH)₂',
      en: 'Copper(II) sulfate + sodium hydroxide: blue Cu(OH)₂ precipitate',
    },
    equation: 'CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4',
    ionic: 'Cu2+ + 2OH- -> Cu(OH)2',
    category: ['precipitate'],
    grade: 12,
    reactants: [
      aq('CuSO4', { color: C.cuSolution, concentration: '0,1 M' }),
      aq('NaOH', { concentration: '1 M' }),
    ],
    products: [sp('Cu(OH)2', 's', { color: C.cuHydroxide }), aq('Na2SO4')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: C.cuSolution,
      solutionAfter: color('#cfe6f5', 'Xanh lam rất nhạt', 'Very pale blue', 0.15),
      precipitate: {
        formula: 'Cu(OH)2',
        color: C.cuHydroxide,
        texture: 'gelatinous',
        settles: true,
      },
      heat: 'none',
      durationSec: 6,
      summary: {
        vi: 'Dung dịch xanh lam nhạt dần, xuất hiện kết tủa dạng keo màu xanh lam, lắng xuống đáy.',
        en: 'The blue solution fades and a gelatinous blue precipitate settles out.',
      },
    },
    explain: {
      vi: 'Cu²⁺ kết hợp OH⁻ tạo Cu(OH)₂ không tan. Kết tủa này dùng để nhận biết ion Cu²⁺, và bị nhiệt phân thành CuO đen khi đun nóng.',
      en: 'Cu²⁺ and OH⁻ form insoluble Cu(OH)₂, the test for Cu²⁺. On heating it decomposes to black CuO.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NaOH ăn da, đeo kính và găng. Muối đồng độc, thu gom chất thải.',
        en: 'NaOH is corrosive: wear goggles and gloves. Copper salts are toxic; collect waste.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Copper(II)_hydroxide',
  },
  {
    id: 'fecl3-naoh',
    title: {
      vi: 'Sắt(III) clorua + natri hiđroxit: kết tủa nâu đỏ Fe(OH)₃',
      en: 'Iron(III) chloride + sodium hydroxide: red-brown Fe(OH)₃ precipitate',
    },
    equation: 'FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl',
    ionic: 'Fe3+ + 3OH- -> Fe(OH)3',
    category: ['precipitate'],
    grade: 12,
    reactants: [
      aq('FeCl3', { color: C.feIII, concentration: '0,1 M' }),
      aq('NaOH', { concentration: '1 M' }),
    ],
    products: [sp('Fe(OH)3', 's', { color: C.feOH3 }), aq('NaCl')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: C.feIII,
      solutionAfter: color('#e8dfc4', 'Vàng rất nhạt', 'Very pale yellow', 0.12),
      precipitate: { formula: 'Fe(OH)3', color: C.feOH3, texture: 'gelatinous', settles: true },
      heat: 'none',
      durationSec: 6,
      summary: {
        vi: 'Dung dịch vàng nâu xuất hiện kết tủa dạng keo màu nâu đỏ, lắng xuống đáy.',
        en: 'A gelatinous red-brown precipitate forms in the yellow-brown solution and settles.',
      },
    },
    explain: {
      vi: 'Fe³⁺ kết hợp OH⁻ tạo Fe(OH)₃ nâu đỏ không tan; đây là cách nhận biết ion Fe³⁺.',
      en: 'Fe³⁺ and OH⁻ form insoluble red-brown Fe(OH)₃, the test for Fe³⁺.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NaOH ăn da; FeCl₃ gây kích ứng và làm bẩn quần áo. Đeo kính và găng.',
        en: 'NaOH is corrosive and FeCl₃ irritates and stains. Wear goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Iron(III)_hydroxide',
  },
  {
    id: 'feso4-naoh',
    title: {
      vi: 'Sắt(II) sunfat + natri hiđroxit: kết tủa trắng xanh Fe(OH)₂',
      en: 'Iron(II) sulfate + sodium hydroxide: white-green Fe(OH)₂ precipitate',
    },
    equation: 'FeSO4 + 2NaOH -> Fe(OH)2 + Na2SO4',
    ionic: 'Fe2+ + 2OH- -> Fe(OH)2',
    category: ['precipitate'],
    grade: 12,
    reactants: [
      aq('FeSO4', { color: C.feII, concentration: '0,1 M' }),
      aq('NaOH', { concentration: '1 M' }),
    ],
    products: [sp('Fe(OH)2', 's', { color: C.feOH2 }), aq('Na2SO4')],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Dùng nước đã đun sôi để nguội, cho NaOH vào sát đáy ống thì giữ được màu trắng xanh lâu hơn.',
        en: 'Boiled, cooled water and adding NaOH at the bottom of the tube keeps the white-green colour longer.',
      },
    },
    observations: {
      solutionBefore: C.feII,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'Fe(OH)2', color: C.feOH2, texture: 'gelatinous', settles: true },
      heat: 'none',
      durationSec: 6,
      summary: {
        vi: 'Xuất hiện kết tủa màu trắng xanh. Để ngoài không khí, kết tủa nhanh chóng chuyển sang nâu đỏ (xem phản ứng tiếp theo).',
        en: 'A white-green precipitate forms. In air it quickly turns red-brown (see the next reaction).',
      },
    },
    explain: {
      vi: 'Fe²⁺ kết hợp OH⁻ tạo Fe(OH)₂ không tan. Fe(OH)₂ rất dễ bị oxi trong không khí oxi hoá, nên màu trắng xanh chỉ giữ được trong thời gian ngắn.',
      en: 'Fe²⁺ and OH⁻ give insoluble Fe(OH)₂, which is oxidised by air very easily, so the white-green colour is short-lived.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NaOH ăn da; đeo kính và găng.',
        en: 'NaOH is corrosive; wear goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Iron(II)_hydroxide',
  },
  {
    id: 'feoh2-air',
    title: {
      vi: 'Fe(OH)₂ bị oxi hoá trong không khí: trắng xanh → nâu đỏ',
      en: 'Fe(OH)₂ oxidised in air: white-green → red-brown',
    },
    equation: '4Fe(OH)2 + O2 + 2H2O -> 4Fe(OH)3',
    category: ['redox', 'color-change'],
    grade: 12,
    reactants: [sp('Fe(OH)2', 's', { color: C.feOH2 }), sp('O2', 'g'), sp('H2O', 'l')],
    products: [sp('Fe(OH)3', 's', { color: C.feOH3 })],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Xảy ra khi để kết tủa Fe(OH)₂ tiếp xúc không khí.',
        en: 'Happens when Fe(OH)₂ precipitate is exposed to air.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'Fe(OH)3', color: C.feOH3, texture: 'gelatinous', settles: true },
      solid: {
        vi: 'Kết tủa trắng xanh đổi dần qua xanh bẩn rồi nâu đỏ, từ mặt tiếp xúc không khí xuống đáy.',
        en: 'The white-green solid turns murky green, then red-brown, starting at the surface and moving down.',
      },
      heat: 'none',
      durationSec: 30,
      summary: {
        vi: 'Kết tủa trắng xanh Fe(OH)₂ để ngoài không khí chuyển dần sang màu nâu đỏ của Fe(OH)₃.',
        en: 'White-green Fe(OH)₂ left in air gradually becomes red-brown Fe(OH)₃.',
      },
    },
    explain: {
      vi: 'Oxi trong không khí oxi hoá Fe(II) thành Fe(III) khi có nước, nên Fe(OH)₂ biến thành Fe(OH)₃. Phản ứng giải thích vì sao Fe(OH)₂ khó điều chế nguyên chất.',
      en: 'Oxygen oxidises Fe(II) to Fe(III) in the presence of water, so Fe(OH)₂ becomes Fe(OH)₃. This is why pure Fe(OH)₂ is hard to prepare.',
    },
    safety: {
      level: 'safe',
      note: {
        vi: 'Không có nguy hiểm riêng; vẫn đeo găng khi xử lý hoá chất.',
        en: 'No special hazard; still wear gloves when handling chemicals.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Iron(II)_hydroxide',
  },
  {
    id: 'pbno32-ki',
    title: {
      vi: 'Chì(II) nitrat + kali iotua: “mưa vàng” PbI₂',
      en: 'Lead(II) nitrate + potassium iodide: “golden rain” PbI₂',
    },
    equation: 'Pb(NO3)2 + 2KI -> PbI2 + 2KNO3',
    ionic: 'Pb2+ + 2I- -> PbI2',
    category: ['precipitate'],
    grade: 11,
    reactants: [aq('Pb(NO3)2', { concentration: '0,1 M' }), aq('KI', { concentration: '0,1 M' })],
    products: [sp('PbI2', 's', { color: C.pbI2 }), aq('KNO3')],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Đun nóng cho kết tủa tan rồi để nguội: PbI₂ kết tinh lại thành vảy vàng óng (“mưa vàng”).',
        en: 'Heat to dissolve the precipitate, then cool: PbI₂ recrystallises as shimmering golden flakes (“golden rain”).',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'PbI2', color: C.pbI2, texture: 'crystalline', settles: true },
      heat: 'none',
      durationSec: 6,
      summary: {
        vi: 'Xuất hiện ngay kết tủa vàng tươi. Khi đun nóng rồi để nguội, các tinh thể vàng óng lắng chậm như mưa vàng.',
        en: 'A bright yellow precipitate forms at once. After heating and cooling, golden crystals settle slowly like rain.',
      },
    },
    explain: {
      vi: 'PbI₂ ít tan trong nước lạnh nhưng tan nhiều hơn khi nóng. Khi nguội, nó kết tinh lại thành các vảy nhỏ phản chiếu ánh sáng.',
      en: 'PbI₂ is sparingly soluble cold but dissolves more when hot. On cooling it recrystallises into small light-reflecting flakes.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'Muối chì độc, tích luỹ trong cơ thể. Đeo găng, không để dính da, thu gom toàn bộ chất thải chứa chì, rửa tay kỹ.',
        en: 'Lead salts are toxic and accumulate in the body. Wear gloves, avoid skin contact, collect all lead waste and wash hands well.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Lead(II)_iodide',
  },
  {
    id: 'alcl3-naoh',
    title: {
      vi: 'Nhôm clorua + natri hiđroxit: kết tủa keo trắng Al(OH)₃',
      en: 'Aluminium chloride + sodium hydroxide: white gelatinous Al(OH)₃',
    },
    equation: 'AlCl3 + 3NaOH -> Al(OH)3 + 3NaCl',
    ionic: 'Al3+ + 3OH- -> Al(OH)3',
    category: ['precipitate'],
    grade: 12,
    reactants: [aq('AlCl3', { concentration: '0,1 M' }), aq('NaOH', { concentration: '0,5 M' })],
    products: [sp('Al(OH)3', 's', { color: C.white }), aq('NaCl')],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Nhỏ từ từ NaOH, nếu dư kết tủa sẽ tan (xem phản ứng sau).',
        en: 'Add NaOH slowly; excess dissolves the precipitate (see next reaction).',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'Al(OH)3', color: C.white, texture: 'gelatinous', settles: false },
      heat: 'none',
      durationSec: 6,
      summary: {
        vi: 'Xuất hiện kết tủa keo màu trắng, lơ lửng rồi lắng chậm.',
        en: 'A white gelatinous precipitate appears, suspended and settling slowly.',
      },
    },
    explain: {
      vi: 'Al³⁺ kết hợp OH⁻ tạo Al(OH)₃ không tan. Al(OH)₃ là hiđroxit lưỡng tính nên tan được trong NaOH dư.',
      en: 'Al³⁺ and OH⁻ give insoluble Al(OH)₃, an amphoteric hydroxide that dissolves in excess NaOH.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NaOH ăn da; đeo kính và găng.',
        en: 'NaOH is corrosive; wear goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Aluminium_hydroxide',
  },
  {
    id: 'aloh3-naoh',
    title: {
      vi: 'Nhôm hiđroxit tan trong NaOH dư (tính lưỡng tính)',
      en: 'Aluminium hydroxide dissolves in excess NaOH (amphoteric)',
    },
    equation: 'Al(OH)3 + NaOH -> NaAlO2 + 2H2O',
    category: ['neutralization'],
    grade: 12,
    reactants: [sp('Al(OH)3', 's', { color: C.white }), aq('NaOH', { concentration: '1 M' })],
    products: [aq('NaAlO2'), sp('H2O', 'l')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: color('#f3f3f0', 'Trắng đục', 'Cloudy white', 0.5),
      solutionAfter: COLORLESS,
      solid: {
        vi: 'Kết tủa keo trắng Al(OH)₃ tan dần cho đến khi dung dịch trong suốt.',
        en: 'The white gelatinous Al(OH)₃ dissolves until the solution is clear.',
      },
      heat: 'none',
      durationSec: 10,
      summary: {
        vi: 'Thêm NaOH dư vào kết tủa Al(OH)₃ thì kết tủa tan hết, thu được dung dịch trong suốt.',
        en: 'Adding excess NaOH to the Al(OH)₃ precipitate dissolves it to a clear solution.',
      },
    },
    explain: {
      vi: 'Al(OH)₃ vừa tác dụng với axit vừa tác dụng với bazơ mạnh nên là hiđroxit lưỡng tính. Với NaOH, nó tạo natri aluminat tan trong nước.',
      en: 'Al(OH)₃ reacts with both acids and strong bases, so it is amphoteric. With NaOH it forms soluble sodium aluminate.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NaOH ăn da; đeo kính và găng.',
        en: 'NaOH is corrosive; wear goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Aluminium_hydroxide',
  },
  {
    id: 'znso4-naoh',
    title: {
      vi: 'Kẽm sunfat + natri hiđroxit: kết tủa trắng Zn(OH)₂',
      en: 'Zinc sulfate + sodium hydroxide: white Zn(OH)₂ precipitate',
    },
    equation: 'ZnSO4 + 2NaOH -> Zn(OH)2 + Na2SO4',
    ionic: 'Zn2+ + 2OH- -> Zn(OH)2',
    category: ['precipitate'],
    grade: 12,
    reactants: [aq('ZnSO4', { concentration: '0,1 M' }), aq('NaOH', { concentration: '0,5 M' })],
    products: [sp('Zn(OH)2', 's', { color: C.white }), aq('Na2SO4')],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Zn(OH)₂ lưỡng tính: tan trong NaOH dư.',
        en: 'Zn(OH)₂ is amphoteric and dissolves in excess NaOH.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'Zn(OH)2', color: C.white, texture: 'gelatinous', settles: true },
      heat: 'none',
      durationSec: 6,
      summary: {
        vi: 'Xuất hiện kết tủa keo màu trắng; thêm NaOH dư thì kết tủa tan.',
        en: 'A white gelatinous precipitate forms; excess NaOH dissolves it.',
      },
    },
    explain: {
      vi: 'Zn²⁺ tạo Zn(OH)₂ không tan với OH⁻. Giống Al(OH)₃, Zn(OH)₂ là hiđroxit lưỡng tính.',
      en: 'Zn²⁺ gives insoluble Zn(OH)₂ with OH⁻; like Al(OH)₃ it is amphoteric.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NaOH ăn da; đeo kính và găng.',
        en: 'NaOH is corrosive; wear goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Zinc_hydroxide',
  },
  {
    id: 'limewater-co2',
    title: {
      vi: 'Nước vôi trong hoá đục khi sục khí CO₂',
      en: 'Limewater turns milky when CO₂ is bubbled in',
    },
    equation: 'Ca(OH)2 + CO2 -> CaCO3 + H2O',
    ionic: 'Ca2+ + 2OH- + CO2 -> CaCO3 + H2O',
    category: ['precipitate', 'gas'],
    grade: 11,
    reactants: [aq('Ca(OH)2', { concentration: 'bão hoà' }), sp('CO2', 'g', { form: 'gas' })],
    products: [sp('CaCO3', 's', { color: C.white }), sp('H2O', 'l')],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Sục CO₂ dư thì kết tủa tan lại, tạo Ca(HCO₃)₂.',
        en: 'Excess CO₂ redissolves the precipitate as Ca(HCO₃)₂.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: C.milky,
      precipitate: { formula: 'CaCO3', color: C.white, texture: 'fine', settles: false },
      heat: 'none',
      durationSec: 8,
      summary: {
        vi: 'Dung dịch nước vôi trong suốt chuyển đục như sữa khi sục khí CO₂; để yên, bột trắng lắng dần.',
        en: 'Clear limewater turns milky as CO₂ is bubbled in; the white powder slowly settles.',
      },
    },
    explain: {
      vi: 'CO₂ phản ứng với Ca(OH)₂ tạo CaCO₃ không tan nên làm đục dung dịch. Đây là cách nhận biết khí CO₂.',
      en: 'CO₂ reacts with Ca(OH)₂ to give insoluble CaCO₃, clouding the solution. This is the standard test for CO₂.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Nước vôi gây kích ứng mắt; đeo kính.',
        en: 'Limewater irritates the eyes; wear goggles.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Limewater',
  },
  {
    id: 'cacl2-na2co3',
    title: {
      vi: 'Canxi clorua + natri cacbonat: kết tủa trắng CaCO₃',
      en: 'Calcium chloride + sodium carbonate: white CaCO₃ precipitate',
    },
    equation: 'CaCl2 + Na2CO3 -> CaCO3 + 2NaCl',
    ionic: 'Ca2+ + CO3^2- -> CaCO3',
    category: ['precipitate'],
    grade: 11,
    reactants: [aq('CaCl2', { concentration: '0,1 M' }), aq('Na2CO3', { concentration: '0,1 M' })],
    products: [sp('CaCO3', 's', { color: C.white }), aq('NaCl')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      precipitate: { formula: 'CaCO3', color: C.white, texture: 'fine', settles: true },
      heat: 'none',
      durationSec: 4,
      summary: {
        vi: 'Xuất hiện kết tủa trắng mịn làm đục dung dịch rồi lắng xuống đáy.',
        en: 'A fine white precipitate clouds the solution and then settles.',
      },
    },
    explain: {
      vi: 'Ca²⁺ và CO₃²⁻ tạo CaCO₃ ít tan. Phản ứng giải thích cách làm mềm nước cứng bằng soda và sự hình thành cặn vôi.',
      en: 'Ca²⁺ and CO₃²⁻ form sparingly soluble CaCO₃, the basis of softening hard water with soda and of limescale.',
    },
    safety: {
      level: 'safe',
      note: {
        vi: 'Nồng độ loãng, ít nguy hiểm; vẫn đeo kính.',
        en: 'Dilute and low hazard; still wear goggles.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Calcium_carbonate',
  },
]);

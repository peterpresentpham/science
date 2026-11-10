import { defineReactions } from '../../src/reaction';
import { aq, C, color, COLORLESS, METAL, sp } from './helpers';

const colorlessGas = color('#eef4f8', 'Không màu', 'Colorless', 0.04);
const KMnO4Dil = color('#9c27b0', 'Tím hồng', 'Violet-pink', 0.65);

/** Oxi hoá khử, đẩy kim loại/halogen, đổi màu. */
export const REDOX = defineReactions([
  {
    id: 'cu-hno3-conc',
    title: {
      vi: 'Đồng + axit nitric đặc: khí NO₂ nâu đỏ',
      en: 'Copper + concentrated nitric acid: brown NO₂ gas',
    },
    equation: 'Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O',
    category: ['redox', 'gas', 'exothermic'],
    grade: 11,
    reactants: [
      sp('Cu', 's', { color: METAL.cu, form: 'piece' }),
      aq('HNO3', { concentration: 'đặc' }),
    ],
    products: [
      aq('Cu(NO3)2', { color: C.cuNitrate }),
      sp('NO2', 'g', { color: C.no2 }),
      sp('H2O', 'l'),
    ],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: C.cuNitrate,
      gas: {
        formula: 'NO2',
        color: C.no2,
        smell: { vi: 'Hắc, rất độc', en: 'Acrid, very toxic' },
        rate: 'vigorous',
      },
      solid: {
        vi: 'Mảnh đồng tan nhanh, sủi bọt mạnh.',
        en: 'The copper piece dissolves quickly with vigorous bubbling.',
      },
      heat: 'exo',
      durationSec: 20,
      summary: {
        vi: 'Đồng tan nhanh, thoát ra khí màu nâu đỏ (NO₂), dung dịch chuyển sang màu xanh lam lục, ống nghiệm nóng lên.',
        en: 'The copper dissolves rapidly, releasing red-brown NO₂, and the solution turns blue-green as the tube heats up.',
      },
    },
    explain: {
      vi: 'HNO₃ đặc là chất oxi hoá mạnh, oxi hoá Cu thành Cu²⁺ và bản thân bị khử thành NO₂ (N⁺⁴). Khí NO₂ màu nâu đỏ, rất độc.',
      en: 'Concentrated HNO₃ is a strong oxidant: it oxidises Cu to Cu²⁺ and is itself reduced to NO₂ (N⁺⁴), a red-brown, very toxic gas.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'NO₂ rất độc, axit đặc ăn da gây bỏng nặng. Chỉ làm trong tủ hút với lượng rất nhỏ, đeo kính, găng, áo choàng; có bình hấp thụ khí.',
        en: 'NO₂ is very toxic and the concentrated acid causes severe burns. Work in a fume hood with tiny amounts, wearing goggles, gloves and a coat.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Nitric_acid',
  },
  {
    id: 'cu-h2so4-conc',
    title: {
      vi: 'Đồng + axit sunfuric đặc, nóng: khí SO₂',
      en: 'Copper + hot concentrated sulfuric acid: SO₂ gas',
    },
    equation: 'Cu + 2H2SO4 -> CuSO4 + SO2 + 2H2O',
    category: ['redox', 'gas'],
    grade: 10,
    reactants: [
      sp('Cu', 's', { color: METAL.cu, form: 'piece' }),
      aq('H2SO4', { concentration: 'đặc' }),
    ],
    products: [
      aq('CuSO4', { color: C.cuSolution }),
      sp('SO2', 'g', { color: colorlessGas }),
      sp('H2O', 'l'),
    ],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Phải đun nóng: ở nhiệt độ thường phản ứng không xảy ra.',
        en: 'Heating is required: no reaction at room temperature.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: C.cuSolution,
      gas: {
        formula: 'SO2',
        color: colorlessGas,
        smell: { vi: 'Hắc, sặc', en: 'Sharp, choking' },
        rate: 'moderate',
      },
      solid: {
        vi: 'Đồng tan dần khi đun, dung dịch chuyển xanh lam sau khi pha loãng.',
        en: 'The copper dissolves on heating; the solution is blue once diluted.',
      },
      heat: 'none',
      durationSec: 40,
      summary: {
        vi: 'Khi đun nóng, đồng tan, thoát ra khí không màu mùi hắc (SO₂) làm mất màu dung dịch KMnO₄; dung dịch thu được màu xanh lam.',
        en: 'On heating, copper dissolves and a colourless, sharp-smelling gas (SO₂) escapes that decolourises KMnO₄; the resulting solution is blue.',
      },
    },
    explain: {
      vi: 'H₂SO₄ đặc nóng là chất oxi hoá mạnh (S⁺⁶), oxi hoá Cu thành Cu²⁺ và bị khử thành SO₂ (S⁺⁴); đồng không phản ứng với axit loãng.',
      en: 'Hot concentrated H₂SO₄ is a strong oxidant (S⁺⁶): it oxidises Cu to Cu²⁺ and is reduced to SO₂ (S⁺⁴). Copper does not react with the dilute acid.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'Axit đặc nóng gây bỏng nặng, SO₂ độc. Làm trong tủ hút, đeo kính và găng; không đổ nước vào axit đặc.',
        en: 'Hot concentrated acid burns badly and SO₂ is toxic. Work in a fume hood with goggles and gloves; never add water to the acid.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Sulfuric_acid',
  },
  {
    id: 'fe-cuso4',
    title: {
      vi: 'Sắt + đồng(II) sunfat: đồng bám lên đinh sắt',
      en: 'Iron + copper(II) sulfate: copper plates onto the nail',
    },
    equation: 'Fe + CuSO4 -> FeSO4 + Cu',
    ionic: 'Fe + Cu2+ -> Fe2+ + Cu',
    category: ['displacement', 'redox', 'color-change'],
    grade: 12,
    reactants: [
      sp('Fe', 's', { color: METAL.fe, form: 'strip' }),
      aq('CuSO4', { color: C.cuSolution, concentration: '0,5 M' }),
    ],
    products: [aq('FeSO4', { color: C.feII }), sp('Cu', 's', { color: METAL.cu })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: C.cuSolution,
      solutionAfter: C.feII,
      solid: {
        vi: 'Đinh sắt phủ một lớp đồng màu đỏ nâu; sau vài phút dung dịch nhạt màu xanh dần.',
        en: 'The nail is coated with a red-brown layer of copper; over minutes the blue solution fades.',
      },
      heat: 'none',
      durationSec: 60,
      summary: {
        vi: 'Lớp kim loại đỏ nâu (đồng) bám trên đinh sắt, dung dịch chuyển từ xanh lam sang lục nhạt.',
        en: 'A red-brown metal layer (copper) coats the nail and the solution changes from blue to pale green.',
      },
    },
    explain: {
      vi: 'Sắt hoạt động hoá học mạnh hơn đồng nên đẩy đồng ra khỏi muối: Fe tan thành Fe²⁺ (lục nhạt), Cu²⁺ (xanh lam) bị khử thành Cu bám lên đinh.',
      en: 'Iron is more reactive than copper so it displaces it: Fe dissolves as Fe²⁺ (pale green) while blue Cu²⁺ is reduced to copper on the nail.',
    },
    safety: {
      level: 'safe',
      note: {
        vi: 'Muối đồng hơi độc: đeo găng, rửa tay, thu gom chất thải.',
        en: 'Copper salts are mildly toxic: wear gloves, wash hands, collect waste.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Single_displacement_reaction',
  },
  {
    id: 'zn-cuso4',
    title: {
      vi: 'Kẽm + đồng(II) sunfat: dung dịch mất màu xanh',
      en: 'Zinc + copper(II) sulfate: the blue solution fades',
    },
    equation: 'Zn + CuSO4 -> ZnSO4 + Cu',
    ionic: 'Zn + Cu2+ -> Zn2+ + Cu',
    category: ['displacement', 'redox', 'color-change'],
    grade: 12,
    reactants: [
      sp('Zn', 's', { color: METAL.zn, form: 'granule' }),
      aq('CuSO4', { color: C.cuSolution, concentration: '0,5 M' }),
    ],
    products: [aq('ZnSO4'), sp('Cu', 's', { color: METAL.cu })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: C.cuSolution,
      solutionAfter: COLORLESS,
      solid: {
        vi: 'Kẽm phủ lớp đồng đỏ nâu tơi xốp, kẽm mòn dần.',
        en: 'The zinc gets a loose red-brown copper coating and slowly erodes.',
      },
      heat: 'exo',
      durationSec: 40,
      summary: {
        vi: 'Dung dịch xanh lam nhạt màu dần đến không màu, có chất rắn đỏ nâu (đồng) bám trên kẽm; ống nghiệm ấm lên nhẹ.',
        en: 'The blue solution fades to colourless as red-brown copper deposits on the zinc; the tube warms slightly.',
      },
    },
    explain: {
      vi: 'Kẽm mạnh hơn đồng nên đẩy đồng ra khỏi dung dịch. Zn²⁺ không màu nên dung dịch mất màu xanh của Cu²⁺.',
      en: 'Zinc is more reactive than copper and displaces it. Zn²⁺ is colourless so the blue of Cu²⁺ disappears.',
    },
    safety: {
      level: 'safe',
      note: {
        vi: 'Muối đồng hơi độc: đeo găng, thu gom chất thải.',
        en: 'Copper salts are mildly toxic: wear gloves, collect waste.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Single_displacement_reaction',
  },
  {
    id: 'cu-agno3',
    title: {
      vi: 'Đồng + bạc nitrat: “cây bạc” mọc trên dây đồng',
      en: 'Copper + silver nitrate: a “silver tree” grows on the wire',
    },
    equation: 'Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag',
    ionic: 'Cu + 2Ag+ -> Cu2+ + 2Ag',
    category: ['displacement', 'redox', 'color-change'],
    grade: 12,
    reactants: [
      sp('Cu', 's', { color: METAL.cu, form: 'wire' }),
      aq('AgNO3', { concentration: '0,1 M' }),
    ],
    products: [aq('Cu(NO3)2', { color: C.cuSolution }), sp('Ag', 's', { color: METAL.ag })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: color('#7fb9dd', 'Xanh lam nhạt', 'Light blue', 0.35),
      solid: {
        vi: 'Các tinh thể bạc hình kim, trắng ánh kim, mọc thành cành như cây trên dây đồng; dung dịch dần xanh lam.',
        en: 'Needle-like silvery crystals of silver grow in branches along the copper wire while the solution turns blue.',
      },
      heat: 'none',
      durationSec: 120,
      summary: {
        vi: 'Sau vài phút, bạc kim loại màu trắng bạc mọc thành “cây” trên dây đồng, dung dịch chuyển từ không màu sang xanh lam.',
        en: 'Within minutes silvery metal grows like a tree on the copper wire and the colourless solution turns blue.',
      },
    },
    explain: {
      vi: 'Đồng hoạt động mạnh hơn bạc nên đẩy bạc ra khỏi muối: Cu → Cu²⁺ (xanh lam), Ag⁺ → Ag bám trên dây, kết tinh thành cành.',
      en: 'Copper is more reactive than silver and displaces it: Cu → Cu²⁺ (blue) while Ag⁺ → Ag crystallises in branches on the wire.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'AgNO₃ làm đen da, quần áo. Đeo găng, kính; thu gom chất thải chứa bạc.',
        en: 'AgNO₃ stains skin and clothes. Wear gloves and goggles; collect silver waste.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Silver_nitrate',
  },
  {
    id: 'cl2-nabr',
    title: {
      vi: 'Clo + natri bromua: brom nâu cam được giải phóng',
      en: 'Chlorine + sodium bromide: orange-brown bromine is released',
    },
    equation: 'Cl2 + 2NaBr -> 2NaCl + Br2',
    ionic: 'Cl2 + 2Br- -> 2Cl- + Br2',
    category: ['displacement', 'redox', 'color-change'],
    grade: 10,
    reactants: [
      aq('Cl2', { color: C.chlorineWater, concentration: 'nước clo' }),
      aq('NaBr', { concentration: '0,1 M' }),
    ],
    products: [aq('NaCl'), aq('Br2', { color: C.brOrange })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: C.chlorineWater,
      solutionAfter: C.brOrange,
      heat: 'none',
      durationSec: 15,
      summary: {
        vi: 'Dung dịch vàng lục nhạt của nước clo chuyển sang màu nâu cam của brom khi nhỏ vào dung dịch NaBr.',
        en: 'The pale yellow-green chlorine water turns the orange-brown of bromine when added to NaBr solution.',
      },
    },
    explain: {
      vi: 'Clo có tính oxi hoá mạnh hơn brom nên oxi hoá ion Br⁻ thành Br₂. Dãy F₂ > Cl₂ > Br₂ > I₂ về tính oxi hoá.',
      en: 'Chlorine is a stronger oxidant than bromine, so it oxidises Br⁻ to Br₂. Oxidising power runs F₂ > Cl₂ > Br₂ > I₂.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'Clo và brom đều độc, kích ứng mạnh đường hô hấp. Làm trong tủ hút, lượng nhỏ, đeo kính và găng.',
        en: 'Chlorine and bromine are both toxic and strongly irritate the lungs. Work in a fume hood with small amounts, goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Halogen',
  },
  {
    id: 'br2-ki',
    title: {
      vi: 'Brom + kali iotua: iot nâu được giải phóng',
      en: 'Bromine + potassium iodide: brown iodine is released',
    },
    equation: 'Br2 + 2KI -> 2KBr + I2',
    ionic: 'Br2 + 2I- -> 2Br- + I2',
    category: ['displacement', 'redox', 'color-change'],
    grade: 10,
    reactants: [
      aq('Br2', { color: C.brOrange, concentration: 'nước brom' }),
      aq('KI', { concentration: '0,1 M' }),
    ],
    products: [aq('KBr'), aq('I2', { color: C.iBrown })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: C.brOrange,
      solutionAfter: C.iBrown,
      heat: 'none',
      durationSec: 15,
      summary: {
        vi: 'Màu nâu cam của nước brom chuyển sang màu nâu sẫm của iot trong dung dịch KI.',
        en: 'The orange-brown bromine water turns the darker brown of iodine in KI solution.',
      },
    },
    explain: {
      vi: 'Brom oxi hoá mạnh hơn iot nên đẩy iot ra khỏi muối iotua: Br₂ + 2I⁻ → 2Br⁻ + I₂.',
      en: 'Bromine is a stronger oxidant than iodine and displaces it from iodide: Br₂ + 2I⁻ → 2Br⁻ + I₂.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'Brom độc và ăn mòn, hơi kích ứng mạnh. Chỉ dùng nước brom loãng trong tủ hút, đeo kính và găng.',
        en: 'Bromine is toxic and corrosive with irritating vapour. Use only dilute bromine water in a fume hood with goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Halogen',
  },
  {
    id: 'cl2-ki-starch',
    title: {
      vi: 'Clo + kali iotua + hồ tinh bột: xuất hiện màu xanh tím',
      en: 'Chlorine + potassium iodide + starch: blue-black colour',
    },
    equation: '2KI + Cl2 -> 2KCl + I2',
    ionic: '2I- + Cl2 -> 2Cl- + I2',
    category: ['displacement', 'redox', 'color-change', 'indicator'],
    grade: 10,
    reactants: [
      aq('KI', { concentration: '0,1 M' }),
      aq('Cl2', { color: C.chlorineWater, concentration: 'nước clo' }),
    ],
    products: [aq('KCl'), aq('I2', { color: C.starchBlue })],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Thêm vài giọt hồ tinh bột vào dung dịch KI trước khi cho nước clo.',
        en: 'Add a few drops of starch solution to the KI before the chlorine water.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: C.starchBlue,
      heat: 'none',
      durationSec: 10,
      summary: {
        vi: 'Dung dịch KI có hồ tinh bột chuyển ngay sang màu xanh tím đậm khi nhỏ nước clo.',
        en: 'KI solution containing starch turns an intense blue-black as soon as chlorine water is added.',
      },
    },
    explain: {
      vi: 'Clo đẩy iot ra khỏi KI. Iot tạo phức màu xanh tím với hồ tinh bột, nên phản ứng này nhận biết được iot (và ngược lại, nhận biết các chất oxi hoá làm giải phóng I₂).',
      en: 'Chlorine displaces iodine from KI. Iodine forms a blue-black complex with starch, which is the classic test for iodine and for oxidants that release I₂.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'Clo độc, kích ứng đường hô hấp. Làm trong tủ hút, dùng nước clo loãng, đeo kính và găng.',
        en: 'Chlorine is toxic and irritates the lungs. Use dilute chlorine water in a fume hood with goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Iodine%E2%80%93starch_test',
  },
  {
    id: 'cu-fecl3',
    title: {
      vi: 'Đồng + sắt(III) clorua: đồng tan, dung dịch đổi màu',
      en: 'Copper + iron(III) chloride: copper dissolves, solution changes colour',
    },
    equation: 'Cu + 2FeCl3 -> CuCl2 + 2FeCl2',
    ionic: 'Cu + 2Fe3+ -> Cu2+ + 2Fe2+',
    category: ['redox', 'color-change'],
    grade: 12,
    reactants: [
      sp('Cu', 's', { color: METAL.cu, form: 'strip' }),
      aq('FeCl3', { color: C.feIII, concentration: '1 M' }),
    ],
    products: [
      aq('CuCl2', { color: color('#3aa55a', 'Xanh lục', 'Green', 0.55) }),
      aq('FeCl2', { color: C.feII }),
    ],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: C.feIII,
      solutionAfter: color('#5e9f5a', 'Xanh lục', 'Green', 0.55),
      solid: {
        vi: 'Lá đồng mòn dần và tan hết nếu FeCl₃ đủ.',
        en: 'The copper strip erodes and dissolves completely if FeCl₃ is sufficient.',
      },
      heat: 'none',
      durationSec: 90,
      summary: {
        vi: 'Lá đồng tan dần, dung dịch từ vàng nâu chuyển sang xanh lục (do hỗn hợp Cu²⁺ xanh và Fe²⁺ lục nhạt).',
        en: 'The copper dissolves slowly and the solution changes from yellow-brown to green (blue Cu²⁺ mixed with pale green Fe²⁺).',
      },
    },
    explain: {
      vi: 'Fe³⁺ là chất oxi hoá đủ mạnh để oxi hoá Cu thành Cu²⁺ và bị khử thành Fe²⁺. Phản ứng này dùng để ăn mòn đồng khi làm mạch in.',
      en: 'Fe³⁺ is oxidising enough to turn Cu into Cu²⁺ while being reduced to Fe²⁺. It is used to etch copper in printed circuit boards.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'FeCl₃ ăn mòn, làm bẩn quần áo. Đeo găng, kính; thu gom chất thải chứa đồng.',
        en: 'FeCl₃ is corrosive and stains. Wear gloves and goggles; collect copper waste.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Iron(III)_chloride',
  },
  {
    id: 'kmno4-feso4',
    title: {
      vi: 'KMnO₄ + FeSO₄ trong môi trường axit: mất màu tím',
      en: 'KMnO₄ + FeSO₄ in acid: the purple fades',
    },
    equation: '2KMnO4 + 10FeSO4 + 8H2SO4 -> K2SO4 + 2MnSO4 + 5Fe2(SO4)3 + 8H2O',
    ionic: 'MnO4- + 5Fe2+ + 8H+ -> Mn2+ + 5Fe3+ + 4H2O',
    category: ['redox', 'color-change'],
    grade: 12,
    reactants: [
      aq('KMnO4', { color: KMnO4Dil, concentration: '0,02 M' }),
      aq('FeSO4', { color: C.feII, concentration: '0,1 M' }),
      aq('H2SO4', { concentration: '1 M' }),
    ],
    products: [
      aq('K2SO4'),
      aq('MnSO4', { color: C.mnII }),
      aq('Fe2(SO4)3', { color: C.feIII }),
      sp('H2O', 'l'),
    ],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: KMnO4Dil,
      solutionAfter: color('#d8b84a', 'Vàng', 'Yellow', 0.5),
      heat: 'none',
      durationSec: 10,
      summary: {
        vi: 'Mỗi giọt KMnO₄ tím nhỏ vào dung dịch FeSO₄ đã axit hoá mất màu ngay; khi Fe²⁺ hết, giọt cuối làm dung dịch hồng nhạt bền. Dung dịch chuyển sang màu vàng của Fe³⁺.',
        en: 'Each drop of purple KMnO₄ added to acidified FeSO₄ decolourises at once; when Fe²⁺ is used up a faint pink persists. The solution turns the yellow of Fe³⁺.',
      },
    },
    explain: {
      vi: 'MnO₄⁻ (Mn⁺⁷, màu tím) bị Fe²⁺ khử thành Mn²⁺ gần như không màu, còn Fe²⁺ bị oxi hoá thành Fe³⁺. Phản ứng dùng để chuẩn độ Fe²⁺ bằng KMnO₄.',
      en: 'Fe²⁺ reduces purple MnO₄⁻ (Mn⁺⁷) to nearly colourless Mn²⁺ and is oxidised to Fe³⁺. It is the basis of titrating Fe²⁺ with KMnO₄.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'KMnO₄ làm bẩn da, quần áo, là chất oxi hoá; axit sunfuric gây bỏng. Đeo găng và kính.',
        en: 'KMnO₄ stains and is an oxidiser; sulfuric acid burns. Wear gloves and goggles.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Potassium_permanganate',
  },
  {
    id: 'kmno4-h2o2',
    title: {
      vi: 'KMnO₄ + H₂O₂ trong môi trường axit: mất màu và sủi khí O₂',
      en: 'KMnO₄ + H₂O₂ in acid: decolourises and releases O₂',
    },
    equation: '2KMnO4 + 5H2O2 + 3H2SO4 -> K2SO4 + 2MnSO4 + 5O2 + 8H2O',
    ionic: '2MnO4- + 5H2O2 + 6H+ -> 2Mn2+ + 5O2 + 8H2O',
    category: ['redox', 'color-change', 'gas'],
    grade: 12,
    reactants: [
      aq('KMnO4', { color: KMnO4Dil, concentration: '0,02 M' }),
      aq('H2O2', { concentration: '3 %' }),
      aq('H2SO4', { concentration: '1 M' }),
    ],
    products: [
      aq('K2SO4'),
      aq('MnSO4', { color: C.mnII }),
      sp('O2', 'g', { color: colorlessGas }),
      sp('H2O', 'l'),
    ],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: KMnO4Dil,
      solutionAfter: COLORLESS,
      gas: { formula: 'O2', color: colorlessGas, rate: 'moderate' },
      heat: 'exo',
      durationSec: 15,
      summary: {
        vi: 'Dung dịch tím nhạt màu dần đến không màu, đồng thời sủi bọt khí O₂; ống nghiệm hơi ấm.',
        en: 'The purple solution fades to colourless while O₂ bubbles; the tube warms slightly.',
      },
    },
    explain: {
      vi: 'Với KMnO₄, H₂O₂ đóng vai trò chất khử: O⁻¹ trong H₂O₂ bị oxi hoá thành O₂, còn MnO₄⁻ bị khử thành Mn²⁺ không màu.',
      en: 'Towards KMnO₄, H₂O₂ acts as a reductant: its peroxide oxygen is oxidised to O₂ while MnO₄⁻ is reduced to colourless Mn²⁺.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'KMnO₄ và axit sunfuric đều gây hại; H₂O₂ dùng loãng 3 %. Đeo găng và kính.',
        en: 'KMnO₄ and sulfuric acid are hazardous; use 3 % H₂O₂. Wear gloves and goggles.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Potassium_permanganate',
  },
  {
    id: 'fecl3-kscn',
    title: {
      vi: 'Sắt(III) clorua + kali thioxianat: dung dịch đỏ máu',
      en: 'Iron(III) chloride + potassium thiocyanate: blood-red solution',
    },
    equation: 'FeCl3 + 3KSCN -> Fe(SCN)3 + 3KCl',
    ionic: 'Fe3+ + 3SCN- -> Fe(SCN)3',
    category: ['color-change'],
    grade: 12,
    reactants: [
      aq('FeCl3', {
        color: color('#e6d79a', 'Vàng nhạt', 'Pale yellow', 0.25),
        concentration: '0,01 M',
      }),
      aq('KSCN', { concentration: '0,1 M' }),
    ],
    products: [aq('Fe(SCN)3', { color: color('#b3121b', 'Đỏ máu', 'Blood red', 0.85) }), aq('KCl')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: color('#e6d79a', 'Vàng nhạt', 'Pale yellow', 0.25),
      solutionAfter: color('#b3121b', 'Đỏ máu', 'Blood red', 0.85),
      heat: 'none',
      durationSec: 3,
      summary: {
        vi: 'Nhỏ dung dịch KSCN vào dung dịch FeCl₃ loãng, dung dịch chuyển ngay sang màu đỏ máu.',
        en: 'Adding KSCN to dilute FeCl₃ turns the solution blood red immediately.',
      },
    },
    explain: {
      vi: 'Fe³⁺ tạo phức thioxianat màu đỏ máu với SCN⁻; chỉ cần lượng rất nhỏ Fe³⁺ cũng thấy rõ nên đây là cách nhận biết ion Fe³⁺ rất nhạy.',
      en: 'Fe³⁺ forms a blood-red thiocyanate complex with SCN⁻; even traces are visible, making this a very sensitive Fe³⁺ test.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Thioxianat độc nếu nuốt, và không để tiếp xúc với axit mạnh. Đeo găng, kính.',
        en: 'Thiocyanate is harmful if swallowed and must not meet strong acid. Wear gloves and goggles.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Thiocyanate',
  },
]);

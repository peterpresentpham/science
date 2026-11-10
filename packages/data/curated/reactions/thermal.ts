import { defineReactions } from '../../src/reaction';
import { aq, C, color, COLORLESS, METAL, sp } from './helpers';

const gasless = color('#eef4f8', 'Không màu', 'Colorless', 0.04);
const phenolphthaleinPink = C.pink;
const litmusPurple = color('#7e57c2', 'Tím', 'Purple', 0.55);
const litmusRed = color('#d32f2f', 'Đỏ', 'Red', 0.6);

/** Phân huỷ, trung hoà/chỉ thị, toả nhiệt, thu nhiệt, đốt cháy. */
export const THERMAL = defineReactions([
  // --- Phân huỷ ---
  {
    id: 'kclo3-heat',
    title: {
      vi: 'Nhiệt phân kali clorat (xúc tác MnO₂): khí O₂',
      en: 'Heating potassium chlorate (MnO₂ catalyst): O₂ gas',
    },
    equation: '2KClO3 -> 2KCl + 3O2',
    category: ['decomposition', 'gas'],
    grade: 10,
    reactants: [sp('KClO3', 's', { color: C.white, form: 'powder' })],
    products: [sp('KCl', 's', { color: C.white }), sp('O2', 'g', { color: gasless })],
    conditions: { heat: true, catalyst: 'MnO₂', light: false },
    observations: {
      gas: { formula: 'O2', color: gasless, rate: 'moderate' },
      solid: {
        vi: 'Chất rắn trắng nóng chảy, sủi bọt, còn lại KCl trắng cùng bột MnO₂ đen.',
        en: 'The white solid melts and bubbles, leaving white KCl mixed with black MnO₂.',
      },
      heat: 'none',
      durationSec: 40,
      summary: {
        vi: 'Khi đun nóng, hỗn hợp nóng chảy và thoát khí O₂ (làm than hồng bùng cháy). Có MnO₂ phản ứng xảy ra ở nhiệt độ thấp hơn.',
        en: 'On heating the mixture melts and releases O₂, which relights a glowing splint. MnO₂ lowers the temperature needed.',
      },
    },
    explain: {
      vi: 'KClO₃ bị nhiệt phân thành KCl và O₂. MnO₂ làm xúc tác nên giảm nhiệt độ phản ứng. Đây là cách điều chế khí O₂ trong phòng thí nghiệm.',
      en: 'KClO₃ decomposes to KCl and O₂; MnO₂ is a catalyst that lowers the temperature. It is a classic lab preparation of oxygen.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'KClO₃ là chất oxi hoá mạnh, nổ khi trộn với chất hữu cơ, lưu huỳnh, bột kim loại. Dùng lượng nhỏ, ống chịu nhiệt, miệng ống hơi chúc xuống, đeo kính.',
        en: 'KClO₃ is a strong oxidiser that can explode with organics, sulfur or metal powders. Use small amounts in a heat-resistant tube tilted down, with goggles.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Potassium_chlorate',
  },
  {
    id: 'caco3-heat',
    title: {
      vi: 'Nhiệt phân đá vôi: vôi sống CaO và CO₂',
      en: 'Heating limestone: quicklime CaO and CO₂',
    },
    equation: 'CaCO3 -> CaO + CO2',
    category: ['decomposition', 'gas'],
    grade: 11,
    reactants: [sp('CaCO3', 's', { color: C.white, form: 'piece' })],
    products: [sp('CaO', 's', { color: C.white }), sp('CO2', 'g', { color: gasless })],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Cần nhiệt độ rất cao (trên 800 °C, khoảng 900 °C): dùng đèn khò hoặc lò nung, không làm được bằng đèn cồn thông thường.',
        en: 'Needs very high temperature (above 800 °C, about 900 °C): a blowtorch or furnace, not an ordinary spirit lamp.',
      },
    },
    observations: {
      gas: { formula: 'CO2', color: gasless, rate: 'slow' },
      solid: {
        vi: 'Đá vôi nung đỏ rồi hoá bở thành bột trắng (vôi sống); khối lượng giảm.',
        en: 'The limestone glows then crumbles to white powder (quicklime) and loses mass.',
      },
      heat: 'none',
      durationSec: 60,
      summary: {
        vi: 'Đá vôi nung ở nhiệt độ cao thoát khí CO₂ và để lại vôi sống CaO màu trắng; thêm nước vào CaO sẽ toả nhiệt mạnh.',
        en: 'Strongly heated limestone gives off CO₂ and leaves white quicklime; adding water to the CaO releases a lot of heat.',
      },
    },
    explain: {
      vi: 'Ở nhiệt độ cao CaCO₃ bị phân huỷ thành CaO và CO₂. Phản ứng thu nhiệt, là cơ sở sản xuất vôi sống trong công nghiệp.',
      en: 'At high temperature CaCO₃ decomposes to CaO and CO₂. It is endothermic and the basis of industrial lime making.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Nhiệt độ rất cao, gắp bằng kẹp chịu nhiệt; CaO sau nung ăn da, đeo kính và găng.',
        en: 'Very hot: handle with tongs; the CaO produced is caustic, so wear goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Lime_(material)',
  },
  {
    id: 'cuoh2-heat',
    title: {
      vi: 'Nhiệt phân Cu(OH)₂: xanh lam → đen CuO',
      en: 'Heating Cu(OH)₂: blue → black CuO',
    },
    equation: 'Cu(OH)2 -> CuO + H2O',
    category: ['decomposition', 'color-change'],
    grade: 12,
    reactants: [sp('Cu(OH)2', 's', { color: C.cuHydroxide })],
    products: [sp('CuO', 's', { color: C.blackSolid }), sp('H2O', 'l')],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Đun nóng nhẹ kết tủa Cu(OH)₂ vừa tạo thành, ngay trong dung dịch cũng xảy ra.',
        en: 'Gentle heating of freshly made Cu(OH)₂ works even in the solution.',
      },
    },
    observations: {
      solutionBefore: color('#9cc7ea', 'Xanh lam nhạt', 'Pale blue', 0.35),
      solutionAfter: COLORLESS,
      solid: {
        vi: 'Kết tủa xanh lam chuyển dần sang màu đen khi đun nóng.',
        en: 'The blue precipitate gradually turns black on heating.',
      },
      heat: 'none',
      durationSec: 20,
      summary: {
        vi: 'Khi đun nóng, Cu(OH)₂ xanh lam mất nước thành CuO màu đen.',
        en: 'On heating, blue Cu(OH)₂ loses water and becomes black CuO.',
      },
    },
    explain: {
      vi: 'Hiđroxit của kim loại ít hoạt động như Cu(OH)₂ không bền với nhiệt, bị phân huỷ thành oxit tương ứng và nước.',
      en: 'Hydroxides of less reactive metals such as Cu(OH)₂ are thermally unstable and decompose to the oxide and water.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Đun ống nghiệm hướng miệng ống ra xa người; có thể sôi bắn. Đeo kính.',
        en: 'Point the tube away from people; it may boil and spit. Wear goggles.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Copper(II)_hydroxide',
  },
  {
    id: 'kmno4-heat',
    title: {
      vi: 'Nhiệt phân kali pemanganat: khí O₂',
      en: 'Heating potassium permanganate: O₂ gas',
    },
    equation: '2KMnO4 -> K2MnO4 + MnO2 + O2',
    category: ['decomposition', 'gas'],
    grade: 10,
    reactants: [
      sp('KMnO4', 's', { color: color('#4a148c', 'Tím đen', 'Dark purple', 1), form: 'powder' }),
    ],
    products: [
      sp('K2MnO4', 's', { color: color('#1b5e20', 'Lục thẫm', 'Dark green', 1) }),
      sp('MnO2', 's', { color: C.blackSolid }),
      sp('O2', 'g', { color: gasless }),
    ],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Nhét một nhúm bông ở miệng ống để không kéo bột KMnO₄ vào ống dẫn khí.',
        en: 'Plug the tube mouth with cotton wool so KMnO₄ dust is not carried into the delivery tube.',
      },
    },
    observations: {
      gas: { formula: 'O2', color: gasless, rate: 'moderate' },
      solid: {
        vi: 'Tinh thể tím đen chuyển sang chất rắn đen lục (K₂MnO₄ lục thẫm lẫn MnO₂ đen).',
        en: 'Dark purple crystals become a dark green-black solid (green K₂MnO₄ mixed with black MnO₂).',
      },
      heat: 'none',
      durationSec: 40,
      summary: {
        vi: 'Đun nóng KMnO₄ thoát khí O₂ làm bùng cháy than hồng; chất rắn còn lại màu đen lục.',
        en: 'Heated KMnO₄ releases O₂ that relights a glowing splint, leaving a dark green-black solid.',
      },
    },
    explain: {
      vi: 'KMnO₄ kém bền nhiệt, bị phân huỷ thành K₂MnO₄, MnO₂ và O₂. Phản ứng dùng để điều chế khí O₂ trong phòng thí nghiệm.',
      en: 'KMnO₄ decomposes on heating to K₂MnO₄, MnO₂ and O₂, a common laboratory source of oxygen.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'KMnO₄ là chất oxi hoá, làm bẩn da và quần áo. Đeo kính, găng, dùng ống chịu nhiệt.',
        en: 'KMnO₄ is an oxidiser and stains. Wear goggles, gloves and use a heat-resistant tube.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Potassium_permanganate',
  },

  // --- Trung hoà, chỉ thị ---
  {
    id: 'hcl-naoh-phenolphthalein',
    title: {
      vi: 'Trung hoà HCl bằng NaOH với phenolphtalein: hồng → mất màu',
      en: 'Neutralising NaOH with HCl using phenolphthalein: pink → colourless',
    },
    equation: 'HCl + NaOH -> NaCl + H2O',
    ionic: 'H+ + OH- -> H2O',
    category: ['neutralization', 'indicator', 'exothermic'],
    grade: 11,
    reactants: [
      aq('HCl', { concentration: '0,1 M' }),
      aq('NaOH', { color: phenolphthaleinPink, concentration: '0,1 M' }),
    ],
    products: [aq('NaCl'), sp('H2O', 'l')],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Nhỏ vài giọt phenolphtalein vào dung dịch NaOH trước; thêm HCl từng giọt, lắc đều.',
        en: 'Add a few drops of phenolphthalein to the NaOH first; add HCl drop by drop, swirling.',
      },
    },
    observations: {
      solutionBefore: phenolphthaleinPink,
      solutionAfter: COLORLESS,
      heat: 'exo',
      durationSec: 20,
      summary: {
        vi: 'Dung dịch NaOH có phenolphtalein màu hồng tím mất màu hẳn tại điểm trung hoà khi nhỏ đủ HCl; ống hơi ấm lên.',
        en: 'The magenta NaOH solution with phenolphthalein turns colourless at the neutralisation point as enough HCl is added; the tube warms slightly.',
      },
    },
    explain: {
      vi: 'Phenolphtalein hồng trong môi trường bazơ (pH > 8,2) và không màu trong môi trường axit/trung tính. Khi H⁺ trung hoà hết OH⁻ thì màu hồng mất, báo điểm tương đương.',
      en: 'Phenolphthalein is pink in base (pH above 8.2) and colourless in acid or neutral solution. When H⁺ has used up the OH⁻ the pink disappears, marking the end point.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NaOH và HCl đều gây hại cho da, mắt. Đeo kính và găng.',
        en: 'NaOH and HCl both harm skin and eyes. Wear goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Phenolphthalein',
  },
  {
    id: 'co2-water-litmus',
    title: {
      vi: 'CO₂ tan trong nước làm quỳ tím hoá đỏ nhạt',
      en: 'CO₂ dissolved in water turns litmus faint red',
    },
    equation: 'CO2 + H2O -> H2CO3',
    category: ['indicator'],
    grade: 11,
    reactants: [
      sp('CO2', 'g', { form: 'gas' }),
      sp('H2O', 'l', { color: litmusPurple, form: 'liquid' }),
    ],
    products: [aq('H2CO3', { color: litmusRed })],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Sục CO₂ vào nước cất đã nhỏ vài giọt quỳ tím.',
        en: 'Bubble CO₂ into distilled water containing a few drops of litmus.',
      },
    },
    observations: {
      solutionBefore: litmusPurple,
      solutionAfter: color('#c2185b', 'Đỏ tím', 'Red-violet', 0.55),
      heat: 'none',
      durationSec: 20,
      summary: {
        vi: 'Sục CO₂ vào nước có quỳ tím, dung dịch từ tím chuyển sang đỏ tím nhạt (axit yếu). Đun nóng thì khí thoát ra, màu tím trở lại.',
        en: 'Bubbling CO₂ into water with litmus turns it from purple to a faint red-violet (a weak acid). Heating drives the gas off and the purple returns.',
      },
    },
    explain: {
      vi: 'CO₂ hoà tan tạo axit cacbonic H₂CO₃, là axit yếu, nên chỉ làm quỳ tím đổi sang đỏ nhạt. H₂CO₃ không bền, đun nóng lại phân huỷ về CO₂ và nước.',
      en: 'Dissolved CO₂ gives carbonic acid, a weak and unstable acid, so litmus only turns faintly red; heating decomposes it back to CO₂ and water.',
    },
    safety: {
      level: 'safe',
      note: { vi: 'Không có nguy hiểm đáng kể.', en: 'No significant hazard.' },
    },
    source: 'https://en.wikipedia.org/wiki/Litmus',
  },
  {
    id: 'nh3-water-phenolphthalein',
    title: {
      vi: 'Amoniac trong nước làm phenolphtalein hoá hồng',
      en: 'Ammonia in water turns phenolphthalein pink',
    },
    equation: 'NH3 + H2O -> NH4^+ + OH^-',
    category: ['indicator'],
    grade: 11,
    reactants: [
      sp('NH3', 'g', { form: 'gas' }),
      sp('H2O', 'l', { color: COLORLESS, form: 'liquid' }),
    ],
    products: [aq('NH4^+'), aq('OH^-', { color: phenolphthaleinPink })],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Nhỏ phenolphtalein vào dung dịch NH₃; đun nóng thì NH₃ bay đi và màu hồng nhạt dần.',
        en: 'Add phenolphthalein to the ammonia solution; heating drives NH₃ off and the pink fades.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: phenolphthaleinPink,
      heat: 'none',
      durationSec: 10,
      summary: {
        vi: 'Dung dịch amoniac không màu chuyển sang hồng tím khi nhỏ phenolphtalein, chứng tỏ có môi trường bazơ.',
        en: 'Colourless ammonia solution turns magenta when phenolphthalein is added, showing it is basic.',
      },
    },
    explain: {
      vi: 'NH₃ nhận proton của nước tạo NH₄⁺ và OH⁻ (bazơ yếu), nên dung dịch có môi trường bazơ làm phenolphtalein hồng.',
      en: 'NH₃ takes a proton from water to give NH₄⁺ and OH⁻ (a weak base), so the solution is basic and phenolphthalein turns pink.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Amoniac đặc có mùi khai gây kích ứng mạnh; dùng dung dịch loãng, nơi thoáng.',
        en: 'Concentrated ammonia has a pungent, irritating smell; use dilute solution in a ventilated space.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Ammonia',
  },

  // --- Toả nhiệt, thu nhiệt ---
  {
    id: 'cao-water',
    title: { vi: 'Vôi sống + nước: toả nhiệt mạnh', en: 'Quicklime + water: strongly exothermic' },
    equation: 'CaO + H2O -> Ca(OH)2',
    category: ['exothermic'],
    grade: 10,
    reactants: [
      sp('CaO', 's', { color: C.white, form: 'piece' }),
      sp('H2O', 'l', { form: 'liquid' }),
    ],
    products: [sp('Ca(OH)2', 's', { color: C.white })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: C.milky,
      solid: {
        vi: 'Cục vôi sống nứt vỡ, bở ra thành bột nhão màu trắng (vôi tôi).',
        en: 'The lump of quicklime cracks and crumbles to a white paste (slaked lime).',
      },
      heat: 'exo',
      durationSec: 30,
      summary: {
        vi: 'Vôi sống nóng lên rất nhanh, nước nóng và bốc hơi, vôi bở thành bột trắng; nước thành đục như sữa vôi.',
        en: 'The quicklime heats up fast, the water steams, the lump crumbles to white paste and the water turns milky.',
      },
    },
    explain: {
      vi: 'CaO phản ứng với nước tạo Ca(OH)₂ và toả nhiều nhiệt (có thể làm nước sôi). Ca(OH)₂ ít tan nên nước thành đục (sữa vôi).',
      en: 'CaO reacts with water to form Ca(OH)₂ and releases much heat (enough to boil water). Ca(OH)₂ is sparingly soluble so the water becomes milky lime milk.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Nóng, có thể bắn; vôi ăn da và mắt. Dùng lượng nhỏ, đeo kính, găng.',
        en: 'Hot and may spit; lime burns skin and eyes. Use small amounts, goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Calcium_oxide',
  },
  {
    id: 'h2so4-dilution',
    title: {
      vi: 'Pha loãng axit sunfuric đặc: toả nhiệt mạnh',
      en: 'Diluting concentrated sulfuric acid: strongly exothermic',
    },
    equation: 'H2SO4 + H2O -> H3O^+ + HSO4^-',
    category: ['exothermic'],
    grade: 10,
    reactants: [
      aq('H2SO4', { concentration: 'đặc', form: 'liquid' }),
      sp('H2O', 'l', { form: 'liquid' }),
    ],
    products: [aq('H3O^+'), aq('HSO4^-')],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'LUÔN rót từ từ axit vào nước, khuấy đều. Tuyệt đối không rót nước vào axit đặc.',
        en: 'ALWAYS pour acid slowly into water while stirring. Never add water to concentrated acid.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      heat: 'exo',
      durationSec: 20,
      summary: {
        vi: 'Khi rót axit đặc vào nước, hỗn hợp nóng lên rất nhanh (có thể nóng bỏng tay), cốc nóng.',
        en: 'Pouring concentrated acid into water heats the mixture very quickly, so the beaker becomes too hot to hold.',
      },
    },
    explain: {
      vi: 'Sự hiđrat hoá axit sunfuric toả rất nhiều nhiệt. Nếu rót nước vào axit đặc, nước nhẹ nổi lên, sôi cục bộ và bắn axit ra ngoài.',
      en: 'Hydration of sulfuric acid releases a great deal of heat. If water is added to the acid, the light water floats, boils locally and spits acid.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'Axit đặc gây bỏng nặng và có thể bắn. Đeo kính bảo hộ, găng, áo choàng; rót từ từ, khuấy; không dùng cốc thuỷ tinh thường.',
        en: 'Concentrated acid causes severe burns and can spit. Wear safety goggles, gloves and a coat; pour slowly while stirring; use heat-resistant glass.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Sulfuric_acid',
  },
  {
    id: 'nh4no3-dissolve',
    title: {
      vi: 'Hoà tan amoni nitrat trong nước: thu nhiệt, ống lạnh đi',
      en: 'Dissolving ammonium nitrate in water: endothermic, the tube cools',
    },
    equation: 'NH4NO3 -> NH4^+ + NO3^-',
    category: ['endothermic'],
    grade: 10,
    reactants: [sp('NH4NO3', 's', { color: C.white, form: 'granule' })],
    products: [aq('NH4^+'), aq('NO3^-')],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Hoà tan trong nước (nước là dung môi, không ghi trong phương trình).',
        en: 'Dissolved in water (the solvent is not written in the equation).',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      solid: { vi: 'Các hạt trắng tan dần.', en: 'The white granules dissolve.' },
      heat: 'endo',
      durationSec: 30,
      summary: {
        vi: 'Hạt NH₄NO₃ tan trong nước và nhiệt độ dung dịch giảm rõ rệt; thành ống lạnh toát, đọng sương bên ngoài. Dùng trong túi chườm lạnh.',
        en: 'NH₄NO₃ dissolves and the solution cools markedly; the tube feels cold and condensation forms outside. It is used in instant cold packs.',
      },
    },
    explain: {
      vi: 'Năng lượng để phá mạng tinh thể lớn hơn năng lượng toả ra khi hiđrat hoá ion, nên quá trình hoà tan thu nhiệt từ môi trường xung quanh.',
      en: 'The energy needed to break the crystal lattice exceeds the energy released when the ions hydrate, so dissolving absorbs heat from the surroundings.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NH₄NO₃ là chất oxi hoá, nổ khi trộn chất cháy hoặc gặp nhiệt độ cao; chỉ dùng lượng nhỏ, tránh lửa.',
        en: 'NH₄NO₃ is an oxidiser that can explode with fuels or strong heat; use small amounts and no flames.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Ammonium_nitrate',
  },
  {
    id: 'baoh2-nh4cl',
    title: {
      vi: 'Ba(OH)₂·8H₂O + NH₄Cl: thu nhiệt mạnh, đóng băng cốc',
      en: 'Ba(OH)₂·8H₂O + NH₄Cl: strongly endothermic, freezes the flask',
    },
    equation: 'Ba(OH)2*8H2O + 2NH4Cl -> BaCl2 + 2NH3 + 10H2O',
    category: ['endothermic', 'gas'],
    grade: 10,
    reactants: [
      sp('Ba(OH)2*8H2O', 's', { color: C.white, form: 'powder' }),
      sp('NH4Cl', 's', { color: C.white, form: 'powder' }),
    ],
    products: [aq('BaCl2'), sp('NH3', 'g', { color: gasless }), sp('H2O', 'l')],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      gas: {
        formula: 'NH3',
        color: gasless,
        smell: { vi: 'Khai, xốc', en: 'Pungent' },
        rate: 'moderate',
      },
      solid: {
        vi: 'Hai chất rắn trắng trộn lại thành bùn lỏng, nhiệt độ giảm mạnh đến dưới 0 °C, nước đọng ngoài cốc đóng băng.',
        en: 'The two white solids mix into a slush; the temperature drops below 0 °C and water on the outside of the flask freezes.',
      },
      heat: 'endo',
      durationSec: 60,
      summary: {
        vi: 'Trộn hai chất rắn, hỗn hợp tự hoá lỏng, thoát khí mùi khai và lạnh dưới 0 °C, đủ làm đóng băng miếng gỗ ướt dưới cốc.',
        en: 'Mixing the two solids makes a liquid slush that releases an ammonia smell and falls below 0 °C, enough to freeze a wet wooden block under the flask.',
      },
    },
    explain: {
      vi: 'Phản ứng giữa hai chất rắn tạo chất lỏng và khí, entropi tăng mạnh nên phản ứng tự xảy ra dù thu nhiệt rất lớn từ môi trường.',
      en: 'Two solids react to give a liquid and a gas; the large entropy increase lets the reaction proceed spontaneously even though it absorbs a lot of heat.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Muối bari độc, NH₃ kích ứng mạnh; dùng lượng nhỏ, nơi thoáng, đeo găng và kính. Cốc lạnh có thể gây bỏng lạnh.',
        en: 'Barium salts are toxic and NH₃ irritates; use small amounts in a ventilated space with gloves and goggles. The cold flask can cause cold burns.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Barium_hydroxide',
  },

  // --- Đốt cháy ---
  {
    id: 'mg-o2',
    title: {
      vi: 'Đốt magie: ánh sáng trắng chói',
      en: 'Burning magnesium: a dazzling white light',
    },
    equation: '2Mg + O2 -> 2MgO',
    category: ['combustion', 'redox', 'exothermic'],
    grade: 10,
    reactants: [sp('Mg', 's', { color: METAL.mg, form: 'strip' }), sp('O2', 'g', { form: 'gas' })],
    products: [sp('MgO', 's', { color: C.white })],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Đốt nóng dải magie bằng ngọn lửa đèn cồn đến khi bắt cháy.',
        en: 'Heat the ribbon in a flame until it ignites.',
      },
    },
    observations: {
      solid: {
        vi: 'Dải magie bạc cháy thành bột trắng MgO, một phần thành khói trắng.',
        en: 'The silvery ribbon burns to white MgO powder, partly as white smoke.',
      },
      heat: 'exo',
      light: { color: color('#ffffff', 'Trắng chói', 'Dazzling white', 1), intensity: 'blinding' },
      durationSec: 6,
      summary: {
        vi: 'Magie cháy với ngọn lửa trắng rất sáng, toả nhiều nhiệt, để lại bột trắng MgO.',
        en: 'Magnesium burns with a very bright white flame and much heat, leaving white MgO powder.',
      },
    },
    explain: {
      vi: 'Magie kết hợp mạnh với oxi trong không khí, toả nhiều nhiệt và ánh sáng nên cháy chói. Magie cháy được cả trong CO₂ và hơi nước.',
      en: 'Magnesium combines vigorously with oxygen, releasing so much heat and light that it burns dazzlingly. It even burns in CO₂ and steam.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'Ánh sáng chói gây hại mắt: không nhìn trực tiếp, đeo kính sẫm. Không dùng nước dập đám cháy magie; đặt trên đế chịu nhiệt.',
        en: 'The bright light can damage eyes: do not look directly, wear dark goggles. Never use water on burning magnesium; work on a heat-proof mat.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Magnesium_oxide',
  },
  {
    id: 's-o2',
    title: {
      vi: 'Đốt lưu huỳnh: ngọn lửa xanh và khí SO₂',
      en: 'Burning sulfur: blue flame and SO₂',
    },
    equation: 'S + O2 -> SO2',
    category: ['combustion', 'redox', 'gas'],
    grade: 10,
    reactants: [
      sp('S', 's', { color: color('#f1e03a', 'Vàng', 'Yellow', 1), form: 'powder' }),
      sp('O2', 'g', { form: 'gas' }),
    ],
    products: [sp('SO2', 'g', { color: gasless })],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Đốt lưu huỳnh trong muỗng đốt, rồi đưa vào bình chứa khí oxi.',
        en: 'Ignite sulfur in a deflagrating spoon and lower it into a jar of oxygen.',
      },
    },
    observations: {
      gas: {
        formula: 'SO2',
        color: gasless,
        smell: { vi: 'Hắc, sặc', en: 'Sharp, choking' },
        rate: 'moderate',
      },
      solid: {
        vi: 'Lưu huỳnh vàng nóng chảy thành chất lỏng đỏ nâu rồi cháy hết.',
        en: 'The yellow sulfur melts to a red-brown liquid and burns away.',
      },
      heat: 'exo',
      light: { color: color('#3a5bff', 'Xanh lam tím', 'Blue-violet', 0.8), intensity: 'glow' },
      durationSec: 15,
      summary: {
        vi: 'Trong không khí S cháy với ngọn lửa xanh nhạt; trong oxi ngọn lửa xanh tím sáng hơn, sinh khí SO₂ mùi hắc.',
        en: 'In air sulfur burns with a faint blue flame; in oxygen the flame is brighter blue-violet, giving pungent SO₂.',
      },
    },
    explain: {
      vi: 'Lưu huỳnh bị oxi hoá thành SO₂ (S⁺⁴). Trong oxi tinh khiết, phản ứng mạnh hơn nên ngọn lửa sáng hơn so với trong không khí.',
      en: 'Sulfur is oxidised to SO₂ (S⁺⁴). In pure oxygen the reaction is more vigorous so the flame is brighter than in air.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'SO₂ độc, gây ho, co thắt phế quản. Làm trong tủ hút, lượng rất nhỏ, đậy nắp bình sau khi đốt.',
        en: 'SO₂ is toxic and causes coughing and bronchospasm. Work in a fume hood with a tiny amount and cover the jar after burning.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Sulfur_dioxide',
  },
  {
    id: 'fe-o2',
    title: {
      vi: 'Đốt sắt trong oxi: tia lửa sáng, tạo Fe₃O₄',
      en: 'Burning iron in oxygen: bright sparks forming Fe₃O₄',
    },
    equation: '3Fe + 2O2 -> Fe3O4',
    category: ['combustion', 'redox', 'exothermic'],
    grade: 10,
    reactants: [sp('Fe', 's', { color: METAL.fe, form: 'wire' }), sp('O2', 'g', { form: 'gas' })],
    products: [sp('Fe3O4', 's', { color: C.blackSolid })],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Quấn mẩu than hoặc que diêm ở đầu dây sắt để mồi, rồi đưa vào bình oxi (đáy bình có lớp cát hoặc nước).',
        en: 'Tie a match or bit of charcoal to the wire as a starter and lower it into an oxygen jar with sand or water at the bottom.',
      },
    },
    observations: {
      solid: {
        vi: 'Dây sắt cháy sáng, các giọt oxit sắt nóng chảy màu đen rơi xuống đáy bình.',
        en: 'The wire burns brightly and molten black iron oxide drops fall to the bottom.',
      },
      heat: 'exo',
      light: { color: color('#ffb347', 'Cam vàng', 'Orange-yellow', 0.9), intensity: 'bright' },
      durationSec: 12,
      summary: {
        vi: 'Dây sắt cháy trong oxi, bắn ra nhiều tia lửa sáng, tạo các hạt oxit sắt từ Fe₃O₄ màu đen.',
        en: 'The iron wire burns in oxygen throwing off bright sparks, forming black beads of iron oxide Fe₃O₄.',
      },
    },
    explain: {
      vi: 'Sắt bị oxi hoá mạnh trong oxi tinh khiết ở nhiệt độ cao thành oxit sắt từ Fe₃O₄. Lớp cát hoặc nước ở đáy để giọt oxit nóng chảy không làm nứt bình.',
      en: 'Iron is oxidised strongly in pure oxygen at high temperature to the magnetic oxide Fe₃O₄. Sand or water at the bottom stops hot droplets cracking the jar.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Tia lửa và giọt kim loại nóng bắn ra; đeo kính, để bình có lớp cát, giữ khoảng cách.',
        en: 'Sparks and molten droplets fly; wear goggles, use sand in the jar and keep your distance.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Iron(II,III)_oxide',
  },
  {
    id: 'p-o2',
    title: {
      vi: 'Đốt photpho đỏ: khói trắng P₂O₅',
      en: 'Burning red phosphorus: white smoke of P₂O₅',
    },
    equation: '4P + 5O2 -> 2P2O5',
    category: ['combustion', 'redox', 'exothermic'],
    grade: 10,
    reactants: [
      sp('P', 's', { color: color('#a12d2d', 'Đỏ thẫm', 'Dark red', 1), form: 'powder' }),
      sp('O2', 'g', { form: 'gas' }),
    ],
    products: [sp('P2O5', 's', { color: C.white, cid: 14812 })],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Đốt photpho đỏ trong muỗng đốt rồi đưa vào bình oxi. Dùng photpho đỏ, không dùng photpho trắng.',
        en: 'Ignite red phosphorus in a deflagrating spoon and lower it into an oxygen jar. Use red, never white, phosphorus.',
      },
    },
    observations: {
      solid: {
        vi: 'Bột đỏ cháy hết, thành khói trắng lắng thành lớp bột trắng bám trên thành bình.',
        en: 'The red powder burns away; the white smoke settles as white powder on the jar walls.',
      },
      heat: 'exo',
      light: { color: color('#fff7e0', 'Trắng sáng', 'Bright white', 0.9), intensity: 'bright' },
      durationSec: 15,
      summary: {
        vi: 'Photpho cháy với ngọn lửa sáng chói, khói trắng dày đặc là P₂O₅ (thực tế phân tử P₄O₁₀); khói tan trong nước thành axit photphoric.',
        en: 'Phosphorus burns with a bright flame and thick white smoke of P₂O₅ (in fact molecular P₄O₁₀) that dissolves in water to give phosphoric acid.',
      },
    },
    explain: {
      vi: 'Photpho bị oxi hoá thành P₂O₅ (P⁺⁵). Công thức P₂O₅ là công thức đơn giản nhất; phân tử thật là P₄O₁₀. Oxit này hút ẩm rất mạnh.',
      en: 'Phosphorus is oxidised to P₂O₅ (P⁺⁵). P₂O₅ is the empirical formula; the real molecule is P₄O₁₀. The oxide is strongly hygroscopic.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Khói P₂O₅ gây kích ứng; làm trong tủ hút hoặc nơi thoáng, lượng rất nhỏ. Photpho trắng độc và tự bốc cháy nên không dùng.',
        en: 'P₂O₅ smoke irritates; work in a fume hood or ventilated space with tiny amounts. White phosphorus is toxic and self-igniting: never use it.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Phosphorus_pentoxide',
  },
  {
    id: 'ch4-o2',
    title: { vi: 'Đốt khí metan: ngọn lửa xanh nhạt', en: 'Burning methane: a pale blue flame' },
    equation: 'CH4 + 2O2 -> CO2 + 2H2O',
    category: ['combustion', 'exothermic'],
    grade: 11,
    reactants: [sp('CH4', 'g', { form: 'gas' }), sp('O2', 'g', { form: 'gas' })],
    products: [sp('CO2', 'g', { color: gasless }), sp('H2O', 'g')],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Cần mồi lửa; metan trộn không khí theo tỉ lệ nhất định có thể nổ.',
        en: 'Needs an ignition source; methane mixed with air in certain proportions can explode.',
      },
    },
    observations: {
      gas: { formula: 'CO2', color: gasless, rate: 'slow' },
      heat: 'exo',
      light: { color: color('#4a7fe0', 'Xanh lam', 'Blue', 0.7), intensity: 'glow' },
      durationSec: 10,
      summary: {
        vi: 'Metan cháy với ngọn lửa xanh nhạt, toả nhiều nhiệt; úp cốc khô lên ngọn lửa thấy hơi nước đọng, úp cốc có nước vôi trong thì nước vôi đục (có CO₂).',
        en: 'Methane burns with a pale blue flame and much heat; a dry cold glass held over it mists up with water, and limewater in an inverted glass turns milky (CO₂).',
      },
    },
    explain: {
      vi: 'Metan cháy hoàn toàn trong oxi tạo CO₂ và H₂O. Khi đủ oxi, ngọn lửa xanh; thiếu oxi tạo muội than và CO nên ngọn lửa vàng.',
      en: 'Methane burns completely in oxygen to CO₂ and H₂O. With enough oxygen the flame is blue; with too little, soot and CO form and the flame turns yellow.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'Khí cháy nổ, tránh rò rỉ; làm nơi thoáng, đóng van sau khi dùng. Thiếu oxi sinh CO độc.',
        en: 'Flammable and explosive gas: avoid leaks, work in ventilation and close the valve after use. Oxygen starvation makes toxic CO.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Methane',
  },
]);

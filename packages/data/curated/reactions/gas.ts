import { defineReactions } from '../../src/reaction';
import { aq, C, color, COLORLESS, METAL, sp } from './helpers';

const H2 = color('#eef4f8', 'Không màu', 'Colorless', 0.04);

/** Phản ứng sinh khí. */
export const GAS = defineReactions([
  {
    id: 'zn-hcl',
    title: {
      vi: 'Kẽm + axit clohiđric: sủi bọt khí H₂',
      en: 'Zinc + hydrochloric acid: H₂ bubbles',
    },
    equation: 'Zn + 2HCl -> ZnCl2 + H2',
    ionic: 'Zn + 2H+ -> Zn2+ + H2',
    category: ['gas', 'redox', 'displacement'],
    grade: 10,
    reactants: [
      sp('Zn', 's', { color: METAL.zn, form: 'granule' }),
      aq('HCl', { concentration: '1 M' }),
    ],
    products: [aq('ZnCl2'), sp('H2', 'g', { color: H2 })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      gas: { formula: 'H2', color: H2, rate: 'moderate' },
      solid: {
        vi: 'Viên kẽm nhỏ dần, bề mặt có nhiều bọt khí bám.',
        en: 'The zinc granule shrinks, its surface covered with gas bubbles.',
      },
      heat: 'exo',
      durationSec: 30,
      summary: {
        vi: 'Có bọt khí không màu thoát ra đều từ bề mặt kẽm, kẽm tan dần, ống nghiệm hơi ấm lên.',
        en: 'Colourless bubbles rise steadily from the zinc, which dissolves; the tube warms slightly.',
      },
    },
    explain: {
      vi: 'Kẽm đứng trước hiđro trong dãy hoạt động hoá học nên đẩy H⁺ của axit thành khí H₂, còn kẽm chuyển thành ion Zn²⁺ tan trong dung dịch.',
      en: 'Zinc is above hydrogen in the activity series, so it reduces H⁺ from the acid to H₂ gas while it dissolves as Zn²⁺.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'H₂ cháy nổ khi trộn với không khí: tránh lửa. HCl gây kích ứng, đeo kính và găng.',
        en: 'H₂ is explosive with air: no flames. HCl irritates; wear goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Zinc',
  },
  {
    id: 'mg-hcl',
    title: {
      vi: 'Magie + axit clohiđric: sủi bọt mạnh, toả nhiệt',
      en: 'Magnesium + hydrochloric acid: vigorous fizzing and heat',
    },
    equation: 'Mg + 2HCl -> MgCl2 + H2',
    ionic: 'Mg + 2H+ -> Mg2+ + H2',
    category: ['gas', 'redox', 'displacement', 'exothermic'],
    grade: 10,
    reactants: [
      sp('Mg', 's', { color: METAL.mg, form: 'strip' }),
      aq('HCl', { concentration: '1 M' }),
    ],
    products: [aq('MgCl2'), sp('H2', 'g', { color: H2 })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      gas: { formula: 'H2', color: H2, rate: 'vigorous' },
      solid: {
        vi: 'Dải magie nhanh chóng nhỏ đi và biến mất, đôi khi nổi lên nhờ bọt khí.',
        en: 'The magnesium ribbon shrinks quickly and disappears, sometimes lifted by bubbles.',
      },
      heat: 'exo',
      durationSec: 20,
      summary: {
        vi: 'Sủi bọt rất mạnh, dải magie tan nhanh, ống nghiệm nóng lên thấy rõ.',
        en: 'Very vigorous fizzing, the ribbon dissolves fast and the tube clearly warms.',
      },
    },
    explain: {
      vi: 'Magie hoạt động hơn kẽm nên phản ứng nhanh hơn với cùng nồng độ axit. Phản ứng toả nhiều nhiệt.',
      en: 'Magnesium is more reactive than zinc, so it reacts faster with the same acid, releasing more heat.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'H₂ cháy nổ: tránh lửa. Dùng ít magie, ống nghiệm nóng.',
        en: 'H₂ is explosive: no flames. Use little magnesium; the tube gets hot.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Magnesium',
  },
  {
    id: 'fe-h2so4',
    title: {
      vi: 'Sắt + axit sunfuric loãng: khí H₂, dung dịch lục nhạt',
      en: 'Iron + dilute sulfuric acid: H₂ and a pale green solution',
    },
    equation: 'Fe + H2SO4 -> FeSO4 + H2',
    ionic: 'Fe + 2H+ -> Fe2+ + H2',
    category: ['gas', 'redox', 'displacement'],
    grade: 12,
    reactants: [
      sp('Fe', 's', { color: METAL.fe, form: 'granule' }),
      aq('H2SO4', { concentration: '1 M' }),
    ],
    products: [aq('FeSO4', { color: C.feII }), sp('H2', 'g', { color: H2 })],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Phản ứng chậm ở nhiệt độ thường; đun nhẹ để nhanh hơn.',
        en: 'Slow at room temperature; warm gently to speed up.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: C.feII,
      gas: { formula: 'H2', color: H2, rate: 'slow' },
      solid: {
        vi: 'Đinh sắt tan chậm, có ít bọt khí bám trên bề mặt.',
        en: 'The iron nail dissolves slowly with a few bubbles on its surface.',
      },
      heat: 'none',
      durationSec: 60,
      summary: {
        vi: 'Có bọt khí nhỏ thoát ra chậm từ mẩu sắt; dung dịch dần chuyển sang màu lục nhạt của Fe²⁺.',
        en: 'A few small bubbles rise slowly from the iron; the solution gradually turns the pale green of Fe²⁺.',
      },
    },
    explain: {
      vi: 'Với axit loãng (H⁺ làm chất oxi hoá), sắt chỉ lên Fe(II): Fe → Fe²⁺. Dung dịch Fe²⁺ có màu lục nhạt.',
      en: 'With dilute acid (H⁺ as the oxidant) iron is oxidised only to Fe(II). Fe²⁺ solutions are pale green.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'H₂ cháy nổ; axit gây kích ứng. Đeo kính, găng và tránh lửa.',
        en: 'H₂ is explosive and the acid irritates. Wear goggles, gloves; no flames.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Iron(II)_sulfate',
  },
  {
    id: 'caco3-hcl',
    title: {
      vi: 'Đá vôi + axit clohiđric: sủi bọt khí CO₂',
      en: 'Limestone + hydrochloric acid: CO₂ bubbles',
    },
    equation: 'CaCO3 + 2HCl -> CaCl2 + H2O + CO2',
    ionic: 'CaCO3 + 2H+ -> Ca2+ + H2O + CO2',
    category: ['gas'],
    grade: 11,
    reactants: [
      sp('CaCO3', 's', { color: C.white, form: 'piece' }),
      aq('HCl', { concentration: '1 M' }),
    ],
    products: [aq('CaCl2'), sp('H2O', 'l'), sp('CO2', 'g', { color: H2 })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      gas: { formula: 'CO2', color: H2, rate: 'moderate' },
      solid: {
        vi: 'Viên đá vôi nhỏ dần, bề mặt phủ bọt khí.',
        en: 'The limestone piece shrinks, its surface covered with bubbles.',
      },
      heat: 'none',
      durationSec: 30,
      summary: {
        vi: 'Sủi bọt khí không màu, không mùi từ viên đá vôi; đá tan dần. Khí sục vào nước vôi trong làm nước vôi đục.',
        en: 'Colourless, odourless bubbles rise from the limestone, which dissolves. The gas turns limewater milky.',
      },
    },
    explain: {
      vi: 'Axit mạnh đẩy axit yếu H₂CO₃ ra khỏi muối cacbonat; H₂CO₃ phân huỷ thành H₂O và CO₂. Phản ứng này cũng là cách nhận biết muối cacbonat.',
      en: 'A strong acid displaces weak H₂CO₃ from a carbonate; H₂CO₃ breaks down to H₂O and CO₂. It is also the carbonate test.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'HCl gây kích ứng; đeo kính và găng.',
        en: 'HCl irritates; wear goggles and gloves.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Calcium_carbonate',
  },
  {
    id: 'nh4cl-naoh',
    title: {
      vi: 'Amoni clorua + natri hiđroxit, đun nóng: khí NH₃',
      en: 'Ammonium chloride + sodium hydroxide, heated: NH₃ gas',
    },
    equation: 'NH4Cl + NaOH -> NaCl + NH3 + H2O',
    ionic: 'NH4+ + OH- -> NH3 + H2O',
    category: ['gas'],
    grade: 11,
    reactants: [aq('NH4Cl', { concentration: '1 M' }), aq('NaOH', { concentration: '1 M' })],
    products: [aq('NaCl'), sp('NH3', 'g', { color: H2 }), sp('H2O', 'l')],
    conditions: {
      heat: true,
      light: false,
      note: {
        vi: 'Đun nhẹ hỗn hợp; thử khí bằng giấy quỳ tím ẩm.',
        en: 'Warm the mixture gently; test the gas with damp litmus paper.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      gas: {
        formula: 'NH3',
        color: H2,
        smell: { vi: 'Khai, xốc', en: 'Pungent' },
        rate: 'moderate',
      },
      heat: 'none',
      durationSec: 20,
      summary: {
        vi: 'Khi đun nóng có khí mùi khai thoát ra, làm giấy quỳ tím ẩm đặt miệng ống chuyển sang xanh.',
        en: 'On heating, a pungent gas escapes and turns damp litmus paper at the mouth of the tube blue.',
      },
    },
    explain: {
      vi: 'Ion NH₄⁺ nhường proton cho OH⁻ tạo NH₃ và nước. NH₃ tan trong nước tạo môi trường bazơ nên làm quỳ ẩm hoá xanh. Đây là cách nhận biết ion amoni.',
      en: 'NH₄⁺ gives a proton to OH⁻ forming NH₃ and water. NH₃ dissolves in the moisture to give a basic solution that turns litmus blue. This is the ammonium test.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NH₃ kích ứng mạnh mắt và đường hô hấp: làm ở nơi thoáng, lượng nhỏ, không hít trực tiếp.',
        en: 'NH₃ strongly irritates eyes and lungs: work with small amounts in a ventilated place; do not inhale directly.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Ammonia',
  },
  {
    id: 'na-water',
    title: {
      vi: 'Natri + nước: chạy trên mặt nước, sinh khí H₂',
      en: 'Sodium + water: skates on the surface, releases H₂',
    },
    equation: '2Na + 2H2O -> 2NaOH + H2',
    ionic: '2Na + 2H2O -> 2Na+ + 2OH- + H2',
    category: ['gas', 'redox', 'exothermic'],
    grade: 10,
    reactants: [
      sp('Na', 's', { color: METAL.na, form: 'piece' }),
      sp('H2O', 'l', { form: 'liquid' }),
    ],
    products: [aq('NaOH'), sp('H2', 'g', { color: H2 })],
    conditions: {
      heat: false,
      light: false,
      note: {
        vi: 'Chỉ dùng mẩu natri nhỏ bằng hạt gạo; nhỏ vài giọt phenolphtalein, dung dịch chuyển hồng.',
        en: 'Use a piece the size of a rice grain only; a few drops of phenolphthalein turn the solution pink.',
      },
    },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      gas: { formula: 'H2', color: H2, rate: 'vigorous' },
      solid: {
        vi: 'Mẩu natri nóng chảy thành giọt tròn sáng bạc, chạy nhanh trên mặt nước rồi nhỏ dần đến hết; đôi khi bốc cháy với ngọn lửa vàng.',
        en: 'The sodium melts into a shiny ball that skates over the water and shrinks away; sometimes it ignites with a yellow flame.',
      },
      heat: 'exo',
      durationSec: 15,
      summary: {
        vi: 'Natri chạy trên mặt nước, sủi bọt mạnh, phát tiếng xèo; nước nóng lên, dung dịch trở nên bazơ (làm phenolphtalein hồng).',
        en: 'Sodium darts across the water, fizzing and hissing; the water warms and becomes basic (phenolphthalein turns pink).',
      },
    },
    explain: {
      vi: 'Natri là kim loại kiềm, rất hoạt động, khử H₂O thành H₂ và tạo NaOH. Phản ứng toả nhiều nhiệt nên natri nóng chảy, và H₂ sinh ra có thể bắt lửa.',
      en: 'Sodium is a very reactive alkali metal that reduces water to H₂ and forms NaOH. The heat melts the sodium and can ignite the hydrogen.',
    },
    safety: {
      level: 'danger',
      note: {
        vi: 'Có thể nổ, bắn dung dịch NaOH ăn da. Chỉ dùng mẩu rất nhỏ, đeo kính bảo hộ, đậy tấm chắn, đứng xa; để natri trong dầu hoả, không chạm tay.',
        en: 'May spit caustic NaOH or explode. Use a tiny piece, wear safety goggles, use a shield and stand back; store sodium under oil, never touch it.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Sodium',
  },
  {
    id: 'h2o2-mno2',
    title: {
      vi: 'Hiđro peoxit phân huỷ có xúc tác MnO₂: khí O₂',
      en: 'Hydrogen peroxide decomposition with MnO₂: O₂ gas',
    },
    equation: '2H2O2 -> 2H2O + O2',
    category: ['gas', 'decomposition', 'exothermic'],
    grade: 10,
    reactants: [aq('H2O2', { concentration: '3 %' })],
    products: [sp('H2O', 'l'), sp('O2', 'g', { color: H2 })],
    conditions: { heat: false, catalyst: 'MnO₂', light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      gas: { formula: 'O2', color: H2, rate: 'vigorous' },
      solid: {
        vi: 'Bột MnO₂ đen lơ lửng và không bị tiêu hao.',
        en: 'Black MnO₂ powder stays suspended and is not consumed.',
      },
      heat: 'exo',
      durationSec: 20,
      summary: {
        vi: 'Khi thêm bột MnO₂, dung dịch sủi bọt mạnh, khí O₂ làm than hồng bùng cháy; ống nghiệm ấm lên. Không có MnO₂ phản ứng xảy ra rất chậm.',
        en: 'Adding MnO₂ makes the solution foam vigorously; the O₂ relights a glowing splint and the tube warms. Without MnO₂ the reaction is very slow.',
      },
    },
    explain: {
      vi: 'MnO₂ là chất xúc tác làm tăng tốc độ phân huỷ H₂O₂ mà không bị biến đổi. Đây là ví dụ kinh điển về ảnh hưởng của chất xúc tác đến tốc độ phản ứng.',
      en: 'MnO₂ is a catalyst: it speeds up H₂O₂ decomposition without being used up, a classic example of catalysis.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'H₂O₂ đặc gây bỏng da; dùng dung dịch 3 %. Đeo kính.',
        en: 'Concentrated H₂O₂ burns skin; use 3 % solution. Wear goggles.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Hydrogen_peroxide',
  },
  {
    id: 'al-naoh',
    title: {
      vi: 'Nhôm + dung dịch NaOH: khí H₂',
      en: 'Aluminium + sodium hydroxide solution: H₂ gas',
    },
    equation: '2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2',
    category: ['gas', 'redox'],
    grade: 12,
    reactants: [
      sp('Al', 's', { color: METAL.al, form: 'strip' }),
      aq('NaOH', { concentration: '2 M' }),
      sp('H2O', 'l'),
    ],
    products: [aq('NaAlO2'), sp('H2', 'g', { color: H2 })],
    conditions: { heat: false, light: false },
    observations: {
      solutionBefore: COLORLESS,
      solutionAfter: COLORLESS,
      gas: { formula: 'H2', color: H2, rate: 'vigorous' },
      solid: {
        vi: 'Lá nhôm tan dần, sủi bọt khí mạnh dần lên sau khi lớp oxit bị hoà tan.',
        en: 'The aluminium foil dissolves, fizzing more vigorously once its oxide layer has gone.',
      },
      heat: 'exo',
      durationSec: 40,
      summary: {
        vi: 'Ban đầu sủi bọt chậm, sau đó nhôm tan nhanh, khí H₂ thoát ra nhiều, ống nghiệm nóng lên.',
        en: 'Fizzing starts slowly, then the aluminium dissolves fast with plenty of H₂ and the tube warms.',
      },
    },
    explain: {
      vi: 'Lớp Al₂O₃ bảo vệ bị NaOH hoà tan, nhôm lộ ra khử nước thành H₂ trong môi trường bazơ, tạo natri aluminat. Phản ứng thể hiện tính lưỡng tính của nhôm và hợp chất của nó.',
      en: 'NaOH first strips the protective Al₂O₃ layer, then the bare aluminium reduces water to H₂ in base, forming sodium aluminate.',
    },
    safety: {
      level: 'care',
      note: {
        vi: 'NaOH ăn da, H₂ cháy nổ: đeo kính, găng, tránh lửa.',
        en: 'NaOH is corrosive and H₂ is explosive: wear goggles and gloves; no flames.',
      },
    },
    source: 'https://en.wikipedia.org/wiki/Aluminium',
  },
]);

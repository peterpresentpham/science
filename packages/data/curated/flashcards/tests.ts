import { defineDeck } from '../../src/flashcard.ts';

/** Đối chiếu phạm vi Kết nối tri thức với cuộc sống, GDPT 2018. Nội dung tự biên soạn; quy tắc được ghi kèm phạm vi và ngoại lệ cần thiết. */
export default defineDeck({
  id: 'tests',
  title: {
    vi: 'Nhận biết ion và khí',
    en: 'Identifying ions and gases',
  },
  description: {
    vi: 'Thuốc thử và hiện tượng trong phạm vi thí nghiệm có hướng dẫn; chú ý mẫu trắng và ion gây nhiễu.',
    en: 'Reagents and observations in supervised experiments, accounting for blanks and interfering ions.',
  },
  grade: [10, 11, 12],
  cards: [
    {
      id: 'tests-001',
      front: {
        vi: 'Dấu hiệu H₂ trong phép thử cháy quy mô nhỏ do giáo viên thực hiện?',
        en: 'A hydrogen indicator in a small, teacher-led combustion test?',
      },
      back: {
        vi: 'H₂ cháy với tiếng nổ nhỏ đặc trưng khi trộn phù hợp với không khí. Không thử đốt một nguồn khí chưa biết.',
        en: 'A suitable small hydrogen–air sample burns with a characteristic pop. Do not ignite an unidentified gas supply.',
      },
      elements: ['H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      formula: 'H2',
    },
    {
      id: 'tests-002',
      front: {
        vi: 'Khí nào làm que đóm còn tàn đỏ bùng cháy trở lại?',
        en: 'Which gas relights a glowing splint?',
      },
      back: {
        vi: 'O₂ hỗ trợ sự cháy, làm tàn đóm bùng lại trong phép thử phù hợp. O₂ không phải nhiên liệu đang cháy.',
        en: 'O₂ supports combustion and relights a glowing splint under suitable test conditions. Oxygen is not the fuel.',
      },
      elements: ['O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      formula: 'O2',
    },
    {
      id: 'tests-003',
      front: {
        vi: 'Phép thử thông thường cho CO₂ với nước vôi trong?',
        en: 'The usual CO₂ test with limewater?',
      },
      back: {
        vi: 'Nước vôi trong vẩn đục do CaCO₃ kết tủa khi lượng CO₂ thích hợp. Cần phân biệt với bọt khí đơn thuần.',
        en: 'Limewater turns cloudy as CaCO₃ precipitates with a suitable amount of CO₂. Cloudiness is not merely gas bubbles.',
      },
      elements: ['C', 'O', 'Ca', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      formula: 'CO2',
    },
    {
      id: 'tests-004',
      front: {
        vi: 'NH₃ tác động thế nào lên quỳ đỏ ẩm?',
        en: 'How does NH₃ affect moist red litmus?',
      },
      back: {
        vi: 'Làm quỳ đỏ ẩm hoá xanh do tạo môi trường bazơ. Không nhận biết bằng cách ngửi trực tiếp khí.',
        en: 'It turns moist red litmus blue by creating basic conditions. Direct smelling is not an identification method.',
      },
      elements: ['N', 'H'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      formula: 'NH3',
    },
    {
      id: 'tests-005',
      front: {
        vi: 'Nhận biết NH₄⁺ bằng kiềm trong phòng thí nghiệm dựa vào đâu?',
        en: 'What supports the laboratory alkali test for NH₄⁺?',
      },
      back: {
        vi: 'NH₄⁺ gặp OH⁻, khi làm ấm giải phóng NH₃; dùng quỳ đỏ ẩm kiểm tra tính bazơ của khí, không ngửi trực tiếp.',
        en: 'On warming with OH⁻, NH₄⁺ releases NH₃, identified using moist red litmus rather than direct smelling.',
      },
      elements: ['N', 'H', 'O'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-7-occurrence-preparation-and-properties-of-nitrogen',
      formula: 'NH4^+',
    },
    {
      id: 'tests-006',
      front: {
        vi: 'Ion carbonate gặp axit phù hợp có thể cho hiện tượng gì?',
        en: 'What can carbonate ions do with a suitable acid?',
      },
      back: {
        vi: 'Giải phóng CO₂. Cần xác nhận khí bằng phép thử thích hợp; chỉ sủi bọt chưa xác định duy nhất carbonate.',
        en: 'They release CO₂. Confirm the gas appropriately; fizzing alone does not uniquely establish carbonate.',
      },
      elements: ['C', 'O', 'H'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'CO3^2-',
    },
    {
      id: 'tests-007',
      front: {
        vi: 'Thuốc thử thường dùng để nhận biết SO₄²⁻?',
        en: 'A common reagent for identifying SO₄²⁻?',
      },
      back: {
        vi: 'Ion Ba²⁺ tạo BaSO₄ trắng rất ít tan, trong môi trường axit thích hợp. Tránh tự đưa sulfate vào mẫu qua thuốc thử.',
        en: 'Ba²⁺ forms very sparingly soluble white BaSO₄ in a suitable acidic medium. Avoid adding sulfate through the reagents.',
      },
      elements: ['S', 'O', 'Ba'],
      source:
        'https://openstax.org/books/chemistry-2e/pages/18-10-occurrence-preparation-and-properties-of-sulfur',
      formula: 'SO4^2-',
    },
    {
      id: 'tests-008',
      front: {
        vi: 'Cl⁻ với Ag⁺ cho kết tủa nào?',
        en: 'What precipitate forms from Cl⁻ and Ag⁺?',
      },
      back: {
        vi: 'AgCl trắng trong điều kiện phép thử halide. Chỉ kết luận khi đã xét các ion khác cũng có thể kết tủa với bạc.',
        en: 'White AgCl under halide-test conditions. Other ions that can precipitate with silver must also be considered.',
      },
      elements: ['Ag', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      formula: 'AgCl',
    },
    {
      id: 'tests-009',
      front: {
        vi: 'Br⁻ với Ag⁺ cho kết tủa có màu gì?',
        en: 'What precipitate colour appears for Br⁻ with Ag⁺?',
      },
      back: {
        vi: 'AgBr màu vàng nhạt hoặc kem, khác AgCl trắng và AgI vàng rõ hơn.',
        en: 'AgBr is pale yellow or cream, unlike white AgCl and the more distinctly yellow AgI.',
      },
      elements: ['Ag', 'Br'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      formula: 'AgBr',
    },
    {
      id: 'tests-010',
      front: {
        vi: 'I⁻ với Ag⁺ cho kết tủa nào?',
        en: 'What precipitate forms from I⁻ and Ag⁺?',
      },
      back: {
        vi: 'AgI vàng. Màu hơi I₂ tím không phải màu của kết tủa AgI.',
        en: 'Yellow AgI. Violet I₂ vapour is not the colour of the AgI precipitate.',
      },
      elements: ['Ag', 'I'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
      formula: 'AgI',
    },
    {
      id: 'tests-011',
      front: {
        vi: 'Dung dịch chứa iot tạo màu gì với hồ tinh bột?',
        en: 'What colour does an iodine-containing solution give with starch?',
      },
      back: {
        vi: 'Xanh tím đến xanh đen trong điều kiện phù hợp. Màu do tương tác với tinh bột, không phải mọi hợp chất iot đều cho cùng hiện tượng.',
        en: 'Blue-violet to blue-black under suitable conditions. The starch interaction is not shared by every iodine compound.',
      },
      elements: ['I'],
      source: 'https://edu.rsc.org/experiments/iodine-clock-reaction/744.article',
    },
    {
      id: 'tests-012',
      front: {
        vi: 'Cu²⁺ gặp OH⁻ trong mô hình nhận biết đơn giản cho gì?',
        en: 'What does Cu²⁺ give with OH⁻ in a simple identification model?',
      },
      back: {
        vi: 'Kết tủa Cu(OH)₂ màu xanh lam. Các chất tạo phức có thể làm hiện tượng khác đi.',
        en: 'A blue Cu(OH)₂ precipitate. Complexing agents can alter the observation.',
      },
      elements: ['Cu', 'O', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      formula: 'Cu(OH)2',
    },
    {
      id: 'tests-013',
      front: {
        vi: 'Fe²⁺ gặp OH⁻ thường cho kết tủa nào, màu gì?',
        en: 'What precipitate and colour are usually obtained from Fe²⁺ and OH⁻?',
      },
      back: {
        vi: 'Fe(OH)₂ xanh lục nhạt, có thể chuyển nâu khi bị oxi hoá trong không khí.',
        en: 'Pale green Fe(OH)₂, which can turn brown as air oxidises it.',
      },
      elements: ['Fe', 'O', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      formula: 'Fe(OH)2',
    },
    {
      id: 'tests-014',
      front: {
        vi: 'Fe³⁺ gặp OH⁻ thường cho kết tủa nào?',
        en: 'What precipitate is usually formed by Fe³⁺ with OH⁻?',
      },
      back: {
        vi: 'Fe(OH)₃ màu nâu đỏ. Không dùng màu của ion hoà tan thay cho màu kết tủa mới tạo.',
        en: 'Reddish-brown Fe(OH)₃. Distinguish the dissolved ion’s colour from that of the new precipitate.',
      },
      elements: ['Fe', 'O', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      formula: 'Fe(OH)3',
    },
    {
      id: 'tests-015',
      front: {
        vi: 'Vì sao nước vôi đang đục có thể trong lại khi CO₂ dư?',
        en: 'Why can cloudy limewater become clear with excess CO₂?',
      },
      back: {
        vi: 'CaCO₃ có thể chuyển thành calcium hydrogencarbonate tan. Hiện tượng không phủ định kết tủa đã tạo ở bước trước.',
        en: 'CaCO₃ can become soluble calcium hydrogencarbonate. This does not invalidate the earlier precipitation observation.',
      },
      elements: ['Ca', 'C', 'O', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'tests-016',
      front: {
        vi: 'Vì sao không dùng HCl để axit hoá mẫu thử Cl⁻ bằng AgNO₃?',
        en: 'Why avoid HCl when acidifying a sample for a chloride test with AgNO₃?',
      },
      back: {
        vi: 'HCl đưa Cl⁻ vào mẫu, có thể gây dương tính giả. Thuốc thử không được tự cung cấp ion đang muốn tìm.',
        en: 'HCl introduces Cl⁻ and can cause a false positive. A reagent should not itself supply the ion being tested.',
      },
      elements: ['H', 'Cl', 'Ag', 'N', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492572936',
    },
  ],
});

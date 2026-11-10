import { defineDeck } from '../../src/flashcard.ts';

/** Đối chiếu phạm vi Kết nối tri thức với cuộc sống, GDPT 2018. Nội dung tự biên soạn; quy tắc được ghi kèm phạm vi và ngoại lệ cần thiết. */
export default defineDeck({
  id: 'reactivity',
  title: {
    vi: 'Dãy hoạt động kim loại',
    en: 'Metal reactivity',
  },
  description: {
    vi: 'Hiểu ý nghĩa và phạm vi áp dụng; không dùng dãy để bỏ qua nước, xúc tác hay thụ động hoá.',
    en: 'Interpret reactivity without ignoring water, kinetics or passivation.',
  },
  grade: [10, 12],
  cards: [
    {
      id: 'reactivity-001',
      front: {
        vi: 'Một đoạn dãy hoạt động thường dùng từ Mg đến Au?',
        en: 'A useful reactivity-series segment from Mg to Au?',
      },
      back: {
        vi: 'Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au. Đây là một đoạn của dãy, không phải danh sách mọi kim loại.',
        en: 'Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au. This is a segment, not a list of all metals.',
      },
      elements: ['Mg', 'Al', 'Zn', 'Fe', 'Pb', 'H', 'Cu', 'Ag', 'Au'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-002',
      front: {
        vi: 'Ý nghĩa khái quát của kim loại hoạt động mạnh hơn?',
        en: 'What does greater metal reactivity broadly mean?',
      },
      back: {
        vi: 'Thường dễ nhường electron hơn trong phạm vi so sánh. Tốc độ quan sát còn phụ thuộc màng bề mặt và điều kiện.',
        en: 'It generally donates electrons more readily within the comparison. Observed speed also depends on surface films and conditions.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-003',
      front: {
        vi: 'Vì sao H có mặt trong dãy dù không phải kim loại?',
        en: 'Why does H appear in the series although it is not a metal?',
      },
      back: {
        vi: 'Cặp H⁺/H₂ làm mốc so khả năng kim loại khử ion H⁺ giải phóng hiđro trong điều kiện phù hợp.',
        en: 'The H⁺/H₂ pair is a reference for comparing metals’ ability to reduce H⁺ to hydrogen under suitable conditions.',
      },
      elements: ['H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-004',
      front: {
        vi: 'Kim loại đứng trước H có luôn tạo H₂ với mọi axit?',
        en: 'Does a metal above H always give H₂ with every acid?',
      },
      back: {
        vi: 'Không. Quy tắc cần axit phù hợp, như HCl loãng; axit oxi hoá và thụ động hoá có thể cho tình huống khác.',
        en: 'No. The rule needs suitable acids, such as dilute HCl; oxidising acids and passivation can change the outcome.',
      },
      elements: ['H', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-005',
      front: {
        vi: 'Cu có tạo H₂ với HCl loãng không có O₂ hay chất oxi hoá khác?',
        en: 'Does Cu give H₂ with deaerated dilute HCl and no other oxidant?',
      },
      back: {
        vi: 'Không theo mô hình dãy hoạt động thông thường: Cu không khử H⁺ trong điều kiện này.',
        en: 'Not in the usual reactivity model: Cu does not reduce H⁺ under these conditions.',
      },
      elements: ['Cu', 'H', 'Cl'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-006',
      front: {
        vi: 'Zn gặp dung dịch CuSO₄ trong điều kiện thích hợp: ai nhường electron?',
        en: 'For Zn in CuSO₄ solution under suitable conditions, who donates electrons?',
      },
      back: {
        vi: 'Zn nhường electron thành Zn²⁺; Cu²⁺ nhận electron thành Cu. Sulfate là ion đi kèm trong mô hình này.',
        en: 'Zn donates electrons to form Zn²⁺; Cu²⁺ gains them to form Cu. Sulfate is a spectator in this model.',
      },
      elements: ['Zn', 'Cu', 'S', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-007',
      front: {
        vi: 'Cu có đẩy Zn khỏi dung dịch ZnSO₄ thông thường không?',
        en: 'Does Cu displace Zn from ordinary ZnSO₄ solution?',
      },
      back: {
        vi: 'Không. Chiều này không phù hợp với thứ tự hoạt động Zn > Cu trong điều kiện đang xét.',
        en: 'No. That direction is inconsistent with Zn being above Cu in the stated reactivity comparison.',
      },
      elements: ['Cu', 'Zn', 'S', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-008',
      front: {
        vi: 'Vì sao không dùng Na để minh hoạ đơn giản việc đẩy Cu khỏi muối trong nước?',
        en: 'Why is Na unsuitable for a simple displacement demonstration in aqueous copper salt?',
      },
      back: {
        vi: 'Na phản ứng mạnh với nước. Không được bỏ qua dung môi rồi áp dụng máy móc thứ tự hoạt động.',
        en: 'Na reacts vigorously with water. The solvent cannot be ignored when applying the reactivity series.',
      },
      elements: ['Na', 'Cu', 'H', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-009',
      front: {
        vi: 'Nhôm hoạt động nhưng vì sao thường có vẻ bền trong không khí?',
        en: 'Why does reactive aluminium often appear durable in air?',
      },
      back: {
        vi: 'Lớp oxit bám chắc bảo vệ bề mặt. Khả năng phản ứng của kim loại và tình trạng bề mặt phải được xét riêng.',
        en: 'An adherent oxide film protects it. Intrinsic metal reactivity and the surface condition must be considered separately.',
      },
      elements: ['Al', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-010',
      front: {
        vi: 'Fe với HCl loãng thường tạo muối sắt ở mức oxi hoá nào?',
        en: 'Which iron oxidation state usually forms with dilute HCl?',
      },
      back: {
        vi: 'Fe(II), thường viết FeCl₂, cùng H₂. Không tự gán Fe(III) nếu không có tác nhân oxi hoá bổ sung.',
        en: 'Fe(II), commonly written FeCl₂, with H₂. Do not assume Fe(III) without an additional oxidant.',
      },
      elements: ['Fe', 'Cl', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
      formula: 'FeCl2',
    },
    {
      id: 'reactivity-011',
      front: {
        vi: 'Cu đứng sau H nhưng vẫn phản ứng với HNO₃: vì sao?',
        en: 'Why can Cu react with HNO₃ despite being below H?',
      },
      back: {
        vi: 'HNO₃ có tính oxi hoá; sản phẩm khử của nitrogen phụ thuộc điều kiện. Không áp dụng quy tắc axit tạo H₂ cho mọi axit.',
        en: 'HNO₃ is oxidising, and its nitrogen reduction product depends on conditions. The acid-to-H₂ rule is not universal.',
      },
      elements: ['Cu', 'H', 'N', 'O'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-012',
      front: {
        vi: 'Đá vôi sủi bọt với axit có chứng minh Ca kim loại đứng trước H không?',
        en: 'Does limestone fizzing with acid directly demonstrate calcium metal’s position above H?',
      },
      back: {
        vi: 'Không. Đây là phản ứng của ion cacbonat tạo CO₂, không phải Ca kim loại khử H⁺.',
        en: 'No. Carbonate forms CO₂; the process is not calcium metal reducing H⁺.',
      },
      elements: ['Ca', 'C', 'O', 'H'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-013',
      front: {
        vi: 'Kẽm bảo vệ hi sinh cho thép bằng cách nào?',
        en: 'How does zinc give sacrificial protection to steel?',
      },
      back: {
        vi: 'Trong hệ điện hoá thích hợp, Zn bị oxi hoá ưu tiên, giúp bảo vệ Fe. Cần có tiếp xúc điện và môi trường phù hợp.',
        en: 'In a suitable electrochemical system, Zn is preferentially oxidised, protecting Fe. Electrical contact and suitable conditions are required.',
      },
      elements: ['Zn', 'Fe'],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-014',
      front: {
        vi: 'Vị trí trong dãy có đủ để dự đoán tốc độ phản ứng quan sát được không?',
        en: 'Is position in the series enough to predict observed reaction speed?',
      },
      back: {
        vi: 'Không. Còn cần xét nhiệt độ, nồng độ, bề mặt, thụ động hoá và cơ chế; xu hướng phản ứng khác với tốc độ.',
        en: 'No. Temperature, concentration, surface films and mechanism matter; a reaction tendency is not its observed rate.',
      },
      elements: [],
      source: 'https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-hoa-hoc.4492859842',
    },
    {
      id: 'reactivity-015',
      front: {
        vi: 'Vì sao sản xuất nhôm không chỉ nung Al₂O₃ với than như một mô hình luyện sắt đơn giản?',
        en: 'Why is aluminium not made by simply heating Al₂O₃ with carbon like a basic iron-smelting model?',
      },
      back: {
        vi: 'Al₂O₃ rất bền. Quy trình công nghiệp dùng điện phân alumina hoà trong criolit nóng chảy.',
        en: 'Al₂O₃ is very stable. Industrial production electrolyses alumina dissolved in molten cryolite.',
      },
      elements: ['Al', 'O', 'C'],
      source: 'https://www.acs.org/education/whatischemistry/landmarks/aluminumprocess.html',
      formula: 'Al2O3',
    },
  ],
});

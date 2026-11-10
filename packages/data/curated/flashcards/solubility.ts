import { defineDeck } from '../../src/flashcard.ts';

/** Đối chiếu phạm vi Kết nối tri thức với cuộc sống, GDPT 2018. Nội dung tự biên soạn; quy tắc được ghi kèm phạm vi và ngoại lệ cần thiết. */
export default defineDeck({
  id: 'solubility',
  title: {
    vi: 'Quy tắc tính tan',
    en: 'Solubility rules',
  },
  description: {
    vi: 'Quy tắc tra nhanh trong nước ở điều kiện thông thường, có nhắc các ngoại lệ hay gặp.',
    en: 'Quick aqueous-solubility rules under ordinary conditions, including common exceptions.',
  },
  grade: [10, 11, 12],
  cards: [
    {
      id: 'solubility-001',
      front: {
        vi: 'Muối của Na⁺ và K⁺ thường có tính tan thế nào?',
        en: 'What is the usual solubility of Na⁺ and K⁺ salts?',
      },
      back: {
        vi: 'Hầu hết muối thường gặp tan trong nước. Đây là quy tắc tra nhanh, không thay dữ liệu độ tan cho mọi chất ở mọi nhiệt độ.',
        en: 'Most common salts are water-soluble. This shortcut does not replace substance-specific solubility data at a stated temperature.',
      },
      elements: ['Na', 'K'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
    },
    {
      id: 'solubility-002',
      front: {
        vi: 'Muối amoni thường có tính tan thế nào?',
        en: 'What is the usual solubility of ammonium salts?',
      },
      back: {
        vi: 'Phần lớn muối NH₄⁺ thường gặp tan trong nước. Không nhầm ion NH₄⁺ với phân tử NH₃.',
        en: 'Most common NH₄⁺ salts dissolve in water. Do not confuse NH₄⁺ with the NH₃ molecule.',
      },
      elements: ['N', 'H'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'NH4^+',
    },
    {
      id: 'solubility-003',
      front: {
        vi: 'Muối nitrat thường có tính tan thế nào?',
        en: 'What is the usual solubility of nitrates?',
      },
      back: {
        vi: 'Các muối nitrat thường gặp tan trong nước; NO₃⁻ khác ion nitrit NO₂⁻.',
        en: 'Common nitrate salts dissolve in water; NO₃⁻ is different from nitrite, NO₂⁻.',
      },
      elements: ['N', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'NO3^-',
    },
    {
      id: 'solubility-004',
      front: {
        vi: 'Quy tắc gần đúng cho muối clorua, bromua, iodua?',
        en: 'A general rule for chlorides, bromides and iodides?',
      },
      back: {
        vi: 'Phần lớn tan; các muối của Ag⁺, Pb²⁺ và Hg₂²⁺ là ngoại lệ quan trọng trong mô hình phổ thông.',
        en: 'Most dissolve; salts of Ag⁺, Pb²⁺ and Hg₂²⁺ are important school-level exceptions.',
      },
      elements: ['Cl', 'Br', 'I', 'Ag', 'Pb', 'Hg'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
    },
    {
      id: 'solubility-005',
      front: {
        vi: 'PbCl₂ có tan hoàn toàn trong nước lạnh không?',
        en: 'Does PbCl₂ dissolve freely in cold water?',
      },
      back: {
        vi: 'Không. Nó ít tan trong nước lạnh và tan hơn khi nóng; không nên chỉ gắn nhãn “không tan” mà bỏ qua nhiệt độ.',
        en: 'No. It is sparingly soluble in cold water and more soluble when hot; temperature matters beyond a simple “insoluble” label.',
      },
      elements: ['Pb', 'Cl'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'PbCl2',
    },
    {
      id: 'solubility-006',
      front: {
        vi: 'AgCl có tính tan và màu kết tủa thông thường ra sao?',
        en: 'What are AgCl’s usual solubility and precipitate colour?',
      },
      back: {
        vi: 'Rất ít tan trong nước; tạo kết tủa trắng trong phép thử chloride. “Ít tan” không có nghĩa độ tan bằng 0.',
        en: 'It is very sparingly soluble in water and forms a white chloride-test precipitate. Low solubility does not mean exactly zero.',
      },
      elements: ['Ag', 'Cl'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'AgCl',
    },
    {
      id: 'solubility-007',
      front: {
        vi: 'Quy tắc gần đúng cho muối sulfate?',
        en: 'What is the general sulfate-solubility rule?',
      },
      back: {
        vi: 'Phần lớn tan. BaSO₄, PbSO₄, SrSO₄ ít tan rõ rệt; CaSO₄ cũng có độ tan hạn chế.',
        en: 'Most dissolve. BaSO₄, PbSO₄ and SrSO₄ are notably sparingly soluble; CaSO₄ also has limited solubility.',
      },
      elements: ['S', 'O', 'Ba', 'Pb', 'Sr', 'Ca'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
    },
    {
      id: 'solubility-008',
      front: {
        vi: 'Vì sao Ba²⁺ được dùng để nhận biết SO₄²⁻?',
        en: 'Why is Ba²⁺ used to identify SO₄²⁻?',
      },
      back: {
        vi: 'Tạo BaSO₄ trắng rất ít tan trong điều kiện phép thử, kể cả môi trường axit thích hợp.',
        en: 'It forms very sparingly soluble white BaSO₄ under test conditions, including a suitable acidic medium.',
      },
      elements: ['Ba', 'S', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'BaSO4',
    },
    {
      id: 'solubility-009',
      front: {
        vi: 'CaSO₄ nên được nhớ là tan nhiều hay ít tan?',
        en: 'Should CaSO₄ be remembered as highly or sparingly soluble?',
      },
      back: {
        vi: 'Ít tan. Không xếp ngang muối sulfate tan tốt chỉ vì “phần lớn sulfate tan”, cũng không hiểu độ tan là đúng 0.',
        en: 'Sparingly soluble. The general sulfate rule does not make it freely soluble, nor does low solubility mean exactly zero.',
      },
      elements: ['Ca', 'S', 'O'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'CaSO4',
    },
    {
      id: 'solubility-010',
      front: {
        vi: 'Quy tắc gần đúng cho muối carbonate?',
        en: 'What is the general carbonate-solubility rule?',
      },
      back: {
        vi: 'Phần lớn ít tan; muối carbonate thường gặp của Na⁺, K⁺ và NH₄⁺ là các ngoại lệ tan.',
        en: 'Most are sparingly soluble; common Na⁺, K⁺ and NH₄⁺ carbonates are soluble exceptions.',
      },
      elements: ['C', 'O', 'Na', 'K', 'N', 'H'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'CO3^2-',
    },
    {
      id: 'solubility-011',
      front: {
        vi: 'Quy tắc gần đúng cho muối phosphate?',
        en: 'What is the general phosphate-solubility rule?',
      },
      back: {
        vi: 'Phần lớn ít tan; các muối thường gặp của Na⁺, K⁺ và NH₄⁺ là ngoại lệ tan trong quy tắc phổ thông.',
        en: 'Most are sparingly soluble; common Na⁺, K⁺ and NH₄⁺ salts are soluble exceptions in the school rule.',
      },
      elements: ['P', 'O', 'Na', 'K', 'N', 'H'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'PO4^3-',
    },
    {
      id: 'solubility-012',
      front: {
        vi: 'NaOH và KOH có tính tan thế nào?',
        en: 'How soluble are NaOH and KOH?',
      },
      back: {
        vi: 'Tan tốt trong nước. Không mở rộng kết luận này cho mọi hydroxide kim loại.',
        en: 'They dissolve readily in water. Do not extend this conclusion to every metal hydroxide.',
      },
      elements: ['Na', 'K', 'O', 'H'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
    },
    {
      id: 'solubility-013',
      front: {
        vi: 'Mg(OH)₂ có tan tốt như NaOH không?',
        en: 'Does Mg(OH)₂ dissolve as readily as NaOH?',
      },
      back: {
        vi: 'Không. Mg(OH)₂ ít tan trong nước; tính bazơ và độ tan không phải cùng một khái niệm.',
        en: 'No. Mg(OH)₂ is sparingly soluble; basicity and solubility are not the same concept.',
      },
      elements: ['Mg', 'O', 'H', 'Na'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'Mg(OH)2',
    },
    {
      id: 'solubility-014',
      front: {
        vi: 'Vì sao có “nước vôi trong” dù Ca(OH)₂ chỉ ít tan?',
        en: 'Why can clear limewater exist if Ca(OH)₂ is only sparingly soluble?',
      },
      back: {
        vi: 'Một phần Ca(OH)₂ vẫn tan. Phần dung dịch trong phía trên có thể chứa Ca²⁺ và OH⁻ dù còn chất rắn dư.',
        en: 'Some Ca(OH)₂ still dissolves. The clear solution can contain Ca²⁺ and OH⁻ even when excess solid remains.',
      },
      elements: ['Ca', 'O', 'H'],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
      formula: 'Ca(OH)2',
    },
    {
      id: 'solubility-015',
      front: {
        vi: 'Nên hiểu nhãn “không tan” trong bảng tra phổ thông thế nào?',
        en: 'What should “insoluble” in a school table be understood to mean?',
      },
      back: {
        vi: 'Độ tan rất nhỏ trong phạm vi xét, không phải chắc chắn bằng 0. Nhiệt độ và môi trường có thể làm kết luận thay đổi.',
        en: 'Very low solubility under the stated conditions, not necessarily zero. Temperature and medium can change the conclusion.',
      },
      elements: [],
      source: 'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions',
    },
  ],
});

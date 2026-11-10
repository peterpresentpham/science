/**
 * Cấu trúc của đơn chất để xem 3D.
 * - crystal: mạng tinh thể dựng từ kiểu mạng + hằng số mạng (Å, ở nhiệt độ phòng, theo các bảng
 *   tinh thể học phổ biến). Dựng bằng @chem/core/crystal, không cần tải file CIF.
 * - molecule: phân tử, cấu trúc 3D lấy từ PubChem theo CID (tải bằng fetch-compounds).
 * Nguyên tố không có ở đây: khí đơn nguyên tử (khí hiếm) hoặc chưa tuyển.
 * Bo, Mn, Hg có cấu trúc thật quá phức tạp hoặc lỏng ở nhiệt độ phòng: dùng dạng gần đúng, ghi rõ trên nhãn.
 */
import type { ElementStructure } from '../src/schema.ts';

const bcc = (a: number): ElementStructure => ({ kind: 'crystal', lattice: 'bcc', a });
const fcc = (a: number): ElementStructure => ({ kind: 'crystal', lattice: 'fcc', a });
const hcp = (a: number, c: number): ElementStructure => ({ kind: 'crystal', lattice: 'hcp', a, c });
const mol = (cid: number, vi?: string, en?: string): ElementStructure => ({
  kind: 'molecule',
  cid,
  ...(vi && en ? { label: { vi, en } } : {}),
});

export const STRUCTURES: Record<string, ElementStructure[]> = {
  H: [mol(783)],
  N: [mol(947)],
  O: [mol(977, 'Oxi (O₂)', 'Dioxygen (O₂)'), mol(24823, 'Ozon (O₃)', 'Ozone (O₃)')],
  F: [mol(24524)],
  Cl: [mol(24526)],
  Br: [mol(24408)],
  I: [mol(807)],
  P: [mol(123286, 'Photpho trắng (P₄)', 'White phosphorus (P₄)')],
  S: [mol(66348, 'Lưu huỳnh (S₈)', 'Sulfur (S₈)')],
  C: [
    {
      kind: 'crystal',
      lattice: 'diamond',
      a: 3.567,
      label: { vi: 'Kim cương', en: 'Diamond' },
    },
    {
      kind: 'crystal',
      lattice: 'graphite',
      a: 2.464,
      c: 6.711,
      label: { vi: 'Than chì', en: 'Graphite' },
    },
  ],
  Si: [{ kind: 'crystal', lattice: 'diamond', a: 5.431 }],
  Ge: [{ kind: 'crystal', lattice: 'diamond', a: 5.658 }],
  Sn: [
    {
      kind: 'crystal',
      lattice: 'diamond',
      a: 6.489,
      label: { vi: 'Thiếc xám (α, dưới 13 °C)', en: 'Grey tin (α, below 13 °C)' },
    },
  ],
  B: [
    {
      kind: 'crystal',
      lattice: 'icosahedron',
      a: 1.77,
      label: {
        vi: 'Cụm B₁₂ hình 20 mặt (đơn vị cấu trúc của mọi dạng bo)',
        en: 'B₁₂ icosahedron (the building block of all forms of boron)',
      },
    },
  ],
  Mn: [
    {
      kind: 'crystal',
      lattice: 'fcc',
      a: 3.862,
      label: {
        vi: 'Mangan γ (1095–1134 °C); dạng α ở nhiệt độ phòng có ô mạng 58 nguyên tử',
        en: 'γ-manganese (1095–1134 °C); room-temperature α-Mn has a 58-atom cell',
      },
    },
  ],
  Hg: [
    {
      kind: 'crystal',
      lattice: 'rhombohedral',
      a: 3.005,
      alpha: 70.53,
      label: { vi: 'Thuỷ ngân rắn (dưới −39 °C)', en: 'Solid mercury (below −39 °C)' },
    },
  ],
  // Lập phương tâm khối
  Li: [bcc(3.51)],
  Na: [bcc(4.29)],
  K: [bcc(5.328)],
  Rb: [bcc(5.585)],
  Cs: [bcc(6.141)],
  Ba: [bcc(5.028)],
  V: [bcc(3.03)],
  Cr: [bcc(2.91)],
  Fe: [{ ...bcc(2.8665), label: { vi: 'Sắt α', en: 'α-iron' } }],
  Nb: [bcc(3.3)],
  Mo: [bcc(3.147)],
  Ta: [bcc(3.306)],
  W: [bcc(3.165)],
  // Lập phương tâm diện
  Al: [fcc(4.0495)],
  Ca: [fcc(5.588)],
  Ni: [fcc(3.524)],
  Cu: [fcc(3.615)],
  Sr: [fcc(6.085)],
  Rh: [fcc(3.803)],
  Pd: [fcc(3.891)],
  Ag: [fcc(4.085)],
  Ir: [fcc(3.839)],
  Pt: [fcc(3.924)],
  Au: [fcc(4.078)],
  Pb: [fcc(4.951)],
  // Lục phương đặc khít
  Be: [hcp(2.286, 3.584)],
  Mg: [hcp(3.209, 5.211)],
  Sc: [hcp(3.309, 5.273)],
  Ti: [hcp(2.951, 4.686)],
  Co: [hcp(2.507, 4.069)],
  Zn: [hcp(2.665, 4.947)],
  Y: [hcp(3.647, 5.731)],
  Zr: [hcp(3.232, 5.147)],
  Ru: [hcp(2.706, 4.282)],
  Cd: [hcp(2.979, 5.619)],
  Hf: [hcp(3.196, 5.051)],
  Re: [hcp(2.761, 4.456)],
  Os: [hcp(2.734, 4.317)],
};

/**
 * Nguyên tố phóng xạ = không có đồng vị bền nào: Tc (43), Pm (61) và mọi nguyên tố từ Po (84) trở đi.
 * Bi (83) về lý thuyết cũng phóng xạ, nhưng chu kỳ bán rã ~2 × 10¹⁹ năm (gấp hơn 1 tỉ lần tuổi vũ trụ),
 * nên theo quy ước vẫn coi là bền.
 */
export const isRadioactive = (z: number) => z === 43 || z === 61 || z >= 84;

/*
 * Số khối A của đồng vị đại diện, chỉ số = Z − 1.
 * Nguyên tố có đồng vị bền: đồng vị có hàm lượng tự nhiên lớn nhất (vd. Cl-35, Cu-63, Br-79).
 * Nguyên tố phóng xạ: đồng vị có chu kỳ bán rã dài nhất đã biết (vd. Tc-98, U-238, Pu-244).
 */
// prettier-ignore
const MASS_NUMBER = [
  1, 4, 7, 9, 11, 12, 14, 16, 19, 20, // 1–10
  23, 24, 27, 28, 31, 32, 35, 40, 39, 40, // 11–20
  45, 48, 51, 52, 55, 56, 59, 58, 63, 64, // 21–30
  69, 74, 75, 80, 79, 84, 85, 88, 89, 90, // 31–40
  93, 98, 98, 102, 103, 106, 107, 114, 115, 120, // 41–50
  121, 130, 127, 132, 133, 138, 139, 140, 141, 142, // 51–60
  145, 152, 153, 158, 159, 164, 165, 166, 169, 174, // 61–70
  175, 180, 181, 184, 187, 192, 193, 195, 197, 202, // 71–80
  205, 208, 209, 209, 210, 222, 223, 226, 227, 232, // 81–90
  231, 238, 237, 244, 243, 247, 247, 251, 252, 257, // 91–100
  258, 259, 266, 267, 268, 269, 270, 269, 278, 281, // 101–110
  282, 285, 286, 289, 290, 293, 294, 294, // 111–118
];

/** Số khối của đồng vị đại diện (phổ biến nhất, hoặc bền nhất nếu là nguyên tố phóng xạ). */
export function representativeMassNumber(z: number): number {
  const a = MASS_NUMBER[z - 1];
  if (a === undefined) throw new RangeError(`Z phải trong khoảng 1..118, nhận ${z}`);
  return a;
}

/** Số proton, nơtron, electron của nguyên tử trung hoà theo đồng vị đại diện. */
export function nucleonCounts(z: number): {
  protons: number;
  neutrons: number;
  electrons: number;
  massNumber: number;
} {
  const massNumber = representativeMassNumber(z);
  return { protons: z, neutrons: massNumber - z, electrons: z, massNumber };
}

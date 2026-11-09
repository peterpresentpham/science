/**
 * Nguyên tố phóng xạ = không có đồng vị bền nào: Tc (43), Pm (61) và mọi nguyên tố từ Po (84) trở đi.
 * Bi (83) về lý thuyết cũng phóng xạ, nhưng chu kỳ bán rã ~2 × 10¹⁹ năm (gấp hơn 1 tỉ lần tuổi vũ trụ),
 * nên theo quy ước vẫn coi là bền.
 */
export const isRadioactive = (z: number) => z === 43 || z === 61 || z >= 84;

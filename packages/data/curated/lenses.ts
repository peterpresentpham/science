import type { PhoneRisk } from '../src/lenses.ts';

/**
 * Cơ thể người: % khối lượng của 11 nguyên tố chính.
 * Nguồn: Wikipedia "Composition of the human body" (trung bình từ Chang 2007, Zumdahl 2000, Emsley 2011…).
 */
export const BODY_MASS_PERCENT: Record<string, number> = {
  O: 65,
  C: 18.5,
  H: 9.5,
  N: 2.6,
  Ca: 1.3,
  P: 0.6,
  S: 0.3,
  K: 0.2,
  Na: 0.2,
  Cl: 0.2,
  Mg: 0.1,
};

/**
 * Vi lượng thiết yếu: số gam trong cơ thể người 70 kg (cùng nguồn).
 * Chỉ lấy các nguyên tố cơ thể cần; bỏ những thứ có mặt nhưng không cần (Pb, Cd, Hg, As, Al…).
 */
export const BODY_TRACE_GRAMS: Record<string, number> = {
  Fe: 4.2,
  F: 2.6,
  Zn: 2.3,
  Cu: 0.072,
  I: 0.02,
  Se: 0.015,
  Cr: 0.014,
  Mn: 0.012,
  Mo: 0.005,
  Co: 0.003,
};

/**
 * Nguyên tố trong điện thoại có nguồn cung đáng lo, theo thông cáo EuChemS 03/11/2022 (bảng tuần hoàn bản 2021).
 * EuChemS đếm 30 nguyên tố trong điện thoại nhưng chỉ nêu tên 20 nguyên tố dưới đây; 10 nguyên tố còn lại
 * (nguồn cung dồi dào) chỉ có trên hình nên không đưa vào.
 */
export const PHONE_RISK: Record<string, PhoneRisk> = {
  C: 'serious',
  Y: 'serious',
  Ga: 'serious',
  As: 'serious',
  Ag: 'serious',
  In: 'serious',
  Ta: 'serious',
  Co: 'rising',
  Dy: 'rising',
  Li: 'limited',
  Mg: 'limited',
  P: 'limited',
  Sn: 'limited',
  Ni: 'limited',
  Cu: 'limited',
  Au: 'limited',
  Pb: 'limited',
  W: 'limited',
  Nd: 'limited',
  Sb: 'limited',
};

/** Kim loại quý: vàng, bạc và 6 kim loại nhóm bạch kim (Wikipedia "Precious metal"). */
export const PRECIOUS = ['Au', 'Ag', 'Pt', 'Pd', 'Rh', 'Ir', 'Ru', 'Os'];

/** Nguyên tố tổng hợp: chỉ tạo được trong phòng thí nghiệm, Z 95–118 (Wikipedia "Synthetic element"). */
export const SYNTHETIC_FROM_Z = 95;

/** "Gần lỏng": chất rắn nóng chảy dưới ngưỡng này (°C) vẫn vào lăng kính lỏng. */
export const NEAR_LIQUID_MAX_C = 40;

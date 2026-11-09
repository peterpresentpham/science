/*
 * Hàm sóng orbital kiểu nguyên tử hydro (đơn vị bán kính Bohr a0).
 *   ψ_nlm(r, θ, φ) = R_nl(r) · Y_lm(θ, φ)
 * Dùng hàm cầu thực (px, py, pz, dxy…) như sách giáo khoa, thay cho hàm cầu phức.
 * Hình dạng đúng theo nghiệm hydro; với nguyên tử nhiều electron, kích thước chỉ mang tính định tính.
 */

export type OrbitalL = 0 | 1 | 2 | 3;

/** Đa thức Laguerre liên kết L_k^α(x), tính bằng hệ thức truy hồi. */
export function laguerre(k: number, alpha: number, x: number): number {
  if (k === 0) return 1;
  let prev = 1;
  let cur = 1 + alpha - x;
  for (let i = 1; i < k; i++) {
    const next = ((2 * i + 1 + alpha - x) * cur - (i + alpha) * prev) / (i + 1);
    prev = cur;
    cur = next;
  }
  return cur;
}

const factorial = (n: number) => {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
};

export function assertQuantumNumbers(n: number, l: number, m = 0) {
  if (!Number.isInteger(n) || n < 1) throw new RangeError('n phải là số nguyên ≥ 1');
  if (!Number.isInteger(l) || l < 0 || l >= n || l > 3)
    throw new RangeError('l phải thoả 0 ≤ l < n, l ≤ 3');
  if (!Number.isInteger(m) || Math.abs(m) > l) throw new RangeError('m phải thoả −l ≤ m ≤ l');
}

/**
 * Phần bán kính đã chuẩn hoá: ∫ R² r² dr = 1.
 *   ρ = 2Zr/n,  R_nl = √((2Z/n)³ (n−l−1)! / (2n (n+l)!)) · e^{−ρ/2} · ρ^l · L_{n−l−1}^{2l+1}(ρ)
 */
export function radial(n: number, l: number, r: number, Z = 1): number {
  const rho = (2 * Z * r) / n;
  const norm = Math.sqrt(((2 * Z) / n) ** 3 * (factorial(n - l - 1) / (2 * n * factorial(n + l))));
  return norm * Math.exp(-rho / 2) * rho ** l * laguerre(n - l - 1, 2 * l + 1, rho);
}

const PI = Math.PI;
const C0 = 1 / (2 * Math.sqrt(PI));
const C1 = Math.sqrt(3 / (4 * PI));
const C2a = 0.5 * Math.sqrt(15 / PI);
const C2b = 0.25 * Math.sqrt(5 / PI);
const C2c = 0.25 * Math.sqrt(15 / PI);
const C3a = 0.25 * Math.sqrt(35 / (2 * PI));
const C3b = 0.5 * Math.sqrt(105 / PI);
const C3c = 0.25 * Math.sqrt(21 / (2 * PI));
const C3d = 0.25 * Math.sqrt(7 / PI);
const C3e = 0.25 * Math.sqrt(105 / PI);

/**
 * Hàm cầu thực đã chuẩn hoá (∫ Y² dΩ = 1), tại hướng (x, y, z) bất kỳ (không cần là vector đơn vị).
 * Thứ tự m theo quy ước thường dùng: m < 0 ứng với sin(|m|φ), m > 0 ứng với cos(mφ).
 */
export function realYlm(l: number, m: number, x: number, y: number, z: number): number {
  const r = Math.hypot(x, y, z);
  if (r === 0) return l === 0 ? C0 : 0;
  const u = x / r;
  const v = y / r;
  const w = z / r;
  switch (l) {
    case 0:
      return C0;
    case 1:
      return C1 * (m === -1 ? v : m === 0 ? w : u);
    case 2:
      switch (m) {
        case -2:
          return C2a * u * v;
        case -1:
          return C2a * v * w;
        case 0:
          return C2b * (3 * w * w - 1);
        case 1:
          return C2a * u * w;
        default:
          return C2c * (u * u - v * v);
      }
    default:
      switch (m) {
        case -3:
          return C3a * v * (3 * u * u - v * v);
        case -2:
          return C3b * u * v * w;
        case -1:
          return C3c * v * (5 * w * w - 1);
        case 0:
          return C3d * w * (5 * w * w - 3);
        case 1:
          return C3c * u * (5 * w * w - 1);
        case 2:
          return C3e * w * (u * u - v * v);
        default:
          return C3a * u * (u * u - 3 * v * v);
      }
  }
}

export function psi(
  n: number,
  l: number,
  m: number,
  x: number,
  y: number,
  z: number,
  Z = 1
): number {
  return radial(n, l, Math.hypot(x, y, z), Z) * realYlm(l, m, x, y, z);
}

/** Tên phần góc theo sách giáo khoa: "s", "px", "dz²", "fxyz"… */
export const ORBITAL_SUFFIX: Readonly<Record<OrbitalL, Readonly<Record<number, string>>>> = {
  0: { 0: '' },
  1: { [-1]: 'y', 0: 'z', 1: 'x' },
  2: { [-2]: 'xy', [-1]: 'yz', 0: 'z²', 1: 'xz', 2: 'x²−y²' },
  3: {
    [-3]: 'y(3x²−y²)',
    [-2]: 'xyz',
    [-1]: 'yz²',
    0: 'z³',
    1: 'xz²',
    2: 'z(x²−y²)',
    3: 'x(x²−3y²)',
  },
};

const LETTER = ['s', 'p', 'd', 'f'] as const;

/** "2pz", "3dxy", "4fxyz" */
export const orbitalName = (n: number, l: OrbitalL, m: number) =>
  `${n}${LETTER[l]}${ORBITAL_SUFFIX[l][m] ?? ''}`;

/** Số mặt nút: n − l − 1 mặt cầu (theo bán kính) và l mặt góc. */
export const nodeCounts = (n: number, l: number) => ({ radial: n - l - 1, angular: l });

/** PRNG có seed (mulberry32): cùng seed → cùng đám mây, để ảnh chụp kiểm thử ổn định. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface OrbitalSample {
  /** x, y, z liên tiếp (đơn vị a0) */
  positions: Float32Array;
  /** 1 nếu ψ > 0, 0 nếu ψ < 0 */
  phase: Uint8Array;
  /** Bán kính chứa 99,9% xác suất */
  rMax: number;
}

const GRID = 4096;
const COVER = 0.999;

/** Bảng CDF của mật độ bán kính P(r) = R² r², cắt ở bán kính chứa 99,9% xác suất. */
function radialTable(n: number, l: number, Z: number) {
  // Đủ xa để chắc chắn vượt 99,9% (mật độ giảm theo e^{-2Zr/n})
  const far = ((n * n * 4 + 20) * 1.5) / Z;
  const dr = far / GRID;
  const cdf = new Float64Array(GRID + 1);
  let prevP = 0;
  for (let i = 1; i <= GRID; i++) {
    const r = i * dr;
    const p = radial(n, l, r, Z) ** 2 * r * r;
    cdf[i] = cdf[i - 1]! + ((p + prevP) / 2) * dr;
    prevP = p;
  }
  const total = cdf[GRID]!;
  let cut = GRID;
  for (let i = 1; i <= GRID; i++) {
    if (cdf[i]! / total >= COVER) {
      cut = i;
      break;
    }
  }
  return { cdf, dr, cut, total };
}

/** Giá trị lớn nhất của Y² trên mặt cầu (ước lượng trên lưới dày, cộng thêm 2% cho chắc). */
function maxY2(l: number, m: number): number {
  let max = 0;
  const N = 96;
  for (let i = 0; i <= N; i++) {
    const th = (i / N) * PI;
    for (let j = 0; j < 2 * N; j++) {
      const ph = (j / N) * PI;
      const y = realYlm(
        l,
        m,
        Math.sin(th) * Math.cos(ph),
        Math.sin(th) * Math.sin(ph),
        Math.cos(th)
      );
      if (y * y > max) max = y * y;
    }
  }
  return max * 1.02;
}

/** Hướng đều trên mặt cầu, chấp nhận với xác suất Y² / max(Y²). */
function sampleDirection(l: number, m: number, yMax: number, rand: () => number) {
  for (;;) {
    const uz = 2 * rand() - 1;
    const ph = 2 * PI * rand();
    const s = Math.sqrt(1 - uz * uz);
    const ux = s * Math.cos(ph);
    const uy = s * Math.sin(ph);
    const y = realYlm(l, m, ux, uy, uz);
    if (rand() * yMax <= y * y) return { ux, uy, uz, y };
  }
}

/**
 * Lấy `count` điểm phân bố theo |ψ|².
 * Vì |ψ|² r² dr dΩ = (R² r² dr)·(Y² dΩ), lấy bán kính và hướng độc lập:
 * - bán kính: nghịch đảo CDF của R² r² (bảng 4096 mốc, nội suy tuyến tính);
 * - hướng: hướng đều trên mặt cầu, chấp nhận với xác suất Y² / max(Y²).
 */
export function sampleOrbital(
  n: number,
  l: OrbitalL,
  m: number,
  count: number,
  { seed = 1, Z = 1 }: { seed?: number; Z?: number } = {}
): OrbitalSample {
  assertQuantumNumbers(n, l, m);
  const rand = mulberry32(seed);
  const { cdf, dr, cut } = radialTable(n, l, Z);
  const top = cdf[cut]!;
  const yMax = maxY2(l, m);
  const positions = new Float32Array(count * 3);
  const phase = new Uint8Array(count);

  for (let k = 0; k < count; k++) {
    // Bán kính: tìm nhị phân trên CDF
    const target = rand() * top;
    let lo = 0;
    let hi = cut;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (cdf[mid]! < target) lo = mid;
      else hi = mid;
    }
    const span = cdf[hi]! - cdf[lo]!;
    const r = (lo + (span > 0 ? (target - cdf[lo]!) / span : 0)) * dr;

    // Hướng: đều trên mặt cầu, rồi loại bỏ theo Y²
    const { ux, uy, uz, y } = sampleDirection(l, m, yMax, rand);
    positions[k * 3] = r * ux;
    positions[k * 3 + 1] = r * uy;
    positions[k * 3 + 2] = r * uz;
    phase[k] = radial(n, l, r, Z) * y >= 0 ? 1 : 0;
  }
  return { positions, phase, rMax: cut * dr };
}

/** Bán kính trung bình theo lý thuyết: ⟨r⟩ = (3n² − l(l+1)) / (2Z). */
export const meanRadius = (n: number, l: number, Z = 1) => (3 * n * n - l * (l + 1)) / (2 * Z);

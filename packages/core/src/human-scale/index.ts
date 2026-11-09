/**
 * "Nói cho dễ hình dung": đổi số liệu khô (g/cm³, K, pm, u) thành phép so sánh với thứ quen thuộc.
 * Hàm thuần, chỉ trả về loại so sánh + tham số; câu chữ do i18n ở giao diện lo.
 */
import { isRadioactive } from '../nuclear';

/** Mốc nhiệt độ quen thuộc (°C), tăng dần. */
export const TEMPERATURE_LANDMARKS = [
  // Trạm Vostok, Nam Cực, 21/7/1983: −89,2 °C (WMO)
  { id: 'coldestEarth', celsius: -89.2 },
  { id: 'freezer', celsius: -18 },
  { id: 'ice', celsius: 0 },
  { id: 'room', celsius: 25 },
  { id: 'body', celsius: 37 },
  { id: 'boilingWater', celsius: 100 },
  { id: 'oven', celsius: 250 },
  // Dung nham bazan khoảng 1100–1250 °C
  { id: 'lava', celsius: 1200 },
  // Ngọn lửa khí đốt (metan) cháy trong không khí khoảng 1950 °C
  { id: 'gasFlame', celsius: 1950 },
  // Quang quyển Mặt Trời khoảng 5772 K ≈ 5500 °C
  { id: 'sunSurface', celsius: 5500 },
] as const;
export type LandmarkId = (typeof TEMPERATURE_LANDMARKS)[number]['id'];

const ROOM_C = 25;
const BODY_C = 37;
/** Khối lượng riêng của không khí ở mực nước biển, 15 °C (g/cm³) */
export const AIR_DENSITY_GCM3 = 0.001225;
export const AVOGADRO = 6.02214076e23;

export const kelvinToCelsius = (k: number) => k - 273.15;

export interface TemperatureComparison {
  relation: 'above' | 'below' | 'near';
  landmark: LandmarkId;
}

/**
 * So một nhiệt độ với các mốc:
 * - gần một mốc (lệch ≤ max(3 °C, 5%)) → "near";
 * - từ nhiệt độ phòng trở lên → nóng hơn mốc cao nhất nằm dưới nó ("above");
 * - lạnh hơn nhiệt độ phòng → lạnh hơn mốc thấp nhất nằm trên nó ("below").
 */
export function compareTemperature(celsius: number): TemperatureComparison {
  const near = TEMPERATURE_LANDMARKS.find(
    (l) => Math.abs(celsius - l.celsius) <= Math.max(3, Math.abs(l.celsius) * 0.05)
  );
  if (near) return { relation: 'near', landmark: near.id };
  if (celsius >= ROOM_C) {
    const below = TEMPERATURE_LANDMARKS.filter((l) => l.celsius <= celsius).at(-1)!;
    return { relation: 'above', landmark: below.id };
  }
  const above = TEMPERATURE_LANDMARKS.find((l) => l.celsius >= celsius)!;
  return { relation: 'below', landmark: above.id };
}

export type DensityRelation =
  | 'heavierThanWater'
  | 'lighterThanWater'
  | 'likeWater'
  | 'heavierThanAir'
  | 'lighterThanAir'
  | 'likeAir';

export interface DensityComparison {
  relation: DensityRelation;
  /** Luôn ≥ 1: "nặng gấp ratio lần" hoặc "nhẹ hơn ratio lần" */
  ratio: number;
}

/** Chất khí so với không khí, chất rắn/lỏng so với nước. Lệch dưới 10% thì coi là "gần bằng". */
export function compareDensity(gcm3: number, phase: Phase): DensityComparison {
  const gas = phase === 'gas';
  const ref = gas ? AIR_DENSITY_GCM3 : 1;
  const r = gcm3 / ref;
  if (r >= 0.9 && r <= 1.1) return { relation: gas ? 'likeAir' : 'likeWater', ratio: 1 };
  if (r > 1) return { relation: gas ? 'heavierThanAir' : 'heavierThanWater', ratio: r };
  return { relation: gas ? 'lighterThanAir' : 'lighterThanWater', ratio: 1 / r };
}

/** Số nguyên tử xếp thẳng hàng (sát nhau) để dài 1 mm. */
export const atomsPerMillimetre = (radiusPm: number) => 1e9 / (2 * radiusPm);

/** Số nguyên tử trong 1 gam. */
export const atomsPerGram = (atomicMass: number) => AVOGADRO / atomicMass;

export type Phase = 'solid' | 'liquid' | 'gas' | 'unknown';

export interface HumanScaleInput {
  z: number;
  atomicMass: number;
  phase: Phase;
  densityGcm3: number | null;
  meltingPointK: number | null;
  boilingPointK: number | null;
  atomicRadiusPm: number | null;
}

export type HumanFact =
  | { kind: 'radioactive' }
  | { kind: 'meltsInHand'; celsius: number }
  | ({ kind: 'density'; gcm3: number } & DensityComparison)
  | ({ kind: 'melting' | 'boiling'; celsius: number } & TemperatureComparison)
  | { kind: 'atomsPerMm'; count: number; radiusPm: number }
  /** hypothetical: chưa ai từng gom đủ 1 gam (nguyên tố chỉ tạo được vài nguyên tử) */
  | { kind: 'atomsPerGram'; count: number; atomicMass: number; hypothetical: boolean };

/** Fm (100) trở đi chưa từng được tạo ra với lượng cân được. */
const NEVER_WEIGHED_FROM_Z = 100;

/**
 * Danh sách so sánh dễ hình dung cho một nguyên tố, điều bất ngờ nhất đứng trước.
 * Nguyên tố nào cũng có ít nhất "số nguyên tử trong 1 gam".
 */
export function humanScale(el: HumanScaleInput): HumanFact[] {
  const facts: HumanFact[] = [];
  if (isRadioactive(el.z)) facts.push({ kind: 'radioactive' });

  const melt = el.meltingPointK == null ? null : kelvinToCelsius(el.meltingPointK);
  const boil = el.boilingPointK == null ? null : kelvinToCelsius(el.boilingPointK);

  if (melt != null && el.phase === 'solid' && melt > ROOM_C && melt < BODY_C) {
    facts.push({ kind: 'meltsInHand', celsius: melt });
  }

  if (el.densityGcm3 != null && el.phase !== 'unknown') {
    facts.push({
      kind: 'density',
      gcm3: el.densityGcm3,
      ...compareDensity(el.densityGcm3, el.phase),
    });
  }

  // Heli không đông đặc ở áp suất thường (0,95 K là ở ~25 atm), nên bỏ qua
  if (melt != null && el.z !== 2 && !facts.some((f) => f.kind === 'meltsInHand')) {
    facts.push({ kind: 'melting', celsius: melt, ...compareTemperature(melt) });
  }
  if (boil != null) facts.push({ kind: 'boiling', celsius: boil, ...compareTemperature(boil) });

  if (el.atomicRadiusPm != null) {
    facts.push({
      kind: 'atomsPerMm',
      count: atomsPerMillimetre(el.atomicRadiusPm),
      radiusPm: el.atomicRadiusPm,
    });
  }

  facts.push({
    kind: 'atomsPerGram',
    count: atomsPerGram(el.atomicMass),
    atomicMass: el.atomicMass,
    hypothetical: el.z >= NEVER_WEIGHED_FROM_Z,
  });
  return facts;
}

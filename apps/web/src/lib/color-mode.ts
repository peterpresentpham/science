import type { Block, ElementLite } from '@chem/data';

import { ELEMENTS } from './elements';

/*
 * Chế độ tô màu bảng tuần hoàn (M2). Tính toán thuần, không phụ thuộc giao diện.
 * Màu theo nguyên tắc dataviz:
 * - nhóm rời rạc: trạng thái dùng 3 màu phân loại đầu (--series-1..3), khối dùng bộ --block-*;
 *   cả hai đều đã chạy kiểm định CVD "mọi cặp" vì các ô nằm cạnh nhau theo mọi hướng;
 * - số liệu liên tục: một sắc xanh từ nhạt tới đậm (--seq), không dùng cầu vồng;
 * - thiếu dữ liệu: sọc chéo, không dùng một màu nào trên thang.
 */

export const PROPERTY_KEYS = ['en', 'radius', 'ie', 'ea', 'density', 'mp', 'bp'] as const;
export type PropertyKey = (typeof PROPERTY_KEYS)[number];

export const COLOR_MODES = ['category', 'block', 'phase', 'discovery', ...PROPERTY_KEYS] as const;
export type ColorMode = (typeof COLOR_MODES)[number];

export const isPropertyMode = (m: ColorMode): m is PropertyKey =>
  (PROPERTY_KEYS as readonly string[]).includes(m);

export const parseColorMode = (raw: string | null): ColorMode =>
  (COLOR_MODES as readonly string[]).includes(raw ?? '') ? (raw as ColorMode) : 'category';

interface PropertyDef {
  get: (e: ElementLite) => number | null;
  /** Đổi sang đơn vị hiển thị (K → °C) */
  display: (v: number) => number;
  unit: string;
  /** Thang log (khối lượng riêng trải từ 0,00009 tới 22,6) */
  log?: boolean;
  /** Số chữ số thập phân khi hiện trên ô */
  digits: number;
}

const kToC = (k: number) => k - 273.15;

export const PROPERTIES: Record<PropertyKey, PropertyDef> = {
  en: { get: (e) => e.electronegativity, display: (v) => v, unit: '', digits: 2 },
  radius: { get: (e) => e.atomicRadiusPm, display: (v) => v, unit: 'pm', digits: 0 },
  ie: { get: (e) => e.ionizationEnergyEv, display: (v) => v, unit: 'eV', digits: 1 },
  ea: { get: (e) => e.electronAffinityEv, display: (v) => v, unit: 'eV', digits: 2 },
  density: { get: (e) => e.densityGcm3, display: (v) => v, unit: 'g/cm³', log: true, digits: 2 },
  mp: { get: (e) => e.meltingPointK, display: kToC, unit: '°C', digits: 0 },
  bp: { get: (e) => e.boilingPointK, display: kToC, unit: '°C', digits: 0 },
};

export interface Scale {
  min: number;
  max: number;
  /** Vị trí 0..1 trên thang (đã tính log nếu cần) */
  at: (v: number) => number;
}

const scales = new Map<PropertyKey, Scale>();

/** Thang min–max của một thuộc tính trên cả 118 nguyên tố (tính một lần). */
export function propertyScale(key: PropertyKey): Scale {
  const cached = scales.get(key);
  if (cached) return cached;
  const def = PROPERTIES[key];
  const f = def.log ? Math.log10 : (v: number) => v;
  const values = ELEMENTS.map(def.get).filter((v): v is number => v != null && v > 0);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = f(min);
  const hi = f(max);
  const scale: Scale = {
    min,
    max,
    at: (v) => Math.min(1, Math.max(0, (f(Math.max(v, min)) - lo) / (hi - lo))),
  };
  scales.set(key, scale);
  return scale;
}

export type PhaseAtT = 'solid' | 'liquid' | 'gas' | 'unknown';

/**
 * Trạng thái ở nhiệt độ T (K), áp suất thường, suy từ nhiệt độ nóng chảy và sôi.
 * Heli không có nhiệt độ nóng chảy ở áp suất thường: dưới nhiệt độ sôi là lỏng.
 */
export function phaseAt(
  e: Pick<ElementLite, 'meltingPointK' | 'boilingPointK'>,
  k: number
): PhaseAtT {
  const { meltingPointK: mp, boilingPointK: bp } = e;
  if (mp == null && bp == null) return 'unknown';
  if (mp != null && k < mp) return 'solid';
  if (bp == null) return 'unknown'; // đã nóng chảy nhưng không biết lúc nào sôi
  return k < bp ? 'liquid' : 'gas';
}

export const ROOM_TEMP_K = 298;
export const TEMP_RANGE_K = { min: 0, max: 6000 } as const;

export const SERIES = (i: number) => `var(--series-${i + 1})`;
export const BLOCK_COLOR: Record<Block, string> = {
  s: 'var(--block-s)',
  p: 'var(--block-p)',
  d: 'var(--block-d)',
  f: 'var(--block-f)',
};
export const PHASE_COLOR: Record<Exclude<PhaseAtT, 'unknown'>, string> = {
  solid: SERIES(0),
  liquid: SERIES(1),
  gas: SERIES(2),
};

/** Năm sớm nhất / muộn nhất có trong dữ liệu (null = biết từ thời cổ đại, luôn tính là đã biết). */
export const DISCOVERY_RANGE = (() => {
  const years = ELEMENTS.map((e) => e.discoveryYear).filter((y): y is number => y != null);
  return { min: Math.min(...years), max: Math.max(...years) };
})();

export const knownBy = (e: Pick<ElementLite, 'discoveryYear'>, year: number) =>
  e.discoveryYear == null || e.discoveryYear <= year;

/** Cách tô một ô theo chế độ đang chọn. */
export interface CellPaint {
  /** Màu nhóm rời rạc (thay cho màu loại nguyên tố) */
  color?: string;
  /** Vị trí trên thang liên tục 0..1 */
  scale?: number;
  /** Không có dữ liệu / chưa được tìm ra: sọc chéo */
  missing?: boolean;
  /** Chữ thay cho tên trên ô (giá trị số, năm) */
  caption?: string;
}

export interface PaintOptions {
  tempK: number;
  year: number;
  format: (v: number, digits: number) => string;
  blockLabel: (b: Block) => string;
}

export function paintCell(e: ElementLite, mode: ColorMode, o: PaintOptions): CellPaint {
  switch (mode) {
    case 'category':
      return {};
    case 'block':
      // Ghi chữ khối trên ô: mã hoá phụ ngoài màu (cặp xanh lá–vàng ở chế độ tối chỉ ở mức CVD 6,9)
      return { color: BLOCK_COLOR[e.block], caption: o.blockLabel(e.block) };
    case 'phase': {
      const p = phaseAt(e, o.tempK);
      return p === 'unknown' ? { missing: true } : { color: PHASE_COLOR[p] };
    }
    case 'discovery':
      return knownBy(e, o.year)
        ? { caption: e.discoveryYear == null ? undefined : String(e.discoveryYear) }
        : { missing: true, caption: String(e.discoveryYear) };
    default: {
      const def = PROPERTIES[mode];
      const v = def.get(e);
      if (v == null) return { missing: true, caption: '—' };
      return { scale: propertyScale(mode).at(v), caption: o.format(def.display(v), def.digits) };
    }
  }
}

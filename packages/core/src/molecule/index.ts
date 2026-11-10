/**
 * Đọc file SDF (MDL molfile V2000, định dạng PubChem trả về), đo khoảng cách/góc,
 * và phân tích VSEPR (mô hình sức đẩy cặp electron hoá trị) cho các nguyên tử trung tâm.
 */
import { zOf } from '../formula/elements';
import { err, ok, type Result } from '../result';

export interface MolAtom {
  el: string;
  pos: [number, number, number];
  /** Điện tích hình thức ghi trong SDF */
  charge: number;
}
export interface MolBond {
  a: number;
  b: number;
  /** 1 đơn, 2 đôi, 3 ba, 4 thơm */
  order: number;
}
export interface Molecule {
  atoms: MolAtom[];
  bonds: MolBond[];
  /** true nếu mọi toạ độ z bằng 0 (bản 2D) */
  flat: boolean;
}

/** Điện tích theo mã cột CHG của khối nguyên tử V2000 (0 = không, 1 = +3 … 7 = −3) */
const CHG_CODE: Record<number, number> = { 1: 3, 2: 2, 3: 1, 5: -1, 6: -2, 7: -3 };

export function parseSDF(text: string): Result<Molecule, string> {
  const lines = text.split(/\r?\n/);
  const counts = lines[3];
  if (!counts || !/V2000/.test(counts)) return err('Không phải molfile V2000');
  const nAtoms = Number(counts.slice(0, 3));
  const nBonds = Number(counts.slice(3, 6));
  if (!Number.isInteger(nAtoms) || !Number.isInteger(nBonds)) return err('Dòng đếm sai');
  const atoms: MolAtom[] = [];
  for (let i = 0; i < nAtoms; i++) {
    const l = lines[4 + i] ?? '';
    const pos: [number, number, number] = [
      Number(l.slice(0, 10)),
      Number(l.slice(10, 20)),
      Number(l.slice(20, 30)),
    ];
    const el = l.slice(31, 34).trim();
    if (!el || pos.some((t) => !Number.isFinite(t))) return err(`Dòng nguyên tử ${i + 1} sai`);
    atoms.push({ el, pos, charge: CHG_CODE[Number(l.slice(36, 39))] ?? 0 });
  }
  const bonds: MolBond[] = [];
  for (let i = 0; i < nBonds; i++) {
    const l = lines[4 + nAtoms + i] ?? '';
    const a = Number(l.slice(0, 3)) - 1;
    const b = Number(l.slice(3, 6)) - 1;
    const order = Number(l.slice(6, 9));
    if (!atoms[a] || !atoms[b]) return err(`Dòng liên kết ${i + 1} sai`);
    bonds.push({ a, b, order });
  }
  // Khối thuộc tính: "M  CHG" ghi đè điện tích ở khối nguyên tử
  for (const l of lines.slice(4 + nAtoms + nBonds)) {
    if (l.startsWith('M  END')) break;
    if (l.startsWith('M  CHG')) {
      const n = Number(l.slice(6, 9));
      for (let k = 0; k < n; k++) {
        const idx = Number(l.slice(10 + k * 8, 13 + k * 8)) - 1;
        const q = Number(l.slice(14 + k * 8, 17 + k * 8));
        if (atoms[idx]) atoms[idx].charge = q;
      }
    }
  }
  return ok({ atoms, bonds, flat: atoms.every((a) => Math.abs(a.pos[2]) < 1e-4) });
}

type V = [number, number, number];
const sub = (p: V, q: V): V => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
const len = (v: V) => Math.hypot(v[0], v[1], v[2]);

/** Khoảng cách giữa hai điểm (Å) */
export const distance = (p: V, q: V) => len(sub(p, q));

/** Góc p–q–r tại đỉnh q (độ) */
export function angle(p: V, q: V, r: V): number {
  const u = sub(p, q);
  const v = sub(r, q);
  const c = (u[0] * v[0] + u[1] * v[1] + u[2] * v[2]) / (len(u) * len(v));
  return (Math.acos(Math.min(1, Math.max(-1, c))) * 180) / Math.PI;
}

/** Số electron hoá trị của nguyên tố nhóm A (s, p); null với kim loại chuyển tiếp. */
export function mainGroupValence(el: string): number | null {
  const z = zOf(el);
  if (z === 0) return null;
  if (z <= 2) return z;
  const starts = [3, 11, 19, 37, 55, 87];
  const len = [8, 8, 18, 18, 32, 32];
  for (let i = starts.length - 1; i >= 0; i--) {
    const off = z - starts[i]!;
    if (off < 0) continue;
    const width = len[i]!;
    if (off < 2) return off + 1; // nhóm IA, IIA
    const fromEnd = width - off; // nhóm VIIIA = 1, VIIA = 2, …
    if (fromEnd <= 6) return 9 - fromEnd; // nhóm IIIA..VIIIA: 3..8
    return null; // kim loại chuyển tiếp, họ Lantan/Actini
  }
  return null;
}

export type VseprGeometry =
  | 'linear'
  | 'trigonalPlanar'
  | 'bent'
  | 'tetrahedral'
  | 'trigonalPyramidal'
  | 'trigonalBipyramidal'
  | 'seesaw'
  | 'tShaped'
  | 'octahedral'
  | 'squarePyramidal'
  | 'squarePlanar';

const GEOMETRY: Record<string, { geometry: VseprGeometry; ideal: number | null }> = {
  '2,0': { geometry: 'linear', ideal: 180 },
  '3,0': { geometry: 'trigonalPlanar', ideal: 120 },
  '3,1': { geometry: 'bent', ideal: 120 },
  '4,0': { geometry: 'tetrahedral', ideal: 109.5 },
  '4,1': { geometry: 'trigonalPyramidal', ideal: 109.5 },
  '4,2': { geometry: 'bent', ideal: 109.5 },
  '5,0': { geometry: 'trigonalBipyramidal', ideal: null },
  '5,1': { geometry: 'seesaw', ideal: null },
  '5,2': { geometry: 'tShaped', ideal: 90 },
  '5,3': { geometry: 'linear', ideal: 180 },
  '6,0': { geometry: 'octahedral', ideal: 90 },
  '6,1': { geometry: 'squarePyramidal', ideal: 90 },
  '6,2': { geometry: 'squarePlanar', ideal: 90 },
};

export interface VseprCenter {
  atom: number;
  el: string;
  /** Số nguyên tử liên kết (X) */
  bonded: number;
  /** Số cặp electron không liên kết (E) */
  lonePairs: number;
  /** "AX2E2" */
  notation: string;
  geometry: VseprGeometry;
  /** Góc lý tưởng theo mô hình (độ), null nếu có nhiều loại góc */
  idealAngle: number | null;
  /** Góc đo được trung bình giữa các liên kết (độ), chỉ có khi là cấu trúc 3D */
  measuredAngle: number | null;
}

/**
 * Phân tích VSEPR cho mọi nguyên tử nhóm A có ≥ 2 liên kết.
 * Số cặp không liên kết E = (e hoá trị − tổng bậc liên kết − điện tích) / 2.
 * Liên kết thơm (bậc 4) tính là 1,5. Bỏ qua nguyên tử kim loại chuyển tiếp và trường hợp electron lẻ.
 */
export function vsepr(mol: Molecule): VseprCenter[] {
  const out: VseprCenter[] = [];
  mol.atoms.forEach((atom, i) => {
    const nb = mol.bonds.filter((b) => b.a === i || b.b === i);
    if (nb.length < 2) return;
    const valence = mainGroupValence(atom.el);
    if (valence == null) return;
    const used = nb.reduce((s, b) => s + (b.order === 4 ? 1.5 : b.order), 0);
    const free = valence - used - atom.charge;
    if (free < 0 || !Number.isInteger(free / 2)) return;
    const lonePairs = free / 2;
    const g = GEOMETRY[`${nb.length + lonePairs},${lonePairs}`];
    if (!g) return;
    let measuredAngle: number | null = null;
    if (!mol.flat) {
      const others = nb.map((b) => (b.a === i ? b.b : b.a));
      const angles: number[] = [];
      for (let p = 0; p < others.length; p++)
        for (let q = p + 1; q < others.length; q++)
          angles.push(angle(mol.atoms[others[p]!]!.pos, atom.pos, mol.atoms[others[q]!]!.pos));
      // Chỉ báo góc khi mọi góc gần như bằng nhau (vd. không tính 90°/180° của bát diện)
      const min = Math.min(...angles);
      const max = Math.max(...angles);
      if (max - min < 8) measuredAngle = angles.reduce((s, x) => s + x, 0) / angles.length;
    }
    out.push({
      atom: i,
      el: atom.el,
      bonded: nb.length,
      lonePairs,
      notation: `AX${nb.length}${lonePairs ? `E${lonePairs}` : ''}`,
      geometry: g.geometry,
      idealAngle: g.ideal,
      measuredAngle,
    });
  });
  return out;
}

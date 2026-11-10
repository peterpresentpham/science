/*
 * Mô hình phân tử cho trình dựng 2D: nguyên tử + liên kết (chưa có hiđro, RDKit tự thêm H ngầm định).
 * Toạ độ màn hình (y hướng xuống); chuyển sang molblock V2000 để RDKit kiểm hoá trị.
 */
export interface BAtom {
  id: number;
  el: string;
  x: number;
  y: number;
  /** Điện tích hình thức (−2..+2), mặc định 0 */
  charge?: number;
}
export interface BBond {
  a: number;
  b: number;
  order: 1 | 2 | 3;
}
export interface Mol2D {
  atoms: BAtom[];
  bonds: BBond[];
}

/** Số pixel ứng với 1 đơn vị toạ độ RDKit (độ dài liên kết chuẩn của RDKit là 1,5). */
export const SCALE = 28;
export const BOND_PX = 1.5 * SCALE;

export const PALETTE = ['C', 'H', 'O', 'N', 'S', 'P', 'F', 'Cl', 'Br', 'I'] as const;

export const nextId = (m: Mol2D) => m.atoms.reduce((n, a) => Math.max(n, a.id), 0) + 1;

export const bondBetween = (m: Mol2D, a: number, b: number) =>
  m.bonds.find((k) => (k.a === a && k.b === b) || (k.a === b && k.b === a));

export function toMolblock(m: Mol2D): string {
  const idx = new Map(m.atoms.map((a, i) => [a.id, i + 1]));
  const f = (n: number) => n.toFixed(4).padStart(10);
  const lines = ['', '  nguyento', ''];
  lines.push(
    `${String(m.atoms.length).padStart(3)}${String(m.bonds.length).padStart(3)}  0  0  0  0  0  0  0  0999 V2000`
  );
  for (const a of m.atoms)
    lines.push(
      `${f(a.x / SCALE)}${f(-a.y / SCALE)}${f(0)} ${a.el.padEnd(3)} 0  0  0  0  0  0  0  0  0  0  0  0`
    );
  for (const b of m.bonds)
    lines.push(
      `${String(idx.get(b.a)).padStart(3)}${String(idx.get(b.b)).padStart(3)}${String(b.order).padStart(3)}  0`
    );
  // Điện tích: "M  CHG" (tối đa 8 cặp mỗi dòng)
  const charged = m.atoms.filter((a) => a.charge);
  for (let i = 0; i < charged.length; i += 8) {
    const chunk = charged.slice(i, i + 8);
    lines.push(
      `M  CHG${String(chunk.length).padStart(3)}` +
        chunk
          .map((a) => ` ${String(idx.get(a.id)).padStart(3)} ${String(a.charge).padStart(3)}`)
          .join('')
    );
  }
  lines.push('M  END');
  return lines.join('\n');
}

/** Đọc lại molblock V2000 (RDKit trả về) thành mô hình; liên kết thơm (4) và loại lạ coi là đơn. */
export function fromMolblock(block: string): Mol2D {
  const lines = block.split('\n');
  const counts = lines[3] ?? '';
  const na = Number(counts.slice(0, 3));
  const nb = Number(counts.slice(3, 6));
  const atoms: BAtom[] = [];
  for (let i = 0; i < na; i++) {
    const l = lines[4 + i] ?? '';
    atoms.push({
      id: i + 1,
      el: l.slice(31, 34).trim(),
      x: Number(l.slice(0, 10)) * SCALE,
      y: -Number(l.slice(10, 20)) * SCALE,
    });
  }
  const bonds: BBond[] = [];
  for (let i = 0; i < nb; i++) {
    const l = lines[4 + na + i] ?? '';
    const o = Number(l.slice(6, 9));
    bonds.push({
      a: Number(l.slice(0, 3)),
      b: Number(l.slice(3, 6)),
      order: o === 2 || o === 3 ? o : 1,
    });
  }
  for (const l of lines) {
    if (!l.startsWith('M  CHG')) continue;
    const n = Number(l.slice(6, 9));
    for (let i = 0; i < n; i++) {
      const at = atoms[Number(l.slice(10 + 8 * i, 13 + 8 * i)) - 1];
      if (at) at.charge = Number(l.slice(14 + 8 * i, 17 + 8 * i));
    }
  }
  return centred({ atoms, bonds });
}

export const netCharge = (m: Mol2D) => m.atoms.reduce((n, a) => n + (a.charge ?? 0), 0);

/** Nhãn điện tích dạng chỉ số trên: +, −, 2+, 2− */
export const chargeText = (c: number) =>
  c === 0 ? '' : `${Math.abs(c) > 1 ? Math.abs(c) : ''}${c > 0 ? '+' : '\u2212'}`;

/** Dời phân tử về giữa khung vẽ (viewBox 0..W × 0..H). */
export function centred(m: Mol2D, w = 640, h = 420): Mol2D {
  if (m.atoms.length === 0) return m;
  const xs = m.atoms.map((a) => a.x);
  const ys = m.atoms.map((a) => a.y);
  const dx = w / 2 - (Math.min(...xs) + Math.max(...xs)) / 2;
  const dy = h / 2 - (Math.min(...ys) + Math.max(...ys)) / 2;
  return { ...m, atoms: m.atoms.map((a) => ({ ...a, x: a.x + dx, y: a.y + dy })) };
}

/** Công thức phân tử dạng Hill (C, H, rồi theo chữ cái; không có C thì chỉ theo chữ cái) từ số đếm. */
export function hillFormula(counts: Map<string, number>): string {
  const order = [...counts.keys()].sort((a, b) => {
    if (counts.has('C')) {
      if (a === 'C') return -1;
      if (b === 'C') return 1;
      if (a === 'H') return -1;
      if (b === 'H') return 1;
    }
    return a.localeCompare(b);
  });
  return order.map((el) => `${el}${counts.get(el)! > 1 ? counts.get(el) : ''}`).join('');
}

/** Đếm nguyên tử theo ký hiệu từ molblock V2000 (dùng với molblock đã thêm H hiện hết). */
export function countFromMolblock(block: string): Map<string, number> {
  const lines = block.split('\n');
  const na = Number((lines[3] ?? '').slice(0, 3));
  const counts = new Map<string, number>();
  for (let i = 0; i < na; i++) {
    const el = (lines[4 + i] ?? '').slice(31, 34).trim();
    counts.set(el, (counts.get(el) ?? 0) + 1);
  }
  return counts;
}

/** Ví dụ bấm nhanh: tên (khoá messages `builder.examples.*`) và SMILES. */
export const EXAMPLES = [
  { id: 'ethanol', smiles: 'CCO' },
  { id: 'acetic', smiles: 'CC(=O)O' },
  { id: 'benzene', smiles: 'c1ccccc1' },
  { id: 'glycine', smiles: 'NCC(=O)O' },
  { id: 'aspirin', smiles: 'CC(=O)Oc1ccccc1C(=O)O' },
  { id: 'caffeine', smiles: 'Cn1cnc2c1c(=O)n(C)c(=O)n2C' },
] as const;

/** Hướng "trống" quanh một nguyên tử (góc, radian): ngược với trung bình các hướng liên kết hiện có. */
export function freeDirection(m: Mol2D, id: number): number {
  const a = m.atoms.find((k) => k.id === id);
  if (!a) return 0;
  let sx = 0;
  let sy = 0;
  for (const b of m.bonds) {
    const other = b.a === id ? b.b : b.b === id ? b.a : null;
    const o = other === null ? undefined : m.atoms.find((k) => k.id === other);
    if (!o) continue;
    const d = Math.hypot(o.x - a.x, o.y - a.y) || 1;
    sx += (o.x - a.x) / d;
    sy += (o.y - a.y) / d;
  }
  return Math.hypot(sx, sy) < 0.2 ? 0 : Math.atan2(-sy, -sx);
}

interface GroupDef {
  /** Toạ độ trong hệ cục bộ: x dọc theo hướng gắn, y vuông góc; đơn vị = một độ dài liên kết */
  atoms: Array<{ el: string; x: number; y: number; charge?: number }>;
  /** Chỉ số nguyên tử trong nhóm; -1 là nguyên tử đang chọn */
  bonds: Array<[number, number, 1 | 2 | 3]>;
}
const H3 = Math.sqrt(3) / 2;
/** Nhóm chức hay gặp, gắn vào nguyên tử đang chọn. Tên hiển thị ở messages `builder.groups.*`. */
export const GROUPS: Record<string, GroupDef> = {
  oh: { atoms: [{ el: 'O', x: 1, y: 0 }], bonds: [[-1, 0, 1]] },
  ch3: { atoms: [{ el: 'C', x: 1, y: 0 }], bonds: [[-1, 0, 1]] },
  nh2: { atoms: [{ el: 'N', x: 1, y: 0 }], bonds: [[-1, 0, 1]] },
  carbonyl: { atoms: [{ el: 'O', x: 1, y: 0 }], bonds: [[-1, 0, 2]] },
  cooh: {
    atoms: [
      { el: 'C', x: 1, y: 0 },
      { el: 'O', x: 1.5, y: -H3 },
      { el: 'O', x: 1.5, y: H3 },
    ],
    bonds: [
      [-1, 0, 1],
      [0, 1, 2],
      [0, 2, 1],
    ],
  },
  nitro: {
    atoms: [
      { el: 'N', x: 1, y: 0, charge: 1 },
      { el: 'O', x: 1.5, y: -H3 },
      { el: 'O', x: 1.5, y: H3, charge: -1 },
    ],
    bonds: [
      [-1, 0, 1],
      [0, 1, 2],
      [0, 2, 1],
    ],
  },
};
export type GroupId = keyof typeof GROUPS;

/** Gắn nhóm chức vào nguyên tử `anchor`, hướng ra phía trống. Trả về mô hình mới. */
export function attachGroup(m: Mol2D, anchor: number, group: GroupId): Mol2D {
  const a = m.atoms.find((k) => k.id === anchor);
  const def = GROUPS[group];
  if (!a || !def) return m;
  const ang = freeDirection(m, anchor);
  const cos = Math.cos(ang);
  const sin = Math.sin(ang);
  const base = nextId(m);
  const added: BAtom[] = def.atoms.map((g, i) => ({
    id: base + i,
    el: g.el,
    x: a.x + (g.x * cos - g.y * sin) * BOND_PX,
    y: a.y + (g.x * sin + g.y * cos) * BOND_PX,
    ...(g.charge ? { charge: g.charge } : {}),
  }));
  const bonds: BBond[] = def.bonds.map(([i, j, order]) => ({
    a: i === -1 ? anchor : base + i,
    b: base + j,
    order,
  }));
  return { atoms: [...m.atoms, ...added], bonds: [...m.bonds, ...bonds] };
}

/** Thêm một vòng n cạnh (benzen khi `aromatic`, xen kẽ đôi/đơn) ở bên phải phân tử hiện có. */
export function addRing(m: Mol2D, n: number, aromatic: boolean, w = 640, h = 420): Mol2D {
  const r = BOND_PX / (2 * Math.sin(Math.PI / n));
  const right = m.atoms.length ? Math.max(...m.atoms.map((a) => a.x)) + BOND_PX + r : w / 2;
  const cy = m.atoms.length ? m.atoms.reduce((s, a) => s + a.y, 0) / m.atoms.length : h / 2;
  const base = nextId(m);
  const atoms: BAtom[] = Array.from({ length: n }, (_, i) => ({
    id: base + i,
    el: 'C',
    x: right + r * Math.cos((2 * Math.PI * i) / n - Math.PI / 2),
    y: cy + r * Math.sin((2 * Math.PI * i) / n - Math.PI / 2),
  }));
  const bonds: BBond[] = atoms.map((_, i) => ({
    a: base + i,
    b: base + ((i + 1) % n),
    order: aromatic && n % 2 === 0 && i % 2 === 0 ? 2 : 1,
  }));
  return { atoms: [...m.atoms, ...atoms], bonds: [...m.bonds, ...bonds] };
}

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** SVG độc lập (nền trắng, nét đen, không phụ thuộc CSS của trang) để tải về hoặc đổi sang PNG. */
export function toSvg(m: Mol2D): { svg: string; width: number; height: number } {
  const pad = 24;
  const xs = m.atoms.map((a) => a.x);
  const ys = m.atoms.map((a) => a.y);
  const x0 = Math.min(...xs) - pad;
  const y0 = Math.min(...ys) - pad;
  const width = Math.max(...xs) - Math.min(...xs) + 2 * pad;
  const height = Math.max(...ys) - Math.min(...ys) + 2 * pad;
  const byId = new Map(m.atoms.map((a) => [a.id, a]));
  const shown = (a: BAtom) => a.el !== 'C' || !!a.charge;
  const parts: string[] = [];
  for (const b of m.bonds) {
    const A = byId.get(b.a)!;
    const B = byId.get(b.b)!;
    const len = Math.hypot(B.x - A.x, B.y - A.y) || 1;
    const ux = (B.x - A.x) / len;
    const uy = (B.y - A.y) / len;
    const ta = shown(A) ? 10 : 0;
    const tb = shown(B) ? 10 : 0;
    const offs = b.order === 1 ? [0] : b.order === 2 ? [-2.5, 2.5] : [-4, 0, 4];
    for (const o of offs)
      parts.push(
        `<line x1="${(A.x + ux * ta - uy * o).toFixed(1)}" y1="${(A.y + uy * ta + ux * o).toFixed(1)}" x2="${(B.x - ux * tb - uy * o).toFixed(1)}" y2="${(B.y - uy * tb + ux * o).toFixed(1)}" stroke="#111" stroke-width="1.8" stroke-linecap="round"/>`
      );
  }
  for (const a of m.atoms) {
    if (!shown(a)) continue;
    parts.push(
      `<text x="${a.x.toFixed(1)}" y="${(a.y + 5).toFixed(1)}" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="15" font-weight="700" fill="#111">${esc(a.el)}</text>`
    );
    if (a.charge)
      parts.push(
        `<text x="${(a.x + 9).toFixed(1)}" y="${(a.y - 6).toFixed(1)}" font-family="ui-monospace,Menlo,monospace" font-size="11" fill="#111">${esc(chargeText(a.charge))}</text>`
      );
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0.toFixed(1)} ${y0.toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)}" width="${width.toFixed(0)}" height="${height.toFixed(0)}"><rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${width.toFixed(1)}" height="${height.toFixed(1)}" fill="#fff"/>${parts.join('')}</svg>`;
  return { svg, width, height };
}

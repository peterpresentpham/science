/**
 * Dựng mạng tinh thể từ kiểu mạng + hằng số mạng (Å). Không cần file CIF: các mạng ở đây đều có
 * cơ sở (basis) đơn giản, viết tay chính xác hơn và nhẹ hơn tải dữ liệu.
 */
export type Lattice =
  | 'bcc'
  | 'fcc'
  | 'hcp'
  | 'diamond'
  | 'graphite'
  | 'rhombohedral'
  | 'rocksalt'
  | 'cscl'
  | 'zincblende'
  | 'fluorite'
  | 'icosahedron';

export interface CrystalSpec {
  lattice: Lattice;
  /** Hằng số mạng a (Å); với icosahedron là độ dài cạnh (khoảng cách liên kết) */
  a: number;
  /** Hằng số mạng c (Å) của mạng lục phương */
  c?: number;
  /** Góc α (độ) của mạng mặt thoi */
  alpha?: number;
}

export type Vec3 = [number, number, number];
export interface CrystalAtom {
  /** 0: nguyên tố (hoặc cation) thứ nhất; 1: anion trong tinh thể ion */
  site: 0 | 1;
  pos: Vec3;
}
export interface Crystal {
  atoms: CrystalAtom[];
  /** Các cạnh của khối ô mạng (đã nhân lên n lần), để vẽ khung */
  edges: Array<[Vec3, Vec3]>;
  /** Khoảng cách gần nhất giữa hai nguyên tử (Å) */
  nearest: number;
  /** Số phối trí (số láng giềng gần nhất) của vị trí 0 */
  coordination: number;
  /** Số nguyên tử thuộc về một ô mạng cơ sở (đếm phân số ở đỉnh/cạnh/mặt) */
  atomsPerCell: number;
}

type Basis = Array<[0 | 1, Vec3]>;
const FCC: Vec3[] = [
  [0, 0, 0],
  [0.5, 0.5, 0],
  [0.5, 0, 0.5],
  [0, 0.5, 0.5],
];
const shift = (pts: Vec3[], d: Vec3): Vec3[] =>
  pts.map(([x, y, z]) => [x + d[0], y + d[1], z + d[2]]);

function vectors(spec: CrystalSpec): [Vec3, Vec3, Vec3] {
  const { a } = spec;
  if (spec.lattice === 'hcp' || spec.lattice === 'graphite') {
    const c = spec.c ?? a * 1.633;
    return [
      [a, 0, 0],
      [-a / 2, (a * Math.sqrt(3)) / 2, 0],
      [0, 0, c],
    ];
  }
  if (spec.lattice === 'rhombohedral') {
    const al = ((spec.alpha ?? 60) * Math.PI) / 180;
    const ca = Math.cos(al);
    const sa = Math.sin(al);
    const cx = ca;
    const cy = (ca - ca * ca) / sa;
    const cz = Math.sqrt(Math.max(0, 1 - cx * cx - cy * cy));
    return [
      [a, 0, 0],
      [a * ca, a * sa, 0],
      [a * cx, a * cy, a * cz],
    ];
  }
  return [
    [a, 0, 0],
    [0, a, 0],
    [0, 0, a],
  ];
}

function basis(l: Lattice): Basis {
  const one = (pts: Vec3[], site: 0 | 1 = 0): Basis => pts.map((p) => [site, p]);
  switch (l) {
    case 'bcc':
      return one([
        [0, 0, 0],
        [0.5, 0.5, 0.5],
      ]);
    case 'fcc':
      return one(FCC);
    case 'diamond':
      return one([...FCC, ...shift(FCC, [0.25, 0.25, 0.25])]);
    case 'hcp':
      return one([
        [0, 0, 0],
        [1 / 3, 2 / 3, 0.5],
      ]);
    case 'graphite':
      // Than chì 2H (xếp lớp ABAB), nhóm không gian P6₃/mmc
      return one([
        [0, 0, 0.25],
        [0, 0, 0.75],
        [1 / 3, 2 / 3, 0.25],
        [2 / 3, 1 / 3, 0.75],
      ]);
    case 'rhombohedral':
      return one([[0, 0, 0]]);
    case 'rocksalt':
      return [...one(FCC, 0), ...one(shift(FCC, [0.5, 0, 0]), 1)];
    case 'cscl':
      return [
        [0, [0, 0, 0]],
        [1, [0.5, 0.5, 0.5]],
      ];
    case 'zincblende':
      return [...one(FCC, 0), ...one(shift(FCC, [0.25, 0.25, 0.25]), 1)];
    case 'fluorite': {
      const f: Vec3[] = [];
      for (const x of [0.25, 0.75])
        for (const y of [0.25, 0.75]) for (const z of [0.25, 0.75]) f.push([x, y, z]);
      return [...one(FCC, 0), ...one(f, 1)];
    }
    case 'icosahedron':
      return [];
  }
}

const dist = (p: Vec3, q: Vec3) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);

/** Cụm B₁₂ hình 20 mặt đều: 12 đỉnh (0, ±1, ±φ) hoán vị vòng, cạnh = a. */
function icosahedron(a: number): Crystal {
  const phi = (1 + Math.sqrt(5)) / 2;
  const k = a / 2;
  const atoms: CrystalAtom[] = [];
  for (const s1 of [-1, 1])
    for (const s2 of [-1, 1]) {
      atoms.push({ site: 0, pos: [0, s1 * k, s2 * phi * k] });
      atoms.push({ site: 0, pos: [s1 * k, s2 * phi * k, 0] });
      atoms.push({ site: 0, pos: [s2 * phi * k, 0, s1 * k] });
    }
  return { atoms, edges: [], nearest: a, coordination: 5, atomsPerCell: 12 };
}

/**
 * Dựng n×n×n ô mạng. Lấy cả nguyên tử nằm đúng trên đỉnh, cạnh, mặt của khối (như hình SGK),
 * nên số nguyên tử hiển thị nhiều hơn số nguyên tử thực sự thuộc về ô.
 */
export function buildCrystal(spec: CrystalSpec, n = 1): Crystal {
  if (spec.lattice === 'icosahedron') return icosahedron(spec.a);
  const [v1, v2, v3] = vectors(spec);
  const cart = ([u, v, w]: Vec3): Vec3 => [
    u * v1[0] + v * v2[0] + w * v3[0],
    u * v1[1] + v * v2[1] + w * v3[1],
    u * v1[2] + v * v2[2] + w * v3[2],
  ];
  const eps = 1e-6;
  const atoms: CrystalAtom[] = [];
  const seen = new Set<string>();
  const b = basis(spec.lattice);
  for (let i = -1; i <= n; i++)
    for (let j = -1; j <= n; j++)
      for (let k = -1; k <= n; k++)
        for (const [site, [x, y, z]] of b) {
          const f: Vec3 = [x + i, y + j, z + k];
          if (f.some((t) => t < -eps || t > n + eps)) continue;
          const key = f.map((t) => t.toFixed(4)).join(',');
          if (seen.has(key)) continue;
          seen.add(key);
          atoms.push({ site, pos: cart(f) });
        }

  // Khung: 12 cạnh của khối n×n×n
  const corner = (u: number, v: number, w: number) => cart([u * n, v * n, w * n]);
  const edges: Array<[Vec3, Vec3]> = [];
  for (const [p, q] of [
    [
      [0, 0, 0],
      [1, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [0, 0, 1],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
    ],
    [
      [1, 1, 0],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0, 1],
      [0, 0, 1],
    ],
    [
      [1, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 0, 1],
      [1, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 1],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
    ],
  ] as Array<[Vec3, Vec3]>)
    edges.push([corner(...p), corner(...q)]);

  // Láng giềng gần nhất của vị trí 0, đo trong mạng 3×3×3 để không bị hụt ở biên
  const probe = n >= 3 ? atoms : buildCrystal(spec, 3).atoms;
  const center = probe.reduce(
    (best, a) => {
      if (a.site !== 0) return best;
      const m = cart([1.5, 1.5, 1.5]);
      const d = dist(a.pos, m);
      return d < best.d ? { a, d } : best;
    },
    { a: probe[0]!, d: Infinity }
  ).a;
  const ds = probe.filter((a) => a !== center).map((a) => dist(a.pos, center.pos));
  const nearest = Math.min(...ds);
  // Lớp láng giềng thứ nhất: tới 1,12 × khoảng cách gần nhất. hcp méo (Zn, Cd, Be, Ru...) có 6 + 6 láng giềng
  // cách nhau tới ~10% mà SGK vẫn tính là 12; lớp thứ hai của bcc (1,155 ×) thì không tính.
  const coordination = ds.filter((d) => d < nearest * 1.12).length;
  const atomsPerCell = b.length;
  return { atoms, edges, nearest, coordination, atomsPerCell };
}

/** Định dạng XYZ (đọc được bằng 3Dmol), `symbols[site]` là ký hiệu của từng vị trí. */
export function crystalToXYZ(c: Crystal, symbols: readonly string[], comment = ''): string {
  const lines = c.atoms.map(
    (a) => `${symbols[a.site] ?? symbols[0]} ${a.pos.map((t) => t.toFixed(4)).join(' ')}`
  );
  return `${c.atoms.length}\n${comment}\n${lines.join('\n')}\n`;
}

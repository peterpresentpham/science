/**
 * Mạng tinh thể của một số hợp chất ion kinh điển (PubChem chỉ có công thức 2D cho muối).
 * Khoá là `q` trong curated/compounds.ts. sites[0] nằm ở các nút lập phương tâm diện
 * (với kiểu fluorite: cation; phản fluorite như Li₂O thì đảo lại: anion ở nút fcc).
 * Hằng số mạng (Å) ở nhiệt độ phòng.
 */
import type { CompoundCrystal } from '../src/schema.ts';

const rs = (a: number, cation: string, anion: string): CompoundCrystal => ({
  lattice: 'rocksalt',
  a,
  sites: [cation, anion],
});

export const COMPOUND_CRYSTALS: Record<string, CompoundCrystal> = {
  'sodium chloride': rs(5.64, 'Na', 'Cl'),
  'potassium chloride': rs(6.293, 'K', 'Cl'),
  'lithium chloride': rs(5.13, 'Li', 'Cl'),
  'lithium fluoride': rs(4.027, 'Li', 'F'),
  'sodium fluoride': rs(4.63, 'Na', 'F'),
  'sodium bromide': rs(5.97, 'Na', 'Br'),
  'potassium bromide': rs(6.6, 'K', 'Br'),
  'sodium iodide': rs(6.47, 'Na', 'I'),
  'potassium iodide': rs(7.066, 'K', 'I'),
  'magnesium oxide': rs(4.212, 'Mg', 'O'),
  'calcium oxide': rs(4.811, 'Ca', 'O'),
  'nickel(II) oxide': rs(4.177, 'Ni', 'O'),
  'manganese(II) oxide': rs(4.445, 'Mn', 'O'),
  'silver chloride': rs(5.549, 'Ag', 'Cl'),
  'silver bromide': rs(5.774, 'Ag', 'Br'),
  'lead(II) sulfide': rs(5.936, 'Pb', 'S'),
  'zinc sulfide': { lattice: 'zincblende', a: 5.409, sites: ['Zn', 'S'] },
  'silicon carbide': { lattice: 'zincblende', a: 4.359, sites: ['Si', 'C'] },
  'calcium fluoride': { lattice: 'fluorite', a: 5.463, sites: ['Ca', 'F'] },
  'lithium oxide': { lattice: 'fluorite', a: 4.611, sites: ['O', 'Li'] },
};

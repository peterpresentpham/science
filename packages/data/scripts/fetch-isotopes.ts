/**
 * Tải trạng thái cơ bản của mọi hạt nhân đã biết từ IAEA LiveChart of Nuclides (dữ liệu NUBASE/ENSDF).
 * Kết quả raw/isotopes.json được commit, chỉ chạy lại khi cần (cần mạng, 1 yêu cầu ~900 KB):
 *   pnpm --filter @chem/data fetch:isotopes
 *
 * Nguồn: IAEA Nuclear Data Section, LiveChart of Nuclides, https://nds.iaea.org/relnsd/vcharthtml/VChartHTML.html
 * (dữ liệu mở, cần trích dẫn).
 *
 * Mỗi dòng của raw/isotopes.json là một mảng:
 *   [z, n, abundance|null, halfLife|null, decays, jp|null, discoveryYear|null]
 *   halfLife: [giá trị dạng chuỗi như IAEA ghi, đơn vị, toán tử ('' | 'GT' | 'LT' | 'GE' | 'AP'), giây] | 'S' (bền)
 *   decays:   [[kiểu phân rã IAEA, phần trăm|null], …]
 */
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const URL = 'https://nds.iaea.org/relnsd/v1/data?fields=ground_states&nuclides=all';

/** Phân tích CSV có dấu ngoặc kép (trường chứa dấu phẩy hoặc xuống dòng). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!;
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      cell = '';
      if (row.length > 1) rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell || row.length) {
    row.push(cell);
    if (row.length > 1) rows.push(row);
  }
  return rows;
}

const res = await fetch(URL, { headers: { 'User-Agent': 'NguyenTo-periodic-table/0.1' } });
if (!res.ok) throw new Error(`IAEA trả ${res.status}`);
const [head, ...body] = parseCsv(await res.text());
const col = (name: string) => {
  const i = head!.indexOf(name);
  if (i < 0) throw new Error(`Thiếu cột ${name}`);
  return i;
};
const C = {
  z: col('z'),
  n: col('n'),
  ab: col('abundance'),
  jp: col('jp'),
  hl: col('half_life'),
  op: col('operator_hl'),
  unit: col('unit_hl'),
  sec: col('half_life_sec'),
  d1: col('decay_1'),
  p1: col('decay_1_%'),
  d2: col('decay_2'),
  p2: col('decay_2_%'),
  d3: col('decay_3'),
  p3: col('decay_3_%'),
  yr: col('discovery'),
};

const num = (s: string | undefined) => {
  const v = Number(s);
  return s && Number.isFinite(v) ? v : null;
};

type HalfLife = [string, string, string, number] | 'S';
type Row = [
  number,
  number,
  number | null,
  HalfLife | null,
  Array<[string, number | null]>,
  string | null,
  number | null,
];
const out: Row[] = [];
for (const r of body) {
  const z = Number(r[C.z]);
  const n = Number(r[C.n]);
  if (!(z >= 1 && z <= 118) || !Number.isInteger(n)) continue; // bỏ nơtron tự do và nhiễu
  const hlText = r[C.hl] ?? '';
  const unit = r[C.unit] ?? '';
  let halfLife: HalfLife | null = null;
  if (hlText === 'STABLE') halfLife = 'S';
  else if (hlText && ['as', 'ps', 'ns', 'us', 'ms', 's', 'm', 'h', 'd', 'Y'].includes(unit)) {
    const sec = num(r[C.sec]);
    if (sec != null && sec > 0) halfLife = [hlText, unit, r[C.op] ?? '', sec];
  }
  // keV/MeV/eV: bề rộng của trạng thái không liên kết, không phải chu kỳ bán rã → bỏ
  const decays: Array<[string, number | null]> = [];
  for (const [d, p] of [
    [C.d1, C.p1],
    [C.d2, C.p2],
    [C.d3, C.p3],
  ] as const) {
    const mode = r[d] ?? '';
    if (mode) decays.push([mode, num(r[p])]);
  }
  // Giữ hạt nhân đã biết rõ: có chu kỳ bán rã, hoặc ít nhất có kiểu phân rã
  if (!halfLife && decays.length === 0) continue;
  out.push([
    z,
    n,
    num(r[C.ab]),
    halfLife,
    decays,
    r[C.jp] || null,
    num(r[C.yr]) != null ? Math.round(num(r[C.yr])!) : null,
  ]);
}
out.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
await writeFile(join(ROOT, 'raw', 'isotopes.json'), `${JSON.stringify(out)}\n`);
console.log(
  `→ raw/isotopes.json: ${out.length} hạt nhân, ${out.filter((r) => r[3] === 'S').length} bền`
);

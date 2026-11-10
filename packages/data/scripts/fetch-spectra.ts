/**
 * Tải vạch phổ phát xạ vùng nhìn thấy (380–750 nm) của nguyên tử trung hoà (X I) từ NIST ASD.
 * Kết quả raw/spectra.json được commit, chỉ chạy lại khi cần (cần mạng, ~2 phút):
 *   pnpm --filter @chem/data fetch:spectra
 *
 * Nguồn: Kramida, A., Ralchenko, Yu., Reader, J. and NIST ASD Team, NIST Atomic Spectra Database,
 * https://physics.nist.gov/asd (dữ liệu của chính phủ Mỹ, dùng tự do, cần trích dẫn).
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const LOW = 380;
const HIGH = 750;
/** Giữ tối đa bấy nhiêu vạch mạnh nhất mỗi nguyên tố (đủ để thấy "dấu vân tay", file vẫn nhẹ) */
const MAX_LINES = 60;

const elements: { Symbol: string }[] = JSON.parse(
  await readFile(join(ROOT, 'raw', 'pubchem-periodic.json'), 'utf8')
).Table.Row.map((r: { Cell: string[] }) => ({ Symbol: r.Cell[1] }));

const url = (sym: string) =>
  `https://physics.nist.gov/cgi-bin/ASD/lines1.pl?spectra=${sym}+I&limits_type=0&low_w=${LOW}&upp_w=${HIGH}` +
  '&unit=1&de=0&format=3&line_out=0&remove_js=on&en_unit=0&output=0&page_size=15&show_obs_wl=1' +
  '&show_calc_wl=1&order_out=0&show_av=2&tsb_value=0&A_out=0&intens_out=on&allowed_out=1&forbid_out=1';

/** "500", "1000bl", "(30)", "h" → số đầu tiên; không có số → null */
const intensity = (s: string) => {
  const m = s.replace(/"/g, '').match(/\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
};

const out: Record<string, Array<[number, number]>> = {};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

for (const { Symbol: sym } of elements.slice(0, 99)) {
  const res = await fetch(url(sym), { headers: { 'User-Agent': 'NguyenTo-periodic-table/0.1' } });
  const text = await res.text();
  const rows = text.split('\n');
  if (!res.ok || !rows[0]?.startsWith('obs_wl')) {
    console.log(`– ${sym}: không có dữ liệu`);
    await sleep(400);
    continue;
  }
  const lines: Array<[number, number]> = [];
  for (const row of rows.slice(1)) {
    const c = row.split('\t');
    const wl = Number((c[0] ?? '').replace(/"/g, '')) || Number((c[1] ?? '').replace(/"/g, ''));
    const I = intensity(c[2] ?? '');
    if (!wl || I == null || wl < LOW || wl > HIGH) continue;
    lines.push([Math.round(wl * 100) / 100, I]);
  }
  if (lines.length) {
    // Gộp các vạch trùng bước sóng sau khi làm tròn (thành phần cấu trúc tinh tế): giữ cường độ lớn nhất
    const merged = new Map<number, number>();
    for (const [w, i] of lines) merged.set(w, Math.max(i, merged.get(w) ?? 0));
    lines.length = 0;
    for (const [w, i] of merged) lines.push([w, i]);
    lines.sort((a, b) => b[1] - a[1]);
    const top = lines.slice(0, MAX_LINES);
    const max = top[0]![1];
    // Cường độ tương đối 0..1 (thang của NIST không đồng nhất giữa các nguồn: chỉ so trong cùng nguyên tố)
    out[sym] = top
      .map(([w, i]): [number, number] => [w, Math.round((i / max) * 1000) / 1000])
      .sort((a, b) => a[0] - b[0]);
  }
  console.log(`✓ ${sym}: ${lines.length} vạch`);
  await sleep(400);
}

await writeFile(join(ROOT, 'raw', 'spectra.json'), `${JSON.stringify(out)}\n`);
console.log(`→ raw/spectra.json: ${Object.keys(out).length} nguyên tố`);

/** Đối chiếu lịch sử với dist; khác năm/người phải có ghi chú giải thích. */
import { PRIORITY } from '../curated/compounds.ts';
import timeline from '../curated/timeline.ts';
import { History } from '../src/history.ts';
import { Timeline } from '../src/timeline.ts';
import { ensure, jsonFile, loadCurated, unique } from './learning-utils.ts';

const histories = await loadCurated('history', History);
ensure(histories.length === PRIORITY.length, 'Phải có đủ 30 hồ sơ lịch sử');
const lite =
  await jsonFile<Array<{ symbol: string; slug: string; discoveryYear: number | null }>>(
    'dist/elements.json'
  );
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
let milestones = 0;
for (const symbol of PRIORITY) {
  const entry = histories.find((history) => history.file === `${symbol.toLowerCase()}.ts`);
  ensure(entry, `${symbol}: thiếu hồ sơ`);
  const reference = lite.find((element) => element.symbol === symbol);
  ensure(reference, `${symbol}: chưa có dữ liệu build`);
  // discoveredBy chỉ có trong bản đầy đủ, không có trong elements.json lite.
  const full = await jsonFile<{ discoveredBy: string | null }>(
    `dist/elements/${reference.slug}.json`
  );
  const discovery = entry.data.discovery;
  if (discovery.year !== reference.discoveryYear)
    ensure(discovery.note, `${symbol}: khác năm ${reference.discoveryYear} nhưng chưa giải thích`);
  const originalBy = normalize(full.discoveredBy ?? '');
  const newBy = normalize(discovery.by.en);
  if (!originalBy || (!newBy.includes(originalBy) && !originalBy.includes(newBy)))
    ensure(discovery.note, `${symbol}: khác discoveredBy nhưng chưa giải thích`);
  for (const milestone of entry.data.milestones) {
    ensure(
      discovery.year == null || milestone.year >= discovery.year,
      `${symbol}: mốc trước năm phát hiện`
    );
    ensure(milestone.year !== 0, `${symbol}: không dùng năm 0`);
  }
  const sources = [
    discovery.source,
    entry.data.naming.source,
    ...entry.data.story.map((p) => p.source),
    ...entry.data.milestones.map((m) => m.source),
  ];
  for (const source of sources)
    ensure(entry.data.sources.includes(source), `${symbol}: sources thiếu ${source}`);
  milestones += entry.data.milestones.length;
  if (discovery.note) console.log(`· ${symbol}: ${discovery.note.vi}`);
}
const events = Timeline.parse(timeline);
unique(
  events.map((event) => event.id),
  'timeline'
);
ensure(
  events.every(
    (event, index) => event.year !== 0 && (index === 0 || event.year >= events[index - 1]!.year)
  ),
  'Timeline phải theo thứ tự năm, không dùng năm 0'
);
console.log(
  `✓ ${histories.length} lịch sử, ${milestones} mốc nguyên tố, ${events.length} mốc timeline.`
);

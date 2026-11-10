/** Kiểm tra bài đọc, liên kết quiz/hợp chất và dữ liệu widget bằng @chem/core. */
import { balance, parseFormula } from '@chem/core';

import { Lesson } from '../src/lesson.ts';
import { Quiz } from '../src/quiz.ts';
import { curatedCompoundIndex, ensure, loadCurated, unique } from './learning-utils.ts';

const expected = [
  'atomic-structure',
  'periodic-trends',
  'chemical-bonding',
  'redox-reactions',
  'chemical-energy',
  'reaction-rate',
];
const lessons = await loadCurated('lessons', Lesson);
const quizzes = await loadCurated('quiz', Quiz);
const questions = new Map(
  quizzes.flatMap(({ data }) => data.questions.map((q) => [q.id, q] as const))
);
const compounds = await curatedCompoundIndex();
unique(
  lessons.map(({ data }) => data.id),
  'ID bài đọc'
);
unique(
  lessons.map(({ data }) => String(data.order)),
  'Thứ tự bài đọc'
);
ensure(lessons.length === expected.length, 'Cần đúng sáu bài lớp 10');
let widgetCount = 0;
let referenceCount = 0;
for (const { file, data: lesson } of lessons) {
  ensure(file === `${lesson.id}.ts`, `${file}: tên file không khớp ID`);
  ensure(expected[lesson.order - 1] === lesson.id, `${lesson.id}: sai thứ tự chương`);
  const sources = new Set(lesson.sources);
  ensure(sources.has(lesson.textbookSource), `${lesson.id}: thiếu nguồn SGK trong sources`);
  const textBlocks = lesson.blocks.filter((block) => block.type === 'text');
  // Đây là hàng rào tránh bài chỉ có dàn ý; thời gian thực còn phụ thuộc người đọc và widget.
  const vi = textBlocks.reduce((n, b) => n + b.md.vi.trim().split(/\s+/).length, 0);
  const en = textBlocks.reduce((n, b) => n + b.md.en.trim().split(/\s+/).length, 0);
  ensure(vi >= 1100 && en >= 900, `${lesson.id}: phần đọc quá ngắn (${vi} vi / ${en} en)`);
  ensure(vi <= 2500 && en <= 1800, `${lesson.id}: phần đọc vượt phạm vi bài ngắn`);
  ensure(
    lesson.blocks.some((b) => b.type === 'widget'),
    `${lesson.id}: thiếu widget`
  );
  ensure(
    lesson.blocks.some((b) => b.type === 'quiz'),
    `${lesson.id}: thiếu kiểm tra nhanh`
  );
  for (const block of lesson.blocks) {
    if (block.type === 'quiz') {
      unique(block.ids, `${lesson.id}: ID trong một block quiz`);
      for (const id of block.ids) {
        const question = questions.get(id);
        ensure(question, `${lesson.id}: câu hỏi ${id} không tồn tại`);
        ensure(question.grade === lesson.grade, `${lesson.id}: câu ${id} không cùng lớp`);
        referenceCount++;
      }
      continue;
    }
    ensure(sources.has(block.source), `${lesson.id}: nguồn block chưa có trong sources`);
    if (block.type !== 'widget') continue;
    widgetCount++;
    if (block.widget === 'structure-3d' && 'cid' in block.props)
      ensure(
        compounds.has(block.props.cid),
        `${lesson.id}: CID ${block.props.cid} không có trong compounds.ts`
      );
    if (block.widget === 'balance')
      ensure(
        balance(block.props.equation).ok,
        `${lesson.id}: không cân bằng được ${block.props.equation}`
      );
    if (block.widget === 'molar-mass')
      ensure(parseFormula(block.props.formula).ok, `${lesson.id}: công thức widget không hợp lệ`);
  }
  console.log(
    `· ${lesson.id}: ${vi} đơn vị cách trắng vi / ${en} từ en, dự kiến ${lesson.readingMinutes} phút`
  );
}
console.log(
  `✓ ${lessons.length} bài đọc; ${widgetCount} widget, ${referenceCount} liên kết câu hỏi hợp lệ.`
);

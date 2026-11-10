/** Kiểm tra ngân hàng, tính lại đáp án số và cân bằng phương trình bằng @chem/core. */
import {
  balance,
  ionConfiguration,
  molarMass,
  nucleonCounts,
  parseFormula,
  stoichiometry,
  SYMBOLS,
  totalElectrons,
} from '@chem/core';

import { type Question, Quiz, QUIZ_TOPICS } from '../src/quiz.ts';
import { ensure, loadCurated, unique } from './learning-utils.ts';

const quizzes = await loadCurated('quiz', Quiz);
unique(
  quizzes.map(({ data }) => data.id),
  'Chủ đề quiz'
);
ensure(quizzes.length === QUIZ_TOPICS.length, 'Thiếu hoặc thừa chủ đề quiz');
const ids: string[] = [];
const symbols = new Set<string>(SYMBOLS);
let numeric = 0;
let equations = 0;

function recompute(question: Extract<Question, { type: 'number' }>) {
  const calculation = question.calculation;
  if (calculation.kind === 'nucleon-count') return nucleonCounts(calculation.z)[calculation.field];
  if (calculation.kind === 'electron-count')
    return totalElectrons(ionConfiguration(calculation.z, calculation.charge));
  if (calculation.kind === 'atom-count' || calculation.kind === 'molar-mass') {
    const parsed = parseFormula(calculation.formula);
    ensure(parsed.ok, `${question.id}: công thức không đọc được`);
    if (calculation.kind === 'atom-count')
      return parsed.value.composition.get(calculation.element) ?? 0;
    const masses = Object.fromEntries(
      Object.entries(calculation.masses).filter(
        (entry): entry is [string, number] => typeof entry[1] === 'number'
      )
    );
    return molarMass(parsed.value, masses);
  }
  ensure(
    question.equations.includes(calculation.equation),
    `${question.id}: thiếu phương trình của phép tính trong equations`
  );
  const result = balance(calculation.equation);
  ensure(result.ok, `${question.id}: không cân bằng được phương trình của phép tính`);
  if (calculation.kind === 'coefficient') {
    const coefficient = result.value.coefficients[calculation.species];
    ensure(coefficient !== undefined, `${question.id}: chỉ số chất ngoài phạm vi`);
    return Number(coefficient);
  }
  const amounts =
    calculation.kind === 'reaction-rate' ? calculation.consumedMol : calculation.givenMol;
  ensure(
    amounts.length === result.value.equation.reactantCount,
    `${question.id}: givenMol/consumedMol phải đúng số chất đầu`
  );
  const computed = stoichiometry(
    result.value.coefficients,
    result.value.equation.reactantCount,
    amounts
  );
  ensure(computed, `${question.id}: thiếu dữ kiện lượng chất`);
  if (calculation.kind === 'reaction-heat') return computed.extent * calculation.deltaH;
  if (calculation.kind === 'reaction-rate')
    return computed.extent / calculation.timeS / calculation.volumeL;
  const amount = computed.reacted[calculation.species];
  ensure(amount !== undefined, `${question.id}: chỉ số chất ngoài phạm vi`);
  return amount;
}

for (const { file, data: quiz } of quizzes) {
  ensure(file === `${quiz.id}.ts`, `${file}: tên file không khớp chủ đề`);
  ensure(QUIZ_TOPICS.includes(quiz.id), `${file}: chủ đề không hợp lệ`);
  ensure(
    new Set(quiz.questions.map((question) => question.difficulty)).size === 3,
    `${quiz.id}: thiếu mức độ khó`
  );
  unique(
    quiz.questions.map((question) => question.q.vi),
    `${quiz.id}: đề vi`
  );
  unique(
    quiz.questions.map((question) => question.q.en),
    `${quiz.id}: đề en`
  );
  for (const question of quiz.questions) {
    ids.push(question.id);
    ensure(question.id.startsWith(`${quiz.id}-`), `${question.id}: sai tiền tố chủ đề`);
    for (const symbol of question.elements)
      ensure(symbols.has(symbol), `${question.id}: ký hiệu ${symbol} không hợp lệ`);
    if (question.type === 'single' || question.type === 'multi') {
      unique(
        question.options.map((option) => option.vi),
        `${question.id}: lựa chọn vi`
      );
      unique(
        question.options.map((option) => option.en),
        `${question.id}: lựa chọn en`
      );
      const answers = question.type === 'single' ? [question.answer] : question.answer;
      unique(answers.map(String), `${question.id}: chỉ số đáp án`);
      for (const answer of answers)
        ensure(
          answer >= 0 && answer < question.options.length,
          `${question.id}: đáp án ngoài phạm vi`
        );
    } else if (question.type === 'element') {
      ensure(symbols.has(question.answer), `${question.id}: đáp án nguyên tố không hợp lệ`);
      ensure(
        question.elements.includes(question.answer),
        `${question.id}: elements thiếu nguyên tố đáp án`
      );
    } else {
      const answer = recompute(question);
      ensure(Number.isFinite(answer), `${question.id}: kết quả không hữu hạn`);
      ensure(
        Math.abs(answer - question.answer) <= Math.max(question.tolerance, 1e-10),
        `${question.id}: ghi ${question.answer}, @chem/core tính ${answer}`
      );
      numeric++;
    }
    if (
      [question.q.vi, question.q.en, question.explain.vi, question.explain.en].some((text) =>
        text.includes('->')
      )
    )
      ensure(
        question.equations.length > 0,
        `${question.id}: có phương trình trong chữ nhưng chưa khai báo equations`
      );
    unique(question.equations, `${question.id}: phương trình`);
    for (const equation of question.equations) {
      const result = balance(equation);
      ensure(result.ok, `${question.id}: không cân bằng được ${equation}`);
      equations++;
    }
  }
  console.log(`· ${quiz.id}: ${quiz.questions.length} câu, đủ 3 mức`);
}
unique(ids, 'ID toàn ngân hàng');
console.log(
  `✓ ${quizzes.length} chủ đề, ${ids.length} câu; tính lại ${numeric} đáp án số, kiểm tra ${equations} phương trình.`
);

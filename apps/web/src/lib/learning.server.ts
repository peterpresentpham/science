import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Lesson } from '@chem/data/lesson';
import type { Quiz } from '@chem/data/quiz';

const read = async <T>(name: string): Promise<T> =>
  JSON.parse(
    await readFile(join(process.cwd(), 'public', 'data', 'learning', `${name}.json`), 'utf8')
  ) as T;

/** Chỉ chạy lúc build (Server Component): bài học theo thứ tự, và ngân hàng câu hỏi. */
export const readLessons = () => read<Lesson[]>('lessons');
export const readQuizzes = () => read<Quiz[]>('quizzes');

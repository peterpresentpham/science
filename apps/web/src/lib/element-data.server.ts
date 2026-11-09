import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { ElementFull } from '@chem/data';

/** Chỉ chạy lúc build (Server Component). Đọc cùng file JSON mà panel tải phía client. */
export async function readElement(slug: string): Promise<ElementFull> {
  const file = join(process.cwd(), 'public', 'data', 'elements', `${slug}.json`);
  return JSON.parse(await readFile(file, 'utf8')) as ElementFull;
}

/** Tiện ích dùng chung cho các script kiểm tra học liệu, không chạy test runner. */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { z } from 'zod';

import { COMPOUNDS } from '../curated/compounds.ts';

export const DATA_ROOT = join(import.meta.dirname, '..');
export function ensure(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
export const jsonFile = async <T>(relative: string): Promise<T> =>
  JSON.parse(await readFile(join(DATA_ROOT, relative), 'utf8')) as T;

export async function loadCurated<T>(directory: string, schema: z.ZodType<T>) {
  const files = (await readdir(join(DATA_ROOT, 'curated', directory)))
    .filter((file) => file.endsWith('.ts'))
    .sort();
  const result: Array<{ file: string; data: T }> = [];
  for (const file of files) {
    const mod = (await import(pathToFileURL(join(DATA_ROOT, 'curated', directory, file)).href)) as {
      default: unknown;
    };
    const parsed = schema.safeParse(mod.default);
    ensure(
      parsed.success,
      `${directory}/${file}: ${parsed.success ? '' : z.prettifyError(parsed.error)}`
    );
    result.push({ file, data: parsed.data });
  }
  return result;
}

export async function curatedCompoundIndex() {
  const compounds =
    await jsonFile<Array<{ cid: number; query: string | null; formula: string }>>(
      'compounds/index.json'
    );
  return new Map(
    compounds
      .filter((entry) =>
        COMPOUNDS.some(
          (curated) => curated.cid === entry.cid || (curated.q != null && curated.q === entry.query)
        )
      )
      .map((entry) => [entry.cid, entry])
  );
}

export function unique(values: readonly string[], context: string) {
  const seen = new Set<string>();
  for (const value of values) {
    ensure(!seen.has(value), `${context}: trùng ${value}`);
    seen.add(value);
  }
}

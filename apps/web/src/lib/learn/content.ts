import type { Deck as ContentDeck } from '@chem/data/flashcard';
import type { Lesson } from '@chem/data/lesson';
import type { Quiz } from '@chem/data/quiz';
import type { Reaction } from '@chem/data/reaction';
import { useEffect, useState } from 'react';

import { BASE_PATH } from '@/lib/elements';

/** Học liệu GPT biên soạn, build thành JSON (public/data/learning) và tải khi cần. */
interface Files {
  decks: ContentDeck[];
  quizzes: Quiz[];
  lessons: Lesson[];
  reactions: Reaction[];
}

const cache = new Map<string, Promise<unknown>>();

export function loadLearning<K extends keyof Files>(name: K): Promise<Files[K]> {
  let p = cache.get(name);
  if (!p) {
    p = fetch(`${BASE_PATH}/data/learning/${name}.json`).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });
    // Lỗi mạng: bỏ khỏi cache để lần sau thử lại
    p.catch(() => cache.delete(name));
    cache.set(name, p);
  }
  return p as Promise<Files[K]>;
}

/** null: đang tải · 'error': tải lỗi (ví dụ offline và chưa tải gói dữ liệu). */
export function useLearning<K extends keyof Files>(name: K): Files[K] | null | 'error' {
  const [state, setState] = useState<Files[K] | null | 'error'>(null);
  useEffect(() => {
    let cancelled = false;
    loadLearning(name).then(
      (d) => !cancelled && setState(d),
      () => !cancelled && setState('error')
    );
    return () => {
      cancelled = true;
    };
  }, [name]);
  return state;
}

export const contentDeckKey = (id: string) => `c:${id}`;

import Dexie, { type EntityTable } from 'dexie';

import type { AttemptRow, CardRow, LearnStore, Snapshot } from './types';

export * from './types';

/*
 * Lưu tiến độ học trên máy người dùng (IndexedDB qua Dexie), không có tài khoản hay máy chủ.
 * Cấu trúc có version để sau này thêm bảng/cột mà không mất dữ liệu cũ: khi đổi, thêm
 * `this.version(2).stores({...}).upgrade(...)` chứ không sửa version(1).
 * IndexedDB bị chặn thì dùng bản trong bộ nhớ với cùng giao diện: ứng dụng vẫn chạy, chỉ không nhớ lâu.
 */
class LearnDB extends Dexie {
  cards!: EntityTable<CardRow, 'id'>;
  attempts!: EntityTable<AttemptRow, 'id'>;
  kv!: EntityTable<{ key: string; value: unknown }, 'key'>;
  constructor() {
    super('nguyento-learn');
    this.version(1).stores({
      cards: 'id, deck, due',
      attempts: '++id, mode, at',
      kv: 'key',
    });
  }
}

const snapshotOf = (
  cards: CardRow[],
  attempts: AttemptRow[],
  kv: Record<string, unknown>
): Snapshot => ({
  app: 'nguyento',
  version: 1,
  exportedAt: Date.now(),
  cards,
  attempts: attempts.map((a) => ({
    mode: a.mode,
    score: a.score,
    total: a.total,
    ms: a.ms,
    at: a.at,
  })),
  kv,
});

function dexieStore(db: LearnDB): LearnStore {
  return {
    persistent: true,
    allCards: () => db.cards.toArray(),
    putCards: async (rows) => {
      await db.cards.bulkPut(rows);
    },
    allAttempts: () => db.attempts.orderBy('at').toArray(),
    addAttempt: async (a) => {
      await db.attempts.add(a);
    },
    getKV: async <T>(key: string) => (await db.kv.get(key))?.value as T | undefined,
    setKV: async (key, value) => {
      await db.kv.put({ key, value });
    },
    exportAll: async () => {
      const kv = Object.fromEntries((await db.kv.toArray()).map((r) => [r.key, r.value]));
      return snapshotOf(await db.cards.toArray(), await db.attempts.toArray(), kv);
    },
    importAll: async (s) => {
      await db.transaction('rw', db.cards, db.attempts, db.kv, async () => {
        await Promise.all([db.cards.clear(), db.attempts.clear(), db.kv.clear()]);
        await db.cards.bulkPut(s.cards);
        await db.attempts.bulkAdd(s.attempts);
        await db.kv.bulkPut(Object.entries(s.kv).map(([key, value]) => ({ key, value })));
      });
    },
    clear: async () => {
      await Promise.all([db.cards.clear(), db.attempts.clear(), db.kv.clear()]);
    },
  };
}

function memoryStore(): LearnStore {
  let cards = new Map<string, CardRow>();
  let attempts: AttemptRow[] = [];
  let kv = new Map<string, unknown>();
  let seq = 1;
  return {
    persistent: false,
    allCards: async () => [...cards.values()],
    putCards: async (rows) => {
      for (const r of rows) cards.set(r.id, r);
    },
    allAttempts: async () => [...attempts],
    addAttempt: async (a) => {
      attempts.push({ ...a, id: seq++ });
    },
    getKV: async <T>(key: string) => kv.get(key) as T | undefined,
    setKV: async (key, value) => {
      kv.set(key, value);
    },
    exportAll: async () => snapshotOf([...cards.values()], attempts, Object.fromEntries(kv)),
    importAll: async (s) => {
      cards = new Map(s.cards.map((c) => [c.id, c]));
      attempts = s.attempts.map((a) => ({ ...a, id: seq++ }));
      kv = new Map(Object.entries(s.kv));
    },
    clear: async () => {
      cards = new Map();
      attempts = [];
      kv = new Map();
    },
  };
}

let opened: Promise<LearnStore> | null = null;

/** Mở kho lưu trữ (một lần cho cả trang). Luôn thành công: lỗi IndexedDB thì trả bản trong bộ nhớ. */
export function openStore(): Promise<LearnStore> {
  opened ??= (async () => {
    try {
      const db = new LearnDB();
      await db.open();
      return dexieStore(db);
    } catch {
      return memoryStore();
    }
  })();
  return opened;
}

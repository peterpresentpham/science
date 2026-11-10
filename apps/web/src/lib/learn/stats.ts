import type { AttemptRow, CardRow, LearnStore } from '@/lib/storage';

import { isLearned } from './srs';

/** Ngày theo giờ máy người dùng, dạng 2026-11-10 (khoá của chuỗi ngày học). */
export const dayKey = (t: number | Date = Date.now()) => {
  const d = new Date(t);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const DAY = 86_400_000;
const shiftDay = (key: string, days: number) => {
  const [y, m, d] = key.split('-').map(Number) as [number, number, number];
  return dayKey(new Date(y, m - 1, d + days).getTime());
};

export type Activity = Record<string, number>;
const MAX_DAYS = 400;

/** Ghi nhận hoạt động học (mỗi lần ôn thẻ hoặc làm quiz tính một lần) vào hôm nay. */
export async function recordActivity(store: LearnStore, reviews = 1) {
  const activity = (await store.getKV<Activity>('activity')) ?? {};
  const today = dayKey();
  activity[today] = (activity[today] ?? 0) + 1;
  const keys = Object.keys(activity).sort();
  for (const k of keys.slice(0, Math.max(0, keys.length - MAX_DAYS))) delete activity[k];
  await store.setKV('activity', activity);
  if (reviews > 0)
    await store.setKV('reviews', ((await store.getKV<number>('reviews')) ?? 0) + reviews);
}

/** Số ngày liên tiếp có học. Hôm nay chưa học mà hôm qua có thì chuỗi vẫn còn (chưa bị đứt). */
export function currentStreak(activity: Activity, now = Date.now()): number {
  let key = dayKey(now);
  if (!activity[key]) key = shiftDay(key, -1);
  let n = 0;
  while (activity[key]) {
    n++;
    key = shiftDay(key, -1);
  }
  return n;
}

export function bestStreak(activity: Activity): number {
  const days = Object.keys(activity)
    .filter((k) => activity[k])
    .sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const k of days) {
    run = prev && shiftDay(prev, 1) === k ? run + 1 : 1;
    best = Math.max(best, run);
    prev = k;
  }
  return best;
}

export interface LearnData {
  cards: CardRow[];
  attempts: AttemptRow[];
  activity: Activity;
  reviews: number;
}

export async function loadLearnData(store: LearnStore): Promise<LearnData> {
  const [cards, attempts, activity, reviews] = await Promise.all([
    store.allCards(),
    store.allAttempts(),
    store.getKV<Activity>('activity'),
    store.getKV<number>('reviews'),
  ]);
  return { cards, attempts, activity: activity ?? {}, reviews: reviews ?? 0 };
}

export const QUIZ_MODES = [
  'symbol',
  'number',
  'category',
  'group',
  'config',
  'compound',
  'balance',
  'sort',
] as const;
export type QuizMode = (typeof QUIZ_MODES)[number];
export const isQuizMode = (s: string): s is QuizMode =>
  (QUIZ_MODES as readonly string[]).includes(s);

export interface ModeRecord {
  plays: number;
  /** Lượt tốt nhất: nhiều điểm nhất, bằng điểm thì nhanh nhất */
  best: { score: number; total: number; ms: number } | null;
}

/** Kỷ lục cá nhân của từng chế độ quiz (lưu cục bộ, thay cho bảng xếp hạng chung). */
export function records(attempts: AttemptRow[]): Record<QuizMode, ModeRecord> {
  const out = Object.fromEntries(QUIZ_MODES.map((m) => [m, { plays: 0, best: null }])) as Record<
    QuizMode,
    ModeRecord
  >;
  for (const a of attempts) {
    if (!isQuizMode(a.mode)) continue;
    const r = out[a.mode];
    r.plays++;
    const b = r.best;
    const better =
      !b ||
      a.score / a.total > b.score / b.total ||
      (a.score / a.total === b.score / b.total && a.ms < b.ms);
    if (better) r.best = { score: a.score, total: a.total, ms: a.ms };
  }
  return out;
}

export interface Stats {
  reviews: number;
  learned: number;
  streak: number;
  best: number;
  attempts: number;
  perfect: number;
  modesPlayed: number;
  /** Mọi thẻ "ký hiệu" đều đã ở mức ôn tập */
  knowsAllSymbols: boolean;
}

export function computeStats(d: LearnData, now = Date.now()): Stats {
  const symbolCards = d.cards.filter((c) => c.deck === 'name2symbol' && isLearned(c));
  return {
    reviews: d.reviews,
    learned: d.cards.filter(isLearned).length,
    streak: currentStreak(d.activity, now),
    best: bestStreak(d.activity),
    attempts: d.attempts.length,
    perfect: d.attempts.filter((a) => a.score === a.total && a.total >= 5).length,
    modesPlayed: new Set(d.attempts.map((a) => a.mode)).size,
    knowsAllSymbols: symbolCards.length >= 118,
  };
}

/** Huy hiệu: tiêu đề và mô tả nằm ở messages `learn.badges.<id>`. */
export const BADGES: Array<{ id: string; test: (s: Stats) => boolean }> = [
  { id: 'firstReview', test: (s) => s.reviews >= 1 },
  { id: 'reviews100', test: (s) => s.reviews >= 100 },
  { id: 'reviews500', test: (s) => s.reviews >= 500 },
  { id: 'learned25', test: (s) => s.learned >= 25 },
  { id: 'learned100', test: (s) => s.learned >= 100 },
  { id: 'allSymbols', test: (s) => s.knowsAllSymbols },
  { id: 'streak3', test: (s) => s.best >= 3 },
  { id: 'streak7', test: (s) => s.best >= 7 },
  { id: 'streak30', test: (s) => s.best >= 30 },
  { id: 'firstQuiz', test: (s) => s.attempts >= 1 },
  { id: 'perfectQuiz', test: (s) => s.perfect >= 1 },
  { id: 'allModes', test: (s) => s.modesPlayed >= QUIZ_MODES.length },
];

export const earnedBadges = (s: Stats) => BADGES.filter((b) => b.test(s)).map((b) => b.id);
export { DAY };

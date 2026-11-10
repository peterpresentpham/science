'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { BY_Z } from '@/lib/elements';
import {
  type Deck,
  deckCards,
  DECKS,
  MAX_DUE_PER_SESSION,
  NEW_PER_SESSION,
  valenceElectrons,
} from '@/lib/learn/decks';
import { type Grade, GRADES, newRow, preview, review } from '@/lib/learn/srs';
import { recordActivity } from '@/lib/learn/stats';
import type { CardRow, LearnStore } from '@/lib/storage';

function when(due: number, now: number, locale: string) {
  const min = Math.max(1, Math.round((due - now) / 60000));
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'always', style: 'narrow' });
  if (min < 60) return rtf.format(min, 'minute');
  if (min < 1440) return rtf.format(Math.round(min / 60), 'hour');
  return rtf.format(Math.round(min / 1440), 'day');
}

/** Ôn thẻ bằng FSRS: hiện mặt trước, lật, tự chấm 4 mức; lịch ôn lưu trong IndexedDB. */
export function Flashcards({
  store,
  cards,
  onChange,
}: {
  store: LearnStore;
  cards: CardRow[];
  onChange: () => void;
}) {
  const t = useTranslations('learn');
  const tc = useTranslations();
  const locale = useLocale();
  const [deck, setDeck] = useState<Deck>('name2symbol');
  const [flipped, setFlipped] = useState(false);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [now] = useState(() => Date.now());

  const byId = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const queue = useMemo(() => {
    const all = deckCards(deck);
    const due = all
      .map((d) => byId.get(d.id))
      .filter((c): c is CardRow => !!c && c.due <= now + 60_000)
      .sort((a, b) => a.due - b.due)
      .slice(0, MAX_DUE_PER_SESSION);
    const fresh = all
      .filter((d) => !byId.has(d.id))
      .slice(0, NEW_PER_SESSION)
      .map((d) => newRow(d.id, deck, now));
    return [...due, ...fresh].filter((c) => !skipped.includes(c.id));
  }, [deck, byId, now, skipped]);

  const current = queue[0];
  const el = current ? BY_Z.get(Number(current.id.split(':')[1])) : undefined;
  const name = (z: number) => {
    const e = BY_Z.get(z);
    return e ? (locale === 'vi' ? e.name.vi : e.name.en) : '';
  };

  const grade = async (g: Grade) => {
    if (!current) return;
    await store.putCards([review(current, g)]);
    await recordActivity(store, 1);
    setFlipped(false);
    // Thẻ vừa chấm "Lại" quay về cuối hàng đợi của phiên này
    setSkipped((s) => [...s, current.id]);
    onChange();
  };

  const front = el && (
    <>
      {deck === 'symbol2name' ? (
        <span className="font-display text-6xl font-bold">{el.symbol}</span>
      ) : (
        <span className="font-display text-4xl font-semibold">{name(el.z)}</span>
      )}
      {(deck === 'category' || deck === 'group' || deck === 'period' || deck === 'valence') && (
        <span className="text-2xl text-muted">{el.symbol}</span>
      )}
    </>
  );
  const back =
    el &&
    {
      name2symbol: <span className="font-display text-6xl font-bold">{el.symbol}</span>,
      symbol2name: <span className="font-display text-4xl font-semibold">{name(el.z)}</span>,
      number: <span className="font-display text-6xl font-bold">{el.z}</span>,
      category: <span className="font-display text-3xl">{tc(`category.${el.category}`)}</span>,
      group: (
        <span className="font-display text-3xl">{t('flash.groupN', { n: el.group ?? 0 })}</span>
      ),
      period: <span className="font-display text-3xl">{t('flash.periodN', { n: el.period })}</span>,
      valence: (
        <span className="font-display text-3xl">
          {t('flash.valenceN', { n: valenceElectrons(el) ?? 0 })}
        </span>
      ),
    }[deck];

  const times = current ? preview(current, now) : null;
  const due = cards.filter((c) => c.deck === deck && c.due <= now).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('flash.deck')}>
        {DECKS.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={deck === d}
            onClick={() => {
              setDeck(d);
              setFlipped(false);
              setSkipped([]);
            }}
            className="rounded-full border border-border px-3.5 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
          >
            {t(`flash.decks.${d}`)}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted">{t('flash.queue', { due, fresh: queue.length })}</p>

      {current && el ? (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setFlipped(true)}
            aria-label={flipped ? t('flash.answer') : t('flash.reveal')}
            className="flex min-h-48 w-full flex-col items-center justify-center gap-2 rounded-3xl border border-border bg-surface p-6 shadow-card outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {front}
            {flipped ? (
              <>
                <span className="my-1 h-px w-16 bg-border" aria-hidden />
                <span aria-live="polite">{back}</span>
              </>
            ) : (
              <span className="text-sm text-muted">{t('flash.reveal')}</span>
            )}
          </button>
          {flipped && times && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {GRADES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => void grade(g)}
                  className="rounded-xl border border-border px-3 py-2.5 text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="block font-medium">{t(`flash.grade.${g}`)}</span>
                  <span className="tabular text-xs text-muted">{when(times[g], now, locale)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="rounded-2xl bg-surface-2 p-4 text-sm">{t('flash.done')}</p>
      )}
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useLearn } from '@/lib/learn/use-learn';

import { Flashcards } from './Flashcards';
import { Progress } from './Progress';
import { Quiz } from './Quiz';

const TABS = ['flash', 'quiz', 'progress'] as const;

/** Trang học: ba tab. Dữ liệu chỉ nằm trên máy người dùng (IndexedDB). */
export function LearnApp() {
  const t = useTranslations('learn');
  const { store, data, refresh } = useLearn();
  const [tab, setTab] = useState<(typeof TABS)[number]>('flash');

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label={t('title')} className="flex gap-1 border-b border-border">
        {TABS.map((k) => (
          <button
            key={k}
            role="tab"
            id={`tab-${k}`}
            aria-selected={tab === k}
            aria-controls={`panel-${k}`}
            type="button"
            onClick={() => setTab(k)}
            className="-mb-px border-b-2 border-transparent px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:border-fg aria-selected:font-semibold"
          >
            {t(`tabs.${k}`)}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {!store || !data ? (
          <p className="text-sm text-muted">{t('loading')}</p>
        ) : tab === 'flash' ? (
          <Flashcards store={store} cards={data.cards} onChange={refresh} />
        ) : tab === 'quiz' ? (
          <Quiz store={store} attempts={data.attempts} onChange={refresh} />
        ) : (
          <Progress store={store} data={data} onChange={refresh} />
        )}
      </div>
    </div>
  );
}

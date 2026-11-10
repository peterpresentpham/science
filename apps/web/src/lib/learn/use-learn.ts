'use client';

import { useCallback, useEffect, useState } from 'react';

import { type LearnStore, openStore } from '@/lib/storage';

import { type LearnData, loadLearnData } from './stats';

/** Kho tiến độ học + dữ liệu đã đọc; `refresh()` đọc lại sau khi ghi. */
export function useLearn() {
  const [store, setStore] = useState<LearnStore | null>(null);
  const [data, setData] = useState<LearnData | null>(null);
  const [rev, setRev] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void openStore().then((s) => {
      if (!cancelled) setStore(s);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!store) return;
    let cancelled = false;
    void loadLearnData(store).then((d) => {
      if (!cancelled) setData(d);
    });
    return () => {
      cancelled = true;
    };
  }, [store, rev]);

  const refresh = useCallback(() => setRev((r) => r + 1), []);
  return { store, data, refresh };
}

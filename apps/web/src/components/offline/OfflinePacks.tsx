'use client';

import { Check, CloudDownload, Trash2, WifiOff } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { cn, formatNumber } from '@/lib/format';
import {
  formatBytes,
  manifestUrl,
  type OfflineManifest,
  type OfflinePack,
  PACK_CACHE,
} from '@/lib/offline';

const CONCURRENCY = 6;

const subscribeOnline = (cb: () => void) => {
  window.addEventListener('online', cb);
  window.addEventListener('offline', cb);
  return () => {
    window.removeEventListener('online', cb);
    window.removeEventListener('offline', cb);
  };
};

interface Job {
  id: string;
  done: number;
  total: number;
  bytes: number;
  failed: number;
}

/** Trang quản lý gói offline: tải/xoá từng gói, xem dung lượng, biết trạng thái mạng. */
export function OfflinePacks() {
  const t = useTranslations('offline');
  const locale = useLocale();
  const online = useSyncExternalStore(
    subscribeOnline,
    () => navigator.onLine,
    () => true
  );
  const [manifest, setManifest] = useState<OfflineManifest | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'unsupported' | 'error'>('loading');
  const [have, setHave] = useState<Record<string, number>>({});
  const [job, setJob] = useState<Job | null>(null);
  const [swReady, setSwReady] = useState(false);
  const [storage, setStorage] = useState<{ used: number; quota: number } | null>(null);
  const cancel = useRef(false);

  const packs: OfflinePack[] = (manifest?.packs ?? []).filter(
    (p) => p.locale === null || p.locale === locale
  );

  /** Đếm số URL của từng gói đã nằm trong bất kỳ kho cache nào. */
  const refresh = useCallback(async (m: OfflineManifest) => {
    const cached = new Set<string>();
    for (const name of await caches.keys()) {
      for (const req of await (await caches.open(name)).keys())
        cached.add(new URL(req.url).pathname);
    }
    setHave(
      Object.fromEntries(m.packs.map((p) => [p.id, p.urls.filter((u) => cached.has(u)).length]))
    );
    if (navigator.storage?.estimate) {
      const { usage, quota } = await navigator.storage.estimate();
      setStorage({ used: usage ?? 0, quota: quota ?? 0 });
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!('caches' in window)) return !cancelled && setStatus('unsupported');
      try {
        const res = await fetch(manifestUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        const m = (await res.json()) as OfflineManifest;
        if (cancelled) return;
        setManifest(m);
        await refresh(m);
        if (!cancelled) setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();
    if ('serviceWorker' in navigator)
      navigator.serviceWorker.ready.then(() => !cancelled && setSwReady(true)).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const download = useCallback(
    async (pack: OfflinePack) => {
      if (!manifest) return;
      cancel.current = false;
      const cache = await caches.open(PACK_CACHE);
      const present = new Set((await cache.keys()).map((r) => new URL(r.url).pathname));
      const todo = pack.urls.filter((u) => !present.has(u));
      const state: Job = { id: pack.id, done: 0, total: todo.length, bytes: 0, failed: 0 };
      setJob({ ...state });
      let next = 0;
      const worker = async () => {
        while (next < todo.length && !cancel.current) {
          const url = todo[next++]!;
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(String(res.status));
            const buf = await res.arrayBuffer();
            await cache.put(url, new Response(buf, { headers: res.headers }));
            state.bytes += buf.byteLength;
          } catch {
            state.failed++;
          }
          state.done++;
          setJob({ ...state });
        }
      };
      await Promise.all(Array.from({ length: CONCURRENCY }, worker));
      setJob(null);
      // Xin trình duyệt đừng tự xoá khi thiếu dung lượng
      void navigator.storage?.persist?.();
      await refresh(manifest);
    },
    [manifest, refresh]
  );

  const remove = async (pack: OfflinePack) => {
    if (!manifest) return;
    const cache = await caches.open(PACK_CACHE);
    await Promise.all(pack.urls.map((u) => cache.delete(u)));
    await refresh(manifest);
  };

  const downloadAll = async () => {
    cancel.current = false;
    for (const p of packs) {
      if (cancel.current) break;
      if ((have[p.id] ?? 0) < p.urls.length) await download(p);
    }
  };

  if (status === 'unsupported') return <p className="text-sm text-muted">{t('unsupported')}</p>;
  if (status === 'error')
    return (
      <p className="text-sm text-muted" role="alert">
        {t('error')}
      </p>
    );
  if (status === 'loading') return <p className="text-sm text-muted">{t('loading')}</p>;

  const allDone = packs.every((p) => (have[p.id] ?? 0) >= p.urls.length);
  const missingBytes = packs.reduce(
    (n, p) => n + p.bytes * (1 - (have[p.id] ?? 0) / Math.max(p.urls.length, 1)),
    0
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1',
            online ? 'border-border' : 'border-[var(--danger)] text-[var(--danger)]'
          )}
        >
          {!online && <WifiOff className="size-3.5" aria-hidden />}
          {online ? t('online') : t('offlineNow')}
        </span>
        <span className="text-muted">{swReady ? t('swReady') : t('swWaiting')}</span>
      </div>

      <ul className="space-y-2">
        {packs.map((p) => {
          const n = have[p.id] ?? 0;
          const complete = n >= p.urls.length && p.urls.length > 0;
          const kind = p.id.split('-')[0]!;
          const title = t(`pack.${kind}.title`);
          return (
            <li
              key={p.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card"
            >
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="font-display font-semibold">{title}</p>
                <p className="text-xs text-muted">
                  {t(`pack.${kind}.desc`, { count: p.urls.length })} ·{' '}
                  {formatBytes(p.bytes, locale)}
                </p>
                {job?.id === p.id ? (
                  <div className="pt-1">
                    <div
                      className="h-1.5 overflow-hidden rounded-full bg-surface-2"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={job.total}
                      aria-valuenow={job.done}
                      aria-label={t('progressLabel')}
                    >
                      <div
                        className="h-full rounded-full bg-[var(--series-1)] transition-[width]"
                        style={{ width: `${(job.done / Math.max(job.total, 1)) * 100}%` }}
                      />
                    </div>
                    <p className="tabular mt-1 text-xs text-muted">
                      {t('progress', {
                        done: formatNumber(job.done, locale, 0),
                        total: formatNumber(job.total, locale, 0),
                        size: formatBytes(job.bytes, locale),
                      })}
                      {job.failed > 0 && ` · ${t('failed', { count: job.failed })}`}
                    </p>
                  </div>
                ) : (
                  n > 0 &&
                  !complete && (
                    <p className="tabular text-xs text-muted">
                      {t('partial', { have: formatNumber(n, locale, 0), total: p.urls.length })}
                    </p>
                  )
                )}
              </div>
              {job?.id === p.id ? (
                <button
                  type="button"
                  onClick={() => (cancel.current = true)}
                  className="rounded-xl border border-border px-3 py-2 text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t('cancel')}
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  {complete ? (
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <Check className="size-4" aria-hidden />
                      {t('downloaded')}
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={!online || job !== null || p.urls.length === 0}
                      onClick={() => void download(p)}
                      className="flex items-center gap-1.5 rounded-xl bg-fg px-3 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
                    >
                      <CloudDownload className="size-4" aria-hidden />
                      {n > 0 ? t('resume') : t('download')}
                    </button>
                  )}
                  {n > 0 && (
                    <button
                      type="button"
                      disabled={job !== null}
                      onClick={() => void remove(p)}
                      aria-label={t('remove', { name: title })}
                      className="rounded-xl border border-border p-2 outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
                    >
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center gap-3">
        {!allDone && (
          <button
            type="button"
            disabled={!online || job !== null}
            onClick={() => void downloadAll()}
            className="flex items-center gap-1.5 rounded-xl bg-fg px-4 py-2.5 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            <CloudDownload className="size-4" aria-hidden />
            {t('downloadAll', { size: formatBytes(missingBytes, locale) })}
          </button>
        )}
        {storage && storage.quota > 0 && (
          <p className="tabular text-xs text-muted">
            {t('storage', {
              used: formatBytes(storage.used, locale),
              quota: formatBytes(storage.quota, locale),
            })}
          </p>
        )}
      </div>
    </div>
  );
}

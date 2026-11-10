'use client';

import { Award, Download, Flame, Trash2, Upload } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { formatNumber } from '@/lib/format';
import { BADGES, computeStats, type LearnData } from '@/lib/learn/stats';
import { type LearnStore, Snapshot } from '@/lib/storage';

/** Chuỗi ngày, huy hiệu, xuất/nhập tiến độ (file JSON) và xoá dữ liệu. */
export function Progress({
  store,
  data,
  onChange,
}: {
  store: LearnStore;
  data: LearnData;
  onChange: () => void;
}) {
  const t = useTranslations('learn');
  const locale = useLocale();
  const stats = computeStats(data);
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const exportFile = async () => {
    const blob = new Blob([JSON.stringify(await store.exportAll())], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `nguyen-to-tien-do-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importFile = async (f: File) => {
    try {
      const parsed = Snapshot.safeParse(JSON.parse(await f.text()));
      if (!parsed.success) return setMsg(t('progress.importBad'));
      if (!window.confirm(t('progress.importConfirm'))) return;
      await store.importAll(parsed.data);
      setMsg(t('progress.importOk'));
      onChange();
    } catch {
      setMsg(t('progress.importBad'));
    }
  };

  const items = [
    ['streak', stats.streak],
    ['best', stats.best],
    ['learned', stats.learned],
    ['reviews', stats.reviews],
  ] as const;

  return (
    <div className="space-y-6">
      {!store.persistent && (
        <p className="rounded-2xl bg-surface-2 p-4 text-sm" role="status">
          {t('progress.noStorage')}
        </p>
      )}
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-border bg-surface p-4 shadow-card">
            <dt className="flex items-center gap-1.5 text-xs text-muted">
              {k === 'streak' && <Flame className="size-3.5" aria-hidden />}
              {t(`progress.stats.${k}`)}
            </dt>
            <dd className="tabular font-display text-3xl font-semibold">
              {formatNumber(v, locale, 0)}
            </dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="badges" className="space-y-3">
        <h2 id="badges" className="font-display text-xl font-semibold">
          {t('progress.badges')}
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {BADGES.map((b) => {
            const got = b.test(stats);
            return (
              <li
                key={b.id}
                className={`flex items-start gap-3 rounded-2xl border p-3 ${got ? 'border-fg bg-surface' : 'border-border opacity-60'}`}
              >
                <Award className="mt-0.5 size-5 shrink-0" aria-hidden />
                <div>
                  <p className="text-sm font-medium">
                    {t(`badges.${b.id}.title`)}
                    <span className="sr-only">
                      {' '}
                      ({got ? t('progress.earned') : t('progress.locked')})
                    </span>
                  </p>
                  <p className="text-xs text-muted">{t(`badges.${b.id}.desc`)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="backup" className="space-y-3">
        <h2 id="backup" className="font-display text-xl font-semibold">
          {t('progress.backup')}
        </h2>
        <p className="text-sm text-muted">{t('progress.backupHint')}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void exportFile()}
            className="flex items-center gap-1.5 rounded-xl bg-fg px-3 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="size-4" aria-hidden />
            {t('progress.export')}
          </button>
          <button
            type="button"
            onClick={() => file.current?.click()}
            className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Upload className="size-4" aria-hidden />
            {t('progress.import')}
          </button>
          <button
            type="button"
            onClick={async () => {
              if (!window.confirm(t('progress.clearConfirm'))) return;
              await store.clear();
              onChange();
            }}
            className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Trash2 className="size-4" aria-hidden />
            {t('progress.clear')}
          </button>
          <input
            ref={file}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void importFile(f);
              e.target.value = '';
            }}
          />
        </div>
        {msg && (
          <p className="text-sm" role="status">
            {msg}
          </p>
        )}
      </section>
    </div>
  );
}

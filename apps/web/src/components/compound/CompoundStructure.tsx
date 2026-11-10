'use client';

import type { CompoundCrystal } from '@chem/data';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { StructureViewer } from '@/components/structure/StructureViewer';
import { cn } from '@/lib/format';

/** Hợp chất ion có mạng tinh thể: cho chọn giữa mạng tinh thể và cấu trúc PubChem. */
export function CompoundStructure({
  sdfUrl,
  dim,
  crystal,
  name,
}: {
  sdfUrl: string;
  dim: 2 | 3;
  crystal: CompoundCrystal | null;
  name: string;
}) {
  const t = useTranslations('structure');
  const [view, setView] = useState<'crystal' | 'pubchem'>(crystal ? 'crystal' : 'pubchem');
  return (
    <div className="space-y-3">
      {crystal && (
        <div className="flex flex-wrap gap-1.5" role="tablist">
          {(['crystal', 'pubchem'] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm',
                view === v ? 'border-fg bg-fg text-bg' : 'border-border hover:border-fg/40'
              )}
            >
              {v === 'crystal' ? t('compound.crystalTab') : t(`compound.pubchemTab${dim}`)}
            </button>
          ))}
        </div>
      )}
      {view === 'crystal' && crystal ? (
        <StructureViewer
          key="crystal"
          source={{
            kind: 'crystal',
            spec: { lattice: crystal.lattice, a: crystal.a, c: crystal.c },
            symbols: crystal.sites,
          }}
          label={t('viewerLabel', { name })}
        />
      ) : (
        <StructureViewer
          key="pubchem"
          source={{ kind: 'sdf', url: sdfUrl, flat: dim === 2 }}
          label={t('viewerLabel', { name })}
        />
      )}
    </div>
  );
}

'use client';

import {
  angle,
  buildCrystal,
  type CrystalSpec,
  crystalToXYZ,
  distance,
  type Molecule,
  parseSDF,
  vsepr,
} from '@chem/core';
import { Pause, Play, Ruler, Tags, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { cn, formatNumber } from '@/lib/format';

import type { MolStyle } from './Mol3D';

const Mol3D = dynamic(() => import('./Mol3D'), {
  ssr: false,
  loading: () => <Loading />,
});

function Loading() {
  const t = useTranslations('structure');
  return (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
      {t('loading')}
    </div>
  );
}

export type StructureSource =
  | { kind: 'sdf'; url: string; flat?: boolean }
  | { kind: 'sdfText'; text: string }
  | { kind: 'crystal'; spec: CrystalSpec; symbols: string[] };

/** Tải SDF một lần cho mỗi URL */
const sdfCache = new Map<string, Promise<string>>();
const loadSdf = (url: string) => {
  let p = sdfCache.get(url);
  if (!p) {
    p = fetch(url).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.text();
    });
    sdfCache.set(url, p);
  }
  return p;
};

/**
 * Trình xem cấu trúc 3D: phân tử (SDF) hoặc mạng tinh thể (dựng tại chỗ).
 * Có chọn kiểu hiển thị, nhãn nguyên tử, tự xoay, đo khoảng cách/góc (bấm 2–3 nguyên tử),
 * VSEPR cho phân tử và siêu ô 1×1×1 → 3×3×3 cho tinh thể.
 */
export function StructureViewer({ source, label }: { source: StructureSource; label: string }) {
  const t = useTranslations('structure');
  const locale = useLocale();
  const [sdf, setSdf] = useState<
    { url: string; text: string } | { url: string; error: true } | null
  >(null);
  const [n, setN] = useState(1);
  const isCrystal = source.kind === 'crystal';
  const [style, setStyle] = useState<MolStyle>('ballStick');
  const [labels, setLabels] = useState(false);
  const [spin, setSpin] = useState(false);
  const [measure, setMeasure] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const url = source.kind === 'sdf' ? source.url : null;
  useEffect(() => {
    if (!url) return;
    let alive = true;
    loadSdf(url).then(
      (text) => alive && setSdf({ url, text }),
      () => alive && setSdf({ url, error: true })
    );
    return () => {
      alive = false;
    };
  }, [url]);

  const crystal = useMemo(
    () => (source.kind === 'crystal' ? buildCrystal(source.spec, n) : null),
    [source, n]
  );

  // Dữ liệu cho lớp 3D + toạ độ để đo
  const model = useMemo((): {
    data: string;
    format: 'sdf' | 'xyz';
    mol: Molecule | null;
  } | null => {
    if (source.kind === 'crystal' && crystal) {
      const data = crystalToXYZ(crystal, source.symbols);
      return {
        data,
        format: 'xyz',
        mol: {
          atoms: crystal.atoms.map((a) => ({
            el: source.symbols[a.site] ?? '',
            pos: a.pos,
            charge: 0,
          })),
          bonds: [],
          flat: false,
        },
      };
    }
    if (source.kind === 'sdfText') {
      const r = parseSDF(source.text);
      return { data: source.text, format: 'sdf', mol: r.ok ? r.value : null };
    }
    if (sdf && 'text' in sdf && sdf.url === url) {
      const r = parseSDF(sdf.text);
      return { data: sdf.text, format: 'sdf', mol: r.ok ? r.value : null };
    }
    return null;
  }, [source, crystal, sdf, url]);

  const centers = useMemo(
    () => (model?.mol && !isCrystal ? vsepr(model.mol) : []),
    [model, isCrystal]
  );
  const atoms = model?.mol?.atoms ?? [];
  const sel = selected.filter((i) => atoms[i]);
  const measurement =
    sel.length === 2
      ? t('measure.distance', {
          a: atoms[sel[0]!]!.el,
          b: atoms[sel[1]!]!.el,
          value: formatNumber(distance(atoms[sel[0]!]!.pos, atoms[sel[1]!]!.pos), locale, 3),
        })
      : sel.length === 3
        ? t('measure.angle', {
            a: atoms[sel[0]!]!.el,
            b: atoms[sel[1]!]!.el,
            c: atoms[sel[2]!]!.el,
            value: formatNumber(
              angle(atoms[sel[0]!]!.pos, atoms[sel[1]!]!.pos, atoms[sel[2]!]!.pos),
              locale,
              1
            ),
          })
        : null;

  const onPick = (i: number) => {
    if (!measure) return;
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i].slice(-3)));
  };

  const styles: MolStyle[] = isCrystal
    ? ['ballStick', 'sphere']
    : ['ballStick', 'stick', 'sphere', 'line'];
  const btn = (on: boolean) =>
    cn(
      'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs',
      on ? 'border-fg bg-fg text-bg' : 'border-border hover:border-fg/40'
    );
  const flat = model?.mol?.flat ?? (source.kind === 'sdf' && source.flat);
  const error = sdf && 'error' in sdf && sdf.url === url;

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-bg">
        {error ? (
          <p className="absolute inset-0 flex items-center justify-center p-4 text-sm text-muted">
            {t('error')}
          </p>
        ) : model ? (
          <Mol3D
            data={model.data}
            format={model.format}
            style={style}
            selected={sel}
            edges={crystal?.edges}
            labels={labels}
            spin={spin}
            label={label}
            onPick={onPick}
          />
        ) : (
          <Loading />
        )}
        {measurement && (
          <p
            role="status"
            className="absolute top-2 left-2 rounded-lg border border-border bg-surface/90 px-2 py-1 font-mono text-xs shadow-card"
          >
            {measurement}
          </p>
        )}
      </div>

      <div
        className="flex flex-wrap items-center gap-1.5"
        role="toolbar"
        aria-label={t('controls')}
      >
        {styles.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={style === s}
            onClick={() => setStyle(s)}
            className={btn(style === s)}
          >
            {t(`style.${s}`)}
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-border" aria-hidden />
        <button
          type="button"
          aria-pressed={labels}
          onClick={() => setLabels((v) => !v)}
          className={btn(labels)}
        >
          <Tags className="size-3.5" aria-hidden /> {t('labels')}
        </button>
        <button
          type="button"
          aria-pressed={spin}
          onClick={() => setSpin((v) => !v)}
          className={btn(spin)}
        >
          {spin ? (
            <Pause className="size-3.5" aria-hidden />
          ) : (
            <Play className="size-3.5" aria-hidden />
          )}
          {t('spin')}
        </button>
        <button
          type="button"
          aria-pressed={measure}
          onClick={() => {
            setMeasure((v) => !v);
            setSelected([]);
          }}
          className={btn(measure)}
        >
          <Ruler className="size-3.5" aria-hidden /> {t('measure.toggle')}
        </button>
        {sel.length > 0 && (
          <button type="button" onClick={() => setSelected([])} className={btn(false)}>
            <X className="size-3.5" aria-hidden /> {t('measure.clear')}
          </button>
        )}
        {isCrystal && source.spec.lattice !== 'icosahedron' && (
          <>
            <span className="mx-1 h-4 w-px bg-border" aria-hidden />
            {[1, 2, 3].map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={n === k}
                onClick={() => {
                  setN(k);
                  setSelected([]);
                }}
                className={btn(n === k)}
                aria-label={t('supercell', { n: k })}
              >
                {k}×{k}×{k}
              </button>
            ))}
          </>
        )}
      </div>

      {measure && !measurement && <p className="text-xs text-muted">{t('measure.hint')}</p>}
      {flat && !isCrystal && <p className="text-xs text-muted">{t('flat')}</p>}

      {crystal && source.kind === 'crystal' && (
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs text-muted">{t('crystal.lattice')}</dt>
            <dd className="font-medium">{t(`lattice.${source.spec.lattice}`)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t('crystal.constant')}</dt>
            <dd className="tabular font-mono">
              a = {formatNumber(source.spec.a, locale, 3)} Å
              {source.spec.c ? `, c = ${formatNumber(source.spec.c, locale, 3)} Å` : ''}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t('crystal.coordination')}</dt>
            <dd className="tabular font-mono">{crystal.coordination}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t('crystal.nearest')}</dt>
            <dd className="tabular font-mono">{formatNumber(crystal.nearest, locale, 3)} Å</dd>
          </div>
        </dl>
      )}

      {centers.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-muted">{t('vsepr.title')}</p>
          <ul className="flex flex-wrap gap-2">
            {centers.slice(0, 4).map((c) => (
              <li key={c.atom} className="rounded-xl border border-border px-3 py-1.5 text-sm">
                <span className="font-semibold">{c.el}</span>{' '}
                <span className="font-mono">
                  {c.notation.replace(/(\d)/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)]!)}
                </span>
                {' · '}
                {t(`vsepr.geometry.${c.geometry}`)}
                {c.measuredAngle != null && (
                  <span className="tabular text-muted">
                    {' '}
                    · {formatNumber(c.measuredAngle, locale, 1)}°
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">{t('vsepr.note')}</p>
        </div>
      )}
    </div>
  );
}

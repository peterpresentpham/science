'use client';

import { molarMass, parseFormula } from '@chem/core';
import type { MainModule } from '@rdkit/rdkit';
import { Copy, Download, Eraser, Move, Redo2, Sparkles, Trash2, Undo2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';

import { FormulaText } from '@/components/tools/FormulaText';
import { useRouter } from '@/i18n/navigation';
import {
  addRing,
  attachGroup,
  type BAtom,
  type BBond,
  BOND_PX,
  bondBetween,
  chargeText,
  countFromMolblock,
  EXAMPLES,
  fromMolblock,
  type GroupId,
  GROUPS,
  hillFormula,
  type Mol2D,
  netCharge,
  nextId,
  PALETTE,
  toMolblock,
  toSvg,
} from '@/lib/builder/molecule';
import { cn, formatNumber } from '@/lib/format';
import { MASSES } from '@/lib/masses';
import { findCidBySmiles } from '@/lib/pubchem';
import { loadRDKit } from '@/lib/rdkit';

const W = 640;
const H = 420;
const MAX_ATOMS = 60;
type Tool = 'atom' | 'bond' | 'charge' | 'move' | 'erase';

interface Analysis {
  smiles: string;
  formula: string;
  atoms: number;
  bonds: number;
}

/** Thêm điện tích tổng vào công thức: C2H5O^-, H4N^+, SO4^2- */
const withCharge = (f: string, c: number) =>
  c === 0 ? f : `${f}^${Math.abs(c) > 1 ? Math.abs(c) : ''}${c > 0 ? '+' : '-'}`;

/** Nhờ RDKit kiểm hoá trị rồi lấy SMILES, công thức (đã tính cả H ngầm định). null nếu hoá trị sai. */
function analyze(rd: MainModule, m: Mol2D): Analysis | null {
  const mol = rd.get_mol(toMolblock(m));
  if (!mol) return null;
  try {
    if (!mol.is_valid()) return null;
    return {
      smiles: mol.get_smiles(),
      formula: withCharge(hillFormula(countFromMolblock(mol.add_hs())), netCharge(m)),
      atoms: m.atoms.length,
      bonds: m.bonds.length,
    };
  } finally {
    mol.delete();
  }
}

/** Dựng phân tử 2D: vẽ nguyên tử, liên kết; RDKit (WASM) kiểm hoá trị, cho SMILES, công thức, khối lượng mol. */
export function MoleculeBuilder() {
  const t = useTranslations('builder');
  const locale = useLocale();
  const svg = useRef<SVGSVGElement>(null);
  const [mol, setMol] = useState<Mol2D>({ atoms: [], bonds: [] });
  const [past, setPast] = useState<Mol2D[]>([]);
  const [future, setFuture] = useState<Mol2D[]>([]);
  const [tool, setTool] = useState<Tool>('atom');
  const [el, setEl] = useState<string>('C');
  const [order, setOrder] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const [rd, setRd] = useState<MainModule | null>(null);
  const [rdState, setRdState] = useState<'loading' | 'error'>('loading');
  const [smilesInput, setSmilesInput] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [chargeDelta, setChargeDelta] = useState<1 | -1>(1);
  const [pubchem, setPubchem] = useState<'idle' | 'busy' | 'none' | 'error'>('idle');
  const router = useRouter();

  const load = () => {
    loadRDKit().then(setRd, () => setRdState('error'));
  };
  // Tải RDKit ngay khi vào trang (một lần); nút "Thử lại" gọi lại khi lỗi
  useEffect(() => {
    load();
  }, []);

  const analysis = useMemo(() => (rd && mol.atoms.length > 0 ? analyze(rd, mol) : null), [rd, mol]);
  const invalid = rd && mol.atoms.length > 0 && !analysis;
  const parsed = analysis ? parseFormula(analysis.formula) : null;
  const mass = parsed?.ok ? molarMass(parsed.value, MASSES) : null;

  const commit = (next: Mol2D) => {
    setPast((p) => [...p.slice(-49), mol]);
    setFuture([]);
    setMol(next);
    setMsg(null);
  };
  const undo = () => {
    const prev = past.at(-1);
    if (!prev) return;
    setFuture((f) => [mol, ...f]);
    setPast((p) => p.slice(0, -1));
    setMol(prev);
    setSelected(null);
  };
  const redo = () => {
    const nxt = future[0];
    if (!nxt) return;
    setPast((p) => [...p, mol]);
    setFuture((f) => f.slice(1));
    setMol(nxt);
    setSelected(null);
  };

  const point = (e: { clientX: number; clientY: number }) => {
    const r = svg.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };
  const byId = (id: number) => mol.atoms.find((a) => a.id === id)!;

  const addAtom = (x: number, y: number, bondTo: number | null) => {
    if (mol.atoms.length >= MAX_ATOMS) return setMsg(t('tooMany', { n: MAX_ATOMS }));
    const id = nextId(mol);
    let px = x;
    let py = y;
    const bonds = [...mol.bonds];
    if (bondTo !== null) {
      // Nguyên tử mới nằm đúng một độ dài liên kết tính từ nguyên tử đang chọn, theo hướng con trỏ
      const from = byId(bondTo);
      const dx = x - from.x;
      const dy = y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      px = from.x + (dx / len) * BOND_PX;
      py = from.y + (dy / len) * BOND_PX;
      bonds.push({ a: bondTo, b: id, order });
    }
    commit({ atoms: [...mol.atoms, { id, el, x: px, y: py }], bonds });
    if (tool === 'bond') setSelected(id);
  };

  const onBackground = (e: React.PointerEvent) => {
    if (drag !== null) return;
    const { x, y } = point(e);
    if (tool === 'atom') addAtom(x, y, null);
    else if (tool === 'bond') addAtom(x, y, selected);
    else setSelected(null);
  };

  const onAtom = (a: BAtom) => {
    if (tool === 'atom') {
      if (a.el !== el)
        commit({ ...mol, atoms: mol.atoms.map((k) => (k.id === a.id ? { ...k, el } : k)) });
    } else if (tool === 'charge') {
      const c = Math.max(-2, Math.min(2, (a.charge ?? 0) + chargeDelta));
      commit({ ...mol, atoms: mol.atoms.map((k) => (k.id === a.id ? { ...k, charge: c } : k)) });
    } else if (tool === 'erase') {
      commit({
        atoms: mol.atoms.filter((k) => k.id !== a.id),
        bonds: mol.bonds.filter((b) => b.a !== a.id && b.b !== a.id),
      });
      setSelected(null);
    } else if (tool === 'bond') {
      if (selected === null || selected === a.id) setSelected(selected === a.id ? null : a.id);
      else {
        const old = bondBetween(mol, selected, a.id);
        const bonds: BBond[] = old
          ? mol.bonds.map((b) =>
              b === old ? { ...b, order: ((b.order % 3) + 1) as 1 | 2 | 3 } : b
            )
          : [...mol.bonds, { a: selected, b: a.id, order }];
        commit({ ...mol, bonds });
        setSelected(a.id);
      }
    }
  };

  const onBond = (b: BBond) => {
    if (tool === 'erase') commit({ ...mol, bonds: mol.bonds.filter((k) => k !== b) });
    else if (tool === 'bond')
      commit({
        ...mol,
        bonds: mol.bonds.map((k) =>
          k === b ? { ...k, order: ((k.order % 3) + 1) as 1 | 2 | 3 } : k
        ),
      });
  };

  const fromSmiles = (smiles: string) => {
    if (!rd) return;
    const m = rd.get_mol(smiles.trim());
    if (!m) return setMsg(t('badSmiles'));
    try {
      if (m.get_num_atoms(true) > MAX_ATOMS) return setMsg(t('tooMany', { n: MAX_ATOMS }));
      m.set_new_coords();
      m.convert_to_kekule_form();
      commit(fromMolblock(m.get_molblock()));
      setSelected(null);
    } finally {
      m.delete();
    }
  };

  const tidy = () => {
    if (!rd || mol.atoms.length === 0) return;
    const m = rd.get_mol(toMolblock(mol));
    if (!m) return setMsg(t('cannotTidy'));
    try {
      m.set_new_coords();
      commit(fromMolblock(m.get_molblock()));
    } finally {
      m.delete();
    }
  };

  const copySmiles = async () => {
    if (!analysis) return;
    try {
      await navigator.clipboard.writeText(analysis.smiles);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* trình duyệt chặn clipboard: người dùng tự chọn chữ */
    }
  };

  const download = (blob: Blob, name: string) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const exportSvg = () => {
    if (mol.atoms.length === 0) return;
    download(new Blob([toSvg(mol).svg], { type: 'image/svg+xml' }), 'phan-tu.svg');
  };
  const exportPng = () => {
    if (mol.atoms.length === 0) return;
    const { svg, width, height } = toSvg(mol);
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const img = new Image();
    img.onload = () => {
      const k = 2;
      const c = document.createElement('canvas');
      c.width = Math.round(width * k);
      c.height = Math.round(height * k);
      c.getContext('2d')?.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((b) => b && download(b, 'phan-tu.png'), 'image/png');
    };
    img.src = url;
  };

  const open3d = async () => {
    if (!analysis) return;
    setPubchem('busy');
    try {
      const cid = await findCidBySmiles(analysis.smiles);
      if (!cid) return setPubchem('none');
      router.push(`/compound/view?cid=${cid}`);
    } catch {
      setPubchem('error');
    }
  };

  const tools: Array<[Tool, string]> = [
    ['atom', t('tools.atom')],
    ['bond', t('tools.bond')],
    ['charge', t('tools.charge')],
    ['move', t('tools.move')],
    ['erase', t('tools.erase')],
  ];

  const drawBond = (b: BBond, k: number) => {
    const A = byId(b.a);
    const B = byId(b.b);
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const trim = (a: BAtom) => (a.el === 'C' ? 0 : 10);
    const x1 = A.x + ux * trim(A);
    const y1 = A.y + uy * trim(A);
    const x2 = B.x - ux * trim(B);
    const y2 = B.y - uy * trim(B);
    const nx = -uy;
    const ny = ux;
    const offsets = b.order === 1 ? [0] : b.order === 2 ? [-2.5, 2.5] : [-4, 0, 4];
    return (
      <g
        key={k}
        onPointerDown={(e) => {
          e.stopPropagation();
          onBond(b);
        }}
        className={tool === 'erase' || tool === 'bond' ? 'cursor-pointer' : ''}
      >
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="transparent" strokeWidth={14} />
        {offsets.map((o) => (
          <line
            key={o}
            x1={x1 + nx * o}
            y1={y1 + ny * o}
            x2={x2 + nx * o}
            y2={y2 + ny * o}
            stroke="var(--fg)"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        ))}
      </g>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label={t('toolbar')}>
        <div className="flex max-w-full flex-wrap gap-1" role="group" aria-label={t('tool')}>
          {tools.map(([k, label]) => (
            <button
              key={k}
              type="button"
              aria-pressed={tool === k}
              onClick={() => {
                setTool(k);
                setSelected(null);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
            >
              {k === 'move' && <Move className="size-3.5" aria-hidden />}
              {k === 'erase' && <Eraser className="size-3.5" aria-hidden />}
              {label}
            </button>
          ))}
        </div>
        <div className="flex max-w-full flex-wrap gap-1" role="group" aria-label={t('element')}>
          {PALETTE.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={el === s}
              aria-label={s}
              onClick={() => {
                setEl(s);
                if (tool !== 'bond') setTool('atom');
              }}
              className="size-9 rounded-lg border border-border font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-fg aria-pressed:bg-surface-2 aria-pressed:font-bold"
            >
              {s}
            </button>
          ))}
        </div>
        {tool === 'charge' && (
          <div
            className="flex max-w-full flex-wrap gap-1"
            role="group"
            aria-label={t('chargeDirection')}
          >
            {([1, -1] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={chargeDelta === d}
                aria-label={d > 0 ? t('chargePlus') : t('chargeMinus')}
                onClick={() => setChargeDelta(d)}
                className="w-9 rounded-lg border border-border py-1.5 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-fg aria-pressed:bg-surface-2 aria-pressed:font-bold"
              >
                {d > 0 ? '+' : '\u2212'}
              </button>
            ))}
          </div>
        )}
        <div className="flex max-w-full flex-wrap gap-1" role="group" aria-label={t('order')}>
          {([1, 2, 3] as const).map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={order === o}
              aria-label={t(`orders.${o}`)}
              onClick={() => {
                setOrder(o);
                setTool('bond');
              }}
              className="w-9 rounded-lg border border-border py-1.5 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-fg aria-pressed:bg-surface-2 aria-pressed:font-bold"
            >
              {['—', '═', '≡'][o - 1]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        <svg
          ref={svg}
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full touch-none select-none"
          style={{ aspectRatio: `${W} / ${H}`, cursor: tool === 'move' ? 'grab' : 'crosshair' }}
          role="group"
          aria-label={t('canvas')}
          onPointerDown={onBackground}
          onPointerMove={(e) => {
            if (drag === null) return;
            const { x, y } = point(e);
            setMol((m) => ({
              ...m,
              atoms: m.atoms.map((a) => (a.id === drag ? { ...a, x, y } : a)),
            }));
          }}
          onPointerUp={() => setDrag(null)}
          onPointerLeave={() => setDrag(null)}
        >
          {mol.atoms.length === 0 && (
            <text x={W / 2} y={H / 2} textAnchor="middle" className="fill-muted text-[15px]">
              {t('empty')}
            </text>
          )}
          {mol.bonds.map(drawBond)}
          {mol.atoms.map((a) => {
            const labeled = a.el !== 'C' || !!a.charge;
            const sel = selected === a.id;
            return (
              <g
                key={a.id}
                role="button"
                tabIndex={0}
                aria-label={`${t('atomLabel', { el: a.el })}${a.charge ? ` ${chargeText(a.charge)}` : ''}`}
                aria-pressed={tool === 'bond' ? sel : undefined}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  if (tool === 'move') {
                    svg.current?.setPointerCapture(e.pointerId);
                    setPast((p) => [...p.slice(-49), mol]);
                    setFuture([]);
                    setDrag(a.id);
                  } else onAtom(a);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onAtom(a);
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-[var(--ring)]"
              >
                <circle
                  cx={a.x}
                  cy={a.y}
                  r={labeled ? 12 : 9}
                  fill={sel ? 'var(--surface-2)' : 'var(--surface)'}
                  fillOpacity={labeled || sel ? 1 : 0.01}
                  stroke={sel ? 'var(--fg)' : 'transparent'}
                  strokeWidth={2}
                />
                {labeled && (
                  <text
                    x={a.x}
                    y={a.y + 5}
                    textAnchor="middle"
                    className="fill-fg font-mono text-[15px] font-bold"
                  >
                    {a.el}
                  </text>
                )}
                {!!a.charge && (
                  <text
                    x={a.x + 9}
                    y={a.y - 6}
                    className="fill-fg font-mono text-[11px]"
                    aria-hidden
                  >
                    {chargeText(a.charge)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={undo}
          disabled={past.length === 0}
          className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
        >
          <Undo2 className="size-3.5" aria-hidden />
          {t('undo')}
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={future.length === 0}
          className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
        >
          <Redo2 className="size-3.5" aria-hidden />
          {t('redo')}
        </button>
        <button
          type="button"
          onClick={tidy}
          disabled={!rd || mol.atoms.length === 0}
          className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
        >
          <Sparkles className="size-3.5" aria-hidden />
          {t('tidy')}
        </button>
        <button
          type="button"
          onClick={() => {
            commit({ atoms: [], bonds: [] });
            setSelected(null);
          }}
          disabled={mol.atoms.length === 0}
          className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
        >
          <Trash2 className="size-3.5" aria-hidden />
          {t('clear')}
        </button>
        <p className="text-xs text-muted">{t(`hint.${tool}`)}</p>
      </div>

      {msg && (
        <p className="text-sm" role="status">
          {msg}
        </p>
      )}

      <section
        aria-labelledby="builder-result"
        className="space-y-3 rounded-2xl border border-border bg-surface p-4 shadow-card"
      >
        <h2 id="builder-result" className="font-display text-lg font-semibold">
          {t('result')}
        </h2>
        {rdState === 'error' ? (
          <p className="text-sm" role="alert">
            {t('rdkitError')}{' '}
            <button
              type="button"
              onClick={() => {
                setRdState('loading');
                load();
              }}
              className="underline underline-offset-2"
            >
              {t('retry')}
            </button>
          </p>
        ) : !rd ? (
          <p className="text-sm text-muted">{t('rdkitLoading')}</p>
        ) : mol.atoms.length === 0 ? (
          <p className="text-sm text-muted">{t('resultEmpty')}</p>
        ) : invalid ? (
          <p className="text-sm" role="alert">
            {t('invalid')}
          </p>
        ) : (
          analysis && (
            <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted">{t('formula')}</dt>
                <dd className="font-display text-2xl font-semibold">
                  {parsed?.ok ? <FormulaText tokens={parsed.value.display} /> : analysis.formula}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{t('mass')}</dt>
                <dd className="tabular font-display text-2xl font-semibold">
                  {mass === null ? '—' : `${formatNumber(mass, locale, 3)} g/mol`}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted">SMILES</dt>
                <dd className="flex items-center gap-2">
                  <code
                    className={cn(
                      'min-w-0 flex-1 rounded-lg bg-surface-2 px-3 py-2 font-mono break-all'
                    )}
                  >
                    {analysis.smiles}
                  </code>
                  <button
                    type="button"
                    onClick={() => void copySmiles()}
                    className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Copy className="size-3.5" aria-hidden />
                    {copied ? t('copied') : t('copy')}
                  </button>
                </dd>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
                <button
                  type="button"
                  onClick={exportSvg}
                  className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Download className="size-3.5" aria-hidden />
                  SVG
                </button>
                <button
                  type="button"
                  onClick={exportPng}
                  className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Download className="size-3.5" aria-hidden />
                  PNG
                </button>
                <button
                  type="button"
                  disabled={pubchem === 'busy' || !navigator.onLine}
                  onClick={() => void open3d()}
                  className="rounded-xl border border-border px-3 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
                >
                  {pubchem === 'busy' ? t('lookingUp') : t('view3d')}
                </button>
                {pubchem === 'none' && (
                  <span className="text-xs" role="status">
                    {t('notOnPubchem')}
                  </span>
                )}
                {pubchem === 'error' && (
                  <span className="text-xs" role="alert">
                    {t('pubchemError')}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted sm:col-span-2">
                {t('counts', { atoms: analysis.atoms, bonds: analysis.bonds })} {t('view3dHint')}
              </p>
            </dl>
          )
        )}
      </section>

      <section aria-labelledby="builder-templates" className="space-y-3">
        <h2 id="builder-templates" className="font-display text-lg font-semibold">
          {t('templates')}
        </h2>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['benzene', 6, true],
              ['cyclohexane', 6, false],
              ['cyclopentane', 5, false],
            ] as const
          ).map(([id, n, arom]) => (
            <button
              key={id}
              type="button"
              onClick={() => commit(addRing(mol, n, arom))}
              className="rounded-full border border-border px-3 py-1 text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t(`rings.${id}`)}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">{t('groupsHint')}</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(GROUPS) as GroupId[]).map((g) => (
            <button
              key={g}
              type="button"
              disabled={selected === null}
              onClick={() => {
                if (selected !== null) commit(attachGroup(mol, selected, g));
              }}
              className="rounded-full border border-border px-3 py-1 text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
            >
              {t(`groups.${g}`)}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="builder-smiles" className="space-y-3">
        <h2 id="builder-smiles" className="font-display text-lg font-semibold">
          {t('fromSmiles')}
        </h2>
        <p className="text-sm text-muted">{t('fromSmilesHint')}</p>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (smilesInput.trim()) fromSmiles(smilesInput);
          }}
        >
          <label className="sr-only" htmlFor="smiles-in">
            SMILES
          </label>
          <input
            id="smiles-in"
            value={smilesInput}
            onChange={(e) => setSmilesInput(e.target.value)}
            placeholder="CC(=O)O"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 py-2 font-mono outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            disabled={!rd || !smilesInput.trim()}
            className="rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            {t('draw')}
          </button>
        </form>
        <ul className="flex flex-wrap gap-2">
          {EXAMPLES.map((x) => (
            <li key={x.id}>
              <button
                type="button"
                disabled={!rd}
                onClick={() => {
                  setSmilesInput(x.smiles);
                  fromSmiles(x.smiles);
                }}
                className="rounded-full border border-border px-3 py-1 text-sm outline-none hover:border-fg/40 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
              >
                {t(`examples.${x.id}`)}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

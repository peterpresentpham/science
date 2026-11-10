'use client';

import type { Vec3 } from '@chem/core';
import { createViewer, type GLViewer } from '3dmol';
import { useEffect, useRef } from 'react';

export type MolStyle = 'ballStick' | 'stick' | 'sphere' | 'line';

export interface Mol3DProps {
  data: string;
  format: 'sdf' | 'xyz';
  style: MolStyle;
  /** Nguyên tử đang chọn để đo (chỉ số theo thứ tự trong file) */
  selected: number[];
  /** Khung ô mạng (tinh thể) */
  edges?: Array<[Vec3, Vec3]>;
  labels: boolean;
  spin: boolean;
  label: string;
  onPick?: (index: number) => void;
}

const STYLE: Record<MolStyle, object> = {
  ballStick: { stick: { radius: 0.14 }, sphere: { scale: 0.28 } },
  stick: { stick: { radius: 0.2 } },
  sphere: { sphere: { scale: 1 } },
  line: { line: { linewidth: 2 } },
};

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#888';

/**
 * Lớp vẽ 3D bằng 3Dmol.js. File này chỉ được import động (next/dynamic), nên 3Dmol
 * (~1 MB chưa nén) chỉ nằm trong chunk riêng, tải khi người xem mở phần cấu trúc.
 */
export default function Mol3D(props: Mol3DProps) {
  const host = useRef<HTMLDivElement>(null);
  const viewer = useRef<GLViewer | null>(null);
  const pick = useRef(props.onPick);
  useEffect(() => {
    pick.current = props.onPick;
  });

  // Tạo viewer một lần
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const v = createViewer(el, { backgroundColor: 'white', backgroundAlpha: 0, antialias: true });
    viewer.current = v;
    const ro = new ResizeObserver(() => {
      v.resize();
      v.render();
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      v.clear();
      el.replaceChildren();
      viewer.current = null;
    };
  }, []);

  // Nạp dữ liệu
  const { data, format, style, selected, edges, labels, spin } = props;
  useEffect(() => {
    const v = viewer.current;
    if (!v) return;
    v.removeAllModels();
    v.addModel(data, format);
    v.setClickable({}, true, (atom: { index: number }) => pick.current?.(atom.index));
    v.zoomTo();
    v.zoom(0.9);
    v.render();
  }, [data, format]);

  // Kiểu hiển thị, nhãn, nguyên tử đang chọn, khung ô mạng
  useEffect(() => {
    const v = viewer.current;
    if (!v) return;
    v.setStyle({}, STYLE[style]);
    v.removeAllShapes();
    v.removeAllLabels();
    const ink = cssVar('--fg');
    const accent = cssVar('--accent');
    for (const [p, q] of edges ?? [])
      v.addLine({
        start: { x: p[0], y: p[1], z: p[2] },
        end: { x: q[0], y: q[1], z: q[2] },
        color: ink,
        dashed: false,
      } as never);
    const atoms = v.getModel()?.selectedAtoms({}) ?? [];
    for (const i of selected) {
      const a = atoms[i];
      if (!a) continue;
      v.addSphere({
        center: { x: a.x!, y: a.y!, z: a.z! },
        radius: style === 'sphere' ? 1.9 : 0.62,
        color: accent,
        opacity: 0.45,
      } as never);
    }
    if (labels)
      for (const a of atoms)
        v.addLabel(a.elem ?? '', {
          position: { x: a.x!, y: a.y!, z: a.z! },
          fontSize: 12,
          fontColor: ink,
          backgroundOpacity: 0,
          alignment: 'center',
          inFront: true,
        } as never);
    v.render();
  }, [style, selected, edges, labels, data]);

  useEffect(() => {
    const v = viewer.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    v.spin(spin && !reduce ? 'y' : false, 0.4);
  }, [spin, data]);

  return (
    <div
      ref={host}
      role="img"
      aria-label={props.label}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    />
  );
}

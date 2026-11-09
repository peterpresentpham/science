'use client';

import type { OrbitalL } from '@chem/core';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  NormalBlending,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { BASE_PATH } from '@/lib/elements';
import type { OrbitalRequest, OrbitalResponse } from '@/workers/orbital.worker';

const POINTS = 40_000;
const SEED = 1;

interface Sample {
  positions: Float32Array;
  phase: Uint8Array;
  rMax: number;
}

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#888888';
const isDark = () => document.documentElement.dataset.theme === 'dark';

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') ?? c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Lấy mẫu trong worker; bỏ qua kết quả cũ nếu người dùng đã chọn orbital khác. */
function useOrbitalSample(n: number, l: OrbitalL, m: number): Sample | null {
  const [sample, setSample] = useState<{ key: string; s: Sample } | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const reqId = useRef(0);
  const key = `${n}${l}${m}`;

  useEffect(() => {
    // File JS tĩnh do scripts/build-worker.mjs tạo ra (xem lý do trong script đó)
    const w = new Worker(`${BASE_PATH}/workers/orbital.js`);
    workerRef.current = w;
    return () => {
      w.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const w = workerRef.current;
    if (!w) return;
    const id = ++reqId.current;
    const onMsg = (e: MessageEvent<OrbitalResponse>) => {
      if (e.data.id !== id) return;
      setSample({ key, s: e.data });
    };
    w.addEventListener('message', onMsg);
    const req: OrbitalRequest = { id, n, l, m, count: POINTS, seed: SEED };
    w.postMessage(req);
    return () => w.removeEventListener('message', onMsg);
  }, [n, l, m, key]);

  return sample?.key === key ? sample.s : null;
}

function makeLabel(text: string, color: string): Sprite {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.font = '600 40px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 32, 34);
  const sprite = new Sprite(new SpriteMaterial({ map: new CanvasTexture(c), depthWrite: false }));
  return sprite;
}

/**
 * Đám mây điểm của orbital (mỗi điểm là một vị trí có thể gặp electron, mật độ theo |ψ|²),
 * tô 2 màu theo dấu của ψ. Xoay bằng chuột/cảm ứng; tự giảm số điểm nếu máy không giữ được ~50 FPS.
 * Không có WebGL: vẽ hình chiếu 2D tĩnh bằng canvas.
 */
export default function OrbitalCloud({
  n,
  l,
  m,
  label,
}: {
  n: number;
  l: OrbitalL;
  m: number;
  label: string;
}) {
  const t = useTranslations('atom.orbital');
  const [webgl] = useState(hasWebGL);
  const sample = useOrbitalSample(n, l, m);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="space-y-2">
      <div className="relative aspect-square w-full max-w-[28rem] overflow-hidden rounded-2xl border border-border bg-bg">
        {webgl ? (
          <WebGLCloud sample={sample} autoRotate={autoRotate} label={label} />
        ) : (
          <FlatCloud sample={sample} label={label} />
        )}
        {!sample && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">
            {t('sampling')}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: 'var(--series-1)' }} />
          {t('positive')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: 'var(--series-2)' }} />
          {t('negative')}
        </span>
        {webgl ? (
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={autoRotate}
              onChange={(e) => setAutoRotate(e.target.checked)}
            />
            {t('autoRotate')}
          </label>
        ) : (
          <span>{t('noWebgl')}</span>
        )}
      </div>
    </div>
  );
}

function WebGLCloud({
  sample,
  autoRotate,
  label,
}: {
  sample: Sample | null;
  autoRotate: boolean;
  label: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const api = useRef<{
    setSample: (s: Sample) => void;
    setAutoRotate: (on: boolean) => void;
  } | null>(null);

  // Khởi tạo scene một lần
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('role', 'img');
    renderer.domElement.setAttribute('aria-label', label);

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 2000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.autoRotateSpeed = 1.2;

    const geometry = new BufferGeometry();
    const material = new PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new Points(geometry, material);
    scene.add(points);

    const axes = new Group();
    scene.add(axes);
    let rMax = 5;
    let count = 0;

    const clearAxes = () => {
      for (const child of [...axes.children]) {
        axes.remove(child);
        if (child instanceof Line) {
          child.geometry.dispose();
          (child.material as LineBasicMaterial).dispose();
        }
        if (child instanceof Sprite) {
          child.material.map?.dispose();
          child.material.dispose();
        }
      }
    };

    const buildAxes = () => {
      clearAxes();
      const ink = cssVar('--muted');
      const lineMat = new LineBasicMaterial({
        color: new Color(ink),
        transparent: true,
        opacity: 0.5,
      });
      const len = rMax * 1.05;
      // Trục toạ độ theo quy ước hoá học: z hướng lên trên màn hình
      const dirs: Array<[string, Vector3]> = [
        ['x', new Vector3(1, 0, 0)],
        ['y', new Vector3(0, 0, -1)],
        ['z', new Vector3(0, 1, 0)],
      ];
      for (const [name, d] of dirs) {
        const g = new BufferGeometry().setFromPoints([
          d.clone().multiplyScalar(-len),
          d.clone().multiplyScalar(len),
        ]);
        axes.add(new Line(g, lineMat));
        const s = makeLabel(name, ink);
        s.position.copy(d.clone().multiplyScalar(len * 1.08));
        s.scale.setScalar(rMax * 0.12);
        axes.add(s);
      }
    };

    const applyColors = () => {
      if (!count) return;
      const pos = new Color(cssVar('--series-1'));
      const neg = new Color(cssVar('--series-2'));
      const attr = geometry.getAttribute('phase') as BufferAttribute | undefined;
      if (!attr) return;
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const c = attr.getX(i) ? pos : neg;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      geometry.setAttribute('color', new BufferAttribute(colors, 3));
      // Nền tối: cộng sáng cho vùng dày nổi lên; nền sáng: trộn thường (cộng sáng sẽ thành trắng)
      material.blending = isDark() ? AdditiveBlending : NormalBlending;
      material.opacity = isDark() ? 0.5 : 0.55;
      material.needsUpdate = true;
      buildAxes();
    };

    const setSample = (s: Sample) => {
      count = s.phase.length;
      rMax = s.rMax;
      // Đổi trục: hoá học dùng z hướng lên, three dùng y hướng lên
      const p = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        p[i * 3] = s.positions[i * 3]!;
        p[i * 3 + 1] = s.positions[i * 3 + 2]!;
        p[i * 3 + 2] = -s.positions[i * 3 + 1]!;
      }
      geometry.setAttribute('position', new BufferAttribute(p, 3));
      geometry.setAttribute('phase', new BufferAttribute(s.phase, 1));
      geometry.setDrawRange(0, drawCount);
      geometry.computeBoundingSphere();
      material.size = rMax * 0.012;
      camera.position.set(rMax * 1.6, rMax * 1.1, rMax * 2.2);
      camera.near = rMax * 0.01;
      camera.far = rMax * 20;
      camera.updateProjectionMatrix();
      controls.minDistance = rMax * 0.8;
      controls.maxDistance = rMax * 6;
      controls.update();
      applyColors();
    };

    const resize = () => {
      const w = host.clientWidth;
      renderer.setSize(w, w, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Đổi theme: tô lại màu
    const mo = new MutationObserver(applyColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // FPS: đo 90 khung hình đầu, nếu chậm (< ~50 FPS) thì giảm một nửa số điểm vẽ, tối đa 2 lần
    let drawCount = POINTS;
    let frames = 0;
    let t0 = performance.now();
    let reductions = 0;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      controls.update();
      renderer.render(scene, camera);
      if (!count || reductions >= 2) return;
      frames++;
      if (frames === 90) {
        const avg = (performance.now() - t0) / frames;
        if (avg > 20) {
          drawCount = Math.floor(drawCount / 2);
          geometry.setDrawRange(0, drawCount);
          reductions++;
        }
        frames = 0;
        t0 = performance.now();
      }
    };
    // Tab ẩn hoặc giảm chuyển động: không tự xoay
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    loop();

    api.current = {
      setSample,
      setAutoRotate: (on) => {
        controls.autoRotate = on && !reduce;
      },
    };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      controls.dispose();
      geometry.dispose();
      material.dispose();
      clearAxes();
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
  }, [label]);

  useEffect(() => {
    if (sample) api.current?.setSample(sample);
  }, [sample]);
  useEffect(() => {
    api.current?.setAutoRotate(autoRotate);
  }, [autoRotate]);

  return <div ref={hostRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />;
}

/** Không có WebGL: hình chiếu lên mặt phẳng xz (z hướng lên), vẽ một lần bằng canvas 2D. */
function FlatCloud({ sample, label }: { sample: Sample | null; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || !sample) return;
    const size = 560;
    c.width = c.height = size;
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, size, size);
    const pos = cssVar('--series-1');
    const neg = cssVar('--series-2');
    const k = size / 2 / (sample.rMax * 1.05);
    ctx.globalAlpha = 0.35;
    // Nghiêng nhẹ quanh trục x để thấy chiều sâu
    const tilt = 0.35;
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    for (let i = 0; i < sample.phase.length; i++) {
      const x = sample.positions[i * 3]!;
      const y = sample.positions[i * 3 + 1]!;
      const z = sample.positions[i * 3 + 2]!;
      const sy = z * ct - y * st;
      ctx.fillStyle = sample.phase[i] ? pos : neg;
      ctx.fillRect(size / 2 + x * k, size / 2 - sy * k, 1.4, 1.4);
    }
  }, [sample]);
  return <canvas ref={ref} role="img" aria-label={label} className="absolute inset-0 size-full" />;
}

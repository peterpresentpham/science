'use client';

import type { ElementLite } from '@chem/data';
import { useEffect, useRef, useState } from 'react';
import {
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  EdgesGeometry,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import type { CellPaint } from '@/lib/color-mode';
import { categoryColor } from '@/lib/elements';

export interface CityTableProps {
  elements: ElementLite[];
  /** Chiều cao chuẩn hoá 0..1 của từng nguyên tố; null = không có dữ liệu (toà nhà phẳng) */
  heightFrac: (e: ElementLite) => number | null;
  /** Giá trị hiển thị trong chú thích khi trỏ vào; null = không có dòng này */
  valueText: (e: ElementLite) => string | null;
  propertyLabel: string;
  /** Màu nhóm rời rạc theo chế độ tô màu (khối, trạng thái…); không có thì tô theo loại nguyên tố */
  paints: Map<number, CellPaint> | null;
  /** Số hiệu các nguyên tố bị "hạ" xuống phẳng (ví dụ chưa được phát hiện ở năm đang chọn) */
  flatZ?: ReadonlySet<number> | null;
  locale: string;
  label: string;
  onSelect: (slug: string) => void;
}

const MAX_H = 3.6;
const MIN_H = 0.18;
const FLAT_H = 0.05;
const SIZE = 0.88;

/** Đổi một giá trị màu CSS bất kỳ (var(), oklch, color-mix…) sang sRGB 0..255 qua trình duyệt. */
function resolveCss(value: string): [number, number, number] {
  const probe = document.createElement('span');
  probe.style.color = value;
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (!ctx) return [136, 136, 136];
  ctx.fillStyle = '#888888';
  ctx.fillStyle = computed;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0]!, d[1]!, d[2]!];
}

const luminance = ([r, g, b]: [number, number, number]) =>
  (0.299 * r + 0.587 * g + 0.114 * b) / 255;

/**
 * Bảng tuần hoàn dạng "thành phố": mỗi nguyên tố là một toà nhà đặt đúng vị trí trên bảng,
 * chiều cao tỉ lệ với thuộc tính đang chọn (thang log với khối lượng riêng). Kéo để xoay, cuộn để phóng to,
 * trỏ để xem số liệu, bấm để mở nguyên tố. Chỉ vẽ lại khi có thay đổi, nên không tốn pin khi đứng yên.
 */
export default function CityTable(props: CityTableProps) {
  const { elements, heightFrac, valueText, propertyLabel, paints, flatZ, locale, label, onSelect } =
    props;
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<SceneApi | null>(null);
  const live = useRef({ elements, onSelect });
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    live.current = { elements, onSelect };
  });

  // Dựng cảnh một lần
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let scene: SceneApi;
    try {
      scene = createScene(
        el,
        () => live.current.elements,
        (i, x, y) => setHover(i == null ? null : { i, x: x!, y: y! }),
        (i) => live.current.onSelect(live.current.elements[i]!.slug)
      );
    } catch {
      // WebGL không dùng được
      setTimeout(() => setFailed(true));
      return;
    }
    api.current = scene;
    return () => {
      scene.dispose();
      api.current = null;
    };
  }, []);

  // Cập nhật chiều cao + màu khi đổi thuộc tính, chế độ tô màu hoặc giao diện
  useEffect(() => {
    const scene = api.current;
    if (!scene) return;
    const apply = () => {
      scene.set(
        elements.map((e) => {
          const f = heightFrac(e);
          return f == null || flatZ?.has(e.z) ? FLAT_H : MIN_H + (MAX_H - MIN_H) * f;
        }),
        elements.map((e) => {
          const p = paints?.get(e.z);
          return p?.missing ? 'var(--border)' : (p?.color ?? categoryColor(e.category));
        }),
        elements.map((e) => e.symbol)
      );
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => {
      mo.disconnect();
      mq.removeEventListener('change', apply);
    };
  }, [elements, heightFrac, paints, flatZ]);

  const hovered = hover ? elements[hover.i] : null;
  const value = hovered ? valueText(hovered) : null;

  return (
    <div className="relative">
      <div
        ref={host}
        role="img"
        aria-label={label}
        className="h-[min(70vh,34rem)] min-h-80 w-full touch-none overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-card"
      />
      {failed && (
        <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted">
          WebGL không khả dụng · WebGL is unavailable
        </p>
      )}
      {hovered && hover && (
        <div
          className="pointer-events-none absolute z-10 rounded-xl border border-border bg-surface px-3 py-2 text-sm shadow-card"
          style={{ left: Math.min(hover.x + 14, 9999), top: hover.y + 14 }}
        >
          <p className="font-display font-semibold">
            {hovered.symbol} · {locale === 'vi' ? hovered.name.vi : hovered.name.en}
          </p>
          {value !== null && (
            <p className="tabular text-xs text-muted">
              {propertyLabel}: {value}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface SceneApi {
  set: (heights: number[], colors: string[], symbols: string[]) => void;
  dispose: () => void;
}

function createScene(
  host: HTMLDivElement,
  getElements: () => ElementLite[],
  onHover: (i: number | null, x?: number, y?: number) => void,
  onPick: (i: number) => void
): SceneApi {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  host.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 200);
  const els = getElements();
  const cols = Math.max(...els.map((e) => e.grid.x));
  const rows = Math.max(...els.map((e) => e.grid.y));
  const center = new Vector3((cols - 1) / 2, 0.8, (rows - 1) / 2);
  camera.position.set(center.x, 15, center.z + 17);
  camera.lookAt(center);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(center);
  controls.enablePan = false;
  controls.minDistance = 8;
  controls.maxDistance = 42;
  controls.maxPolarAngle = Math.PI / 2 - 0.08;
  controls.update();

  scene.add(new AmbientLight(0xffffff, 1.5));
  const sun = new DirectionalLight(0xffffff, 2.2);
  sun.position.set(-6, 14, 9);
  scene.add(sun);

  const n = els.length;
  const geo = new BoxGeometry(1, 1, 1);
  const mat = new MeshStandardMaterial({ roughness: 0.6, metalness: 0 });
  const bars = new InstancedMesh(geo, mat, n);
  scene.add(bars);

  const flat = new PlaneGeometry(SIZE * 0.9, SIZE * 0.9);
  const labels: Array<{ mesh: Mesh; ctx: CanvasRenderingContext2D; tex: CanvasTexture }> = [];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('canvas');
    c.width = c.height = 96;
    const ctx = c.getContext('2d')!;
    const tex = new CanvasTexture(c);
    tex.colorSpace = SRGBColorSpace;
    const mesh = new Mesh(flat, new MeshBasicMaterial({ map: tex, transparent: true }));
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
    labels.push({ mesh, ctx, tex });
  }

  const outline = new LineSegments(
    new EdgesGeometry(geo),
    new LineBasicMaterial({ color: 0xffffff })
  );
  outline.visible = false;
  scene.add(outline);

  const dummy = new Object3D();
  const cur = new Array<number>(n).fill(0);
  let target = new Array<number>(n).fill(0);
  let raf = 0;
  let disposed = false;
  let hoveredIdx: number | null = null;

  const place = (i: number) => {
    const e = els[i]!;
    const h = cur[i]!;
    dummy.position.set(e.grid.x - 1, h / 2, e.grid.y - 1);
    dummy.scale.set(SIZE, Math.max(h, 0.001), SIZE);
    dummy.updateMatrix();
    bars.setMatrixAt(i, dummy.matrix);
    labels[i]!.mesh.position.set(e.grid.x - 1, h + 0.012, e.grid.y - 1);
  };
  const placeOutline = () => {
    if (hoveredIdx == null) {
      outline.visible = false;
      return;
    }
    const e = els[hoveredIdx]!;
    const h = cur[hoveredIdx]!;
    outline.visible = true;
    outline.position.set(e.grid.x - 1, h / 2, e.grid.y - 1);
    outline.scale.set(SIZE * 1.03, h * 1.01 + 0.002, SIZE * 1.03);
  };

  const render = () => {
    raf = 0;
    if (disposed) return;
    // Chiều cao tiến dần tới đích (tắt hiệu ứng khi người dùng giảm chuyển động)
    let moving = false;
    for (let i = 0; i < n; i++) {
      const d = target[i]! - cur[i]!;
      if (Math.abs(d) > 0.002 && !reduce) {
        cur[i] = cur[i]! + d * 0.16;
        moving = true;
      } else cur[i] = target[i]!;
      place(i);
    }
    bars.instanceMatrix.needsUpdate = true;
    placeOutline();
    renderer.render(scene, camera);
    if (moving) raf = requestAnimationFrame(render);
  };
  const request = () => {
    if (!raf && !disposed) raf = requestAnimationFrame(render);
  };
  controls.addEventListener('change', request);

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / Math.max(h, 1);
    // Màn hình hẹp: lùi camera để thấy đủ chiều ngang bảng
    camera.fov = camera.aspect < 1.2 ? 52 : 38;
    camera.updateProjectionMatrix();
    request();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // Trỏ / bấm
  const ray = new Raycaster();
  const ndc = new Vector2();
  const pick = (e: PointerEvent) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObject(bars)[0];
    return { i: hit?.instanceId ?? null, x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onMove = (e: PointerEvent) => {
    if (e.buttons) return; // đang kéo xoay
    const { i, x, y } = pick(e);
    if (i !== hoveredIdx) {
      hoveredIdx = i;
      request();
    }
    onHover(i, x, y);
  };
  let down: { x: number; y: number } | null = null;
  const onDown = (e: PointerEvent) => (down = { x: e.clientX, y: e.clientY });
  const onUp = (e: PointerEvent) => {
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) return;
    down = null;
    const { i } = pick(e);
    if (i != null) onPick(i);
  };
  const onLeave = () => {
    hoveredIdx = null;
    onHover(null);
    request();
  };
  const cv = renderer.domElement;
  cv.addEventListener('pointermove', onMove);
  cv.addEventListener('pointerdown', onDown);
  cv.addEventListener('pointerup', onUp);
  cv.addEventListener('pointerleave', onLeave);

  const paintLabel = (i: number, symbol: string, rgb: [number, number, number]) => {
    const { ctx, tex } = labels[i]!;
    ctx.clearRect(0, 0, 96, 96);
    ctx.fillStyle = luminance(rgb) > 0.6 ? '#111111' : '#ffffff';
    ctx.font = '700 44px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, 48, 50);
    tex.needsUpdate = true;
  };

  const colorCache = new Map<string, [number, number, number]>();
  return {
    set(heights, colors, symbols) {
      colorCache.clear();
      target = heights;
      const tmp = new Color();
      for (let i = 0; i < n; i++) {
        const css = colors[i]!;
        let rgb = colorCache.get(css);
        if (!rgb) {
          rgb = resolveCss(css);
          colorCache.set(css, rgb);
        }
        tmp.setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, SRGBColorSpace);
        bars.setColorAt(i, tmp);
        paintLabel(i, symbols[i]!, rgb);
      }
      if (bars.instanceColor) bars.instanceColor.needsUpdate = true;
      request();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerdown', onDown);
      cv.removeEventListener('pointerup', onUp);
      cv.removeEventListener('pointerleave', onLeave);
      controls.dispose();
      geo.dispose();
      flat.dispose();
      mat.dispose();
      outline.geometry.dispose();
      (outline.material as LineBasicMaterial).dispose();
      for (const l of labels) {
        l.tex.dispose();
        (l.mesh.material as MeshBasicMaterial).dispose();
      }
      bars.dispose();
      renderer.dispose();
      cv.remove();
    },
  };
}

'use client';

import { mulberry32 } from '@chem/core';
import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  InstancedMesh,
  LineBasicMaterial,
  LineLoop,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type AtomFocus = 'atom' | 'nucleus';

export interface AtomModelProps {
  z: number;
  neutrons: number;
  shells: number[];
  label: string;
  autoRotate: boolean;
  focus: AtomFocus;
  /** Lớp đang được trỏ vào ở chú thích (chỉ số 0..), làm nổi lớp đó */
  highlight: number | null;
}

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#888888';
const isDark = () => document.documentElement.dataset.theme === 'dark';

/*
 * Hạt nhân: lấy A điểm của mạng lập phương tâm mặt (fcc, các quả cầu bán kính 1 xếp khít)
 * gần tâm nhất → khối cầu đặc, trông như hạt nhân thật. Gán ngẫu nhiên (seed theo Z) proton/nơtron.
 */
function nucleusLayout(z: number, neutrons: number) {
  const a = z + neutrons;
  const pts: Vector3[] = [];
  const R = Math.ceil(Math.cbrt(a) * 1.2) + 2;
  // Lệch tâm nhỏ để cụm không quá đối xứng (đối xứng hoàn hảo trông như khối tinh thể)
  const c = new Vector3(0.31, 0.17, 0.11);
  for (let i = -R; i <= R; i++)
    for (let j = -R; j <= R; j++)
      for (let k = -R; k <= R; k++)
        if ((i + j + k) % 2 === 0) pts.push(new Vector3(i, j, k).multiplyScalar(Math.SQRT2));
  pts.sort((p, q) => p.distanceToSquared(c) - q.distanceToSquared(c));
  const chosen = pts.slice(0, a);
  const center = chosen
    .reduce((s, p) => s.add(p), new Vector3())
    .multiplyScalar(1 / Math.max(a, 1));
  for (const p of chosen) p.sub(center);
  const rand = mulberry32(z * 7919 + 13);
  const isProton = chosen.map((_, i) => i < z);
  for (let i = isProton.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [isProton[i], isProton[j]] = [isProton[j]!, isProton[i]!];
  }
  const radius = chosen.reduce((m, p) => Math.max(m, p.length()), 0) + 1;
  return { chosen, isProton, radius };
}

/** Vầng sáng tròn mềm cho electron */
function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.35)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

export default function AtomModel3D(props: AtomModelProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const live = useRef(props);
  useEffect(() => {
    live.current = props;
  });
  const { z, neutrons, shells, label } = props;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.autoRotateSpeed = 0.8;

    scene.add(new AmbientLight(0xffffff, 0.75));
    const key = new DirectionalLight(0xffffff, 1.8);
    key.position.set(6, 10, 8);
    scene.add(key);
    const rim = new DirectionalLight(0xffffff, 0.5);
    rim.position.set(-8, -4, -6);
    scene.add(rim);

    // --- Hạt nhân ---
    const { chosen, isProton, radius: nucR } = nucleusLayout(z, neutrons);
    const nucleonGeo = track(new SphereGeometry(0.97, 24, 16));
    const protonMat = track(new MeshStandardMaterial({ roughness: 0.42, metalness: 0.05 }));
    const neutronMat = track(new MeshStandardMaterial({ roughness: 0.5, metalness: 0.05 }));
    const protons = new InstancedMesh(nucleonGeo, protonMat, Math.max(z, 1));
    const neutronMesh = new InstancedMesh(nucleonGeo, neutronMat, Math.max(neutrons, 1));
    protons.count = z;
    neutronMesh.count = neutrons;
    const dummy = new Object3D();
    let ip = 0;
    let ineu = 0;
    chosen.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.updateMatrix();
      if (isProton[i]) protons.setMatrixAt(ip++, dummy.matrix);
      else neutronMesh.setMatrixAt(ineu++, dummy.matrix);
    });
    const nucleus = new Group();
    nucleus.add(protons, neutronMesh);
    scene.add(nucleus);

    // --- Các lớp electron ---
    // Không theo tỉ lệ thật (hạt nhân nhỏ hơn nguyên tử ~10⁵ lần): giãn đều để nhìn rõ từng lớp
    const first = nucR + 4.5;
    const gap = Math.max(3.2, nucR * 0.55);
    const ringMats: LineBasicMaterial[] = [];
    const electronMat = track(new MeshBasicMaterial());
    const glowTex = track(glowTexture());
    const glowMat = track(
      new SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false })
    );
    const electronGeo = track(new SphereGeometry(0.42, 16, 12));
    const spinners: Array<{ g: Group; speed: number }> = [];
    shells.forEach((count, s) => {
      const r = first + s * gap;
      const shell = new Group();
      // Mỗi lớp nghiêng một chút theo hướng khác nhau: thấy được chiều sâu mà vẫn đọc ra từng lớp
      shell.rotation.set(Math.PI / 2 + 0.32 * Math.sin(s * 2.1 + 0.6), 0, s * 1.1);
      shell.rotation.y = 0.22 * Math.cos(s * 1.7);
      const pts = Array.from({ length: 129 }, (_, k) => {
        const a = (k / 128) * Math.PI * 2;
        return new Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
      });
      const ringGeo = track(new BufferGeometry().setFromPoints(pts));
      const ringMat = track(new LineBasicMaterial({ transparent: true }));
      ringMats.push(ringMat);
      shell.add(new LineLoop(ringGeo, ringMat));
      const spin = new Group();
      const offset = s * 0.7;
      for (let k = 0; k < count; k++) {
        const a = offset + (k / count) * Math.PI * 2;
        const e = new Mesh(electronGeo, electronMat);
        e.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
        const glow = new Sprite(glowMat);
        glow.position.copy(e.position);
        glow.scale.setScalar(2.4);
        spin.add(e, glow);
      }
      shell.add(spin);
      scene.add(shell);
      // Lớp trong quay nhanh hơn lớp ngoài, xen kẽ chiều
      spinners.push({ g: spin, speed: (s % 2 ? -1 : 1) * (0.9 / Math.pow(s + 1, 0.9)) });
    });
    const outer = first + Math.max(shells.length - 1, 0) * gap;

    const applyColors = () => {
      protonMat.color = new Color(cssVar('--particle-proton'));
      neutronMat.color = new Color(cssVar('--particle-neutron'));
      electronMat.color = new Color(cssVar('--particle-electron'));
      glowMat.color = new Color(cssVar('--particle-electron'));
      glowMat.opacity = isDark() ? 0.9 : 0.55;
      const ink = new Color(cssVar('--fg'));
      for (const m of ringMats) m.color = ink;
    };
    applyColors();
    const mo = new MutationObserver(applyColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // --- Camera: hai mức "cả nguyên tử" và "cận hạt nhân", chuyển mượt ---
    const dist = { atom: outer * 2.9 + 6, nucleus: Math.max(nucR * 5.5, 9) };
    camera.position.set(0.35, 0.55, 1).normalize().multiplyScalar(dist.atom);
    controls.minDistance = Math.max(nucR * 2.6, 5);
    controls.maxDistance = dist.atom * 1.8;
    let targetDist: number | null = null;
    let lastFocus = live.current.focus;

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

    // Chỉ vẽ khi khung hình đang nằm trên màn hình
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
    });
    io.observe(host);

    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      if (!visible || document.hidden) return;
      const p = live.current;
      controls.autoRotate = p.autoRotate && !reduce;
      if (p.focus !== lastFocus) {
        lastFocus = p.focus;
        targetDist = dist[p.focus];
      }
      if (targetDist !== null) {
        const d = camera.position.length();
        const next = d + (targetDist - d) * (reduce ? 1 : Math.min(1, dt * 5));
        camera.position.setLength(next);
        if (Math.abs(next - targetDist) < 0.05) targetDist = null;
      }
      if (!reduce) for (const s of spinners) s.g.rotation.z += s.speed * dt;
      ringMats.forEach((m, i) => {
        const base = isDark() ? 0.28 : 0.22;
        m.opacity = p.highlight === null ? base : p.highlight === i ? 0.95 : base * 0.45;
      });
      controls.update();
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      controls.dispose();
      for (const d of disposables) d.dispose();
      scene.traverse((o) => {
        if (o instanceof InstancedMesh) o.dispose();
        else if ('material' in o && o.material) (o.material as Material).dispose?.();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [z, neutrons, shells]);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={label}
      className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
    />
  );
}

/// <reference lib="webworker" />
import { type OrbitalL, sampleOrbital } from '@chem/core';

export interface OrbitalRequest {
  id: number;
  n: number;
  l: OrbitalL;
  m: number;
  count: number;
  seed: number;
}

export interface OrbitalResponse {
  id: number;
  positions: Float32Array;
  phase: Uint8Array;
  rMax: number;
}

// Lấy mẫu trong worker để giao diện không khựng; trả về bằng transferable (không copy bộ nhớ)
self.onmessage = (e: MessageEvent<OrbitalRequest>) => {
  const { id, n, l, m, count, seed } = e.data;
  const s = sampleOrbital(n, l, m, count, { seed });
  const msg: OrbitalResponse = { id, positions: s.positions, phase: s.phase, rMax: s.rMax };
  (self as unknown as DedicatedWorkerGlobalScope).postMessage(msg, [
    s.positions.buffer,
    s.phase.buffer,
  ]);
};

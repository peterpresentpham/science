import { LENS_IDS, type LensId } from '@chem/data/lenses';
import { useCallback } from 'react';

import { useUrlParam } from './url-state';

/** Lăng kính đang chọn, lưu trên URL (?lens=body) để chia sẻ link được. */
export function useLens(): [LensId | null, (lens: LensId | null) => void] {
  const [raw, setRaw] = useUrlParam('lens');
  const lens = (LENS_IDS as readonly string[]).includes(raw ?? '') ? (raw as LensId) : null;
  const setLens = useCallback((next: LensId | null) => setRaw(next), [setRaw]);
  return [lens, setLens];
}

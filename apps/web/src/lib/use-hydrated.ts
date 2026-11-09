import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/** false khi render tĩnh và lúc hydrate, true sau đó. Dùng để hoãn nội dung trang trí không quan trọng. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
}

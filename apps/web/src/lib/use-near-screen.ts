'use client';

import { useEffect, useRef, useState } from 'react';

/** true khi phần tử đã lọt vào (gần) màn hình ít nhất một lần: dùng để trì hoãn tải phần nặng. */
export function useNearScreen<T extends Element>(margin = '200px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setNear(true);
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, margin]);
  return [ref, near] as const;
}

'use client';

import type { ElementFull } from '@chem/data';

import { useNearScreen } from '@/lib/use-near-screen';

import { DecaySim } from './DecaySim';

/**
 * Mô phỏng nằm dưới màn hình đầu nên chỉ dựng khi cuộn tới: tránh nhúng ~400 ô SVG
 * (≈ 35 KB) vào HTML của mỗi trang nguyên tố. Khung giữ chiều cao để trang không nhảy.
 */
export function LazyDecaySim({ el }: { el: ElementFull }) {
  const [ref, near] = useNearScreen<HTMLDivElement>('400px');
  return (
    <div ref={ref} className={near ? undefined : 'min-h-[26rem]'}>
      {near && <DecaySim key={el.z} el={el} />}
    </div>
  );
}

export interface GridItem {
  z: number;
  grid: { x: number; y: number };
}

export type Direction = 'left' | 'right' | 'up' | 'down';

/**
 * Tìm ô kế tiếp theo hướng phím mũi tên.
 * Trái/phải: ô gần nhất cùng hàng. Lên/xuống: ô gần nhất cùng cột.
 * Không còn ô theo hướng đó thì giữ nguyên.
 */
export function nextCell(items: readonly GridItem[], fromZ: number, dir: Direction): number {
  const from = items.find((i) => i.z === fromZ);
  if (!from) return fromZ;
  const { x, y } = from.grid;

  let best: GridItem | undefined;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const it of items) {
    const dx = it.grid.x - x;
    const dy = it.grid.y - y;
    let dist: number | null = null;
    if (dir === 'right' && dy === 0 && dx > 0) dist = dx;
    if (dir === 'left' && dy === 0 && dx < 0) dist = -dx;
    if (dir === 'down' && dx === 0 && dy > 0) dist = dy;
    if (dir === 'up' && dx === 0 && dy < 0) dist = -dy;
    if (dist !== null && dist < bestDist) {
      best = it;
      bestDist = dist;
    }
  }
  return best?.z ?? fromZ;
}

export const KEY_TO_DIRECTION: Readonly<Record<string, Direction>> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
};

import type { ElementLite } from '@chem/data';
import { type LensId, normalizeSearch } from '@chem/data/lenses';

/** Bỏ dấu tiếng Việt + chữ thường: "Lưu huỳnh" → "luu huynh", "Đồng" → "dong". */
export const normalizeVi = normalizeSearch;

/** Từ 3 ký tự trở lên mới tìm trong công dụng / tên lăng kính, để gõ "c" không ra cả bảng. */
const MIN_TOPIC_QUERY = 3;

/**
 * Lọc nguyên tố theo chuỗi tìm kiếm.
 * Thứ tự: trùng ký hiệu/số hiệu → tên bắt đầu bằng chuỗi → tên chứa chuỗi → công dụng → lăng kính.
 * `lensNames`: tên lăng kính theo ngôn ngữ đang xem (gõ "dien thoai" ra các nguyên tố trong điện thoại).
 */
export function searchElements(
  elements: readonly ElementLite[],
  query: string,
  lensNames: Partial<Record<LensId, string>> = {}
): ElementLite[] {
  const q = normalizeVi(query);
  if (!q) return [...elements];
  const topic = q.length >= MIN_TOPIC_QUERY;
  const lensHits = topic
    ? (Object.entries(lensNames) as Array<[LensId, string]>)
        .filter(([, name]) => normalizeVi(name).includes(q))
        .map(([id]) => id)
    : [];
  const scored: Array<[number, ElementLite]> = [];
  for (const el of elements) {
    const names = [normalizeVi(el.name.vi), normalizeVi(el.name.en)];
    let score = -1;
    if (el.symbol.toLowerCase() === q || String(el.z) === q) score = 0;
    else if (names.some((n) => n.startsWith(q))) score = 1;
    else if (names.some((n) => n.includes(q))) score = 2;
    else if (topic && el.keywords.includes(q)) score = 3;
    else if (lensHits.some((l) => el.lenses.includes(l))) score = 4;
    if (score >= 0) scored.push([score, el]);
  }
  return scored.sort((a, b) => a[0] - b[0] || a[1].z - b[1].z).map(([, el]) => el);
}

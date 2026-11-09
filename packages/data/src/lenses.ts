/**
 * Lăng kính: các lối vào theo chủ đề đời thường trên trang chủ.
 * File này không dùng zod để giao diện import được mà không kéo zod vào bundle.
 */
export const LENS_IDS = [
  'body',
  'phone',
  'kitchen',
  'precious',
  'radioactive',
  'liquid',
  'synthetic',
] as const;
export type LensId = (typeof LENS_IDS)[number];

/** Lăng kính khai báo trong câu chuyện của từng nguyên tố (stories/<slug>.ts, trường `lenses`). */
export const STORY_LENS_IDS = ['kitchen'] as const;

/**
 * Nguồn cho từng lăng kính (hiện dưới hàng chip khi chọn).
 * null: lăng kính lấy từ câu chuyện, nguồn nằm ở trang từng nguyên tố.
 */
export const LENS_SOURCES: Record<LensId, { label: string; url: string } | null> = {
  kitchen: null,
  body: {
    label: 'Wikipedia: Composition of the human body',
    url: 'https://en.wikipedia.org/wiki/Composition_of_the_human_body',
  },
  phone: {
    label: 'EuChemS (2022): Rare Elements in Smartphones',
    url: 'https://www.euchems.eu/wp-content/uploads/2022/11/Rare_Elements_Smartphones_PT_PressRelease.pdf',
  },
  precious: {
    label: 'Wikipedia: Precious metal',
    url: 'https://en.wikipedia.org/wiki/Precious_metal',
  },
  radioactive: {
    label: 'Wikipedia: Stable nuclide',
    url: 'https://en.wikipedia.org/wiki/Stable_nuclide',
  },
  liquid: {
    label: 'PubChem Periodic Table',
    url: 'https://pubchem.ncbi.nlm.nih.gov/periodic-table/',
  },
  synthetic: {
    label: 'Wikipedia: Synthetic element',
    url: 'https://en.wikipedia.org/wiki/Synthetic_element',
  },
};

/**
 * Chuỗi tìm kiếm: bỏ dấu tiếng Việt + chữ thường ("Lưu huỳnh" → "luu huynh", "Đồng" → "dong").
 * Dùng chung cho build (từ khoá công dụng) và giao diện (ô tìm kiếm).
 */
export function normalizeSearch(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

/** Mức khan hiếm theo EuChemS: nghiêm trọng trong 100 năm tới / tăng vì dùng nhiều / trữ lượng hạn chế. */
export const PHONE_RISKS = ['serious', 'rising', 'limited'] as const;
export type PhoneRisk = (typeof PHONE_RISKS)[number];

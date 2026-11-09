// Hằng số không phụ thuộc Zod: an toàn để import phía client mà không kéo theo zod vào bundle.
export const CATEGORIES = [
  'alkali-metal',
  'alkaline-earth-metal',
  'transition-metal',
  'post-transition-metal',
  'metalloid',
  'nonmetal',
  'halogen',
  'noble-gas',
  'lanthanide',
  'actinide',
] as const;

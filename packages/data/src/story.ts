import { z } from 'zod';

import { STORY_LENS_IDS } from './lenses';

/**
 * "Câu chuyện" của một nguyên tố: phần nội dung tự biên soạn cho người đọc tò mò.
 * Mỗi nguyên tố là một file `stories/<slug>.ts` (`export default defineStory({...})`), được build kiểm tra
 * bằng schema dưới đây.
 */

/** Icon cho công dụng: tên icon lucide. Giữ danh sách đóng để giao diện chỉ nạp các icon này. */
export const USE_ICONS = [
  'Battery',
  'Building2',
  'Cable',
  'CakeSlice',
  'Car',
  'CookingPot',
  'Coins',
  'Cpu',
  'CupSoda',
  'Droplet',
  'Factory',
  'Flame',
  'FlaskConical',
  'Gem',
  'Hospital',
  'Leaf',
  'Lightbulb',
  'Magnet',
  'Package',
  'PartyPopper',
  'Pencil',
  'Pill',
  'Plane',
  'Rocket',
  'Scan',
  'Shield',
  'Smile',
  'Soup',
  'Sprout',
  'Sun',
  'Thermometer',
  'Waves',
  'Wind',
  'Wrench',
  'Zap',
] as const;
export type UseIcon = (typeof USE_ICONS)[number];

/** Văn bản hai ngôn ngữ, mỗi bản không dài quá `max` ký tự. */
const text = (max: number) =>
  z.object({ vi: z.string().min(1).max(max), en: z.string().min(1).max(max) });

export const SAFETY_LEVELS = ['harmless', 'careful', 'toxic'] as const;
export type SafetyLevel = (typeof SAFETY_LEVELS)[number] | 'radioactive';

export const Story = z.object({
  /** Câu móc câu: 1 câu, cụ thể, bất ngờ, đúng sự thật */
  hook: text(130),
  /** "Bạn gặp nó ở đâu" */
  uses: z
    .array(z.object({ icon: z.enum(USE_ICONS), text: text(60) }))
    .min(1)
    .max(4),
  /** "Có thể bạn chưa biết": câu hỏi thật + trả lời ngắn, bắt buộc có nguồn */
  facts: z.array(z.object({ q: text(100), a: text(340), source: z.url() })).max(3),
  /** Mức an toàn khi gặp ngoài đời. Nguyên tố phóng xạ được tính tự động, không cần ghi. */
  safety: z.object({ level: z.enum(SAFETY_LEVELS), note: text(180) }).optional(),
  /** Lăng kính tự biên soạn chứa nguyên tố này (vd. "kitchen": gặp trong bếp, thể hiện qua `uses`) */
  lenses: z.array(z.enum(STORY_LENS_IDS)).optional(),
});
export type Story = z.infer<typeof Story>;
export type StoryInput = z.input<typeof Story>;

/** Khai báo câu chuyện, có kiểm tra kiểu ngay trong editor. */
export const defineStory = (story: StoryInput): StoryInput => story;

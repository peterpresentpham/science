import type { ReactionInput } from '../src/reaction';
import { GAS } from './reactions/gas';
import { PRECIPITATE } from './reactions/precipitate';
import { REDOX } from './reactions/redox';
import { THERMAL } from './reactions/thermal';

/** 50 phản ứng cho phòng thí nghiệm ảo, chia theo nhóm hiện tượng; kiểm bằng scripts/check-reactions.ts. */
export const REACTIONS: ReactionInput[] = [...PRECIPITATE, ...GAS, ...REDOX, ...THERMAL];

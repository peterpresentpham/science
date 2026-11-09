import { isRadioactive } from '@chem/core';
import type { ElementFull, SafetyLevel, UseIcon } from '@chem/data';
import {
  Battery,
  Building2,
  Cable,
  CakeSlice,
  Car,
  ChevronDown,
  Coins,
  CookingPot,
  Cpu,
  CupSoda,
  Droplet,
  Factory,
  Flame,
  FlaskConical,
  Gem,
  Hospital,
  Leaf,
  Lightbulb,
  type LucideIcon,
  Magnet,
  Package,
  PartyPopper,
  Pencil,
  Pill,
  Plane,
  Radiation,
  Rocket,
  Scan,
  Shield,
  ShieldCheck,
  Skull,
  Smile,
  Soup,
  Sprout,
  Sun,
  Thermometer,
  TriangleAlert,
  Waves,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { categoryInk, categoryTint } from '@/lib/elements';

/** Danh sách đóng (USE_ICONS trong @chem/data/story): thiếu icon nào thì typecheck báo lỗi. */
const USE_ICON: Record<UseIcon, LucideIcon> = {
  Battery,
  Building2,
  Cable,
  CakeSlice,
  Car,
  CookingPot,
  Coins,
  Cpu,
  CupSoda,
  Droplet,
  Factory,
  Flame,
  FlaskConical,
  Gem,
  Hospital,
  Leaf,
  Lightbulb,
  Magnet,
  Package,
  PartyPopper,
  Pencil,
  Pill,
  Plane,
  Rocket,
  Scan,
  Shield,
  Smile,
  Soup,
  Sprout,
  Sun,
  Thermometer,
  Waves,
  Wind,
  Wrench,
  Zap,
};

type Text = { vi: string; en: string };
const useText = () => {
  const locale = useLocale();
  return (x: Text) => (locale === 'vi' ? x.vi : x.en);
};

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="px-1 font-display text-xl font-semibold tracking-tight">
      {children}
    </h2>
  );
}

/** "Bạn gặp nó ở đâu": 1–4 công dụng đời thường. */
export function UsesSection({ el }: { el: ElementFull }) {
  const t = useTranslations('story');
  const tx = useText();
  if (!el.story) return null;
  return (
    <section aria-labelledby="uses" className="space-y-3">
      <SectionTitle id="uses">{t('uses')}</SectionTitle>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {el.story.uses.map((u) => {
          const Icon = USE_ICON[u.icon];
          return (
            <li
              key={u.text.vi}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card"
            >
              <span
                className="flex size-10 items-center justify-center rounded-xl"
                style={{
                  background: categoryTint(el.category, 18),
                  color: categoryInk(el.category),
                }}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm leading-snug font-medium">{tx(u.text)}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** "Có thể bạn chưa biết": hỏi – đáp, mỗi câu trả lời kèm nguồn. Câu đầu mở sẵn. */
export function FactsSection({ el }: { el: ElementFull }) {
  const t = useTranslations('story');
  const tx = useText();
  if (!el.story?.facts.length) return null;
  return (
    <section aria-labelledby="facts" className="space-y-3">
      <SectionTitle id="facts">{t('facts')}</SectionTitle>
      <div className="space-y-2">
        {el.story.facts.map((f, i) => (
          <details
            key={f.q.vi}
            open={i === 0}
            className="group rounded-2xl border border-border bg-surface shadow-card"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl p-4 font-medium outline-none select-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1">{tx(f.q)}</span>
              <ChevronDown
                className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="space-y-2 px-4 pb-4 text-sm leading-relaxed">
              <p>{tx(f.a)}</p>
              <a
                href={f.source}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs text-muted underline underline-offset-2 hover:text-fg"
              >
                {t('source')}: {new URL(f.source).hostname.replace(/^www\./, '')}
              </a>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

const SAFETY: Record<SafetyLevel, { icon: LucideIcon; color: string }> = {
  harmless: { icon: ShieldCheck, color: 'var(--cat-nonmetal)' },
  careful: { icon: TriangleAlert, color: 'var(--cat-alkaline-earth-metal)' },
  toxic: { icon: Skull, color: 'var(--cat-alkali-metal)' },
  radioactive: { icon: Radiation, color: 'var(--cat-alkali-metal)' },
};

/** Mức an toàn: từ câu chuyện, hoặc tự động "phóng xạ" (luôn ưu tiên vì là mức nguy hiểm nhất). */
export function SafetyNote({ el }: { el: ElementFull }) {
  const t = useTranslations('safety');
  const tx = useText();
  const radioactive = isRadioactive(el.z);
  const level: SafetyLevel | null = radioactive ? 'radioactive' : (el.story?.safety?.level ?? null);
  if (!level) return null;
  const note = el.story?.safety ? tx(el.story.safety.note) : t('radioactiveNote');
  const { icon: Icon, color } = SAFETY[level];
  return (
    <section
      aria-labelledby="safety"
      className="flex gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <Icon className="mt-0.5 size-5 shrink-0" style={{ color }} aria-hidden />
      <div className="min-w-0">
        <h2 id="safety" className="font-medium">
          {t('title')}: <span style={{ color }}>{t(level)}</span>
        </h2>
        <p className="mt-0.5 text-sm text-muted">{note}</p>
      </div>
    </section>
  );
}

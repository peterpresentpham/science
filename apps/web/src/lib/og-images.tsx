import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { electronConfiguration, nucleonCounts, toNotation } from '@chem/core';
import { ImageResponse } from 'next/og';

import { BY_SLUG } from '@/lib/elements';
import { formatNumber } from '@/lib/format';
import { CAT_HEX, MiniTable, OG, OG_SIZE, ogFonts } from '@/lib/og';
import { type Locale, SITE_NAME } from '@/lib/seo';

const size = OG_SIZE;

/** Biểu tượng của site (src/app/icon.svg) dạng data URI để nhúng vào ảnh */
let icon: Promise<string> | null = null;
const iconDataUri = () =>
  (icon ??= readFile(join(process.cwd(), 'src/app/icon.svg')).then(
    (b) => `data:image/svg+xml;base64,${b.toString('base64')}`
  ));

const TEXT: Record<Locale, { title: string; sub: string }> = {
  vi: {
    title: 'Bảng tuần hoàn tương tác',
    sub: '118 nguyên tố, mô hình nguyên tử 3D, cân bằng phương trình, tính khối lượng mol',
  },
  en: {
    title: 'Interactive periodic table',
    sub: '118 elements, 3D atom models, an equation balancer and a molar mass calculator',
  },
};

/** Ảnh chia sẻ mặc định cho mọi trang (trang nguyên tố có ảnh riêng). */
export async function siteImage(locale: string) {
  const t = TEXT[locale as Locale] ?? TEXT.vi;
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: 64,
        background: OG.bg,
        color: OG.fg,
        fontFamily: 'BeVietnamPro',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 700 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- satori chỉ hiểu <img> */}
        <img src={await iconDataUri()} width={56} height={56} alt="" />
        {SITE_NAME[locale as Locale] ?? SITE_NAME.vi}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 40,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 540 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {t.title}
          </div>
          <div style={{ display: 'flex', fontSize: 26, lineHeight: 1.4, color: OG.muted }}>
            {t.sub}
          </div>
        </div>
        <MiniTable cell={23} />
      </div>
    </div>,
    { ...size, fonts: await ogFonts() }
  );
}

const LABEL: Record<Locale, { mass: string; config: string; particles: string }> = {
  vi: { mass: 'Nguyên tử khối', config: 'Cấu hình electron', particles: 'Hạt' },
  en: { mass: 'Atomic mass', config: 'Electron configuration', particles: 'Particles' },
};

/** Ảnh chia sẻ của một nguyên tố: ô nguyên tố lớn + tên + vài số liệu + vị trí trên bảng. */
export async function elementImage(locale: string, symbol: string) {
  const loc = (locale as Locale) in LABEL ? (locale as Locale) : 'vi';
  const el = BY_SLUG.get(symbol)!;
  const color = CAT_HEX[el.category];
  const name = loc === 'vi' ? el.name.vi : el.name.en;
  const other = loc === 'vi' ? el.name.en : el.name.vi;
  const { protons, neutrons } = nucleonCounts(el.z);
  const config = toNotation(electronConfiguration(el.z), { nobleGasCore: true, superscript: true });
  const L = LABEL[loc];
  const stat = (label: string, value: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', fontSize: 22, color: OG.muted }}>{label}</div>
      <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>{value}</div>
    </div>
  );

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: 64,
        gap: 56,
        background: OG.bg,
        color: OG.fg,
        fontFamily: 'BeVietnamPro',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 380,
          height: 502,
          padding: 36,
          borderRadius: 40,
          background: color,
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 44, fontWeight: 700 }}>{el.z}</div>
        <div
          style={{
            display: 'flex',
            fontSize: 190,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -6,
          }}
        >
          {el.symbol}
        </div>
        <div style={{ display: 'flex', fontSize: 30 }}>{formatNumber(el.atomicMass, loc, 4)}</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {name}
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: OG.muted }}>{other}</div>
        </div>
        <div style={{ display: 'flex', gap: 48 }}>
          {stat(L.config, config)}
          {stat(L.particles, `${protons}p · ${neutrons}n · ${protons}e`)}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: OG.accent }}>
            {SITE_NAME[loc]}
          </div>
          <MiniTable cell={13} hl={el.z} />
        </div>
      </div>
    </div>,
    { ...size, fonts: await ogFonts() }
  );
}

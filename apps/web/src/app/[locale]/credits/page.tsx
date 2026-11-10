import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ElementPhoto } from '@/components/ui/ElementPhoto';
import { Link } from '@/i18n/navigation';
import { readElement } from '@/lib/element-data.server';
import { ELEMENTS } from '@/lib/elements';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/credits'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'credits' });
  const m = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    path: '/credits/',
    title: t('title'),
    description: m('creditsDescription'),
  });
}

/** Ghi công ảnh (yêu cầu của giấy phép CC BY / CC BY-SA) và nguồn dữ liệu. */
export default async function CreditsPage({ params }: PageProps<'/[locale]/credits'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('credits');
  const full = await Promise.all(ELEMENTS.map((e) => readElement(e.slug)));
  const withPhoto = full.filter((e) => e.photoCredit);
  const without = full.filter((e) => !e.photoCredit);
  const name = (e: (typeof full)[number]) => (locale === 'vi' ? e.name.vi : e.name.en);

  return (
    <article className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="text-muted">{t('intro')}</p>
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">{t('photos')}</h2>
        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface shadow-card">
          {withPhoto.map((e) => {
            const c = e.photoCredit!;
            return (
              <li key={e.z} className="flex items-center gap-3 px-3 py-2 text-sm">
                <ElementPhoto
                  el={e}
                  alt=""
                  sizes="2.5rem"
                  square="mini"
                  className="size-10 shrink-0 rounded-lg"
                />
                <Link
                  href={`/element/${e.slug}`}
                  className="w-32 shrink-0 font-medium hover:underline"
                >
                  {e.z}. {name(e)}
                </Link>
                <span className="min-w-0 flex-1 truncate text-muted" title={c.title}>
                  <a
                    href={c.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {c.author}
                  </a>
                </span>
                {c.licenseUrl ? (
                  <a
                    href={c.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 font-mono text-xs hover:underline"
                  >
                    {c.license}
                  </a>
                ) : (
                  <span className="shrink-0 font-mono text-xs">{c.license}</span>
                )}
              </li>
            );
          })}
        </ul>
        <p className="text-sm text-muted">
          {t('noPhoto')} {without.map((e) => e.symbol).join(', ')}
        </p>
      </section>

      <section className="space-y-2 text-sm">
        <h2 className="font-display text-xl font-semibold">{t('data')}</h2>
        <ul className="list-disc space-y-1 pl-5 text-muted">
          <li>
            <a href="https://pubchem.ncbi.nlm.nih.gov/periodic-table/" className="hover:underline">
              PubChem Periodic Table
            </a>{' '}
            (NIH, public domain)
          </li>
          <li>
            <a
              href="https://github.com/Bowserinator/Periodic-Table-JSON"
              className="hover:underline"
            >
              Bowserinator/Periodic-Table-JSON
            </a>{' '}
            (CC BY-SA 3.0)
          </li>
          <li>
            <a href="https://images-of-elements.com/" className="hover:underline">
              Chemical Elements – A Virtual Museum (images-of-elements.com)
            </a>{' '}
            (CC BY 3.0)
          </li>
          <li>
            <a href="https://pubchem.ncbi.nlm.nih.gov/" className="hover:underline">
              PubChem
            </a>{' '}
            (NIH, public domain): cấu trúc 2D/3D và thuộc tính hợp chất
          </li>
          <li>
            Kramida, A., Ralchenko, Yu., Reader, J. and NIST ASD Team,{' '}
            <a href="https://physics.nist.gov/asd" className="hover:underline">
              NIST Atomic Spectra Database
            </a>{' '}
            (NIST, public domain): vạch phổ phát xạ
          </li>
          <li>
            <a href="https://3dmol.org/" className="hover:underline">
              3Dmol.js
            </a>{' '}
            (BSD-3-Clause): trình xem phân tử 3D
          </li>
          <li>
            <a href="https://github.com/bettergui/BeVietnamPro" className="hover:underline">
              Be Vietnam Pro
            </a>{' '}
            (SIL OFL 1.1): font chữ trong ảnh chia sẻ
          </li>
        </ul>
      </section>
    </article>
  );
}

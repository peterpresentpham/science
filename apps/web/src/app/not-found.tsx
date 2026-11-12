import { LOCALE_STORAGE_KEY } from '@/lib/locale-storage';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Trang 404 (export tĩnh: /404.html, không có layout [locale]). Chứa cả hai ngôn ngữ; script nhỏ chọn
 * ngôn ngữ theo tiền tố đường dẫn (/en/…), rồi lựa chọn đã lưu, rồi trình duyệt, và đặt giao diện
 * sáng/tối theo khoá `theme` của next-themes. Tắt JS thì hiện cả hai.
 */
const script = `(function(){var d=document.documentElement,p=location.pathname,l="",t="";
try{l=localStorage.getItem("${LOCALE_STORAGE_KEY}")||"";t=localStorage.getItem("theme")||""}catch(e){}
var m=p.replace("${BASE}","").match(/^\\/(vi|en)(\\/|$)/);
if(m)l=m[1];else if(l!=="vi"&&l!=="en"){var n=(navigator.languages||[navigator.language||""]).join(",").toLowerCase();l=/(^|,)vi/.test(n)||!/(^|,)en/.test(n)?"vi":"en"}
d.setAttribute("data-l",l);d.lang=l;
if(t==="dark")d.setAttribute("data-theme","dark")})();`;

const css = `
html[data-l='en'] [lang='vi'], html[data-l='vi'] [lang='en'] { display: none; }
`;

const TEXT = {
  vi: {
    title: 'Không tìm thấy trang',
    body: 'Nguyên tố số 404 chưa từng được phát hiện. Trang bạn tìm không tồn tại hoặc đã đổi địa chỉ.',
    home: 'Về bảng tuần hoàn',
    links: [
      ['learn', 'Ôn tập'],
      ['tools', 'Công cụ'],
      ['builder', 'Dựng phân tử'],
    ],
  },
  en: {
    title: 'Page not found',
    body: "Element 404 has never been discovered. The page you're looking for doesn't exist or has moved.",
    home: 'Back to the periodic table',
    links: [
      ['learn', 'Learn'],
      ['tools', 'Tools'],
      ['builder', 'Molecule builder'],
    ],
  },
} as const;

export default function NotFound() {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex" />
        <title>404 · Nguyên tố</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </head>
      <body className="flex min-h-dvh items-center justify-center bg-bg p-6 text-fg">
        <main className="w-full max-w-md space-y-6 text-center">
          <div
            aria-hidden
            className="mx-auto flex size-32 flex-col rounded-2xl border-2 border-fg bg-surface p-3 text-left shadow-card"
          >
            <span className="font-mono text-sm text-muted">404</span>
            <span className="mt-auto text-center font-display text-5xl leading-none font-semibold">
              Nf
            </span>
            <span className="mt-1 text-center font-mono text-[0.65rem] text-muted">not found</span>
          </div>

          {(['vi', 'en'] as const).map((l) => (
            <div key={l} lang={l} className="space-y-4">
              <h1 className="font-display text-3xl font-semibold tracking-tight">
                {TEXT[l].title}
              </h1>
              <p className="text-muted">{TEXT[l].body}</p>
              <p>
                <a
                  href={`${BASE}/${l}/`}
                  className="inline-block rounded-xl bg-fg px-4 py-2.5 text-sm font-medium text-bg outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {TEXT[l].home}
                </a>
              </p>
              <p className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                {TEXT[l].links.map(([path, label]) => (
                  <a
                    key={path}
                    href={`${BASE}/${l}/${path}/`}
                    className="underline underline-offset-2 hover:text-muted"
                  >
                    {label}
                  </a>
                ))}
              </p>
            </div>
          ))}
        </main>
      </body>
    </html>
  );
}

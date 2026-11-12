// "/" → chuyển sang /vi hoặc /en: ưu tiên lựa chọn đã lưu khi bấm đổi ngôn ngữ, sau đó mới theo
// ngôn ngữ trình duyệt (static export không có middleware).
import { LOCALE_STORAGE_KEY } from '@/lib/locale-storage';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const script = `(function(){var l=(navigator.languages||[navigator.language||""]).join(",").toLowerCase();var s="";try{s=localStorage.getItem("${LOCALE_STORAGE_KEY}")||""}catch(e){}var t=s==="vi"||s==="en"?s:/(^|,)vi/.test(l)||!/(^|,)en/.test(l)?"vi":"en";location.replace("${BASE}/"+t+"/"+location.search+location.hash);})();`;

export default function RootRedirect() {
  return (
    <html lang="vi">
      <head>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${BASE}/vi/`} />
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </head>
      <body>
        <noscript>
          <a href={`${BASE}/vi/`}>Tiếng Việt</a> · <a href={`${BASE}/en/`}>English</a>
        </noscript>
      </body>
    </html>
  );
}

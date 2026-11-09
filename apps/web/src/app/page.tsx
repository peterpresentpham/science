// "/" → chuyển sang /vi hoặc /en theo ngôn ngữ trình duyệt (static export không có middleware).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const script = `(function(){var l=(navigator.languages||[navigator.language||""]).join(",").toLowerCase();var t=/(^|,)vi/.test(l)||!/(^|,)en/.test(l)?"vi":"en";location.replace("${BASE}/"+t+"/"+location.search+location.hash);})();`;

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

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function NotFound() {
  return (
    <html lang="vi">
      <head>
        <meta name="robots" content="noindex" />
        <title>404 · Nguyên Tố</title>
      </head>
      <body style={{ fontFamily: 'system-ui', padding: '3rem', textAlign: 'center' }}>
        <h1>404</h1>
        <p>Không tìm thấy trang. · Page not found.</p>
        <p>
          <a href={`${BASE}/vi/`}>Về bảng tuần hoàn</a> ·{' '}
          <a href={`${BASE}/en/`}>Back to the table</a>
        </p>
      </body>
    </html>
  );
}

import './globals.css';

// Layout gốc chỉ chuyển tiếp: <html>/<body> nằm trong [locale]/layout.tsx để đặt đúng thuộc tính lang.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

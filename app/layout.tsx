import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#05060A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'https://sidebystar.com'),
  title: {
    default: 'SidebyStar 循星科技 - Ambient Intelligence OS',
    template: '%s · SidebyStar',
  },
  description: '循星科技正在构建环境智能时代的本地操作系统 —— 从养老院的一张床, 到未来的每一个房间。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

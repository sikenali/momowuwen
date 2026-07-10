import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { maShanzheng, zcoXiaoWei, notoSerifSC } from '@/lib/fonts';
import { LayoutContent } from './layout-client';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${maShanzheng.variable} ${zcoXiaoWei.variable} ${notoSerifSC.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.9.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className="overflow-hidden flex flex-col h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}

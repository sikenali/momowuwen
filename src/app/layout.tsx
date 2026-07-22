import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { maShanzheng, zcoXiaoWei, notoSerifSC } from '@/lib/fonts';
import { LayoutContent } from './layout-client';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/images/cover-default.svg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/cover-default.svg'],
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

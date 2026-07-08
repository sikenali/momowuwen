import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { maShanzheng, zcoXiaoWei, notoSerifSC } from '@/lib/fonts';
import './globals.css';
import { Nav } from '@/components/nav';
import { ProgressBar } from '@/components/progress-bar';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
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
      <body className="overflow-x-hidden">
        <div className="min-h-screen">
          <Nav />
          <ProgressBar />
          <main className="pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}

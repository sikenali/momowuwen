import type { Metadata } from 'next';
import { maShanzheng, zcoXiaoWei, notoSerifSC } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: '墨韵',
  description: '中国古典水墨风格个人博客',
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
      <body>{children}</body>
    </html>
  );
}

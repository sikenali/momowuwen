import Link from 'next/link';
import { RiBrushFill, RiHomeFill } from '@remixicon/react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-parchment flex flex-col items-center justify-center px-4">
      <div className="w-20 h-20 mb-8 rounded-full border-2 border-primary/30 flex items-center justify-center">
        <RiBrushFill className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-6xl sm:text-8xl text-primary font-calligraphy mb-4">404</h1>
      <p className="text-ink/50 font-body text-lg mb-8">未找到该页面</p>
      <div className="w-16 h-px bg-gold/30 mb-8" />
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-primary text-parchment font-body rounded-md hover:bg-primary/90 transition-colors"
      >
        <RiHomeFill className="w-4 h-4" />
        返回首页
      </Link>
    </div>
  );
}
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { RiBrushFill, RiHomeFill, RiBookFill, RiCodeSSlashFill, RiUserFill } from '@remixicon/react';

export function Nav() {
  const navItems = [
    { href: '/', label: '首页', icon: RiHomeFill },
    { href: '/blog', label: '博客', icon: RiBookFill },
    { href: '/projects', label: '项目', icon: RiCodeSSlashFill },
    { href: '/about', label: '关于', icon: RiUserFill },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-parchment/90 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <RiBrushFill className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
            <span className="text-xl font-calligraphy text-primary">{siteConfig.title}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 text-ink/70 hover:text-primary transition-colors font-body"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button className="md:hidden p-2 text-ink/70 hover:text-primary">
            <RiBrushFill className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
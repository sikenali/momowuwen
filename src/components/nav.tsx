'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { id: 'home', label: '首页', icon: 'ri-home-5-line', href: '/' },
  { id: 'blog', label: '我的博客', icon: 'ri-article-line', href: '/blog' },
  { id: 'projects', label: '我的项目', icon: 'ri-briefcase-4-line', href: '/projects' },
  { id: 'about', label: '关于我', icon: 'ri-user-heart-line', href: '/about' }
];

export function Nav() {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState<{ left?: string; width?: string }>({});
  const navMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === '/') setActiveNav('home');
    else if (pathname === '/blog') setActiveNav('blog');
    else if (pathname === '/projects') setActiveNav('projects');
    else if (pathname === '/about') setActiveNav('about');
  }, [pathname]);

  useEffect(() => {
    const updateIndicator = () => {
      if (!navMenuRef.current) return;
      const el = navMenuRef.current.querySelector(`[data-nav="${activeNav}"]`);
      if (el) {
        const r = (el as HTMLElement).getBoundingClientRect();
        const m = navMenuRef.current.getBoundingClientRect();
        requestAnimationFrame(() => {
          setIndicatorStyle({ left: r.left - m.left + 'px', width: r.width + 'px' });
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeNav]);

  return (
    <nav className="navbar">
      <Link href="/" className="logo-area">
        <div className="logo-seal">
          <i className="ri-quill-pen-line"></i>
        </div>
        <div className="blog-title">
          <h1>墨墨梧文</h1>
          <span>INK · CHRONICLE</span>
        </div>
      </Link>

      <div className="nav-menu" ref={navMenuRef}>
        <div
          className="nav-indicator active"
          style={indicatorStyle}
        ></div>

        {navItems.map((item) => {
          const isActive = activeNav === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              data-nav={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <i className={`${item.icon} nav-icon`}></i>
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

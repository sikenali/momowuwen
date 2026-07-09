'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { id: 'home', label: 'Home', icon: 'ri-home-5-line', href: '/' },
  { id: 'blog', label: 'Blog', icon: 'ri-book-open-line', href: '/blog' },
  { id: 'projects', label: 'Project', icon: 'ri-folder-open-line', href: '/projects' },
  { id: 'about', label: 'About', icon: 'ri-user-heart-line', href: '/about' }
];

function getActiveFromPath(p: string) {
  if (p === '/') return 'home';
  if (p === '/blog') return 'blog';
  if (p === '/projects') return 'projects';
  if (p === '/about') return 'about';
  return 'home';
}

export function Nav() {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState(getActiveFromPath(pathname));
  const [indicatorStyle, setIndicatorStyle] = useState<{ left?: string; width?: string }>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveNav(getActiveFromPath(pathname));
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateIndicator = () => {
      if (!navMenuRef.current) return;
      const el = navMenuRef.current.querySelector(`[data-nav="${activeNav}"]`);
      if (el) {
        const r = (el as HTMLElement).getBoundingClientRect();
        const m = navMenuRef.current!.getBoundingClientRect();
        setIndicatorStyle({ left: r.left - m.left + 'px', width: r.width + 'px' });
      }
    };

    updateIndicator();
    const ro = new ResizeObserver(updateIndicator);
    if (navMenuRef.current) ro.observe(navMenuRef.current);
    window.addEventListener('resize', updateIndicator);
    return () => { ro.disconnect(); window.removeEventListener('resize', updateIndicator); };
  }, [activeNav]);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
  };

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

      <div className={`nav-menu${menuOpen ? ' open' : ''}`} ref={navMenuRef}>
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
              onClick={() => handleNavClick(item.id)}
            >
              <i className={`${item.icon} nav-icon`}></i>
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="菜单">
        <i className={`ri-${menuOpen ? 'close' : 'menu'}-line`}></i>
      </button>
    </nav>
  );
}

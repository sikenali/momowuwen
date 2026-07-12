'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/site-config';

const navItems = [
  { id: 'home', label: 'Home', icon: 'ri-home-5-line', href: '/' },
  { id: 'projects', label: 'Project', icon: 'ri-fire-line', href: '/projects' },
  { id: 'blog', label: 'Blog', icon: 'ri-book-open-line', href: '/blog' },
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
  const activeNav = getActiveFromPath(pathname);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Measure indicator position once on mount + nav change, use CSS transform (GPU-composited)
  useEffect(() => {
    const updatePosition = () => {
      if (!navMenuRef.current || !indicatorRef.current) return;
      const el = navMenuRef.current.querySelector(`[data-nav="${activeNav}"]`);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const m = navMenuRef.current.getBoundingClientRect();
      indicatorRef.current.style.transform = `translateX(${r.left - m.left}px)`;
      indicatorRef.current.style.width = r.width + 'px';
    };

    // Single rAF to ensure layout is ready
    requestAnimationFrame(updatePosition);
  }, [activeNav]);

  return (
    <>
      <input
        type="checkbox"
        id="nav-toggle"
        className="nav-toggle-input"
        aria-hidden="true"
      />
      <label htmlFor="nav-toggle" className="nav-overlay" aria-hidden="true"></label>
      <div className="nav-panel" aria-hidden="true">
        <div className="nav-panel-section nav-panel-nav">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                data-nav={item.id}
                className={`nav-panel-item ${isActive ? 'active' : ''}`}
                onClick={() => { document.getElementById('nav-toggle')?.click(); }}
              >
                <i className={`${item.icon} nav-panel-icon`}></i>
                <span className="nav-panel-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
        
        <div className="nav-panel-divider"></div>
        
        <div className="nav-panel-section nav-panel-social">
          <div className="nav-panel-social-icons">
            <a href={siteConfig.social.github} className="nav-panel-social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="ri-github-fill nav-panel-icon"></i>
            </a>
            <a href={siteConfig.social.twitter} className="nav-panel-social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="ri-twitter-x-fill nav-panel-icon"></i>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="nav-panel-social-link" aria-label="Email">
              <i className="ri-mail-fill nav-panel-icon"></i>
            </a>
            <a href={siteConfig.social.rss} className="nav-panel-social-link" target="_blank" rel="noopener noreferrer" aria-label="RSS">
              <i className="ri-rss-fill nav-panel-icon"></i>
            </a>
          </div>
          <div className="nav-panel-copyright">
            <span>&copy; {new Date().getFullYear()} 墨墨梧文</span>
            <a href="https://lazycat.cloud/" target="_blank" rel="noopener noreferrer">Powered by LightOS</a>
          </div>
        </div>
      </div>
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
          ref={indicatorRef}
          className="nav-indicator active"
        ></div>

        {navItems.map((item) => {
          const isActive = activeNav === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              data-nav={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <i className={`${item.icon} nav-icon`}></i>
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <label htmlFor="nav-toggle" className="nav-hamburger" aria-label="菜单">
        <i className="ri-menu-line"></i>
      </label>
    </nav>
    </>
  );
}

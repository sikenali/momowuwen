'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Home() {
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
    const ro = new ResizeObserver(updateIndicator);
    ro.observe(navMenuRef.current!);
    window.addEventListener('resize', updateIndicator);
    return () => { ro.disconnect(); window.removeEventListener('resize', updateIndicator); };
  }, [activeNav]);

  const navItems = [
    { id: 'home', label: '首页', icon: 'ri-home-5-line', href: '/' },
    { id: 'blog', label: '我的博客', icon: 'ri-article-line', href: '/blog' },
    { id: 'projects', label: '我的项目', icon: 'ri-briefcase-4-line', href: '/projects' },
    { id: 'about', label: '关于我', icon: 'ri-user-heart-line', href: '/about' }
  ];

  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: 'rgba(250, 246, 237, 1)' }}>
      {/* 顶部导航栏 */}
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
          {/* 滑动指示器 */}
          <div 
            className={`nav-indicator ${indicatorStyle.left !== undefined ? 'active' : ''}`}
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
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  const m = navMenuRef.current;
                  if (m) {
                    const r = el.getBoundingClientRect();
                    const mr = m.getBoundingClientRect();
                    const indicator = m.querySelector('.nav-indicator');
                    if (indicator && !indicator.classList.contains('active')) {
                      (indicator as HTMLElement).style.setProperty('transition', 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease');
                      (indicator as HTMLElement).style.left = r.left - mr.left + 'px';
                      (indicator as HTMLElement).style.width = r.width + 'px';
                      (indicator as HTMLElement).style.opacity = '0.55';
                    }
                  }
                }}
                onMouseLeave={() => {
                  const m = navMenuRef.current;
                  if (m) {
                    const indicator = m.querySelector('.nav-indicator');
                    if (indicator) {
                      setTimeout(() => {
                        if (indicator && !(indicator as HTMLElement).classList.contains('active')) {
                          (indicator as HTMLElement).style.removeProperty('transition');
                        }
                      }, 350);
                    }
                  }
                }}
              >
                <div className="nav-icon-wrapper">
                  <i className={`${item.icon} nav-icon`}></i>
                  <i className={`${item.icon} nav-icon nav-icon-hover`}></i>
                </div>
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 主容器 - 紧凑布局 */}
      <div className="main-container-compact">
        {/* 云层装饰1 */}
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        {/* 主视觉区域 - 紧凑版 */}
        <section className="hero-section-compact">
          {/* 粒子装饰组 */}
          <div className="particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
            <div className="particle particle-7"></div>
          </div>

          {/* 主题印章 */}
          <div className="seal-container">
            <div className="seal-main">
              <span>墨</span>
            </div>
            <div className="seal-badge-green">
              <i className="ri-leaf-line"></i>
            </div>
            <div className="seal-badge-red">
              <i className="ri-fire-line"></i>
            </div>
          </div>

          {/* 主标题组 */}
          <div className="title-group-compact">
            <h2 className="title-main-compact">墨墨梧文</h2>
            <p className="title-sub-compact">一 个 人 的 文 字 长 征</p>
          </div>

          {/* 装饰分隔线 */}
          <div className="divider-compact">
            <div className="divider-line"></div>
            <div className="divider-dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
            <div className="divider-line"></div>
          </div>

          {/* 引言区域 - 两行显示 */}
          <div className="quote-section-compact">
            <p className="quote-text">以代码为笔，以设计为墨，在数字世界里书写属于自己的山水长卷。</p>
            <p className="quote-text">记录技术、分享思考、珍藏每一段灵感闪现的时光。</p>
          </div>

          {/* 数据统计组 - 紧凑排列 */}
          <div className="stats-section-compact">
            <div className="stat-item-compact">
              <span className="stat-number red">128</span>
              <span className="stat-label">篇文章</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number green">36</span>
              <span className="stat-label">个项目</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number gold">1024</span>
              <span className="stat-label">天坚持</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number blue">50K</span>
              <span className="stat-label">位访客</span>
            </div>
          </div>
        </section>

        {/* 云层装饰2 */}
        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      {/* 水墨山峦区域 */}
      <section className="mountain-section">
        <div className="explore-hint">
          <span className="explore-text">探索更多</span>
          <div className="scroll-icon">
            <i className="ri-arrow-down-s-line"></i>
          </div>
        </div>
        
        <div className="mountain-canvas">
          <svg className="mountain-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            {/* 远山 */}
            <path 
              d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,218.7C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
              fill="rgba(139, 115, 85, 0.1)"
            />
            {/* 中山 */}
            <path 
              d="M0,256L60,245.3C120,235,240,213,360,208C480,203,600,213,720,229.3C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
              fill="rgba(139, 115, 85, 0.15)"
            />
            {/* 近山 */}
            <path 
              d="M0,288L60,277.3C120,267,240,245,360,240C480,235,600,245,720,256C840,267,960,277,1080,272C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
              fill="rgba(44, 36, 22, 0.08)"
            />
          </svg>
        </div>
      </section>

      {/* 最新文章区域 */}
      <section className="blog-section">
        <div className="section-header">
          <div className="section-title-left">
            <div className="section-seal">
              <i className="ri-pen-nib-line"></i>
            </div>
            <h3 className="section-title">最新文章</h3>
          </div>
          <div className="view-more">
            <span>查看更多</span>
            <i className="ri-arrow-right-s-line"></i>
          </div>
        </div>

        <div className="articles-grid">
          {/* 文章卡片1 */}
          <div className="article-card">
            <div className="article-cover"></div>
            <div className="article-content">
              <div className="article-tags">
                <span className="tag">技术</span>
                <span className="tag">前端</span>
              </div>
              <h4 className="article-title">Next.js 14 全新特性解析与实战指南</h4>
              <p className="article-summary">深入探讨 Next.js 14 带来的 App Router、Server Components 等革命性变化，并通过实际项目演示如何升级和优化。</p>
              <div className="article-footer">
                <div className="article-meta">
                  <i className="ri-eye-line"></i>
                  <span>2.3K</span>
                </div>
                <div className="article-meta">
                  <i className="ri-heart-line"></i>
                  <span>128</span>
                </div>
              </div>
            </div>
          </div>

          {/* 文章卡片2 */}
          <div className="article-card">
            <div className="article-cover"></div>
            <div className="article-content">
              <div className="article-tags">
                <span className="tag">设计</span>
                <span className="tag">UI/UX</span>
              </div>
              <h4 className="article-title">水墨风格在现代网页设计中的应用</h4>
              <p className="article-summary">如何将中国传统水墨元素融入现代网页设计，创造出独特的视觉体验和用户体验。</p>
              <div className="article-footer">
                <div className="article-meta">
                  <i className="ri-eye-line"></i>
                  <span>1.8K</span>
                </div>
                <div className="article-meta">
                  <i className="ri-heart-line"></i>
                  <span>96</span>
                </div>
              </div>
            </div>
          </div>

          {/* 文章卡片3 */}
          <div className="article-card">
            <div className="article-cover"></div>
            <div className="article-content">
              <div className="article-tags">
                <span className="tag">思考</span>
                <span className="tag">成长</span>
              </div>
              <h4 className="article-title">程序员的终身学习之路</h4>
              <p className="article-summary">在技术快速迭代的时代，如何建立自己的知识体系，保持持续学习的动力和方法。</p>
              <div className="article-footer">
                <div className="article-meta">
                  <i className="ri-eye-line"></i>
                  <span>3.1K</span>
                </div>
                <div className="article-meta">
                  <i className="ri-heart-line"></i>
                  <span>215</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚区域 */}
      <footer className="footer-section">
        <div className="footer-content">
          {/* 页脚Logo */}
          <div className="footer-logo">
            <div className="footer-logo-seal">
              <i className="ri-quill-pen-fill"></i>
            </div>
            <div className="footer-blog-info">
              <h4>墨墨梧文</h4>
              <span>INK · CHRONICLE</span>
            </div>
          </div>

          {/* 社交链接 */}
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="GitHub">
              <i className="ri-github-fill"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <i className="ri-twitter-x-fill"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Email">
              <i className="ri-mail-fill"></i>
            </a>
            <a href="#" className="social-icon" aria-label="RSS">
              <i className="ri-rss-fill"></i>
            </a>
          </div>

          {/* 版权信息 */}
          <div className="copyright">
            <span>© 2024 墨墨梧文 · 默默无闻的博客</span>
          </div>
        </div>
      </footer>
      </main>
      </>
    );
  }

'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getPosts, type Post } from '@/lib/content';

const TAG_COLORS = [
  { bg: 'rgba(224,240,228,1)', color: 'rgba(74,140,109,1)' },
  { bg: 'rgba(232,240,248,1)', color: 'rgba(91,127,168,1)' },
  { bg: 'rgba(250,240,208,1)', color: 'rgba(184,134,11,1)' },
  { bg: 'rgba(253,232,228,1)', color: 'rgba(194,58,43,1)' },
  { bg: 'rgba(245,240,230,1)', color: 'rgba(92,74,50,1)' },
];

const btnColors: string[] = [
  'rgba(194,58,43,1)',
  'rgba(212,168,67,1)',
  'rgba(74,140,109,1)',
];

export default function Blog() {
  return (
    <Suspense fallback={null}>
      <BlogContent />
    </Suspense>
  );
}

function BlogContent() {
  const searchParams = useSearchParams();
  const viewSlug = searchParams.get('view');
  const [viewingSlug, setViewingSlug] = useState(viewSlug || null);
  const [activeTocIndex, setActiveTocIndex] = useState(0);
  const [baseViews, setBaseViews] = useState(520);
  const [tocItems, setTocItems] = useState<{level: number; text: string; url: string}[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const posts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  useEffect(() => {
    setViewingSlug(viewSlug);
  }, [viewSlug]);

  // Load views from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('article-views');
    if (stored) {
      setBaseViews(parseInt(stored, 10) || 520);
    }
  }, []);

  // Increment views when entering detail
  useEffect(() => {
    if (viewingSlug) {
      const stored = sessionStorage.getItem('article-views');
      const current = parseInt(stored || '520', 10);
      sessionStorage.setItem('article-views', String(current + 1));
      setBaseViews(current + 1);
    }
  }, [viewingSlug]);

  // Build TOC from post.toc and set up scroll spy
  useEffect(() => {
    if (!viewingSlug) {
      setTocItems([]);
      return;
    }

    const post = posts.find(p => p.slug === viewingSlug);
    if (!post || !post.toc || post.toc.length === 0) {
      setTocItems([]);
      return;
    }

    // Flatten nested TOC
    const flat: {level: number; text: string; url: string}[] = [];
    type TocItem = {title: string; url: string; items?: TocItem[]};
    const flatten = (items: TocItem[], depth: number) => {
      for (const item of items) {
        flat.push({
          level: depth,
          text: item.title,
          url: item.url,
        });
        if (item.items && item.items.length > 0) {
          flatten(item.items, depth + 1);
        }
      }
    };
    flatten(post.toc as TocItem[], 1);
    setTocItems(flat);
    setActiveTocIndex(0);
  }, [viewingSlug, posts]);

  // Scroll spy
  useEffect(() => {
    if (tocItems.length === 0 || !viewingSlug) return;

    const handleScroll = () => {
      const headings = tocItems.map(item => {
        const id = item.url.replace('#', '');
        return document.getElementById(id);
      }).filter(Boolean);

      let currentIndex = 0;
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            currentIndex = i;
            break;
          }
        }
      }
      setActiveTocIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems, viewingSlug]);

  // Calculate reading time based on word count
  const getReadingTime = (post: Post) => {
    const text = post.content?.replace(/<[^>]*>/g, '') || '';
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const englishWords = text.split(/\s+/).filter(w => /^[a-zA-Z]/.test(w)).length;
    const totalMinutes = Math.ceil((chineseChars / 300 + englishWords / 200) * 10) / 10;
    return Math.max(1, Math.round(totalMinutes));
  };

  if (viewingSlug) {
    const post = posts.find(p => p.slug === viewingSlug);
    if (!post) return null;

    const readingTime = getReadingTime(post);
    const displayViews = baseViews;
    const dateStr = new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <div className="detail-page-layout">
        <div className="detail-main">
          {/* 左侧内容 880px */}
          <div className="detail-content" ref={contentRef}>
            <header className="detail-header">
              <div className="detail-tags">
                {post.tags.map((tag: string, i: number) => {
                  const c = TAG_COLORS[i % TAG_COLORS.length];
                  return (
                    <span
                      key={tag}
                      className="detail-tag"
                      style={{ backgroundColor: c.bg, color: c.color }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              <h1 className="detail-title">{post.title}</h1>
              <div className="detail-meta">
                <div className="detail-meta-row">
                  <span><i className="ri-calendar-line meta-icon"></i> {dateStr}</span>
                  <span><i className="ri-book-read-line meta-icon"></i> {readingTime} 分钟阅读</span>
                  <span><i className="ri-eye-line meta-icon"></i> {displayViews} 次阅读</span>
                </div>
              </div>
            </header>

            <div className="detail-divider"></div>

            <article className="detail-body">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          </div>

          {/* 右侧边栏 */}
          <aside className="article-sidebar">
            {tocItems.length > 0 && (
              <div className="sidebar-toc">
                <h4 className="sidebar-title">目录</h4>
                <div className="toc-list">
                  {tocItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.url}
                      className={`toc-item ${i === activeTocIndex ? 'toc-item--active' : 'toc-item--default'}`}
                      onClick={(e) => e.preventDefault()}
                      onClickCapture={() => {
                        const el = document.getElementById(item.url.replace('#', ''));
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <span className="toc-number">{i + 1}</span>
                      <span className="toc-text">{item.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="sidebar-related">
              <h4 className="sidebar-title">相关推荐</h4>
              {posts.filter(p => p.slug !== viewingSlug).slice(0, 3).map((rp, i) => (
                <a
                  key={rp.slug}
                  href={`/blog?view=${rp.slug}`}
                  target="_self"
                  className="related-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="related-thumb">
                    <i className="ri-image-line"></i>
                  </div>
                  <div className="related-info">
                    <span className="related-title">{rp.title}</span>
                    <span className="related-views">{520 + i * 10} 次阅读</span>
                  </div>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-container-compact" style={{ flex: 1 }}>
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        <section className="hero-section-compact">
          <div className="seal-container">
            <div className="page-seal" data-hover-title="文 卷 轴">
              <span>卷</span>
            </div>
          </div>
          <div className="title-group-compact">
            <p className="title-sub-compact">慢 慢 翻 阅 细 细 品 味</p>
          </div>

          <div className="divider-compact">
            <div className="divider-line"></div>
            <div className="divider-dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
            <div className="divider-line"></div>
          </div>
        </section>

        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      <section className="articles-section">
        <div className="articles-list">
          {posts.map((post, i) => {
            const btnBg = btnColors[i % btnColors.length];
            return (
              <Link
                key={post.slug}
                href={`/blog?view=${post.slug}`}
                className="article-card-new"
                prefetch={false}
                target="_blank"
                onMouseEnter={() => setHoveredCardIndex(i)}
                onMouseLeave={() => setHoveredCardIndex(null)}
              >
                <div className="article-card-body">
                  <div className="article-card-content-top">
                    <div className="article-card-tags">
                      {post.tags.length > 0 && (
                        <>
                          <span
                            className="article-card-tag"
                            style={{
                              backgroundColor: 'rgba(224,240,228,1)',
                              color: 'rgba(74,140,109,1)',
                            }}
                          >
                            {post.tags[0]}
                          </span>
                          <span style={{ width: 12, height: 24, display: 'inline-block' }}></span>
                        </>
                      )}
                      {post.tags.length > 1 && (
                        <span
                          className="article-card-tag"
                          style={{
                            backgroundColor: 'rgba(232,240,248,1)',
                            color: 'rgba(91,127,168,1)',
                          }}
                        >
                          {post.tags[1]}
                        </span>
                      )}
                      <span className="article-card-date">
                        <i className="ri-calendar-line article-card-date-icon"></i>
                        {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="article-card-title">{post.title}</h3>
                  </div>
                  <div className="article-card-footer">
                    <div className="article-card-read-btn" style={{ backgroundColor: btnBg }}>
                      <span>阅读全文</span>
                      <i className={`ri-arrow-right-line arrow-${i}`}></i>
                      {hoveredCardIndex === i && (
                        <>
                          <i className="dart dart-1 ri-arrow-right-up-line"></i>
                          <i className="dart dart-2 ri-arrow-right-line"></i>
                          <i className="dart dart-3 ri-arrow-right-down-line"></i>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getPosts } from '@/lib/content';

const TAG_COLORS = [
  { bg: 'rgba(224,240,228,1)', color: 'rgba(74,140,109,1)' },
  { bg: 'rgba(232,240,248,1)', color: 'rgba(91,127,168,1)' },
  { bg: 'rgba(250,240,208,1)', color: 'rgba(184,134,11,1)' },
  { bg: 'rgba(253,232,228,1)', color: 'rgba(194,58,43,1)' },
  { bg: 'rgba(245,240,230,1)', color: 'rgba(92,74,50,1)' },
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
      let currentIndex = 0;
      for (let i = tocItems.length - 1; i >= 0; i--) {
        const id = tocItems[i].url.replace('#', '');
        const el = document.getElementById(id);
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
  const getReadingTime = (post: { content?: string }) => {
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
                      style={{ paddingLeft: `${item.level * 16 + 8}px` }}
                      onClick={(e) => e.preventDefault()}
                      onClickCapture={() => {
                        const articleBody = document.querySelector('.detail-body');
                        if (!articleBody) return;
                        const headings = Array.from(articleBody.querySelectorAll('h3, h4'));
                        const target = headings.find(h => h.textContent?.trim() === item.text);
                        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <span className="toc-number">{item.level === 0 ? i + 1 : ''}</span>
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

      <section className="latest-posts-section">
        <div className="latest-posts-header">
          <div className="latest-posts-title-group">
            <div className="latest-posts-seal">
              <i className="ri-book-open-line"></i>
            </div>
            <div className="latest-posts-title-text">
              <span className="latest-posts-title">最新文章</span>
              <span className="latest-posts-subtitle">LATEST POSTS</span>
            </div>
          </div>
          <Link href="/blog" className="latest-posts-link">
            <span>查看全部</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="latest-posts-grid">
          {posts.slice(0, 3).map((post, i) => (
            <LatestCard key={post.slug} post={post} index={i} />
          ))}
          {Array.from({ length: Math.max(0, 3 - posts.length) }).map((_, i) => (
            <LatestCard
              key={`fake-${i}`}
              post={{
                title: i === 0 ? '山水之间：CSS 绘制东方意境的艺术' : i === 1 ? '金色年华：传统配色的现代演绎' : '竹林深处：React 性能优化之道',
                description: i === 0 ? '如何用纯 CSS 创作出具有中国传统水墨画韵味的网页设计，从色彩到布局的全面探索...' : i === 1 ? '从敦煌壁画到故宫建筑，探索中国传统色彩体系在当代UI设计中的应用与创新...' : '深入探讨 React 应用的性能瓶颈与优化策略，如竹林般层层递进，直指核心问题...',
                tags: i === 0 ? ['前端开发'] : i === 1 ? ['设计思考'] : ['技术笔记'],
                date: i === 0 ? '2024-01-15' : i === 1 ? '2024-01-10' : '2024-01-05',
                slug: `fake-${i}`,
              }}
              index={i + posts.length}
            />
          ))}
        </div>
      </section>
    </>
  );
}

const blogTagColors: Record<string, { bg: string; color: string }> = {
  前端开发: { bg: 'rgba(253,232,228,1)', color: 'rgba(194,58,43,1)' },
  设计思考: { bg: 'rgba(250,240,208,1)', color: 'rgba(184,134,11,1)' },
  技术笔记: { bg: 'rgba(224,240,228,1)', color: 'rgba(74,140,109,1)' },
  默认: { bg: 'rgba(232,240,248,1)', color: 'rgba(91,127,168,1)' },
};

function LatestCard({ post, index }: { post: { title: string; description: string; tags: string[]; date: string; slug: string }; index: number }) {
  const tc = blogTagColors[post.tags[0]] || blogTagColors['默认'];
  const views = [2341, 1892, 3156][index] || 0;
  const likes = [186, 143, 267][index] || 0;

  return (
    <Link href={`/blog?view=${post.slug}`} className="latest-article-card">
      <div className="latest-card-cover">
        <img src="/images/cover-default.svg" alt={post.title} />
      </div>
      <div className="latest-card-body">
        <div className="latest-card-header">
          <span
            className="latest-card-tag"
            style={{ backgroundColor: tc.bg, color: tc.color }}
          >
            {post.tags[0]}
          </span>
          <span className="latest-card-date">
            <i className="ri-calendar-line"></i>
            {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="latest-card-title">{post.title}</h3>
        <p className="latest-card-excerpt">{post.description}</p>
        <div className="latest-card-footer">
          <span className="latest-card-stat">
            <i className="ri-eye-line"></i>
            {views.toLocaleString()}
          </span>
          <span className="latest-card-stat">
            <i className="ri-heart-line"></i>
            {likes}
          </span>
        </div>
      </div>
    </Link>
  );
}

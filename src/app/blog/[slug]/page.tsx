'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPosts } from '@/lib/content';

const TAG_COLORS = [
  { bg: 'rgba(224,240,228,1)', color: 'rgba(74,140,109,1)' },
  { bg: 'rgba(232,240,248,1)', color: 'rgba(91,127,168,1)' },
  { bg: 'rgba(250,240,208,1)', color: 'rgba(184,134,11,1)' },
  { bg: 'rgba(253,232,228,1)', color: 'rgba(194,58,43,1)' },
  { bg: 'rgba(245,240,230,1)', color: 'rgba(92,74,50,1)' },
];

const allPosts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = allPosts.find(p => p.slug === slug);

  const [activeTocIndex, setActiveTocIndex] = useState(0);
  const [baseViews, setBaseViews] = useState(520);
  const [tocItems, setTocItems] = useState<{level: number; text: string; url: string}[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;
    const key = `article-views-${post.slug}`;
    const current = parseInt(localStorage.getItem(key) || '520', 10);
    localStorage.setItem(key, String(current + 1));
    setBaseViews(current + 1);
  }, [post]);

  useEffect(() => {
    if (!post || !post.toc || post.toc.length === 0) {
      setTocItems([]);
      return;
    }

    const flat: {level: number; text: string; url: string}[] = [];
    type TocItem = {title: string; url: string; items?: TocItem[]};
    const flatten = (items: TocItem[], depth: number) => {
      for (const item of items) {
        flat.push({ level: depth, text: item.title, url: item.url });
        if (item.items && item.items.length > 0) {
          flatten(item.items, depth + 1);
        }
      }
    };
    flatten(post.toc as TocItem[], 1);
    setTocItems(flat);
    setActiveTocIndex(0);
  }, [post]);

  useEffect(() => {
    if (tocItems.length === 0 || !post) return;

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
  }, [tocItems, post]);

  if (!post) return null;

  const text = post.content?.replace(/<[^>]*>/g, '') || '';
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishWords = text.split(/\s+/).filter(w => /^[a-zA-Z]/.test(w)).length;
  const totalMinutes = Math.ceil((chineseChars / 300 + englishWords / 200) * 10) / 10;
  const readingTime = Math.max(1, Math.round(totalMinutes));

  const displayViews = baseViews;
  const d = new Date(post.date);
  const dateStr = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;

  return (
    <div className="detail-page-layout">
      <div className="detail-main">
        <div className="detail-content" ref={contentRef}>
          <header className="detail-header">
            <div className="detail-tags">
              {post.tags.map((tag: string, i: number) => {
                const c = TAG_COLORS[i % TAG_COLORS.length];
                return (
                  <span key={tag} className="detail-tag" style={{ backgroundColor: c.bg, color: c.color }}>
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

        <aside className="article-sidebar">
          {tocItems.length > 0 && (
            <div className="sidebar-toc">
              <h4 className="sidebar-title">目录</h4>
              <div className="toc-list">
                {tocItems.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    className={`toc-item ${i === activeTocIndex ? 'toc-item--active' : 'toc-item--default'}`}
                    style={{ paddingLeft: `${item.level * 16 + 8}px` }}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.url.replace('#', ''));
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="toc-text">{item.text}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar-related">
            <h4 className="sidebar-title">相关推荐</h4>
            {allPosts.filter(p => p.slug !== slug).slice(0, 3).map((rp, i) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="related-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="related-thumb">
                  <img src={rp.cover || '/images/cover-default.svg'} alt={rp.title} />
                </div>
                <div className="related-info">
                  <span className="related-title">{rp.title}</span>
                  <span className="related-views">520 次阅读</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

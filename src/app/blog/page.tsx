'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/content';
import { PageHero } from '@/components/page-hero';


function getArticleViews(slug: string): number {
  if (typeof window === 'undefined') return 0;
  const key = `article-views-${slug}`;
  return parseInt(localStorage.getItem(key) || '0', 10);
}

const allPosts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function Blog() {
  return <BlogList />;
}

function BlogList() {
  const [showAll, setShowAll] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const timerRef = useRef<number>(0);
  const limit = 15;
  const visiblePosts = showAll ? allPosts : allPosts.slice(0, limit);

  const handleLoadMore = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!showAll) setShowAll(true);
    setFeedback(true);
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setFeedback(false), 2000);
  }, [showAll]);

  return (
    <>
      <div className="main-container-compact" style={{ flex: 1 }}>
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        <PageHero seal="卷" title="慢 慢 翻 阅 细 细 品 味" hoverTitle="文 卷 轴" />

        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', maxWidth: '1294px', margin: '16px auto 0', flexWrap: 'wrap' }}>
        <style>{`.latest-article-card { flex: 1; min-width: 0; }`}</style>
        {visiblePosts.map((post) => (
          <LatestCard key={post.slug} post={post} />
        ))}
        {/* P0-02: Removed fake article filler */}
        {visiblePosts.length === 0 && (
          <div style={{ width: '100%', textAlign: 'center', padding: '48px 0', color: 'rgba(139, 115, 85, 1)' }}>
            暂无文章
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
        <span className="explore-more-text">{feedback ? '已全部加载' : '探索更多'}</span>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', height: '35px' }}>
          <a href="#" className="explore-arrow" onClick={handleLoadMore}>
            <i className="ri-arrow-down-line"></i>
          </a>
        </div>
      </div>
    </>
  );
}

const blogTagColors: Record<string, { bg: string; color: string }> = {
  前端开发: { bg: 'rgba(253,232,228,1)', color: 'rgba(194,58,43,1)' },
  设计思考: { bg: 'rgba(250,240,208,1)', color: 'rgba(184,134,11,1)' },
  技术笔记: { bg: 'rgba(224,240,228,1)', color: 'rgba(74,140,109,1)' },
  默认: { bg: 'rgba(232,240,248,1)', color: 'rgba(91,127,168,1)' },
};

function LatestCard({ post }: { post: { title: string; description: string; tags: string[]; date: string; slug: string; cover?: string; category?: string } }) {
  const tc = blogTagColors[post.tags[0]] || blogTagColors['默认'];
  const [views, setViews] = useState(0);

  useEffect(() => {
    setViews(getArticleViews(post.slug));
  }, [post.slug]);

  return (
    <Link href={`/blog/${post.slug}`} className="latest-article-card">
      <div className="latest-card-cover">
        <img src={post.cover || '/images/cover-default.svg'} alt={post.title} loading="lazy" />
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
        </div>
      </div>
    </Link>
  );
}

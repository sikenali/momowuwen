'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/content';
import { PageHero } from '@/components/page-hero';

function getArticleViews(slug: string): number {
  if (typeof window === 'undefined') return 0;
  const key = `article-views-${slug}`;
  return parseInt(localStorage.getItem(key) || '0', 10);
}

function getAllArticleViews(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  const views: Record<string, number> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('article-views-')) {
      const slug = k.replace('article-views-', '');
      views[slug] = parseInt(localStorage.getItem(k) || '0', 10);
    }
  }
  return views;
}

const allPosts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function Blog() {
  return <BlogList />;
}

function BlogList() {
  const [displayCount, setDisplayCount] = useState(3);
  const visiblePosts = allPosts.slice(0, displayCount);
  const realCount = Math.min(displayCount, allPosts.length);
  const fillerCount = Math.max(0, displayCount - realCount);
  const showLoadMore = realCount >= 3;

  const handleLoadMore = () => {
    if (displayCount < allPosts.length) {
      setDisplayCount((c) => Math.min(c + 3, allPosts.length));
    } else {
      window.location.href = '/blog';
    }
  };

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

      {displayCount <= 15 ? (
          <div style={{ display: 'flex', gap: '24px', maxWidth: '1294px', margin: '2px auto 0', flexWrap: 'wrap' }}>
          <style>{`.latest-article-card { flex: 1; min-width: 0; }`}</style>
          {visiblePosts.map((post, i) => (
            <LatestCard key={post.slug} post={post} index={i} />
          ))}
          {realCount < 3 && Array.from({ length: fillerCount }).map((_, i) => (
            <LatestCard
              key={`fake-${i}`}
              post={{
                title: i === 0 ? '山水之间：CSS 绘制东方意境的艺术' : i === 1 ? '金色年华：传统配色的现代演绎' : '竹林深处：React 性能优化之道',
                description: i === 0 ? '如何用纯 CSS 创作出具有中国传统水墨画韵味的网页设计，从色彩到布局的全面探索...' : i === 1 ? '从敦煌壁画到故宫建筑，探索中国传统色彩体系在当代UI设计中的应用与创新...' : '深入探讨 React 应用的性能瓶颈与优化策略，如竹林般层层递进，直指核心问题...',
                tags: i === 0 ? ['前端开发'] : i === 1 ? ['设计思考'] : ['技术笔记'],
                date: i === 0 ? '2024-01-15' : i === 1 ? '2024-01-10' : '2024-01-05',
                cover: '/images/cover-default.svg',
                slug: `fake-${i}`,
              }}
              index={i + allPosts.length}
            />
          ))}
        </div>
      ) : (
        <div className="latest-posts-list">
          {visiblePosts.map((post, i) => (
            <LatestCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}

      {showLoadMore && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px' }}>
          <span className="explore-more-text">探索更多</span>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', height: '35px' }}>
            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="explore-arrow"
              onClick={(e) => {
                e.preventDefault();
                handleLoadMore();
              }}
            >
              <i className="ri-arrow-down-line"></i>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

const blogTagColors: Record<string, { bg: string; color: string }> = {
  前端开发: { bg: 'rgba(253,232,228,1)', color: 'rgba(194,58,43,1)' },
  设计思考: { bg: 'rgba(250,240,208,1)', color: 'rgba(184,134,11,1)' },
  技术笔记: { bg: 'rgba(224,240,228,1)', color: 'rgba(74,140,109,1)' },
  默认: { bg: 'rgba(232,240,248,1)', color: 'rgba(91,127,168,1)' },
};

function LatestCard({ post, index }: { post: { title: string; description: string; tags: string[]; date: string; slug: string; cover?: string }; index: number }) {
  const tc = blogTagColors[post.tags[0]] || blogTagColors['默认'];
  const [views, setViews] = useState(0);

  useEffect(() => {
    setViews(getArticleViews(post.slug));
  }, [post.slug]);

  return (
    <Link href={`/blog/${post.slug}`} className="latest-article-card">
      <div className="latest-card-cover">
        <img src={post.cover || '/images/cover-default.svg'} alt={post.title} />
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
            520
          </span>
        </div>
      </div>
    </Link>
  );
}

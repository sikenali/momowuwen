'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/content';
import { PageHero } from '@/components/page-hero';
import { tagColor } from '@/lib/tag-color';

export default function Blog() {
  const allPosts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return <BlogList allPosts={allPosts} />;
}

function BlogList({ allPosts }: { allPosts: ReturnType<typeof getPosts> }) {
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
        {visiblePosts.length === 0 && (
          <div style={{ width: '100%', textAlign: 'center', padding: '48px 0', color: 'rgba(139, 115, 85, 1)' }}>
            暂无文章
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
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

const FIXED_LIKES = 520;

function LatestCard({ post }: { post: { title: string; description: string; tags: string[]; date: string; slug: string; cover?: string; category?: string } }) {
  const [clicks, setClicks] = useState(0);

  return (
    <Link href={`/blog/${post.slug}`} className="latest-article-card" onClick={() => setClicks(c => c + 1)}>
      <div className="latest-card-cover">
        <img src={post.cover || '/images/cover-default.svg'} alt={post.title} loading="lazy" />
      </div>
      <div className="latest-card-body">
        <div className="latest-card-header">
          <div className="latest-card-tags" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => {
              const c = tagColor(tag);
              return (
                <span key={tag} className="latest-card-tag" style={{ backgroundColor: c.bg, color: c.color }}>
                  {tag}
                </span>
              );
            })}
          </div>
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
            {clicks.toLocaleString()}
          </span>
          <span className="latest-card-stat latest-card-heart">
            <i className="ri-heart-line"></i>
            {FIXED_LIKES.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

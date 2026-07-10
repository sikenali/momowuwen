'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { getPosts } from '@/lib/content';

const tagColors: Record<string, { bg: string; color: string }> = {
  前端开发: { bg: 'rgba(253,232,228,1)', color: 'rgba(194,58,43,1)' },
  设计思考: { bg: 'rgba(250,240,208,1)', color: 'rgba(184,134,11,1)' },
  技术笔记: { bg: 'rgba(224,240,228,1)', color: 'rgba(74,140,109,1)' },
  默认: { bg: 'rgba(232,240,248,1)', color: 'rgba(91,127,168,1)' },
};

const btnColors: string[] = [
  'rgba(194,58,43,1)',
  'rgba(212,168,67,1)',
  'rgba(74,140,109,1)',
];

export default function Blog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewSlug = searchParams.get('view');

  // Memoize sorted posts to prevent re-sorting on every render
  const posts = useMemo(() =>
    getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  const handleBackToList = () => {
    router.replace('/blog', { scroll: false });
  };

  if (viewSlug) {
    const post = posts.find(p => p.slug === viewSlug);
    if (!post) return null;

    const dateStr = new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
    const readingTime = post.metadata?.readingTime || 5;

    return (
      <div className="detail-page-layout">
        <div className="detail-back-bar">
          <button onClick={handleBackToList} className="article-detail-back-btn">
            <i className="ri-arrow-left-line back-icon"></i>
            <span>返回列表</span>
          </button>
        </div>

        <div className="detail-main">
          <div className="detail-content">
            <header className="detail-header">
              <div className="detail-tags">
                <span className="detail-tag detail-tag--primary">{post.category}</span>
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="detail-tag">{tag}</span>
                ))}
              </div>
              <h1 className="detail-title">{post.title}</h1>
              <div className="detail-meta">
                <div className="detail-author">
                  <div className="detail-avatar">
                    <i className="ri-user-line"></i>
                  </div>
                  <div className="detail-author-info">
                    <span className="detail-author-name">墨轩主人</span>
                    <div className="detail-meta-row">
                      <span><i className="ri-calendar-line"></i> {dateStr}</span>
                      <span><i className="ri-book-read-line"></i> {readingTime} 分钟阅读</span>
                      <span><i className="ri-eye-line"></i> 267 次阅读</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="detail-divider"></div>

            <article className="detail-body">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-seal">
          <span>卷</span>
        </div>
        <h2 className="page-title">文 卷 轴</h2>
        <p className="page-subtitle">慢 慢 翻 阅 · 细 细 品 味</p>
        <div className="divider-page">
          <div className="divider-line"></div>
          <div className="divider-icon">
            <i className="ri-book-open-line"></i>
          </div>
          <div className="divider-line"></div>
        </div>
      </section>

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
              >
                <div className="article-card-body">
                  <div className="article-card-content-top">
                    <div className="article-card-tags">
                      <span
                        className="article-card-tag"
                        style={{
                          backgroundColor: 'rgba(253,232,228,1)',
                          color: 'rgba(194,58,43,1)',
                        }}
                      >
                        {post.category}
                      </span>
                      {post.tags.map((tag) => {
                        const tc = tagColors[tag] || tagColors['默认'];
                        return (
                          <span
                            key={tag}
                            className="article-card-tag"
                            style={{
                              backgroundColor: tc.bg,
                              color: tc.color,
                            }}
                          >
                            {tag}
                          </span>
                        );
                      })}
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
                      <i className="ri-arrow-right-line"></i>
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

'use client';
import { getPosts } from '@/lib/content';
import Link from 'next/link';

const posts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

const tagColors: Record<string, { bg: string; color: string }> = {
  前端开发: { bg: 'rgba(253,232,228,1)', color: 'rgba(194,58,43,1)' },
  设计思考: { bg: 'rgba(250,240,208,1)', color: 'rgba(184,134,11,1)' },
  技术笔记: { bg: 'rgba(224,240,228,1)', color: 'rgba(74,140,109,1)' },
  默认: { bg: 'rgba(232,240,248,1)', color: 'rgba(91,127,168,1)' },
};

function ArticleCard({ post, index }: { post: { title: string; description: string; tags: string[]; date: string; slug: string }; index: number }) {
  const tc = tagColors[post.tags[0]] || tagColors['默认'];
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

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="main-container-compact" style={{ flex: 1 }}>
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        <section className="hero-section-compact">
          <div className="seal-container">
            <div className="page-seal" data-hover-title="水 墨 画"><span>墨</span></div>
          </div>
          <div className="title-group-compact">
            <p className="title-sub-compact">一 个 人 的 文 字 长 征</p>
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

          <div className="quote-section-compact">
            <p className="quote-text">以代码为笔，以设计为墨，在数字世界里书写属于自己的山水长卷。</p>
          </div>

          <div className="stats-section-compact">
            <div className="stat-item-compact">
              <span className="stat-number red">{posts.length}</span>
              <span className="stat-label">篇文章</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number green">0</span>
              <span className="stat-label">个项目</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number gold">2</span>
              <span className="stat-label">天坚持</span>
            </div>
          </div>
        </section>

        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      <div className="explore-more-section">
        <span className="explore-more-text">探索更多</span>
        <a href="https://assistant.10012049.xyz/" target="_blank" rel="noopener noreferrer" className="explore-arrow">
          <i className="ri-target-line"></i>
        </a>
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
          {posts.map((post, i) => (
            <ArticleCard key={post.slug} post={post} index={i} />
          ))}
          {Array.from({ length: 3 - posts.length }).map((_, i) => (
            <ArticleCard
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
    </div>
  );
}

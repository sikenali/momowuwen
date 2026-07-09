import Link from 'next/link';
import { Footer } from '@/components/footer';
import { getPosts } from '@/lib/content';
import { RiCalendarLine } from '@remixicon/react';

export default function Blog() {
  const posts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="blog-page">
      <div className="progress-bar">
        <div className="progress-indicator"></div>
      </div>

      <section className="page-hero">
        <div className="page-seal">
          <span>卷</span>
        </div>
        <h2 className="page-title">文 章 卷 轴</h2>
        <p className="page-subtitle">慢 慢 翻 阅 · 细 细 品 味</p>
        <div className="divider-page">
          <div className="divider-line"></div>
          <div className="divider-icon">
            <i className="ri-article-line"></i>
          </div>
          <div className="divider-line"></div>
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-container">
          <div className="category-tags">
            <div className="category-tag active">
              <span>全部文章</span>
            </div>
            {posts.reduce<string[]>((cats, p) => {
              if (!cats.includes(p.category)) cats.push(p.category);
              return cats;
            }, []).map((cat) => (
              <div key={cat} className="category-tag">
                <span>{cat}</span>
              </div>
            ))}
          </div>
          <div className="search-box">
            <i className="ri-search-line"></i>
            <span className="search-placeholder">搜索文章标题或关键词...</span>
          </div>
        </div>
      </section>

      <section className="articles-section">
        <div className="articles-list">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="article-card-large">
              <div className="article-cover-large">
                {post.cover ? (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${post.cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                ) : (
                  <div className="cover-overlay" style={{
                    background: `linear-gradient(135deg, rgba(245, 240, 230, 0.8), rgba(184, 168, 138, 0.6))`
                  }} />
                )}
              </div>
              <div className="article-content-large">
                <div className="article-tags-large">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="tag-large">{tag}</span>
                  ))}
                </div>
                <h3 className="article-title-large">{post.title}</h3>
                <p className="article-excerpt">{post.description}</p>
                <div className="article-meta-large">
                  <div className="meta-item">
                    <RiCalendarLine className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

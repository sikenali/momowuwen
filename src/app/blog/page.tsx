import Link from 'next/link';
import { Suspense } from 'react';
import { BlogFilter } from '@/components/blog-filter';
import { getPosts } from '@/lib/content';
import { RiCalendarLine, RiArrowRightUpLine, RiHeart3Line, RiEyeLine, RiUserLine, RiBookReadLine } from '@remixicon/react';

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

const authorName = '墨轩主人';

export default async function Blog({ searchParams }: Props) {
  const { category, q } = await searchParams;

  let posts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const categories = posts.reduce<string[]>((cats, p) => {
    if (!cats.includes(p.category)) cats.push(p.category);
    return cats;
  }, []);

  if (category) {
    posts = posts.filter((p) => p.category === category);
  }
  if (q) {
    const lower = q.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower)),
    );
  }

  return (
    <div className="blog-page">
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

      <section className="filter-section">
        <Suspense fallback={<div className="filter-container"><div className="category-tags"><div className="category-tag active"><span>全部文章</span></div></div><div className="search-box"><i className="ri-search-line search-icon"></i><input className="search-input" placeholder="搜索文章标题或关键词..." type="text" /></div></div>}>
          <BlogFilter categories={categories} />
        </Suspense>
      </section>

      <section className="articles-section">
        {posts.length === 0 ? (
          <div className="empty-state">
            <i className="ri-inbox-line"></i>
            <p>暂无匹配的文章</p>
          </div>
        ) : (
          <div className="articles-list">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="article-card-new">
                <div className="article-card-cover">
                  {post.cover ? (
                    <div className="article-cover-img" style={{ backgroundImage: `url(${post.cover})` }} />
                  ) : (
                    <div className="article-cover-placeholder" />
                  )}
                </div>
                <div className="article-card-body">
                  <div className="article-card-content-top">
                    <div className="article-card-tags">
                      {post.tags.slice(0, 2).map((tag, i) => (
                        <span key={tag} className={`article-card-tag article-card-tag--${i === 0 ? 'green' : 'blue'}`}>{tag}</span>
                      ))}
                      <span className="article-card-date">
                        <RiCalendarLine className="article-card-date-icon" />
                        {new Date(post.date).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    <h3 className="article-card-title">{post.title}</h3>
                    <p className="article-card-desc">{post.description}</p>
                  </div>
                  <div className="article-card-footer">
                    <div className="article-card-author">
                      <div className="article-card-avatar">
                        <RiUserLine className="article-card-avatar-icon" />
                      </div>
                      <div className="article-card-author-info">
                        <span className="article-card-author-name">{authorName}</span>
                        <span className="article-card-reading">{post.metadata?.readingTime || 5} 分钟阅读</span>
                      </div>
                    </div>
                    <div className="article-card-actions">
                      <span className="article-card-stat">
                        <RiEyeLine className="article-card-stat-icon" />
                        267
                      </span>
                      <span className="article-card-stat">
                        <RiHeart3Line className="article-card-stat-icon" />
                        56
                      </span>
                      <span className="article-card-read-btn">
                        阅读全文
                        <RiArrowRightUpLine className="article-card-read-icon" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

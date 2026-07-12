import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug } from '@/lib/content';
import { MDXContent } from '@/components/mdx-content';
import { tagColor } from '@/lib/tag-color';
import Link from 'next/link';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: '文章未找到' };
  return { title: post.title, description: post.description };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const readingTime = post.metadata?.readingTime ?? 1;

  const d = new Date(post.date);
  const dateStr = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;

  return (
    <div className="detail-page-layout">
      <div className="detail-main"></div>
      <div className="detail-content">
        <header className="detail-header">
          <div className="detail-tags">
            {post.tags.map((tag) => {
              const c = tagColor(tag);
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
            </div>
          </div>
        </header>

        <div className="detail-divider"></div>

        <article className="detail-body">
          <MDXContent html={post.content} />
        </article>

        {/* P1-06: Previous/Next navigation */}
        {(prevPost || nextPost) && (
          <div className="article-navigation">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="nav-card">
                <i className="ri-arrow-left-s-line nav-arrow"></i>
                <div className="nav-card-content">
                  <span className="nav-card-label">← 上一篇</span>
                  <span className="nav-card-title">{prevPost.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="nav-card nav-card-content--end">
                <div className="nav-card-content">
                  <span className="nav-card-label">下一篇 →</span>
                  <span className="nav-card-title">{nextPost.title}</span>
                </div>
                <i className="ri-arrow-right-s-line nav-arrow"></i>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

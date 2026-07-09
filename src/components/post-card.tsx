import Link from 'next/link';
import { Post } from '@/lib/content';
import { RiCalendarLine, RiArrowRightUpLine, RiEyeLine, RiHeart3Line } from '@remixicon/react';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="post-card-new">
        <div className="post-card-cover">
          {post.cover ? (
            <div className="post-card-cover-img" style={{ backgroundImage: `url(${post.cover})` }} />
          ) : (
            <div className="post-card-cover-placeholder" />
          )}
        </div>
        <div className="post-card-body">
          <div className="post-card-tags">
            {post.tags.slice(0, 2).map((tag, i) => (
              <span key={tag} className={`post-card-tag post-card-tag--${i === 0 ? 'green' : 'blue'}`}>{tag}</span>
            ))}
            <span className="post-card-date">
              <RiCalendarLine className="post-card-date-icon" />
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </span>
          </div>
          <h3 className="post-card-title">{post.title}</h3>
          <p className="post-card-desc">{post.description}</p>
          <div className="post-card-footer">
            <div className="post-card-author">
              <div className="post-card-avatar">
                <i className="ri-user-line"></i>
              </div>
              <div className="post-card-author-info">
                <span className="post-card-author-name">墨轩主人</span>
                <span className="post-card-reading">{post.metadata?.readingTime || 5} 分钟阅读</span>
              </div>
            </div>
            <div className="post-card-actions">
              <span className="post-card-stat">
                <RiEyeLine className="post-card-stat-icon" />
                267
              </span>
              <span className="post-card-stat">
                <RiHeart3Line className="post-card-stat-icon" />
                56
              </span>
              <span className="post-card-read-btn">
                阅读全文
                <RiArrowRightUpLine className="post-card-read-icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
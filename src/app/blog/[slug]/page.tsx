'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPosts } from '@/lib/content';
import { notFound } from 'next/navigation';

const tagPalette = [
  { bg: 'rgba(194,58,43,0.1)', color: 'rgba(194,58,43,1)' },
  { bg: 'rgba(212,168,67,0.1)', color: 'rgba(184,134,11,1)' },
  { bg: 'rgba(74,140,109,0.1)', color: 'rgba(74,140,109,1)' },
  { bg: 'rgba(91,127,168,0.1)', color: 'rgba(91,127,168,1)' },
  { bg: 'rgba(160,139,106,0.1)', color: 'rgba(160,139,106,1)' },
  { bg: 'rgba(123,158,179,0.1)', color: 'rgba(123,158,179,1)' },
];

function tagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = ((hash << 5) - hash) + tag.charCodeAt(i);
  return tagPalette[Math.abs(hash) % tagPalette.length];
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<svg[^>]*on\w+\s*=/gi, '')
    .replace(/<img[^>]*on\w+\s*=/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/href\s*=\s*"javascript:/gi, 'href="#"')
    .replace(/action\s*=\s*"javascript:/gi, 'action="#"');
}

function getArticleViews(slug: string): number {
  if (typeof window === 'undefined') return 0;
  const key = `article-views-${slug}`;
  return parseInt(localStorage.getItem(key) || '0', 10);
}

function setArticleViews(slug: string, count: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`article-views-${slug}`, String(count));
}

// Debounce helper to prevent rapid view increments
const viewTimestamps = new Map<string, number>();

function shouldIncrementView(slug: string): boolean {
  const now = Date.now();
  const lastTime = viewTimestamps.get(slug) || 0;
  // Only increment once per 30 seconds per page visit
  if (now - lastTime < 30000) return false;
  viewTimestamps.set(slug, now);
  return true;
}

const allPosts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = allPosts.find(p => p.slug === slug);

  // P0-01: Call notFound() when post doesn't exist
  if (!post) notFound();

  const contentRef = useRef<HTMLDivElement>(null);
  const [displayViews, setDisplayViews] = useState(0);

  // P1-08: View counting with debounce
  useEffect(() => {
    const stored = getArticleViews(post.slug);
    setDisplayViews(stored);

    if (shouldIncrementView(post.slug)) {
      setArticleViews(post.slug, stored + 1);
      setDisplayViews(stored + 1);
    }
  }, [post.slug]);

  // P1-06: Previous/Next article navigation
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const text = post.content?.replace(/<[^>]*>/g, '') || '';
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishWords = text.split(/\s+/).filter(w => /^[a-zA-Z]/.test(w)).length;
  const totalMinutes = Math.ceil((chineseChars / 300 + englishWords / 200) * 10) / 10;
  const readingTime = Math.max(1, Math.round(totalMinutes));

  const d = new Date(post.date);
  const dateStr = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;

  return (
    <div className="detail-page-layout">
      <div className="detail-main"></div>
      <div className="detail-content" ref={contentRef}>
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
              <span><i className="ri-eye-line meta-icon"></i> {displayViews} 次阅读</span>
            </div>
          </div>
        </header>

        <div className="detail-divider"></div>

        <article className="detail-body">
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} />
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

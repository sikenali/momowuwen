import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/content';
import { MDXContent } from '@/components/mdx-content';
import { PostCard } from '@/components/post-card';
import { RiCalendarFill, RiTimeFill } from '@remixicon/react';
import Image from 'next/image';
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getPosts()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <article className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <header className="mb-12">
        {post.cover && (
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-8">
            <Image src={post.cover} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-body">
            {post.category}
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-body">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-primary font-calligraphy mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-ink/50 font-body">
          <span className="flex items-center gap-1">
            <RiCalendarFill className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('zh-CN')}
          </span>
          {post.metadata && (
            <span className="flex items-center gap-1">
              <RiTimeFill className="w-4 h-4" />
              阅读约 {post.metadata.readingTime} 分钟
            </span>
          )}
        </div>
      </header>

      <div className="mb-16">
        <MDXContent html={post.content} />
      </div>

      {relatedPosts.length > 0 && (
        <section>
          <h2 className="text-2xl text-primary font-calligraphy mb-6">相关推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => <PostCard key={rp.slug} post={rp} />)}
          </div>
        </section>
      )}

      <div className="mt-12 pt-8 border-t border-gold/20">
        <Link href="/blog" className="text-primary hover:text-gold font-body transition-colors">
          ← 返回博客列表
        </Link>
      </div>
    </article>
  );
}
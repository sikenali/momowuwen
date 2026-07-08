import { PostCard } from '@/components/post-card';
import { getPosts } from '@/lib/content';

export default function BlogPage() {
  const posts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h1 className="text-4xl sm:text-5xl text-primary font-calligraphy text-center mb-4">
        博客
      </h1>
      <p className="text-center text-ink/60 font-body mb-12">
        记录思考，分享技术
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-ink/40 font-body mt-12">
          暂无文章，敬请期待...
        </p>
      )}
    </section>
  );
}
import { Hero } from '@/components/hero';
import { PostCard } from '@/components/post-card';
import { getPosts } from '@/lib/content';
import { RiBrushFill, RiArrowRightLine, RiGithubFill, RiTwitterFill, RiMailFill, RiRssFill } from '@remixicon/react';
import Link from 'next/link';

export default function Home() {
  const posts = getPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      <Hero />

      {/* 最新文章区域 */}
      <section id="posts" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <RiBrushFill className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-calligraphy text-primary">最新文章</h2>
              <p className="text-xs text-ink/40 font-body tracking-widest">LATEST POSTS</p>
            </div>
          </div>
          <Link href="/blog" className="flex items-center gap-1 text-primary hover:text-gold transition-colors font-body text-sm">
            查看更多 <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* 页脚 */}
      <footer className="relative z-10 border-t border-gold/20 bg-parchment">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <RiBrushFill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-primary font-calligraphy text-lg">墨韵</p>
                <p className="text-xs text-ink/40 font-body">INK & SILENCE</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-ink/40 hover:text-primary transition-colors"><RiGithubFill className="w-5 h-5" /></a>
              <a href="#" className="text-ink/40 hover:text-primary transition-colors"><RiTwitterFill className="w-5 h-5" /></a>
              <a href="#" className="text-ink/40 hover:text-primary transition-colors"><RiMailFill className="w-5 h-5" /></a>
              <a href="#" className="text-ink/40 hover:text-primary transition-colors"><RiRssFill className="w-5 h-5" /></a>
            </div>

            <p className="text-xs text-ink/30 font-body">
              © 2026 墨韵. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
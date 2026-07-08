import { BlogListItem } from '@/components/blog-list-item';
import { getPosts } from '@/lib/content';
import { RiSearchLine, RiArrowLeftSLine, RiArrowRightSLine, RiBrushFill } from '@remixicon/react';
import Link from 'next/link';

const categories = ['全部', '前端', '后端', '设计', '技术笔记', '生活随笔', '读书'];

export default function BlogPage() {
  const posts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // Pad with fake posts for design demo
  const displayPosts = [...posts];
  while (displayPosts.length < 5) {
    const i = displayPosts.length;
    displayPosts.push({
      ...displayPosts[0],
      slug: `fake-post-${i}`,
      title: ['从零搭建React组件库实践', 'CSS Grid布局完全指南', '2024年前端趋势总结', '设计模式在实际项目中的应用'][i - 1] || `示例文章 ${i}`,
      description: ['记录搭建组件库过程中的设计决策与技术选型', '深入理解CSS Grid布局的各种用法与最佳实践', '总结过去一年的前端技术发展趋势', '聊聊常见设计模式在业务项目中的实际应用'][i - 1] || '这是一篇示例文章的详细描述',
      tags: [['前端', 'React'], ['CSS', '布局'], ['前端', '趋势'], ['设计模式', '架构']][i - 1] || ['技术'],
      category: ['技术', '前端', '前端', '后端'][i - 1] || '技术',
      date: new Date(Date.now() - i * 86400000 * 7).toISOString(),
      cover: undefined,
    } as any);
  }

  return (
    <div className="min-h-screen bg-parchment">
      {/* 页面标题区 */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Seal */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary/30 flex items-center justify-center">
            <RiBrushFill className="w-6 h-6 text-primary" />
          </div>

          <h1 className="text-4xl sm:text-5xl text-primary font-calligraphy mb-4">博客</h1>
          <p className="text-ink/50 font-body text-sm sm:text-base mb-6">记录思考，分享技术</p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gold/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="w-16 h-px bg-gold/30" />
          </div>
        </div>
      </section>

      {/* 筛选搜索区 */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-y border-gold/10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 text-sm font-body rounded-full transition-colors ${
                  cat === '全部'
                    ? 'bg-primary text-parchment'
                    : 'text-ink/50 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
            <input
              type="text"
              placeholder="搜索文章..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gold/20 rounded-lg text-ink/70 font-body placeholder:text-ink/30 focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16">
        <div className="space-y-6">
          {displayPosts.map((post, index) => (
            <BlogListItem key={post.slug} post={post} index={index} />
          ))}
        </div>
      </section>

      {/* 分页 */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-20">
        <div className="flex items-center justify-center gap-1">
          <button className="w-9 h-9 flex items-center justify-center rounded-lg text-ink/40 hover:text-primary hover:bg-primary/5 transition-colors">
            <RiArrowLeftSLine className="w-5 h-5" />
          </button>
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-body transition-colors ${
                p === 1 ? 'bg-primary text-parchment' : 'text-ink/50 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {p}
            </button>
          ))}
          <span className="w-9 h-9 flex items-center justify-center text-ink/30">...</span>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg text-ink/50 hover:text-primary hover:bg-primary/5 transition-colors text-sm font-body">
            末
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg text-ink/40 hover:text-primary hover:bg-primary/5 transition-colors">
            <RiArrowRightSLine className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-gold/20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <RiBrushFill className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-primary font-calligraphy">墨韵</p>
                <p className="text-[10px] text-ink/30 font-body tracking-widest">INK & SILENCE</p>
              </div>
            </div>
            <p className="text-xs text-ink/30 font-body">© 2026 墨韵. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
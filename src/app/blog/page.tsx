'use client';

import Link from 'next/link';

export default function Blog() {
  const categories = [
    { name: '全部文章', active: true },
    { name: '前端开发', active: false },
    { name: '后端架构', active: false },
    { name: '设计思考', active: false },
    { name: '技术笔记', active: false },
    { name: '生活随笔', active: false },
    { name: '读书笔记', active: false }
  ];

  const articles = [
    {
      id: 1,
      cover: 'linear-gradient(135deg, rgba(245, 208, 200, 0.8), rgba(194, 58, 43, 0.6))',
      tags: ['React', 'TypeScript'],
      title: 'Next.js 14 全新特性深度解析与实践',
      excerpt: '全面解读 Next.js 14 带来的 App Router、Server Components、Route Handlers 等核心特性，并通过实际项目演示最佳实践。',
      views: '2.3K',
      likes: 128,
      date: '2024-01-15'
    },
    {
      id: 2,
      cover: 'linear-gradient(135deg, rgba(200, 230, 201, 0.8), rgba(74, 140, 109, 0.6))',
      tags: ['Vue', '设计'],
      title: '水墨风格在现代网页设计中的创新应用',
      excerpt: '探讨如何将中国传统水墨元素与现代网页设计相结合，创造出独特的东方美学视觉体验。',
      views: '1.8K',
      likes: 96,
      date: '2024-01-12'
    },
    {
      id: 3,
      cover: 'linear-gradient(135deg, rgba(200, 215, 230, 0.8), rgba(91, 127, 168, 0.6))',
      tags: ['Node.js', '架构'],
      title: '微服务架构下的 API 网关设计与实现',
      excerpt: '深入分析微服务架构中 API 网关的核心作用，详解路由、鉴权、限流等关键功能的实现方案。',
      views: '3.1K',
      likes: 215,
      date: '2024-01-10'
    },
    {
      id: 4,
      cover: 'linear-gradient(135deg, rgba(240, 240, 235, 0.8), rgba(184, 168, 138, 0.6))',
      tags: ['CSS', '动画'],
      title: 'CSS 动画进阶：从入门到精通的完整指南',
      excerpt: '系统梳理 CSS 动画相关知识，涵盖 transition、animation、keyframes 等核心概念的实战应用技巧。',
      views: '1.5K',
      likes: 87,
      date: '2024-01-08'
    },
    {
      id: 5,
      cover: 'linear-gradient(135deg, rgba(230, 215, 200, 0.8), rgba(160, 110, 60, 0.6))',
      tags: ['数据库', '性能'],
      title: 'PostgreSQL 查询优化实战：从原理到实践',
      excerpt: '通过真实案例讲解 PostgreSQL 查询优化的核心思路，包括索引策略、执行计划分析和慢查询调优。',
      views: '2.7K',
      likes: 164,
      date: '2024-01-05'
    },
    {
      id: 6,
      cover: 'linear-gradient(135deg, rgba(220, 220, 220, 0.8), rgba(44, 36, 22, 0.6))',
      tags: ['AI', '前沿'],
      title: '大语言模型应用开发：从 Prompt 到 Agent',
      excerpt: '介绍基于大语言模型的 AI 应用开发流程，涵盖 Prompt Engineering、RAG、Agent 等核心技术栈。',
      views: '4.2K',
      likes: 298,
      date: '2024-01-02'
    }
  ];

  return (
    <>
      <main className="min-h-screen blog-page" style={{ backgroundColor: 'rgba(250, 246, 237, 1)' }}>
        {/* 滚动进度条 */}
        <div className="progress-bar">
          <div className="progress-indicator"></div>
        </div>

        {/* 顶部导航栏 */}
        <nav className="navbar">
          <Link href="/" className="logo-area">
            <div className="logo-seal">
              <i className="ri-brush-line"></i>
            </div>
            <div className="blog-title">
              <h1>墨墨梧文</h1>
              <span>INK · CHRONICLE</span>
            </div>
          </Link>
          
          <div className="nav-menu">
            <Link href="/" className="nav-item">
              <i className="ri-home-5-line"></i>
              <span>首页</span>
            </Link>
            <div className="nav-item active">
              <i className="ri-article-line"></i>
              <span>我的博客</span>
            </div>
            <Link href="/projects" className="nav-item">
              <i className="ri-briefcase-4-line"></i>
              <span>我的项目</span>
            </Link>
            <div className="nav-item">
              <i className="ri-user-heart-line"></i>
              <span>关于我</span>
            </div>
          </div>
        </nav>

        {/* 页面标题区 */}
        <section className="page-hero">
          {/* 装饰粒子 */}
          <div className="particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
          </div>

          {/* 装饰印章 */}
          <div className="page-seal">
            <span>卷</span>
          </div>

          {/* 页面标题 */}
          <h2 className="page-title">文 章 卷 轴</h2>
          
          {/* 副标题 */}
          <p className="page-subtitle">慢 慢 翻 阅 · 细 细 品 味</p>

          {/* 装饰分隔线 */}
          <div className="divider-page">
            <div className="divider-line"></div>
            <div className="divider-icon">
              <i className="ri-article-line"></i>
            </div>
            <div className="divider-line"></div>
          </div>
        </section>

        {/* 筛选搜索区 */}
        <section className="filter-section">
          <div className="filter-container">
            {/* 分类标签组 */}
            <div className="category-tags">
              {categories.map((cat, index) => (
                <div 
                  key={index}
                  className={`category-tag ${cat.active ? 'active' : ''}`}
                >
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>

            {/* 搜索框 */}
            <div className="search-box">
              <i className="ri-search-line"></i>
              <span className="search-placeholder">搜索文章标题或关键词...</span>
            </div>
          </div>
        </section>

        {/* 文章列表区 */}
        <section className="articles-section">
          <div className="articles-list">
            {articles.map((article) => (
              <article key={article.id} className="article-card-large">
                {/* 封面区 */}
                <div 
                  className="article-cover-large"
                  style={{ background: article.cover }}
                >
                  <div className="cover-overlay"></div>
                </div>

                {/* 内容区 */}
                <div className="article-content-large">
                  {/* 标签 */}
                  <div className="article-tags-large">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="tag-large">{tag}</span>
                    ))}
                  </div>

                  {/* 标题 */}
                  <h3 className="article-title-large">{article.title}</h3>
                  
                  {/* 摘要 */}
                  <p className="article-excerpt">{article.excerpt}</p>

                  {/* 底部信息 */}
                  <div className="article-meta-large">
                    <div className="meta-item">
                      <i className="ri-eye-line"></i>
                      <span>{article.views}</span>
                    </div>
                    <div className="meta-item">
                      <i className="ri-heart-line"></i>
                      <span>{article.likes}</span>
                    </div>
                    <div className="meta-item">
                      <i className="ri-calendar-line"></i>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 页脚区域 */}
        <footer className="footer-section">
          <div className="footer-content">
            {/* 页脚Logo */}
            <div className="footer-logo">
              <div className="footer-logo-seal">
                <i className="ri-brush-fill"></i>
              </div>
              <div className="footer-blog-info">
                <h4>墨墨梧文</h4>
                <span>INK · CHRONICLE</span>
              </div>
            </div>

            {/* 社交链接 */}
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="GitHub">
                <i className="ri-github-fill"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <i className="ri-twitter-x-fill"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Email">
                <i className="ri-mail-fill"></i>
              </a>
              <a href="#" className="social-icon" aria-label="RSS">
                <i className="ri-rss-fill"></i>
              </a>
            </div>

            {/* 版权信息 */}
            <div className="copyright">
              <span>© 2024 墨墨梧文 · 默默无闻的博客</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

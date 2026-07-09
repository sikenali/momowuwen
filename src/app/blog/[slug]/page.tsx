'use client';

import { RiArrowLeftLine, RiArrowRightLine, RiHeartLine, RiBookmarkLine, RiShareForwardLine, RiWechatFill, RiTwitterXFill, RiLinksLine, RiUserLine, RiCalendarLine, RiBookReadLine, RiEyeLine } from '@remixicon/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const mockPost = {
  title: '竹林深处：React 性能优化之道',
  subtitle: '深入探讨 React 应用的性能瓶颈与优化策略，如竹林般层层递进，直指核心问题',
  date: '2024-01-05',
  category: '技术笔记',
  author: '墨轩主人',
  tags: ['React', '性能优化', '前端开发', 'JavaScript'],
  readingTime: 12,
  views: 3156,
  toc: [
    { level: 1, title: '理解 React 的渲染机制' },
    { level: 2, title: 'memo、useMemo、useCallback' },
    { level: 2, title: '代码分割与懒加载' },
    { level: 2, title: '虚拟列表与大数据渲染' },
    { level: 2, title: '总结与展望' },
  ],
  sections: [
    {
      heading: '一、理解 React 的渲染机制',
      paragraphs: [
        'React 的性能问题往往源于不必要的重新渲染。理解 React 的渲染流程是优化的第一步。当一个组件的 state 或 props 发生变化时，React 会重新执行该组件的渲染函数，生成新的虚拟 DOM 树，然后通过 Diff 算法对比新旧树的差异，最后将最小化的 DOM 操作应用到真实 DOM 上。',
        '关键在于：每次渲染都会创建新的对象和函数引用。如果这些新引用被传递给子组件，即使内容没有变化，子组件也可能因为 props 引用改变而重新渲染。这就是为什么理解渲染机制如此重要。',
      ],
    },
    {
      heading: '二、memo、useMemo、useCallback',
      paragraphs: [
        'React 提供了多种记忆化 API 来避免不必要的渲染。React.memo 可以阻止函数组件在 props 未变化时重新渲染。useMemo 可以缓存计算结果，避免每次渲染都重新计算。useCallback 可以缓存函数引用，防止子组件因函数引用变化而重新渲染。',
        '但需要注意的是，这些 API 并非银弹。过度使用反而会增加内存开销和维护成本。正确的做法是：先用 React DevTools Profiler 定位真正的性能瓶颈，再有针对性地使用记忆化 API。',
      ],
    },
    {
      heading: '三、代码分割与懒加载',
      paragraphs: [
        '代码分割是将应用拆分成多个小块，按需加载的技术。在 React 中，可以通过 React.lazy 和 Suspense 实现组件级别的懒加载。对于路由级别的代码分割，可以使用 React Router 的动态 import()。',
        '以下是一个典型的路由懒加载示例：',
      ],
      code: `import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`,
    },
    {
      heading: '四、虚拟列表与大数据渲染',
      paragraphs: [
        '当列表数据量达到数千甚至数万条时，即使每个列表项都很简单，DOM 节点的数量也会成为性能瓶颈。虚拟列表（Virtual List）技术通过只渲染可视区域内的元素，将 DOM 节点数量控制在合理范围内。',
        '常用的虚拟列表库包括 react-window 和 react-virtuoso。react-window 轻量高效，适合大多数场景；react-virtuoso 则提供了更丰富的功能，如动态高度、分组、粘性头部等。选择哪个库取决于你的具体需求。',
      ],
      table: {
        title: '虚拟列表方案对比',
        headers: ['方案', '包体积', '核心特性', '适用场景'],
        rows: [
          { cells: ['react-window', '~6KB', '固定/可变高度、水平滚动', '简单列表、性能要求高的场景'] },
          { cells: ['react-virtuoso', '~15KB', '动态高度、分组、粘性头部', '复杂列表、聊天消息、社交媒体'] },
          { cells: ['自实现', '0KB', '完全可控、按需定制', '有特殊需求、团队有维护能力'] },
        ],
      },
    },
    {
      heading: '五、总结与展望',
      paragraphs: [
        '性能优化不是一蹴而就的事情，而是一个持续迭代的过程。正如竹林需要日复一日的精心养护，React 应用的性能也需要我们在日常开发中不断关注和改进。从理解渲染机制开始，到合理使用 memo 系列 API，再到代码分割和虚拟列表——每一步都是通往高性能应用的必经之路。',
        '记住：过早优化是万恶之源，但完全不优化同样不可取。在性能问题出现之前，建立良好的代码结构和性能意识；在问题出现之后，用工具（如 React DevTools Profiler）定位瓶颈，有针对性地进行优化。这才是真正的"性能优化之道"。',
      ],
    },
  ],
  prevPost: { title: '金色年华：传统配色的现代演绎' },
  nextPost: { title: '云端漫步：微服务架构设计实践' },
};

export default function ArticleDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="article-detail-page">
      {/* 顶部返回导航 */}
      <div className="article-detail-back">
        <Link href="/blog" className="article-detail-back-btn">
          <RiArrowLeftLine className="back-icon" />
          <span>返回文章列表</span>
        </Link>
      </div>

      {/* 文章头部 */}
      <article className="article-detail-header">
        {/* 标签行 */}
        <div className="article-header-tags">
          <span className="article-header-tag article-header-tag--green">技术笔记</span>
          <span className="article-header-tag article-header-tag--blue">React</span>
        </div>

        {/* 标题 */}
        <h1 className="article-detail-title">{mockPost.title}</h1>

        {/* 副标题 */}
        <p className="article-detail-subtitle">深入探讨 React 应用的性能瓶颈与优化策略，如竹林般层层递进，直指核心问题</p>

        {/* 作者信息行 */}
        <div className="article-author-row">
          <div className="article-author-avatar">
            <RiUserLine className="author-avatar-icon" />
          </div>
          <div className="article-author-info">
            <span className="article-author-name">{mockPost.author}</span>
            <div className="article-author-meta">
              <RiCalendarLine className="meta-icon" />
              <span className="meta-text">{new Date(mockPost.date).toLocaleDateString('zh-CN')}</span>
              <span className="meta-separator"></span>
              <RiBookReadLine className="meta-icon" />
              <span className="meta-text">{mockPost.readingTime} 分钟阅读</span>
              <span className="meta-separator"></span>
              <RiEyeLine className="meta-icon" />
              <span className="meta-text">{mockPost.views.toLocaleString()} 次阅读</span>
            </div>
          </div>
        </div>

        {/* 封面大图 */}
        <div className="article-cover-image">
          <img src="https://picsum.photos/seed/react-perf/1280/480" alt={mockPost.title} />
        </div>
      </article>

      {/* 双栏布局 */}
      <div className="article-detail-layout">
        {/* 左侧内容 */}
        <div className="article-detail-content">
          {mockPost.sections.map((section, i) => (
            <div key={i} className="article-section">
              <h2 className="article-section-title">
                <span className="section-marker"></span>
                {section.heading}
              </h2>
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="article-paragraph">{p}</p>
              ))}
              {section.code && (
                <pre className="article-code-block"><code>{section.code}</code></pre>
              )}
              {section.table && (
                <div className="article-table">
                  <p className="article-table-title">{section.table.title}</p>
                  <table>
                    <thead>
                      <tr>
                        {section.table.headers.map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.cells.map((cell, ci) => (
                            <td key={ci}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {/* 标签区 */}
          <div className="article-tags-section">
            <span className="article-tags-label">标签：</span>
            {mockPost.tags.map(tag => (
              <span key={tag} className="article-tag-pill">{tag}</span>
            ))}
          </div>

          {/* 分享互动区 */}
          <div className="article-interaction">
            <div className="interaction-left">
              <button className="interaction-btn interaction-btn--like">
                <RiHeartLine className="interaction-icon" />
                <span>267</span>
              </button>
              <button className="interaction-btn interaction-btn--bookmark">
                <RiBookmarkLine className="interaction-icon" />
                <span>收藏</span>
              </button>
            </div>
            <div className="interaction-right">
              <span className="share-label">分享至</span>
              <button className="share-btn share-btn--wechat">
                <RiWechatFill />
              </button>
              <button className="share-btn share-btn--twitter">
                <RiTwitterXFill />
              </button>
              <button className="share-btn share-btn--copy">
                <RiLinksLine />
              </button>
            </div>
          </div>

          {/* 文章导航 */}
          <div className="article-navigation">
            <Link href="#" className="nav-card nav-card--prev">
              <RiArrowLeftLine className="nav-arrow" />
              <div className="nav-card-content">
                <span className="nav-card-label">上一篇</span>
                <span className="nav-card-title">{mockPost.prevPost.title}</span>
              </div>
            </Link>
            <Link href="#" className="nav-card nav-card--next">
              <div className="nav-card-content nav-card-content--end">
                <span className="nav-card-label">下一篇</span>
                <span className="nav-card-title">{mockPost.nextPost.title}</span>
              </div>
              <RiArrowRightLine className="nav-arrow" />
            </Link>
          </div>
        </div>

        {/* 右侧边栏 */}
        <aside className="article-sidebar">
          {/* 目录导航 */}
          <div className="sidebar-toc">
            <h3 className="sidebar-title">目录</h3>
            {mockPost.toc.map((item, i) => (
              <div key={i} className={`toc-item toc-item--${item.level === 1 ? 'active' : 'default'}`}>
                <span className="toc-number">{i + 1}</span>
                <span className="toc-text">{item.title}</span>
              </div>
            ))}
          </div>

          {/* 相关推荐 */}
          <div className="sidebar-related">
            <h3 className="sidebar-title">相关推荐</h3>
            {[
              { title: '山水之间：CSS 绘制东方意境的艺术', views: '2,341 次阅读', img: 'https://picsum.photos/seed/a/162/112' },
              { title: '金色年华：传统配色的现代演绎', views: '1,892 次阅读', img: 'https://picsum.photos/seed/b/162/112' },
              { title: '云端漫步：微服务架构设计实践', views: '2,087 次阅读', img: 'https://picsum.photos/seed/c/162/112' },
            ].map((item, i) => (
              <div key={i} className="related-card">
                <img src={item.img} alt="" className="related-thumb" />
                <div className="related-info">
                  <span className="related-title">{item.title}</span>
                  <span className="related-views">{item.views}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

'use client';

import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: 'rgba(250, 246, 237, 1)' }}>
      <Nav />

      {/* 主容器 - 紧凑布局 */}
      <div className="main-container-compact">
        {/* 云层装饰1 */}
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        {/* 主视觉区域 - 紧凑版 */}
        <section className="hero-section-compact">
          {/* 主题印章 */}
          <div className="seal-container">
            <div className="seal-main">
              <span>墨</span>
            </div>
            <div className="seal-badge-green">
              <i className="ri-leaf-line"></i>
            </div>
            <div className="seal-badge-red">
              <i className="ri-fire-line"></i>
            </div>
          </div>

          {/* 主标题组 */}
          <div className="title-group-compact">
            <h2 className="title-main-compact">墨墨梧文</h2>
            <p className="title-sub-compact">一 个 人 的 文 字 长 征</p>
          </div>

          {/* 装饰分隔线 */}
          <div className="divider-compact">
            <div className="divider-line"></div>
            <div className="divider-dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
            <div className="divider-line"></div>
          </div>

          {/* 引言区域 - 两行显示 */}
          <div className="quote-section-compact">
            <p className="quote-text">以代码为笔，以设计为墨，在数字世界里书写属于自己的山水长卷。</p>
            <p className="quote-text">记录技术、分享思考、珍藏每一段灵感闪现的时光。</p>
          </div>

          {/* 数据统计组 - 紧凑排列 */}
          <div className="stats-section-compact">
            <div className="stat-item-compact">
              <span className="stat-number red">128</span>
              <span className="stat-label">篇文章</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number green">36</span>
              <span className="stat-label">个项目</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number gold">1024</span>
              <span className="stat-label">天坚持</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number blue">50K</span>
              <span className="stat-label">位访客</span>
            </div>
          </div>
        </section>

        {/* 云层装饰2 */}
        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      {/* 水墨山峦区域 */}
      <section className="mountain-section">
        <div className="explore-hint">
          <span className="explore-text">探索更多</span>
          <div className="scroll-icon">
            <i className="ri-arrow-down-s-line"></i>
          </div>
        </div>
        
        <div className="mountain-canvas">
          <svg className="mountain-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            {/* 远山 */}
            <path 
              d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,218.7C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
              fill="rgba(139, 115, 85, 0.1)"
            />
            {/* 中山 */}
            <path 
              d="M0,256L60,245.3C120,235,240,213,360,208C480,203,600,213,720,229.3C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
              fill="rgba(139, 115, 85, 0.15)"
            />
            {/* 近山 */}
            <path 
              d="M0,288L60,277.3C120,267,240,245,360,240C480,235,600,245,720,256C840,267,960,277,1080,272C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
              fill="rgba(44, 36, 22, 0.08)"
            />
          </svg>
        </div>
      </section>

      {/* 最新文章区域 */}
      <section className="blog-section">
        <div className="section-header">
          <div className="section-title-left">
            <div className="section-seal">
              <i className="ri-pen-nib-line"></i>
            </div>
            <h3 className="section-title">最新文章</h3>
          </div>
          <div className="view-more">
            <span>查看更多</span>
            <i className="ri-arrow-right-s-line"></i>
          </div>
        </div>

        <div className="articles-grid">
          {/* 文章卡片1 */}
          <div className="article-card">
            <div className="article-cover"></div>
            <div className="article-content">
              <div className="article-tags">
                <span className="tag">技术</span>
                <span className="tag">前端</span>
              </div>
              <h4 className="article-title">Next.js 14 全新特性解析与实战指南</h4>
              <p className="article-summary">深入探讨 Next.js 14 带来的 App Router、Server Components 等革命性变化，并通过实际项目演示如何升级和优化。</p>
              <div className="article-footer">
                <div className="article-meta">
                  <i className="ri-eye-line"></i>
                  <span>2.3K</span>
                </div>
                <div className="article-meta">
                  <i className="ri-heart-line"></i>
                  <span>128</span>
                </div>
              </div>
            </div>
          </div>

          {/* 文章卡片2 */}
          <div className="article-card">
            <div className="article-cover"></div>
            <div className="article-content">
              <div className="article-tags">
                <span className="tag">设计</span>
                <span className="tag">UI/UX</span>
              </div>
              <h4 className="article-title">水墨风格在现代网页设计中的应用</h4>
              <p className="article-summary">如何将中国传统水墨元素融入现代网页设计，创造出独特的视觉体验和用户体验。</p>
              <div className="article-footer">
                <div className="article-meta">
                  <i className="ri-eye-line"></i>
                  <span>1.8K</span>
                </div>
                <div className="article-meta">
                  <i className="ri-heart-line"></i>
                  <span>96</span>
                </div>
              </div>
            </div>
          </div>

          {/* 文章卡片3 */}
          <div className="article-card">
            <div className="article-cover"></div>
            <div className="article-content">
              <div className="article-tags">
                <span className="tag">思考</span>
                <span className="tag">成长</span>
              </div>
              <h4 className="article-title">程序员的终身学习之路</h4>
              <p className="article-summary">在技术快速迭代的时代，如何建立自己的知识体系，保持持续学习的动力和方法。</p>
              <div className="article-footer">
                <div className="article-meta">
                  <i className="ri-eye-line"></i>
                  <span>3.1K</span>
                </div>
                <div className="article-meta">
                  <i className="ri-heart-line"></i>
                  <span>215</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </main>
      </>
    );
  }

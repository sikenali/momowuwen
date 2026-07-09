'use client';

import Link from 'next/link';

export default function About() {
  return (
    <>
      <main className="min-h-screen about-page" style={{ backgroundColor: 'rgba(250, 246, 237, 1)' }}>
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
            <Link href="/blog" className="nav-item">
              <i className="ri-article-line"></i>
              <span>我的博客</span>
            </Link>
            <Link href="/projects" className="nav-item">
              <i className="ri-briefcase-4-line"></i>
              <span>我的项目</span>
            </Link>
            <div className="nav-item active">
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
            <div className="particle particle-5"></div>
          </div>

          {/* 装饰印章 */}
          <div className="page-seal-about">
            <span>我</span>
          </div>

          {/* 页面标题 */}
          <h2 className="page-title">关 于 我</h2>
          
          {/* 副标题 */}
          <p className="page-subtitle">墨 轩 主 人 · 个 人 简 介</p>

          {/* 装饰分隔线 */}
          <div className="divider-page">
            <div className="divider-line"></div>
            <div className="divider-icon">
              <i className="ri-user-heart-line"></i>
            </div>
            <div className="divider-line"></div>
          </div>

          {/* 引言 */}
          <p className="page-quote">一名热爱技术与设计的全栈工程师，在代码世界里不断取经的行者。</p>
        </section>

        {/* 个人信息区 */}
        <section className="info-section">
          <div className="info-container">
            {/* 区域标题 */}
            <div className="section-title">
              <div className="title-seal">
                <i className="ri-user-heart-line"></i>
              </div>
              <div className="title-text">
                <h3>关于墨轩主人</h3>
                <span>ABOUT ME</span>
              </div>
            </div>

            {/* 基本信息 */}
            <div className="basic-info">
              <div className="info-item">
                <div className="info-icon info-icon--red">
                  <i className="ri-user-line"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">姓名</span>
                  <span className="info-value">墨轩主人</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon info-icon--green">
                  <i className="ri-briefcase-line"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">职业</span>
                  <span className="info-value">全栈工程师 / 独立开发者</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon info-icon--gold">
                  <i className="ri-map-pin-line"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">坐标</span>
                  <span className="info-value">中国 · 杭州</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon info-icon--blue">
                  <i className="ri-graduation-cap-line"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">学历</span>
                  <span className="info-value">计算机科学与技术 · 硕士</span>
                </div>
              </div>
            </div>

            {/* 四大角色卡片 */}
            <div className="roles-grid">
              {/* 角色1 - 码农 */}
              <div className="role-card">
                <div className="role-icon role-icon--coder">
                  <i className="ri-code-s-slash-line"></i>
                </div>
                <h4 className="role-title">码农</h4>
                <p className="role-desc">
                  日以继夜地与代码为伴，在键盘上敲击出一个个功能模块。从前端到后端，从数据库到部署，
                  每一个字符都承载着对技术的热爱与执着。
                </p>
                <div className="role-stats">
                  <div className="stat">
                    <i className="ri-code-line"></i>
                    <span>10万+</span>
                  </div>
                  <div className="stat">
                    <i className="ri-calendar-line"></i>
                    <span>5年</span>
                  </div>
                </div>
              </div>

              {/* 角色2 - 设计师 */}
              <div className="role-card">
                <div className="role-icon role-icon--designer">
                  <i className="ri-palette-line"></i>
                </div>
                <h4 className="role-title">设计师</h4>
                <p className="role-desc">
                  相信好的设计能让产品焕发新生。从用户研究到交互设计，从视觉呈现到动效打磨，
                  每一个像素都追求极致的美感与易用性的平衡。
                </p>
                <div className="role-stats">
                  <div className="stat">
                    <i className="ri-paint-brush-line"></i>
                    <span>50+</span>
                  </div>
                  <div className="stat">
                    <i className="ri-heart-line"></i>
                    <span>热爱</span>
                  </div>
                </div>
              </div>

              {/* 角色3 - 写作者 */}
              <div className="role-card">
                <div className="role-icon role-icon--writer">
                  <i className="ri-quill-pen-line"></i>
                </div>
                <h4 className="role-title">写作者</h4>
                <p className="role-desc">
                  以文字记录思考，用博客沉淀经验。从技术文章到生活随笔，
                  每一篇都是对知识的梳理与对世界的观察。墨墨梧文就是这片自留地。
                </p>
                <div className="role-stats">
                  <div className="stat">
                    <i className="ri-article-line"></i>
                    <span>200+</span>
                  </div>
                  <div className="stat">
                    <i className="ri-read-line"></i>
                    <span>10万+</span>
                  </div>
                </div>
              </div>

              {/* 角色4 - 探索者 */}
              <div className="role-card">
                <div className="role-icon role-icon--explorer">
                  <i className="ri-compass-3-line"></i>
                </div>
                <h4 className="role-title">探索者</h4>
                <p className="role-desc">
                  永远保持好奇，永远在路上。从新技术到新模式，从开源社区到行业会议，
                  每一次探索都是为了遇见更好的自己，创造更大的价值。
                </p>
                <div className="role-stats">
                  <div className="stat">
                    <i className="ri-global-line"></i>
                    <span>30+</span>
                  </div>
                  <div className="stat">
                    <i className="ri-lightbulb-line"></i>
                    <span>无限</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 白龙马 - 伙伴 */}
            <div className="partner-section">
              <div className="partner-card">
                <div className="partner-icon">
                  <i className="ri-horse-line"></i>
                </div>
                <div className="partner-content">
                  <h4 className="partner-title">白龙马 · 最佳伙伴</h4>
                  <p className="partner-desc">
                    如白龙马般默默耕耘，如取经路般坚持不懈。技术之路没有捷径，
                    唯有脚踏实地，一步一个脚印，方能取得真经。
                  </p>
                </div>
              </div>
            </div>
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

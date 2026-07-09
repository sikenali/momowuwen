'use client';

import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function About() {
  return (
    <>
      <main className="min-h-screen about-page" style={{ backgroundColor: 'rgba(250, 246, 237, 1)' }}>
        <Nav />

        {/* 页面标题区 */}
        <section className="page-hero">
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
          <div className="about-container">
            {/* 区域标题 */}
            <div className="about-title-row">
              <div className="about-title-seal">
                <i className="ri-user-heart-line"></i>
              </div>
              <div className="about-title-text">
                <h3>关于墨轩主人</h3>
                <span>ABOUT ME</span>
              </div>
            </div>

            {/* 信息行 */}
            <div className="about-info-row">
              <div className="about-info-item">
                <div className="about-icon-box" style={{ backgroundColor: 'rgba(253,232,228,1)', color: 'rgba(194,58,43,1)' }}>
                  <i className="ri-user-line"></i>
                </div>
                <div className="about-info-content">
                  <span className="about-info-label">姓名</span>
                  <span className="about-info-value">墨轩主人</span>
                </div>
              </div>

              <div className="about-info-item">
                <div className="about-icon-box" style={{ backgroundColor: 'rgba(224,240,228,1)', color: 'rgba(74,140,109,1)' }}>
                  <i className="ri-briefcase-line"></i>
                </div>
                <div className="about-info-content">
                  <span className="about-info-label">职业</span>
                  <span className="about-info-value">全栈工程师 / 独立开发者</span>
                </div>
              </div>

              <div className="about-info-item">
                <div className="about-icon-box" style={{ backgroundColor: 'rgba(250,240,208,1)', color: 'rgba(184,134,11,1)' }}>
                  <i className="ri-map-pin-line"></i>
                </div>
                <div className="about-info-content">
                  <span className="about-info-label">坐标</span>
                  <span className="about-info-value">中国 · 杭州</span>
                </div>
              </div>

              <div className="about-info-item">
                <div className="about-icon-box" style={{ backgroundColor: 'rgba(232,240,248,1)', color: 'rgba(91,127,168,1)' }}>
                  <i className="ri-graduation-cap-line"></i>
                </div>
                <div className="about-info-content">
                  <span className="about-info-label">邮箱</span>
                  <span className="about-info-value">hello@moyunxuan.dev</span>
                </div>
              </div>
            </div>

            {/* 个人简介 */}
            <div className="about-bio">
              <p>大家好，我是墨轩主人。一名热爱技术与设计的全栈工程师，也是一个在代码世界里不断取经的行者。</p>
              <p>从前端到后端，从设计到产品，我始终保持着对新技术的好奇心与探索欲。我相信，优秀的产品源于对细节的极致追求，正如传统水墨画作，每一笔都蕴含着匠心。</p>
              <p>这个博客是我的"藏经阁"，记录着技术路上的所思所得。愿我们都能在各自的取经路上，不忘初心，终得真经。</p>
            </div>

            {/* 签名 */}
            <div className="about-signature">
              <div className="about-signature-text">
                <span className="about-signature-name">— 墨轩主人</span>
                <span className="about-signature-date">甲辰年冬 于西湖畔</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

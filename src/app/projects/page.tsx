'use client';

import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function Projects() {
  const projects = [
    {
      id: '壹',
      name: '赤焰',
      fullTitle: '赤焰 · 设计系统',
      gradient: ['rgba(245, 208, 200, 1)', 'rgba(194, 58, 43, 1)'],
      icon: 'ri-brush-4-line',
      tags: [{ name: 'React', color: '#c23a2b', bg: '#fde8e4' }],
      description: '一套基于东方美学的企业级 React 组件库，包含 60+ 精美组件，支持主题定制与国际化。',
      stars: '2.3k',
      forks: '856',
      license: 'MIT'
    },
    {
      id: '贰',
      name: '青鸾',
      fullTitle: '青鸾 · 全栈框架',
      gradient: ['rgba(200, 230, 201, 1)', 'rgba(74, 140, 109, 1)'],
      icon: 'ri-code-s-slash-line',
      tags: [{ name: 'Vue', color: '#4a8c6d', bg: '#c8e6c9' }],
      description: '基于 Vue 3 的全栈开发框架，集成路由、状态管理、API 请求等核心功能，助力快速开发。',
      stars: '1.8k',
      forks: '623',
      license: 'Apache 2.0'
    },
    {
      id: '叁',
      name: '玄冥',
      fullTitle: '玄冥 · 数据中台',
      gradient: ['rgba(200, 215, 230, 1)', 'rgba(91, 127, 168, 1)'],
      icon: 'ri-database-2-line',
      tags: [{ name: 'Node.js', color: '#5b7fa8', bg: '#c8d7e6' }],
      description: '企业级数据中台解决方案，提供数据采集、处理、可视化全流程能力，支撑百万级数据并发。',
      stars: '1.5k',
      forks: '412',
      license: 'MPL 2.0'
    },
    {
      id: '肆',
      name: '白玉',
      fullTitle: '白玉 · 文档引擎',
      gradient: ['rgba(240, 240, 235, 1)', 'rgba(184, 168, 138, 1)'],
      icon: 'ri-file-text-line',
      tags: [{ name: 'Markdown', color: '#b8a88a', bg: '#f0f0eb' }],
      description: '高性能 Markdown 文档引擎，支持版本管理、全文搜索、多语言翻译，打造知识管理体系。',
      stars: '986',
      forks: '234',
      license: 'BSD 3'
    },
    {
      id: '伍',
      name: '紫金',
      fullTitle: '紫金 · 区块链平台',
      gradient: ['rgba(230, 215, 200, 1)', 'rgba(160, 110, 60, 1)'],
      icon: 'ri-link-m',
      tags: [{ name: 'Web3', color: '#a06e3c', bg: '#e6d7c8' }],
      description: '去中心化应用开发平台，提供智能合约部署、Token 发行、DApp 框架等核心能力。',
      stars: '756',
      forks: '189',
      license: 'GPL 3'
    },
    {
      id: '陆',
      name: '墨影',
      fullTitle: '墨影 · AI 助手',
      gradient: ['rgba(220, 220, 220, 1)', 'rgba(44, 36, 22, 1)'],
      icon: 'ri-robot-line',
      tags: [{ name: 'AI', color: '#2c2416', bg: '#dcdcdc' }],
      description: '基于大语言模型的智能写作助手，支持文章生成、风格迁移、灵感激发，让创作更高效。',
      stars: '3.2k',
      forks: '1.2k',
      license: 'CC BY 4.0'
    }
  ];

  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: 'rgba(250, 246, 237, 1)' }}>
        <Nav />

        {/* 页面标题区 */}
        <section className="page-hero">
          {/* 装饰印章 */}
          <div className="page-seal">
            <span>焰</span>
          </div>

          {/* 页面标题 */}
          <h2 className="page-title">炼 丹 炉</h2>
          
          {/* 副标题 */}
          <p className="page-subtitle">六 大 经 典 · 项 目 长 卷</p>

          {/* 装饰分隔线 */}
          <div className="divider-page">
            <div className="divider-line"></div>
            <div className="divider-icon">
              <i className="ri-briefcase-4-line"></i>
            </div>
            <div className="divider-line"></div>
          </div>

          {/* 引言 */}
          <p className="page-quote">每一个项目都是一段取经之路，历经九九八十一难，终得真经。</p>
        </section>

        {/* 项目卡片网格 */}
        <section className="projects-section">
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                {/* 项目封面区 */}
                <div 
                  className="project-cover"
                  style={{
                    background: `linear-gradient(to bottom, ${project.gradient[0]}, ${project.gradient[1]})`
                  }}
                >
                  {/* 项目图标 */}
                  <div className="project-icon">
                    <i className={project.icon}></i>
                  </div>
                  
                  {/* 项目编号 */}
                  <div className="project-badge">
                    <span>{project.id} · {project.name}</span>
                  </div>

                  {/* 装饰云纹 */}
                  <div className="cloud-pattern cloud-pattern-1"></div>
                  <div className="cloud-pattern cloud-pattern-2"></div>
                </div>

                {/* 项目内容 */}
                <div className="project-content">
                  {/* 标签行 */}
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="project-tag"
                        style={{
                          color: tag.color,
                          backgroundColor: tag.bg
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* 项目名称 */}
                  <h3 className="project-name">{project.fullTitle}</h3>
                  
                  {/* 项目描述 */}
                  <p className="project-desc">{project.description}</p>

                  {/* 项目数据 */}
                  <div className="project-stats">
                    <div className="stat-item">
                      <i className="ri-star-line" style={{ color: 'rgba(212, 168, 67, 1)' }}></i>
                      <span>{project.stars}</span>
                    </div>
                    <div className="stat-item">
                      <i className="ri-git-merge-line" style={{ color: 'rgba(139, 115, 85, 1)' }}></i>
                      <span>{project.forks}</span>
                    </div>
                    <div className="stat-item">
                      <i className="ri-price-tag-3-line" style={{ color: 'rgba(139, 115, 85, 1)' }}></i>
                      <span>{project.license}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

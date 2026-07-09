import Link from 'next/link';
import { Footer } from '@/components/footer';
import { getProjects } from '@/lib/content';
import { RiCalendarLine, RiFolderLine, RiBriefcase4Line } from '@remixicon/react';

export default function Projects() {
  const projects = getProjects().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <section className="page-hero">
        <div className="page-seal">
          <span>焰</span>
        </div>
        <h2 className="page-title">炼 丹 炉</h2>
        <p className="page-subtitle">项 目 长 卷</p>
        <div className="divider-page">
          <div className="divider-line"></div>
          <div className="divider-icon">
            <RiBriefcase4Line className="w-4 h-4" />
          </div>
          <div className="divider-line"></div>
        </div>
        <p className="page-quote">每一个项目都是一段取经之路，历经九九八十一难，终得真经。</p>
      </section>

      <section className="projects-section">
        <div className="projects-grid">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="project-card">
              <div className="project-cover" style={{
                background: `linear-gradient(to bottom, rgba(245, 240, 230, 0.8), rgba(184, 168, 138, 0.6))`
              }}>
                <div className="project-icon">
                  <RiFolderLine className="w-6 h-6" />
                </div>
                <div className="project-badge">
                  <span>{project.category}</span>
                </div>
                <div className="cloud-pattern cloud-pattern-1"></div>
                <div className="cloud-pattern cloud-pattern-2"></div>
              </div>
              <div className="project-content">
                <div className="project-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="project-name">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-stats">
                  <div className="stat-item">
                    <RiCalendarLine className="w-3.5 h-3.5" style={{ color: 'rgba(212, 168, 67, 1)' }} />
                    <span>{new Date(project.date).toLocaleDateString('zh-CN')}</span>
                  </div>
                  <div className="stat-item">
                    <RiFolderLine className="w-3.5 h-3.5" />
                    <span>{project.category}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

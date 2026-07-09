import Link from 'next/link';
import { getProjects } from '@/lib/content';
import { RiStarLine, RiEyeLine, RiHeart3Line, RiExternalLinkLine } from '@remixicon/react';

const cardThemes = [
  { name: '赤焰', gradient: ['rgba(212,90,70,1)', 'rgba(160,50,30,1)'], icon: 'ri-fire-line' },
  { name: '鎏金', gradient: ['rgba(220,180,80,1)', 'rgba(160,120,40,1)'], icon: 'ri-vip-crown-2-line' },
  { name: '玉绿', gradient: ['rgba(80,160,120,1)', 'rgba(40,100,70,1)'], icon: 'ri-leaf-line' },
  { name: '云蓝', gradient: ['rgba(100,150,200,1)', 'rgba(50,90,140,1)'], icon: 'ri-cloud-line' },
  { name: '墨玄', gradient: ['rgba(107,90,78,1)', 'rgba(44,36,22,1)'], icon: 'ri-palette-line' },
  { name: '紫霞', gradient: ['rgba(160,100,180,1)', 'rgba(110,60,130,1)'], icon: 'ri-sparkling-line' },
];

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
            <i className="ri-briefcase-4-line"></i>
          </div>
          <div className="divider-line"></div>
        </div>
        <p className="page-quote">每一个项目都是一段取经之路，历经九九八十一难，终得真经。</p>
      </section>

      <section className="projects-section">
        <div className="projects-grid-new">
          {projects.map((project, i) => {
            const theme = cardThemes[i % 6];
            return (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="project-card-new">
                <div className="project-card-cover" style={{
                  background: `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]})`,
                }}>
                  <div className="project-card-icon">
                    <i className={theme.icon}></i>
                  </div>
                  <div className="project-card-badge">
                    <span>{(i + 1).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="project-card-cloud project-card-cloud--1"></div>
                  <div className="project-card-cloud project-card-cloud--2"></div>
                </div>
                <div className="project-card-body">
                  <div className="project-card-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="project-card-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-card-stats">
                    <span className="project-card-stat">
                      <RiStarLine className="project-card-stat-icon project-card-stat-icon--gold" />
                      4.2k
                    </span>
                    <span className="project-card-stat">
                      <RiEyeLine className="project-card-stat-icon" />
                      50k+
                    </span>
                    <span className="project-card-stat">
                      <RiHeart3Line className="project-card-stat-icon" />
                      800+
                    </span>
                  </div>
                  <div className="project-card-actions">
                    <span className="project-card-btn">
                      <i className="ri-eye-line"></i>
                      <span>查看项目</span>
                    </span>
                    <span className="project-card-btn-icon">
                      <RiExternalLinkLine />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

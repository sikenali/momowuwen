import Link from 'next/link';
import { getProjects } from '@/lib/content';
import { RiGithubFill, RiEyeLine } from '@remixicon/react';

const cardThemes = [
  { tagClass: 'project-card-tag--red', btnBg: 'rgba(194,58,43,1)' },
  { tagClass: 'project-card-tag--gold', btnBg: 'rgba(212,168,67,1)' },
  { tagClass: 'project-card-tag--green', btnBg: 'rgba(74,140,109,1)' },
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
            <i className="ri-folder-open-line"></i>
          </div>
          <div className="divider-line"></div>
        </div>
      </section>

      <section className="projects-section">
        <div className="projects-grid-centered">
          {projects.map((project, i) => {
            const theme = cardThemes[i % 3];
            return (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="project-card-new">
                <div className="project-card-icon">
                  <RiGithubFill />
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-card-bottom">
                    <div className="project-card-tags">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={`project-card-tag ${theme.tagClass}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-card-actions">
                      <span className="project-card-btn" style={{ backgroundColor: theme.btnBg }}>
                        <i className="ri-eye-line"></i>
                        <span>访问</span>
                      </span>
                    </div>
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

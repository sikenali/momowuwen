import { PageHero } from '@/components/page-hero';
import { getProjects } from '@/lib/content';
import Link from 'next/link';

const cardColors = [
  { accent: 'rgba(196,58,49,1)', bg: 'rgba(253,242,238,1)' },
  { accent: 'rgba(200,164,92,1)', bg: 'rgba(253,248,232,1)' },
  { accent: 'rgba(91,140,90,1)', bg: 'rgba(237,245,237,1)' },
  { accent: 'rgba(123,158,179,1)', bg: 'rgba(237,242,247,1)' },
  { accent: 'rgba(184,84,80,1)', bg: 'rgba(250,238,238,1)' },
  { accent: 'rgba(160,139,106,1)', bg: 'rgba(245,240,230,1)' },
];

export default function ProjectsPage() {
  const projects = getProjects().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <div className="main-container-compact" style={{ flex: 1 }}>
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        <PageHero seal="焰" title="部 部 经 典 项 项 长 卷" hoverTitle="炼 丹 炉" />

        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      <section className="projects-section">
        <div className="cards-shelf cards-shelf-expanded">
          {projects.slice(0, 5).map((project, i) => {
            const colors = cardColors[i % cardColors.length];
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="shelf-item"
              >
                <div className="card-body">
                  <div className="card-icon" style={{ backgroundColor: colors.bg, color: colors.accent }}>
                    <i className="ri-github-line"></i>
                  </div>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-desc">{project.description}</p>
                  <div className="card-accent-bar" style={{ backgroundColor: colors.accent }}></div>
                </div>
              </Link>
            );
          })}
        </div>

        {projects.length > 5 && (
          <div className="explore-more-section">
            <span className="explore-more-text">探索更多</span>
            <Link href="/projects" className="explore-arrow">
              <i className="ri-arrow-down-line"></i>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

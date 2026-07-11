import { getProjects } from '@/lib/content';
import { CardAccent } from '@/app/projects/_components/card-accent';
import { PageHero } from '@/components/page-hero';

const shelfCardThemes = [
  { icon: 'ri-github-line', iconBg: 'rgba(253,242,238,1)', brandColor: 'rgba(196,58,49,1)' },
  { icon: 'ri-global-line', iconBg: 'rgba(253,248,232,1)', brandColor: 'rgba(200,164,92,1)' },
  { icon: 'ri-code-s-slash-line', iconBg: 'rgba(237,245,237,1)', brandColor: 'rgba(91,140,90,1)' },
  { icon: 'ri-database-2-line', iconBg: 'rgba(237,242,247,1)', brandColor: 'rgba(123,158,179,1)' },
  { icon: 'ri-terminal-box-line', iconBg: 'rgba(250,238,238,1)', brandColor: 'rgba(184,84,80,1)' },
];

export default function ProjectsPage() {
  const projects = getProjects();

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
        <div className="cards-shelf">
          {projects.map((project, i) => {
            const theme = shelfCardThemes[i % shelfCardThemes.length];
            const href = project.link || `/projects/${project.slug}`;
            const isExternal = !!project.link;
            return (
              <a
                key={project.slug}
                href={href}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="shelf-item"
              >
                <div className="card-body">
                  <div className="card-icon" style={{ backgroundColor: theme.iconBg, color: theme.brandColor }}>
                    <i className={theme.icon}></i>
                  </div>
                  <h3 className="card-title">墨墨梧文</h3>
                  <p className="card-desc">Powered by LightOS</p>
                </div>
                <CardAccent color={theme.brandColor} />
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

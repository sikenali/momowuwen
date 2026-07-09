import Link from 'next/link';
import { RiGithubFill } from '@remixicon/react';

interface ProjectCardProps {
  project: { title: string; description: string; tags: string[]; category: string; slug: string; link?: string; date: string };
  index?: number;
}

const cardThemes = [
  { tagClass: 'project-card-tag--red', btnBg: 'rgba(194,58,43,1)' },
  { tagClass: 'project-card-tag--gold', btnBg: 'rgba(212,168,67,1)' },
  { tagClass: 'project-card-tag--green', btnBg: 'rgba(74,140,109,1)' },
];

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const theme = cardThemes[index % 3];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="project-card-new">
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
      </div>
    </Link>
  );
}

import Link from 'next/link';
import { RiStarLine, RiEyeLine, RiHeart3Line, RiExternalLinkLine } from '@remixicon/react';

interface ProjectCardProps {
  project: { title: string; description: string; tags: string[]; category: string; cover?: string; slug: string; link?: string; date: string };
  index?: number;
}

const cardThemes = [
  { gradient: ['rgba(212,90,70,1)', 'rgba(160,50,30,1)'], icon: 'ri-fire-line' },
  { gradient: ['rgba(220,180,80,1)', 'rgba(160,120,40,1)'], icon: 'ri-vip-crown-2-line' },
  { gradient: ['rgba(80,160,120,1)', 'rgba(40,100,70,1)'], icon: 'ri-leaf-line' },
  { gradient: ['rgba(100,150,200,1)', 'rgba(50,90,140,1)'], icon: 'ri-cloud-line' },
  { gradient: ['rgba(107,90,78,1)', 'rgba(44,36,22,1)'], icon: 'ri-palette-line' },
  { gradient: ['rgba(160,100,180,1)', 'rgba(110,60,130,1)'], icon: 'ri-sparkling-line' },
];

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const theme = cardThemes[index % 6];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="project-card-new">
        <div className="project-card-cover" style={{
          background: `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]})`,
        }}>
          <div className="project-card-icon">
            <i className={theme.icon}></i>
          </div>
          <div className="project-card-badge">
            <span>{(index + 1).toString().padStart(2, '0')}</span>
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
      </div>
    </Link>
  );
}
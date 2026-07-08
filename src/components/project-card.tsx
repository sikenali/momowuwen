import Link from 'next/link';
import { Project } from '@/lib/content';
import { RiCalendarFill, RiFolderFill, RiExternalLinkLine } from '@remixicon/react';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-gold/10 hover:border-primary/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {project.cover && (
        <div className="relative h-48 overflow-hidden">
          <Image src={project.cover} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl text-primary font-calligraphy mb-2 group-hover:text-gold transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-ink/50 mb-3">
          <span className="flex items-center gap-1">
            <RiCalendarFill className="w-4 h-4" />
            {new Date(project.date).toLocaleDateString('zh-CN')}
          </span>
          <span className="flex items-center gap-1">
            <RiFolderFill className="w-4 h-4" />
            {project.category}
          </span>
        </div>
        <p className="text-ink/70 font-body text-sm line-clamp-2 mb-3">{project.description}</p>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-jade/10 text-jade rounded-full font-body">{tag}</span>
            ))}
          </div>
        )}
        {project.link && (
          <div className="mt-3 flex items-center gap-1 text-primary text-sm font-body group-hover:text-gold transition-colors">
            <RiExternalLinkLine className="w-4 h-4" />
            查看详情
          </div>
        )}
      </div>
    </Link>
  );
}
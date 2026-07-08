import Link from 'next/link';
import { RiCalendarFill, RiFolderFill, RiArrowRightUpLine } from '@remixicon/react';
import Image from 'next/image';

interface ProjectCardProps {
  project: { title: string; description: string; tags: string[]; category: string; cover?: string; slug: string; link?: string; date: string };
  index?: number;
}

const cardColors = ['#F5D0C8', '#FAF0D0', '#D8F0E0', '#E0ECF8', '#6B5A4E', '#E8DCF0'];
const cardThemes = ['赤焰', '鎏金', '玉绿', '云蓝', '墨玄', '紫霞'];

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const color = cardColors[index % 6];
  const theme = cardThemes[index % 6];
  const isDark = index % 6 === 4;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-gold/10 hover:border-primary/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Cover */}
      <div className="relative h-52 overflow-hidden" style={{ backgroundColor: color }}>
        {/* Decorative clouds */}
        <svg className="absolute -bottom-2 right-4 w-20 h-16 opacity-20" viewBox="0 0 81 40">
          <path d="M0,20 Q20,0 40,20 T81,20" fill="none" stroke={isDark ? '#fff' : '#8B7355'} strokeWidth="2" />
        </svg>
        <svg className="absolute top-6 left-8 w-16 h-10 opacity-15" viewBox="0 0 65 32">
          <path d="M0,16 Q16,0 32,16 T65,16" fill="none" stroke={isDark ? '#fff' : '#8B7355'} strokeWidth="1.5" />
        </svg>

        {/* Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)' }}>
          <span className="text-2xl font-calligraphy" style={{ color: isDark ? '#fff' : '#8B7355' }}>{theme[0]}</span>
        </div>

        {/* Number */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-body" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)', color: isDark ? '#fff' : '#8B7355' }}>
          #{String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 text-xs rounded-full font-body" style={{ backgroundColor: color + '60', color: isDark ? '#fff' : '#8B7355' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl text-primary font-calligraphy mb-2 group-hover:text-gold transition-colors">{project.title}</h3>

        {/* Description */}
        <p className="text-ink/60 font-body text-sm leading-relaxed line-clamp-2 mb-4">{project.description}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-ink/40 font-body mb-4">
          <span className="flex items-center gap-1"><RiCalendarFill className="w-3.5 h-3.5" />{new Date(project.date).toLocaleDateString('zh-CN')}</span>
          <span className="flex items-center gap-1"><RiFolderFill className="w-3.5 h-3.5" />{project.category}</span>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3 pt-3 border-t border-gold/10">
          <span className="text-sm text-primary font-body group-hover:text-gold transition-colors">查看详情</span>
          <RiArrowRightUpLine className="w-4 h-4 text-primary group-hover:text-gold transition-colors" />
        </div>
      </div>
    </Link>
  );
}
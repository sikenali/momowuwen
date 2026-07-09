import Link from 'next/link';
import { RiStarFill, RiBookMarkFill, RiArrowRightUpLine } from '@remixicon/react';

interface ProjectCardProps {
  project: { title: string; description: string; tags: string[]; category: string; cover?: string; slug: string; link?: string; date: string; stars?: number; forks?: number; issues?: number };
  index?: number;
}

const cardThemes = ['赤焰', '鎏金', '玉绿', '云蓝', '墨玄', '紫霞'];
const romanNumerals = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const theme = cardThemes[index % 6];
  const romanNumeral = romanNumerals[index % 10];
  const projectNumber = `${romanNumeral} · ${theme}`;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group bg-white/80 backdrop-blur-sm rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F0D8D0]/50"
      style={{
        boxShadow: '0 8px 30px rgba(194,58,43,0.08)',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* 项目封面区 */}
      <div className="relative h-52 overflow-hidden" style={{
        background: 'linear-gradient(to bottom, rgba(245,208,200,1), rgba(194,58,43,1))',
      }}>
        {/* 项目图标 */}
        <div className="absolute left-0 bottom-10 w-16 h-16 rounded-2xl flex items-center justify-center" style={{
          backgroundColor: 'rgba(255,255,255,0.25)',
        }}>
          <span className="text-3xl text-white">{theme[0]}</span>
        </div>

        {/* 项目编号 */}
        <div className="absolute top-1 right-4 px-3 py-1 rounded-full text-xs font-medium" style={{
          backgroundColor: 'rgba(255,255,255,0.25)',
          color: '#fff',
        }}>
          {projectNumber}
        </div>

        {/* 装饰云纹 */}
        <div className="absolute top-1 right-8 w-20 h-10 rounded-full opacity-20" style={{ backgroundColor: '#fff' }}></div>
        <div className="absolute bottom-6 right-4 w-16 h-8 rounded-full opacity-15" style={{ backgroundColor: '#fff' }}></div>
      </div>

      {/* 项目内容 */}
      <div className="p-6">
        {/* 标签行 */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs rounded" style={{
                backgroundColor: 'rgba(253,232,228,1)',
                color: 'rgba(194,58,43,1)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 标题 */}
        <h3 className="text-[26px] text-[#2C2416] font-normal mb-1.5">{project.title}</h3>

        {/* 描述 */}
        <p className="text-[14px] text-[#6B5A3E] leading-relaxed line-clamp-2 mb-5">{project.description}</p>

        {/* 项目数据 */}
        <div className="flex items-center gap-6 text-xs text-[#5C4A32]">
          <span className="flex items-center gap-1">
            <RiStarFill className="w-3.5 h-3.5 text-[#D4A843]" />
            <span className="font-medium">{project.stars || '0'}</span>
          </span>
          <span className="flex items-center gap-1">
            <RiBookMarkFill className="w-3.5 h-3.5 text-[#8B7355]" />
            <span>{project.forks || '0'}</span>
          </span>
          <span className="flex items-center gap-1">
            <RiArrowRightUpLine className="w-3.5 h-3.5 text-[#8B7355]" />
            <span>{project.issues || '0'}</span>
          </span>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#E0D4BC]/30">
          <div className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2" style={{
            backgroundColor: 'rgba(194,58,43,1)',
          }}>
            <RiArrowRightUpLine className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">查看项目</span>
          </div>
          <div className="w-10 h-10 rounded-lg border border-[#E0D4BC] flex items-center justify-center cursor-pointer hover:bg-[#FDF8F0]/50 transition-colors" style={{
            borderColor: 'rgba(224,212,188,1)',
          }}>
            <RiBookMarkFill className="w-4 h-4 text-[#8B7355]" />
          </div>
        </div>
      </div>
    </Link>
  );
}

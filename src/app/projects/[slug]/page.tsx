import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/content';
import { MDXContent } from '@/components/mdx-content';
import { ProjectCard } from '@/components/project-card';
import { RiCalendarFill, RiTimeFill, RiExternalLinkLine } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: '项目未找到' };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const relatedProjects = getProjects()
    .filter((p) => p.slug !== slug && p.category === project.category)
    .slice(0, 3);

  return (
    <article className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <header className="mb-12">
        {project.cover && (
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-8">
            <Image src={project.cover} alt={project.title} fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-body">{project.category}</span>
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-jade/10 text-jade rounded-full text-sm font-body">{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-primary font-calligraphy mb-4">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-ink/50 font-body">
          <span className="flex items-center gap-1">
            <RiCalendarFill className="w-4 h-4" />
            {new Date(project.date).toLocaleDateString('zh-CN')}
          </span>
          {project.metadata && (
            <span className="flex items-center gap-1">
              <RiTimeFill className="w-4 h-4" />
              阅读约 {project.metadata.readingTime} 分钟
            </span>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:text-gold transition-colors">
              <RiExternalLinkLine className="w-4 h-4" />
              外部链接
            </a>
          )}
        </div>
      </header>

      <div className="mb-16">
        <MDXContent html={project.content} />
      </div>

      {relatedProjects.length > 0 && (
        <section>
          <h2 className="text-2xl text-primary font-calligraphy mb-6">相关项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rp) => <ProjectCard key={rp.slug} project={rp} />)}
          </div>
        </section>
      )}

      <div className="mt-12 pt-8 border-t border-gold/20">
        <Link href="/projects" className="text-primary hover:text-gold font-body transition-colors">
          ← 返回项目列表
        </Link>
      </div>
    </article>
  );
}
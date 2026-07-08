import { ProjectCard } from '@/components/project-card';
import { getProjects } from '@/lib/content';
import { RiBrushFill } from '@remixicon/react';

const fakeProjects = [
  { title: '墨境·电商平台', description: '一个融合东方美学与现代交互的电商平台，采用 Next.js 全栈架构，支持 SSR、ISR 等多种渲染策略。', tags: ['Next.js', 'TypeScript', '全栈'], category: 'Web 应用', date: '2026-06-15', slug: 'mojing-ecommerce' },
  { title: '万物·设计系统', description: '企业级 UI 组件库，基于 React + Storybook 构建，提供 60+ 原子化组件，支持主题定制与无障碍访问。', tags: ['React', 'Storybook', '组件库'], category: '前端框架', date: '2026-05-20', slug: 'wanwu-design-system' },
  { title: '流光·可视化工具', description: '实时数据可视化平台，支持拖拽式仪表盘配置，集成 ECharts/D3.js，实现毫秒级数据刷新。', tags: ['Vue3', 'D3.js', '数据可视化'], category: '数据工具', date: '2026-04-10', slug: 'liuguang-viz' },
  { title: '知音·AI 助手', description: '基于大语言模型的智能编程助手，支持代码补全、Bug 检测、重构建议，集成 VS Code 插件。', tags: ['AI', 'Python', 'LLM'], category: 'AI 工具', date: '2026-03-05', slug: 'zhiyin-ai' },
  { title: '墨客·博客引擎', description: '高性能静态博客引擎，支持 Markdown/MDX，自动优化图片与代码高亮，CI/CD 一键发布。', tags: ['Rust', 'WASM', '静态站点'], category: '开发工具', date: '2026-02-18', slug: 'moke-blog-engine' },
  { title: '星河·低代码平台', description: '可视化搭建平台，通过拖拽生成企业级后台应用，支持自定义组件与数据源接入。', tags: ['React', 'Node.js', '低代码'], category: '平台工具', date: '2026-01-08', slug: 'xinghe-lowcode' },
];

export default function ProjectsPage() {
  const realProjects = getProjects().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const displayProjects = realProjects.length >= 6 ? realProjects : fakeProjects;

  return (
    <div className="min-h-screen bg-parchment">
      {/* 页面标题区 */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary/10"
              style={{ width: `${Math.random() * 8 + 4}px`, height: `${Math.random() * 8 + 4}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary/30 flex items-center justify-center">
            <RiBrushFill className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl text-primary font-calligraphy mb-4">项目</h1>
          <p className="text-ink/50 font-body text-sm sm:text-base mb-6">展示我的作品与探索</p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gold/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="w-16 h-px bg-gold/30" />
          </div>
        </div>
      </section>

      {/* 项目卡片 - 6大故事卡片 */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* 项目统计区 */}
      <section className="border-t border-gold/10 bg-white/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center gap-12 sm:gap-24">
            {[
              { value: '32', label: '完成项目' },
              { value: '6', label: '技术栈' },
              { value: '98%', label: '满意度' },
              { value: '4.8K', label: 'Star' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary font-serif">{stat.value}</p>
                <p className="text-xs text-ink/50 font-body mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-gold/20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <RiBrushFill className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-primary font-calligraphy">墨韵</p>
                <p className="text-[10px] text-ink/30 font-body tracking-widest">INK & SILENCE</p>
              </div>
            </div>
            <p className="text-xs text-ink/30 font-body">© 2026 墨韵. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Modal } from '@/components/modal';
import { RiBrushFill, RiCodeFill, RiBookReadFill, RiLightbulbFill, RiTeamFill, RiRocketFill } from '@remixicon/react';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skills = [
    { icon: RiCodeFill, title: '前端开发', desc: 'React, Next.js, TypeScript, Tailwind CSS' },
    { icon: RiBrushFill, title: 'UI/UX 设计', desc: '交互设计、视觉设计、动效设计' },
    { icon: RiBookReadFill, title: '持续学习', desc: '技术博客、开源贡献、知识分享' },
    { icon: RiLightbulbFill, title: '问题解决', desc: '逻辑思维、架构设计、性能优化' },
    { icon: RiTeamFill, title: '团队协作', desc: '敏捷开发、代码审查、文档编写' },
    { icon: RiRocketFill, title: '高效交付', desc: 'CI/CD、自动化测试、持续集成' },
  ];

  return (
    <>
      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl text-primary font-calligraphy text-center mb-4">关于我</h1>
        <p className="text-center text-ink/60 font-body mb-12">了解更多，请点击下方按钮</p>
        <div className="text-center mb-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-primary text-parchment font-calligraphy text-lg rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            查看详细信息
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div key={skill.title} className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-gold/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg text-primary font-calligraphy mb-2">{skill.title}</h3>
                <p className="text-ink/60 font-body text-sm">{skill.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl text-primary font-calligraphy mb-6">博客理念</h2>
          <p className="text-ink/70 font-body leading-relaxed max-w-2xl mx-auto">
            这个博客是一个融合中国传统美学与现代技术的空间。每一篇文章都是一幅水墨画，每一个项目都是一次探索。希望通过这个平台，分享技术心得，记录成长历程。
          </p>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
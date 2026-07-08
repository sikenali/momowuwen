'use client';

import { useEffect, useState, useCallback } from 'react';
import { RiArrowDownLine, RiBookFill, RiCodeSSlashFill, RiTimeFill, RiUserFill } from '@remixicon/react';
import { MountainCanvas } from './mountain-canvas';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const generateParticles = useCallback(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 8,
        duration: Math.random() * 4 + 6,
      }))
    );
  }, []);

  useEffect(() => { generateParticles(); }, [generateParticles]);

  const stats = [
    { value: '128', label: '文章', icon: RiBookFill },
    { value: '32', label: '项目', icon: RiCodeSSlashFill },
    { value: '365', label: '天数', icon: RiTimeFill },
    { value: '10K+', label: '访客', icon: RiUserFill },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FAF6ED]">
      {/* Cloud decorations */}
      <div className="absolute top-8 left-0 right-0 pointer-events-none opacity-40">
        <svg viewBox="0 0 1440 64" className="w-full">
          <path d="M0,32 Q120,0 240,32 T480,32 T720,32 T960,32 T1200,32 T1440,32" fill="none" stroke="rgba(107,163,190,0.3)" strokeWidth="2" />
          <path d="M120,32 Q200,10 280,32 T440,32" fill="none" stroke="rgba(107,163,190,0.2)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-primary/15 animate-particle-drift"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Seal stamp */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-jade/30" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary/30" />
          <div className="w-full h-full rounded-full border-2 border-primary/40 flex items-center justify-center">
            <span className="text-primary font-calligraphy text-2xl">墨</span>
          </div>
        </div>

        {/* Main title */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl text-primary font-calligraphy mb-6 tracking-wider">
          墨韵
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-ink/60 font-body mb-8 tracking-widest">
          水墨丹青 · 诗书礼乐
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-16 sm:w-24 h-px bg-gold/40" />
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <div className="w-16 sm:w-24 h-px bg-gold/40" />
        </div>

        {/* Quote */}
        <p className="text-ink/50 font-body text-sm sm:text-base leading-relaxed mb-12 max-w-xl mx-auto">
          以笔墨记录技术，以丹青描绘思考。
          在这里，每一行代码都是一首诗，每一个项目都是一幅画。
        </p>

        {/* CTA buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <a
            href="#posts"
            className="px-8 py-3 bg-primary text-parchment font-body rounded-md hover:bg-primary/90 transition-colors shadow-sm"
          >
            浏览文章
          </a>
          <a
            href="/about"
            className="px-8 py-3 border border-gold/40 text-gold font-body rounded-md hover:bg-gold/5 transition-colors"
          >
            了解更多
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-0 max-w-lg mx-auto">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && <div className="w-px h-12 bg-gold/20 mx-6" />}
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary font-serif">{stat.value}</p>
                <p className="text-xs text-ink/50 font-body mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <RiArrowDownLine className="w-5 h-5 text-primary/40" />
      </div>

      <MountainCanvas />
    </section>
  );
}
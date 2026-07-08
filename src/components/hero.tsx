'use client';

import { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: string;
  driftY: string;
  delay: number;
  duration: number;
}

export function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      driftX: `${Math.random() * 100 - 50}px`,
      driftY: `-${Math.random() * 150 + 50}px`,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 6,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    generateParticles();
  }, [generateParticles]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute top-[20% + i*15%] w-[200%] opacity-30"
            style={{
              animation: `cloudDrift ${15 + i * 5}s linear infinite`,
              animationDelay: `-${i * 5}s`,
            }}
          >
            <svg
              viewBox="0 0 1200 100"
              className="w-full h-24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,50 Q150,10 300,50 T600,50 T900,50 T1200,50 V100 H0 Z"
                fill={`rgba(107, 163, 190, ${0.1 + i * 0.05})`}
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-primary/20 animate-particle-drift"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--drift-x': p.driftX,
              '--drift-y': p.driftY,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl text-primary font-calligraphy mb-6 animate-float">
          墨韵
        </h1>
        <p className="text-xl sm:text-2xl text-ink/70 font-body max-w-2xl mx-auto">
          水墨丹青，诗书礼乐
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#posts"
            className="px-6 py-3 bg-primary text-parchment font-body rounded hover:bg-primary/90 transition-colors"
          >
            浏览文章
          </a>
          <a
            href="/about"
            className="px-6 py-3 border border-gold/50 text-gold font-body rounded hover:bg-gold/10 transition-colors"
          >
            了解更多
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
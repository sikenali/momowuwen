'use client';
import { getPosts, getProjects } from '@/lib/content';
import { useEffect, useRef, useState } from 'react';

const posts = getPosts();
const projects = getProjects();

const postCount = posts.length;
const projectCount = projects.length;
const firstPostDate = posts.length > 0
  ? new Date(posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0].date)
  : new Date('2022-01-01');
const daysPersisting = Math.floor((Date.now() - firstPostDate.getTime()) / (1000 * 60 * 60 * 24));

const mountainPaths = [
  'M 0 280 Q 120 200 240 240 Q 360 280 480 220 Q 600 160 720 250 Q 840 340 960 210 Q 1080 80 1200 240 Q 1320 400 1440 220 L 1440 320 L 0 320 Z',
  'M 0 300 Q 100 220 200 260 Q 300 200 400 240 Q 500 180 600 230 Q 700 190 800 250 Q 900 200 1000 240 Q 1100 190 1200 230 Q 1300 210 1440 250 L 1440 320 L 0 320 Z',
  'M 0 310 Q 80 240 160 280 Q 240 220 320 260 Q 400 200 500 250 Q 600 210 700 270 Q 800 230 900 260 Q 1000 220 1100 260 Q 1200 230 1300 270 Q 1380 250 1440 280 L 1440 320 L 0 320 Z',
  'M 0 320 Q 120 260 240 290 Q 360 250 480 280 Q 600 240 720 290 Q 840 260 960 290 Q 1080 250 1200 285 Q 1320 260 1440 300 L 1440 320 L 0 320 Z',
];

const mountainStyles = [
  { fill: '#d4cfc0', opacity: 0.5 },
  { fill: '#b8b09c', opacity: 0.5 },
  { fill: '#9a9080', opacity: 0.4 },
  { fill: '#7a7060', opacity: 0.3 },
];

function InkMountain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (centerY - viewportCenter) * 0.01;
      setScrollY(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxOffsets = [0.02, 0.04, 0.06, 0.08];

  return (
    <div className="mountain-scene" ref={containerRef}>
      {mountainPaths.map((path, i) => {
        const style = mountainStyles[i];
        const offsetY = scrollY * parallaxOffsets[i] * 100;
        return (
          <svg
            key={i}
            className={`mountain-layer mountain-layer-${i}`}
            width="1440"
            height="320"
            viewBox="-720 -120 1440 320"
            preserveAspectRatio="none"
            style={{
              transform: `translateY(${offsetY}px)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <path d={path} fill={style.fill} opacity={style.opacity} />
          </svg>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="main-container-compact" style={{ flex: 1 }}>
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        <section className="hero-section-compact">
          <div className="title-group-compact">
            <p className="title-sub-compact">一 个 人 的 文 字 长 征</p>
          </div>

          <div className="divider-compact">
            <div className="divider-line"></div>
            <div className="divider-dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
            <div className="divider-line"></div>
          </div>

          <div className="quote-section-compact">
            <p className="quote-text">以代码为笔，以设计为墨，在数字世界里书写属于自己的山水长卷。</p>
          </div>

          <div className="stats-section-compact">
            <div className="stat-item-compact">
              <span className="stat-number red">{postCount}</span>
              <span className="stat-label">{postCount === 1 ? '篇文章' : '篇文章'}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number green">{projectCount}</span>
              <span className="stat-label">{projectCount === 1 ? '个项目' : '个项目'}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number gold">{daysPersisting}</span>
              <span className="stat-label">天坚持</span>
            </div>
          </div>
        </section>

        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      <InkMountain />
    </div>
  );
}

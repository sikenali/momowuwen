'use client';
import { getPosts, getProjects } from '@/lib/content';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

// Server-compatible: compute counts outside component to avoid re-computation
const posts = getPosts();
const projects = getProjects();
const postCount = posts.length;
const projectCount = projects.length;
const firstPostDate = posts.length > 0
  ? new Date(posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0].date)
  : new Date('2022-01-01');
const daysPersisting = Math.floor((Date.now() - firstPostDate.getTime()) / (1000 * 60 * 60 * 24));

// Memoized constants — never recreated
const MOUNTAIN_PATHS = [
  'M 0 280 Q 120 200 240 240 Q 360 280 480 220 Q 600 160 720 250 Q 840 340 960 210 Q 1080 80 1200 240 Q 1320 400 1440 220 L 1440 320 L 0 320 Z',
  'M 0 300 Q 100 220 200 260 Q 300 200 400 240 Q 500 180 600 230 Q 700 190 800 250 Q 900 200 1000 240 Q 1100 190 1200 230 Q 1300 210 1440 250 L 1440 320 L 0 320 Z',
  'M 0 310 Q 80 240 160 280 Q 240 220 320 260 Q 400 200 500 250 Q 600 210 700 270 Q 800 230 900 260 Q 1000 220 1100 260 Q 1200 230 1300 270 Q 1380 250 1440 280 L 1440 320 L 0 320 Z',
  'M 0 320 Q 120 260 240 290 Q 360 250 480 280 Q 600 240 720 290 Q 840 260 960 290 Q 1080 250 1200 285 Q 1320 260 1440 300 L 1440 320 L 0 320 Z',
];

const MOUNTAIN_STYLES = [
  { fill: '#d4cfc0', opacity: 0.5 },
  { fill: '#b8b09c', opacity: 0.5 },
  { fill: '#9a9080', opacity: 0.4 },
  { fill: '#7a7060', opacity: 0.3 },
];

const PARALLAX_OFFSETS = [0.02, 0.04, 0.06, 0.08];

function InkMountain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      offsetRef.current = (centerY - viewportCenter) * 0.01;
      
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const layers = containerRef.current?.querySelectorAll('.mountain-layer');
        if (!layers) return;
        layers.forEach((layer, i) => {
          const offsetY = offsetRef.current * PARALLAX_OFFSETS[i] * 100;
          (layer as SVGSVGElement).style.transform = `translateY(${offsetY}px)`;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="mountain-scene" ref={containerRef}>
      {MOUNTAIN_PATHS.map((path, i) => {
        const style = MOUNTAIN_STYLES[i];
        return (
          <svg
            key={i}
            className={`mountain-layer mountain-layer-${i}`}
            width="1440"
            height="320"
            viewBox="-720 -120 1440 320"
            preserveAspectRatio="none"
          >
            <path d={path} fill={style.fill} opacity={style.opacity} />
          </svg>
        );
      })}
    </div>
  );
}

/* ── 浮动目标图标 ── */
function FloatingTargetIcon() {
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const stateRef = useRef({
    progress: 0,
    idx: 0,
    lastTime: 0,
    points: [] as { x: number; y: number }[],
  });

  const buildPoints = useCallback(() => {
    const container = document.querySelector('.main-container-compact');
    if (!container) return [];
    const bounds = container.getBoundingClientRect();
    const cx = bounds.width / 2;
    const cy = bounds.height / 2;
    const radius = Math.min(bounds.width, bounds.height) * 0.38;

    const pts: { x: number; y: number }[] = [];
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      // Irregular: vary radius per angle
      const r = radius * (0.5 + 0.5 * Math.abs(Math.sin(angle * 2.7 + i * 0.8)));
      pts.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r * 0.55, // flatten vertically
      });
    }
    return pts;
  }, []);

  useEffect(() => {
    const pts = buildPoints();
    if (pts.length === 0) return;

    const s = stateRef.current;
    s.points = pts;

    const animate = (time: number) => {
      if (!s.lastTime) s.lastTime = time;
      const dt = time - s.lastTime;
      s.lastTime = time;

      if (!isHovered) {
        s.progress += dt * 0.00012; // very slow: ~8s per segment
        if (s.progress >= 1) {
          s.progress = 0;
          s.idx = (s.idx + 1) % s.points.length;
        }

        const from = s.points[s.idx];
        const to = s.points[(s.idx + 1) % s.points.length];
        const t = s.progress;
        // smooth ease-in-out
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        setPos({
          x: from.x + (to.x - from.x) * eased,
          y: from.y + (to.y - from.y) * eased,
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered, buildPoints]);

  return (
    <Link
      href="/blog"
      className="floating-target-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <i className="ri-target-line floating-target-icon__inner"></i>
    </Link>
  );
}

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="main-container-compact" style={{ flex: 1, position: 'relative' }}>
        <FloatingTargetIcon />
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

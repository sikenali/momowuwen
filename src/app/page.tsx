'use client';
import { getPosts, getProjects } from '@/lib/content';
import { useEffect, useState, useCallback } from 'react';

const posts = getPosts();
const projects = getProjects();

const postCount = posts.length;
const projectCount = projects.length;
const firstPostDate = posts.length > 0
  ? new Date(posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0].date)
  : new Date('2022-01-01');
const daysPersisting = Math.floor((Date.now() - firstPostDate.getTime()) / (1000 * 60 * 60 * 24));

const badgePositions = [
  { top: '-12px', right: '15%' },
  { top: '15%', right: '-14px' },
  { bottom: '-12px', right: '15%' },
  { top: '15%', left: '-14px' },
  { top: '45%', right: '-16px' },
  { top: '-14px', left: '25%' },
];

const leafIcons = ['ri-leaf-line', 'ri-plant-line', 'ri-flask-line', 'ri-drop-line'];
const fireIcons = ['ri-fire-line', 'ri-flashlight-line', 'ri-sparkling-line', 'ri-star-smile-line'];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Home() {
  const [badgeGreen, setBadgeGreen] = useState<{ icon: string; pos: Record<string, string> }>({ icon: '', pos: {} });
  const [badgeRed, setBadgeRed] = useState<{ icon: string; pos: Record<string, string> }>({ icon: '', pos: {} });

  const refreshBadges = useCallback(() => {
    const usedIndices = new Set<number>();
    usedIndices.add(Math.floor(Math.random() * badgePositions.length));
    let idx2 = Math.floor(Math.random() * badgePositions.length);
    while (usedIndices.has(idx2)) idx2 = Math.floor(Math.random() * badgePositions.length);

    setBadgeGreen({ icon: getRandomItem(leafIcons), pos: badgePositions[usedIndices.values().next().value] });
    setBadgeRed({ icon: getRandomItem(fireIcons), pos: badgePositions[idx2] });
  }, []);

  useEffect(() => {
    refreshBadges();
    const interval = setInterval(refreshBadges, 5000);
    return () => clearInterval(interval);
  }, [refreshBadges]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="main-container-compact" style={{ flex: 1 }}>
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        <section className="hero-section-compact">
          <div className="seal-container">
            <div className="seal-main">
              <span>墨</span>
            </div>
            <div className="seal-badge-green" style={badgeGreen.pos}>
              <i className={badgeGreen.icon}></i>
            </div>
            <div className="seal-badge-red" style={badgeRed.pos}>
              <i className={badgeRed.icon}></i>
            </div>
          </div>

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
    </div>
  );
}

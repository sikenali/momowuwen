'use client';
import { getPosts, getProjects } from '@/lib/content';

const posts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
const projects = getProjects();

// P2-13: Auto-calculate days from first post/project date
function calculateDaysActive(): number {
  const allDates = [
    ...posts.map(p => new Date(p.date).getTime()),
    ...projects.map(p => new Date(p.date).getTime()),
  ];
  if (allDates.length === 0) return 0;
  const oldestDate = new Date(Math.min(...allDates));
  const today = new Date();
  const diffTime = today.getTime() - oldestDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

const daysActive = calculateDaysActive();

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="main-container-compact" style={{ flex: 1 }}>
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        <section className="hero-section-compact">
          <div className="seal-container">
            <div className="page-seal" data-hover-title="水 墨 画"><span>墨</span></div>
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
              <span className="stat-number red">{posts.length}</span>
              <span className="stat-label">篇文章</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number green">{projects.length}</span>
              <span className="stat-label">个项目</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number gold">{daysActive}</span>
              <span className="stat-label">天坚持</span>
            </div>
          </div>
        </section>

        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      <div className="explore-more-section">
        <span className="explore-more-text">探索更多</span>
        <a href="https://assistant.10012049.xyz/" target="_blank" rel="noopener noreferrer" className="explore-arrow">
          <i className="ri-target-line"></i>
        </a>
      </div>
    </div>
  );
}

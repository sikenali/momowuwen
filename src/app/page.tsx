'use client';
import { useState, useEffect } from 'react';
import { getPosts, getProjects } from '@/lib/content';

export default function Home() {
  const posts = getPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  const projects = getProjects();

  const STORAGE_KEY = 'momowuwen-active-days';

  function getOrInitDays(): { count: number; lastDate: string } {
    if (typeof window === 'undefined') return { count: 1, lastDate: '' };
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch { /* fall through */ }
    }
    return { count: 1, lastDate: '' };
  }

  const [daysActive, setDaysActive] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const data = getOrInitDays();

    if (!data.lastDate) {
      data.lastDate = today;
      data.count = 1;
    } else if (data.lastDate !== today) {
      data.count += 1;
      data.lastDate = today;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setDaysActive(data.count);
  }, []);

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

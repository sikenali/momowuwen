import { getPosts, getProjects } from '@/lib/content';

const posts = getPosts();
const projects = getProjects();

const postCount = posts.length;
const projectCount = projects.length;
const firstPostDate = posts.length > 0
  ? new Date(posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0].date)
  : new Date('2022-01-01');
const daysPersisting = Math.floor((Date.now() - firstPostDate.getTime()) / (1000 * 60 * 60 * 24));

export default function Home() {
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
            <div className="seal-badge-green">
              <i className="ri-leaf-line"></i>
            </div>
            <div className="seal-badge-red">
              <i className="ri-fire-line"></i>
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

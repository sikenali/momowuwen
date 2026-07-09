import { Footer } from '@/components/footer';
import { getPosts, getProjects } from '@/lib/content';

export default function Home() {
  const postCount = getPosts().length || 128;
  const projectCount = getProjects().length || 36;
  const firstPostDate = getPosts().length > 0
    ? new Date(getPosts().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0].date)
    : new Date('2022-01-01');
  const daysPersisting = Math.floor((Date.now() - firstPostDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <>
      {/* 主容器 - 紧凑布局 */}
      <div className="main-container-compact">
        {/* 云层装饰1 */}
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        {/* 主视觉区域 - 紧凑版 */}
        <section className="hero-section-compact">
          {/* 主题印章 */}
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

          {/* 主标题组 */}
          <div className="title-group-compact">
            <p className="title-sub-compact">一 个 人 的 文 字 长 征</p>
          </div>

          {/* 装饰分隔线 */}
          <div className="divider-compact">
            <div className="divider-line"></div>
            <div className="divider-dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
            <div className="divider-line"></div>
          </div>

          {/* 引言区域 */}
          <div className="quote-section-compact">
            <p className="quote-text">以代码为笔，以设计为墨，在数字世界里书写属于自己的山水长卷。</p>
          </div>

          {/* 数据统计组 - 紧凑排列 */}
          <div className="stats-section-compact">
            <div className="stat-item-compact">
              <span className="stat-number red">{postCount}</span>
              <span className="stat-label">篇文章</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number green">{projectCount}</span>
              <span className="stat-label">个项目</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number gold">{daysPersisting}</span>
              <span className="stat-label">天坚持</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item-compact">
              <span className="stat-number blue">50K</span>
              <span className="stat-label">位访客</span>
            </div>
          </div>
        </section>

        {/* 云层装饰2 */}
        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>



      <Footer />
      </>
    );
  }

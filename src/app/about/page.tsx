import { PageHero } from '@/components/page-hero';

export default function About() {
  return (
    <>
      <div className="main-container-compact" style={{ flex: 1 }}>
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        <PageHero seal="我" title="默 默 无 闻 惊 言 惊 语" hoverTitle="关 于 我" />

        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      <section className="info-section">
        <div className="about-container">
          <div className="about-info-row">
            <div className="about-info-item">
              <div className="about-icon-box about-icon-box--red">
                <i className="ri-user-line"></i>
              </div>
              <div className="about-info-content">
                <span className="about-info-label">姓名</span>
                <span className="about-info-value">Jingle</span>
              </div>
            </div>

            <div className="about-info-item">
              <div className="about-icon-box about-icon-box--green">
                <i className="ri-briefcase-line"></i>
              </div>
              <div className="about-info-content">
                <span className="about-info-label">职业</span>
                <span className="about-info-value">项目经理</span>
              </div>
            </div>

            <div className="about-info-item">
              <div className="about-icon-box about-icon-box--gold">
                <i className="ri-map-pin-line"></i>
              </div>
              <div className="about-info-content">
                <span className="about-info-label">坐标</span>
                <span className="about-info-value">中国 · 武汉</span>
              </div>
            </div>

            <div className="about-info-item">
              <div className="about-icon-box about-icon-box--blue">
                <i className="ri-graduation-cap-line"></i>
              </div>
              <div className="about-info-content">
                <span className="about-info-label">邮箱</span>
                <span className="about-info-value">admin@10012049.xyz</span>
              </div>
            </div>
          </div>

          <div className="about-bio">
            <p className="bio-headline">一个不会编（AI）程（Coding）的商务、产品、运营、测试的开发，不是一个好的项目经理</p>
          </div>

          <div className="about-experience">
            <div className="experience-card">
              <div className="experience-item">
                <span className="experience-icon"><i className="ri-global-line"></i></span>
                <span className="experience-text">域名的来源，20491001被注册后只能反其道而行</span>
              </div>
              <div className="experience-item">
                <span className="experience-icon"><i className="ri-graduation-cap-line"></i></span>
                <span className="experience-text">2008年计科专业毕业，码农水平有限，多亏赶AI编程时代</span>
              </div>
              <div className="experience-item">
                <span className="experience-icon"><i className="ri-server-line"></i></span>
                <span className="experience-text">早期从事华为OD，PMS行业，近10年一直从事操作系统行业领域</span>
              </div>
            </div>
          </div>

          <div className="about-signature">
            <div className="about-signature-text">
              <span className="about-signature-name">— 惊言惊语</span>
              <span className="about-signature-date">AI 编程时代 · 行者</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

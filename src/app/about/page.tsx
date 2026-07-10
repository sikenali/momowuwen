export default function About() {
  return (
    <>
      <div className="about-page">
        {/* 页面标题区 */}
        <section className="page-hero">
          {/* 装饰印章 */}
          <div className="page-seal">
            <span>我</span>
          </div>

          {/* 页面标题 */}
          <h2 className="page-title">关 于 我</h2>
          
          {/* 副标题 */}
          <p className="page-subtitle">墨 轩 主 人 · 个 人 简 介</p>

          {/* 装饰分隔线 */}
          <div className="divider-page">
            <div className="divider-line"></div>
            <div className="divider-icon">
              <i className="ri-user-heart-line"></i>
            </div>
            <div className="divider-line"></div>
          </div>
        </section>

        {/* 个人信息区 */}
        <section className="info-section">
          <div className="about-container">
            {/* 信息行 */}
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
                  <span className="about-info-value">jingle@111.com</span>
                </div>
              </div>
            </div>

            {/* 个人简介 */}
            <div className="about-bio">
              <p className="bio-headline">一个不会编（AI）程（Coding）的商务、产品、运营、测试的开发，不是一个好的项目经理</p>
            </div>

            {/* 经历卡片 */}
            <div className="about-experience">
              <div className="experience-card">
                <div className="experience-item">
                  <span className="experience-icon"><i className="ri-global-line"></i></span>
                  <span className="experience-text">域名的来源，20491001被注册后只能反其道而行</span>
                </div>
                <div className="experience-item">
                  <span className="experience-icon"><i className="ri-rocket-line"></i></span>
                  <span className="experience-text">2008年计科专业毕业，码农水平有限，多亏赶AI编程时代</span>
                </div>
                <div className="experience-item">
                  <span className="experience-icon"><i className="ri-tools-line"></i></span>
                  <span className="experience-text">早期从事华为OD，PMS行业，近10年一直从事操作系统行业领域</span>
                </div>
              </div>
            </div>

            {/* 签名 */}
            <div className="about-signature">
              <div className="about-signature-text">
                <span className="about-signature-name">— 惊言惊语</span>
                <span className="about-signature-date">AI 编程时代 · 行者</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

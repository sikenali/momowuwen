const shelfCards = [
  {
    title: '项目一',
    desc: '项目描述文字',
    icon: 'ri-github-fill',
    theme: 'theme-red',
    iconBg: 'rgba(253,242,238,1)',
    iconColor: 'rgba(196,58,49,1)',
    accentColor: 'rgba(196,58,49,1)',
    url: 'https://github.com/example/project-one',
  },
  {
    title: '项目二',
    desc: '项目描述文字',
    icon: 'ri-github-fill',
    theme: 'theme-gold',
    iconBg: 'rgba(253,248,232,1)',
    iconColor: 'rgba(200,164,92,1)',
    accentColor: 'rgba(200,164,92,1)',
    url: 'https://github.com/example/project-two',
  },
  {
    title: '项目三',
    desc: '项目描述文字',
    icon: 'ri-github-fill',
    theme: 'theme-green',
    iconBg: 'rgba(237,245,237,1)',
    iconColor: 'rgba(91,140,90,1)',
    accentColor: 'rgba(91,140,90,1)',
    url: 'https://github.com/example/project-three',
  },
  {
    title: '项目四',
    desc: '项目描述文字',
    icon: 'ri-github-fill',
    theme: 'theme-blue',
    iconBg: 'rgba(237,242,247,1)',
    iconColor: 'rgba(123,158,179,1)',
    accentColor: 'rgba(123,158,179,1)',
    url: 'https://github.com/example/project-four',
  },
  {
    title: '项目五',
    desc: '项目描述文字',
    icon: 'ri-github-fill',
    theme: 'theme-pink',
    iconBg: 'rgba(250,238,238,1)',
    iconColor: 'rgba(184,84,80,1)',
    accentColor: 'rgba(184,84,80,1)',
    url: 'https://github.com/example/project-five',
  },
];

function CardAccent({ color }: { color: string }) {
  return (
    <div
      className="card-accent"
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default function Projects() {
  return (
    <>
      <section className="page-hero">
        <div className="page-seal">
          <span>焰</span>
        </div>
        <h2 className="page-title">炼 丹 炉</h2>
        <p className="page-subtitle">项 目 长 卷</p>
        <div className="divider-page">
          <div className="divider-line"></div>
          <div className="divider-icon">
            <i className="ri-folder-open-line"></i>
          </div>
          <div className="divider-line"></div>
        </div>
      </section>

      <section className="projects-section">
        <div className="cards-shelf">
          {shelfCards.map((card, i) => (
            <div key={i} className="shelf-item">
              <div className={`card-body ${card.theme}`}>
                <a
                  href={card.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-icon-wrapper"
                >
                  <div className="card-icon" style={{ backgroundColor: card.iconBg, color: card.iconColor }}>
                    <i className={card.icon}></i>
                  </div>
                </a>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
              </div>
              <CardAccent color={card.accentColor} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

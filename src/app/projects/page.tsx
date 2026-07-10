const shelfCards = [
  {
    name: '文取猩',
    desc: '智能提取',
    icon: 'ri-github-line',
    brandColor: 'rgba(196,58,49,1)',
    iconBg: 'rgba(253,242,238,1)',
  },
  {
    name: '文制猩',
    desc: '智能生成',
    icon: 'ri-github-line',
    brandColor: 'rgba(200,164,92,1)',
    iconBg: 'rgba(253,248,232,1)',
  },
  {
    name: '文检猩',
    desc: '智能校验',
    icon: 'ri-github-line',
    brandColor: 'rgba(91,140,90,1)',
    iconBg: 'rgba(237,245,237,1)',
  },
  {
    name: '文版猩',
    desc: '智能排版',
    icon: 'ri-github-line',
    brandColor: 'rgba(123,158,179,1)',
    iconBg: 'rgba(237,242,247,1)',
  },
  {
    name: '文比猩',
    desc: '智能比对',
    icon: 'ri-github-line',
    brandColor: 'rgba(184,84,80,1)',
    iconBg: 'rgba(250,238,238,1)',
  },
];

function CardAccent({ color }: { color: string }) {
  return (
    <div className="card-accent-wrapper">
      <div className="card-accent-left" style={{ backgroundColor: color }}></div>
      <div className="card-accent-dot" style={{ backgroundColor: color }}></div>
      <div className="card-accent-right" style={{ backgroundColor: color }}></div>
    </div>
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
        <div className="divider-page">
          <div className="divider-line"></div>
          <div className="divider-icon">
            <i className="ri-fire-line"></i>
          </div>
          <div className="divider-line"></div>
        </div>
      </section>

      <section className="projects-section">
        <div className="cards-shelf">
          {shelfCards.map((card, i) => (
            <a key={i} href="https://github.com" target="_blank" rel="noopener noreferrer" className="shelf-item">
              <div className="card-body">
                <div className="card-icon" style={{ backgroundColor: card.iconBg, color: card.brandColor }}>
                  <i className={card.icon}></i>
                </div>
                <h3 className="card-title">{card.name}</h3>
                <p className="card-desc">{card.desc}</p>
              </div>
              <CardAccent color={card.brandColor} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

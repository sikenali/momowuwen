import { PageHero } from '@/components/page-hero';

const shelfCards = [
  { name: '金', desc: '金', icon: 'ri-github-line', color: 'rgba(196,58,49,1)', bg: 'rgba(253,242,238,1)', url: 'https://github.com/sikenali/momowuwen' },
  { name: '木', desc: '木', icon: 'ri-github-line', color: 'rgba(200,164,92,1)', bg: 'rgba(253,248,232,1)', url: 'https://assistant.10012049.xyz' },
  { name: '水', desc: '水', icon: 'ri-github-line', color: 'rgba(91,140,90,1)', bg: 'rgba(237,245,237,1)', url: '#' },
  { name: '火', desc: '火', icon: 'ri-github-line', color: 'rgba(123,158,179,1)', bg: 'rgba(237,242,247,1)', url: '#' },
  { name: '土', desc: '土', icon: 'ri-github-line', color: 'rgba(184,84,80,1)', bg: 'rgba(250,238,238,1)', url: '#' },
];

export default function ProjectsPage() {
  return (
    <>
      <div className="main-container-compact" style={{ flex: 1 }}>
        <div className="cloud-decoration">
          <div className="cloud"></div>
        </div>

        <PageHero seal="焰" title="部 部 经 典 项 项 长 卷" hoverTitle="炼 丹 炉" />

        <div className="cloud-decoration-2">
          <div className="cloud-2"></div>
        </div>
      </div>

      <section className="projects-section">
        <div className="cards-shelf">
          {shelfCards.map((card, i) => (
            <a
              key={i}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shelf-item"
            >
              <div className="card-body">
                <div className="card-icon" style={{ backgroundColor: card.bg, color: card.color }}>
                  <i className={card.icon}></i>
                </div>
                <h3 className="card-title">{card.name}</h3>
                <p className="card-desc">{card.desc}</p>
                <div className="card-accent-bar" style={{ backgroundColor: card.color }}></div>
              </div>
            </a>
          ))}
        </div>
        <div className="explore-more-section">
          <span className="explore-more-text">探索更多</span>
          <a href="/blog" target="_blank" rel="noopener noreferrer" className="explore-arrow">
            <i className="ri-arrow-down-line"></i>
          </a>
        </div>
      </section>
    </>
  );
}

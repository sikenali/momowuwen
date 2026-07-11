export function PageHero({
  seal,
  title,
  hoverTitle,
}: {
  seal: string;
  title: string;
  hoverTitle: string;
}) {
  return (
    <section className="hero-section-compact">
      <div className="seal-container">
        <div className="page-seal" data-hover-title={hoverTitle}>
          <span>{seal}</span>
        </div>
      </div>
      <div className="title-group-compact">
        <p className="title-sub-compact">{title}</p>
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
    </section>
  );
}

export function CardAccent({ color }: { color: string }) {
  return (
    <div className="card-accent-wrapper">
      <div className="card-accent-left" style={{ backgroundColor: color }}></div>
      <div className="card-accent-dot" style={{ backgroundColor: color }}></div>
      <div className="card-accent-right" style={{ backgroundColor: color }}></div>
    </div>
  );
}

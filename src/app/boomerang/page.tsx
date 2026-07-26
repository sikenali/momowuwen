export default function BoomerangPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <iframe
        src="/boomerang/"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="Doc智能处理平台"
        allow="fullscreen"
      />
    </div>
  );
}

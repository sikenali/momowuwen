'use client';

export default function AdminPage() {
  return (
    <>
      <style>{`
        main.flex-1 { overflow: visible !important; padding: 0 !important; margin: 0 !important; }
        #cms { min-height: 100vh; }
      `}</style>
      <div id="cms" />
      <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" />
    </>
  );
}

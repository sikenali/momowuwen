'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [error, setError] = useState('');

  useEffect(() => {
    const originalError = window.onerror;
    window.onerror = (event, source, lineno, colno, error) => {
      if ((typeof source === 'string' && source.includes('decap-cms')) || (typeof event === 'string' && event.includes('config'))) {
        setError('Failed to load CMS configuration. Check browser console for details.');
      }
      return originalError?.(event, source, lineno, colno, error) ?? false;
    };
  }, []);

  return (
    <>
      <style>{`
        body { margin: 0; }
        main.flex-1 { min-height: 100vh; padding: 0; margin: 0; overflow: visible !important; }
      `}</style>
      <div id="cms" style={{ minHeight: '100vh' }}>
        {!error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            color: 'rgba(139, 115, 85, 1)',
            fontSize: '16px',
          }}>
            加载中...
          </div>
        )}
      </div>
      {error && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          background: 'rgba(194, 58, 43, 0.9)',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '14px',
          zIndex: 9999,
        }}>
          {error}
        </div>
      )}
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onReady={() => {
          const win = window as Window & typeof globalThis & { CMS?: { registerPreviewStyle: (url: string) => void } };
          if (win.CMS) {
            win.CMS.registerPreviewStyle('/admin/preview.css');
          }
        }}
        onError={() => {
          setError('Failed to load Decap CMS library');
        }}
      />
    </>
  );
}

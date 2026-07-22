'use client';

import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

export default function AdminPage() {
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  const handleError = useCallback((msg: string) => {
    setError(msg);
    setReady(true);
  }, []);

  useEffect(() => {
    const originalError = window.onerror;
    window.onerror = (event, source, lineno, colno, error) => {
      if ((typeof source === 'string' && source.includes('decap-cms')) || (typeof event === 'string' && event.includes('config'))) {
        handleError('Failed to load CMS configuration. Check browser console for details.');
      }
      return originalError?.(event, source, lineno, colno, error) ?? false;
    };

  }, [handleError]);
  
  return (
    <>
      <style>{`
        main.flex-1 { overflow: visible !important; padding: 0 !important; margin: 0 !important; }
        #cms { min-height: 100vh; }
      `}</style>
      <div id="cms" />
      {!ready && !error && (
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          background: 'rgba(250, 246, 237, 1)',
          color: 'rgba(139, 115, 85, 1)',
          fontSize: '16px',
        }}>
          加载中...
        </div>
      )}
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
          setReady(true);
          const win = window as Window & typeof globalThis & { CMS?: { registerPreviewStyle: (url: string) => void } };
          if (win.CMS) {
            win.CMS.registerPreviewStyle('/admin/preview.css');
          }
        }}
        onError={() => {
          handleError('Failed to load Decap CMS library');
        }}
      />
    </>
  );
}

'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [error, setError] = useState('');

  useEffect(() => {
    const win = window as Window & typeof globalThis & { CMS?: { registerPreviewStyle: (url: string) => void } };
    if (win.CMS) {
      win.CMS.registerPreviewStyle('/admin/preview.css');
    }

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
      <div style={{ minHeight: '100vh', background: 'rgba(250, 246, 237, 1)', padding: '40px 64px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', paddingTop: '80px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'rgba(44, 36, 22, 1)', marginBottom: '16px' }}>CMS 管理后台</h2>
          <p style={{ color: 'rgba(139, 115, 85, 1)', marginBottom: '32px' }}>Decap CMS 正在加载...</p>
          <div id="cms"></div>
          {error && (
            <div style={{
              marginTop: '24px',
              padding: '16px 24px',
              background: 'rgba(194, 58, 43, 0.08)',
              border: '1px solid rgba(194, 58, 43, 0.2)',
              borderRadius: '12px',
              color: 'rgba(194, 58, 43, 1)',
              fontSize: '14px',
            }}>
              {error}
            </div>
          )}
          <Script
            src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
            strategy="afterInteractive"
            crossOrigin="anonymous"
            onReady={() => {
              console.log('Decap CMS loaded');
            }}
            onError={() => {
              setError('Failed to load Decap CMS library');
            }}
          />
        </div>
      </div>
    </>
  );
}

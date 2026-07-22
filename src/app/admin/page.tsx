'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const originalError = window.onerror;
    window.onerror = (event, source, lineno, colno, error) => {
      if ((typeof source === 'string' && source.includes('decap-cms')) || (typeof event === 'string' && event.includes('config'))) {
        setError('Failed to load CMS configuration. Check browser console for details.');
      }
      return originalError?.(event, source, lineno, colno, error) ?? false;
    };

    const main = document.querySelector('main');
    if (main) {
      (main as HTMLElement).style.overflow = 'visible';
      (main as HTMLElement).style.padding = '0';
      (main as HTMLElement).style.margin = '0';
    }

    document.body.style.margin = '0';

    const cms = document.createElement('div');
    cms.id = 'cms';
    cms.style.cssText = 'min-height:100vh;margin:0;padding:0';
    document.body.insertBefore(cms, document.body.firstChild);

    const observer = new MutationObserver(() => {
      if (document.getElementById('nc-root')) {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(cms, { childList: true, subtree: true });

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
    script.async = true;
    script.onerror = () => {
      setError('Failed to load Decap CMS library');
    };
    document.body.appendChild(script);

    setTimeout(() => setReady(true), 10000);

    return () => {
      cms.remove();
      script.remove();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {!ready && !error && (
        <div style={{
          position: 'fixed', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, background: 'rgba(250, 246, 237, 1)',
          color: 'rgba(139, 115, 85, 1)', fontSize: '16px',
        }}>
          加载中...
        </div>
      )}
      {error && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          padding: '12px 24px', background: 'rgba(194, 58, 43, 0.9)',
          borderRadius: '8px', color: '#fff', fontSize: '14px', zIndex: 9999,
        }}>
          {error}
        </div>
      )}
    </>
  );
}

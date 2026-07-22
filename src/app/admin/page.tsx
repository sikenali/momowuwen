'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function AdminPage() {
  const cmsReadyRef = useRef(false);

  useEffect(() => {
    // Inject a clean #cms div directly into body, outside of React
    if (cmsReadyRef.current) return;
    cmsReadyRef.current = true;

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    // Remove any existing #cms (from React SSR) and recreate fresh
    const existing = document.getElementById('cms');
    if (existing) existing.remove();

    const cms = document.createElement('div');
    cms.id = 'cms';
    document.body.appendChild(cms);

    // When CMS fully initializes (after script loads and renders), remove this loading marker
    const checkCmsReady = setInterval(() => {
      if (cms.querySelector('[id="nc-root"]')) {
        clearInterval(checkCmsReady);
        // CMS has replaced innerHTML - we're good
      }
    }, 200);

    // Cleanup on unmount
    return () => {
      clearInterval(checkCmsReady);
      const el = document.getElementById('cms');
      if (el) el.remove();
    };
  }, []);

  return (
    <>
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
      />
    </>
  );
}

'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function AdminPage() {
  useEffect(() => {
    // Mount CMS directly to body - completely outside React tree
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    const cms = document.createElement('div');
    cms.id = 'cms';
    cms.style.minHeight = '100vh';
    document.body.insertBefore(cms, document.body.firstChild);

    return () => {
      const el = document.getElementById('cms');
      if (el) el.remove();
      document.body.style.margin = '';
      document.body.style.padding = '';
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

'use client';

import Script from 'next/script';

declare global {
  interface Window {
    CMS?: {
      init: (config: { configUrl: string }) => void;
    };
  }
}

export default function AdminPage() {
  return (
    <>
      <div id="cms"></div>
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.CMS) {
            window.CMS.init({ configUrl: '/api/cms' });
          }
        }}
      />
    </>
  );
}

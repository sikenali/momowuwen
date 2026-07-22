'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current && !isAdmin) {
      mainRef.current.scrollTop = 0;
    }
    // Override body constraints for CMS full-screen layout
    if (isAdmin) {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.margin = '0';
    }
  }, [isAdmin]);

  return (
    <>
      {!isAdmin && <Nav />}
      {isAdmin ? (
        children
      ) : (
        <main ref={mainRef} className="flex-1 overflow-y-scroll">{children}</main>
      )}
      {!isAdmin && <Footer />}
    </>
  );
}

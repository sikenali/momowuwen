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
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <>
      <Nav />
      <main ref={mainRef} className="flex-1 overflow-y-scroll">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}

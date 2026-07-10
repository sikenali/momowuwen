'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ArticleDetailRedirect() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    if (slug) {
      router.replace(`/blog?view=${slug}`, { scroll: false });
    }
  }, [slug, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>加载中...</p>
    </div>
  );
}

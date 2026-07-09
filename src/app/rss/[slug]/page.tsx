import { allPosts } from '../../.velite';
import { siteConfig } from '@/lib/site-config';

export async function generateStaticParams() {
  return [{ slug: 'rss.xml' }];
}

export function generateMetadata() {
  return {
    title: 'RSS Feed',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export default async function RSSPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const items = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return `
        <item>
          <title>${post.title}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description>${post.description || ''}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>`;
    }).join('\n      ');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.title}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>zh-CN</language>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
      ${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'charset': 'UTF-8',
    },
  });
}

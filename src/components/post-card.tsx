import Link from 'next/link';
import { Post } from '@/lib/content';
import { RiCalendarFill, RiEyeFill, RiHeartFill } from '@remixicon/react';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  // Fake stats for design demo
  const fakeViews = Math.floor(Math.random() * 1000) + 100;
  const fakeLikes = Math.floor(Math.random() * 100) + 10;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 border border-gold/10 hover:border-primary/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {post.cover ? (
        <div className="relative h-48 overflow-hidden">
          <Image src={post.cover} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-primary/5 to-gold/5 flex items-center justify-center">
          <span className="text-4xl text-primary/20 font-calligraphy">墨</span>
        </div>
      )}
      <div className="p-5">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-body">{tag}</span>
            ))}
          </div>
        )}
        <h3 className="text-lg text-primary font-calligraphy mb-2 group-hover:text-gold transition-colors line-clamp-1">
          {post.title}
        </h3>
        <p className="text-ink/60 font-body text-sm line-clamp-2 mb-4 leading-relaxed">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-xs text-ink/40 font-body pt-3 border-t border-gold/10">
          <span className="flex items-center gap-1">
            <RiCalendarFill className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString('zh-CN')}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><RiEyeFill className="w-3.5 h-3.5" />{fakeViews}</span>
            <span className="flex items-center gap-1"><RiHeartFill className="w-3.5 h-3.5" />{fakeLikes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
import Link from 'next/link';
import { Post } from '@/lib/content';
import { RiCalendarFill, RiFolderFill } from '@remixicon/react';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-gold/10 hover:border-primary/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {post.cover && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl text-primary font-calligraphy mb-2 group-hover:text-gold transition-colors">
          {post.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-ink/50 mb-3">
          <span className="flex items-center gap-1">
            <RiCalendarFill className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString('zh-CN')}
          </span>
          <span className="flex items-center gap-1">
            <RiFolderFill className="w-4 h-4" />
            {post.category}
          </span>
        </div>
        <p className="text-ink/70 font-body text-sm line-clamp-2 mb-3">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-body"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
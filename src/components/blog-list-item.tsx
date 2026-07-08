import Link from 'next/link';
import { Post } from '@/lib/content';
import { RiCalendarFill, RiEyeFill, RiHeartFill, RiChat3Fill, RiArrowRightSLine } from '@remixicon/react';
import Image from 'next/image';

interface BlogListItemProps {
  post: Post;
  index?: number;
}

export function BlogListItem({ post, index = 0 }: BlogListItemProps) {
  const fakeViews = Math.floor(Math.random() * 800) + 200;
  const fakeLikes = Math.floor(Math.random() * 80) + 20;
  const fakeComments = Math.floor(Math.random() * 30) + 5;

  return (
    <div
      className="group flex flex-col sm:flex-row gap-0 sm:gap-6 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 border border-gold/10 hover:border-primary/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Cover */}
      <Link href={`/blog/${post.slug}`} className="sm:w-[280px] shrink-0">
        {post.cover ? (
          <div className="relative h-48 sm:h-full min-h-[200px] overflow-hidden">
            <Image src={post.cover} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        ) : (
          <div className="h-48 sm:h-full min-h-[200px] bg-gradient-to-br from-primary/5 to-gold/5 flex items-center justify-center">
            <span className="text-5xl text-primary/20 font-calligraphy">墨</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Tags + date */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            {post.tags.length > 0 && (
              <span className="px-2.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-body">
                {post.tags[0]}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-ink/40 font-body">
              <RiCalendarFill className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </span>
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-xl text-primary font-calligraphy mb-2 group-hover:text-gold transition-colors">
              {post.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-ink/60 font-body text-sm leading-relaxed line-clamp-2 mb-4">
            {post.description}
          </p>
        </div>

        {/* Bottom: Author + Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gold/10">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs text-primary font-calligraphy">墨</span>
            </div>
            <div>
              <p className="text-sm text-ink/70 font-body leading-tight">墨韵</p>
              <p className="text-xs text-ink/40 font-body">博主</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-ink/40 font-body">
            <span className="flex items-center gap-1"><RiEyeFill className="w-3.5 h-3.5" />{fakeViews}</span>
            <span className="flex items-center gap-1"><RiHeartFill className="w-3.5 h-3.5" />{fakeLikes}</span>
            <span className="flex items-center gap-1"><RiChat3Fill className="w-3.5 h-3.5" />{fakeComments}</span>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <Link href={`/blog/${post.slug}`} className="hidden sm:flex items-center px-4 text-ink/20 hover:text-primary transition-colors">
        <RiArrowRightSLine className="w-5 h-5" />
      </Link>
    </div>
  );
}
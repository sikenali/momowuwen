import Link from 'next/link';
import { Post } from '@/lib/content';
import { RiEyeFill, RiChatVoiceFill, RiThumbUpFill, RiArrowRightUpFill, RiCalendarFill } from '@remixicon/react';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
  index?: number;
}

const tagColors = [
  { bg: 'rgba(224,240,228,1)', text: 'rgba(74,140,109,1)' },  // 绿色
  { bg: 'rgba(232,240,248,1)', text: 'rgba(91,127,168,1)' },  // 蓝色
  { bg: 'rgba(253,232,228,1)', text: 'rgba(194,58,43,1)' },   // 红色
  { bg: 'rgba(245,235,220,1)', text: 'rgba(160,139,106,1)' }, // 棕色
];

export function PostCard({ post, index = 0 }: PostCardProps) {
  const tagColor = tagColors[index % tagColors.length];
  const views = post.views || Math.floor(Math.random() * 5000) + 1000;
  const comments = post.comments || Math.floor(Math.random() * 100) + 10;
  const likes = post.likes || Math.floor(Math.random() * 200) + 20;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group bg-white/80 backdrop-blur-sm rounded-[16px] overflow-hidden border border-[#E8DFC8]"
      style={{
        boxShadow: '0 4px 20px rgba(139,115,85,0.06)',
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex" style={{ height: '272px' }}>
        {/* 左侧封面 */}
        {post.cover ? (
          <div className="relative w-[321px] flex-shrink-0 overflow-hidden rounded-l-[16px]">
            <Image src={post.cover} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        ) : (
          <div className="relative w-[321px] flex-shrink-0 overflow-hidden rounded-l-[16px]" style={{
            background: 'linear-gradient(135deg, rgba(245,208,200,1), rgba(194,58,43,1))',
          }}>
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl text-white/30 font-calligraphy">墨</span>
            </div>
          </div>
        )}

        {/* 右侧内容 */}
        <div className="flex-1 flex flex-col justify-between p-8">
          {/* 上部：标签行 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              {post.tags.length > 0 && post.tags.slice(0, 2).map((tag, i) => {
                const color = tagColors[(index + i) % tagColors.length];
                return (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: color.bg,
                      color: color.text,
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
              <span className="flex items-center gap-1 text-[#A08B6A]" style={{ fontSize: '12px' }}>
                <RiCalendarFill className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('zh-CN')}
              </span>
            </div>

            {/* 标题 */}
            <h3 className="text-[28px] text-[#2C2416] leading-tight mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            {/* 描述 */}
            <p className="text-[15px] text-[#6B5A3E] leading-relaxed line-clamp-2">
              {post.description}
            </p>
          </div>

          {/* 底部：作者信息 + 数据统计 + 阅读全文 */}
          <div className="flex items-center justify-between pt-4 mt-4" style={{ borderTop: '1px solid rgba(232,223,200,1)' }}>
            {/* 作者信息 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{
                backgroundColor: 'rgba(212,168,67,0.3)',
              }}>
                <span className="text-[16px]"></span>
              </div>
              <div>
                <div className="text-[13px] font-medium text-[#5C4A32]">墨轩主人</div>
                <div className="text-[11px] text-[#A08B6A]">阅读约 12 分钟</div>
              </div>
            </div>

            {/* 阅读全文 */}
            <span className="flex items-center gap-1" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(194,58,43,1)' }}>
              阅读全文
              <RiArrowRightUpFill className="w-4.5 h-4.5" style={{ color: 'rgba(194,58,43,1)' }} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

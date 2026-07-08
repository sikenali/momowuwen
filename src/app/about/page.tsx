import { RiBrushFill, RiUserFill, RiMapPinFill, RiCodeFill, RiTimeFill } from '@remixicon/react';

const infoItems = [
  { icon: RiUserFill, label: '姓名', value: '墨韵', color: 'bg-[#FDE8E4]' },
  { icon: RiMapPinFill, label: '坐标', value: '中国·杭州', color: 'bg-[#E0F0E4]' },
  { icon: RiCodeFill, label: '领域', value: '前端开发 / UI 设计', color: 'bg-[#FAF0D0]' },
  { icon: RiTimeFill, label: '经验', value: '5 年', color: 'bg-[#E8F0F8]' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* 页面标题区 */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary/10"
              style={{ width: `${Math.random() * 8 + 4}px`, height: `${Math.random() * 8 + 4}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary/30 flex items-center justify-center">
            <RiBrushFill className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl text-primary font-calligraphy mb-4">关于我</h1>
          <p className="text-ink/50 font-body text-sm sm:text-base mb-6">了解更多关于我的故事</p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gold/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="w-16 h-px bg-gold/30" />
          </div>
        </div>
      </section>

      {/* 个人信息区 */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* 左侧基本信息 */}
          <div className="lg:w-[360px] shrink-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <RiBrushFill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl text-primary font-calligraphy">基本信息</h2>
                <p className="text-[10px] text-ink/30 font-body tracking-widest">BASIC INFO</p>
              </div>
            </div>

            <div className="space-y-3">
              {infoItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className={`${item.color} rounded-lg p-4 flex items-center gap-4`}>
                    <Icon className="w-5 h-5 shrink-0" style={{ color: item.label === '姓名' ? '#C23B22' : item.label === '坐标' ? '#4A8C6D' : item.label === '领域' ? '#B8860B' : '#5B7FA8' }} />
                    <div>
                      <p className="text-xs text-ink/50 font-body">{item.label}</p>
                      <p className="text-sm text-ink/80 font-body font-medium">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右侧个人简介 */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <RiBrushFill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl text-primary font-calligraphy">个人简介</h2>
                <p className="text-[10px] text-ink/30 font-body tracking-widest">ABOUT ME</p>
              </div>
            </div>

            <div className="space-y-5 text-ink/60 font-body text-sm sm:text-base leading-relaxed">
              <p>
                你好，我是墨韵，一名热爱技术与设计的前端开发者。我相信代码可以像诗歌一样优美，界面可以如水墨画般意境深远。
              </p>
              <p>
                拥有 5 年前端开发经验，专注于 React/Next.js 生态，同时也关注 UI/UX 设计。曾在多家互联网公司担任前端工程师，参与过电商、数据可视化、低代码平台等多个大型项目。
              </p>
              <p>
                工作之余，我喜欢写技术博客、参与开源项目，以及探索中国传统文化与现代技术的融合之道。这个博客就是我对这一理念的实践。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-gold/20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <RiBrushFill className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-primary font-calligraphy">墨韵</p>
                <p className="text-[10px] text-ink/30 font-body tracking-widest">INK & SILENCE</p>
              </div>
            </div>
            <p className="text-xs text-ink/30 font-body">© 2026 墨韵. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
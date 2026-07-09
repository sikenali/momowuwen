# 墨墨梧文

中国古典水墨风格个人博客。基于 Next.js 15 + React 19 + Tailwind CSS v4。

## 功能

- **水墨主题** — 宣纸底色、朱红印章、金色点缀、墨色山峦
- **Canvas 山峦视差** — 滚动时多层水墨山脉交叠
- **粒子飘散** — 浮动粒子营造墨韵氛围
- **滑动导航** — 弹簧弹性动画指示器，hover 预览 + 点击即时切换
- **响应式布局** — 桌面/平板/手机自适应
- **文章 & 项目** — Velite 内容管道，Markdown 驱动
- **图标** — Remixicon 羽毛笔/水滴图标，自定义 favicon

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 构建

```bash
npm run build
```

## 技术栈

- Next.js 15.5.10 + React 19.2.4
- TypeScript 5.9.3
- Tailwind CSS v4.2.1
- Velite v0.3.1（内容生成）
- Remixicon v4.9（图标库）

## 目录结构

```
content/
├── posts/          # 博客文章 Markdown
└── projects/       # 项目 Markdown
src/
├── app/            # 页面
├── components/     # 组件（导航/山峦/文章卡片等）
└── lib/            # 配置与工具
public/
├── images/         # 静态资源
└── favicon.svg     # 站点图标
```

## 许可

MIT

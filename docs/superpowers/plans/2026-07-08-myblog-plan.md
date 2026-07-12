# MyBlog 个人博客平台 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个中国古典水墨风格的个人博客平台，包含首页动画、博客列表、项目展示、关于我页面，通过 Decap CMS 管理内容，部署于 Vercel。

**Architecture:** Next.js App Router 静态站点生成，Velite 处理 Markdown 内容管道，Decap CMS 提供可视化编辑，Tailwind CSS v4 实现自定义水墨风格主题。

**Tech Stack:** Next.js 15.5.10, React 19.2.4, TypeScript 5.9.3, Tailwind CSS v4.2.1, Velite v0.3.1, Decap CMS, rehype-pretty-code, @remixicon/react, Google Fonts.

## Global Constraints

- 框架版本：Next.js 15.5.10 + React 19.2.4
- 语言：TypeScript 5.9.3 strict mode
- 样式：Tailwind CSS v4.2.1 via `@tailwindcss/postcss` + `@tailwindcss/typography`
- 内容管道：Velite v0.3.1
- 部署：Vercel 一键部署
- 代码高亮：rehype-pretty-code
- 图标：@remixicon/react
- Lint：ESLint (next/core-web-vitals)
- 主色调：朱红 `#C23B22`
- 配色：金色 `#D4AF37`、Jade 绿 `#2E8B57`、云蓝 `#6BA3BE`、羊皮纸底 `#FDF8F0`、墨色 `#2B2B2B`
- 字体：马善政书法体（标题）、站酷小薇体（正文）、思源宋体（代码/引用）

---

### Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces: Next.js 15 + TypeScript 项目骨架

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "momowuwen",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "gen": "velite generate"
  },
  "dependencies": {
    "next": "15.5.10",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "@remixicon/react": "^4.6.0",
    "rehype-pretty-code": "^0.14.0",
    "remark-gfm": "^4.0.1",
    "rehype-raw": "^7.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-stringify": "^10.0.1",
    "remark-parse": "^11.0.0",
    "remark-rehype": "^11.1.1",
    "unified": "^11.0.5"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "@types/node": "^22.15.3",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@tailwindcss/postcss": "^4.2.1",
    "@tailwindcss/typography": "^0.5.16",
    "tailwindcss": "^4.2.1",
    "postcss": "^8.5.3",
    "velite": "^0.3.1",
    "zod": "^3.24.4",
    "eslint": "^9.25.0",
    "eslint-config-next": "15.5.10"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 next.config.ts**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 4: 创建 .gitignore**

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Decap CMS admin
/admin
```

- [ ] **Step 5: 安装依赖**

```bash
npm install
```

**Expected output:** `added XXX packages in Xs`

---

### Task 2: 样式系统与字体配置

**Files:**
- Create: `src/lib/fonts.ts`
- Create: `tailwind.config.ts` (deprecated in v4, use css)
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `src/lib/site-config.ts`

**Interfaces:**
- Consumes: Tailwind CSS v4 + PostCSS
- Produces: 全局样式系统、水墨主题配色、Google Fonts

- [ ] **Step 1: 创建 postcss.config.mjs**

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

- [ ] **Step 2: 创建 src/lib/fonts.ts**

```typescript
import { Ma_Shanzheng, ZCOOL_XiaoWei, Noto_Serif_SC } from 'next/font/google';

export const maShanzheng = Ma_Shanzheng({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-calligraphy',
});

export const zcoXiaoWei = ZCOOL_XiaoWei({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const notoSerifSC = Noto_Serif_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});
```

- [ ] **Step 3: 创建 src/lib/site-config.ts**

```typescript
export const siteConfig = {
  title: '墨墨梧文',
  description: '中国古典水墨风格个人博客',
  url: 'https://momowuwen.vercel.app',
  author: '作者名',
  email: 'your@email.com',
  social: {
    github: 'https://github.com/yourusername',
    wechat: '',
  },
  themeColors: {
    primary: '#C23B22',
    gold: '#D4AF37',
    jade: '#2E8B57',
    cloudBlue: '#6BA3BE',
    parchment: '#FDF8F0',
    ink: '#2B2B2B',
  },
} as const;
```

- [ ] **Step 4: 创建 src/app/globals.css**

```css
@import 'tailwindcss';

@theme {
  --color-primary: #C23B22;
  --color-gold: #D4AF37;
  --color-jade: #2E8B57;
  --color-cloud-blue: #6BA3BE;
  --color-parchment: #FDF8F0;
  --color-ink: #2B2B2B;

  --font-calligraphy: var(--font-calligraphy);
  --font-body: var(--font-body);
  --font-serif: var(--font-serif);

  --animate-float: float 6s ease-in-out infinite;
  --animate-fade-in-up: fadeInUp 0.6s ease-out forwards;
  --animate-particle-drift: particleDrift 8s linear infinite;
  --animate-cloud-drift: cloudDrift 20s linear infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes particleDrift {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--drift-x, 50px), var(--drift-y, -100px)) scale(0.5);
    opacity: 0;
  }
}

@keyframes cloudDrift {
  from { transform: translateX(-100%); }
  to { transform: translateX(100vw); }
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-parchment text-ink font-body antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-calligraphy;
  }
}

@layer components {
  .prose-custom {
    @apply prose prose-lg max-w-none
      prose-headings:font-calligraphy
      prose-p:font-body
      prose-strong:text-primary
      prose-code:font-serif
      prose-pre:bg-ink prose-pre:text-parchment
      prose-blockquote:border-l-primary prose-blockquote:italic;
  }
}
```

- [ ] **Step 5: 验证样式系统**

```bash
npm run lint
```

---

### Task 3: Velite 内容管道配置

**Files:**
- Create: `velite.config.ts`
- Create: `src/lib/content.ts` (generated by velite, but define schema here)

**Interfaces:**
- Consumes: zod, velite
- Produces: PostSchema, ProjectSchema, 导出的 posts[] 和 projects[]

- [ ] **Step 1: 创建 velite.config.ts**

```typescript
import { defineCollection, defineConfig, s, slug } from 'velite';

const posts = defineCollection({
  name: 'Post',
  directory: 'content/posts',
  include: '**/*.md',
  format: 'mdx',
  schema: s.object({
    title: s.string().max(200),
    date: s.date(),
    description: s.string().max(500),
    tags: s.array(s.string()).default([]),
    category: s.string().default('随笔'),
    cover: s.string().optional(),
    slug: s.slug(),
    body: s.mdx(),
    content: s.html(),
    excerpts: s.excerpts(),
    wordCount: s.wordCount(),
    readingTime: s.readingTime(),
  }),
});

const projects = defineCollection({
  name: 'Project',
  directory: 'content/projects',
  include: '**/*.md',
  format: 'mdx',
  schema: s.object({
    title: s.string().max(200),
    date: s.date(),
    description: s.string().max(500),
    tags: s.array(s.string()).default([]),
    category: s.string().default('项目'),
    cover: s.string().optional(),
    link: s.string().url().optional(),
    slug: s.slug(),
    body: s.mdx(),
    content: s.html(),
    excerpts: s.excerpts(),
    wordCount: s.wordCount(),
    readingTime: s.readingTime(),
  }),
});

export default defineConfig({
  collections: { posts, projects },
  root: 'content',
  exclude: ['content/**/_*', '**/*.test.md'],
});
```

- [ ] **Step 2: 生成内容类型**

```bash
npm run gen
```

这会生成 `src/lib/content.ts`，包含 `posts` 和 `projects` 数组。

- [ ] **Step 3: 创建示例文章**

创建 `content/posts/hello-world.md`:

```markdown
---
title: 你好，世界
date: 2026-07-08
tags: [入门, 博客]
category: 技术
cover: /images/cover-default.jpg
description: 这是我的第一篇博客文章
---

欢迎来到我的水墨博客。

这是一篇示例文章，用于测试 Velite 的内容管道。

## 功能特性

- Markdown 写作
- 代码高亮
- 标签分类

```typescript
console.log('Hello, World!');
```

---

创建 `content/projects/sample-project.md`:

```markdown
---
title: 示例项目
date: 2026-07-08
tags: [Next.js, TypeScript]
category: Web 应用
cover: /images/project-default.jpg
description: 这是一个示例项目
link: https://example.com
---

这是项目的详细描述。

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
```

- [ ] **Step 4: 验证内容生成**

```bash
npm run build
```

检查 `.velite/` 或生成的内容文件是否存在。

---

### Task 4: 全局布局与导航栏

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/components/nav.tsx`
- Create: `src/components/progress-bar.tsx`

**Interfaces:**
- Consumes: fonts.ts, site-config.ts, globals.css
- Produces: 全局布局（字体、导航、进度条）

- [ ] **Step 1: 创建 src/components/progress-bar.tsx**

```typescript
'use client';

import { useEffect, useState } from 'react';

export function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div
        className="h-full bg-primary transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
```

- [ ] **Step 2: 创建 src/components/nav.tsx**

```typescript
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { RiBrushFill, RiHomeFill, RiBookFill, RiCodeSSlashFill, RiUserFill } from '@remixicon/react';

export function Nav() {
  const navItems = [
    { href: '/', label: '首页', icon: RiHomeFill },
    { href: '/blog', label: '博客', icon: RiBookFill },
    { href: '/projects', label: '项目', icon: RiCodeSSlashFill },
    { href: '/about', label: '关于', icon: RiUserFill },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-parchment/90 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <RiBrushFill className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
            <span className="text-xl font-calligraphy text-primary">{siteConfig.title}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 text-ink/70 hover:text-primary transition-colors font-body"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button placeholder */}
          <button className="md:hidden p-2 text-ink/70 hover:text-primary">
            <RiBrushFill className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: 更新 src/app/layout.tsx**

```typescript
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { maShanzheng, zcoXiaoWei, notoSerifSC } from '@/lib/fonts';
import './globals.css';
import { Nav } from '@/components/nav';
import { ProgressBar } from '@/components/progress-bar';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${maShanzheng.variable} ${zcoXiaoWei.variable} ${notoSerifSC.variable}`}
    >
      <body className="overflow-x-hidden">
        <div className="min-h-screen">
          <Nav />
          <ProgressBar />
          <main className="pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: 验证导航栏**

```bash
npm run dev
```

浏览器访问 `http://localhost:3000`，确认导航栏显示正常。

---

### Task 5: 首页 Hero 区域（CSS 云层 + 粒子）

**Files:**
- Create: `src/components/hero.tsx`
- Create: `src/app/page.tsx`

**Interfaces:**
- Consumes: globals.css animations
- Produces: 首页 Hero 区域（云层漂浮、粒子飘散）

- [ ] **Step 1: 创建 src/components/hero.tsx**

```typescript
'use client';

import { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: string;
  driftY: string;
  delay: number;
  duration: number;
}

export function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      driftX: `${Math.random() * 100 - 50}px`,
      driftY: `-${Math.random() * 150 + 50}px`,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 6,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    generateParticles();
  }, [generateParticles]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Cloud layers */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute top-[20% + i*15%] w-[200%] opacity-30"
            style={{
              animation: `cloudDrift ${15 + i * 5}s linear infinite`,
              animationDelay: `-${i * 5}s`,
            }}
          >
            <svg
              viewBox="0 0 1200 100"
              className="w-full h-24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,50 Q150,10 300,50 T600,50 T900,50 T1200,50 V100 H0 Z"
                fill={`rgba(107, 163, 190, ${0.1 + i * 0.05})`}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-primary/20 animate-particle-drift"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--drift-x': p.driftX,
              '--drift-y': p.driftY,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl text-primary font-calligraphy mb-6 animate-float">
          墨韵
        </h1>
        <p className="text-xl sm:text-2xl text-ink/70 font-body max-w-2xl mx-auto">
          水墨丹青，诗书礼乐
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#posts"
            className="px-6 py-3 bg-primary text-parchment font-body rounded hover:bg-primary/90 transition-colors"
          >
            浏览文章
          </a>
          <a
            href="/about"
            className="px-6 py-3 border border-gold/50 text-gold font-body rounded hover:bg-gold/10 transition-colors"
          >
            了解更多
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 创建 src/app/page.tsx**

```typescript
import { Hero } from '@/components/hero';
import { PostCard } from '@/components/post-card';
import { getAllPosts } from '@/lib/content';

export default function Home() {
  const posts = getAllPosts().sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 6);

  return (
    <>
      <Hero />

      <section id="posts" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl text-primary font-calligraphy text-center mb-12">
          最新文章
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: 验证首页**

```bash
npm run dev
```

确认首页 Hero 区域动画正常，最新文章卡片显示正确。

---

### Task 6: 博客列表与文章详情页

**Files:**
- Create: `src/components/post-card.tsx`
- Create: `src/components/mdx-content.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: content.ts (posts), PostCard props, MDX renderer
- Produces: 博客列表页、文章详情页、渐入动画

- [ ] **Step 1: 创建 src/components/post-card.tsx**

```typescript
import Link from 'next/link';
import { Post } from '@/lib/content';
import { RiCalendarFill, RiTagsFill, RiFolderFill } from '@remixicon/react';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`block group bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-gold/10 hover:border-primary/30`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
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
            {post.date.toLocaleDateString('zh-CN')}
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
```

- [ ] **Step 2: 创建 src/components/mdx-content.tsx**

```typescript
import { MDXRemote } from 'next-mdx-remote/rsc';
import { compileMDX } from 'next-mdx-remote';

async function parseMDX<Frontmatter>(
  content: string,
  options: { frontmatter?: Frontmatter } = {}
) {
  return await compileMDX<Frontmatter>({
    frontmatter: options.frontmatter,
    content,
    options: {
      mdxOptions: {
        rehypePlugins: [
          [import('rehype-pretty-code'), {
            theme: {
              dark: 'one-dark-pro',
              light: 'github-light',
            },
          }],
          import('rehype-slug'),
          import('rehype-raw'),
        ],
        remarkPlugins: [
          import('remark-gfm'),
        ],
      },
    },
  });
}
```

Wait — Velite already processes MDX. Let me fix this to use Velite's content properly.

- [ ] **Step 2 (corrected): 创建 src/components/mdx-content.tsx**

```typescript
import { remarkGfm } from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

interface MDXContentProps {
  content: string;
}

export async function MDXContent({ content }: MDXContentProps) {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(rehypeSlug)
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      theme: {
        dark: 'one-dark-pro',
        light: 'github-light',
      },
    })
    .use(rehypeStringify)
    .process(content);

  return (
    <div
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
    />
  );
}
```

- [ ] **Step 3: 创建 src/app/blog/page.tsx**

```typescript
import { PostCard } from '@/components/post-card';
import { getAllPosts } from '@/lib/content';

export default function BlogPage() {
  const posts = getAllPosts().sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h1 className="text-4xl sm:text-5xl text-primary font-calligraphy text-center mb-4">
        博客
      </h1>
      <p className="text-center text-ink/60 font-body mb-12">
        记录思考，分享技术
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-ink/40 font-body mt-12">
          暂无文章，敬请期待...
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 4: 创建 src/app/blog/[slug]/page.tsx**

```typescript
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/content';
import { MDXContent } from '@/components/mdx-content';
import { PostCard } from '@/components/post-card';
import { RiCalendarFill, RiTagsFill, RiFolderFill, RiReadingFill } from '@remixicon-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: '文章未找到' };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <article className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        {post.cover && (
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-8">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-body">
            {post.category}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-body"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl text-primary font-calligraphy mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-ink/50 font-body">
          <span className="flex items-center gap-1">
            <RiCalendarFill className="w-4 h-4" />
            {post.date.toLocaleDateString('zh-CN')}
          </span>
          <span className="flex items-center gap-1">
            <RiReadingFill className="w-4 h-4" />
            {post.readingTime.text}
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="mb-16">
        <MDXContent content={post.content} />
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section>
          <h2 className="text-2xl text-primary font-calligraphy mb-6">相关推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <PostCard key={rp.slug} post={rp} />
            ))}
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="mt-12 pt-8 border-t border-gold/20">
        <Link
          href="/blog"
          className="text-primary hover:text-gold font-body transition-colors"
        >
          ← 返回博客列表
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 5: 安装 next-mdx-remote 替代方案**

实际上 Velite 已经处理了 MDX 编译，我们需要调整策略。Velite 会生成 `.mdx` 文件的 HTML 内容，所以我们直接用 `dangerouslySetInnerHTML` 渲染即可。

更新 `MDXContent`:

```typescript
interface MDXContentProps {
  html: string;
}

export function MDXContent({ html }: MDXContentProps) {
  return (
    <div
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

并更新 `blog/[slug]/page.tsx` 中使用 `post.html` 而非 `post.content`。

- [ ] **Step 6: 验证博客页面**

```bash
npm run dev
```

访问 `/blog` 和 `/blog/hello-world` 确认渲染正确。

---

### Task 7: 项目展示页

**Files:**
- Create: `src/components/project-card.tsx`
- Create: `src/app/projects/page.tsx`
- Create: `src/app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: content.ts (projects), ProjectCard props
- Produces: 项目卡片、项目列表、项目详情

- [ ] **Step 1: 创建 src/components/project-card.tsx**

```typescript
import Link from 'next/link';
import { Project } from '@/lib/content';
import { RiCalendarFill, RiFolderFill, RiExternalLinkLine } from '@remixicon/react';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`block group bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-gold/10 hover:border-primary/30`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {project.cover && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl text-primary font-calligraphy mb-2 group-hover:text-gold transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-ink/50 mb-3">
          <span className="flex items-center gap-1">
            <RiCalendarFill className="w-4 h-4" />
            {project.date.toLocaleDateString('zh-CN')}
          </span>
          <span className="flex items-center gap-1">
            <RiFolderFill className="w-4 h-4" />
            {project.category}
          </span>
        </div>
        <p className="text-ink/70 font-body text-sm line-clamp-2 mb-3">
          {project.description}
        </p>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-jade/10 text-jade rounded-full font-body"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {project.link && (
          <div className="mt-3 flex items-center gap-1 text-primary text-sm font-body group-hover:text-gold transition-colors">
            <RiExternalLinkLine className="w-4 h-4" />
            查看详情
          </div>
        )}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: 创建 src/app/projects/page.tsx**

```typescript
import { ProjectCard } from '@/components/project-card';
import { getAllProjects } from '@/lib/content';

export default function ProjectsPage() {
  const projects = getAllProjects().sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h1 className="text-4xl sm:text-5xl text-primary font-calligraphy text-center mb-4">
        项目
      </h1>
      <p className="text-center text-ink/60 font-body mb-12">
        展示我的作品与探索
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-center text-ink/40 font-body mt-12">
          暂无项目，敬请期待...
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 3: 创建 src/app/projects/[slug]/page.tsx**

```typescript
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/content';
import { MDXContent } from '@/components/mdx-content';
import { ProjectCard } from '@/components/project-card';
import { RiCalendarFill, RiFolderFill, RiReadingFill, RiExternalLinkLine } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: '项目未找到' };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getAllProjects()
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  return (
    <article className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <header className="mb-12">
        {project.cover && (
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-8">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-body">
            {project.category}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-jade/10 text-jade rounded-full text-sm font-body"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl text-primary font-calligraphy mb-4">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-ink/50 font-body">
          <span className="flex items-center gap-1">
            <RiCalendarFill className="w-4 h-4" />
            {project.date.toLocaleDateString('zh-CN')}
          </span>
          <span className="flex items-center gap-1">
            <RiReadingFill className="w-4 h-4" />
            {project.readingTime.text}
          </span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:text-gold transition-colors"
            >
              <RiExternalLinkLine className="w-4 h-4" />
              外部链接
            </a>
          )}
        </div>
      </header>

      <div className="mb-16">
        <MDXContent html={project.html} />
      </div>

      {relatedProjects.length > 0 && (
        <section>
          <h2 className="text-2xl text-primary font-calligraphy mb-6">相关项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rp) => (
              <ProjectCard key={rp.slug} project={rp} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 pt-8 border-t border-gold/20">
        <Link
          href="/projects"
          className="text-primary hover:text-gold font-body transition-colors"
        >
          ← 返回项目列表
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: 验证项目页面**

```bash
npm run dev
```

访问 `/projects` 和 `/projects/sample-project` 确认渲染正确。

---

### Task 8: 关于我页面

**Files:**
- Create: `src/components/modal.tsx`
- Create: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: site-config.ts, Modal component
- Produces: 关于我页面 + 模态框

- [ ] **Step 1: 创建 src/components/modal.tsx**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { RiCloseFill, RiUserFill, RiMailFill, RiGithubFill } from '@remixicon/react';
import { siteConfig } from '@/lib/site-config';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
      <div
        className="relative bg-parchment rounded-lg max-w-lg w-full p-8 shadow-2xl border border-gold/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink/50 hover:text-primary transition-colors"
        >
          <RiCloseFill className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <RiUserFill className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-2xl text-primary font-calligraphy mb-2">{siteConfig.author}</h3>
          <p className="text-ink/60 font-body mb-4">{siteConfig.description}</p>

          <div className="flex justify-center gap-4 mb-6">
            {siteConfig.social.github && (
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/50 hover:text-primary transition-colors"
              >
                <RiGithubFill className="w-6 h-6" />
              </a>
            )}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-ink/50 hover:text-primary transition-colors"
            >
              <RiMailFill className="w-6 h-6" />
            </a>
          </div>

          <p className="text-ink/70 font-body text-sm leading-relaxed">
            热爱技术与设计，专注于创造优雅的数字体验。
            相信代码可以像诗歌一样优美，界面可以如水墨画般意境深远。
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 src/app/about/page.tsx**

```typescript
'use client';

import { useState } from 'react';
import { Modal } from '@/components/modal';
import {
  RiBrushFill,
  RiCodeFill,
  RiBookReadFill,
  RiLightbulbFill,
  RiTeamFill,
  RiRocketFill,
} from '@remixicon/react';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skills = [
    { icon: RiCodeFill, title: '前端开发', desc: 'React, Next.js, TypeScript, Tailwind CSS' },
    { icon: RiBrushFill, title: 'UI/UX 设计', desc: '交互设计、视觉设计、动效设计' },
    { icon: RiBookReadFill, title: '持续学习', desc: '技术博客、开源贡献、知识分享' },
    { icon: RiLightbulbFill, title: '问题解决', desc: '逻辑思维、架构设计、性能优化' },
    { icon: RiTeamFill, title: '团队协作', desc: '敏捷开发、代码审查、文档编写' },
    { icon: RiRocketFill, title: '高效交付', desc: 'CI/CD、自动化测试、持续集成' },
  ];

  return (
    <>
      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl text-primary font-calligraphy text-center mb-4">
          关于我
        </h1>
        <p className="text-center text-ink/60 font-body mb-12">
          了解更多，请点击下方按钮
        </p>

        <div className="text-center mb-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-primary text-parchment font-calligraphy text-lg rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            查看详细信息
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-gold/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <skill.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg text-primary font-calligraphy mb-2">{skill.title}</h3>
              <p className="text-ink/60 font-body text-sm">{skill.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl text-primary font-calligraphy mb-6">博客理念</h2>
          <p className="text-ink/70 font-body leading-relaxed max-w-2xl mx-auto">
            这个博客是一个融合中国传统美学与现代技术的空间。
            每一篇文章都是一幅水墨画，每一个项目都是一次探索。
            希望通过这个平台，分享技术心得，记录成长历程。
          </p>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
```

- [ ] **Step 3: 验证关于我页面**

```bash
npm run dev
```

访问 `/about` 确认页面和内容展示正确。

---

### Task 9: 水墨山峦 Canvas 组件

**Files:**
- Create: `src/components/mountain-canvas.tsx`

**Interfaces:**
- Consumes: Hero component
- Produces: Canvas 水墨山峦视差动画

- [ ] **Step 1: 创建 src/components/mountain-canvas.tsx**

```typescript
'use client';

import { useEffect, useRef, useCallback } from 'react';

interface MountainLayer {
  points: { x: number; y: number }[];
  color: string;
  speed: number;
  yOffset: number;
}

export function MountainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const scrollRef = useRef<number>(0);

  const createMountainLayer = useCallback((points: { x: number; y: number }[], color: string, speed: number, yOffset: number): MountainLayer => ({
    points,
    color,
    speed,
    yOffset,
  }), []);

  const generateMountains = useCallback((): MountainLayer[] => {
    const layers: MountainLayer[] = [];
    const width = 1920;
    const baseY = 0.7;

    // Layer 1 - farthest, lightest
    const layer1Points: { x: number; y: number }[] = [];
    for (let x = 0; x <= width; x += 60) {
      layer1Points.push({
        x,
        y: (baseY - 0.15 + Math.sin(x * 0.005) * 0.05 + Math.sin(x * 0.01) * 0.03) * 1080,
      });
    }
    layers.push(createMountainLayer(layer1Points, 'rgba(107, 163, 190, 0.15)', 0.1, 0));

    // Layer 2
    const layer2Points: { x: number; y: number }[] = [];
    for (let x = 0; x <= width; x += 50) {
      layer2Points.push({
        x,
        y: (baseY - 0.1 + Math.sin(x * 0.007 + 1) * 0.06 + Math.sin(x * 0.015) * 0.04) * 1080,
      });
    }
    layers.push(createMountainLayer(layer2Points, 'rgba(43, 43, 43, 0.1)', 0.2, 0));

    // Layer 3 - closest, darkest
    const layer3Points: { x: number; y: number }[] = [];
    for (let x = 0; x <= width; x += 40) {
      layer3Points.push({
        x,
        y: (baseY - 0.05 + Math.sin(x * 0.008 + 2) * 0.08 + Math.sin(x * 0.02) * 0.05) * 1080,
      });
    }
    layers.push(createMountainLayer(layer3Points, 'rgba(194, 59, 34, 0.08)', 0.4, 0));

    return layers;
  }, [createMountainLayer]);

  const drawMountains = useCallback(
    (ctx: CanvasRenderingContext2D, layers: MountainLayer[], scrollY: number) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      layers.forEach((layer) => {
        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height);

        layer.points.forEach((point, i) => {
          const parallaxY = point.y + scrollY * layer.speed;
          if (i === 0) {
            ctx.moveTo(point.x, parallaxY);
          } else {
            const prevPoint = layer.points[i - 1];
            const prevParallaxY = prevPoint.y + scrollY * layer.speed;
            const cpx = (prevPoint.x + point.x) / 2;
            ctx.quadraticCurveTo(prevPoint.x, prevParallaxY, cpx, (prevParallaxY + parallaxY) / 2);
          }
        });

        ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
        ctx.closePath();
        ctx.fillStyle = layer.color;
        ctx.fill();
      });
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const layers = generateMountains();

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const animate = () => {
      canvas.width = window.innerWidth;
      canvas.height = 1080;
      drawMountains(ctx, layers, scrollRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll);
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, [generateMountains, drawMountains]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
```

- [ ] **Step 2: 在 Hero 组件中引入 MountainCanvas**

更新 `src/components/hero.tsx`，在底部添加：

```typescript
import { MountainCanvas } from './mountain-canvas';

// ... inside the return:
return (
  <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
    {/* ... existing content ... */}
    <MountainCanvas />
  </section>
);
```

- [ ] **Step 3: 验证 Canvas 动画**

```bash
npm run dev
```

滚动页面，确认山峦视差效果正常。

---

### Task 10: Decap CMS 配置

**Files:**
- Create: `admin/config.yml`
- Create: `public/index.html` (Decap CMS entry point)

**Interfaces:**
- Consumes: GitHub repository
- Produces: 可视化 CMS 后台

- [ ] **Step 1: 创建 admin/config.yml**

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO_NAME
  branch: main

media_folder: public/images
public_folder: /images

collections:
  - name: 'posts'
    label: '博客文章'
    folder: 'content/posts'
    create: true
    slug: '{{slug}}'
    fields:
      - { label: '标题', name: 'title', widget: 'string' }
      - { label: '日期', name: 'date', widget: 'datetime' }
      - { label: '摘要', name: 'description', widget: 'string' }
      - { label: '标签', name: 'tags', widget: 'list', allow_add: true }
      - { label: '分类', name: 'category', widget: 'string', default: '技术' }
      - { label: '封面图', name: 'cover', widget: 'image', required: false }
      - { label: '正文', name: 'body', widget: 'markdown' }

  - name: 'projects'
    label: '项目'
    folder: 'content/projects'
    create: true
    slug: '{{slug}}'
    fields:
      - { label: '项目名称', name: 'title', widget: 'string' }
      - { label: '日期', name: 'date', widget: 'datetime' }
      - { label: '项目简介', name: 'description', widget: 'string' }
      - { label: '标签', name: 'tags', widget: 'list', allow_add: true }
      - { label: '分类', name: 'category', widget: 'string', default: 'Web 应用' }
      - { label: '封面图', name: 'cover', widget: 'image', required: false }
      - { label: '外部链接', name: 'link', widget: 'string', required: false }
      - { label: '项目详情', name: 'body', widget: 'markdown' }
```

- [ ] **Step 2: 创建 public/index.html（Decap CMS 入口）**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin</title>
  </head>
  <body>
    <!-- Include the script that builds the CMS and mount it to the DOM -->
    <script src="https://unpkg.com/@decapcms/app@3.14.0/dist/app.bundle.js"></script>
  </body>
</html>
```

Wait — Decap CMS v3 requires a different approach for static hosting. Let me use the correct embedded setup:

- [ ] **Step 2 (corrected): 创建 public/index.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Decap CMS</title>
  </head>
  <body>
    <script src="https://unpkg.com/@decapcms-app/build/main.js"></script>
  </body>
</html>
```

Actually, for Next.js App Router, the recommended approach is to use the Decap CMS embed via a Next.js page. Let me create the correct setup:

- [ ] **Step 2 (final): 创建 src/app/admin/page.tsx**

```typescript
import dynamic from 'next/dynamic';

const DecapCMS = dynamic(() => import('@/components/decap-cms'), { ssr: false });

export default function AdminPage() {
  return <DecapCMS />;
}
```

- [ ] **Step 3: 创建 src/components/decap-cms.tsx**

```typescript
'use client';

import { useEffect } from 'react';

export default function DecapCMS() {
  useEffect(() => {
    const initCMS = async () => {
      const { init } = await import('decap-cms-app');
      init();
    };
    initCMS();
  }, []);

  return (
    <div id="cms" className="min-h-screen bg-parchment">
      <p className="text-center text-ink/50 font-body mt-20">
        Loading CMS...
      </p>
    </div>
  );
}
```

Hmm — Decap CMS doesn't work well as an npm package in Next.js. The standard approach is to serve it as a static SPA. Let me use the simpler approach with `_redirects` and a standalone admin page:

- [ ] **Step 2 (truly final): 创建 public/admin/index.html**

```bash
mkdir -p public/admin
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Admin</title>
  </head>
  <body>
    <div id="cms"></div>
    <script defer src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
```

- [ ] **Step 4: 创建 public/admin/config.yml**

Move `admin/config.yml` to `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO_NAME
  branch: main

media_folder: public/images
public_folder: /images

collections:
  - name: 'posts'
    label: '博客文章'
    folder: 'content/posts'
    create: true
    slug: '{{slug}}'
    fields:
      - { label: '标题', name: 'title', widget: 'string' }
      - { label: '日期', name: 'date', widget: 'datetime' }
      - { label: '摘要', name: 'description', widget: 'string' }
      - { label: '标签', name: 'tags', widget: 'list', allow_add: true }
      - { label: '分类', name: 'category', widget: 'string', default: '技术' }
      - { label: '封面图', name: 'cover', widget: 'image', required: false }
      - { label: '正文', name: 'body', widget: 'markdown' }

  - name: 'projects'
    label: '项目'
    folder: 'content/projects'
    create: true
    slug: '{{slug}}'
    fields:
      - { label: '项目名称', name: 'title', widget: 'string' }
      - { label: '日期', name: 'date', widget: 'datetime' }
      - { label: '项目简介', name: 'description', widget: 'string' }
      - { label: '标签', name: 'tags', widget: 'list', allow_add: true }
      - { label: '分类', name: 'category', widget: 'string', default: 'Web 应用' }
      - { label: '封面图', name: 'cover', widget: 'image', required: false }
      - { label: '外部链接', name: 'link', widget: 'string', required: false }
      - { label: '项目详情', name: 'body', widget: 'markdown' }
```

- [ ] **Step 5: 创建 _redirects（Vercel 路由配置）**

```bash
mkdir -p public
```

创建 `public/_redirects`:

```
/blog/*  /blog/index.html
/admin   /admin/index.html
/admin/* /admin/index.html
```

- [ ] **Step 6: 验证 CMS 配置**

在本地运行时，访问 `/admin` 应该能看到 Decap CMS 登录界面。

---

### Task 11: Vercel 部署配置

**Files:**
- Create: `vercel.json`
- Create: `README.md`

**Interfaces:**
- Consumes: Next.js 项目
- Produces: Vercel 一键部署配置

- [ ] **Step 1: 创建 vercel.json**

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/admin/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: 创建 README.md**

```markdown
# 墨韵 - 个人博客平台

中国古典水墨风格个人博客，基于 Next.js + Decap CMS + Vercel。

## 功能特性

- 水墨风格设计（朱红主色调）
- CSS 云层漂浮 + 粒子飘散动画
- Canvas 水墨山峦视差效果
- Markdown 内容管理（Velite + Decap CMS）
- 响应式设计
- Vercel 一键部署

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 内容管理

### 方式一：直接编辑 Markdown 文件

在 `content/posts/` 或 `content/projects/` 目录下创建 `.md` 文件。

### 方式二：Decap CMS 可视化编辑

访问 `/admin` 使用可视化编辑器。

首次使用需要配置 GitHub OAuth：

1. 前往 [GitHub Developer Settings](https://github.com/settings/developers)
2. 创建 OAuth App
3. 在 Vercel 环境变量中添加：
   - `GITHUB_CLIENT_ID`: OAuth App 的 Client ID
   - `GITHUB_SECRET`: OAuth App 的 Client Secret

## 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com)
3. 点击 "New Project" → 导入你的 GitHub 仓库
4. Vercel 自动检测 Next.js 配置，点击 "Deploy"
5. 部署完成后，访问你的站点域名

## 技术栈

- Next.js 15.5.10
- React 19.2.4
- TypeScript 5.9.3
- Tailwind CSS v4.2.1
- Velite v0.3.1
- Decap CMS
- Vercel

## 目录结构

```
content/
├── posts/          # 博客文章
└── projects/       # 项目内容
src/
├── app/            # Next.js 页面
├── components/     # 可复用组件
└── lib/            # 工具函数和配置
public/
├── images/         # 静态图片
└── admin/          # Decap CMS
```
```

- [ ] **Step 3: 最终验证**

```bash
npm run build
```

确保构建成功，无错误。

---

## 任务总览

| 任务 | 内容 | 预估时间 |
|------|------|----------|
| 1 | 项目初始化 | 5 min |
| 2 | 样式系统与字体配置 | 10 min |
| 3 | Velite 内容管道配置 | 10 min |
| 4 | 全局布局与导航栏 | 10 min |
| 5 | 首页 Hero 区域 | 15 min |
| 6 | 博客列表与文章详情页 | 20 min |
| 7 | 项目展示页 | 15 min |
| 8 | 关于我页面 | 10 min |
| 9 | 水墨山峦 Canvas 组件 | 15 min |
| 10 | Decap CMS 配置 | 15 min |
| 11 | Vercel 部署配置 | 10 min |

**总计预估时间：约 135 分钟（2.25 小时）**

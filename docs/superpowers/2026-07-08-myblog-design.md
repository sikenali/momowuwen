# MyBlog 个人博客平台设计文档

> 日期：2026-07-08
> 状态：已批准

---

## 一、项目概述

个人博客平台，采用中国古典水墨卷轴 × 现代杂志编辑风的美学设计。纯静态生成，通过 Decap CMS 管理内容，部署于 Vercel。

---

## 二、功能清单

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 云层漂浮（CSS）、粒子飘散（CSS）、水墨山峦视差（Canvas） |
| 博客列表 | `/blog` | IntersectionObserver 渐入动画 + 顶部滚动进度条 |
| 文章详情 | `/blog/[slug]` | Markdown 渲染 + 代码高亮 |
| 项目展示 | `/projects` | 6 大故事卡片，点击展开详情 |
| 项目详情 | `/projects/[slug]` | Markdown 渲染 |
| 关于我 | `/about` | 详细介绍 + 快速预览模态框 |

---

## 三、文章数据结构

### 博客文章（`content/posts/*.md`）

```yaml
title: 文章标题
date: 2026-01-01
tags: [标签1, 标签2]
category: 分类名
cover: /images/cover.jpg
description: 文章摘要
---
正文内容（Markdown）
```

### 项目内容（`content/projects/*.md`）

```yaml
title: 项目名称
date: 2026-01-01
tags: [技术栈标签]
category: 项目类型
cover: /images/project-cover.jpg
description: 项目简介
link: https://example.com  # 可选，外部链接
---
项目详情（Markdown）
```

---

## 四、技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15.5.10 (App Router) + React 19.2.4 |
| 语言 | TypeScript 5.9.3 (strict) |
| 样式 | Tailwind CSS v4.2.1 + `@tailwindcss/typography` |
| 内容管道 | Velite v0.3.1（Zod schemas、Markdown 处理） |
| 代码高亮 | rehype-pretty-code |
| 图标 | @remixicon/react |
| CMS | Decap CMS |
| 部署 | Vercel |
| 字体 | Google Fonts（马善政书法体 + 站酷小薇体 + 思源宋体） |

---

## 五、视觉设计

### 配色方案

| 颜色 | 用途 | 色值 |
|------|------|------|
| 朱红（主色） | 导航高亮、按钮、链接 | `#C23B22` |
| 金色（辅色） | 装饰线条、hover 效果 | `#D4AF37` |
| Jade 绿（辅色） | 成功状态、标签 | `#2E8B57` |
| 云蓝（辅色） | 次要链接、背景渐变 | `#6BA3BE` |
| 羊皮纸底 | 页面背景 | `#FDF8F0` |
| 墨色 | 正文文字 | `#2B2B2B` |

### 字体层次

| 用途 | 字体 |
|------|------|
| 标题/Logo | 马善政书法体 |
| 正文 | 站酷小薇体 |
| 代码/引用 | 思源宋体 |

---

## 六、目录结构

```
momowuwen/
├── admin/
│   └── config.yml              # Decap CMS 配置
├── content/
│   ├── posts/                  # 博客文章
│   └── projects/               # 项目内容
├── public/
│   ├── images/                 # 静态资源（封面图等）
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── page.tsx            # 首页
│   │   ├── blog/
│   │   │   ├── page.tsx        # 博客列表
│   │   │   └── [slug]/page.tsx # 文章详情
│   │   ├── projects/
│   │   │   ├── page.tsx        # 项目列表
│   │   │   └── [slug]/page.tsx # 项目详情
│   │   ├── about/
│   │   │   └── page.tsx        # 关于我
│   │   └── layout.tsx          # 全局布局
│   ├── lib/
│   │   ├── site-config.ts      # 站点配置
│   │   └── fonts.ts            # Google Fonts
│   └── components/
│       ├── nav.tsx             # 导航栏
│       ├── hero.tsx            # 首页 Hero（CSS 云层+粒子）
│       ├── mountain-canvas.tsx # 水墨山峦 Canvas
│       ├── post-card.tsx       # 博客卡片
│       ├── project-card.tsx    # 项目卡片
│       ├── modal.tsx           # 关于我模态框
│       ├── progress-bar.tsx    # 滚动进度条
│       └── mdx-content.tsx     # Markdown 渲染器
├── velite.config.ts            # Velite 配置
├── tailwind.config.ts          # Tailwind 配置
├── next.config.ts              # Next.js 配置
├── package.json
└── README.md
```

---

## 七、CMS 方案

### Decap CMS 配置

- 访问路径：`/admin`
- 认证方式：GitHub OAuth
- 支持的集合：`posts`、`projects`
- 图片上传：支持拖拽上传至 `public/images/`

### 部署流程

1. 代码推送到 GitHub 仓库
2. 登录 Vercel → New Project → 导入仓库
3. Vercel 自动检测 Next.js，一键部署
4. Decap CMS 的 `/admin` 随站点一同部署

---

## 八、实现要点

### 8.1 首页动画

- **云层漂浮**：CSS `@keyframes` + `transform: translateX`
- **粒子飘散**：CSS 多个 `div` 元素 + `animation-delay` 错开
- **水墨山峦视差**：Canvas 绘制多层山峦轮廓，根据 `scrollY` 偏移实现视差

### 8.2 博客列表动画

- 使用 `IntersectionObserver` 监听卡片进入视口
- 添加 `fade-in-up` 类触发 CSS 过渡动画
- 顶部固定进度条跟随 `window.scrollY`

### 8.3 Markdown 渲染

- Velite 编译 `.md` → 结构化数据
- `rehype-pretty-code` 实现代码高亮
- `remark-gfm` 支持 GitHub Flavored Markdown

### 8.4 响应式设计

- 移动端：汉堡菜单、单列布局
- 平板：双列网格
- 桌面：三列网格

---

## 九、非目标（Out of Scope）

- 评论系统
- 站内搜索
- RSS 订阅
- 暗黑模式
- 后端 API

---

## 十、决策记录

| 决策 | 选择 | 理由 |
|------|------|------|
| 文章字段 | 标准版（B） | 标题/日期/标签/分类/封面/正文 |
| 首页动画 | 混合方案（C） | 性能与效果的平衡 |
| 项目内容来源 | Markdown（B） | 统一的内容管理方式 |
| 关于我 | 独立页面+模态框（A） | 兼顾 SEO 和用户体验 |
| 主色调 | 朱红（A） | 温暖醒目，契合东方美学 |
| SEO | 最小化（C） | 个人博客，不做复杂优化 |
| CMS | Decap CMS（A） | 可视化编辑 + GitHub 集成 |
| 部署 | Vercel 一键部署 | 零配置、自动 CI/CD |

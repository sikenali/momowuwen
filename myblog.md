## 设计概览



**美学方向**：中国古典水墨卷轴 × 现代杂志编辑风。浅色羊皮纸底色，搭配朱红、金、 jade 绿、云蓝四种传统色彩，营造温润雅致的东方氛围。





### 核心功能 （左上角logo+名称，右上角 导航）



| 功能 | 说明 |

|------|------|

| **🗺️ 首页** | 云层漂浮、粒子飘散、水墨山峦视差|  https://www.calicat.cn/design/2074803789142216704?mode=design&q=ai&node-id=419509b7-b473-4135-a6b0-878604fe39ef&node-type=group

| **📜 我的博客** | IntersectionObserver 驱动的渐入动画 + 顶部滚动进度条 |  https://www.calicat.cn/design/2074803789142216704?mode=design&q=ai&node-id=8655bc99-e222-48e0-8016-a3daaebf34fd&node-type=group

| **🔥 我的项目** | 6大经典故事卡片，点击展开详情 |  https://www.calicat.cn/design/2074803789142216704?mode=design&q=ai&node-id=851d32ca-3125-4633-9008-79dd82ec0400&node-type=group

| **🐵 关于我** |  详细资料模态框 |  https://www.calicat.cn/design/2074803789142216704?mode=design&q=ai&node-id=97069f35-16fd-4db6-8a85-d1af56a48b11&node-type=group





### 技术栈

- **TailwindCSS** (CDN) — 原子化样式

- **Google Fonts** — 马善政书法体 + 站酷小薇体 + 思源宋体



| 层级 | 技术选型 |

|---|---|

| **框架** | Next.js 15.5.10 (App Router) + React 19.2.4 |

| **语言** | TypeScript 5.9.3 (strict mode) |

| **样式** | Tailwind CSS v4.2.1 (via `@tailwindcss/postcss`) + `@tailwindcss/typography` |

| **内容管道** | Velite v0.3.1 (Zod schemas, Markdown 处理, 资源管道) |

| **部署** | vercel |

| **代码高亮** | rehype-pretty-code |

| **图标** | @remixicon/react  |

| **Lint** | ESLint (next/core-web-vitals) |





需要考虑发布和更新内容的技术实现，不需要后端管理，直接使用git授权方式cms方式发布文章

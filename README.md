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

访问 `https://你的域名/admin` 使用可视化编辑器。

首次使用需要配置 GitHub OAuth：

1. 前往 [GitHub Developer Settings](https://github.com/settings/developers)
2. 创建 OAuth App
3. 在 Vercel 环境变量中添加 `GITHUB_CLIENT_ID` 和 `GITHUB_SECRET`

## 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com)
3. 点击 "New Project" → 导入你的 GitHub 仓库
4. Vercel 自动检测 Next.js 配置，点击 "Deploy"
5. 部署完成后，访问你的站点域名

## 技术栈

- Next.js 15.5.10 + React 19.2.4
- TypeScript 5.9.3 (strict)
- Tailwind CSS v4.2.1
- Velite v0.3.1（内容管道）
- Decap CMS（可视化内容管理）

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
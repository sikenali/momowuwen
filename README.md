# 墨墨梧文 (Momowuwen)

中国风的个人博客与作品集网站，基于 Next.js 15 + Tailwind CSS + Decap CMS 构建。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS v4 + custom水墨主题
- **CMS**: Decap CMS v3 (纯HTML页面，`/admin`)
- **内容管理**: Markdown 文件 + Velite 编译
- **部署**: Vercel

## 快速开始

```bash
npm install
npm run dev        # 开发服务器 (http://localhost:3000)
npm run build      # 生产构建
npm start          # 启动生产服务器
```

## 内容管理

### 后台编辑
访问 `/admin` 使用 Decap CMS 编辑内容：
- **博客文章** (`content/posts/`)
- **项目作品** (`content/projects/`)

CMS 通过 GitHub 直接读写 `content/` 目录下的 markdown 文件。

### 封面图片规范
封面图统一使用绝对路径，以 `/images/` 开头：
```yaml
cover: /images/my-cover.jpg
```
图片资源存放在 `public/images/` 目录下。

### 发布流程
CMS 保存内容后推送至 `main` 分支，Vercel 自动重新构建，新内容随即上线。

## 项目结构

```
src/app/
├── blog/[slug]/     # 博客详情页
├── projects/[slug]/ # 项目详情页
├── page.tsx         # 首页
└── admin/           # CMS入口 (route handler + static HTML)

public/admin/
├── index.html       # Decap CMS 纯HTML页面
├── config.yml       # CMS配置
└── preview.css      # 预览样式

content/
├── posts/           # 博客文章 (Markdown)
└── projects/        # 项目作品 (Markdown)
```

## 许可

[MIT License](LICENSE)

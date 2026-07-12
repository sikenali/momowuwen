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

## Decap CMS 配置

本项目集成了 Decap CMS（原 Netlify CMS）作为可视化后台管理系统，支持通过浏览器直接编辑 Markdown 内容并发布到 GitHub 仓库。

### 快速开始

1. 创建 `.env.local` 文件，填入 Basic Auth 凭据：

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的密码
```

2. 启动开发服务器后访问 http://localhost:3000/admin

### GitHub OAuth 配置

Decap CMS 使用 GitHub OAuth Device Flow 进行身份验证。

#### 创建 GitHub OAuth App

1. 前往 https://github.com/settings/developers → **New OAuth App**
2. 填写应用信息：
   - **Application name**: 墨墨梧文 CMS
   - **Homepage URL**: `http://localhost:3000`（开发）/ `https://你的域名`（生产）
   - **Authorization callback URL**: `http://localhost:3000/api/oauth`（开发）/ `https://你的域名/api/oauth`（生产）
3. 保存生成的 **Client ID** 和 **Client Secret**

#### 填入环境变量

**开发环境** — 在 `.env.local` 中添加：

```
GITHUB_CLIENT_ID=你的ClientID
GITHUB_CLIENT_SECRET=你的ClientSecret
```

**生产环境** — 在 Vercel 的 Settings → Environment Variables 中添加相同变量。

### 内容模型

CMS 支持两种内容类型：

| Collection | 路径 | 字段 |
|------------|------|------|
| **posts** | `content/posts/` | 标题、日期、标签、分类、封面图、目录、正文（Markdown） |
| **projects** | `content/projects/` | 标题、日期、标签、分类、封面图、正文（Markdown） |

### 发布流程

```
编辑文章 → 点击 Save → 自动提交到 main 分支 → Vercel 重新构建
```

- 每次保存会自动创建一个 Git commit
- 支持 Markdown 富文本编辑
- 封面图上传到 `public/images/`
- 支持草稿机制（`draft: true` 的文章不会出现在公开页面）

## 许可

[MIT](LICENSE)

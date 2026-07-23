# 墨墨梧文 (Momowuwen)

中国风的个人博客与作品集网站，基于 Next.js 15 + Tailwind CSS + Sveltia CMS 构建。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS v4 + custom 水墨主题
- **CMS**: Sveltia CMS（纯 HTML 页面，`/admin`）
- **内容管理**: Markdown 文件 + Velite 编译
- **部署**: Vercel

## 快速开始

```bash
npm install
npm run dev        # 开发服务器 (http://localhost:3000)
npm run build      # 生产构建
npm start          # 启动生产服务器
```

## 代码架构

```
momowuwen/
├── src/app/                          # Next.js App Router 目录
│   ├── layout.tsx                    # 根布局
│   ├── layout-client.tsx             # 客户端布局
│   ├── page.tsx                      # 首页
│   ├── about/page.tsx                # 关于页
│   ├── blog/[slug]/page.tsx          # 博客详情页
│   ├── projects/[slug]/page.tsx      # 项目详情页
│   ├── rss.xml/route.ts              # RSS feed 接口
│   └── api/oauth/route.ts            # GitHub OAuth 回调
├── src/lib/
│   ├── content.ts                    # 内容过滤器（排除草稿）
│   ├── fonts.ts                      # 字体加载
│   ├── sanitize.ts                   # 内容净化
│   ├── site-config.ts                # 站点元数据与配色
│   └── tag-color.ts                  # 标签颜色映射
├── src/components/
│   ├── footer.tsx
│   ├── mdx-content.tsx
│   ├── nav.tsx
│   ├── page-hero.tsx
│   └── project-card.tsx
├── public/admin/
│   ├── index.html                    # Sveltia CMS 入口（纯 HTML）
│   └── config.yml                    # CMS 配置
├── public/images/                    # 封面图片资源
├── content/                          # Markdown 源文件（由 CMS 维护）
│   ├── posts/                        # 博客文章
│   └── projects/                     # 项目介绍
├── velite.config.ts                  # Velite 配置（Markdown → TypeScript 类型）
├── next.config.ts                    # Next.js 配置（CSP 头等）
└── middleware.ts                     # /admin Basic Auth 保护
```

## 部署说明

### 环境准备

#### 1. GitHub 配置

1. 访问 https://github.com/settings/developers
2. 新建 OAuth App（可选，用于授权码登录）：
   - Application name: `墨墨梧文 CMS`
   - Homepage URL: `https://www.10012049.xyz`
   - Authorization callback URL: `https://www.10012049.xyz/api/oauth`
   - 复制 **Client ID** 和 **Client Secret**
3. 确保你有该仓库的 **Admin** 权限以读写内容：
   - CMS 保存内容后会自动推送至 `main` 分支

#### 2. Vercel 配置

在 Vercel 项目的 **Settings → Environment Variables** 中添加：

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `GITHUB_CLIENT_ID` | 否 | GitHub OAuth Client ID（用于 OAuth 登录流程） |
| `GITHUB_CLIENT_SECRET` | 否 | GitHub OAuth Client Secret |
| `ADMIN_USERNAME` | 否 | Admin 面板 Basic Auth 用户名 |
| `ADMIN_PASSWORD` | 否 | Admin 面板 Basic Auth 密码 |
| `NEXT_PUBLIC_SITE_URL` | 否 | 站点域名（用于安全头等） |

**不配置环境变量时的行为：**

- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — **未设置时跳过 Basic Auth**。开发环境和生产环境均可直接访问 `/admin`（但建议生产环境设置）。
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — **不配置时不影响使用**。Sveltia CMS 内置了 Token 登录方式（见下方 CMS 登录说明）。

**Vercel Auto-Deploy 已开启**：Push 到 `main` 分支即自动重新构建部署，无需额外配置 Webhook。

#### 3. Sveltia CMS 配置

CMS 配置文件位于 `public/admin/config.yml`，核心配置项：

| 配置项 | 值 | 说明 |
|--------|------|------|
| `backend.name` | `github` | GitHub 后端 |
| `backend.repo` | `sikenali/momowuwen` | 你的仓库路径 |
| `backend.branch` | `main` | 内容所在的 Git 分支 |
| `backend.base_url` | `https://www.10012049.xyz` | OAuth 回调地址指向的本站域名 |
| `backend.auth_endpoint` | `/api/oauth` | OAuth 授权码回调路径 |
| `media_folder` | `/public/images` | 媒体文件存储在仓库中的路径 |
| `public_folder` | `/images` | 前端引用媒体文件的 URL 路径 |

**CMS 登录方式有两种：**

| 方式 | 说明 | 是否需要额外配置 |
|------|------|-------------------|
| **Token 登录**（推荐） | 点击 "Sign in with Token" → 粘贴 GitHub PAT | 无需，开箱即用 |
| **OAuth 授权码** | 先配置 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET`，走授权码流程 | 需要 GitHub OAuth App |

**Token 登录步骤（最简单）：**

1. 前往 https://github.com/settings/tokens/new 生成 Personal Access Token
2. 勾选 `repo` 权限范围
3. 复制 Token
4. 访问 `/admin` → 点击 "Sign in with Token" → 粘贴 Token

**授权码登录步骤（多用户使用推荐）：**

1. 按上方 GitHub 配置步骤创建 OAuth App
2. 获取 Client ID 和 Client Secret
3. 将两个值填入 Vercel 的环境变量 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET`
4. 访问 `/admin` → 点击 "Sign in with GitHub" → 授权即可

#### 4. 发布流程

CMS、GitHub、Vercel 三者的协作链路：

- **Sveltia CMS**：在浏览器中编辑内容（文章 / 项目），自动推送到 GitHub 仓库
- **GitHub**：存储 `content/` 目录下所有 Markdown 文件，push 到 `main` 分支即触发 Vercel 构建
- **Vercel**：检测到 `main` 分支新 commit → 拉取代码 → 执行 `npm run build`（Velite 编译 Markdown → JSON）→ 部署生效

整个链路：`CMS 编辑 → GitHub 推送 → Vercel 构建 → 线上展示`

## 内容管理

### 后台编辑

访问 `/admin` 使用 Sveltia CMS 编辑内容：

- **博客文章** (`content/posts/`)
- **项目作品** (`content/projects/`)

CMS 通过 GitHub 直接读写 `content/` 目录下的 markdown 文件。支持图片上传、预览等功能。

### 封面图片规范

封面图统一使用绝对路径，尺寸为1200 × 630，以 `/images/` 开头：

```yaml
cover: /images/my-cover.jpg
```

图片资源存放在 `public/images/` 目录下。

### 草稿机制

Markdown frontmatter 中的 `draft: true` 表示草稿，不会在网站公开显示。

## 许可

[MIT License](LICENSE)

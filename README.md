# 墨墨梧文

中国古典水墨风格个人博客系统。基于 Next.js 15 + React 19 + TypeScript。

## 1. 功能说明

- 水墨主题视觉（宣纸底色、朱红印章、墨韵粒子、Canvas 山峦视差）
- Velite 驱动的内容管道（Markdown → 页面）
- Decap CMS 可视化后台（在线编辑 / Git 自动提交）
- CSS 液态玻璃导航、响应式布局
- RSS / Open Graph / SEO 元数据

## 2. 项目结构

```
src/
├── app/              # 页面路由
├── components/       # UI 组件
├── data/             # 结构化数据
├── lib/              # 工具函数
content/
├── posts/            # 博客文章 md
└── projects/         # 项目 md
public/
├── images/           # 静态资源
└── admin/            # CMS 配置
```

## 3. 部署发布

### 3.1 CMS 后端（内容管理）

项目集成了 Decap CMS，编辑内容后自动提交到 GitHub。

**步骤：**

1. 创建 GitHub OAuth App：
   - 前往 https://github.com/settings/developers → New OAuth App
   - Homepage URL：`https://你的域名`
   - Callback URL：`https://你的域名/api/oauth`
2. 在 Vercel 环境变量中添加：
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
3. 访问 `https://你的域名/admin` 进入后台
4. 编辑 / 新建文章 → 保存后自动 commit 到 GitHub

### 3.2 Vercel 前端（静态站点）

**步骤：**

1. 在 GitHub 创建仓库并推送代码
2. 登录 [Vercel](https://vercel.com) → Add New Project → 导入该仓库
3. 在 Settings → Environment Variables 中添加：
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
4. Deploy
5. 后续每次 `git push` 自动触发重新构建

也可本地构建部署到任意 Node.js 平台：

```bash
npm install
npm run build
npm start
```

## 4. 许可

[MIT](LICENSE)

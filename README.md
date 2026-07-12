# 墨墨梧文

中国古典水墨风格个人博客系统。基于 Next.js 15 + React 19 + TypeScript。

## 功能

- 水墨主题视觉设计（宣纸底色、朱红印章、墨韵粒子）
- Canvas 山峦视差交互动画
- Velite 驱动的内容管理（Markdown → 页面）
- Decap CMS 可视化后台（在线编辑 / Git 自动提交）
- 响应式布局（桌面 / 平板 / 手机）
- RSS / SEO 元数据 / Open Graph

## 项目结构

```
src/
├── app/              # Next.js 页面路由
├── components/       # 组件（导航 / 山峦 / 卡片）
├── data/             # 结构化数据
├── lib/              # 工具函数
content/
├── posts/            # 博客文章 md
└── projects/         # 项目 md
public/
├── images/           # 静态资源
└── admin/            # Decap CMS 配置
```

## 部署发布

### 后端（内容管理）

项目集成了 Decap CMS，编辑内容后自动提交到 GitHub：

1. 创建 GitHub OAuth App → 填入 `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
2. 访问 `/admin` 进入可视化后台
3. 编辑 / 新建文章 → 保存后自动 commit

### 前端（静态站点）

推荐部署到 **Vercel**：

1. Fork / Push 本仓库到 GitHub
2. 在 Vercel 导入仓库
3. 添加环境变量（GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET）
4. 部署完成，Git push 自动触发重新构建

也可部署到任意 Node.js 平台：

```bash
npm install
npm run build
npm start
```

## 许可

[MIT](LICENSE)

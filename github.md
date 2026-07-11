# 首页卡片货架组件设计说明


## 三、设计规范

### 3.1 色彩体系

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg-primary` | `rgba(245, 240, 232, 1)` | 页面暖米色背景 |
| `--brand-red` | `rgba(196, 58, 49, 1)` | 品牌主红（文取猩 accent） |
| `--brand-gold` | `rgba(200, 164, 92, 1)` | 品牌金（装饰线、标题下划线） |
| `--brand-green` | `rgba(91, 140, 90, 1)` | 品牌绿（文检猩 accent） |
| `--brand-blue` | `rgba(123, 158, 179, 1)` | 品牌蓝（文版猩 accent） |
| `--brand-pink` | `rgba(184, 84, 80, 1)` | 品牌粉（文比猩 accent） |
| `--text-primary` | `rgba(61, 50, 38, 1)` | 主文字色 |
| `--text-secondary` | `rgba(123, 158, 179, 1)` | 次要文字色 |
| `--text-muted` | `rgba(139, 115, 85, 1)` | 描述文字色 |
| `--text-light` | `rgba(184, 168, 138, 1)` | 浅色辅助文字 |
| `--border-light` | `rgba(232, 213, 192, 1)` | 卡片边框色 |

### 3.2 字体规范

- **字体族**: `Noto Sans SC` → `Source Han Sans SC` → `Microsoft YaHei`
- **标题字号**: 36px / 700 字重 / 4px 字间距
- **副标题字号**: 16px / 400 字重 / 1px 字间距
- **卡片标题**: 22px / 700 字重
- **卡片描述**: 13px / 400 字重

### 3.3 间距与圆角

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-card` | `12px` | 卡片圆角 |
| `--radius-round` | `9999px` | 图标圆形 |
| 卡片宽度 | `180px` | 固定宽度 |
| 卡片高度 | `220px` | 固定高度 |
| 图标尺寸 | `72 × 72px` | 圆角方形 |
| 卡片间距 | `32px` | 横向 gap |
| 卡片容器最大宽 | `1200px` | 居中约束 |

---

## 四、五张卡片详情

| 序号 | 名称 | 功能 | 图标 (RemixIcon) | 主题色 | 图标背景 |
|------|------|------|-----------------|--------|----------|
| 1 | 金 | 金 | `ri-inbox-line` | `--brand-red` | `rgba(253, 242, 238, 1)` |
| 2 | 木 | 木 | `ri-pencil-line` | `--brand-gold` | `rgba(253, 248, 232, 1)` |
| 3 | 水 | 水 | `ri-checkbox-circle-line` | `--brand-green` | `rgba(237, 245, 237, 1)` |
| 4 | 火 | 火 | `ri-layout-masonry-line` | `--brand-blue` | `rgba(237, 242, 247, 1)` |
| 5 | 土 | 土 | `ri-git-commit-line` | `--brand-pink` | `rgba(250, 238, 238, 1)` |

每张卡片底部有一个 `9 × 8px` 的彩色 accent 条，hover 时扩展为 `40px` 宽。

---

## 五、动画与交互

### 5.1 卡片入场呼吸光效

每张卡片 `.card-body` 带有 `cardShimmer` 动画，4 秒循环，通过 `box-shadow` 模拟呼吸发光效果。

```css
@keyframes cardShimmer {
  0%, 100% { box-shadow: var(--shadow-md); }
  50% { box-shadow: 0 8px 30px rgba(196, 58, 49, 0.1), var(--shadow-md); }
}
```

五张卡片依次错开 0.5s 延迟（0s, 0.5s, 1s, 1.5s, 2s）。

### 5.2 图标浮动

每张卡片图标 `.card-icon` 带有 `iconFloat` 上下浮动动画，3 秒循环。

```css
@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
```

同样依次错开 0.3s 延迟。

### 5.3 Hover 交互

当鼠标悬停在 `.shelf-item` 上时：

1. **整卡上浮**: `transform: translateY(-16px)` — 卡片整体向上弹起
2. **卡片体上浮**: `transform: translateY(-4px)` — 卡片主体再次上浮
3. **阴影增强**: 多层投影叠加，产生悬浮感
4. **图标缩放旋转**: `scale(1.15) rotate(-4deg)`
5. **Accent 条展开**: 宽度从 `9px` → `40px`
6. **光效扫过**: `card-body::after` 径向渐变光斑出现并移动（`shimmerMove`）
7. **呼吸动画暂停**: `animation: none`

过渡曲线统一使用弹性贝塞尔：`cubic-bezier(0.34, 1.56, 0.64, 1)`

### 5.4 导航栏按钮交互

顶部右侧两个功能按钮（信用查询、招标采购）：

- 默认白色半透明背景 + 细边框
- Hover 时上浮 2px + 红色光晕 + 图标变红
- Active 时缩小至 0.95 态

---

## 六、技术实现要点

### 6.1 框架

- **Vue 3** + `<script setup>` 语法
- 数据驱动：5 张卡片由 `cards` 数组渲染（`v-for`）
- 响应式路由：`handleCardClick(card)` 调用 `window.open(card.url, '_blank')`

### 6.2 依赖

- `vue@^3.5.0` — 框架
- `vue-router@^4.4.0` — 路由
- `remixicon@^4.9.1` — 图标库
- `vite@^6.0.0` — 构建工具

### 6.3 关键 CSS 技巧

| 技巧 | 说明 |
|------|------|
| 弹性贝塞尔曲线 | 制造弹跳回弹的 hover 动效 |
| CSS 变量 | 全局色彩系统统一管理 |
| `::after` 伪元素 | 实现光斑扫过效果，避免额外 DOM |
| `perspective: 1000px` | 为后续可能的 3D 变换预留 |
| `overflow: hidden` | 限制光效不溢出卡片 |
| 动画延迟错开 | 制造波浪式节奏感 |

---



---

## 八、设计关键词

> **温暖科技 · 拟物微交互 · 弹性动效 · 品牌人格化**

五张卡片以「猩」命名形成 IP 矩阵，暖色调米色背景搭配低饱和品牌色，配合弹性贝塞尔曲线和呼吸光效，营造出既有温度又不失专业感的 AI 产品气质。

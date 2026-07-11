# Mobile Hamburger Menu Design Spec

## Overview
Pure CSS dropdown menu panel triggered by hamburger button on mobile screens (≤768px). PC layout unchanged.

## Trigger Mechanism
- Hidden checkbox input (`#nav-toggle`) + label (hamburger button)
- Panel and overlay use sibling selectors (`~`) tied to checkbox state
- Click overlay or close button unchecks the same checkbox → panel closes

## Panel Specifications

| Property | Value |
|----------|-------|
| Width | 280px |
| Position | `fixed; top: 64px; right: 16px` |
| Background | `rgba(255, 255, 255, 0.95)` |
| Border Radius | 12px |
| Box Shadow | `0 4px 20px rgba(0, 0, 0, 0.15)` |
| Transition | `opacity 0.2s ease, transform 0.2s ease` |
| Initial State | `opacity: 0; transform: translateY(-8px)` |
| Active State | `opacity: 1; transform: translateY(0)` |

## Panel Content Structure
1. Divider line
2. Navigation section (4 page links: Home/Project/Blog/About) — icon + label, vertical layout
3. Divider line
4. Social links section (GitHub/Twitter/Email/RSS) — icon buttons only
5. Close button (×) — top-right corner

## Overlay
- Full screen: `position: fixed; inset: 0; background: rgba(0, 0, 0, 0.3)`
- Acts as second label for the checkbox → click to close

## Responsive Behavior
- ≤768px: hamburger button visible, panel + overlay active
- >768px: hamburger button hidden, original navbar menu displayed

## Accessibility
- Hamburger button has `aria-label="菜单"`
- Close button has `aria-label="关闭"`
- Panel items are standard `<a>` links with `href`
- Checkbox is visually hidden but screen-reader accessible

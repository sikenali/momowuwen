# Mobile Hamburger Dropdown Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a pure-CSS dropdown menu triggered by hamburger button on mobile screens (≤768px), with navigation links and social icons, closing via overlay click or close button.

**Architecture:** Hidden checkbox input drives panel visibility via CSS sibling selectors. Panel is `position: fixed` in top-right corner. Full-screen overlay acts as second label for the same checkbox. PC layout (>768px) remains unchanged.

**Tech Stack:** CSS only (checkbox hack, sibling combinators, transitions), no JS changes to nav component.

---

## Task 1: Add hidden checkbox and overlay HTML structure

**Files:**
- Modify: `src/components/nav.tsx`

Add a hidden checkbox input and full-screen overlay label at the top of the Nav component's return. The checkbox `id="nav-toggle"` drives all panel visibility. The overlay label spans full screen and clicks to uncheck.

```tsx
// Inside the <nav className="navbar"> return, BEFORE the existing elements:

<input
  type="checkbox"
  id="nav-toggle"
  className="nav-toggle-input"
  aria-hidden="true"
/>
<label htmlFor="nav-toggle" className="nav-overlay" aria-hidden="true"></label>

<nav className="navbar">
  {/* ... existing content ... */}
</nav>
```

The checkbox and overlay are placed OUTSIDE the navbar so CSS sibling selectors (`~`) can target the panel. The overlay is a transparent full-screen label linked to the same checkbox.

- [ ] **Step 1: Add checkbox and overlay to nav.tsx**

Edit `src/components/nav.tsx`. Add these two elements right before the `<nav className="navbar">` opening tag:

```tsx
<input
  type="checkbox"
  id="nav-toggle"
  className="nav-toggle-input"
  aria-hidden="true"
/>
<label htmlFor="nav-toggle" className="nav-overlay" aria-hidden="true"></label>
```

Ensure they are siblings of the `<nav>` element, not children of it.

- [ ] **Step 2: Verify structure**

Check that the DOM tree looks like:
```
<input id="nav-toggle" />
<label class="nav-overlay"></label>
<nav class="navbar">
  ...existing content...
</nav>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/nav.tsx
git commit -m "chore: add checkbox and overlay structure for mobile menu"
```

---

## Task 2: Style the hidden checkbox and overlay

**Files:**
- Modify: `src/app/globals.css`

Add CSS to hide the checkbox visually (but keep it accessible) and style the full-screen overlay.

- [ ] **Step 1: Add checkbox and overlay styles**

Append to `src/app/globals.css`:

```css
/* Mobile menu checkbox - visually hidden but accessible */
.nav-toggle-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Full-screen overlay for closing menu */
.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 99;
  pointer-events: none;
  transition: background 0.2s ease;
}

/* Show overlay when checkbox is checked */
.nav-toggle-input:checked ~ .nav-overlay {
  background: rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
```

- [ ] **Step 2: Verify overlay behavior**

The overlay should be invisible by default and semi-transparent when the checkbox is checked (via sibling selector `~`). Clicking it toggles the checkbox off.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add checkbox hide and overlay styles for mobile menu"
```

---

## Task 3: Style the hamburger button for mobile

**Files:**
- Modify: `src/components/nav.tsx`
- Modify: `src/app/globals.css`

The existing `.nav-hamburger` button needs mobile-only visibility and the panel-triggering label association.

- [ ] **Step 1: Update hamburger button in nav.tsx**

Change the existing hamburger button to use a `<label>` instead of `<button>` so it toggles the checkbox:

```tsx
<label htmlFor="nav-toggle" className="nav-hamburger" aria-label="菜单">
  <i className="ri-menu-line"></i>
</label>
```

Remove the `onClick` handler and `useState` for `menuOpen` since we're using pure CSS now.

- [ ] **Step 2: Add hamburger styles**

Append to `src/app/globals.css` inside the `@media (max-width: 768px)` block:

```css
.nav-hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 110;
  transition: transform 0.2s ease;
}

.nav-hamburger:hover {
  transform: scale(1.05);
}

.nav-hamburger i {
  font-size: 20px;
  color: var(--text-medium);
}
```

Outside the media query (for desktop):

```css
.nav-hamburger {
  display: none;
}
```

- [ ] **Step 3: Verify hamburger visibility**

On screens >768px, hamburger is hidden. On ≤768px, it's visible as a circular button in the top-right area of the navbar.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx src/app/globals.css
git commit -m "style: update hamburger button for mobile dropdown menu"
```

---

## Task 4: Build the dropdown panel HTML structure

**Files:**
- Modify: `src/components/nav.tsx`

Add the panel markup after the overlay label. The panel is positioned fixed and only visible when checkbox is checked.

- [ ] **Step 1: Add panel HTML**

Insert after the overlay label in `src/components/nav.tsx`:

```tsx
<div className="nav-panel" aria-hidden="true">
  <button className="nav-panel-close" aria-label="关闭">
    <i className="ri-close-line"></i>
  </button>
  
  <div className="nav-panel-section nav-panel-nav">
    {navItems.map((item) => {
      const isActive = activeNav === item.id;
      return (
        <Link
          key={item.id}
          href={item.href}
          data-nav={item.id}
          className={`nav-panel-item ${isActive ? 'active' : ''}`}
          onClick={() => {
            document.getElementById('nav-toggle')?.click();
          }}
        >
          <i className={`${item.icon} nav-panel-icon`}></i>
          <span className="nav-panel-label">{item.label}</span>
        </Link>
      );
    })}
  </div>
  
  <div className="nav-panel-divider"></div>
  
  <div className="nav-panel-section nav-panel-social">
    <a href={siteConfig.social.github} className="nav-panel-social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <i className="ri-github-fill nav-panel-icon"></i>
    </a>
    <a href={siteConfig.social.twitter} className="nav-panel-social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
      <i className="ri-twitter-x-fill nav-panel-icon"></i>
    </a>
    <a href={`mailto:${siteConfig.email}`} className="nav-panel-social-link" aria-label="Email">
      <i className="ri-mail-fill nav-panel-icon"></i>
    </a>
    <a href={siteConfig.social.rss} className="nav-panel-social-link" target="_blank" rel="noopener noreferrer" aria-label="RSS">
      <i className="ri-rss-fill nav-panel-icon"></i>
    </a>
  </div>
</div>
```

The panel contains:
- Close button (top-right)
- Navigation section (4 links with icons + labels)
- Divider
- Social section (4 icon-only links)

Note: The `onClick` on nav links closes the panel by simulating a checkbox click.

- [ ] **Step 2: Import siteConfig**

Add import at top of `nav.tsx`:

```tsx
import { siteConfig } from '@/lib/site-config';
```

- [ ] **Step 3: Verify panel structure**

Panel should have correct semantic structure with nav links and social links separated by a divider.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx
git commit -m "feat: add dropdown panel HTML with nav and social links"
```

---

## Task 5: Style the dropdown panel

**Files:**
- Modify: `src/app/globals.css`

Add all panel styles. Panel is hidden by default, shown when checkbox is checked via sibling selector.

- [ ] **Step 1: Add panel base styles (outside media query)**

```css
/* Mobile dropdown panel - hidden by default */
.nav-panel {
  position: fixed;
  top: 64px;
  right: 16px;
  width: 280px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 16px;
  z-index: 100;
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

/* Show panel when checkbox is checked */
.nav-toggle-input:checked ~ .nav-panel {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

- [ ] **Step 2: Add close button styles**

```css
.nav-panel-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.15s ease;
}

.nav-panel-close:hover {
  background: rgba(0, 0, 0, 0.05);
}
```

- [ ] **Step 3: Add section and divider styles**

```css
.nav-panel-section {
  margin-bottom: 12px;
}

.nav-panel-nav {
  margin-bottom: 16px;
}

.nav-panel-divider {
  height: 1px;
  background: rgba(232, 213, 192, 0.5);
  margin: 12px 0;
}
```

- [ ] **Step 4: Add nav item styles**

```css
.nav-panel-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-primary);
  font-size: 14px;
  transition: background 0.15s ease, color 0.15s ease;
}

.nav-panel-item:hover {
  background: rgba(196, 58, 49, 0.06);
}

.nav-panel-item.active {
  color: var(--accent-red);
  font-weight: 600;
  background: rgba(196, 58, 49, 0.08);
}

.nav-panel-icon {
  font-size: 18px;
  width: 20px;
  text-align: center;
}

.nav-panel-label {
  flex: 1;
}
```

- [ ] **Step 5: Add social link styles**

```css
.nav-panel-social {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.nav-panel-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-decoration: none;
  color: var(--text-muted);
  transition: color 0.15s ease, background 0.15s ease, transform 0.15s ease;
}

.nav-panel-social-link:hover {
  color: var(--accent-red);
  background: rgba(196, 58, 49, 0.08);
  transform: scale(1.1);
}

.nav-panel-social-link .nav-panel-icon {
  font-size: 20px;
  width: auto;
  text-align: center;
}
```

- [ ] **Step 6: Hide panel on desktop (outside media query)**

```css
@media (min-width: 769px) {
  .nav-panel {
    display: none;
  }
}
```

- [ ] **Step 7: Verify panel appearance**

Panel should be:
- Hidden on desktop (>768px)
- Invisible on mobile by default (opacity 0)
- Visible with fade + slide-up when checkbox is checked
- 280px wide, positioned top-right
- Contains nav items with icons + labels
- Social icons centered at bottom

- [ ] **Step 8: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add dropdown panel styles with nav and social sections"
```

---

## Task 6: Clean up old mobile nav styles

**Files:**
- Modify: `src/app/globals.css`

Remove or update the old mobile nav-menu styles that are no longer needed (the bottom-sheet style). Keep the new panel styles.

- [ ] **Step 1: Remove old bottom-sheet nav styles**

In the `@media (max-width: 768px)` block, remove or comment out these old rules:
- `.nav-menu` bottom-fixed styles (the old drawer)
- `.nav-menu .nav-item` border-radius and padding styles
- `.nav-menu .nav-item.active` gradient background

Keep these styles that are still needed:
- `.stats-section-compact` mobile styles
- `.quote-section-compact` mobile styles
- `.footer-section` mobile styles
- `.projects-section` mobile padding
- `.latest-article-card` mobile overrides
- `.cards-shelf` mobile styles
- `.explore-more-text` and `.explore-arrow` mobile styles

- [ ] **Step 2: Verify no conflicts**

Ensure the old `.nav-menu` styles don't interfere with the new `.nav-panel` styles. The old nav-menu (horizontal tabs) should remain visible on desktop only.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: clean up old mobile bottom-sheet nav styles"
```

---

## Task 7: End-to-end testing

**Files:**
- Manual testing in browser

- [ ] **Step 1: Desktop test (>768px)**

Verify:
- Hamburger button is hidden
- Original horizontal nav menu is visible
- No panel appears
- All nav links work

- [ ] **Step 2: Mobile test (≤768px)**

Verify:
- Hamburger button is visible (circular, top-right)
- Clicking hamburger opens panel with fade + slide animation
- Panel shows 4 nav items with icons and labels
- Panel shows 4 social icon buttons
- Close button (×) closes panel
- Clicking overlay (dark area) closes panel
- Clicking a nav link closes panel AND navigates
- Panel is 280px wide, positioned correctly
- No horizontal scroll caused by panel

- [ ] **Step 3: Accessibility test**

Verify:
- Hamburger button has `aria-label="菜单"`
- Close button has `aria-label="关闭"`
- Social links have `aria-label` attributes
- Keyboard Tab navigation works through panel items
- Screen reader announces panel content when opened

- [ ] **Step 4: Commit**

No code changes needed for testing. Just verify everything works.

```bash
git status
```

If all tests pass, the implementation is complete.

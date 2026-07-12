/**
 * Article view counting utilities using localStorage.
 * Provides debounced view increment with 30-second cooldown per session.
 */

const viewTimestamps = new Map<string, number>();

export function getArticleViews(slug: string): number {
  if (typeof window === 'undefined') return 0;
  const key = `article-views-${slug}`;
  return parseInt(localStorage.getItem(key) || '0', 10);
}

export function setArticleViews(slug: string, count: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`article-views-${slug}`, String(count));
}

export function shouldIncrementView(slug: string): boolean {
  const now = Date.now();
  const lastTime = viewTimestamps.get(slug) || 0;
  // Only increment once per 30 seconds per page visit
  if (now - lastTime < 30000) return false;
  viewTimestamps.set(slug, now);
  return true;
}

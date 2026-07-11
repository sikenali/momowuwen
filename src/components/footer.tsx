import { siteConfig } from '@/lib/site-config';

const SOCIAL_YEAR = new Date().getFullYear();

const socialLinks = [
  { label: 'GitHub', icon: 'ri-github-fill', href: siteConfig.social.github },
  { label: 'Twitter', icon: 'ri-twitter-x-fill', href: siteConfig.social.twitter },
  { label: 'Email', icon: 'ri-mail-fill', href: `mailto:${siteConfig.email}` },
  { label: 'RSS', icon: 'ri-rss-fill', href: siteConfig.social.rss },
];

export function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="footer-logo-seal">
            <i className="ri-quill-pen-line"></i>
          </div>
          <div className="footer-blog-info">
            <h4>{siteConfig.author}</h4>
            <span>INK · CHRONICLE</span>
          </div>
        </div>

        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="social-icon"
              aria-label={link.label}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>

        <div className="copyright">
          <span>&copy; {SOCIAL_YEAR} 墨墨梧文 · <a href="https://lazycat.cloud/" target="_blank" rel="noopener noreferrer">Powered by LightOS</a></span>
        </div>
      </div>
    </footer>
  );
}

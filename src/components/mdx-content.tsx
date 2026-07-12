interface MDXContentProps {
  html: string;
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<svg[^>]*on\w+\s*=/gi, '')
    .replace(/<img[^>]*on\w+\s*=/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/href\s*=\s*"javascript:/gi, 'href="#"')
    .replace(/action\s*=\s*"javascript:/gi, 'action="#"');
}

export function MDXContent({ html }: MDXContentProps) {
  return (
    <div
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
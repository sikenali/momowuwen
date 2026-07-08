interface MDXContentProps {
  html: string;
}

export function MDXContent({ html }: MDXContentProps) {
  return (
    <div
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
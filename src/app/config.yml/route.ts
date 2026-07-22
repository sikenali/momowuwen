import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export function GET() {
  const filePath = path.join(process.cwd(), 'public', 'admin', 'config.yml');
  let content = fs.readFileSync(filePath, 'utf-8');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.10012049.xyz';

  content = content.replace(/base_url:\s*.+/, `base_url: ${siteUrl}`);

  return new NextResponse(content, {
    headers: { 'Content-Type': 'application/x-yaml; charset=utf-8' },
  });
}

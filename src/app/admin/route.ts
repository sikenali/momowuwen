import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export function GET() {
  const htmlPath = path.join(process.cwd(), 'public', 'admin', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf-8');
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export function GET() {
  const filePath = path.join(process.cwd(), 'public', 'admin', 'config.yml');
  const content = fs.readFileSync(filePath, 'utf-8');

  return new NextResponse(content, {
    headers: { 'Content-Type': 'application/x-yaml; charset=utf-8' },
  });
}

import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const configPath = join(process.cwd(), 'public', 'admin', 'config.yml');
    const config = readFileSync(configPath, 'utf-8');
    
    return new NextResponse(config, {
      headers: {
        'Content-Type': 'text/yaml',
        'Cache-Control': 'no-cache, must-revalidate',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load config' },
      { status: 500 }
    );
  }
}

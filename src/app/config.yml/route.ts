import { NextResponse } from 'next/server';

export function GET(request: Request) {
  return NextResponse.rewrite(new URL('/admin/config.yml', request.url));
}

export const config = {
  matcher: '/config.yml',
};

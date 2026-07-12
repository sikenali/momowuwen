import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return new NextResponse(
        '<html><body><h3>GitHub OAuth 未配置</h3><p>请设置 GITHUB_CLIENT_ID 和 GITHUB_CLIENT_SECRET 环境变量。</p></body></html>',
        { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    const redirectUri = process.env.OAUTH_REDIRECT_URI || `${req.nextUrl.origin}/api/oauth`;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
    return NextResponse.redirect(url);
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'OAuth not configured' }, { status: 500 });
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenRes.json();
    const accessToken = data.access_token;
    const scope = data.scope || '';

    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to get access token', details: data }, { status: 500 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.10012049.xyz';
    // P1-08: Sanitize origin to prevent injection, use proper origin validation
    const sanitizedOrigin = origin.replace(/[^a-zA-Z0-9:\\-]/g, '');
    
    // Build HTML safely with template literal escaping
    const accessTokenEscaped = accessToken.replace(/'/g, '\\\'').replace(/\\/g, '\\\\');
    const scopeEscaped = scope.replace(/'/g, '\\\'').replace(/\\/g, '\\\\');
    
    const html =
      '<!DOCTYPE html><html><body>' +
      '<script>' +
      'function receiveMessage(event) {' +
      '  if (event.origin !== "' + sanitizedOrigin + '") return;' +
      "  window.opener.postMessage('authorization:" + accessTokenEscaped + ':' + scopeEscaped + "', event.origin);" +
      '  window.removeEventListener("message", receiveMessage);' +
      '}' +
      'window.addEventListener("message", receiveMessage, false);' +
      "window.opener.postMessage('authorizing:" + accessTokenEscaped + "', '" + sanitizedOrigin + "');" +
      '</scr' + 'ipt></body></html>';

    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

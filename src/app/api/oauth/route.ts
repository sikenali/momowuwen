import { NextRequest, NextResponse } from 'next/server';

function redirectToGitHub(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse(
      '<!DOCTYPE html><html><body><h3>GitHub OAuth 未配置</h3></body></html>',
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const redirectUri = process.env.OAUTH_REDIRECT_URI || `${req.nextUrl.origin}/api/oauth`;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
  return NextResponse.redirect(url);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return redirectToGitHub(req);
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return redirectToGitHub(req);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

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
      signal: controller.signal,
    });

    const data = await tokenRes.json();
    const accessToken = data.access_token;
    const scope = data.scope || '';

    if (!accessToken) {
      return redirectToGitHub(req);
    }

    const tokenEnc = encodeURIComponent(accessToken);
    const scopeEnc = encodeURIComponent(scope);
    const adminUrl = `${req.nextUrl.origin}/admin?token=${tokenEnc}&scope=${scopeEnc}`;

    const html =
      '<!DOCTYPE html><html><body>' +
      '<script>window.opener.location.replace("' + adminUrl.replace(/"/g, '\\"') + '"); window.close();</script>' +
      '</body></html>';

    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return redirectToGitHub(req);
  } finally {
    clearTimeout(timeout);
  }
}

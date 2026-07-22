import { NextRequest, NextResponse } from 'next/server';

const PROVIDER = 'github';

function redirectToGitHub(req: NextRequest): NextResponse {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse(
      '<!DOCTYPE html><html><body><h3>GitHub OAuth 未配置</h3></body></html>',
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const redirectUri = `${req.nextUrl.origin}/api/oauth`;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
  return NextResponse.redirect(url);
}

async function handleToken(code: string, req: NextRequest): Promise<NextResponse<string>> {
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

    if (!accessToken) {
      return redirectToGitHub(req);
    }

    const token = encodeURIComponent(JSON.stringify({
      token: accessToken,
      access_token: accessToken,
      scope: data.scope || '',
      token_type: data.token_type || 'bearer',
    }));

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body>
<script>
(function() {
  var TOKEN = decodeURIComponent("${token}");
  var PROVIDER = "${PROVIDER}";
  var RETRIES = 0;

  if (!window.opener) {
    document.body.innerHTML = "Auth succeeded but popup lost connection. Please close this and try again.";
    return;
  }

  function sendToken(origin) {
    window.opener.postMessage(
      "authorization:" + PROVIDER + ":success:" + TOKEN,
      origin
    );
    window.close();
  }

  function handleMessage(e) {
    if (e.data === "authorizing:" + PROVIDER) {
      window.removeEventListener("message", handleMessage);
      clearInterval(retryTimer);
      sendToken(e.origin);
    }
  }

  window.addEventListener("message", handleMessage);

  function tryAuthorizing() {
    window.opener.postMessage("authorizing:" + PROVIDER, "*");
    RETRIES++;
    if (RETRIES > 5) {
      window.removeEventListener("message", handleMessage);
      clearInterval(retryTimer);
      sendToken("*");
    }
  }

  tryAuthorizing();
  var retryTimer = setInterval(tryAuthorizing, 3000);
})();
</script>
</body>
</html>`;

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

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return redirectToGitHub(req);
  }

  return handleToken(code, req);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = body.code;
    
    if (!code) {
      return NextResponse.json({ error: 'Missing code' }, { status: 400 });
    }
    
    return await handleToken(code, req);
  } catch (err) {
    console.error('POST /api/oauth error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

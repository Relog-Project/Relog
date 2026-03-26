import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const app_redirect = searchParams.get('app_redirect');
  const provider = searchParams.get('provider') || 'google';

  if (!app_redirect) {
    return NextResponse.json(
      { error: 'app_redirect is required' },
      { status: 400 },
    );
  }

  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth-success?app_redirect=${encodeURIComponent(app_redirect)}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /><title>로그인 중...</title></head>
      <body>
        <form id="signin" method="POST" action="/api/auth/signin/${provider}">
          <input type="hidden" id="csrfToken" name="csrfToken" value="" />
          <input type="hidden" name="callbackUrl" value="${callbackUrl}" />
        </form>
        <script>
          async function login() {
            const res = await fetch('/api/auth/csrf');
            const { csrfToken } = await res.json();
            document.getElementById('csrfToken').value = csrfToken;
            document.getElementById('signin').submit();
          }
          login();
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

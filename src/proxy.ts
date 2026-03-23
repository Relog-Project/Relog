import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/src/utils/supabase/middleware';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const supabaseResponse = await updateSession(request);

  const isProtectedPath = ['/dashboard', '/contacts', '/settings', '/works'].some(path =>
    pathname.startsWith(path)
  );

  const isAuthInternalPath =
    pathname.startsWith('/api/auth/native-login') ||
    pathname.startsWith('/auth/native-signin');

  if (isProtectedPath && !isAuthInternalPath) {
    if (token) {
      return NextResponse.next();
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

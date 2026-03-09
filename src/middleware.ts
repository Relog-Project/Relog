import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/src/utils/supabase/middleware';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // 1. NextAuth 세션 확인
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  // 2. Supabase 세션 업데이트 (쿠키 갱신 등)
  const supabaseResponse = await updateSession(request);

  // 3. 인증 체크가 필요한 페이지 (예: dashboard, contacts, settings, works 등)
  const isProtectedPath = ['/dashboard', '/contacts', '/settings', '/works'].some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    // NextAuth 토큰이 있거나 Supabase 사용자 세션이 있으면 통과
    // (updateSession에서 Supabase 세션 체크가 실패할 수 있으므로 토큰 여부 우선 확인)
    if (token) {
      return NextResponse.next();
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로와 일치:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * - public 폴더 안의 이미지 등 (svg, png 등)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

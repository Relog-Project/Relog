import { AppSidebar } from '@/src/components/layout/dashboard/app-sidebar';
import { MobileNav } from '@/src/components/layout/dashboard/mobile-nav';
import { getUserById } from '@/src/features/users/services/get-user-by-id';
import { createClient } from '@/src/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import { getServerSession } from 'next-auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const supabase = await createClient();
  const {
    data: { user: supabaseUser },
    error: authError,
  } = await supabase.auth.getUser();

  // Supabase 세션도 없고 NextAuth 세션도 없으면 로그인 페이지로 이동
  if (!supabaseUser && !session) {
    redirect('/login');
  }

  // 사용자 정보 가져오기 (세션 타입에 따라 적절한 ID 사용)
  const userId = supabaseUser?.id || (session?.user as any)?.id;
  
  let userData = null;
  if (userId) {
    try {
      userData = await getUserById(supabase, userId);
    } catch (error) {
      console.error('사용자 정보를 불러오는 데 실패했습니다:', error);
      // 만약 DB에 사용자 정보가 없다면 (소셜 로그인 첫 방문 등) 기본 세션 정보 사용
      if (session?.user) {
        userData = {
          id: userId,
          email: session.user.email,
          full_name: session.user.name,
          avatar_url: session.user.image
        };
      }
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      <AppSidebar user={userData} />
      <MobileNav user={userData} />
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  );
}

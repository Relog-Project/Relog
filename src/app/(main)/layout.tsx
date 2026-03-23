import { AppSidebar } from '@/src/components/layout/dashboard/app-sidebar';
import { MobileNav } from '@/src/components/layout/dashboard/mobile-nav';
import { redirect } from 'next/navigation';
import React from 'react';
import { getServerSession } from 'next-auth';
import { getCurrentUserAction } from '@/src/features/users/actions/get-user';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const result = await getCurrentUserAction();
  const user = result.data ?? null;

  // Supabase 세션도 없고 NextAuth 세션도 없으면 로그인 페이지로 이동
  if (!user && !session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      <AppSidebar user={user} />
      <MobileNav user={user} />
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  );
}

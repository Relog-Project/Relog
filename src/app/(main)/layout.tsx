import { AppSidebar } from '@/src/components/layout/dashboard/app-sidebar';
import { getUserById } from '@/src/features/users/services/get-user-by-id';
import { createClient } from '@/src/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  let userData = null;
  try {
    userData = await getUserById(supabase, user.id);
  } catch (error) {
    console.error('사용자 정보를 불러오는 데 실패했습니다:', error);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar user={userData} />
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  );
}

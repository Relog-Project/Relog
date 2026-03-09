import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import { getUserById } from '@/src/features/users/services/get-user-by-id';
import { createClient } from '@/src/utils/supabase/server';
import { Label } from '@radix-ui/react-label';
import { redirect } from 'next/navigation';
import { LogoutButton } from '../../../features/settings/components/logout-button';
import { getServerSession } from 'next-auth';

export default async function SettingsPage() {
  const session = await getServerSession();
  const supabase = await createClient();

  // 현재 로그인된 auth 유저 확인 (Supabase 또는 NextAuth)
  const {
    data: { user: supabaseUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (!supabaseUser && !session) {
    redirect('/login');
  }

  // 1. 기본 정보를 NextAuth 세션에서 가져옴
  let userData = session?.user ? {
    name: session.user.name,
    email: session.user.email,
  } : null;

  // 2. DB(Supabase)에서 추가 정보가 있다면 덮어씌움
  const userId = supabaseUser?.id || (session?.user as any)?.id;
  if (userId) {
    try {
      const dbUserData = await getUserById(supabase, userId);
      if (dbUserData) {
        userData = {
          ...userData,
          ...dbUserData,
          // DB의 full_name 필드와 UI의 name 필드 매칭 확인 필요
          name: dbUserData.full_name || dbUserData.name || userData?.name,
        };
      }
    } catch (error) {
      console.error('사용자 정보를 불러오는 데 실패했습니다:', error);
    }
  }

  return (
    <div>
      <DashboardHeader
        title="Settings"
        description="계정과 환경을 설정하세요."
      />
      <div className="p-8">
        <div className="max-w-lg space-y-8">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-card-foreground">
              프로필
            </h2>
            <div className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="setting-name">이름</Label>
                <Input id="setting-name" defaultValue={userData?.name || ''} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="setting-email">이메일</Label>
                <Input
                  id="setting-email"
                  type="email"
                  defaultValue={userData?.email || ''}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="setting-company">회사명</Label>
                <Input id="setting-company" defaultValue="Relog Inc." />
              </div>
              <Button className="w-fit">저장</Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

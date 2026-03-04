import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import { getUserById } from '@/src/features/users/services/get-user-by-id';
import { createClient } from '@/src/utils/supabase/server';
import { Label } from '@radix-ui/react-label';
import { redirect } from 'next/navigation';
import { LogoutButton } from '../../../features/settings/components/logout-button';

export default async function SettingsPage() {
  const supabase = await createClient();

  // 현재 로그인된 auth 유저 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // 데이터베이스에서 추가 정보 가져오기 (users 테이블)
  let userData = null;
  try {
    userData = await getUserById(supabase, user.id);
  } catch (error) {
    console.error('사용자 정보를 불러오는 데 실패했습니다:', error);
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

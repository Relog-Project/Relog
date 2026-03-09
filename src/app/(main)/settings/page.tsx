import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import { getCurrentUserAction } from '@/src/features/users/actions/get-user';
import { Label } from '@radix-ui/react-label';
import { redirect } from 'next/navigation';
import { LogoutButton } from '../../../features/settings/components/logout-button';

export default async function SettingsPage() {
  // 방금 만든 Server Action을 사용하여 유저 정보 가져오기
  const { data: dbUserData, error } = await getCurrentUserAction();

  if (error || !dbUserData) {
    redirect('/login');
  }

  // UI에서 사용할 데이터 매핑
  const userData = {
    name: dbUserData.name || '',
    email: dbUserData.email || '',
  };

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
                <Input id="setting-name" defaultValue={userData.name} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="setting-email">이메일</Label>
                <Input
                  id="setting-email"
                  type="email"
                  defaultValue={userData.email}
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

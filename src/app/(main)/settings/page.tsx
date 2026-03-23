import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import { getCurrentUserAction } from '@/src/features/users/actions/get-user';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Button } from '@/src/components/ui/button';
import { LogoutButton } from '../../../features/settings/components/logout-button';
import { redirect } from 'next/navigation';
import { User, Mail, Building2, Shield } from 'lucide-react';

export default async function SettingsPage() {
  const { data: dbUserData, error } = await getCurrentUserAction();

  if (error || !dbUserData) {
    redirect('/login');
  }

  const userData = {
    name: dbUserData.name || '',
    email: dbUserData.email || '',
  };

  const initials = userData.name
    ? userData.name.slice(0, 2).toUpperCase()
    : userData.email.slice(0, 2).toUpperCase();

  return (
    <div>
      <DashboardHeader title="Settings" description="계정과 환경을 설정하세요." />

      <div className="p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-6">

          {/* 프로필 카드 */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* 상단 배너 */}
            <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

            {/* 아바타 + 이름 */}
            <div className="px-6 pb-6">
              <div className="-mt-10 mb-4 flex items-end justify-between">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-card bg-primary text-2xl font-bold text-primary-foreground shadow-sm">
                  {initials}
                </div>
              </div>
              <p className="text-lg font-semibold text-card-foreground">{userData.name || '이름 없음'}</p>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </div>

          {/* 프로필 편집 */}
          <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-b border-border px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <User size={16} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-card-foreground">프로필 정보</h2>
                <p className="text-xs text-muted-foreground">이름과 회사 정보를 수정하세요.</p>
              </div>
            </div>

            <div className="grid gap-5 p-6">
              <div className="grid gap-1.5">
                <Label htmlFor="setting-name" className="flex items-center gap-1.5 text-sm font-medium">
                  <User size={13} className="text-muted-foreground" />
                  이름
                </Label>
                <Input id="setting-name" defaultValue={userData.name} placeholder="이름을 입력하세요" />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="setting-email" className="flex items-center gap-1.5 text-sm font-medium">
                  <Mail size={13} className="text-muted-foreground" />
                  이메일
                  <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">변경 불가</span>
                </Label>
                <Input
                  id="setting-email"
                  type="email"
                  defaultValue={userData.email}
                  disabled
                  className="disabled:opacity-60"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="setting-company" className="flex items-center gap-1.5 text-sm font-medium">
                  <Building2 size={13} className="text-muted-foreground" />
                  회사명
                </Label>
                <Input id="setting-company" placeholder="회사명을 입력하세요" />
              </div>

              <div className="flex justify-end">
                <Button size="sm" className="px-5">저장</Button>
              </div>
            </div>
          </div>

          {/* 계정 관리 */}
          <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 border-b border-border px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <Shield size={16} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-card-foreground">계정 관리</h2>
                <p className="text-xs text-muted-foreground">로그아웃 및 계정 관련 설정입니다.</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">로그아웃</p>
                  <p className="text-xs text-muted-foreground">현재 기기에서 로그아웃합니다.</p>
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

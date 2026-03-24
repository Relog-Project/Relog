import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import { getCurrentUserAction } from '@/src/features/users/actions/get-user';
import { redirect } from 'next/navigation';
import { UpgradeSection } from '@/src/features/pricing/components/upgrade-section';

export default async function UpgradePage() {
  const { data: user, error } = await getCurrentUserAction();

  if (error || !user) {
    redirect('/login');
  }

  return (
    <div>
      <DashboardHeader title="요금제" description="현재 플랜을 확인하고 업그레이드하세요." />
      <div className="p-4 md:p-8">
        <UpgradeSection currentPlan="free" userEmail={user.email} userName={user.name ?? ''} />
      </div>
    </div>
  );
}

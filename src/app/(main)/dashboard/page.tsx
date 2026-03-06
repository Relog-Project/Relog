import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import ActiveWorks from '@/src/features/dashboard/components/active-works';
import GeneralSummary from '@/src/features/dashboard/components/general-summary';
import RecentContacts from '@/src/features/dashboard/components/recent-contacts';

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader
        title="Dashboard"
        description="관계와 작업 현황을 한눈에 확인하세요."
      />
      <div className="p-4 md:p-8">
        <GeneralSummary />
        <div className="mt-6 md:mt-8 grid gap-6 lg:grid-cols-2">
          <RecentContacts />
          <ActiveWorks />
        </div>
      </div>
    </div>
  );
}

import ActiveWorks from '@/src/features/dashboard/components/active-works';
import GeneralSummary from '@/src/features/dashboard/components/general-summary';
import RecentContacts from '@/src/features/dashboard/components/recent-contacts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || '';

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? '좋은 아침이에요' : hour < 18 ? '안녕하세요' : '수고하셨어요';

  return (
    <div>
      {/* 인사말 헤더 */}
      <div className="border-b border-border bg-card/50 px-4 py-6 md:px-8">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Dashboard</p>
        <h1 className="text-xl font-bold text-foreground">
          {greeting}{userName ? `, ${userName}` : ''}
          <span className="ml-1">👋</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          관계와 작업 현황을 한눈에 확인하세요.
        </p>
      </div>

      <div className="p-4 md:p-8 space-y-6">
        <GeneralSummary />
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentContacts />
          <ActiveWorks />
        </div>
      </div>
    </div>
  );
}

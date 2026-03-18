import { getContacts } from '@/src/features/contacts/services/get-contacts';
import { getWorks } from '@/src/features/works/services/get-works';
import { Briefcase, Clock, TrendingUp, Users } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export default async function GeneralSummary() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) return null;

  // 서버 사이드에서 RLS를 우회하기 위해 service_role 클라이언트 사용
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [contacts, works] = await Promise.all([
    getContacts(supabaseAdmin, userId),
    getWorks(supabaseAdmin, userId),
  ]);

  const stats = [
    {
      label: '전체 연락처',
      value: contacts?.length?.toString() || '0',
      icon: Users,
      change: '총 누적',
    },
    {
      label: '진행 중 작업',
      value: works?.filter((w: any) => !w.endDate)?.length?.toString() || '0',
      icon: Briefcase,
      change: '활성',
    },
    {
      label: '완료된 작업',
      value: works?.filter((w: any) => w.endDate)?.length?.toString() || '0',
      icon: Clock,
      change: '총 누적',
    },
    {
      label: '이번 달 신규 연락처',
      value: contacts
        ?.filter((c: any) => {
          const createdAt = new Date(c.created_at);
          const now = new Date();
          return (
            createdAt.getMonth() === now.getMonth() &&
            createdAt.getFullYear() === now.getFullYear()
          );
        })
        ?.length?.toString() || '0',
      icon: TrendingUp,
      change: '최근 활동',
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </span>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-3 text-3xl font-semibold text-card-foreground">
            {stat.value}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}

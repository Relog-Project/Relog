import { getContacts } from '@/src/features/contacts/services/get-contacts';
import { getWorks } from '@/src/features/works/services/get-works';
import { Briefcase, CheckCircle2, TrendingUp, Users, WalletCards, CircleDollarSign } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export default async function GeneralSummary() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) return null;

  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [contacts, works] = await Promise.all([
    getContacts(supabaseAdmin, userId),
    getWorks(supabaseAdmin, userId),
  ]);

  const thisMonthContacts = (contacts || []).filter((c: any) => {
    const d = new Date(c.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const worksWithAmount = (works || []).filter((w: any) => w.amount != null);
  const unpaidAmount = worksWithAmount.filter((w: any) => !w.is_paid).reduce((sum: number, w: any) => sum + (w.amount ?? 0), 0);
  const paidAmount = worksWithAmount.filter((w: any) => w.is_paid).reduce((sum: number, w: any) => sum + (w.amount ?? 0), 0);

  const formatAmount = (n: number) =>
    n >= 10000 ? `${(n / 10000).toFixed(n % 10000 === 0 ? 0 : 1)}만원` : `${n.toLocaleString()}원`;

  const stats = [
    {
      label: '전체 연락처',
      value: contacts?.length ?? 0,
      icon: Users,
      sub: '총 누적',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      isAmount: false,
    },
    {
      label: '진행 중 작업',
      value: works?.filter((w: any) => !w.endDate)?.length ?? 0,
      icon: Briefcase,
      sub: '활성',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      isAmount: false,
    },
    {
      label: '미수금',
      value: unpaidAmount,
      icon: WalletCards,
      sub: `${worksWithAmount.filter((w: any) => !w.is_paid).length}건`,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      isAmount: true,
    },
    {
      label: '수금 완료',
      value: paidAmount,
      icon: CircleDollarSign,
      sub: `${worksWithAmount.filter((w: any) => w.is_paid).length}건`,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      isAmount: true,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-card-foreground">
                {stat.isAmount ? formatAmount(stat.value as number) : stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
          {/* 배경 데코 */}
          <div className={`pointer-events-none absolute -right-4 -bottom-4 h-20 w-20 rounded-full ${stat.bg} opacity-40`} />
        </div>
      ))}
    </div>
  );
}

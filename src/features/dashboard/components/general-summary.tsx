import { contacts } from '@/src/mocks/contacts';
import { works } from '@/src/mocks/works';
import { Briefcase, Clock, TrendingUp, Users } from 'lucide-react';

const stats = [
  {
    label: '전체 연락처',
    value: contacts.length.toString(),
    icon: Users,
    change: '+2 이번 달',
  },
  {
    label: '진행 중 작업',
    value: works.filter((w) => !w.endDate).length.toString(),
    icon: Briefcase,
    change: '활성',
  },
  {
    label: '완료된 작업',
    value: works.filter((w) => w.endDate).length.toString(),
    icon: Clock,
    change: '총 누적',
  },
  {
    label: '이번 달 컨택',
    value: contacts
      .filter((c) => c.lastContactDate >= '2026-01-01')
      .length.toString(),
    icon: TrendingUp,
    change: '최근 활동',
  },
];

export default function GeneralSummary() {
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

import { DashboardHeader } from "@/components/dashboard/dashboad-header"
import { contacts, works } from "@/mocks/data"
import { Briefcase, Clock, TrendingUp, Users } from "lucide-react"

const stats = [
  {
    label: "전체 연락처",
    value: contacts .length.toString(),
    icon: Users,
    change: "+2 이번 달",
  },
  {
    label: "진행 중 작업",
    value: works.filter((w) => !w.endDate).length.toString(),
    icon: Briefcase,
    change: "활성",
  },
  {
    label: "완료된 작업",
    value: works.filter((w) => w.endDate).length.toString(),
    icon: Clock,
    change: "총 누적",
  },
  {
    label: "이번 달 컨택",
    value: contacts
      .filter((c) => c.lastContactDate >= "2026-01-01")
      .length.toString(),
    icon: TrendingUp,
    change: "최근 활동",
  },
]

export default function DashboardPage() {
  const recentContacts = [...contacts]
    .sort(
      (a, b) =>
        new Date(b.lastContactDate).getTime() -
        new Date(a.lastContactDate).getTime()
    )
    .slice(0, 5)

  const activeWorks = works.filter((w) => !w.endDate)

  return (
    <div>
      <DashboardHeader
        title="Dashboard"
        description="관계와 작업 현황을 한눈에 확인하세요."
      />
      <div className="p-8">
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

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-card-foreground">
                최근 컨택
              </h2>
            </div>
            <div className="divide-y divide-border">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {contact.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {contact.company}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {contact.lastContactDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-card-foreground">
                진행 중 작업
              </h2>
            </div>
            <div className="divide-y divide-border">
              {activeWorks.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                  진행 중인 작업이 없습니다.
                </div>
              ) : (
                activeWorks.map((work) => {
                  const contact = contacts.find(
                    (c) => c.id === work.contactId
                  )
                  return (
                    <div key={work.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-card-foreground">
                          {work.title}
                        </p>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          진행 중
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {contact?.name} · {contact?.company} · {work.startDate}
                        부터
                      </p>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

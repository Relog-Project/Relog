import { Briefcase, History, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Users,
    number: "01",
    title: "관계 이력 관리",
    description:
      "단순 연락처가 아닌, 사람과 회사와의 관계를 시간 순서대로 기록하고 한눈에 파악하세요.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: History,
    number: "02",
    title: "작업 히스토리",
    description:
      "프로젝트, 계약, 협업 등 함께한 작업 이력을 체계적으로 관리하고 언제든 되돌아보세요.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Briefcase,
    number: "03",
    title: "진행 상태 추적",
    description:
      "작업의 시작일과 종료일로 진행 중 / 완료 여부를 한눈에 파악하고 우선순위를 정하세요.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative border-t border-border px-6 py-28">
      {/* 배경 */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-background via-secondary/30 to-background" />

      <div className="mx-auto max-w-5xl">
        {/* 섹션 헤더 */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            관계를 깊이 있게 관리하는
            <br />
            <span className="text-muted-foreground font-normal">모든 것을 담았습니다</span>
          </h2>
        </div>

        {/* 피처 카드 */}
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <span className="text-4xl font-bold text-muted/30 select-none">{feature.number}</span>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <p className="text-muted-foreground">지금 바로 무료로 시작해보세요.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            무료 계정 만들기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

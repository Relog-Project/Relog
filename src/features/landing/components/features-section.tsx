import { History, Share2, Users } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "관계 이력 관리",
    description:
      "단순 연락처가 아닌, 사람과 회사와의 관계를 시간 순서대로 기록하고 한눈에 파악하세요.",
  },
  {
    icon: History,
    title: "작업 히스토리",
    description:
      "프로젝트, 계약, 협업 등 함께한 작업 이력을 체계적으로 관리하고 되돌아보세요.",
  },
  {
    icon: Share2,
    title: "팀 공유",
    description:
      "팀원과 관계 정보를 공유하여 누구나 고객·파트너와의 맥락을 빠르게 파악할 수 있습니다.",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border bg-secondary/50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            핵심 기능
          </h2>
          <p className="mt-3 text-muted-foreground">
            관계를 깊이 있게 관리하기 위한 모든 것
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-md"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

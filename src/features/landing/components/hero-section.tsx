import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

const highlights = [
  "연락처별 작업 이력 관리",
  "진행 중 / 완료 상태 추적",
  "거래처·프리랜서 모두 사용 가능",
];

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-36 pb-24 text-center">
      {/* 배경 그라디언트 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-violet-500/6 blur-3xl" />
        <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500/6 blur-3xl" />
      </div>

      {/* 뱃지 */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        B2B 관계 관리의 새로운 기준
      </div>

      {/* 헤드라인 */}
      <h1 className="text-balance text-5xl font-bold leading-[1.15] tracking-tight text-foreground md:text-6xl lg:text-7xl">
        연락처가 아니라
        <br />
        <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
          관계
        </span>
        를 기록하세요
      </h1>

      {/* 서브카피 */}
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        영업팀, 프리랜서, 외주 개발팀을 위한 관계 중심 CRM.
        <br className="hidden md:block" />
        거래처·파트너와 무슨 일을 했는지 <strong className="font-medium text-foreground">잊지 않기</strong> 위해 만들었습니다.
      </p>

      {/* CTA 버튼 */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button asChild size="lg" className="h-12 rounded-full px-8 text-base shadow-lg shadow-primary/20">
          <Link href="/signup">
            무료로 시작하기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-8 text-base bg-transparent">
          <Link href="/login">로그인</Link>
        </Button>
      </div>

      {/* 체크리스트 */}
      <ul className="mt-10 flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
        {highlights.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      {/* 미리보기 카드 */}
      <div className="mt-20 w-full max-w-3xl">
        <div className="rounded-2xl border border-border bg-card/80 shadow-2xl shadow-black/10 backdrop-blur overflow-hidden">
          {/* 가짜 툴바 */}
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-400/70" />
            <div className="h-3 w-3 rounded-full bg-amber-400/70" />
            <div className="h-3 w-3 rounded-full bg-emerald-400/70" />
            <div className="ml-4 h-5 flex-1 max-w-xs rounded-md bg-muted/60 text-[10px] flex items-center justify-center text-muted-foreground">
              app.relog.io/dashboard
            </div>
          </div>
          {/* 가짜 대시보드 콘텐츠 */}
          <div className="grid grid-cols-4 gap-3 p-5">
            {[
              { label: '전체 연락처', value: '24', color: 'bg-blue-500/10 text-blue-500' },
              { label: '진행 중 작업', value: '7', color: 'bg-amber-500/10 text-amber-500' },
              { label: '완료된 작업', value: '38', color: 'bg-emerald-500/10 text-emerald-500' },
              { label: '이번 달 신규', value: '3', color: 'bg-violet-500/10 text-violet-500' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-background/60 p-3">
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
                <p className={`mt-1 text-xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 pb-5">
            {[
              { name: '김철수', company: '에이전시 A', date: '3월 20일' },
              { name: '이영희', company: '스타트업 B', date: '3월 18일' },
              { name: '박지민', company: '프리랜서', date: '3월 15일' },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-3 py-2.5">
                <div className="h-7 w-7 rounded-lg bg-primary/20 text-xs font-bold text-primary flex items-center justify-center">
                  {c.name[0]}
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground">{c.company}</p>
                </div>
                <span className="ml-auto text-[10px] text-muted-foreground">{c.date}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-3 py-2.5 opacity-40">
              <div className="h-7 w-7 rounded-lg bg-muted" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2 w-16 rounded bg-muted" />
                <div className="h-2 w-10 rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
